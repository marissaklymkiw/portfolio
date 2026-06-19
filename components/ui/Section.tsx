/**
 * Section — a top-level page section: vertical rhythm + hairline divider,
 * content held in the centered `.wrap` column. `id` is the anchor target
 * (scroll-margin handled globally so it clears the sticky header).
 */
export default function Section({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-[var(--space-2xl)] border-b border-line">
      <div className="wrap">{children}</div>
    </section>
  );
}
