import Label from "@/components/ui/Label";
import CircleMark from "@/components/svg/CircleMark";
import StickyNote from "@/components/ui/StickyNote";

/**
 * HowIWork — the one loud facilitation moment: circled-text annotation, a
 * marker note, and the sticky-note cluster. Everything else on the site stays
 * quiet so the systems read as dominant (DESIGN_NOTES.md). The cluster reflows
 * to a row below the text at 860px without overlapping the body copy.
 */
export default function HowIWork() {
  return (
    <div className="relative overflow-hidden bg-panel border border-line rounded-panel py-[var(--space-2xl)] px-[var(--space-xl)]">
      <Label className="block mb-2.5">In the room</Label>
      <h3 className="font-display font-extrabold text-xl tracking-[-.02em] text-indigo max-w-[16ch] leading-[1.1]">
        I don&apos;t design <em className="not-italic text-violet">at</em> teams.
        I facilitate <CircleMark>with</CircleMark> them.
      </h3>
      <p className="mt-[18px] max-w-[42ch] text-ink text-md">
        Most of my systems start on a wall — stickies, clustering, finding the
        structure inside the mess with the people who&apos;ll have to live in it.
      </p>
      <div className="font-marker text-violet text-[22px] -rotate-3 inline-block mt-[var(--space-md)]">
        ↑ this is the fun part
      </div>
      <div className="cluster">
        <StickyNote color="yellow" position="s1" tack="violet">
          messy input
        </StickyNote>
        <StickyNote color="indigo" position="s2" tack="yellow">
          cluster it
        </StickyNote>
        <StickyNote color="white" position="s3" tack="violet">
          find the system
        </StickyNote>
      </div>
    </div>
  );
}
