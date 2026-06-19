/**
 * StickyNote — a Post-it: flat, slightly rotated, soft shadow, with a tack.
 * Reads as a sticky through shape / colour / tilt only — NO paper texture, NO
 * curling corners (DESIGN_NOTES.md).
 *
 * `color` picks one of the three system surfaces; `tack` colours the pin.
 * `position` applies the cluster geometry class (s1/s2/s3) whose absolute
 * placement + 860px reflow live verbatim in globals.css. (Class is `.note`,
 * not `.sticky`, to avoid Tailwind's `position: sticky` utility overriding the
 * absolute placement.) Each `.note` stays position:relative on reflow so its
 * tack anchors correctly.
 */
type Color = "yellow" | "indigo" | "white";

const colorStyles: Record<Color, string> = {
  yellow: "bg-yellow text-ink",
  indigo: "bg-indigo text-paper",
  white: "bg-panel text-ink border border-line",
};

const tackStyles: Record<Color, string> = {
  yellow: "bg-violet",
  indigo: "bg-yellow",
  white: "bg-violet",
};

export default function StickyNote({
  color,
  position,
  tack,
  children,
}: {
  color: Color;
  position: "s1" | "s2" | "s3";
  /** override the default tack colour for this surface */
  tack?: "violet" | "yellow";
  children: React.ReactNode;
}) {
  const tackClass = tack ? `bg-${tack === "violet" ? "violet" : "yellow"}` : tackStyles[color];
  return (
    <div className={`note ${position} ${colorStyles[color]}`}>
      <span className={`tack ${tackClass}`} />
      {children}
    </div>
  );
}
