/**
 * HomeIntro — the description that rides over the name.
 *
 * This is the first thing on the `.cover` layer, so it is what visibly slides up
 * and covers the pinned wordmark as you scroll. It is deliberately NOT part of
 * HomeHero: the covered layer and the covering layer have to be siblings for the
 * effect to work.
 *
 * Sits at column 4 of the 12-col grid — the name breaks the grid, the prose
 * answers to it. That contrast is the point.
 */
export default function HomeIntro() {
  return (
    <section className="hero-body" aria-label="Introduction">
      <div className="grid grid-cols-12 gap-lg items-start">
        {/* one step up from the shared text-intro token (a ~1–2pt bump on this
            paragraph only — the token stays put for case studies / the About
            band). Kept fluid so it still scales with the viewport. */}
        <div className="col-span-12 md:col-start-4 md:col-span-9 flex flex-col gap-[1em] max-w-measure text-[clamp(1.15rem,1.5vw,1.5rem)] leading-[1.42] tracking-[-0.005em] text-ink">
          <p>
            I think in <b className="font-bold">systems</b>: the models,
            patterns, and governance that decide what every screen downstream can
            and can&rsquo;t do.
          </p>
          <p>
            Right now that means design systems and AI-native workflows at{" "}
            {/* Points at UCLA itself, not /work. It reads as the employer name,
                so sending it to an internal page was a small bait and switch.
                target/rel match the Footer's external-link convention; /work is
                still one click away from "View all work" below. */}
            <a
              href="https://ucla.edu"
              target="_blank"
              rel="noreferrer"
              className="text-rich underline decoration-1 underline-offset-[3px] hover:text-rich-hover"
            >
              UCLA
            </a>
            : the scaffolding product teams build on, and the interaction
            patterns that keep a human in charge of the model. Complex,
            high-stakes, exactly the kind of problem I&rsquo;m built for.
          </p>
          {/* The layers are a deliberate call back to Jamie Mill's "Elements of
              Product Design" stack. Keep them in this order, bottom of the
              stack to top: the order is the argument, not a list.

              A sentence spelling out the dependency between layers used to sit
              here and was cut. Mill's claim is only that a lower-layer change
              *can* dislodge what sits above, and that a mismatch between layers
              is where UX debt comes from; stating it as a rule overclaims. The
              signature line below already makes the point without asserting a
              mechanism. Do not reinstate it. */}
          <p>
            I work every layer of the stack: user research, problem space,
            solution space, conceptual model, structure, aesthetic.{" "}
            <b className="font-bold">
              The structure has to be right. So does the screen that sits on top
              of it.
            </b>
          </p>
        </div>
      </div>
    </section>
  );
}
