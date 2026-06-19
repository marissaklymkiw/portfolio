/**
 * Hand-drawn ellipse annotation — circles a word, as if marked up on a wall.
 * Facilitation accent; lives only in the "How I work" section. The stroke is
 * recolorable (defaults to the violet accent). Wraps its child so the ellipse
 * sizes to the word.
 */
type CircleMarkProps = {
  children: React.ReactNode;
  /** ellipse stroke colour */
  stroke?: string;
};

export default function CircleMark({
  children,
  stroke = "var(--color-violet)",
}: CircleMarkProps) {
  return (
    <span className="circle-mark">
      {children}
      <svg viewBox="0 0 150 70" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M 18 12 C 55 2 120 4 140 22 C 150 34 122 58 72 60 C 26 62 6 48 9 31 C 11 19 28 11 52 9"
          fill="none"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
