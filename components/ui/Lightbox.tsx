"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A case-study image gallery: every figure opens full-screen, and arrows step
 * through the study in the order the images appear on the page.
 *
 * ARCHITECTURE — no context, no registration. Each <LightboxImage> renders its
 * trigger with data-gallery-* attributes and fires a DOM event on click. One
 * <GalleryDialog> per page listens, then reads document.querySelectorAll in DOM
 * order to build the sequence. That means the order is the reading order, always,
 * with nothing to keep in sync: add a figure anywhere and it slots in. A context
 * with effect-order registration would have to earn that and could drift.
 *
 * Built on native <dialog> + showModal(), so the accessibility contract comes
 * free and correct: focus trapped, Escape closes, page inert, focus restored to
 * the trigger. Principle 07 — access is structural, not bolted on.
 *
 * THE BACKDROP IS A FROST, NOT A DARK SCRIM (after eessoo.co, which uses
 * blur(13px) over a 25% black wash — measured, not guessed). Two reasons:
 *   1. This system doesn't do dark surfaces. Light reading surfaces are an
 *      accessibility requirement, not a preference (design.md).
 *   2. The artifacts are mostly WHITE. A white frost leaves a white board with
 *      no edge to sit against; a light wash gives it one without going dark.
 *
 * CONTROLS are a soft grey disc with a white glyph and no border (after
 * eessoo.co). One deliberate deviation: the reference's own disc is a pale grey
 * that puts its white glyph at roughly 2.2:1, under the 3:1 WCAG 1.4.11 asks of
 * a control's icon. This uses `muted`, which keeps the soft look and lands the
 * glyph at 5.19:1. Matching the reference exactly would have meant shipping a
 * close button you can barely see.
 *
 * TWO SIZES, because one isn't enough for a dense board:
 *   contained (default) — the whole artifact, centred.
 *   natural — click the image for 1:1 and pan. This is how you read the
 *     stickies, and on a short viewport it's the only real magnification:
 *     "fit to screen" lands within ~1% of the inline size.
 */

const OPEN_EVENT = "gallery:open";

export type GalleryShot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/* ---- the trigger ------------------------------------------------------- */

