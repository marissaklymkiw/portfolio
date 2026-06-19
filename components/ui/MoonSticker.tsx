/**
 * MoonSticker — a small kawaii crescent-moon "sticker" that nods to the Sailor
 * Moon fan-site origin story (the crescent is the series' emblem). It is an
 * original illustration, not the trademarked character: a happy crescent face,
 * a few sparkles, and a tiny heart, with a die-cut white edge, a soft drop
 * shadow, and a slight tilt so it reads as a sticker slapped onto the page.
 *
 * Decorative only (aria-hidden) — the headline already tells the story. Sized
 * by the consumer via `className` (set a width; height scales with the viewBox).
 */
export default function MoonSticker({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 170"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id="ms-moon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFE9A0" />
          <stop offset="1" stopColor="#FFC93D" />
        </linearGradient>
        <filter id="ms-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="3.5"
            floodColor="#1f1b16"
            floodOpacity="0.22"
          />
        </filter>
        {/* die-cut white rim crescent (slightly larger than the moon) */}
        <mask id="ms-white">
          <circle cx="82" cy="86" r="56" fill="#fff" />
          <circle cx="116" cy="66" r="45" fill="#000" />
        </mask>
        {/* the moon body */}
        <mask id="ms-yellow">
          <circle cx="82" cy="86" r="50" fill="#fff" />
          <circle cx="116" cy="66" r="51" fill="#000" />
        </mask>
      </defs>

      <g filter="url(#ms-shadow)">
        {/* sparkles + heart (each with its own white die-cut rim) */}
        <path
          transform="translate(151,45) scale(15)"
          d="M0,-1 C0.16,-0.16 0.16,-0.16 1,0 C0.16,0.16 0.16,0.16 0,1 C-0.16,0.16 -0.16,0.16 -1,0 C-0.16,-0.16 -0.16,-0.16 0,-1 Z"
          fill="#6a3fb5"
          stroke="#fff"
          strokeWidth="0.42"
          strokeLinejoin="round"
          style={{ paintOrder: "stroke" }}
        />
        <path
          transform="translate(37,52) scale(10)"
          d="M0,-1 C0.16,-0.16 0.16,-0.16 1,0 C0.16,0.16 0.16,0.16 0,1 C-0.16,0.16 -0.16,0.16 -1,0 C-0.16,-0.16 -0.16,-0.16 0,-1 Z"
          fill="#F4C400"
          stroke="#fff"
          strokeWidth="0.5"
          strokeLinejoin="round"
          style={{ paintOrder: "stroke" }}
        />
        <path
          transform="translate(150,112) scale(8)"
          d="M0,-1 C0.16,-0.16 0.16,-0.16 1,0 C0.16,0.16 0.16,0.16 0,1 C-0.16,0.16 -0.16,0.16 -1,0 C-0.16,-0.16 -0.16,-0.16 0,-1 Z"
          fill="#27075a"
          stroke="#fff"
          strokeWidth="0.55"
          strokeLinejoin="round"
          style={{ paintOrder: "stroke" }}
        />
        <path
          transform="translate(123,124)"
          d="M0,-4 C-5,-10 -14,-4 -8,3 C-4,8 0,10 0,12 C0,10 4,8 8,3 C14,-4 5,-10 0,-4 Z"
          fill="#FF9CC0"
          stroke="#fff"
          strokeWidth="3"
          strokeLinejoin="round"
          style={{ paintOrder: "stroke" }}
        />

        {/* crescent: white rim under the moon body */}
        <circle cx="82" cy="86" r="56" fill="#fff" mask="url(#ms-white)" />
        <circle
          cx="82"
          cy="86"
          r="50"
          fill="url(#ms-moon)"
          mask="url(#ms-yellow)"
        />

        {/* kawaii face */}
        <g fill="#FF9CC0" opacity="0.85">
          <ellipse cx="44" cy="100" rx="4.5" ry="3" />
          <ellipse cx="70" cy="99" rx="4.5" ry="3" />
        </g>
        <g
          fill="none"
          stroke="#1f1b16"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <path d="M46,91 Q50,96 54,91" />
          <path d="M60,91 Q64,96 68,91" />
          <path d="M52,101 Q57,106 62,101" />
        </g>
      </g>
    </svg>
  );
}
