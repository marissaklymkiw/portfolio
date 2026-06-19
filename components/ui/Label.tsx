/**
 * Label — the mono uppercase micro-label (the eyebrow above a section or hero).
 * Default is the violet accent (AA-safe for small text on light); `ink` variant
 * uses indigo.
 */
const base = "font-mono text-xs font-medium uppercase tracking-[.12em]";

export default function Label({
  variant = "default",
  className,
  children,
}: {
  variant?: "default" | "ink";
  className?: string;
  children: React.ReactNode;
}) {
  const color = variant === "ink" ? "text-indigo" : "text-violet";
  return (
    <span className={`${base} ${color}${className ? ` ${className}` : ""}`}>
      {children}
    </span>
  );
}
