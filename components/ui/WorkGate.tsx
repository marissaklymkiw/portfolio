"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import ArrowBack from "@/components/ui/ArrowBack";

/**
 * WorkGate — the whole page for a protected case study.
 *
 * NOT a partial gate. An earlier version kept the badge, headline, metadata,
 * hero and lede public and gated only the sections below, on the reasoning that
 * a cold recruiter link should still show the two-minute surface. MK's call
 * reversed that: the metadata columns carry the outcome figures, and the
 * headlines carry a delta, so the "public" part was itself the confidential
 * part. Nothing study-specific renders here now.
 *
 * That means this component says the same thing on all three studies, which is
 * the trade: a reader who clicks a card knows what they clicked from the card,
 * and gets no further confirmation until they are through.
 *
 * It is not what ENFORCES the gate, either. app/work/[slug]/page.tsx decides,
 * and when locked it never invokes the study component at all, so the study's
 * markup is never rendered and never sent. Hiding is presentation; not sending
 * is protection. See lib/work-gate.ts.
 */
export default function WorkGate() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setError(null);

    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setPassword("");
        /* GA4: how many readers hit the gate versus get through it is the one
           number this feature exists to answer. Guarded because gtag only
           exists when NEXT_PUBLIC_GA_ID is set, which it is not locally. */
        window.gtag?.("event", "work_unlock", {
          page_path: window.location.pathname,
        });
        router.refresh();
        return;
      }
      setError(
        typeof data?.message === "string"
          ? data.message
          : "Something went wrong. Please try again.",
      );
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="canvas pt-2xl pb-3xl">
      {/* Same shell as /work, /about and /contact: one ink rule, carried by the
          header. The back link sits above it so a locked page is never a dead
          end. */}
      <Link
        href="/work"
        className="lab lab--ink mb-lg inline-flex items-center gap-xs py-md -my-md hover:text-rich-hover"
      >
        <ArrowBack />
        Go back
      </Link>

      <header className="border-t border-ink pt-md">
        {/* "Shared on request", not "Under wraps" or "Ask me about this one".
            Every case study on the site is gated, so a heading that frames THIS
            one as the exception would be quietly untrue. This states the policy
            instead, and names the action rather than the obstacle. */}
        <h1 className="font-display text-section text-ink">Shared on request</h1>
      </header>

      <div className="mt-lg flex flex-col gap-lg max-w-reading text-prose text-ink">
        {/* Kept near 110 characters so it holds one line on a desktop canvas.
            It ran ~158 and broke to a second line carrying only a few words.
            It will still wrap on a phone, which is correct: the fix is the
            length, not a nowrap that would force a horizontal scroll. */}
        <p>
          My case studies are unreleased or confidential, so I keep the screens,
          the numbers, and the research private.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-xl max-w-reading">
        {/* THE HINT LEADS. It tells the reader where to get the password, which
            is the thing they need BEFORE the field is any use; underneath it,
            it was an answer arriving after the question. Still wired through
            aria-describedby, so a screen reader gets it as the field's
            description wherever it sits in the DOM.

            No placeholder, per DESIGN.md: guidance is a persistent hint, never
            text inside the field, where it vanishes the moment someone types
            and reads as a value already filled in.

            bg-surface is the system's ONE tinted fill (#e6e4ea), and it forces
            two contrast changes noted on that token: the text is `ink`, not
            `muted`, because muted on surface measures 4.12:1 and FAILS AA, and
            the label takes lab--ink for the same reason. w-fit so the tint hugs
            the sentence rather than running the full canvas; max-w-reading caps
            it so a longer hint wraps at the reading measure. Square, because
            this is a container and the system rounds content imagery only. */}
        <p
          id="gate-hint"
          className="w-fit max-w-reading bg-surface p-lg text-small text-ink"
        >
          <span className="mr-xs font-mono text-label uppercase tracking-label text-ink">
            Hint:
          </span>
          The password is on my resume. If you do not have it,{" "}
          <Link
            href="/contact"
            className="text-rich underline decoration-1 underline-offset-[3px] hover:text-rich-hover"
          >
            get in touch
          </Link>{" "}
          and I will send it over.
        </p>

        {/* Matches ContactForm.labelBase exactly: text-label (0.72rem), the
            size DESIGN.md documents for Label. The `.lab` utility used here
            before resolves to --text-small (0.95rem), so the two forms on the
            site were labelling their fields at different sizes. */}
        <label
          htmlFor="work-password"
          className="mt-xl block font-mono text-label uppercase tracking-label text-ink"
        >
          Password
        </label>

        {/* items-stretch, not items-start: the button's padding (13/26, the
            system's button geometry) makes it taller than the input's, and
            aligning to the top left them visibly mismatched. Stretch sizes both
            to the line rather than hardcoding a height on either, so the pair
            stays matched if either one's type or padding changes. */}
        <div className="mt-sm flex flex-wrap items-stretch gap-md">
          <input
            id="work-password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            /* Both ids when there is an error, so a screen reader gets the
               hint AND the failure rather than one replacing the other. */
            aria-describedby={error ? "gate-hint gate-error" : "gate-hint"}
            aria-invalid={error ? true : undefined}
            /* border-muted (5.19:1), not the 1.26:1 hairline: this is the
               boundary identifying a control, and WCAG 1.4.11 asks 3:1 of it.
               Same call already made on the contact form's inputs. */
            className="w-full min-[480px]:w-[18rem] border border-muted bg-paper px-md py-sm text-body text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rich"
          />

          {/* Matches the contact form's submit exactly, which is the system's
              primary button: rounded-button (4px), 13/26 padding, Inter at
              text-small semibold, rich on rich. DESIGN.md's Three Radii Rule
              (amended 2026-09-19) puts buttons at 4px and nothing else there,
              so this was wrong at 0 — the earlier square version also read as
              an input rather than a control sitting beside one. */}
          <button
            type="submit"
            disabled={pending}
            className={
              "inline-flex items-center justify-center gap-2 rounded-button border border-rich px-[26px] py-[13px] " +
              "font-body text-small font-semibold text-paper [transition:transform_.08s,background_.15s] " +
              (pending
                ? "bg-muted border-muted cursor-not-allowed"
                : "bg-rich hover:bg-rich-hover active:translate-y-px cursor-pointer")
            }
          >
            {pending ? "Checking" : "Unlock"}
          </button>
        </div>

        {/* role="status", not role="alert": an alert interrupts whatever a
            screen reader is saying, which is too aggressive for a mistyped
            password. Polite announces it at the next pause. */}
        {error && (
          <p id="gate-error" role="status" className="mt-md text-small text-error">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
