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

/* VALUES — MK'S OWN WORDS, supplied 2026-09-20. This replaced four claims
   Claude had derived from elsewhere in the repo ("AI carries the pace, not the
   judgment", "Access is structural", "Clarity is what earns trust", "The work I
   am proudest of is invisible"). Those were accurate but assembled; these are
   hers. Do not "improve" them back toward aphorism. The claims are deliberately
   full first-person sentences rather than slogans, which is the same call the
   lede comment above records: an imperative reads as an instruction to the
   reader, a sentence reads as a fact about her.

   ONE EDIT was made to the supplied copy. The first body arrived with an em
   dash ("already in place — that part stays with me"); PRODUCT.md and MK's own
   standing rule both forbid em dashes, so it is a period. Nothing else changed.

   The fourth value returned in MK's own words minutes after the other three:
   "The work I'm proudest of doesn't have my name on it." It is verbatim.

   KNOWN OVERLAP, flagged to MK and left as she wrote it: its first sentence
   restates the prose above ("~20 product teams... not one of those teams
   reports to me"). The value earns its place on the two sentences that follow,
   which are the only concrete account anywhere on the site of what the job
   looks like week to week. If the repetition ever needs resolving, cut the
   overlap from the PROSE and let this row carry it, not the other way round:
   this version has the texture, the prose version only has the claim. */
const values: { claim: string; body: string }[] = [
  {
    claim: "I use AI every day, and I set the terms before it starts.",
    body: "This site was built with it. It carries the pace because the context, constraints, and standards are already in place. That part stays with me.",
  },
  {
    claim: "I build accessibility into the components before anyone ships on them.",
    body: "Around 20 teams inherit that work instead of solving it again at the end. Retrofitting is where it gets expensive and where it quietly gets skipped, so I don’t leave it there.",
  },
  {
    claim: "I name things by what they do.",
    body: "High-stakes products lose people the moment the interface hides how a decision was made. I write for what actually happens, and I cut anything that doesn’t help someone understand what’s in front of them.",
  },
  {
    claim: "The work I’m proudest of doesn’t have my name on it.",
    body: "I lead the systems roughly 20 teams build on without authority over any of them. One week that’s a token change, the next it’s auditing how components are actually being used in products. What lasts is the alignment that still holds after I’ve moved on.",
  },
];

