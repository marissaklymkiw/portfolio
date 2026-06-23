import Label from "@/components/ui/Label";
import LibraryGrid from "@/components/ui/LibraryGrid";
import { getLibraryBooks } from "@/lib/notion";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Library | Marissa Klymkiw",
  description:
    "The books I read and return to — design first, then the systems thinking, craft, and adjacent fields that feed the work.",
};

export default async function LibraryPage() {
  const books = await getLibraryBooks();

  return (
    <>
      <div className="border-b border-line pt-[var(--space-3xl)] pb-[var(--space-2xl)]">
        <div className="wrap">
          <Label className="block mb-[var(--space-md)]">
            Library · what I&apos;m reading
          </Label>
          <h1 className="font-display font-extrabold text-hero tracking-[-.03em] text-indigo max-w-[15ch]">
            Books I think with.
          </h1>
          <p className="mt-[var(--space-md)] max-w-[54ch] text-md text-ink leading-[1.6]">
            What I read and return to — design first, then the systems thinking,
            craft, and adjacent fields that feed it.
          </p>
        </div>
      </div>

      <section className="py-[var(--space-2xl)]">
        <div className="wrap">
          <LibraryGrid books={books} />
        </div>
      </section>
    </>
  );
}
