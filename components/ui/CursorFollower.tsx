"use client";

import { useEffect, useRef } from "react";

/**
 * CursorFollower — the signature flourish: a red disc that REPLACES the native
 * pointer and trails with a little lag. This is the ONE place the site breaks
 * monochrome (see the --color-signal note in globals.css / design.md §1).
 *
 * Guardrails, because a custom cursor is easy to get wrong:
 *  - purely decorative → aria-hidden, pointer-events-none (never blocks a click);
 *    the browser still tracks the true pointer, so clicks land correctly even
 *    though the visible disc eases in behind it
 *  - the native cursor is hidden (html.cursor-none) ONLY while this runs, and
 *    only after the first real pointer move — so the page never sits with no
 *    cursor at all, and touch / reduced-motion visitors keep the OS cursor
 *  - skipped entirely on coarse pointers (touch) and prefers-reduced-motion —
 *    the whole effect IS motion
 *  - position is driven imperatively via rAF + lerp, so React never re-renders
 *    per frame
 */
export default function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return; // no follower on touch, or when motion is reduced

    const root = document.documentElement;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let active = false;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!active) {
        // first move: snap the disc to the pointer (don't slide in from 0,0),
        // reveal it, and only NOW hand the cursor over to it
        active = true;
        x = targetX;
        y = targetY;
        el.style.opacity = "1";
        root.classList.add("cursor-none");
      }
    };
    // pointer left the window → give the native cursor back until it returns
    const onLeave = () => {
      active = false;
      el.style.opacity = "0";
      root.classList.remove("cursor-none");
    };

    const tick = () => {
      // ease toward the pointer — 0.22 keeps it responsive as a cursor while
      // retaining a touch of trail (lower = more lag)
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    // Keep the dot visible over a modal <dialog> (the lightbox). showModal()
    // renders the dialog in the browser's TOP LAYER, which paints above every
    // z-index — so the dot (and, via cursor-none, the native cursor) would be
    // hidden behind it. Fix: re-parent the dot INTO the open dialog (also a
    // top-layer element) so it paints above the lightbox, and move it back to
    // <body> when the dialog closes. `position: fixed` keeps it viewport-anchored
    // regardless of which parent it currently lives in.
    const relocate = () => {
      const openDialog =
        document.querySelector<HTMLDialogElement>("dialog[open]");
      const target: HTMLElement = openDialog ?? document.body;
      if (el.parentElement !== target) target.appendChild(el);
    };
    const mo = new MutationObserver(relocate);
    // only fires on `open` attribute changes anywhere in the tree (rare: dialogs)
    mo.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    relocate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      mo.disconnect();
      if (el.parentElement !== document.body) document.body.appendChild(el);
      root.classList.remove("cursor-none"); // never leave the page cursorless
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 rounded-full bg-signal opacity-0 transition-opacity duration-300 will-change-transform"
    />
  );
}
