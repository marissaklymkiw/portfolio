/**
 * ArrowForward — the ONE forward-arrow used with links across the site.
 *
 * Material Symbols "arrow_forward" (weight 400, optical size 24). Sized in `em`
 * so it tracks the link's font-size, and `fill-current` so it inherits the
 * link's colour. Use this anywhere a link previously reached for a bare `→`
 * glyph (which varied by font and weight per context), so every link arrow is
 * the same shape. To resize it, set font-size on the wrapper (e.g. text-[2.25rem])
 * rather than passing h/w — that keeps the 1em sizing and avoids class conflicts.
 */
export default function ArrowForward({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 -960 960 960"
      aria-hidden="true"
      className={`inline-block h-[1em] w-[1em] shrink-0 fill-current align-[-0.125em] ${className}`}
    >
      <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
    </svg>
  );
}
