import Link from "next/link";

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
        <div className="col-span-12 md:col-start-4 md:col-span-9 flex flex-col gap-[1em] max-w-measure text-intro text-ink">
          <p>
            I think in <em className="italic">systems</em> &mdash; the models,
            patterns, and governance that decide what every screen downstream can
            and can&rsquo;t do.
          </p>
          <p>
            Right now that means design systems and AI-native workflows at{" "}
            <Link
              href="/work"
              className="text-rich underline decoration-1 underline-offset-[3px] hover:text-rich-hover"
            >
              UCLA
            </Link>
            : the scaffolding product teams build on, and the interaction
            patterns that keep a human in charge of the model. Complex,
            high-stakes, exactly the kind of problem I&rsquo;m built for.
          </p>
          <p>
            I work every layer, research to architecture to interaction.{" "}
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
