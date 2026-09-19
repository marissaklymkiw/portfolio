import Image from "next/image";

/**
 * MediaNote — a framed still with a status label underneath, after the
 * "DURING SESSION" process cards common to editorial case studies.
 *
 * Sized to sit BESIDE a paragraph rather than interrupt it, so a piece of
 * evidence can sit next to the claim it supports instead of pushing the reader
 * down the page. Use it for process artefacts (a session, a whiteboard, a
 * screen share) rather than for product screens, which get Figure or FigureTabs.
 *
 * NO STATUS DOT. An earlier version borrowed the reference's coloured dot and
 * painted it `signal` red, which design.md §1 reserves for INTERACTION. A label
 * on a still is not interaction, so the dot was spending the system's one
 * non-monochrome colour on decoration. Removed rather than recoloured: with the
 * label set bold on the tint, it needed no help being found.
 */
export default function MediaNote({
  src,
  alt,
  label,
  width,
  height,
}: {
  src: string;
  alt: string;
  /** the mono line under the still, e.g. "Stakeholder interviews" */
  label: string;
  width: number;
  height: number;
}) {
  /* `surface` is the system's one tinted fill, added for this card. The label is
     INK, not muted: muted-on-surface is 4.12:1, under the 4.5:1 AA needs at this
     size, while ink-on-surface is 14.72:1. Re-check if the fill ever changes. */
  return (
    <figure className="m-0 rounded-2xl bg-surface p-md">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={90}
        sizes="(max-width: 900px) 90vw, 340px"
        /* OFF-SCALE, deliberate: concentric radii. The card is rounded-2xl
           (16px) with p-md (16px), so a nested corner should be 16 − 16 = 0 to
           be truly concentric — which reads as a hard square inside a soft
           card. 10px is the compromise that looks right; it is the only place
           in the system with a third radius. */
        className="block h-auto w-full rounded-[10px]"
      />
      <figcaption className="mt-md text-center font-mono text-label font-bold uppercase tracking-label text-ink">
        {label}
      </figcaption>
    </figure>
  );
}
