import type { Metadata } from "next";
import Label from "@/components/ui/Label";
import HowIWork from "@/components/ui/HowIWork";
import Metrics from "@/components/ui/Metrics";

export const metadata: Metadata = {
  title: "Ethos | Marissa Klymkiw",
  description:
    "How I think about the work: rigor leads, warmth is texture. I facilitate with teams, not at them, and the work I'm proudest of is the alignment that stays in place after I've moved on.",
};

export default function EthosPage() {
  return (
    <>
      {/* intro — plain interior treatment, no grid, no highlight */}
      <section className="pt-[var(--space-3xl)] pb-[var(--space-2xl)]">
        <div className="wrap">
          <Label className="block mb-[var(--space-md)]">Ethos</Label>
          <h1 className="font-display font-extrabold text-hero tracking-[-.03em] text-indigo max-w-[18ch]">
            How I think about the work.
          </h1>
          <div className="mt-[var(--space-xl)] max-w-[60ch] flex flex-col gap-[var(--space-md)] text-md text-ink leading-[1.6]">
            <p>
              Rigor leads; warmth is texture. I facilitate with teams, not at
              them, and the work I&apos;m proudest of is invisible by design —
              the alignment that stays in place after I&apos;ve moved on to the
              next thing.
            </p>
            <p>
              I&apos;m a facilitator who thinks in systems. The systems stay
              visually dominant everywhere on this site except one loud room:
              the wall where the work actually starts.
            </p>
          </div>
        </div>
      </section>

      {/* the one loud facilitation moment — sticky cluster + circled-text mark */}
      <section className="pb-[var(--space-2xl)]">
        <div className="wrap">
          <HowIWork />
        </div>
      </section>

      {/* metric pattern — the platform claim, proven without authority */}
      <section className="pb-[var(--space-3xl)]">
        <div className="wrap">
          <Label className="block mb-[var(--space-md)]">
            What that adds up to
          </Label>
          <Metrics />
        </div>
      </section>
    </>
  );
}
