/**
 * Metrics — the case-study evidence pattern: big numbers separated by thin
 * vertical rules inside one bounded white box (NOT individual accent-stripe
 * cards). Stays 3-across on every width, scaling the numbers down rather than
 * stacking.
 */
type Metric = {
  value: string;
  /** trailing unit rendered in violet (e.g. the "+") */
  unit?: string;
  caption: string;
};

const metrics: Metric[] = [
  { value: "20", unit: "+", caption: "product pods aligned" },
  { value: "50", unit: "+", caption: "components built" },
  { value: "0", caption: "reporting lines required" },
];

export default function Metrics() {
  return (
    <div className="grid grid-cols-3 gap-0 mt-[var(--space-sm)] bg-panel border border-line rounded-card py-[var(--space-lg)] px-[var(--space-md)] max-[760px]:py-[var(--space-md)] max-[760px]:px-[var(--space-sm)]">
      {metrics.map((m, i) => (
        <div
          key={m.caption}
          className={
            i === 0
              ? "pl-[var(--space-md)] pr-[var(--space-lg)] max-[760px]:pr-2"
              : "px-[var(--space-lg)] border-l border-line max-[760px]:px-2"
          }
        >
          <div className="font-display font-extrabold text-3xl leading-[.95] tracking-[-.03em] text-indigo max-[760px]:text-xl max-[440px]:text-lg">
            {m.value}
            {m.unit && <span className="text-violet">{m.unit}</span>}
          </div>
          <div className="font-mono text-xs uppercase tracking-[.08em] text-bark mt-4 max-[760px]:text-[9px] max-[760px]:mt-2 max-[440px]:text-[8px] max-[440px]:tracking-[.04em]">
            {m.caption}
          </div>
        </div>
      ))}
    </div>
  );
}
