import type { Book } from "@/lib/library";

/**
 * BookList — a ruled vertical list of books, the same ledger pattern used by
 * "How I work" (hairline rules at ink/low-opacity, a mono meta column, no boxed
 * cards). Mono column carries the year + reading status; the right column the
 * title (Archivo), author, and one-line note.
 *
 * `variant="feature"` (default) is for the prominent Design shelf — larger
 * titles. `variant="compact"` is the quieter treatment for everything below it.
 * Responsive: two columns on desktop, stacking to one (meta above title) under
 * 880px — matching HowIWorkLayers so the page reads as one system.
 */

const hairline =
  "border-[color-mix(in_srgb,var(--color-ink)_14%,transparent)]";

export default function BookList({
  books,
  variant = "feature",
}: {
  books: Book[];
  variant?: "feature" | "compact";
}) {
  if (books.length === 0) {
    return <p className="text-base text-bark">Nothing on this shelf yet.</p>;
  }

  const titleSize = variant === "feature" ? "text-xl" : "text-lg";

  return (
    <ol>
      {books.map((b) => (
        <li
          key={b.title}
          className={`grid grid-cols-1 gap-x-[var(--space-lg)] gap-y-[var(--space-2xs)] border-t ${hairline} py-[var(--space-md)] min-[880px]:grid-cols-[140px_1fr]`}
        >
          {/* mono meta column — year + optional reading status */}
          <div className="font-mono text-violet">
            {b.year && (
              <span className="block text-sm font-semibold tracking-[.04em]">
                {b.year}
              </span>
            )}
            {b.status && (
              <span className="block mt-1 text-xs font-medium uppercase tracking-[.12em]">
                {b.status}
              </span>
            )}
          </div>

          {/* title + author + note */}
          <div>
            <h3
              className={`font-display font-bold ${titleSize} leading-[1.2] tracking-[-.02em] text-indigo`}
            >
              {b.title}
            </h3>
            <div className="mt-0.5 text-base text-bark">{b.author}</div>
            {b.note && (
              <p className="mt-[var(--space-2xs)] max-w-[60ch] text-ink text-base leading-[1.6]">
                {b.note}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
