import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NamePronunciation from "@/components/ui/NamePronunciation";
import Timeline, { type TimelineEntry } from "@/components/ui/Timeline";

export const metadata: Metadata = {
  title: "About | Marissa Klymkiw",
  description:
    "Design systems lead in Los Angeles. Pick something I love, take it apart, rebuild it better. That has been the whole practice since 1999.",
};

/**
 * /about — migrated to the Swiss system 2026-09-19, and rewritten.
 *
 * WHAT CHANGED, AND WHY. This page was the last of the violet/indigo layer on a
 * primary route: `.wrap`, `--space-*`, `text-indigo`, `text-violet`, `text-bark`,
 * `bg-panel`, `rounded-card`, and a `box-shadow` in a system that has none. All
 * of it is gone. It now uses the same shell as /work and /contact: `.canvas`,
 * the ink rule under the header only, and the Swiss spacing scale.
 *
 * The old H1 was "My first design system was a Sailor Moon fan site", with a
 * decorative crescent-moon sticker beside it. MK cut the heading. The STORY
 * stays, moved into the prose where it now names itself instead of leaning on
 * the heading for its referent, because it is the part of this page that
 * explains why she does this rather than what she has done.
 *
 * VOICE. Written against the brief that an About should read like coffee rather
 * than a resume: personality first, the credential arriving one paragraph later
 * as evidence rather than as an opening boast. The scope claim ("~20 product
 * teams, no authority") is still here and still early, because a recruiter
 * confirming seniority in the first screen is a real user (PRODUCT.md). It just
 * is not the first thing said.
 *
 * REMOVED: the photo gallery. Its three images were placeholder SVGs that
 * rendered the words "photo placeholder", so the section carrying all of the
 * personality was three empty grey boxes. Cut at MK's direction until real
 * photos exist; the obsessions still land in the prose and the meta strip.
 * MoonSticker is no longer imported here. Both are recoverable from git, and
 * components/ui/MoonSticker.tsx is untouched on disk.
 */

/* Scannable fact lists, adapted from rachaelgreene.com/about, which MK cited as
   a reference. Its version runs "Clients + Employers" and "Industry
   Experience" as two short bulleted lists near the foot of the page, and the
   value is real: a recruiter gets breadth in one pass without reading prose.

   Adapted rather than copied. Her "Clients + Employers" list is skipped here
   because the Timeline directly above already names all four orgs, with logos
   and a line each, and a second list of the same four would just be an echo.
   Her closing contact block is skipped for the same reason: the global footer
   carries Email / LinkedIn / Resume at display size on every route, and
   /contact exists.

   EVERY VALUE BELOW IS DERIVED FROM SOMETHING ALREADY TRUE IN THIS REPO, not
   invented. Industries come from the four orgs in `timeline`: SoCalGas is a gas
   utility, USC and UCLA are higher ed, Indeed is HR technology. Focus comes
   from PRODUCT.md's Positioning section. PRODUCT.md forbids inventing
   credentials, so if either list should say more, it needs MK's confirmation
   rather than a guess. */
const focus = [
  "Design systems",
  "Governance and adoption",
  "Accessibility",
  "AI-native workflows",
  "Platform design",
];

const industries = ["Higher education", "HR technology", "Energy and utilities"];

const meta: { label: string; value: string }[] = [
  { label: "Based", value: "Los Angeles area" },
  { label: "Still obsessed with", value: "The Beatles, books, a Hobonichi" },
  /* Goes stale. Worth a glance whenever this page is touched.
     Title verified 2026-09-19: "The Disappearers", one s in "Dis". Marlon
     James's sixth novel, Riverhead 2026, longlisted for the Booker that year. */
  { label: "Currently reading", value: "The Disappearers by Marlon James" },
];

