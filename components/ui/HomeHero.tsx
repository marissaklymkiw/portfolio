/**
 * HomeHero — the pinned stage: the name, and nothing else.
 *
 * This renders ONLY the sticky layer. Everything that scrolls over it lives in
 * the sibling `.cover` (see app/page.tsx) — that split is what produces the
 * scroll-cover: the name parks under the header and the page rides up over it.
 * Putting the intro back in here would break the effect, because the intro has
 * to be part of the covering layer, not the covered one.
 *
 * The treatment: the interlock staircase. `marissa` upper-left steps to
 * `klymkiw` lower-right at a 3.4em left offset — a loosened corner kiss,
 * deliberately not a copy of Pizzolato's bar. A full-width 2px ink rule carries
 * the mono discipline line.
 *
 * The name is Inter, NOT Hanken: Hanken names headings, but the wordmark is a
 * display object with its own tracking (-0.04em vs -0.02em). See design.md §2.
 *
 * Swap data-hero to "zigzag" for the editorial treatment — both are canonical
 * (design.md §9) and the CSS for both already lives in globals.css.
 */
export default function HomeHero() {
  return (
    <div className="stage">
      <div className="canvas stage-inner" data-hero="masthead">
        <h1 className="wordmark" id="wordmark">
          <span className="wm-eyebrow wm-eyebrow--1" aria-hidden="true">
            (01) Staff product design
          </span>
          <span className="w1">marissa</span>
          <span className="wm-arrow" aria-hidden="true">
            <svg viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 16 L75 75"
                stroke="currentColor"
                strokeWidth="17"
                strokeLinecap="butt"
              />
              <path d="M100 44 L100 100 L44 100 Z" fill="currentColor" />
            </svg>
          </span>
          <span className="wm-eyebrow wm-eyebrow--2" aria-hidden="true">
            (02) Currently at UCLA
          </span>
          <span className="w2">klymkiw</span>
        </h1>

        <div className="mast-bar">
          <span className="mast-rule" />
          <span className="mast-disc">
            Staff Product Design. Currently at UCLA.
          </span>
        </div>
      </div>
    </div>
  );
}
