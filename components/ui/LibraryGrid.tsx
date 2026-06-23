"use client";

import { useState } from "react";
import BookCard from "./BookCard";
import type { Book, BookCategory } from "@/lib/library";
import { categoryOrder } from "@/lib/library";

const ALL = "All";
const filters = [ALL, ...categoryOrder] as const;
type Filter = (typeof filters)[number];

export default function LibraryGrid({ books }: { books: Book[] }) {
  const [active, setActive] = useState<Filter>(ALL);

  const filtered =
    active === ALL ? books : books.filter((b) => b.category === active);

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-[var(--space-2xs)] mb-[var(--space-xl)]">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`font-mono text-xs uppercase tracking-[.1em] px-[var(--space-sm)] py-[6px] rounded-full border transition-colors cursor-pointer ${
              active === f
                ? "bg-indigo text-paper border-indigo"
                : "text-bark border-line hover:text-violet hover:border-violet"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 5-col grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[var(--space-md)] gap-y-[var(--space-xl)] items-end">
        {filtered.map((book) => (
          <BookCard key={book.title} book={book} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-base text-bark">Nothing on this shelf yet.</p>
      )}
    </div>
  );
}
