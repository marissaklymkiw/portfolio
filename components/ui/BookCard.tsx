import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/library";
import { bookSlug } from "@/lib/library";

function coverUrl(isbn: string) {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
}

const statusLabel: Record<string, string> = {
  Reading: "Now reading",
  "Re-reading": "Re-reading",
};

export default function BookCard({ book }: { book: Book }) {
  const slug = bookSlug(book.title);
  const activeStatus = book.status && statusLabel[book.status];

  return (
    <Link
      href={`/library/${slug}`}
      className="group relative block self-end"
      aria-label={`${book.title} by ${book.author}`}
    >
      {/* Cover — intrinsic aspect ratio so the rounded corners hug the
          actual cover (no letterboxing), bottom-aligned across the row */}
      {book.coverUrl || book.isbn ? (
        <Image
          src={book.coverUrl ?? coverUrl(book.isbn!)}
          alt={`Cover of ${book.title}`}
          width={0}
          height={0}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="w-full h-auto rounded-sm ring-1 ring-[rgba(0,0,0,0.08)] shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ width: "100%", height: "auto" }}
        />
      ) : (
        <div className="flex items-end aspect-[2/3] rounded-sm bg-indigo p-[var(--space-xs)] shadow-[0_1px_8px_rgba(0,0,0,0.10)]">
          <span className="font-display font-bold text-sm leading-tight text-paper opacity-80">
            {book.title}
          </span>
        </div>
      )}

      {/* Status badge */}
      {activeStatus && (
        <div className="absolute top-[var(--space-2xs)] left-[var(--space-2xs)]">
          <span className="block font-mono text-[10px] font-semibold uppercase tracking-[.1em] bg-yellow text-ink px-[6px] py-[3px] rounded-[2px]">
            {activeStatus}
          </span>
        </div>
      )}
    </Link>
  );
}
