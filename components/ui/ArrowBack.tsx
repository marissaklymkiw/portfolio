/**
 * ArrowBack — the ONE back-arrow used with links across the site.
 *
 * Material Symbols "arrow_back" (weight 400, optical size 24) — the exact
 * horizontal mirror of ArrowForward, so the back/forward pair matches shape and
 * weight. Sized in `em` so it tracks the link's font-size, and `fill-current` so
 * it inherits the link's colour. Use this anywhere a link previously reached for
 * a bare `←`/`&larr;` glyph (which varied by font and weight per context). To
 * resize it, set font-size on the wrapper (e.g. text-[2.25rem]) rather than
 * passing h/w — that keeps the 1em sizing and avoids class conflicts.
 */
export default function ArrowBack({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 -960 960 960"
      aria-hidden="true"
      className={`inline-block h-[1em] w-[1em] shrink-0 fill-current align-[-0.125em] ${className}`}
    >
      <path d="M313-440H800v-80h-487L537-744l-57-56-320 320 320 320 57-56-224-224Z" />
    </svg>
  );
}
