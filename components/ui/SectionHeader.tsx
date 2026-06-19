/**
 * SectionHeader — the numbered section heading (e.g. "01 · Color"), with the
 * real <h2> living here so the page keeps a correct heading hierarchy.
 */
export default function SectionHeader({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-[var(--space-sm)] mb-[var(--space-lg)]">
      <span className="font-mono text-sm font-semibold text-violet">{num}</span>
      <div>
        <h2 className="m-0 font-display font-bold text-xl tracking-[-.02em] text-indigo">
          {title}
        </h2>
        <p className="mt-1.5 text-base text-bark max-w-[58ch]">{desc}</p>
      </div>
    </div>
  );
}
