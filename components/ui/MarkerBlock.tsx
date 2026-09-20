/**
 * MarkerBlock — the "about" band: the oversized stat, the de-emphasized display
 * phrase, the positioning statement, and the focus tags.
 *
 * The marker phrase uses text-display-mute (#8e8a99, 3.36:1) and NOT
 * line-strong (#cfcbd6, 1.59:1) — the prototype coloured it with a *border*
 * token, which failed the 3:1 WCAG large-text minimum. line-strong is
 * borders-only. See design.md §1.
 *
 * Tags are one style only: ink text on an ink border. There is no muted variant
 * — the old hairline default sat at 1.26:1, under the 3:1 that WCAG 1.4.11 asks
 * of a boundary identifying an interactive component (design.md §4).
 */

const TAGS = [
  "AI Design Systems",
  "Interaction Design",
  "Product Enablement",
  "Agentic AI",
  "AI Strategy",
  "AI-assisted development",
  "Human-in-the-Loop",
  "Governance",
  "Research → Architecture",
  "Accessibility",
];

export default function MarkerBlock() {
  return (
    /* The rule sits on an INNER div, not on the .canvas section.

       A border on .canvas paints at its padding box, so it runs the full canvas
       width INCLUDING both --pad gutters (up to 128px wider at desktop).
       SelectedWork above puts its rule on the <h2> inside the canvas, where it
       stops at the content edge, so the two never lined up. Moving the border
       inside matches it.

       The footer keeps its rule on .canvas on purpose: it is the one full-bleed
       rule on the page, closing the document rather than dividing a band. If
       another band ever needs a rule, put it inside like this one. */
    <section id="about" className="canvas pb-3xl">
      <div className="border-t border-ink pt-2xl">
      <div className="grid grid-cols-12 gap-lg items-end">
        {/* the stat */}
        <div className="col-span-12 md:col-span-5 flex flex-col items-start">
          <span className="text-bignum text-ink">15+</span>
          <span className="mt-[0.5em] font-mono text-unit uppercase text-muted">
            Years of experience
          </span>
        </div>

        {/* the display phrase — de-emphasized, but still readable */}
        <p className="col-span-12 md:col-start-6 md:col-span-7 self-end text-marker text-display-mute text-balance mt-xs md:mt-0">
          Designing
          <br />
          the structure
          <br />
          under the screen
        </p>

        {/* the statement */}
        <div className="col-span-12 md:col-start-6 md:col-span-6 mt-xl flex flex-col gap-[1em] text-intro text-ink">
          <p>
            A decade of it building design systems; the last two bringing AI into
            how product teams actually work. I design the{" "}
            <b className="font-bold">patterns other teams depend on</b>,
            with no authority over them, which is the whole discipline.
          </p>
        </div>

        {/* focus tags */}
        <ul
          aria-label="Focus areas"
          className="col-span-12 md:col-start-6 md:col-span-7 mt-xl flex flex-wrap gap-md list-none p-0"
        >
          {TAGS.map((tag) => (
            <li key={tag}>
              {/* 13/26 padding is deliberately off the 4–64 spacing scale: it's
                  the spec's literal pill geometry, not a spacing decision. */}
              <span className="inline-block font-mono text-tag text-ink border-[1.5px] border-ink rounded-full px-[26px] py-[13px]">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
}
