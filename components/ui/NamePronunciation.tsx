"use client";

import { useRef } from "react";

/**
 * NamePronunciation — a small inline button that plays a recording of Marissa
 * saying her name. Sits inline in the body paragraph next to her name; the
 * written "(klim-q…)" pronunciation is plain paragraph text around it. Drop the
 * audio file at `src` (in /public, any browser-playable format) and it works;
 * until then the button is harmless (play() rejects and is swallowed).
 */
export default function NamePronunciation({
  src = "/about/name.m4a",
}: {
  src?: string;
}) {
  const audio = useRef<HTMLAudioElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => audio.current?.play().catch(() => {})}
        aria-label="Hear how my name is said"
        className="inline-flex shrink-0 items-center justify-center align-middle w-6 h-6 rounded-full border border-violet text-violet transition-colors hover:bg-violet hover:text-paper"
      >
        <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
          <path d="M3 10v4h3l4 4V6L6 10H3z" fill="currentColor" />
          <path
            d="M14 9a3.5 3.5 0 0 1 0 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <audio ref={audio} src={src} preload="none" />
    </>
  );
}
