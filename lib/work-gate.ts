import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * The case-study gate — one source of truth for which studies are protected,
 * and whether the current reader has unlocked them.
 *
 * WHY SERVER-SIDE. The obvious implementation hides the protected markup with
 * CSS or React state, but that only hides content the browser has ALREADY
 * received: it is in the page source, in View Source, in the network tab, and
 * in any scraper. These studies carry recruiter names, response rates, internal
 * ticket volumes, and a full-resolution JTBD board with real job labels, and
 * PRODUCT.md is explicit that restricted figures cannot be published as-is. So
 * the gated sections are never RENDERED unless the cookie verifies, which means
 * they are never sent. The gate is the only thing in the response.
 *
 * FAILS CLOSED. With no WORK_PASSWORD set, nothing unlocks. That is deliberate:
 * the alternative, failing open, means one missing environment variable on a
 * deploy silently publishes the confidential work with no visible symptom.
 * A locked page that should be open is obvious; an open page that should be
 * locked is not.
 */

/* Which studies are protected. The WorkCard's "Protected" marker and the page
   itself both read this, so a card can never advertise a state the page does
   not enforce, and adding a study to the gate is a one-line change. */
export const GATED_SLUGS: ReadonlySet<string> = new Set([
  "device-registration",
  "indeed-vision",
  "sourcing-analytics",
]);

export function isGated(slug: string | undefined): boolean {
  return Boolean(slug && GATED_SLUGS.has(slug));
}

export const GATE_COOKIE = "mk_work";

/* The cookie carries a derived token, never the password. The password is the
   HMAC key, so rotating it invalidates every cookie already issued without any
   session store to purge: old tokens simply stop verifying. */
const TOKEN_MESSAGE = "work-gate-v1";

function tokenFor(password: string): string {
  return createHmac("sha256", password).update(TOKEN_MESSAGE).digest("hex");
}

/** Constant-time compare that tolerates length mismatch without throwing. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Whether the gate can work at all. False when WORK_PASSWORD is unset. */
export function gateConfigured(): boolean {
  return Boolean(process.env.WORK_PASSWORD);
}

/** Checks a submitted password and returns the cookie value to set, or null. */
export function verifyPassword(submitted: string): string | null {
  const expected = process.env.WORK_PASSWORD;
  if (!expected) return null;
  if (!safeEqual(submitted.trim(), expected)) return null;
  return tokenFor(expected);
}

/**
 * Whether THIS request may see gated content.
 *
 * Reading cookies opts the route into dynamic rendering, which is the point:
 * a statically prerendered page would bake one answer for everyone.
 */
export async function isUnlocked(): Promise<boolean> {
  const password = process.env.WORK_PASSWORD;
  if (!password) return false;
  const jar = await cookies();
  const token = jar.get(GATE_COOKIE)?.value;
  if (!token) return false;
  return safeEqual(token, tokenFor(password));
}

/** 30 days. Long enough that a recruiter reading over a week does not re-enter
    it, short enough that a forwarded link eventually stops working. */
export const GATE_MAX_AGE = 60 * 60 * 24 * 30;
