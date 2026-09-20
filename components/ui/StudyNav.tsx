import Link from "next/link";
import ArrowBack from "./ArrowBack";
import ArrowForward from "./ArrowForward";
import { studies } from "@/lib/work/studies";

/**
 * StudyNav — the previous/next hand-off at the end of a case study.
 *
 * The end of a study is the highest-intent moment on the site and used to be
 * its emptiest screen: a reader who finished had no route onward except the
 * browser's back button.
 *
 * ORDER COMES FROM @/lib/work/studies, the same array the home grid and /work
 * index render from, so the sequence can never drift from the published set.
 *
 * It WRAPS in both directions: the first study's "previous" is the last, and
 * the last study's "next" is the first. That is deliberate. Without it the two
 * end studies would each render a half-empty row, and the asymmetry reads as a
 * bug rather than as an edge. Wrapping also means adding or reordering a study
 * needs no edit here.
 *
 * Unpublished studies (no `slug`) are skipped rather than linked, for the same
 * reason WorkCard refuses to make them clickable: a card without a slug is a
 * placeholder, and a link to a route that does not exist is worse than no link.
 *
 * Rendered as <nav>, NOT <section>, for two reasons. It IS navigation, so the
 * landmark is honest and a screen-reader user can jump to it. And the case
 * studies all carry `.no-section-rule`, which strips `border-top` from every
 * <section> inside them; a <nav> keeps the rule that separates this block from
 * the argument it follows.
 */
export default function StudyNav({ currentSlug }: { currentSlug: string }) {
  const i = studies.findIndex((s) => s.slug === currentSlug);
  if (i === -1) return null;

  /* Walk outward from the current study, wrapping, and take the first
     published one in each direction. The loop stops before returning to
     `current`, so a set with a single published study renders nothing rather
     than linking to itself. */
  const step = (dir: 1 | -1) => {
    const n = studies.length;
    for (let k = 1; k < n; k++) {
      const candidate = studies[(((i + dir * k) % n) + n) % n];
      if (candidate?.slug) return candidate;
    }
    return null;
  };

  const prev = step(-1);
  const next = step(1);
  if (!prev && !next) return null;

  return (
    /* border-line, matching the metadata block at the top of every study, not
        the heavier border-ink. Allowed here because this rule is a SEPARATOR,
        not a control boundary: the links below are identified by their own
        text, so nothing about hitting or reading them depends on seeing this
        line. WCAG 1.4.11's 3:1 applies to boundaries that identify a control;
        line is 1.26:1 and would fail if this rule were doing that job. */
    <nav
      aria-label="More case studies"
      className="mt-3xl border-t border-line pt-lg"
    >
      {/* Two columns from sm up, stacked below it. Each half is ONE link
          wrapping its label and title, so the target is the whole block rather
          than a few words of it, and there is a single tab stop per direction
          instead of two pointing at the same route. */}
      <div className="grid grid-cols-1 gap-2xl sm:grid-cols-2">
        {prev?.slug ? (
          <Link
            href={`/work/${prev.slug}`}
            className="group flex flex-col gap-md no-underline"
          >
            <span className="lab inline-flex items-center gap-xs">
              <ArrowBack />
              Previous
            </span>
            <span className="font-display text-h2 text-ink transition-colors group-hover:text-rich">
              {prev.title}
            </span>
          </Link>
        ) : (
          /* holds the column so a lone "next" stays on the right */
          <span aria-hidden="true" />
        )}

        {next?.slug && (
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col gap-md no-underline sm:text-right"
          >
            <span className="lab inline-flex items-center gap-xs sm:justify-end">
              Next
              <ArrowForward />
            </span>
            <span className="font-display text-h2 text-ink transition-colors group-hover:text-rich">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
