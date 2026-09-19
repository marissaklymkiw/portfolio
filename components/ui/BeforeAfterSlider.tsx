"use client";

import Image from "next/image";
import { useId, useState } from "react";

/**
 * BeforeAfterSlider — two versions of the same screen, split by a draggable
 * divider. Built for the DRP case study's "what design walked into", but
 * generic: any pair of images of the same thing at two moments.
 *
 * ---- Why a native range input ----
 * The whole control is one visually-hidden <input type="range"> stretched over
 * the frame. The divider and handle are painted separately and driven off its
 * value with `pointer-events-none`, so they are decoration only.
 *
 * That is deliberate rather than lazy. A native range gives, correctly and for
 * free: pointer drag, touch drag, Arrow keys, Home/End, PageUp/PageDown, the
 * implicit `slider` role with valuemin/max/now, and the platform's own
 * behaviour for assistive tech. A div with role="slider" would have to
 * reimplement every one of those and would get some of them subtly wrong.
 *
 * `aria-valuetext` overrides the raw percentage, because "62" announces nothing
 * useful. Note it reports 100 − value: the slider's value is where the DIVIDER
 * sits, and the redesign occupies everything to its right, so the two numbers
 * are complements. Keep them in sync if the clip direction ever changes.
 *
 * ---- Layout ----
 * BEFORE fills the frame. AFTER is the top layer, clipped to show from the
 * divider to the RIGHT edge, so the split reads left-to-right as before →
 * after, matching how the pair is described in the caption.
 *
 * Both images use `object-cover object-top`. The two captures are not the same
 * aspect (the dev build is 2160×1240, the redesign 2732×1708) and cover with a
 * top anchor lines them up on the header rather than distorting either one, so
 * the sources stay untouched and losslessly encoded. `object-top` is the part
 * that matters: centre-anchored, the two headers would sit at different heights
 * and the comparison would read as sloppy rather than deliberate.
 */
/**
 * One annotation: a dot on the thing, a leader line, and a label. Reads AWAY
 * from the divider — before callouts run right-to-left, after callouts
 * left-to-right — so the line always points back at what it marks and never
 * crosses the split.
 *
 * aria-hidden: the same observations are made in the surrounding prose, and a
 * screen reader announcing floating fragments mid-figure adds noise rather than
 * information. The figure's alt text carries the description.
 */
function CalloutMark({ side, text, x, y, dir = "horizontal" }: Callout) {
  const isBefore = side === "before";

  /* Solid paper behind the label, not a text-shadow. The pattern this follows
     puts callouts in generous empty margins; these two screenshots are dense
     edge to edge, so a
     glow leaves the text sitting on card copy and unreadable. An opaque chip is
     the only thing that holds at every divider position. Bold for the same
     reason: this is an assertion about the screen, not a caption.

     text-balance + an 18ch cap keep the box close to its text. Without them a
     two-line label sits in a box as wide as the cap, and the short line leaves
     dead white space that reads as a misaligned panel rather than a label. */
  const labelCls =
    "block max-w-[18ch] border border-line bg-paper px-sm py-xs text-small font-bold leading-tight text-balance text-ink";
  const dot = (
    <span className="block h-[9px] w-[9px] shrink-0 rounded-full bg-ink ring-2 ring-paper" />
  );

  if (dir === "up") {
    /* Text sits ABOVE the point and the leader drops onto it. Anchored bottom-
       centre on (x, y) so the dot lands exactly on the target. Use this where a
       sideways line would have to cross the thing it is annotating. */
    return (
      <span
        aria-hidden="true"
        className="absolute flex flex-col items-center"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: "translate(-50%,-100%)",
        }}
      >
        <span className={`${labelCls} text-center`}>{text}</span>
        <span className="block h-[clamp(16px,2.5vw,32px)] w-px bg-ink/60" />
        {dot}
      </span>
    );
  }

  /* Horizontal: the leader runs AWAY from the divider, so it never crosses the
     split. Before reads right-to-left, after left-to-right.

     NOTHING is spaced apart: dot, line and label all butt together so the
     leader reads as one continuous mark. An earlier version left a gap between
     the line and the label box, which made the line look like it was pointing
     at nothing and the label look like it had drifted loose. */
  return (
    <span
      aria-hidden="true"
      className="absolute flex items-center"
      style={{
        top: `${y}%`,
        [isBefore ? "right" : "left"]: `${isBefore ? 100 - x : x}%`,
        transform: "translateY(-50%)",
      }}
    >
      {isBefore ? (
        <>
          <span className={`${labelCls} text-right`}>{text}</span>
          <span className="block h-px w-[clamp(20px,3vw,44px)] shrink-0 bg-ink/60" />
          {dot}
        </>
      ) : (
        <>
          {dot}
          <span className="block h-px w-[clamp(20px,3vw,44px)] shrink-0 bg-ink/60" />
          <span className={`${labelCls}`}>{text}</span>
        </>
      )}
    </span>
  );
}

