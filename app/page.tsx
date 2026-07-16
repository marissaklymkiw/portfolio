import type { Metadata } from "next";
import HomeHero from "@/components/ui/HomeHero";
import HomeIntro from "@/components/ui/HomeIntro";
import SelectedWork from "@/components/ui/SelectedWork";
import MarkerBlock from "@/components/ui/MarkerBlock";

export const metadata: Metadata = {
  title: "Marissa Klymkiw | Design systems & platform design",
  description:
    "Design systems, governance, and the patterns product teams build on. Selected work, writing, and the system this site is built from.",
};

/**
 * Home — the Swiss homepage, built as a scroll-cover.
 *
 * The two-layer structure below IS the effect: HomeHero is the pinned stage
 * (the name), and everything inside `.cover` is the opaque layer that rises over
 * it as you scroll. They must stay siblings inside `.hero-wrap` — the wrap is
 * what bounds the stickiness so the name releases at the end instead of
 * following you down the page. Moving the intro into HomeHero, or dropping the
 * wrap, silently kills the effect. See globals.css `.stage` / `.cover`.
 *
 * HowIWorkLayers is deliberately not rendered here: it belongs to the retired
 * facilitation layer (marker script, sticky notes, the "one loud room"), which
 * the Swiss direction retires outright — the restraint IS the personality now.
 * The component still exists and still compiles for /ethos; it is not deleted.
 */
export default function Home() {
  return (
    <div className="hero-wrap">
      <HomeHero />

      <div className="cover">
        <div className="canvas">
          <HomeIntro />
        </div>
        <SelectedWork />
        <MarkerBlock />
      </div>
    </div>
  );
}
