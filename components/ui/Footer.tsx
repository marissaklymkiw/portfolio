import ArrowForward from "./ArrowForward";

/**
 * Footer — closes the page on a section rule, like every other band.
 *
 * The retired system made this the one inversion moment: a dark indigo band with
 * yellow links. The Swiss direction has no inversion moment — black and white
 * carry everything, and the rule does the separating. See design.md §8.
 *
 * CENTRED STACK, adopted 2026-09-19: back-to-top, then the two contact links at
 * display size, then the place, then the copyright. This replaced a two-column
 * layout (contact left, chrome right) AND the near-identical bespoke footer the
 * DRP case study used to render for itself. One footer now serves every route.
 *
 * That consolidation is why this is a SERVER component again. It used to be
 * "use client" solely so it could read the pathname and stand down on routes
 * with their own footer. With no such routes left, the hook, that module
 * (lib/work/self-footer.ts, now deleted), and the client boundary all go.
 *
 * `id="contact"` is what the header's CONTACT button targets, so exactly one
 * element in the document may carry it — which is the other reason a per-route
 * footer was a liability. scroll-mt clears the sticky header so the jump lands
 * below it rather than under it.
 */
const labelBase =
  "font-mono text-label uppercase tracking-label transition-colors";

/* Resume sits alongside Email and LinkedIn deliberately. It is in the top nav
   too, but a reader finishing a 9,000px case study is at the bottom of the page
   and the highest-intent moment on the site; making them scroll back up to find
   it is the gap an earlier review flagged. */
const LINKS = [
  { label: "Email", href: "mailto:marissa.klymkiw@gmail.com", ext: false },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/marissak/",
    ext: true,
  },
  /* ext: true not because the PDF is on another host, but because it is a
     FILE rather than a route. /resume 307s to the PDF (next.config.ts), and
     the flag already does the one thing that needs doing here: open it in a
     new tab so a reader who has just finished a case study is not dropped
     into a PDF viewer with the site behind the back button. */
  { label: "Resume", href: "/resume", ext: true },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="canvas scroll-mt-[calc(var(--hh)+24px)] border-t border-ink pt-lg pb-3xl"
    >
      {/* targets #main (the global <main>), which exists on every page, unlike
          #wordmark (home-only and position:sticky, which browsers treat as
          already in view and refuse to scroll to). Arrow is the shared
          ArrowForward rotated -90° to point up.

          py-md with -my-md grows the tap target from 14px to ~46px without
          moving anything: the padding expands the hit box, the negative margin
          cancels its effect on the stack rhythm. Both are on the spacing
          scale. */}
      <div className="flex justify-center">
        {/* States match the top nav links exactly: ink at rest, `signal` on
            hover (the documented interaction accent, and the only non-mono
            colour interactive text is allowed to take), and the global
            :focus-visible ring. It read text-muted with a hover TO ink, which
            was the nav's behaviour inverted: resting quieter than body text and
            brightening to normal on hover, rather than resting at full strength
            and marking the interaction.

            No active state, because unlike the nav links this is an in-page
            anchor rather than a route. Nothing to be "current" for, so no
            aria-current and no `text-rich font-bold`. */}
        <a
          href="#main"
          className={`${labelBase} inline-flex items-center gap-1.5 py-md -my-md text-ink hover:text-signal`}
        >
          Back to top <ArrowForward className="-rotate-90" />
        </a>
      </div>

      {/* The two links at display size, which is the whole point of the band:
          the end of a page is the highest-intent moment on it, so the way out
          is the largest thing on screen.

          text-title, NOT an arbitrary clamp. The bespoke version this replaces
          carried `text-[clamp(2rem,5.5vw,4.375rem)]`, one of the forbidden
          arbitrary values DESIGN.md warns about; text-title is within a
          hair of it and is a real token. Likewise gap-x-3xl rather than the
          `gap-x-[7vw]` it used. */}
      <nav
        aria-label="Elsewhere"
        className="mt-xl flex flex-wrap items-baseline justify-center gap-x-3xl gap-y-md text-center"
      >
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            {...(l.ext ? { target: "_blank", rel: "noreferrer" } : {})}
            className="font-display text-title leading-none tracking-[-0.02em] py-sm -my-sm text-ink hover:text-rich transition-colors"
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* The place echoes "Back to top" in the same mono label, so the band is
          bracketed top and bottom by small caps with the display links between.
          The year lives in the copyright, so this line never states it. */}
      <p className={`${labelBase} mt-2xl text-center text-muted`}>
        Made in Los Angeles
      </p>

      <p className="mt-sm text-center text-small text-muted">
        &copy; 2026 Marissa Klymkiw
      </p>
    </footer>
  );
}
