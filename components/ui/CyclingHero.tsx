"use client";

import { useEffect, useState } from "react";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Buttons";

/**
 * CyclingHero — typewriter headline. The whole line, "I " + a verb-phrase,
 * types in, holds, then erases before the next types, with a blinking caret at
 * the end. "I" and the trailing words are indigo; the leading verb is violet.
 * A hidden sizer pins the box to the longest line so nothing reflows. Pauses on
 * hover/focus; prefers-reduced-motion shows whole lines (no typing) via a 3s
 * swap and a steady caret. A visually-hidden live region announces each line.
 */
const PREFIX = "I ";
const PHRASES = [
  "build AI design systems",
  "scale AI design",
  "enable teams",
  "shape standards",
];
const LONGEST = PHRASES.reduce((a, b) => (b.length > a.length ? b : a));

const TYPE = 55; // ms per character typing
const ERASE = 30; // ms per character erasing
const HOLD = 1800; // ms to hold the full line
const GAP = 400; // ms of empty before the next line

export default function CyclingHero() {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // reduced motion: cycle whole lines every 3s, no typing
  useEffect(() => {
    if (!reduced || paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % PHRASES.length),
      3000,
    );
    return () => clearInterval(id);
  }, [reduced, paused]);

  // typewriter loop (each state change schedules the next step)
  useEffect(() => {
    if (reduced || paused) return;
    const full = PREFIX + PHRASES[index];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && sub < full.length) {
      t = setTimeout(() => setSub((s) => s + 1), TYPE);
    } else if (!deleting && sub >= full.length) {
      t = setTimeout(() => setDeleting(true), HOLD);
    } else if (deleting && sub > 0) {
      t = setTimeout(() => setSub((s) => s - 1), ERASE);
    } else {
      t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % PHRASES.length);
      }, GAP);
    }
    return () => clearTimeout(t);
  }, [sub, deleting, index, paused, reduced]);

  const phrase = PHRASES[index];
  const full = PREFIX + phrase;
  const shownLen = reduced ? full.length : sub;
  const sp = phrase.indexOf(" ");
  const verbEnd = PREFIX.length + (sp === -1 ? phrase.length : sp);

  const pre = full.slice(0, Math.min(shownLen, PREFIX.length));
  const verb =
    shownLen > PREFIX.length
      ? full.slice(PREFIX.length, Math.min(shownLen, verbEnd))
      : "";
  const rest = shownLen > verbEnd ? full.slice(verbEnd, shownLen) : "";

  return (
    <section className="relative overflow-hidden border-b border-line flex items-center min-h-[78vh] py-[var(--space-3xl)]">
      <div className="hero-bg hero-bg--graph" />
      <div className="wrap relative z-[2]">
        <Label className="block mb-[var(--space-md)]">
          Design systems · platform design
        </Label>

        <h1 className="font-display font-extrabold text-[clamp(1.5rem,6vw,var(--text-2xl))] leading-[1.05] tracking-[-.03em] text-indigo">
          <span
            className="cyc"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {/* invisible sizer: pins width + baseline to the longest line */}
            <span className="cyc-sizer" aria-hidden="true">
              {PREFIX + LONGEST}
            </span>
            <span className="cyc-line" aria-hidden="true">
              {pre}
              <span className="cyc-verb">{verb}</span>
              {rest}
              <span className="cyc-caret" />
            </span>
            {/* screen-reader announcement of the current line */}
            <span className="sr-only" aria-live="polite">
              I {phrase}
            </span>
          </span>
        </h1>

        <p className="mt-[var(--space-lg)] max-w-[58ch] text-md text-ink leading-[1.6]">
          I work across every layer, research to architecture to interaction,
          which is why I design the structure, and the screen follows.
        </p>
        <div className="flex flex-wrap items-center gap-[var(--space-sm)] mt-[var(--space-xl)]">
          <Button href="/work" variant="primary">
            View my work
          </Button>
          <Button href="/ethos" variant="ghost">
            My ethos →
          </Button>
        </div>
      </div>
    </section>
  );
}