export function LightboxImage({
  src,
  alt,
  width,
  height,
  priority,
  sizes = "(max-width: 1440px) 100vw, 1440px",
  className = "",
}: GalleryShot & {
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      data-gallery-src={src}
      data-gallery-alt={alt}
      data-gallery-w={width}
      data-gallery-h={height}
      onClick={(e) =>
        window.dispatchEvent(
          new CustomEvent(OPEN_EVENT, { detail: { el: e.currentTarget } }),
        )
      }
      aria-label={`Open larger: ${alt.slice(0, 80)}`}
      className="group block w-full cursor-zoom-in border-0 p-0 bg-transparent focus-visible:outline-2 focus-visible:outline-rich focus-visible:outline-offset-2"
    >
      {/* no hover label — the zoom-in cursor and the border darkening carry the
          affordance. A word floating over the artifact was competing with it. */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={`block w-full h-auto rounded-2xl border border-line transition-colors group-hover:border-line-strong ${className}`}
      />
    </button>
  );
}

/**
 * WindowImage — a cropped "window" trigger for very tall artifacts. Same gallery
 * contract as LightboxImage (data-gallery-* + the open event), so clicking still
 * opens the FULL page in the dialog. The difference is the inline presentation:
 * a fixed-aspect frame with the image filling it via object-cover, anchored to
 * the TOP (object-top), so the crop always begins at the top of the page and a
 * long dashboard doesn't run the length of the section.
 *
 * `ratio` is a CSS aspect-ratio (width / height); a larger first number is a
 * shorter window. width/height are the LOGICAL (1x) pixels — they only feed the
 * dialog's zoom sizing, not this frame.
 */
export function WindowImage({
  src,
  alt,
  width,
  height,
  ratio = "16 / 9",
  sizes = "(max-width: 1440px) 100vw, 1440px",
}: GalleryShot & { ratio?: string; sizes?: string }) {
  return (
    <button
      type="button"
      data-gallery-src={src}
      data-gallery-alt={alt}
      data-gallery-w={width}
      data-gallery-h={height}
      onClick={(e) =>
        window.dispatchEvent(
          new CustomEvent(OPEN_EVENT, { detail: { el: e.currentTarget } }),
        )
      }
      aria-label={`Open larger: ${alt.slice(0, 80)}`}
      style={{ aspectRatio: ratio }}
      className="group relative block w-full overflow-hidden rounded-2xl cursor-zoom-in border border-line p-0 bg-transparent transition-colors hover:border-line-strong focus-visible:outline-2 focus-visible:outline-rich focus-visible:outline-offset-2"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover object-top"
      />
    </button>
  );
}

/* ---- the dialog (one per page) ----------------------------------------- */

export function GalleryDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [shots, setShots] = useState<GalleryShot[]>([]);
  const [i, setI] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const close = useCallback(() => {
    ref.current?.close();
    document.body.style.overflow = "";
    setZoomed(false);
  }, []);

  /* arrows CYCLE rather than disable at the ends. With the controls always
     visible, wrapping means they always do something — no dead buttons. */
  const step = useCallback(
    (d: number) => {
      setZoomed(false);
      setI((n) => (shots.length ? (n + d + shots.length) % shots.length : 0));
    },
    [shots.length],
  );

  useEffect(() => {
    const onOpen = (e: Event) => {
      const el = (e as CustomEvent).detail.el as HTMLElement;
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-gallery-src]"),
      );
      setShots(
        nodes.map((n) => ({
          src: n.dataset.gallerySrc!,
          alt: n.dataset.galleryAlt ?? "",
          width: Number(n.dataset.galleryW),
          height: Number(n.dataset.galleryH),
        })),
      );
      setI(Math.max(0, nodes.indexOf(el)));
      setZoomed(false);
      document.body.style.overflow = "hidden";
      ref.current?.showModal();
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  /* arrow keys step through the sequence */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!ref.current?.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const toggleZoom = useCallback(() => {
    setZoomed((z) => {
      const next = !z;
      if (next) {
        requestAnimationFrame(() => {
          const s = scroller.current;
          if (!s) return;
          s.scrollLeft = (s.scrollWidth - s.clientWidth) / 2;
          s.scrollTop = (s.scrollHeight - s.clientHeight) / 2;
        });
      }
      return next;
    });
  }, []);

  const shot = shots[i];

  return (
    <dialog
      ref={ref}
      aria-label={shot ? shot.alt.slice(0, 120) : "Image viewer"}
      onCancel={close}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink/25 backdrop:backdrop-blur-lg"
    >
      {shot && (
        <>
          <div
            ref={scroller}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            className={`flex h-full w-full ${
              zoomed
                ? "overflow-auto"
                : "items-center justify-center overflow-hidden"
            } p-2xl`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={shot.src}
              src={shot.src}
              alt=""
              onClick={toggleZoom}
              className={
                zoomed
                  ? "m-auto block max-w-none cursor-zoom-out"
                  : "block max-h-[86vh] max-w-[80vw] w-auto h-auto cursor-zoom-in"
              }
              style={zoomed ? { width: shot.width, height: shot.height } : undefined}
            />
          </div>

          {/* prev / next — always present, cycling. Ink on paper (18.56:1): they
              sit on a light frost, so they can't borrow contrast from a dark
              scrim and have to carry their own. */}
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="fixed left-lg top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-muted text-paper transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className="fixed right-lg top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-muted text-paper transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* position counter — mono, like every other index in the system */}
          <span className="fixed bottom-lg left-1/2 z-10 -translate-x-1/2 rounded-full bg-muted px-md py-sm font-mono text-label uppercase tracking-label text-paper">
            {String(i + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="fixed top-lg right-lg z-10 flex h-11 w-11 items-center justify-center rounded-full bg-muted text-paper transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </>
      )}
    </dialog>
  );
}

export default LightboxImage;
