import type { Metadata } from "next";
import Link from "next/link";
import Label from "@/components/ui/Label";
import Timeline, { type TimelineEntry } from "@/components/ui/Timeline";
import NamePronunciation from "@/components/ui/NamePronunciation";
import MoonSticker from "@/components/ui/MoonSticker";

export const metadata: Metadata = {
  title: "About | Marissa Klymkiw",
  description:
    "Design systems lead in Los Angeles. My first design system was a Sailor Moon fan site on GeoCities, ~1999 — same wiring, different scale ever since.",
};

/* ink at low opacity — the meta row's top/bottom hairlines */
const hairline = "border-[color-mix(in_srgb,var(--color-ink)_14%,transparent)]";

const meta: { label: string; value: string }[] = [
  { label: "Based", value: "Los Angeles area" },
  { label: "Still obsessed with", value: "The Beatles, books, a Hobonichi" },
  { label: "Currently reading", value: "Chess by Stefan Zweig" },
];

/* Narrative timeline of roles. Focus lines are short and placeholder-ish for
   Indeed/UCLA; confirm/refine the actual focus per role. Logos added as supplied. */
const timeline: TimelineEntry[] = [
  {
    period: "2014–2019",
    org: "SoCalGas",
    focus:
      "Rebuilt the customer website and set the standards the org built on.",
    logo: "/logos/socalgas.svg",
    logoScale: 1.22,
  },
  {
    period: "2019–2022",
    org: "USC",
    focus:
      "Built the design system Experience USC and Guest Access used.",
    logo: "/logos/usc.svg",
    logoScale: 0.82,
  },
  {
    period: "2022–2024",
    org: "Indeed",
    focus:
      "Set the data-visualization standards aligning UX across Indeed's enterprise hiring teams at marketplace scale.",
    logo: "/logos/indeed.svg",
    logoScale: 0.95,
  },
  {
    period: "2024–Current",
    org: "UCLA",
    focus:
      "Scaling it enterprise-wide through a cross-org partnership, piloting AI-powered design to codify patterns campus teams will build on.",
    logo: "/logos/ucla.svg",
    logoScale: 0.84,
    current: true,
  },
];

const photos = [
  {
    src: "/about/beatles.svg",
    alt: "Marissa's Beatles collection — records, books, and memorabilia.",
    caption: "The collection. Started early, never stopped.",
  },
  {
    src: "/about/books.svg",
    alt: "A shelf of books, stacked and overflowing.",
    caption: "A stack that's always taller than the time to read it.",
  },
  {
    src: "/about/hobonichi.svg",
    alt: "A Hobonichi planner open on a desk.",
    caption: "The Hobonichi. Structure as a thing I do for fun.",
  },
];

const frame =
  "flex flex-col bg-panel rounded-card overflow-hidden border border-line shadow-[0_8px_28px_color-mix(in_srgb,var(--color-ink)_12%,transparent)]";
const caption = "font-mono text-xs text-bark px-[var(--space-sm)] py-[var(--space-xs)]";

export default function AboutPage() {
  return (
    <>
      {/* hero + background — plain interior treatment, no grid, no highlight */}
      <section className="pt-[var(--space-3xl)] pb-[var(--space-2xl)]">
        <div className="wrap">
          <Label className="block mb-[var(--space-md)]">About</Label>
          <div className="relative">
            <h1 className="font-display font-extrabold text-hero tracking-[-.03em] text-indigo max-w-[16ch]">
              My first design system was a Sailor Moon fan site
            </h1>
            <MoonSticker className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[150px] rotate-[8deg] pointer-events-none select-none" />
          </div>

          <div className="mt-[var(--space-xl)] max-w-[60ch] flex flex-col gap-[var(--space-md)] text-md text-ink leading-[1.6]">
            <p>
              I&apos;m Marissa Klymkiw{" "}
              <NamePronunciation /> and I lead design systems in Los Angeles. I
              build the patterns ~20 product teams rely on, with no authority
              over any of them. I also keep a book collection with a stricter
              taxonomy than most design systems I&apos;ve audited.
            </p>
            <p>
              The fan site came first. I hand-coded it on GeoCities around
              1999: a navigation scheme, a color system, reusable pieces copied
              page to page. I didn&apos;t know those were design-system ideas. I
              just knew it had to be right.
            </p>
            <p>
              The pattern never changed: pick something I love, take it apart,
              rebuild it better. That is the whole practice now, accessibility,
              reusable patterns, and the structure that lets other teams build
              without re-solving the same problems. If you want the work version,{" "}
              <Link href="/work" className="text-violet underline">
                the case study is here
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* meta row — hairline top + bottom */}
      <section className="pb-[var(--space-2xl)]">
        <div className="wrap">
          <dl
            className={`grid grid-cols-1 border-y ${hairline} font-mono text-xs min-[880px]:grid-cols-3`}
          >
            {meta.map((m) => (
              <div
                key={m.label}
                className={`py-[var(--space-md)] border-t ${hairline} first:border-t-0 min-[880px]:border-t-0 min-[880px]:border-l min-[880px]:pl-[var(--space-lg)] min-[880px]:first:border-l-0 min-[880px]:first:pl-0`}
              >
                <dt className="text-violet font-medium uppercase tracking-[.1em]">
                  {m.label}
                </dt>
                <dd className="mt-1 text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* timeline — origin to now (narrative, not a logo parade) */}
      <section className="pb-[var(--space-2xl)]">
        <div className="wrap">
          <Label className="block mb-[var(--space-lg)]">
            Where I&apos;ve built design systems
          </Label>
          <Timeline entries={timeline} />
        </div>
      </section>

      {/* photo gallery — the page's one place with real-photo warmth */}
      <section className="pb-[var(--space-3xl)]">
        <div className="wrap">
          <Label className="block">The things I go all the way in on</Label>
          <p className="mt-[var(--space-2xs)] text-base text-bark">
            The obsession, pointed at other things.
          </p>

          <div className="mt-[var(--space-lg)] grid grid-cols-1 gap-[var(--space-md)] min-[880px]:grid-cols-2 min-[880px]:grid-rows-2">
            {/* Beatles — spans both rows on desktop and fills the height; 4:3 when stacked */}
            <figure className={`${frame} min-[880px]:row-span-2 min-[880px]:h-full`}>
              <img
                src={photos[0].src}
                alt={photos[0].alt}
                loading="lazy"
                className="block w-full object-cover border-b border-line aspect-[4/3] min-[880px]:aspect-auto min-[880px]:flex-1 min-[880px]:min-h-0"
              />
              <figcaption className={caption}>{photos[0].caption}</figcaption>
            </figure>

            {/* books over hobonichi — fill the right column, one per row */}
            {photos.slice(1).map((p) => (
              <figure key={p.src} className={frame}>
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="block w-full object-cover border-b border-line aspect-[4/3]"
                />
                <figcaption className={caption}>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
