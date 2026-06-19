import type { ComponentPropsWithoutRef } from "react";

/**
 * Button — pill buttons in three variants (primary / yellow / ghost).
 * Renders an <a> when `href` is set, otherwise a <button>.
 * Yellow is always dark text on the fill (highlighter rule).
 */
type Variant = "primary" | "yellow" | "ghost";

// NB: every variant sets its own border-color; the base only sets width.
// (A base `border-transparent` would win over the variant colour due to
// Tailwind's source order, hiding the ghost outline.)
const base =
  "inline-flex items-center gap-2 no-underline cursor-pointer rounded-full " +
  "border font-body font-semibold text-sm px-[26px] py-[13px] " +
  "[transition:transform_.08s,background_.15s] active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-indigo text-paper border-indigo hover:bg-indigo-deep",
  yellow: "bg-yellow text-ink border-yellow hover:bg-yellow-deep",
  ghost: "bg-transparent text-indigo border-indigo hover:bg-indigo/6",
};

type ButtonProps = {
  variant?: Variant;
  className?: string;
} & (
  | ({ href: string } & ComponentPropsWithoutRef<"a">)
  | ({ href?: undefined } & ComponentPropsWithoutRef<"button">)
);

export default function Button({
  variant = "primary",
  className,
  href,
  children,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]}${className ? ` ${className}` : ""}`;

  if (href !== undefined) {
    return (
      <a href={href} className={classes} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {children}
      </a>
    );
  }
  return (
    <button
      className={classes}
      {...(rest as ComponentPropsWithoutRef<"button">)}
    >
      {children}
    </button>
  );
}
