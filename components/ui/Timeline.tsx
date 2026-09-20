export type TimelineEntry = {
  /** year or range, e.g. "2019–2022" */
  period: string;
  /** company / context */
  org: string;
  /** one-line focus */
  focus: string;
  /** optional brand logo (path in /public); the org name stays as the a11y label */
  logo?: string;
  /** optical size multiplier so logos read as the same visual weight despite
      different glyph compositions (e.g. an icon+wordmark vs. tight letterforms) */
  logoScale?: number;
  /** the current role — gets the larger, solid rail node */
  current?: boolean;
};

/* Duration in years from a period like "2015–2019" or "2024–Current", so the
   desktop columns (and their rail segments) scale to how long each role was. */
function weightYears(period: string): number {
  const [a, b] = period.replace(/~/g, "").split(/[–-]/).map((s) => s.trim());
  const start = parseInt(a, 10);
  const end = /current|present/i.test(b ?? "")
    ? new Date().getFullYear()
    : parseInt(b ?? a, 10);
  const span = end - start;
  return Number.isFinite(span) && span > 0 ? span : 1;
}

/**
 * Timeline — a narrative timeline (story, not a logo parade). Horizontal rail
 * with dots on desktop; stacks to a ruled vertical list below 880px.
 *
 * Migrated to the Swiss system 2026-09-19 with /about, the only page that uses
 * it. Space Mono periods and Hanken org names, both monochrome: the violet
 * periods went to `muted`, the indigo org names to `ink`, the bark focus lines
 * to `muted`. The rail nodes were the one place this component used colour to
 * encode meaning, which the One Accent Rule forbids (design.md §1): status now
 * reads through SIZE and FILL, a larger solid `rich` node for the current role
 * against smaller `muted` ones, not through indigo-versus-violet.
 *
 * Logos render in full colour. The monochrome rule governs the system, not the
 * content, and a brand mark is content (design.md §6).
 */
/* Baseline added to every column's year-weight so the spacing still hints at
   duration (SoCalGas widest) without cramming the shorter roles into columns
   too narrow for their copy. Higher = more even; 0 = strictly proportional. */
const COL_SOFTEN = 12;

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const cols = entries
    .map((e) => `${weightYears(e.period) + COL_SOFTEN}fr`)
    .join(" ");
  return (
    <ol
      style={{ "--tl-cols": cols } as React.CSSProperties}
      className="grid grid-cols-1 min-[880px]:[grid-template-columns:var(--tl-cols)] min-[880px]:gap-x-0"
    >
      {entries.map((e) => {
        return (
          <li
            key={e.org}
            /* MOBILE: a real vertical timeline. The left border IS the rail,
               drawn per-item so it runs continuously down the list, with an
               absolutely-positioned node sitting on it. pb-xl separates the
               bands; the last one drops it so the rail ends on the final line
               instead of trailing into white.

               DESKTOP (>=880px): all of that is unset and the horizontal rail
               below takes over. */
            className="relative border-l border-line pb-xl pl-lg last:pb-0 min-[880px]:static min-[880px]:flex min-[880px]:flex-col min-[880px]:border-l-0 min-[880px]:pb-0 min-[880px]:pl-0"
          >
            {/* The mobile node. Same encoding as the desktop one: the current
                role is larger and solid `rich`, the rest are smaller `muted`.
                Negative left offsets are half the node's width, so each sits
                centred ON the 1px rail rather than beside it. */}
            <span
              aria-hidden="true"
              className={`absolute top-[7px] block rounded-full min-[880px]:hidden ${
                e.current
                  ? "left-[-6.5px] h-3 w-3 bg-rich"
                  : "left-[-4.5px] h-2 w-2 bg-muted"
              }`}
            />

            {/* Logo: DESKTOP ONLY as of 2026-09-19. On a phone it was the
                loudest thing in each band, a 46px full-colour mark immediately
                above the same org name set as a heading, so every entry stated
                itself twice and the eye went to the logo both times. On desktop
                it still earns its place: it sits above the rail as the visual
                anchor of a horizontal band, where the name below it reads as a
                caption rather than a repeat. To bring logos back on mobile,
                change `hidden` to `flex`. */}
            <div className="hidden min-[880px]:flex items-center min-[880px]:h-20 min-[880px]:mb-sm min-[880px]:justify-center min-[880px]:px-sm">
              {e.logo && (
                <img
                  src={e.logo}
                  alt=""
                  style={{ "--ls": e.logoScale ?? 1 } as React.CSSProperties}
                  className="w-auto max-w-full object-contain h-[calc(2.875rem_*_var(--ls))] min-[880px]:h-[calc(3.25rem_*_var(--ls))]"
                />
              )}
            </div>

            {/* years */}
            <div className="font-mono text-label uppercase tracking-label text-muted min-[880px]:px-sm min-[880px]:text-center">
              {e.period}
            </div>

            {/* desktop rail — the hairline spans the full width so the whole
                line stays centered in the container, with one node centered
                under each company. */}
            <div className="hidden min-[880px]:flex relative items-center h-6 my-sm">
              <span className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px bg-line" />
              {/* Status through size and fill, never hue. The current role is
                  the larger solid `rich` node; the rest are smaller `muted`
                  ones. Both read at a glance in monochrome, which the old
                  indigo-versus-violet pair did not. */}
              <span
                className={`relative z-[1] mx-auto block rounded-full ${
                  e.current ? "h-3.5 w-3.5 bg-rich" : "h-2.5 w-2.5 bg-muted"
                }`}
              />
            </div>

            {/* Tight to the period above it (mt-xs), loose from the focus line
                below (the focus carries mt-sm). Grouping the year with the org
                and holding the description off is what turns four evenly-spaced
                lines into two readable units. */}
            <div className="mt-xs font-display text-h3 text-ink min-[880px]:mt-0 min-[880px]:px-sm min-[880px]:text-center">
              {e.org}
            </div>
            <div className="mt-sm text-small text-muted max-w-[34ch] min-[880px]:mt-0 min-[880px]:px-sm min-[880px]:mx-auto min-[880px]:text-center">
              {e.focus}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