export type Callout = {
  /** which half it annotates — decides the direction it reads and when it shows */
  side: "before" | "after";
  text: string;
  /** dot position as a % of the frame */
  x: number;
  y: number;
  /** "up" puts the label above the point with the leader dropping onto it, for
      targets where a sideways line would cross the thing being annotated */
  dir?: "horizontal" | "up";
};

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  label,
  callouts = [],
  /** intrinsic pixels of the BEFORE image — sets the frame's aspect ratio */
  width,
  height,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  /** accessible name for the slider itself */
  label: string;
  callouts?: Callout[];
  width: number;
  height: number;
}) {
  const [pos, setPos] = useState(50);
  const uid = useId();

  /* Solid-filled pills, after the usual before/after frame treatment, which is
     typically two hues; this system is monochrome and reserves its one accent (signal
     red) for interaction, so the pair is differentiated by TONE instead: BEFORE
     takes muted, AFTER takes ink. That also carries meaning — the redesign is
     the darker, louder chip. Both are paper-on-fill and clear AA (5.19:1 and
     18.56:1). Round because pills are the one round thing in a square system.

     They sit ABOVE the frame rather than inside its corners, which is the more
     common placement. Both of these screenshots open with a branded header, so an
     inset pill lands on the UCLA logo every time — it read as a mistake rather
     than a label. Outside the frame nothing is occluded and the left/right
     placement still carries which half is which. */
  const chip =
    "rounded-full px-md py-xs font-mono text-label uppercase tracking-label text-paper";

  return (
    <figure className="my-2xl m-0">
      <div className="mb-md flex items-center justify-between">
        <span className={`${chip} bg-muted`}>{beforeLabel}</span>
        <span className={`${chip} bg-ink`}>{afterLabel}</span>
      </div>

      <div
        className="relative w-full overflow-hidden rounded-2xl border border-line"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {/* BEFORE — the full frame, underneath */}
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          quality={90}
          sizes="(max-width: 1000px) 100vw, 1000px"
          className="object-cover object-top"
        />

        {/* AFTER — clipped to show from the divider to the RIGHT edge, so the
            frame reads left-to-right as before → after, the same direction the
            caption describes. Dragging right reveals more of the dev build;
            dragging left reveals more of the redesign.

            No aria-hidden on this wrapper: the image carries its own alt and
            both versions should be describable. Only the decoration is hidden. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            quality={90}
            sizes="(max-width: 1000px) 100vw, 1000px"
            className="object-cover object-top"
          />
        </div>

        {/* BEFORE callouts, clipped to the LEFT of the divider so they appear
            and disappear with the half they annotate — the inverse of the after
            clip above. The usual approach bakes callouts into the image; keeping
            ours in the DOM means they stay selectable, translatable, and
            re-editable. */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          {callouts
            .filter((c) => c.side === "before")
            .map((c) => (
              <CalloutMark key={c.text} {...c} />
            ))}
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          {callouts
            .filter((c) => c.side === "after")
            .map((c) => (
              <CalloutMark key={c.text} {...c} />
            ))}
        </div>

        {/* the input IS the control: full-bleed, invisible, on top. `peer` lets
            the painted handle react to its focus and hover states. */}
        <input
          id={uid}
          type="range"
          min={0}
          max={100}
          step={1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={label}
          aria-valuetext={`${100 - pos}% redesigned version shown`}
          className="peer absolute inset-0 z-30 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />

        {/* divider + handle, painted from `pos`. pointer-events-none so every
            gesture lands on the input underneath it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-20 w-0"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute inset-y-0 -left-px w-[2px] bg-paper shadow-[0_0_0_1px_rgba(20,18,26,0.35)]" />
          {/* 44px: the same hit target the case study argues for elsewhere */}
          <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink bg-paper text-ink shadow-[0_1px_4px_rgba(20,18,26,0.25)] transition-colors peer-hover:border-rich peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rich">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M9.5 7 5 12l4.5 5V7Zm5 0v10l4.5-5-4.5-5Z" />
            </svg>
          </span>
        </div>
      </div>

      {/* The affordance line, after the conventional "Hover or drag to compare".
          Ours says drag, not hover: hover-scrubbing does not exist on touch and gives
          keyboard users nothing, so the handle is the honest affordance. Mono
          and centred so it reads as an instruction to the control above it
          rather than as part of the caption below. */}
      <p
        aria-hidden="true"
        className="mt-md text-center font-mono text-label uppercase tracking-label text-muted"
      >
        Drag to compare
      </p>

      {caption && (
        <figcaption className="mt-md text-small text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
