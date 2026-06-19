/**
 * MarkerHighlight — the hand-swiped highlighter, the site's signature mark.
 *
 * Implemented as a CSS background-image (inline SVG with feTurbulence, see
 * `.hl-swipe` in globals.css): it auto-fits ANY word at any width and clears
 * descenders, which the earlier absolutely-positioned-SVG approach could not.
 *
 * Rules (DESIGN_NOTES.md): the highlighter is punctuation — one or two per
 * screen, max. Always dark text ON yellow (the word renders in ink), never
 * yellow text on a light background.
 */
type MarkerHighlightProps = {
  children: React.ReactNode;
  className?: string;
  /** play the left-to-right "drawn" wipe reveal (~0.45s) on mount (swipe only) */
  draw?: boolean;
  /** "swipe" = textured hand-drawn marker (default); "solid" = flat system-yellow fill */
  variant?: "swipe" | "solid";
  /** draw a hand-drawn marker circle around the word (swipe only) */
  circle?: boolean;
};

export default function MarkerHighlight({
  children,
  className,
  draw = false,
  variant = "swipe",
  circle = false,
}: MarkerHighlightProps) {
  if (variant === "solid") {
    return (
      <span className={`hl${className ? ` ${className}` : ""}`}>{children}</span>
    );
  }

  const swipe = (
    <span
      className={`hl-swipe${draw ? " hl-swipe--draw" : ""}${
        !circle && className ? ` ${className}` : ""
      }`}
    >
      {children}
    </span>
  );

  if (!circle) return swipe;

  return (
    <span className={`marker-circle-wrap${className ? ` ${className}` : ""}`}>
      {swipe}
      <svg
        className="marker-circle"
        viewBox="0 0 360 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M46 30 C150 10 270 8 332 28 C360 38 352 70 290 84 C200 100 90 98 36 80 C8 70 6 44 30 30 C44 22 70 18 120 16"
          fill="none"
          stroke="var(--color-violet)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
