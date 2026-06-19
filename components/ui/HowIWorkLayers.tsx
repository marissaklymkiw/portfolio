import CircleMark from "@/components/svg/CircleMark";

/**
 * HowIWorkLayers — the "How I work" section that sits directly below the hero.
 *
 * An ordered, three-layer sequence (research → architecture → interaction)
 * presented as a ruled vertical list, NOT boxed cards and NOT a horizontal
 * flow (DESIGN_NOTES.md "metric pattern" / surface rule). It inherits every
 * token and component from the design system: mono violet label column,
 * Archivo-800 indigo claims, ink glosses, ink-low-opacity hairlines, and the
 * one facilitation annotation allowed here — the hand-drawn CircleMark around
 * "structure", echoing the hero subhead ("I design the structure, and the
 * screen follows"). That circle is the section's single annotation; no other
 * word is marked. Stays on Paper (no white card, no dark background), present
 * tense throughout, capability claims rather than a skills list.
 *
 * Responsive: two-column rows (mono label | claim+gloss) on desktop, stacking
 * to a single column (label above claim) below 880px. The CircleMark keeps its
 * own position:relative container, so the ellipse stays anchored to "structure"
 * and scales with it at every width. Static by design — nothing to gate on
 * prefers-reduced-motion.
 */

const hairline =
  "border-[color-mix(in_srgb,var(--color-ink)_14%,transparent)]";

type Layer = {
  n: string;
  name: string;
  claim: React.ReactNode;
  gloss: string;
};

const layers: Layer[] = [
  {
    n: "01",
    name: "Research",
    claim: <>I start where the problem actually is.</>,
    gloss:
      "Talking to the people who live in the flow, finding the constraint everyone is designing around without naming it.",
  },
  {
    n: "02",
    name: "Architecture",
    claim: (
      <>
        I design the <CircleMark>structure</CircleMark> before the surface.
      </>
    ),
    gloss:
      "The model, the patterns, the decisions that determine what every screen downstream can and can't do.",
  },
  {
    n: "03",
    name: "Interaction",
    claim: <>I make it usable.</>,
    gloss:
      "The screen is where the thinking becomes something a person can touch, so it has to hold up under real use, not just in the mockup.",
  },
];

const meta: { label: string; value: string }[] = [
  { label: "Experience", value: "15 years, research to architecture" },
  { label: "Focus", value: "Design systems, platform design" },
  { label: "Open to", value: "Senior / Staff Product Design" },
];

export default function HowIWorkLayers() {
  return (
    <section
      aria-labelledby="how-i-work"
      className="border-b border-line py-[var(--space-2xl)]"
    >
      <div className="wrap">
        {/* lede — first-person intro that sets up the "How I work" breakdown */}
        <p className="max-w-[64ch] text-md text-ink leading-[1.6]">
          I&apos;m{" "}
          <a
            href="https://www.linkedin.com/in/marissak/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-indigo underline decoration-1 underline-offset-2 transition-colors hover:text-violet"
          >
            Marissa Klymkiw
          </a>
          , a Senior Product Designer with over 15 years of experience, more
          than a
          decade of it building design systems and the last two bringing AI into
          the way product teams work. I&apos;m at{" "}
          <a
            href="https://www.ucla.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-indigo underline decoration-1 underline-offset-2 transition-colors hover:text-violet"
          >
            UCLA
          </a>{" "}
          now, building alongside designers, engineers, and product partners to
          make an impact that outlasts any one project.
        </p>

        <h2
          id="how-i-work"
          className="mt-[var(--space-2xl)] font-mono text-xs font-medium uppercase tracking-[.12em] text-violet"
        >
          How I work
        </h2>

        <ol className="mt-[var(--space-lg)]">
          {layers.map((layer) => (
            <li
              key={layer.n}
              className={`grid grid-cols-1 gap-x-[var(--space-lg)] gap-y-[var(--space-xs)] border-t ${hairline} py-[var(--space-md)] min-[880px]:grid-cols-[180px_1fr]`}
            >
              {/* mono label column — number + layer name (the ordered sequence) */}
              <div className="font-mono text-violet">
                <span className="block text-sm font-semibold tracking-[.04em]">
                  {layer.n}
                </span>
                <span className="block mt-1 text-xs font-medium uppercase tracking-[.12em]">
                  {layer.name}
                </span>
              </div>

              {/* claim + gloss */}
              <div>
                <h3 className="font-display font-extrabold text-lg leading-[1.18] tracking-[-.02em] text-indigo">
                  {layer.claim}
                </h3>
                <p className="mt-[var(--space-2xs)] max-w-[56ch] text-ink text-base leading-[1.6]">
                  {layer.gloss}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* experience meta-row — mono data register, violet labels / ink values */}
        <dl
          className={`mt-[var(--space-xl)] grid grid-cols-[max-content_1fr] gap-x-[var(--space-md)] gap-y-[var(--space-2xs)] border-t ${hairline} pt-[var(--space-md)] font-mono text-xs`}
        >
          {meta.map((row) => (
            <div key={row.label} className="contents">
              <dt className="text-violet font-medium uppercase tracking-[.1em] whitespace-nowrap">
                {row.label}
              </dt>
              <dd className="text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
