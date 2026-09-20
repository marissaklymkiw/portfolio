import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  validateContact,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contact";

/**
 * POST /api/contact — receives the contact form and mails it via Resend.
 *
 * The only route handler on the site. Everything else here is static or
 * server-rendered, so this is also the only surface anyone on the internet can
 * POST to, which is why it does its own validation, rate limiting, and bot
 * check rather than trusting that the form was the sender.
 *
 * ENV REQUIRED (all in .env.local locally, and in the host's env in prod):
 *   RESEND_API_KEY   the key from resend.com/api-keys
 *   CONTACT_TO       where the mail lands (her inbox)
 *   CONTACT_FROM     the verified sender, e.g. "Portfolio <hello@domain.com>".
 *                    Resend will only send FROM a domain verified in the
 *                    dashboard; onboarding@resend.dev works for testing but
 *                    can only deliver to the account's own address.
 *
 * Without the key the route returns 503 and the form says so. It does not fail
 * silently, because a contact form that quietly drops mail is worse than one
 * that is visibly switched off.
 */

/* Node runtime, not edge: the Resend SDK is a Node library, and the in-memory
   rate limit below at least holds within a warm instance here. */
export const runtime = "nodejs";

/* ---- Rate limiting -------------------------------------------------------
   Best-effort, per-instance, in-memory. A serverless deployment runs several
   instances and recycles them, so this is a speed bump for casual abuse rather
   than a guarantee. It is deliberately not a dependency: the real defenses are
   Resend's own sending limits and the honeypot. If this ever gets hammered,
   move to a shared store (Upstash, Vercel KV) rather than tightening these
   numbers, because tightening them mostly punishes real senders behind a
   shared IP. */
const RATE_LIMIT = 5; /* submissions per window, per IP */
const RATE_WINDOW_MS = 10 * 60 * 1000; /* 10 minutes */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  /* Keep the map from growing without bound across a long-lived instance. */
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

/* Coerces anything off the wire into a string. A JSON body can carry numbers,
   arrays, or null where a string is expected, and `String(["a","b"])` is a far
   better outcome than a crash in validation. */
function asString(value: unknown): string {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  /* The honeypot. `company` is rendered off-screen and left empty by anyone
     using the form as intended; bots that fill every field give themselves
     away. Answer 200 rather than an error, so a bot gets no signal about why
     nothing happened. */
  if (asString(body.company).trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many messages from this connection. Try again shortly." },
      { status: 429 },
    );
  }

  const fields: ContactFields = {
    name: asString(body.name).trim(),
    email: asString(body.email).trim(),
    subject: asString(body.subject).trim(),
    message: asString(body.message).trim(),
  };

  /* Same functions the form ran in the browser. */
  const errors: ContactErrors = validateContact(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    console.error(
      "[contact] Missing env: RESEND_API_KEY, CONTACT_TO, and CONTACT_FROM are all required.",
    );
    return NextResponse.json(
      { error: "The form is not connected yet. Please email me directly." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      /* replyTo is the whole trick: the mail is sent by the verified portfolio
         domain (so it passes SPF/DKIM and lands in an inbox), but hitting Reply
         answers the person who wrote in. Putting their address in `from`
         instead is the classic version of this form and it is what gets the
         mail spam-foldered. */
      replyTo: fields.email,
      subject: `Portfolio: ${fields.subject}`,
      /* The message is optional, so the body is assembled rather than
         templated: with no message, the mail ends at the About line instead of
         trailing two blank lines that read like something failed to send. */
      text: [
        `From: ${fields.name} <${fields.email}>`,
        `About: ${fields.subject}`,
        ...(fields.message ? ["", fields.message] : []),
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend rejected the send:", error);
      return NextResponse.json(
        { error: "The message didn't send. Please email me directly." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Send threw:", err);
    return NextResponse.json(
      { error: "The message didn't send. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
