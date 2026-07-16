import Image from "next/image";
import type { ReactNode } from "react";
import CaseStudyRail, { type RailStage } from "@/components/ui/CaseStudyRail";

export type { RailStage };

/**
 * CaseStudy — the Swiss case-study template.
 *
 * A set of composable primitives, not a single monolith: a study assembles them
 * (see app/work/[slug]/DeviceRegistrationCaseStudy.tsx). Adding a second study
 * means writing content against these, not restyling anything.
 *
 * STRUCTURE (after reginasmirnova.com/shares, restaged in the Swiss system):
 *   back link → title → metadata as label/value columns → tools → oversized
 *   lede → full-width hero image → stages, each: section rule + mono tag +
 *   heading + a measured body column with the right side left open.
 *
 * The lede comes BEFORE the hero, which is the one place this departs from the
 * reference: the argument lands first, so the image reads as evidence for a
 * claim already made rather than as decoration to scroll past.
 *
 * Body copy is measured with `max-w-reading` (88ch at 18px ≈ 990px, ~125 real
 * characters). Beware the unit: `ch` is the width of the "0" glyph, NOT a
 * character — 88ch is ~125 letters, not 88. That is past the classic 45–75
 * guideline, chosen deliberately against a 1312px canvas where a tighter column
 * read as cramped. If you change it, MEASURE the rendered line rather than
 * trusting the number.
 *
 * NO ROUNDED CORNERS anywhere. Images, figures, and containers are square
 * (radius 0); only pills are round (999px). The system is binary — design.md §3.
 *
 * Photographs render in FULL COLOUR. The monochrome rule governs the system —
 * type, rules, labels, chrome — not the work. Never add a grayscale filter to
 * content imagery.
 */

/* ---- Root ------------------------------------------------------------- */

export function CaseStudyRoot({ children }: { children: ReactNode }) {
  return <article className="canvas pb-3xl">{children}</article>;
}

/* ---- Badge ------------------------------------------------------------ */

/**
 * A two-part badge: a solid ink mark inside an outlined pill, then a label.
 * e.g. [ UCLA ] PLATFORM DESIGN
 *
 * Restaged into the system rather than copied: the source reference is white-
 * on-blue with sentence case, this is ink-on-white with the same uppercase mono
 * scaffolding as every other label on the site. Consistency with the system
 * beats fidelity to the reference — the shape is the idea worth taking.
 *
 * Both halves clear AA comfortably: paper-on-ink and ink-on-paper are both
 * 18.56:1. The pill is the one round thing in a square system (design.md §3),
 * so a badge is exactly where a radius belongs.
 */
export function Badge({ mark, label }: { mark: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-md rounded-full border-[1.5px] border-ink p-xs pr-md">
      <span className="inline-block rounded-full bg-ink px-md py-sm font-mono text-label uppercase tracking-label text-paper">
        {mark}
      </span>
      <span className="font-mono text-label uppercase tracking-label text-ink">
        {label}
      </span>
    </span>
  );
}

/* ---- Header ----------------------------------------------------------- */

export type MetaItem = { label: string; value: ReactNode };

