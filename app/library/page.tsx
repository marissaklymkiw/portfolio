import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Label from "@/components/ui/Label";
import BookList from "@/components/ui/BookList";
import { books, categoryOrder } from "@/lib/library";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library | Marissa Klymkiw",
  description:
    "The books I read and return to — design first, then the systems thinking, craft, and adjacent fields that feed the work.",
};

const designBooks = books.filter((b) => b.category === "Design");

const otherGroups = categoryOrder
  .filter((c) => c !== "Design")
  .map((category) => ({
    category,
    items: books.filter((b) => b.category === category),
  }))
  .filter((g) => g.items.length > 0);

export default function LibraryPage() {
  return (
    <>
      {/* page header — plainer than the home hero on purpose: no grid
          background and no marker highlight (those belong to the homepage). */}
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

      {/* 01 — Design (the prominent shelf) */}
      <Section id="design">
        <SectionHeader
          num="01"
          title="Design"
          desc="The core of the shelf — books that shaped how I think about interfaces, systems, and the craft of making them usable."
        />
        <BookList books={designBooks} variant="feature" />
      </Section>

      {/* 02 — Beyond design (secondary, grouped) */}
      {otherGroups.length > 0 && (
        <Section id="beyond">
          <SectionHeader
            num="02"
            title="Beyond design"
            desc="The systems thinking, product craft, and adjacent fields that feed the design work."
          />
          <div className="flex flex-col gap-[var(--space-xl)]">
            {otherGroups.map((g) => (
              <div key={g.category}>
                <Label variant="ink" className="block mb-[var(--space-sm)]">
                  {g.category}
                </Label>
                <BookList books={g.items} variant="compact" />
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