/* Narrative timeline of roles, not a logo parade: four bands, one line each.
   Kept despite the "break away from career chronology" advice, because it is
   the fastest seniority signal on the site for a recruiter, and it is four
   lines rather than a history. The long version lives at /resume. */
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
    focus: "Built the design system Experience USC and Guest Access used.",
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

export default function AboutPage() {
  return (
    <div className="canvas pt-2xl pb-3xl">
      {/* Page header keeps its ink rule. Section headings below do NOT get one,
          following the call made on /contact: one rule per page, carried by the
          header, rather than a ladder of them competing down the page. */}
      <header className="border-t border-ink pt-md">
        <h1 className="font-display text-section text-ink">About</h1>
      </header>

      {/* LEDE spans the full canvas on desktop; PROSE and PORTRAIT split the
          row beneath it (1fr / 0.62fr). The lede was previously confined to the
          left text column, which set it against ~770px and broke it over four
          lines. A display statement is allowed the whole measure; the reading
          column is not.

          items-start so the portrait keeps its own height and tops out level
          with the first line of prose rather than stretching to match it.

          ORDER. Source order is lede, prose, portrait, which is the reading
          order and what a screen reader gets. Two overrides, both visual only:
          the lede takes `col-span-2` above 860px so it spans the row, and the
          portrait is lifted to the top below 860px so a phone opens on her face
          rather than on a paragraph. Reordering an image carries no
          reading-order meaning of its own. */}
      <div className="mt-lg grid grid-cols-1 items-start gap-x-3xl gap-y-2xl min-[860px]:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)]">
        {/* text-lede is the paragraph-length display token; `marker` is sized
            for a three-word phrase and would turn this into a wall.

            First person, present tense, on purpose. The previous version
            ("Pick something I love, take it apart, rebuild it better") read as
            slogan-y, and it was: the imperative voice made it an instruction to
            the reader rather than a sentence about her, which put it in a
            different register from every paragraph beneath it.

            No measure cap. Display text may run past the 62ch reading measure,
            and text-balance keeps the line lengths even once it does. */}
        <p className="text-lede text-ink text-balance min-[860px]:col-span-2 min-[860px]:order-1">
          I take the things I love apart to see how they&apos;re built.
          It&apos;s been the same instinct since I was hand-coding fan sites.
        </p>

        {/* Three paragraphs, in order: who and where it started, what it is
            now, and where the same obsession points when it is not pointed at
            work. Reading size (`prose`, 1.125rem) capped at the 62ch measure,
            because this is the one page someone reads straight through. The cap
            sits inside a column wider than it, so the measure governs rather
            than the column. */}
        <div className="flex max-w-measure flex-col gap-lg text-prose text-ink min-[860px]:order-2">
          <p>
            I&apos;m Marissa Klymkiw <NamePronunciation /> and I lead design
            systems in Los Angeles. That first fan site was for Sailor Moon, on
            GeoCities, around 1999: a navigation scheme, a color system,
            reusable pieces copied page to page. I didn&apos;t know those were
            design-system ideas. I just knew it had to be right.
          </p>
          <p>
            Now it&apos;s the patterns ~20 product teams rely on, with no
            authority over any of them. Accessibility, reusable components, and
            the structure that lets other teams build without re-solving the
            same problems. The scale changed. The wiring didn&apos;t.
          </p>
          <p>
            The same obsession points at other things. A book collection with a
            stricter taxonomy than most design systems I&apos;ve audited. A
            Beatles collection that started early and never stopped. A
            Hobonichi, because structure is something I do for fun. If you want
            the work version,{" "}
            <Link
              href="/work"
              className="text-ink underline decoration-1 underline-offset-[3px] transition-colors hover:text-signal"
            >
              the case studies are here
            </Link>
            .
          </p>
        </div>

        {/* Square corners and a hairline, like every other image box in the
            system. NO grayscale filter: the monochrome rule governs the system,
            not the content, and draining a photograph is an aesthetic
            imposition on the evidence (design.md §6). This is the most
            saturated thing on the site, on purpose.

            quality 90 rather than the default 75. This is a portrait of a face,
            and 75 puts visible artefacts around hair and skin gradients; 90 is
            allowed by next.config.ts for exactly this. */}
        <figure className="order-first m-0 min-[860px]:order-3">
          <Image
            src="/about/marissa-klymkiw.jpg"
            alt="Marissa Klymkiw, smiling, in a sunlit campus breezeway."
            width={1400}
            height={1811}
            quality={90}
            priority
            sizes="(min-width: 860px) 32vw, 100vw"
            /* SQUARE ON MOBILE, portrait from 860px. At full width a 3:4 crop
               eats most of a phone screen before a single word is read, so the
               phone gets a 1:1 head-and-shoulders crop and the desktop column
               keeps the full frame. object-top rather than centre: cropping
               1811px down to 1400 removes 411px, and taking it off the BOTTOM
               (the floral top) keeps her face and its headroom intact, where a
               centre crop would shave the top of her hair. */
            className="block w-full aspect-square object-cover object-top border border-line min-[860px]:aspect-[1400/1811]"
          />
        </figure>
      </div>

      {/* Meta strip. Three facts a stranger forms an impression from, in the
          mono scaffolding so they scan without being read. Hairline separators:
          these group without announcing, which is exactly what a separator owes
          and all it owes (design.md §3). Stacks to one column under 880px, where
          the vertical rules become horizontal ones. */}
      <dl className="mt-3xl m-0 grid grid-cols-1 border-t border-line min-[880px]:grid-cols-3">
        {meta.map((m) => (
          <div
            key={m.label}
            className="border-t border-line py-md first:border-t-0 min-[880px]:border-t-0 min-[880px]:border-l min-[880px]:pl-lg min-[880px]:first:border-l-0 min-[880px]:first:pl-0"
          >
            {/* Stays a MONO LABEL, unlike the section h2s on this page. A <dt>
                is a metadata term, not a heading: DESIGN.md puts labels,
                numbers, and tags in Space Mono as scaffolding, and that is what
                this is. Only the <h2> band headings moved to Hanken. */}
            <dt className="font-mono text-label uppercase tracking-label text-muted">
              {m.label}
            </dt>
            <dd className="mt-xs m-0 text-body text-ink">{m.value}</dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="timeline-heading" className="mt-3xl">
        <h2
          id="timeline-heading"
          className="font-display text-h2 text-ink"
        >
          Where I&apos;ve built design systems
        </h2>
        <div className="mt-xl">
          <Timeline entries={timeline} />
        </div>
      </section>

      {/* The scannable pair. Two columns from 620px, stacked below it.

          Headings are Hanken text-h2 in ink, matching /contact and the band
          headings everywhere else. They were mono labels, on the reasoning that
          they should read as scaffolding; DESIGN.md draws that line the other
          way. "Hanken names things" covers headings, and Space Mono is reserved
          for labels, numbers, and tags. A section heading is a heading.

          Hairline-separated rows so each list scans as a list without needing
          bullets, which this system does not use. */}
      <div className="mt-3xl grid grid-cols-1 gap-x-3xl gap-y-2xl min-[620px]:grid-cols-2">
        <section aria-labelledby="focus-heading">
          <h2
            id="focus-heading"
            className="font-display text-h2 text-ink"
          >
            What I work on
          </h2>
          <ul className="mt-lg list-none p-0 m-0">
            {focus.map((item) => (
              <li
                key={item}
                className="border-t border-line py-sm text-body text-ink first:border-t-0 first:pt-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="industries-heading">
          <h2
            id="industries-heading"
            className="font-display text-h2 text-ink"
          >
            Industries
          </h2>
          <ul className="mt-lg list-none p-0 m-0">
            {industries.map((item) => (
              <li
                key={item}
                className="border-t border-line py-sm text-body text-ink first:border-t-0 first:pt-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
