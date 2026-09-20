import type { Metadata } from "next";
import WorkCard from "@/components/ui/WorkCard";
import { studies } from "@/lib/work/studies";

export const metadata: Metadata = {
  title: "Work | Marissa Klymkiw",
  description:
    "Platform and systems work — systems built, adoption earned, impact measured — as case studies. Design systems, platform design, and AI-native workflows.",
};

/**
 * /work — the landing page for every study, built on the same Swiss system as
 * the home grid (canvas + ink rule + font-display heading + the shared WorkCard).
 * It renders from @/lib/work/studies, the SAME source as the home <SelectedWork>
 * grid, so adding a study in one place lands it in both. Built to grow: as more
 * work is posted, it just appends to that list and the grid fills out.
 */
export default function WorkPage() {
  return (
    <div className="canvas pt-2xl pb-3xl">
      {/* page header — grotesk title on the ink rule, intro at reading size */}
      <header className="border-t border-ink pt-md">
        <h1 className="font-display text-section text-ink">Work</h1>
        {/* No measure cap. It carried max-w-measure (62ch), which is the HOME
            intro's measure and is sized for three stacked paragraphs, where a
            short line length is what makes them readable. This is one deck
            line under a page title: capped, it broke a single sentence into a
            narrow two-line block against a 1440px canvas. The 45–75 character
            guidance governs sustained reading, not a one-line standfirst. */}
        <p className="mt-lg text-intro text-ink text-pretty">
          Product design, vision, experiences, and product enablement work
          highlights. More lands here over time.
        </p>
      </header>

      {/* the grid — identical cards to the home page, from the shared source */}
      <ul className="mt-2xl grid grid-cols-1 min-[620px]:grid-cols-2 gap-x-xs gap-y-[clamp(44px,5.5vw,72px)] list-none p-0 m-0">
        {studies.map((study, i) => (
          <li key={study.slug ?? `placeholder-${i}`}>
            <WorkCard study={study} />
          </li>
        ))}
      </ul>
    </div>
  );
}
