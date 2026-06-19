import Label from "@/components/ui/Label";
import Button from "@/components/ui/Buttons";
import MarkerHighlight from "@/components/ui/MarkerHighlight";

/**
 * HomeHero — the portfolio's primary brand moment: a large, near-viewport hero
 * carrying the signature line, with the marker-swipe highlight behind the
 * keyword. Static graph background (the switchable version lives on /library).
 */
export default function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-line flex items-center min-h-[78vh] py-[var(--space-3xl)]">
      <div className="hero-bg hero-bg--graph" />
      <div className="wrap w-full relative z-[2]">
        <Label className="block mb-[var(--space-md)]">
          Design systems · platform design
        </Label>
        <h1 className="font-display font-extrabold text-hero tracking-[-.03em] text-indigo max-w-[18ch]">
          I think in <MarkerHighlight>systems</MarkerHighlight>
        </h1>
        <p className="mt-[var(--space-md)] max-w-[58ch] text-md text-ink leading-[1.6]">
          I work across every layer, research to architecture to interaction,
          which is why I design the structure, and the screen follows.
        </p>
        <div className="flex flex-wrap items-center gap-[var(--space-sm)] mt-[var(--space-xl)]">
          <Button href="/work" variant="primary" className="text-md">
            View my work
          </Button>
          <Button href="/ethos" variant="ghost" className="text-md">
            My ethos →
          </Button>
        </div>
      </div>
    </section>
  );
}
