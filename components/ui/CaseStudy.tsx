import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import CaseStudyRail, { type RailStage } from "@/components/ui/CaseStudyRail";
import {
  GalleryDialog,
  LightboxImage,
  WindowImage,
} from "@/components/ui/Lightbox";

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
 * RADIUS — a deliberate exception to design.md §3, which says the system is
 * binary (fully round, or sharp). CONTENT IMAGERY is rounded at `rounded-2xl`
 * (16px): the hero, figures, lightbox thumbnails, FigureTabs panels, and the
 * carousel slides. Everything else stays square — containers, the FigureTabs
 * frame, stat bands, rules. Pills stay fully round.
 *
 * The reasoning: screenshots arrive as hard-edged rectangles of someone else's
 * UI, and a 16px radius is what makes them read as artefacts placed ON the page
 * rather than as panels OF it. If you change this, change it in ALL of the
 * places listed above at once — a half-rounded set looks like a bug.
 *
 * Photographs render in FULL COLOUR. The monochrome rule governs the system —
 * type, rules, labels, chrome — not the work. Never add a grayscale filter to
 * content imagery.
 */

/* ---- Root ------------------------------------------------------------- */

export function CaseStudyRoot({ children }: { children: ReactNode }) {
  return (
    <>
      <article className="canvas pb-3xl">{children}</article>
      {/* one dialog per page; every LightboxImage on the page feeds it, in DOM
          order, so the arrows step through the study as it reads */}
      <GalleryDialog />
    </>
  );
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
 * KEEP THE FILLED MARK. Flattening it to plain ink text was tried and reverted:
 * the fill is what makes the mark read as the institution and the label as the
 * discipline. CaseStudyTools matches this pill's border, radius, padding and
 * label size, but NOT the fill — chips are a set, not a two-part badge.
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

/**
 * The label/value metadata columns. Broken out of the header so a study can
 * place the facts wherever the layout wants them — under the title (the default
 * header position) OR in the body's right column, beside the rail, so the rail
 * (Go back + index) starts at the metadata row rather than below the title
 * block. `className` carries the spacing/rule for the chosen position; the
 * default matches the classic under-title placement.
 */
export function CaseStudyMeta({
  meta,
  className = "mt-2xl border-t border-line pt-lg",
}: {
  meta: MetaItem[];
  className?: string;
}) {
  return (
    <dl
      className={`grid grid-cols-2 md:grid-cols-4 gap-lg gap-y-xl ${className}`}
    >
      {meta.map((m) => (
        <div key={m.label}>
          <dt className="lab">{m.label}</dt>
          <dd className="mt-sm text-small text-ink leading-[1.5]">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CaseStudyHeader({
  badge,
  title,
  meta,
  hero,
}: {
  badge?: { mark: string; label: string };
  title: string;
  /* optional here: a study can instead render <CaseStudyMeta> inside the body's
     right column (see CaseStudyBody `lead`) so the rail lines up with the facts.
     Omit meta and the header is just badge + title (+ hero). */
  meta?: MetaItem[];
  /* optional visual (still or VideoFigure) placed BETWEEN the title and the
     metadata — an alternate layout where the hero lands before the facts rather
     than after the lede. Opt-in per study; omit it and the header reads as
     before. */
  hero?: ReactNode;
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
      <h1 className="mt-md font-display text-title text-ink text-balance max-w-[30ch]">
        {title}
      </h1>

      {hero && <div className="mt-xl">{hero}</div>}

      {/* metadata sits directly under the title as label/value columns — the
          reference's move. Omitted when a study renders it in the body instead. */}
      {meta && <CaseStudyMeta meta={meta} />}
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
            {/* the SAME pill as Badge above the title — matching border, radius,
                padding, and uppercase mono label size. It used to run at
                text-tag (up to 1.3rem) with 26/13 padding, which made the tools
                row heavier than the badge it sits under. One pill treatment. */}
            <span className="inline-block font-mono text-label uppercase tracking-label text-ink border-[1.5px] border-ink rounded-full px-md py-sm">
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
      {/* square corners, hairline border, full colour. Like every figure in a
          study, it joins the gallery — there is no opt-out, because an image the
          arrows skip would be the one thing a reader can't get back to. */}
      <LightboxImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
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
 * The grid is what sets the reading measure now. The content column is capped
 * at 1000px (minmax(0,1000px)) so it runs slightly narrower than the ~1312px
 * canvas, and Prose fills it rather than being capped by an arbitrary `ch`
 * value. That's the better architecture: the layout decides the measure, not a
 * magic number that has to be kept in sync with it.
 */
export function CaseStudyBody({
  stages,
  children,
  lead,
}: {
  stages: RailStage[];
  children: ReactNode;
  /* optional content placed at the TOP of the right column, above the stages —
     metadata, tools, lede. Using it pulls the rail up so "Go back" and the index
     start at the metadata row rather than below the whole title block. Omit it
     and the body reads as before (rail begins at the first stage). */
  lead?: ReactNode;
}) {
  return (
    // The measure is set by the GRID, not a max-w on the content div. The
    // content column is capped with minmax(0, 1000px) so it runs slightly
    // narrower than the ~1312px canvas, and the free space lands as a right
    // gutter.
    //
    // Rail/content separation is ~124px, and it is built from TWO parts on
    // purpose: gap-3xl (64px) plus the slack in a 240px rail track, whose labels
    // ("Problem", "Working Code") only need ~110px. The spacing scale stops at
    // 64px and design.md calls an off-scale value a bug, so widening the track
    // is how this gets more air without inventing a gap size.
    <div className="mt-3xl grid grid-cols-1 md:grid-cols-[240px_minmax(0,1000px)] gap-3xl">
      {/* the rail is hidden on narrow screens: a sticky index that eats a third
          of a phone viewport is worse than no index at all */}
      <div className="hidden md:block">
        <CaseStudyRail stages={stages} />
      </div>
      <div className="min-w-0">
        {lead}
        {children}
      </div>
    </div>
  );
}

/* ---- Stage ------------------------------------------------------------ */

/**
 * A stage of the spine.
 *
 * HIERARCHY — exactly ONE large heading per stage:
 *   selling phrase   mono eyebrow                ← tees the section up
 *   "01 Approach"    h2, Hanken, text-section    ← the section's name + index;
 *                                       what the rail indexes and what you scan
 *   the title        deck, text-lede, muted     ← the claim, subordinate to it
 *   Beat             h3, Hanken, text-h3        ← a move in the argument
 *   Phase            mono label                 ← a structural marker, not a heading
 *
 * Two levels of heading, and no third. See the note where Subhead used to live.
 *
 * THE EYEBROW LIVES HERE AND NOWHERE ELSE. Beat does not take one and should
 * not be given one later: the pattern works because it marks the six section
 * breaks and nothing smaller. Debo Biswas's case studies, the reference for it,
 * carry five across a whole study, one per top-level heading — a phrase that
 * sets the scene, over a heading that names the section.
 */
export function Stage({
  id,
  num,
  name,
  eyebrow,
  title,
  children,
}: {
  id: string;
  num: string;
  name: string;
  /** a short phrase that sells the section, set as a mono eyebrow ABOVE the
      heading — the register of Debo Biswas's section eyebrows ("MONDAY MORNING
      BEFORE CLINIC"). NOT the number: the number sits inline next to the name.
      Optional, but every stage in a finished study should carry one. */
  eyebrow?: string;
  /** optional deck under the heading. Omit to let the section run on one
      heading — the numbered name — when a subtitle would just add heading noise. */
  title?: string;
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
      {/* the selling phrase — mono, uppercase, muted, set SOLID (tracking-normal,
          not the letterspaced .lab). It's a separate <p>, not part of the h2:
          it tees the section up but shouldn't be in the heading's accessible
          name, which stays "01 Problem" to match the rail link (WCAG 2.5.3). */}
      {eyebrow && (
        <p className="mt-lg font-mono text-small uppercase tracking-normal text-muted">
          {eyebrow}
        </p>
      )}
      {/* the number stays inline next to the name — one Hanken block, mono index
          two columns left in the rail. It inherits the h2's ink rather than
          taking text-muted: the eyebrow above is the muted element, and a third
          value between them made the heading read as two pieces. mt-sm when an
          eyebrow sits above it (the 8px eyebrow-to-heading gap), mt-lg when it
          leads the section alone. */}
      <h2
        className={`font-display text-section text-ink flex items-baseline gap-md ${
          eyebrow ? "mt-sm" : "mt-lg"
        }`}
      >
        <span className="tabular-nums">{num}</span>
        {name}
      </h2>
      {/* text-intro (~21px), NOT text-lede (~34px): a deck at 34px sits too
          close to the 38px h2 above it and the two read as competing headings
          rather than as a heading and its subtitle. The gap has to be obvious.
          Rendered only when a stage supplies a deck — most don't, to keep the
          section on a single heading. */}
      {title && (
        <p className="mt-md text-intro text-muted text-balance max-w-[80ch]">
          {title}
        </p>
      )}
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
  return <span className="block font-mono text-tag text-ink">{children}</span>;
}

/* There is deliberately NO tier below Beat.
 *
 * A third heading level existed here briefly and was removed: a study only ever
 * needs section → move → prose. Debo Biswas's case studies, the reference for
 * this layout, run two levels deep in the reading flow — an eyebrowed section
 * heading and body — and everything that looks like a sub-heading there turns
 * out to be a figure caption inside a grid, not a heading in the flow.
 *
 * If a Beat feels too heavy for what it introduces, that is a signal the block
 * doesn't need a heading at all, not that it needs a smaller one. Cut it and
 * let the list or the stat band speak.
 */

/* ---- Figures ---------------------------------------------------------- */

export function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption className="mt-md text-small text-muted">{children}</figcaption>
  );
}

/**
 * A full-width image inside a stage. Square, hairline, full colour.
 *
 * Joins the lightbox gallery by default. Pass `zoomable={false}` for images
 * there is nothing to zoom INTO — an illustration, a diagram drawn at the size
 * it's meant to be read. The gallery is for dense artifacts that reward
 * magnification: boards, roadmaps, screenshots. Making a drawing clickable
 * promises a detail that isn't there.
 */
export function Figure({
  src,
  alt,
  width,
  height,
  caption,
  zoomable = true,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  zoomable?: boolean;
}) {
  return (
    <figure className="my-xl m-0">
      {zoomable ? (
        <LightboxImage src={src} alt={alt} width={width} height={height} />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="block w-full h-auto rounded-2xl border border-line"
        />
      )}
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/**
 * VideoFigure — a moving figure, framed exactly like Figure: one hairline, flat,
 * no shadow; rounded to match the other content imagery. Autoplays muted, so it reads as
 * motion, not a player — no controls, no chrome. By default it plays once and
 * holds on its last frame (a clip that resolves onto a title/brand card wants to
 * land there, not rewind); pass `loop` for an ambient loop instead. `playsInline`
 * keeps it inline on iOS instead of going fullscreen; `poster` holds the first
 * frame until it can play. Native aspect ratio (h-auto), same as a still, so it
 * slots wherever a Figure would.
 */
export function VideoFigure({
  src,
  poster,
  caption,
  loop = false,
}: {
  src: string;
  poster?: string;
  caption?: string;
  loop?: boolean;
}) {
  return (
    <figure className="my-xl m-0">
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop={loop}
        playsInline
        preload="metadata"
        aria-label={caption}
        className="block w-full h-auto rounded-2xl border border-line"
      />
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/**
 * WindowFigure — a very tall artifact shown as a fixed-height "window" onto its
 * top, so a full-length page (a whole dashboard) reads as a hero without eating
 * the scroll. Flat and square to match the system: one hairline frame, no
 * shadow. The full image is one click away — the window
 * opens the complete page in the lightbox.
 *
 * The crop is top-anchored: the load-bearing part of a summary page is the
 * plain-language answer at the top, so that is what stays visible. `ratio` (a
 * CSS aspect-ratio, width / height) tunes how tall the window is — a larger
 * first number is shorter. The default shows roughly one screenful.
 */
export function WindowFigure({
  src,
  alt,
  width,
  height,
  ratio = "16 / 9",
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  ratio?: string;
  caption?: string;
}) {
  return (
    <figure className="my-xl m-0">
      <WindowImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        ratio={ratio}
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
  /**
   * A single pre-composed transparent PNG that already bakes in its own overlap
   * and backdrop. Rendered borderless with no box behind it, so the notched
   * corners float on the page instead of sitting in a hairline-ruled card.
   * Only meaningful with a single shot.
   */
  bare?: boolean;
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
        <span className={`block ${second ? "w-[86%]" : "w-full"}`}>
          <LightboxImage
            src={first.src}
            alt={first.alt}
            width={first.width}
            height={first.height}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={panel.bare ? "!border-0" : ""}
          />
        </span>
        {second && (
          /* the paper gutter is the separator — no shadow in this system */
          <span className="absolute bottom-0 right-0 w-[62%] bg-paper p-xs">
            <LightboxImage
              src={second.src}
              alt={second.alt}
              width={second.width}
              height={second.height}
              sizes="(max-width: 768px) 62vw, 32vw"
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
  figures: {
    src: string;
    alt: string;
    width: number;
    height: number;
    label?: string;
  }[];
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
            {f.label && (
              <span className="lab lab--ink block mb-md">{f.label}</span>
            )}
            <LightboxImage
              src={f.src}
              alt={f.alt}
              width={f.width}
              height={f.height}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  );
}

/**
 * EvolutionRail — one idea maturing across stages, left to right.
 *
 * Unlike FigureRow (peers sitting side by side), the rail is DIRECTED: each step
 * is a later, sharper version of the one before it, so a mono connector sits
 * between them (→ on a row, ↓ once stacked on mobile). Each step carries a stage
 * kicker above its thumbnail and, below it, the one question that stage was
 * asking — the throughline that proves the sequence is one thought, not three.
 *
 * The thumbnails keep their natural aspect (the artifacts are shown full-size
 * elsewhere; here they are reference), so columns top-align and bottoms may
 * differ — honest, not a manufactured uniform strip.
 */
export type EvolutionStep = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** mono kicker above the thumbnail, e.g. "03 · Workshop" */
  stage: string;
  /** the question this stage was asking, hung beneath the thumbnail */
  question: string;
};

export function EvolutionRail({
  steps,
  caption,
}: {
  steps: EvolutionStep[];
  caption?: string;
}) {
  return (
    <figure className="my-xl m-0">
      <div className="flex flex-col md:flex-row md:items-start gap-md">
        {steps.map((s, i) => (
          <Fragment key={s.src}>
            <div className="flex-1 w-full md:w-auto flex flex-col">
              <span className="lab lab--ink block mb-md">{s.stage}</span>
              <LightboxImage
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <p className="mt-md m-0 text-intro text-rich max-w-[34ch]">
                &ldquo;{s.question}&rdquo;
              </p>
            </div>
            {i < steps.length - 1 && (
              <div
                aria-hidden="true"
                className="flex md:flex-col items-center justify-center self-center md:self-start md:pt-[2.25rem] font-mono text-h3 text-muted select-none"
              >
                <span className="hidden md:inline">&rarr;</span>
                <span className="md:hidden">&darr;</span>
              </div>
            )}
          </Fragment>
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

/**
 * A competitive-landscape card: full-color competitor logos on a light surface,
 * each paired with a one-line "does this well, but here's the gap" read, and an
 * optional punchline set on a rule beneath.
 *
 * DEPARTS, on purpose, from this system's "no panels, no shadows" rule (see the
 * note on Pullquote) and from its monochrome discipline: the filled card and the
 * brand-color logos are a deliberate, contained exception for the landscape
 * beat. Everything OUTSIDE the card stays monochrome and ruled.
 */
export function CompetitorLandscape({
  items,
  punchline,
}: {
  items: { logo: string; name: string; note: ReactNode }[];
  punchline?: ReactNode;
}) {
  return (
    <div className="my-xl">
      <div className="bg-surface px-lg py-2xl md:px-2xl">
        <ul className="m-0 grid list-none grid-cols-1 gap-xl p-0 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <li key={it.name} className="flex flex-col items-start gap-md">
              {/* brand wordmarks of varying aspect ratio; a plain img at a fixed
                  height keeps them optically aligned on the left axis. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.logo}
                alt={it.name}
                className="h-9 w-auto max-w-[80%] object-contain object-left"
              />
              <p className="m-0 max-w-[30ch] text-small text-muted">
                {it.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {punchline && (
        <p className="mt-lg max-w-reading border-l-2 border-ink pl-lg text-intro text-ink text-balance">
          {punchline}
        </p>
      )}
    </div>
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
              <span className="block text-stat text-ink">{s.value}</span>
              <span className="mt-md block text-small text-muted">
                {s.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      {/* the note is a SENTENCE, so it's Inter at the caption size, matching
          Caption above — not the mono label treatment. Space Mono is for labels
          and indices; a full sentence set in it reads as console output and,
          at text-label, carries 0.08em tracking that fights the reading. */}
      {note && <p className="mt-lg text-small text-muted">{note}</p>}
    </div>
  );
}

/**
 * A numbered challenge list.
 *
 * The index is set in the SAME face, size, AND colour as the label beside it
 * (Hanken, text-h3, ink) rather than as a mono label, so the number and the
 * heading sit on one optical line instead of reading as a caption bolted to a
 * heading. `tabular-nums` keeps the labels left-aligned across items.
 */
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
          <span className="font-display text-h3 text-ink tabular-nums">
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
  /** the tier index, "01"–"04" — sits before the name on the heading line */
  num: string;
  /** the role, e.g. "Basic User" — the eyebrow, rendered uppercase */
  role: string;
  /** the persona's name, e.g. "Priya" — the heading */
  name: string;
  /** e.g. "Portal-wide" — appended to the eyebrow after a middot; omit for the
      base tier, whose eyebrow is just the role */
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
 * The summary is text only — a mono eyebrow (role · scope) over the numbered
 * name — so the collapsed list reads as a tight index of the four roles. The
 * HEADSHOT LIVES IN THE PANEL, next to the body it belongs to, and appears when
 * you open the row.
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
                {/* the eyebrow — role, plus scope after a middot for the tiers
                    that add one. Same mono treatment as the section eyebrows:
                    uppercase, set solid, muted. */}
                <span className="block font-mono text-small uppercase tracking-normal text-muted">
                  {p.role}
                  {p.scope ? ` · ${p.scope}` : ""}
                </span>
                {/* the heading — index then name, both in the display face and
                    the same ink so they read as one line; tabular-nums keeps the
                    four names left-aligned. The eyebrow above is the only muted
                    element in the row. */}
                <span className="mt-xs block font-display text-h3 text-ink transition-colors group-hover:text-rich">
                  <span className="tabular-nums">{p.num}</span> {p.name}
                </span>
              </span>

              {/* the disclosure mark. aria-hidden: <summary> already announces
                  its own expanded/collapsed state, so exposing this would make
                  a screen reader say it twice. */}
              <span
                aria-hidden="true"
                /* OFF-SCALE, deliberate: 1.5rem sizes the +/- GLYPH, not
                   type. The type scale steps are for reading sizes; a
                   disclosure mark is icon geometry and is tuned to sit
                   optically level with the persona name beside it. */
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
