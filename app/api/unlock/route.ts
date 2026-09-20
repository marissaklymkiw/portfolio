import { NextResponse } from "next/server";
import {
  GATE_COOKIE,
  GATE_MAX_AGE,
  gateConfigured,
  verifyPassword,
} from "@/lib/work-gate";

/**
 * POST /api/unlock — checks the case-study password and sets the gate cookie.
 *
 * ENV REQUIRED:
 *   WORK_PASSWORD  the password recruiters type. Also the HMAC key behind the
 *                  cookie token, so changing it invalidates every cookie
 *                  already issued, with no session store to purge.
 *
 * Without it the route returns 503 and the gate says so, matching how
 * /api/contact behaves when its key is missing. It does not fail open: see the
 * note in lib/work-gate.ts for why an unconfigured deploy must stay locked.
 */

export const runtime = "nodejs";

/* Best-effort, per-instance, in-memory. Same shape and same caveats as the
   contact route: several serverless instances and recycling mean this is a
   speed bump against casual guessing, not a guarantee. It matters more here
   than there, though, because this endpoint is the one thing on the site worth
   brute-forcing. The real backstop is a password with enough entropy. */
const ATTEMPTS = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 10;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ATTEMPTS.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) {
    ATTEMPTS.set(ip, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  if (!gateConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        reason: "unconfigured",
        message:
          "The gate is not set up yet. Please get in touch and I will send the work directly.",
      },
      { status: 503 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        reason: "rate-limited",
        message: "Too many attempts. Try again in a few minutes.",
      },
      { status: 429 },
    );
  }

  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    password = "";
  }

  const token = verifyPassword(password);
  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        reason: "incorrect",
        /* Deliberately does not distinguish "empty" from "wrong": both are the
           same failure to a guesser, and a more specific message only helps
           them. */
        message: "That password did not work.",
      },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(GATE_COOKIE, token, {
    /* httpOnly so no script can read it, which is the difference between this
       and a client-side gate. sameSite lax so following a shared link into the
       site keeps the unlock. secure everywhere but local http. */
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: GATE_MAX_AGE,
  });
  return response;
}
