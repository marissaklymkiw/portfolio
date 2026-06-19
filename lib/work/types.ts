/**
 * Case-study types — scaffolding for the future /work/[slug] route.
 * NOT wired to any page yet. The five-stage spine and the downstream-quote
 * slot come from DESIGN_NOTES.md (Roadmap). When case studies are built, they
 * inherit all tokens and components from the design system unchanged.
 *
 * Spine: Problem → Approach → System Built (phased) → Adoption → Impact.
 */

export type SystemPhase = {
  title: string;
  body: string;
};

/** The high-leverage social proof: a downstream engineer / pod lead who built
 *  on the work, vouching for the platform claim. */
export type DownstreamQuote = {
  quote: string;
  author: string;
  role: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;

  problem: string;
  approach: string;
  /** the system built, in phases */
  system: SystemPhase[];
  /** adoption evidence — pods, components, reach */
  adoption: string;
  /** measured impact (pairs well with the <Metrics> component) */
  impact: string;

  quote?: DownstreamQuote;
};
