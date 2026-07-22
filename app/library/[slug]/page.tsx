import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowBack from "@/components/ui/ArrowBack";
import { getLibraryBooks } from "@/lib/notion";
import { bookSlug } from "@/lib/library";
import type { Metadata } from "next";

export const revalidate = 3600;

function coverUrl(isbn: string) {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
}

export async function generateStaticParams() {
  const books = await getLibraryBooks();
  return books.map((b) => ({ slug: bookSlug(b.title) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const books = await getLibraryBooks();
  const book = books.find((b) => bookSlug(b.title) === slug);
  if (!book) return {};
  return {
    title: `${book.title} | Library | Marissa Klymkiw`,
    description: book.note,
  };
}

type MetaItem = { label: string; value: string };

function StarRating({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(1, Math.round(rating)));
  return (
    <span className="text-violet text-lg leading-none tracking-[.05em]">
      {"★".repeat(clamped)}
      <span className="opacity-20">{"★".repeat(5 - clamped)}</span>
    </span>
  );
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const books = await getLibraryBooks();
  const book = books.find((b) => bookSlug(b.title) === slug);

  if (!book) notFound();

  const meta: MetaItem[] = [
    ...(book.publisher ? [{ label: "Publisher", value: book.publisher }] : []),
    ...(book.format ? [{ label: "Format", value: book.format }] : []),
    ...(book.published ? [{ label: "Published", value: book.published }] : []),
    ...(book.pages ? [{ label: "Pages", value: book.pages.toString() }] : []),
    { label: "Category", value: book.category },
    ...(book.status
      ? [{ label: "Status", value: book.status === "Reading" ? "Now reading" : book.status }]
      : []),
    ...(book.signed ? [{ label: "Signed", value: "Yes" }] : []),
  ];

  const hasCover = book.coverUrl || book.isbn;

  return (
    <div className="pt-[var(--space-3xl)] pb-[var(--space-3xl)]">
      <div className="wrap">
        {/* Back */}
        <Link
          href="/library"
          className="inline-flex items-center gap-1 font-mono text-sm text-bark hover:text-violet transition-colors mb-[var(--space-xl)]"
        >
          <ArrowBack />
          Library
        </Link>

        <div className="grid grid-cols-1 gap-[var(--space-xl)] min-[720px]:grid-cols-[220px_1fr]">
          {/* Cover */}
          <div className="min-[720px]:sticky min-[720px]:top-[var(--space-xl)] self-start">
            {hasCover ? (
              <div className="relative aspect-[2/3] w-full max-w-[220px] rounded-sm overflow-hidden bg-line shadow-md">
                <Image
                  src={book.coverUrl ?? coverUrl(book.isbn!)}
                  alt={`Cover of ${book.title}`}
                  fill
                  sizes="220px"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="flex items-end aspect-[2/3] w-full max-w-[220px] rounded-sm bg-indigo p-[var(--space-md)] shadow-md">
                <span className="font-display font-bold text-lg leading-tight text-paper opacity-80">
                  {book.title}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="font-display font-extrabold text-xl leading-[1.1] tracking-[-.03em] text-indigo">
              {book.title}
            </h1>
            <p className="mt-[var(--space-xs)] text-md text-bark">
              {book.author}
            </p>

            {/* Rating */}
            {book.rating && (
              <div className="mt-[var(--space-sm)]">
                <StarRating rating={book.rating} />
              </div>
            )}

            {/* Note */}
            {book.note && (
              <p className="mt-[var(--space-lg)] max-w-[52ch] text-md text-ink leading-[1.65] border-l-2 border-violet pl-[var(--space-md)]">
                {book.note}
              </p>
            )}

            {/* Metadata grid */}
            {meta.length > 0 && (
              <dl className="mt-[var(--space-xl)] grid grid-cols-2 sm:grid-cols-3 gap-x-[var(--space-lg)] gap-y-[var(--space-md)] border-t border-line pt-[var(--space-lg)]">
                {meta.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="font-mono text-xs uppercase tracking-[.1em] text-bark mb-1">
                      {label}
                    </dt>
                    <dd className="text-base text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
