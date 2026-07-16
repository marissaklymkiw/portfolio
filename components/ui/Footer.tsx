/**
 * Footer — closes the page on a section rule, like every other band.
 *
 * The retired system made this the one inversion moment: a dark indigo band with
 * yellow links. The Swiss direction has no inversion moment — black and white
 * carry everything, and the rule does the separating. See design.md §8.
 */
export default function Footer() {
  return (
    <footer id="contact" className="canvas">
      <div className="flex flex-wrap items-baseline justify-between gap-lg border-t border-ink pt-[18px] pb-2xl">
        <a
          href="mailto:marissa.klymkiw@gmail.com"
          className="font-display text-h2 text-ink hover:text-rich transition-colors"
        >
          marissa.klymkiw@gmail.com
        </a>
        <span className="lab">Still building &mdash; &copy; 2026</span>
        <a href="#wordmark" className="lab lab--ink">
          Back to top &uarr;
        </a>
      </div>
    </footer>
  );
}
