"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import ArrowForward from "./ArrowForward";

export type CarouselSlide = {
  src: string;
  alt: string;
  /** the asset's TRUE intrinsic pixels — feeds the lightbox's 1:1 zoom sizing */
  width: number;
  height: number;
  /** optional mono caption shown under the deck for the active slide */
  label?: string;
};

/* The card is the content column MINUS the stack and the peek, so these three
   numbers set how big the screenshots render. They were 16/16/220, which left
   only 684px of a 1000px column — the slides read as postage stamps. Trimmed so
   the card takes ~820px (512px tall at 16/10) while the stacked spine on the
   left and the bleed on the right both still read. Grow the card further by
   shrinking PEEK, not by changing the aspect: the sources are 16/10 and any
   other ratio starts cropping them.

   These are the WIDE values. Below 768px they all collapse to 0 (see NARROW):
   a stacked peek needs spare horizontal room to spend, and on a 390px screen
   spending 180px of it left the actual screenshot around 210px wide and
   unreadable. On mobile the same component becomes a plain one-card-at-a-time
   carousel at full column width. */
const WIDE = { step: 10, gap: 16, peek: 120 };
const NARROW = { step: 0, gap: 16, peek: 0 };
const NARROW_QUERY = "(max-width: 767px)";

/**
 * ExperienceCarousel — a stacked peek carousel (matches the reference).
 *
 * The trick that keeps it clean: every card has a FIXED slot at `left = idx*STEP`
 * and sits there whenever it's the active card OR already behind in the stack. So
 * a card is placed exactly once and NEVER moves again — advancing doesn't shuffle
 * the stack sideways (that lateral creep was the "subtle shift"). Only the next
 * card animates, sliding in from the right where it was bleeding off the edge.
 *
 * Result: the active card climbs the stack as you go (drifting right by one step
 * each time, flush-left on slide 1), previous cards pile behind it to the left as
 * a growing stacked spine, and the upcoming card bleeds off the right. Full
 * opacity, no fade. Container is overflow-hidden so the right bleed cuts cleanly.
 */
export default function ExperienceCarousel({
  title,
  slides,
}: {
  title: string;
  slides: CarouselSlide[];
}) {
  const [active, setActive] = useState(0);

  /* Geometry has to be JS, not a media query: `left` is computed per card from
     STEP, so CSS alone cannot flatten the stack. Starts WIDE and corrects after
     mount — matchMedia is unavailable during SSR, and guessing narrow would
     make every desktop render flash through the collapsed layout. */
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(NARROW_QUERY);
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const { step: STEP, gap: GAP, peek: PEEK } = narrow ? NARROW : WIDE;

  const last = slides.length - 1;
  const atStart = active === 0;
  const atEnd = active === last;
  const go = (delta: number) =>
    setActive((i) => Math.min(last, Math.max(0, i + delta)));

  const stack = last * STEP; // left room the full stack can occupy

  /* OFF-SCALE, deliberate: 1.2rem sizes the ARROW GLYPH inside a 48px disc,
     not type. ArrowForward is sized in `em`, so this is how the icon is scaled
     — it is icon geometry, not a step on the reading scale. */
  const btn =
    "inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink text-[1.2rem] text-paper transition-colors hover:bg-rich-hover disabled:opacity-25 disabled:hover:bg-ink focus-visible:outline-2 focus-visible:outline-rich focus-visible:outline-offset-2";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={title}
      className="mt-3xl border-t border-ink pt-lg"
    >
      <h2 className="mb-lg font-display text-section text-ink">{title}</h2>

      <div
        className="relative w-full overflow-hidden"
        style={
          {
            "--peek": `${PEEK}px`,
            "--stack": `${stack}px`,
          } as CSSProperties
        }
      >
        {/* sizer — same footprint as a card; sets the deck height */}
        <div
          aria-hidden
          className="w-[calc(100%-var(--stack)-var(--peek))] aspect-[16/10]"
        />

        {slides.map((s, idx) => {
          const rel = idx - active;
          let left: string;
          let z: number;
          if (rel <= 0) {
            // active OR already passed: its fixed slot — never moves once placed
            left = `${idx * STEP}px`;
            z = rel === 0 ? 1000 : idx; // active on top; newer passed above older
          } else {
            // upcoming: bleed off the right (the next card is the visible one)
            left = `calc(100% - var(--peek) - var(--stack) + ${
              active * STEP + GAP + (rel - 1) * 72
            }px)`;
            z = 500 - rel;
          }
          return (
            <div
              key={s.src}
              className="exp-card absolute top-0 w-[calc(100%-var(--stack)-var(--peek))] aspect-[16/10]"
              style={{ left, zIndex: z }}
              data-active={rel === 0}
              aria-hidden={rel !== 0}
            >
              {/* Each slide is a gallery trigger: same data-gallery-* contract
                  and open event as LightboxImage, so the page's single
                  GalleryDialog collects all seven in DOM order and its arrows
                  step through them. Inactive cards get tabIndex -1 — their
                  wrapper is already aria-hidden, and a focus stop on a card
                  stacked behind the active one lands you nowhere visible. */}
              <button
                type="button"
                data-gallery-src={s.src}
                data-gallery-alt={s.alt}
                data-gallery-w={s.width}
                data-gallery-h={s.height}
                tabIndex={rel === 0 ? 0 : -1}
                onClick={(e) =>
                  window.dispatchEvent(
                    new CustomEvent("gallery:open", {
                      detail: { el: e.currentTarget },
                    }),
                  )
                }
                aria-label={`Open larger: ${s.alt.slice(0, 80)}`}
                className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-paper p-0 transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-rich focus-visible:outline-offset-2"
              >
                {/* object-COVER, not contain: contain letterboxed every slide
                    top and bottom. The captures are exactly 16:10 (1366×854),
                    matching the card's aspect, so cover fills edge to edge
                    without cropping anything. If a future slide is a different
                    ratio, cover will crop it — re-capture at 16:10 rather than
                    reverting this to contain.

                    quality 90 because these are UI screenshots: the default 75
                    rings around small high-contrast text like table headers and
                    MAC addresses. Allowed via images.qualities in next.config. */}
                {/* sizes must describe THIS card, not the viewport — the card is
                    the content column (max 1000px) minus the stack and the peek,
                    ~820px at full width. The old "70vw, 900px" misdescribed it
                    and the browser settled on a 640w source for a 684px slot on
                    a 2x display, which is why the slides looked soft.

                    rounded-2xl is on the IMAGE as well as the clipping wrapper:
                    overflow-hidden alone leaves hairline square corners peeking
                    past the radius on a fill image at some zoom levels. */}
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  quality={90}
                  priority={idx === 0}
                  sizes="(max-width: 767px) 100vw, (max-width: 900px) 92vw, 840px"
                  className="rounded-2xl object-cover"
                />
              </button>
            </div>
          );
        })}
      </div>

      {slides[active].label && (
        <p className="mt-md font-mono text-small uppercase tracking-label text-muted">
          {slides[active].label}
        </p>
      )}

      {/* controls */}
      <div className="mt-lg flex items-center gap-md">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={atStart}
          aria-label="Previous"
          className={btn}
        >
          <ArrowForward className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={atEnd}
          aria-label="Next"
          className={btn}
        >
          <ArrowForward />
        </button>
        <span
          aria-live="polite"
          className="ml-sm font-mono text-label uppercase tracking-label text-muted"
        >
          {active + 1} / {slides.length}
        </span>
      </div>
    </section>
  );
}