export function CaseStudyHeader({
  badge,
  title,
  meta,
}: {
  badge?: { mark: string; label: string };
  title: string;
  meta: MetaItem[];
}) {
  return (
    /* no back link here — it lives at the top of the rail (CaseStudyRail), so
       there is exactly one of them on the page */
    <header className="pt-xl">
      {badge && (
        <span className="block">
          <Badge mark={badge.mark} label={badge.label} />
        </span>
      )}

      {/* the title is a HEADING, so it's Hanken — unlike the home wordmark,
          which is Inter because it's a display object, not a heading. */}
      {/* max-w governs how the headline breaks. 20ch forced this title into
          three cramped lines; 30ch lets it fall in two. text-balance then evens
          the lines out rather than leaving a runt on the last one. */}
      <h1 className="mt-md font-display text-[clamp(2rem,5.5vw,4.5rem)] font-extrabold leading-[0.95] tracking-display text-ink text-balance max-w-[30ch]">
        {title}
      </h1>

      {/* metadata sits directly under the title as label/value columns — the
          reference's move. Mono label above, Inter value below. */}
      <dl className="mt-2xl grid grid-cols-2 md:grid-cols-4 gap-lg gap-y-xl border-t border-line pt-lg">
        {meta.map((m) => (
          <div key={m.label}>
            <dt className="lab">{m.label}</dt>
            <dd className="mt-sm text-small text-ink leading-[1.5]">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

/* ---- Tools / chips ---------------------------------------------------- */

export function CaseStudyTools({
  label,
  chips,
}: {
  label: string;
  chips: string[];
}) {
  return (
    <section className="mt-xl border-t border-line pt-lg">
      <span className="lab">{label}</span>
      <ul className="mt-md flex flex-wrap gap-md list-none p-0">
        {chips.map((c) => (
          <li key={c}>
            {/* one pill style: ink on ink. 13/26 is the spec's literal pill
                geometry, deliberately off the 4–64 spacing scale. */}
            <span className="inline-block font-mono text-tag text-ink border-[1.5px] border-ink rounded-full px-[26px] py-[13px]">
              {c}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---- Hero image ------------------------------------------------------- */

export function CaseStudyHero({
  src,
  alt,
  width,
  height,
  caption,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure className="mt-3xl m-0">
      {/* square corners, hairline border, full colour */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 1440px) 100vw, 1440px"
        className="block w-full h-auto border border-line"
      />
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/* ---- Lede ------------------------------------------------------------- */

/**
 * The oversized statement after the hero — the argument in one breath.
 *
 * Uses `text-lede`, NOT `text-marker`: marker is sized for a three-word display
 * phrase, and a paragraph-length lede at that size becomes a wall rather than a
 * statement.
 */
export function CaseStudyLede({ children }: { children: ReactNode }) {
  return (
    <section className="mt-3xl">
      <p className="text-lede text-ink text-balance max-w-[56ch] [&_strong]:font-bold">
        {children}
      </p>
    </section>
  );
}

/* ---- Body (rail + content) -------------------------------------------- */

/**
 * The two-column body: a sticky stage index on the left, the stages on the
 * right. Everything above this (header, tools, lede, hero) stays full-width —
 * the rail only accompanies the argument, not the title block.
 *
 * The grid is what sets the reading measure now. The content column is
 * ~1080px of the 1312px canvas, and Prose fills it rather than being capped by
 * an arbitrary `ch` value. That's the better architecture: the layout decides
 * the measure, not a magic number that has to be kept in sync with it.
 */
export function CaseStudyBody({
  stages,
  children,
}: {
  stages: RailStage[];
  children: ReactNode;
}) {
  return (
    <div className="mt-3xl grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2xl">
      {/* the rail is hidden on narrow screens: a sticky index that eats a third
          of a phone viewport is worse than no index at all */}
      <div className="hidden md:block">
        <CaseStudyRail stages={stages} />
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/* ---- Stage ------------------------------------------------------------ */

/**
 * A stage of the spine.
 *
 * HIERARCHY — exactly ONE large heading per stage:
 *   "02 · Approach"  h2, Hanken, text-section   ← the section's name; what the
 *                                                 rail indexes and what you scan
 *   the title        deck, text-lede, muted     ← the claim, subordinate to it
 *   Beat             h3, Hanken, text-h3        ← a move in the argument
 *   Phase            mono label                 ← a structural marker, not a heading
 *
 * The number is set in mono inside the heading so it reads as an index rather
 * than as part of the sentence, while the h2 stays one element for a11y.
 */
export function Stage({
  id,
  num,
  name,
  title,
  children,
}: {
  id: string;
  num: string;
  name: string;
  title: string;
  children: ReactNode;
}) {
  return (
    /* first:mt-0 — the first stage's rule must line up with the top of the rail
       (the "Go back" link) rather than sitting 64px below it. Later stages keep
       the mt-3xl that separates them from each other. */
    <section
      id={id}
      className="mt-3xl first:mt-0 border-t border-ink pt-md scroll-mt-3xl"
    >
      {/* the number stays in Hanken, not Space Mono. Mono is the system's index
          idiom, but three faces inside one two-line block (mono number + Hanken
          name + Inter deck) reads as noise. The heading is ONE face; the rail
          already carries the mono index two columns to the left. */}
      <h2 className="mt-lg font-display text-section text-ink flex items-baseline gap-md">
        <span className="tabular-nums text-muted">{num}</span>
        {name}
      </h2>
      {/* text-intro (~21px), NOT text-lede (~34px): a deck at 34px sits too
          close to the 38px h2 above it and the two read as competing headings
          rather than as a heading and its subtitle. The gap has to be obvious. */}
      <p className="mt-md text-intro text-muted text-balance max-w-[46ch]">
        {title}
      </p>
      {/* children run FULL WIDTH. Each block sets its own measure — Prose caps
          itself at `reading`, figures and stat bands span the canvas. That
          contrast (measured prose against wide image) is the reference's
          rhythm; wrapping everything in one column would flatten it. */}
      <div className="mt-xl">{children}</div>
    </section>
  );
}

/**
 * Body prose — measured, never full-canvas. Sets its own width.
 *
 * Caps at `reading`; see the note on that token — the `ch` unit is the width of
 * "0", not a character, so the rendered line is far longer than the number
 * suggests. Measure, don't assume.
 */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-lg text-prose text-ink [&_strong]:font-bold [&_a]:text-rich [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-[3px]">
      {children}
    </div>
  );
}

/**
 * A beat inside a stage — a sub-move in the argument ("How I earned the seat").
 * The only Hanken heading below the stage h2, and clearly smaller than it, so
 * the hierarchy reads: stage name → beat → prose.
 */
export function Beat({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-h3 text-ink text-balance mt-md max-w-[48ch]">
      {children}
    </h3>
  );
}

/**
 * A mono kicker above a beat. This one STAYS Space Mono — it's a label
 * announcing what follows ("Who the pattern serves"), not a heading.
 */
export function Kicker({ children }: { children: ReactNode }) {
  return <span className="lab block">{children}</span>;
}

/**
 * A structural marker inside a stage — "We had a three-part challenge",
 * "Layer 1: visual foundation", "Accessibility: the bar I set for the team".
 *
 * NOT a heading: it announces the block that follows (a list, a stat band). It
 * stays mono, but at `text-tag` rather than the 0.72rem label size it was
 * originally — that was genuinely too small to register. Sentence case, not
 * uppercase: these are phrases, and design.md §2 puts uppercase on short labels
 * only.
 *
 * Deliberately NOT promoted to Hanken. Every stage already has exactly one
 * large heading (the "02 · Approach" h2); making this one a heading too was
 * what created the competing-headings problem.
 */
export function Phase({ children }: { children: ReactNode }) {
  return (
    <span className="block font-mono text-tag text-ink">{children}</span>
  );
}

/* ---- Figures ---------------------------------------------------------- */

export function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption className="mt-md text-small text-muted">
      {children}
    </figcaption>
  );
}

/** A full-width image inside a stage. Square, hairline, full colour. */
export function Figure({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <figure className="my-xl m-0">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 1440px) 100vw, 1440px"
        className="block w-full h-auto border border-line"
      />
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

export type Shot = { src: string; alt: string; width: number; height: number };

export type ComparePanel = {
  /** the mono label above the panel, e.g. "Before · built by engineering" */
  label: string;
  /** one shot, or two to stack them as an overlapping pair */
  shots: [Shot] | [Shot, Shot];
};

/**
 * A before/after pair, side by side.
 *
 * Pass two shots to a panel and they stack: the second overlaps the first at the
 * bottom-right. The overlap is separated by a PAPER GUTTER (a p-xs wrapper in
 * the page background) rather than a drop shadow — this system has no shadows
 * (design.md §3), so depth is faked with a gap and a hairline, not elevation.
 *
 * Keep the panels comparing like with like. Pairing a registration form against
 * an admin home would look like a win while proving nothing; stacking BOTH
 * engineering screens against the rebuilt home is fair, because the stack reads
 * as "the state of the thing" rather than as a single-screen redesign.
 *
 * Labels sit ABOVE each panel, never on the image: white text over a screenshot
 * can't hold a contrast floor, because the photo decides the ratio (principle 07).
 *
 * Screenshots run in FULL COLOUR, including the "before". Draining it to grey to
 * flatter the "after" would be arguing with the evidence rather than showing it.
 */
function Panel({ panel }: { panel: ComparePanel }) {
  const [first, second] = panel.shots;
  return (
    <div>
      <span className="lab lab--ink block mb-md">{panel.label}</span>
      <span className="relative block">
        <Image
          src={first.src}
          alt={first.alt}
          width={first.width}
          height={first.height}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`block h-auto border border-line ${second ? "w-[86%]" : "w-full"}`}
        />
        {second && (
          /* the paper gutter is the separator — no shadow in this system */
          <span className="absolute bottom-0 right-0 w-[62%] bg-paper p-xs">
            <Image
              src={second.src}
              alt={second.alt}
              width={second.width}
              height={second.height}
              sizes="(max-width: 768px) 62vw, 32vw"
              className="block w-full h-auto border border-line"
            />
          </span>
        )}
      </span>
    </div>
  );
}

export function BeforeAfter({
  before,
  after,
  caption,
}: {
  before: ComparePanel;
  after: ComparePanel;
  caption?: string;
}) {
  return (
    <figure className="my-xl m-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg items-end">
        <Panel panel={before} />
        <Panel panel={after} />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/**
 * Two or more figures on one row, with their BOTTOMS ALIGNED.
 *
 * The trick: each panel's flex-grow is its own aspect ratio, with flex-basis 0.
 * Width then distributes in proportion to aspect, which makes every panel land
 * on the same height automatically — a landscape board and a portrait wireframe
 * sit together without one towering over the other, and without anyone
 * hand-tuning column widths. Add a third panel and it still works.
 *
 * Stacks on narrow screens, where side-by-side would make both unreadable.
 */
export function FigureRow({
  figures,
  caption,
}: {
  figures: { src: string; alt: string; width: number; height: number; label?: string }[];
  caption?: string;
}) {
  return (
    <figure className="my-xl m-0">
      <div className="flex flex-col md:flex-row gap-lg items-start">
        {figures.map((f) => (
          <div
            key={f.src}
            className="w-full md:w-auto"
            style={{ flex: `${(f.width / f.height).toFixed(4)} 1 0%` }}
          >
            {f.label && <span className="lab lab--ink block mb-md">{f.label}</span>}
            <Image
              src={f.src}
              alt={f.alt}
              width={f.width}
              height={f.height}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="block w-full h-auto border border-line"
            />
          </div>
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/**
 * A placeholder for a visual that doesn't exist yet. Monochrome hairline weave
 * — it IS chrome, so unlike a real photograph it belongs in the system's
 * palette. Square corners, like everything else.
 */
export function FigureSlot({
  label,
  hint,
  caption,
}: {
  label: string;
  hint?: string;
  caption?: string;
}) {
  return (
    <figure className="my-xl m-0">
      <div
        className="flex flex-col items-center justify-center gap-sm aspect-[16/9] border border-line px-lg text-center"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(18,17,24,0.04) 0 14px, rgba(18,17,24,0.07) 14px 28px)",
        }}
      >
        <span className="font-mono text-label uppercase tracking-label text-rich">
          {label}
        </span>
        {hint && (
          <span className="text-small text-muted max-w-[44ch]">{hint}</span>
        )}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/* ---- Data blocks ------------------------------------------------------ */

export type Stat = { value: string; label: string };

/** Big numbers separated by thin vertical rules. No cards, no accent stripes. */
export function StatBand({ stats, note }: { stats: Stat[]; note?: string }) {
  return (
    <div className="my-xl">
      <dl className="grid grid-cols-3 gap-lg border-t border-ink pt-lg m-0">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={i > 0 ? "border-l border-line pl-lg" : ""}
          >
            <dt className="sr-only">{s.label}</dt>
            <dd className="m-0">
              <span className="block text-[clamp(1.8rem,4vw,3.2rem)] font-bold leading-[0.9] tracking-bignum text-ink">
                {s.value}
              </span>
              <span className="mt-md block text-small text-muted">
                {s.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      {note && (
        <p className="mt-lg font-mono text-label text-muted">
          {note}
        </p>
      )}
    </div>
  );
}

/** A numbered challenge list — the mono index carrying the structure. */
export function NumberedList({
  items,
}: {
  items: { label: string; body: ReactNode }[];
}) {
  return (
    <ol className="list-none p-0 m-0 flex flex-col gap-xl">
      {items.map((it, i) => (
        <li
          key={it.label}
          className="grid grid-cols-[auto_1fr] gap-lg border-t border-line pt-lg"
        >
          <span className="font-mono text-label text-muted pt-[3px]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <span className="block font-display text-h3 text-ink text-balance">
              {it.label}
            </span>
            <div className="mt-md text-prose text-muted [&_strong]:font-bold [&_strong]:text-ink">
              {it.body}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export type Persona = {
  /** e.g. "01 · Basic User" */
  tier: string;
  name: string;
  /** e.g. "Department scope" — omit for the base tier */
  scope?: string;
  portrait: string;
  portraitAlt: string;
  body: ReactNode;
};

/**
 * PersonaList — roles as accordions, headshots always visible.
 *
 * Built on native <details>/<summary>, not a JS widget: keyboard operable
 * (Enter/Space), announced as a disclosure by screen readers, works without JS,
 * and keeps this a server component. Principle 07 — access is structural, not a
 * pass at the end. The browser gives all of that away for free; a div-with-
 * onClick would have to earn it back and usually doesn't.
 *
 * The summary is text only (tier, name, scope) so the collapsed list reads as a
 * tight index of the four roles. The HEADSHOT LIVES IN THE PANEL, next to the
 * body it belongs to, and appears when you open the row.
 *
 * All rows start CLOSED, so the four roles read as a tight index and the reader
 * chooses what to open.
 *
 * Portraits are plain <img>, NOT next/image: next.config has no
 * dangerouslyAllowSVG, so routing these SVGs through the image optimizer throws
 * at runtime. The original template used <img> for exactly this reason.
 *
 * The portrait box is SQUARE (aspect-square, radius 0) on purpose, and not only
 * for the no-rounded-corners rule: persona-david/elena/marcus carry
 * preserveAspectRatio="none" with a square 2048×2048 viewBox, so any non-square
 * box would stretch their faces. priya.svg uses "meet" on a ~1.02 ratio, so it
 * letterboxes cleanly in the same square.
 *
 * Portraits render in FULL COLOUR — they're content, not chrome.
 */
export function PersonaList({ personas }: { personas: Persona[] }) {
  return (
    <ul className="list-none p-0 m-0">
      {personas.map((p) => (
        <li key={p.name} className="border-t border-line last:border-b">
          <details className="group">
            {/* list-none + the webkit marker reset kill the default triangle;
                the +/− below replaces it. */}
            <summary className="grid grid-cols-[1fr_auto] items-center gap-lg py-lg cursor-pointer list-none [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-rich focus-visible:outline-offset-2">
              <span className="block">
                <span className="lab block">{p.tier}</span>
                <span className="mt-xs block font-display text-h3 text-ink transition-colors group-hover:text-rich">
                  {p.name}
                </span>
                {p.scope && (
                  <span className="mt-xs inline-block font-mono text-status uppercase text-rich">
                    {p.scope}
                  </span>
                )}
              </span>

              {/* the disclosure mark. aria-hidden: <summary> already announces
                  its own expanded/collapsed state, so exposing this would make
                  a screen reader say it twice. */}
              <span
                aria-hidden="true"
                className="select-none font-mono text-[1.5rem] leading-none text-ink"
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">&minus;</span>
              </span>
            </summary>

            {/* the headshot sits in the PANEL, beside the body it belongs to.
                No border and no surface behind it: the portraits are artwork on
                white, so a frame would be a box drawn around nothing. */}
            <div className="pb-lg grid grid-cols-[auto_1fr] gap-lg items-start">
              <span className="block w-[72px] md:w-[96px] aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.portrait}
                  alt={p.portraitAlt}
                  className="block w-full h-full object-cover"
                />
              </span>
              <div className="text-prose text-muted [&_strong]:font-bold [&_strong]:text-ink">
                {p.body}
              </div>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}

/**
 * An editorial callout — a claim set on a rule rather than in a tinted box.
 * The rule does the separating; this system has no panels and no shadows.
 */
export function Pullquote({ children }: { children: ReactNode }) {
  return (
    <p className="my-xl border-l-2 border-ink pl-lg text-intro text-ink [&_strong]:font-bold">
      {children}
    </p>
  );
}

/**
 * A sourced testimonial. The counterpart to <Todo> around a quote slot: this is
 * what an empty slot becomes once someone real has said the thing.
 *
 * Set on a rule, like Pullquote, rather than in a tinted card — no panels, no
 * shadows. The attribution is mono, because it is scaffolding around the claim
 * rather than part of it.
 *
 * Use for words someone else said, with their name on it. If it isn't
 * attributable, it belongs in <Todo>, not here.
 */
export function Quote({
  children,
  cite,
  role,
}: {
  children: ReactNode;
  cite: string;
  role?: string;
}) {
  return (
    <figure className="my-xl m-0 border-l-2 border-ink pl-lg max-w-reading">
      <blockquote className="m-0 text-intro text-ink [&_strong]:font-bold">
        {children}
      </blockquote>
      <figcaption className="mt-md font-mono text-label uppercase tracking-label text-muted">
        {cite}
        {role && <span className="text-display-mute"> &middot; {role}</span>}
      </figcaption>
    </figure>
  );
}

/**
 * A label/body list with no numbers — for sets where the order isn't an
 * argument (mine / shared / not mine). Use NumberedList when the sequence
 * carries meaning.
 */
export function LabeledList({
  items,
}: {
  items: { label: string; body: ReactNode }[];
}) {
  return (
    <dl className="m-0 flex flex-col gap-xl max-w-reading">
      {items.map((it) => (
        <div
          key={it.label}
          className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-md md:gap-lg border-t border-line pt-lg"
        >
          <dt className="lab lab--ink">{it.label}</dt>
          <dd className="m-0 text-prose text-muted [&_strong]:font-bold [&_strong]:text-ink">
            {it.body}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * A quiet aside in the author's own voice — a caveat, a scope note. Muted and
 * italic so it reads as a step back from the argument rather than part of it.
 */
export function Aside({ children }: { children: ReactNode }) {
  return (
    <p className="my-xl text-small italic text-muted max-w-reading">
      {children}
    </p>
  );
}

/**
 * An unresolved item the author still owes the page (a quote to source, a
 * number to confirm). Deliberately conspicuous: it uses --color-error, the one
 * non-monochrome token, precisely BECAUSE it must never survive to publish.
 * If one of these reaches production, that's the bug the colour is announcing.
 */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <div className="my-xl border border-error p-lg">
      <span className="font-mono text-label uppercase tracking-label text-error">
        Unresolved — do not publish
      </span>
      <div className="mt-md text-small text-ink [&_b]:font-bold [&_p]:mt-sm">
        {children}
      </div>
    </div>
  );
}