const meta: { label: string; value: string }[] = [
  { label: "Based", value: "Los Angeles area" },
  { label: "Still obsessed with", value: "The Beatles, books, my Hobonichi" },
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
    /* Named the two products (Experience USC, Guest Access) until 2026-09-20.
       Neither name means anything to a stranger, and Guest Access is held
       back from launch 1, so there is no page to click through to. Says who
       used them instead, at MK's direction. */
    focus:
      "Built the design system behind the consumer-grade applications students and their families use.",
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

        {/* Four paragraphs, in order: who and where it started, what it is
            now, who is at the end of it, and where the same obsession points
            when it is not pointed at work. Reading size (`prose`, 1.125rem) capped at the 62ch measure,
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
          {/* INFLUENCE lives in the VALUES BAND below, not here. This
              paragraph briefly carried it outright ("Not one of those teams
              reports to me... influence without authority is the job itself"),
              then MK's fourth value arrived saying the same thing, and two
              statements of "~20 teams, no authority over them" landed within a
              few hundred pixels of each other in one column. Resolved 2026-09-20
              in the value's favour, at her direction: that row has the claim
              AND what the job looks like week to week, this paragraph only had
              the claim.
              What survives here is "Adoption is earned, never issued", which is
              the mechanism rather than the credential, and it sets up the value
              without pre-empting it. Do not restate the reporting line here.

              "Accessibility, reusable components, and the structure that lets
              other teams build without re-solving the same problems." Cut
              2026-09-20 as a duplicate of the "What I work on" list below, then
              RESTORED the same day at MK's direction. Leave it. The list below
              is five bare noun phrases; this sentence is the only place on the
              page that says what the patterns actually do for the teams that
              inherit them, which is the substance the list only labels. */}
          <p>
            Now it&apos;s the patterns ~20 product teams rely on. Adoption is
            earned, never issued. Accessibility, reusable components, and the
            structure that lets other teams build without re-solving the same
            problems. The scale changed. The wiring didn&apos;t.
          </p>
          {/* THE USER. Added 2026-09-20: MK noticed the page had no end user in
              it at all. The paragraph above stops at "product teams", which is
              exactly where the chain broke — every claim on the page was about
              systems, patterns, and the people who build on them, and nobody
              who has to USE the result. For a page aimed at hiring managers
              for consumer-facing roles that was the gap.

              All three examples are lifted from real studies in this repo, not
              invented: the researcher and the microscope are the DRP hero
              image, the locked-out parent is USC Guest Access (records,
              financial aid, billing), and the manager counting by hand across
              six tools is the Sourcing Analytics opening. Keep them specific.
              Generalising them back to "users" is what the page already did. */}
          <p>
            Teams aren&rsquo;t the end of that chain. A researcher who
            can&rsquo;t get a microscope on the network, a parent locked out of
            a tuition bill, a manager counting her hiring pipeline by hand across
            six tools: none of them chose the software they were handed. Software
            people are required to use owes them more care than software they
            pick, not less. That is what the structure is for.
          </p>

          {/* Two of the three hobbies were cut 2026-09-20: the Beatles
              collection and the Hobonichi. The meta strip directly below this
              column already reads "The Beatles, books, my Hobonichi", so the
              paragraph was listing the same three things a screen away from
              where they are listed. The book line is the one that survives
              because it is the only one doing an ARGUMENT rather than a fact:
              it proves the "same obsession everywhere" claim instead of
              asserting it. Do not re-add the other two here; if they need more
              than the strip gives them, they belong in the strip. */}
          <p>
            The same obsession points at other things. A book collection with a
            stricter taxonomy than most design systems I&apos;ve audited. If you
            want the work version,{" "}
            <Link
              href="/work"
              className="text-ink underline decoration-1 underline-offset-[3px] transition-colors hover:text-signal"
            >
              the case studies are here
            </Link>
            .
          </p>

        {/* HOW I WORK — the values band. INSIDE the prose column, at MK's
            direction (2026-09-20), after three tries at placing it: below the
            timeline, above it, then as a standalone band under this grid row.
            The standalone version was the bug she caught. As a sibling of the
            grid it had to clear the PORTRAIT, which is far taller than the prose,
            so it opened ~300px of dead space on the left before the heading.
            Inside the column it flows straight out of the last paragraph and the
            photo simply sits beside it.
            Keep it in this column. Moving it back out reopens that hole.
            This is the one part of the page that asks to be read, not scanned.

            Same hairline rows as the two lists below, but py-lg rather than py-sm
            because each row is two lines of content rather than one. Each body is
            The MEASURE CAP IS ON THE <ul>, not on each body. The rules are the
            reason: a cap on the paragraphs alone stops the text at ~62ch while
            every hairline keeps running to the canvas edge, trailing ~650px past
            the last word into nothing. The meta strip above gets away with
            full-width rules because its three columns fill that width; this band
            fills half of it. Rules stop at the content edge (design.md, and the
            same call MarkerBlock documents on the home page).

            The claim is bold ink and the body is regular ink. No muted variant:
            weight alone carries the hierarchy, which is how the case studies do
            a claim plus its explanation (see the DRP study, §03). */}
        <section aria-labelledby="values-heading" className="mt-lg">
          <h2 id="values-heading" className="font-display text-h2 text-ink">
            How I work
          </h2>
          <ul className="mt-lg max-w-measure list-none p-0 m-0">
            {values.map((v) => (
              <li
                key={v.claim}
                className="border-t border-line py-lg first:border-t-0 first:pt-0"
              >
                <p className="m-0 text-body font-bold text-ink">{v.claim}</p>
                <p className="mt-xs m-0 text-body text-ink">{v.body}</p>
              </li>
            ))}
          </ul>
        </section>
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
