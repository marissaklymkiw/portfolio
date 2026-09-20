import Image from "next/image";
import type { Book } from "@/lib/library";

/**
 * BookList — a ruled vertical list of books, the same ledger pattern used by
 * "How I work" (hairline rules at ink/low-opacity, a mono meta column, no boxed
 * cards). Mono column carries the cover (if available), year + reading status;
 * the right column the title (Archivo), author, and one-line note.
 *
 * `variant="feature"` (default) is for the prominent Design shelf — larger
 * titles with cover art. `variant="compact"` is the quieter treatment for
 * everything below it (text only).
 * Responsive: two columns on desktop, stacking to one (meta above title) under
 * 880px. That breakpoint was inherited from HowIWorkLayers, which was deleted
 * 2026-09-20; the value stays because it is the one this layout was tuned to,
 * not because anything still matches it.
 */

const hairline =
  "border-[color-mix(in_srgb,var(--color-ink)_14%,transparent)]";

function coverUrl(isbn: string) {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
}

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
          {/* meta column — cover (feature only) + year + status */}
          <div className="font-mono text-violet">
            {variant === "feature" && b.isbn && (
              <div className="mb-[var(--space-sm)]">
                <Image
                  src={coverUrl(b.isbn)}
                  alt={`Cover of ${b.title}`}
                  width={80}
                  height={112}
                  className="rounded-sm shadow-sm object-cover"
                  unoptimized
                />
              </div>
            )}
            {b.published && (
              <span className="block text-sm font-semibold tracking-[.04em]">
                {b.published}
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
