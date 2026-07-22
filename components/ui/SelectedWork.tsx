import Link from "next/link";
import ArrowForward from "./ArrowForward";
import WorkCard from "./WorkCard";
import { studies } from "@/lib/work/studies";

/**
 * SelectedWork — the Swiss work grid on the home page.
 *
 * The studies data and the card itself now live in shared modules
 * (@/lib/work/studies and ./WorkCard), so this grid and the /work landing page
 * render from the same source and never drift. This component owns only the
 * home-page framing: the section rule + heading, the grid, and the
 * "View all work" link out to /work.
 */
export default function SelectedWork() {
  return (
    <section id="work" aria-labelledby="selected-work" className="canvas pt-lg pb-3xl">
      {/* section header — the grotesk (font-display / Hanken) title on the ink
          section rule. The mono descriptor that used to sit to the right was
          removed: it duplicated the per-card meta line (model · category ·
          status) shown under each thumbnail. The count "(4)" was dropped too —
          it dated the section on every add/remove. */}
      <h2
        id="selected-work"
        className="mb-lg border-t border-ink pt-md font-display text-section text-ink"
      >
        Selected work
      </h2>

      <ul className="grid grid-cols-1 min-[620px]:grid-cols-2 gap-x-xs gap-y-[clamp(44px,5.5vw,72px)] list-none p-0 m-0">
        {studies.map((study, i) => (
          <li key={study.slug ?? `placeholder-${i}`}>
            <WorkCard study={study} />
          </li>
        ))}
      </ul>

      <div className="mt-md flex justify-end">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-display text-h2 text-ink hover:text-rich transition-colors"
        >
          View all work <ArrowForward />
        </Link>
      </div>
    </section>
  );
}
