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
  /** the current role — gets the filled indigo node */
  current?: boolean;
};

/* ink at low opacity — the mobile stacked-list hairlines */
const hairline = "border-[color-mix(in_srgb,var(--color-ink)_14%,transparent)]";

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
 * with dots on desktop; stacks to a ruled vertical list below 880px. Inherits
 * the design system: JetBrains Mono periods (violet), Archivo org names
 * (indigo), Inter focus (bark), a hairline rail with violet nodes and a filled
 * indigo node for the current role. Paper surface, optically-balanced brand
 * logos per band, no dark fills.
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
            className={`flex flex-col gap-[var(--space-2xs)] border-t ${hairline} pt-[var(--space-md)] min-[880px]:border-t-0 min-[880px]:pt-0 min-[880px]:gap-0`}
          >
            {/* logo slot — reserved on desktop so the rail stays level even
                where a logo hasn't been supplied yet */}
            <div
              className={`${
                e.logo ? "flex" : "hidden min-[880px]:flex"
              } items-center min-[880px]:h-20 min-[880px]:mb-[var(--space-2xs)] min-[880px]:justify-center min-[880px]:px-[var(--space-sm)]`}
            >
              {e.logo && (
                <img
                  src={e.logo}
                  alt=""
                  style={{ "--ls": e.logoScale ?? 1 } as React.CSSProperties}
                  className="w-auto max-w-full object-contain h-[calc(2.875rem_*_var(--ls))] min-[880px]:h-[calc(3.25rem_*_var(--ls))]"
                />
              )}
            </div>

            {/* years — above the line */}
            <div className="font-mono text-xs font-medium uppercase tracking-[.1em] text-violet min-[880px]:px-[var(--space-sm)] min-[880px]:text-center">
              {e.period}
            </div>

            {/* rail — desktop only; the hairline spans the full width so the
                whole line stays centered in the container, with one node
                centered under each company. Current role gets the indigo node. */}
            <div className="hidden min-[880px]:flex relative items-center h-6 my-[var(--space-sm)]">
              <span className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px bg-line" />
              <span
                className={`relative z-[1] mx-auto block rounded-full ${
                  e.current ? "h-3.5 w-3.5 bg-indigo" : "h-2.5 w-2.5 bg-violet"
                }`}
              />
            </div>

            <div className="font-display font-bold text-base leading-[1.2] tracking-[-.02em] text-indigo min-[880px]:px-[var(--space-sm)] min-[880px]:text-center">
              {e.org}
            </div>
            <div className="text-sm text-bark leading-[1.5] max-w-[34ch] min-[880px]:px-[var(--space-sm)] min-[880px]:mx-auto min-[880px]:text-center">
              {e.focus}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
