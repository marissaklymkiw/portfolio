/**
 * Design tokens — Marissa Klymkiw 2026 Portfolio
 * Swiss / International Typographic, display-led.
 *
 * SOURCE OF TRUTH: design.md. Values are copied exactly — no rounding, no
 * substitutions. This object mirrors the structure of tailwind.config.js;
 * the three files (design.md → tailwind.config.js → tokens.ts) must agree.
 *
 * Use this where CSS can't reach: canvas/SVG drawing, chart series, JS that
 * needs a literal value. For anything styleable, prefer the Tailwind utility
 * or the CSS variable — don't inline hex from here into a className.
 */

export const color = {
  paper: "#ffffff", // background + surface. True white
  ink: "#14121a", // body text + the big hero name
  muted: "#6f6b77", // secondary text, captions, mono labels
  rich: "#121118", // THE accent: links, labels, rules, arrows, focus
  richHover: "#000000", // the only place #000 is permitted
  surface: "#e6e4ea", // the one tinted FILL — cards only, ink text only
  line: "#e6e4ea", // hairline separators — SEPARATOR ONLY
  lineStrong: "#cfcbd6", // hover borders — BORDERS ONLY, never text
  displayMute: "#8e8a99", // de-emphasized LARGE display text only
  error: "#a4232f", // form validation ONLY
} as const;

/**
 * Measured contrast ratios against #ffffff — computed in-browser, not
 * estimated. The floor is WCAG 2.2 AA (1.4.3): 4.5:1 body, 3:1 large
 * (>=24px, or >=18.66px bold).
 *
 * Level A specifies NO contrast requirement at all — contrast enters the
 * standard at AA — so "Level A contrast" is vacuously true and guarantees
 * nothing. AA is the real floor. See design.md §9.
 */
export const contrast = {
  ink: { ratio: 18.56, passes: "AAA" },
  rich: { ratio: 18.77, passes: "AAA" },
  error: { ratio: 7.34, passes: "AAA" },
  muted: { ratio: 5.19, passes: "AA" }, // tightest margin in the system — do not lighten
  displayMute: { ratio: 3.36, passes: "AA-large" }, // large text only, never body
  lineStrong: { ratio: 1.59, passes: "none" }, // BORDERS ONLY
  line: { ratio: 1.26, passes: "none" }, // SEPARATORS ONLY
} as const;

export const font = {
  display: "var(--font-hanken), var(--font-inter), sans-serif", // headings + logo
  body: 'var(--font-inter), "Helvetica Neue", Arial, sans-serif', // body + hero name
  mono: 'var(--font-space-mono), ui-monospace, "SF Mono", Menlo, monospace', // scaffolding
} as const;

export const fontSize = {
  wordmark: "clamp(2rem, 10.5vw, 8.5rem)",
  bignum: "clamp(4rem, 13vw, 12rem)",
  marker: "clamp(1.8rem, 5.4vw, 4.6rem)",
  // case-study lede: paragraph-length, so below `marker` and above `intro`
  lede: "clamp(1.3rem, 2.4vw, 2.1rem)",
  title: "clamp(2.5rem, 5.5vw, 4.5rem)", // case-study h1
  stat: "clamp(1.8rem, 4vw, 3.2rem)", // StatBand figures
  section: "clamp(2rem, 3vw, 2.4rem)",
  h2: "clamp(1.2rem, 2.2vw, 1.75rem)",
  h3: "1.5rem",
  intro: "clamp(1.05rem, 1.35vw, 1.35rem)",
  body: "1rem",
  // long-form reading size — case-study prose. Larger than `body` so a wider
  // column stays comfortable at the same character count.
  prose: "1.125rem",
  small: "0.95rem",
  label: "0.72rem",
  eyebrow: "clamp(0.72rem, 0.95vw, 1rem)",
  // mono scaffolding at three fixed jobs — named so components never reach for
  // an arbitrary clamp
  tag: "clamp(0.95rem, 1.15vw, 1.3rem)",
  unit: "clamp(0.82rem, 1.1vw, 1.15rem)",
  status: "0.66rem",
} as const;

export const lineHeight = {
  display: "0.82",
  tight: "1.1",
  normal: "1.42",
  body: "1.5",
} as const;

export const letterSpacing = {
  display: "-0.04em",
  bignum: "-0.05em",
  tight: "-0.02em",
  label: "0.08em",
  eyebrow: "0.14em",
} as const;

export const fontWeight = {
  body: 400,
  medium: 600,
  bold: 700, // Inter display: hero name, big number, marker
  heading: 800, // Hanken: headings + logo
} as const;

/** 4 / 8 / 16 / 24 / 32 / 48 / 64 ONLY. A value off this scale is a bug. */
export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
} as const;

/**
 * Three named jobs, not a scale: round, button, sharp. There is no sm/md/lg
 * ramp, and a fourth value is a bug (design.md §5, the Three Radii Rule).
 */
export const radius = {
  none: "0",
  button: "4px",
  full: "999px",
} as const;

/**
 * Intentionally empty of real values. This system HAS NO SHADOWS — separation
 * comes from rules, space, and hairlines, never depth (design.md §3).
 */
export const shadow = {
  none: "none",
} as const;

/**
 * Rules — the structural device. No shadows and no rounded cards means the rule
 * does all the separating, which is why there are only two weights and one ink.
 *
 * WCAG 1.4.11 (Non-text Contrast, AA) requires 3:1 for a boundary NEEDED TO
 * IDENTIFY an interactive component, and nothing of a decorative separator. So
 * `structural` vs `separator` below is a compliance distinction, not a stylistic
 * one: structural rules and interactive boundaries owe 3:1; separators owe
 * nothing. A 1.26:1 hairline between paragraphs is correct; the same hairline as
 * a button's only outline is a defect.
 */
export const rule = {
  section: { weight: "1px", color: color.ink, role: "structural" },
  masthead: { weight: "2px", color: color.ink, role: "structural" },
  brand: {
    weight: "2px",
    width: "clamp(15px, 1.6vw, 24px)",
    color: color.ink,
    role: "structural",
  },
  hairline: { weight: "1px", color: color.line, role: "separator" },
  hairlineStrong: { weight: "1px", color: color.lineStrong, role: "separator" },
} as const;

export const layout = {
  maxw: "1440px",
  pad: "clamp(20px, 4.5vw, 64px)",
  headerHeight: "52px", // --hh: drives where the hero name pins
  gutter: "24px",
  columns: 12,
  /**
   * Line measures. `reading` (72ch at 18px ≈ 810px) is the top of the
   * comfortable 45–75 character range — deliberately NOT the full 1440px
   * canvas, which would run ~130 characters per line.
   */
  measure: "62ch", // short intro lead-in
  reading: "61ch", // long-form case-study prose — ~80 chars/line at 18px Inter
} as const;

/** The stated philosophy. Six are Swiss-canonical; the seventh is the one print never had to answer. */
export const principles = [
  "Grid systems",
  "Typography as the interface",
  "White space by subtraction",
  "Objectivity",
  "Reduction",
  "Clarity",
  "Access is structural",
] as const;

export const tokens = {
  color,
  contrast,
  font,
  fontSize,
  lineHeight,
  letterSpacing,
  fontWeight,
  spacing,
  radius,
  shadow,
  rule,
  layout,
  principles,
} as const;

export default tokens;
