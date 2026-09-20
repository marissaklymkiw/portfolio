import type { Metadata } from "next";
import Link from "next/link";
import ArrowForward from "@/components/ui/ArrowForward";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Marissa Klymkiw",
  description:
    "Get in touch about design systems, platform design, and AI-native practice. Send a message, or reach me by email or LinkedIn.",
};

/**
 * /contact — the form, plus the direct routes for anyone who would rather not
 * use one.
 *
 * Built on the same Swiss shell as /work: canvas, ink section rule with the
 * title under it, and nothing enclosed on four sides except the inputs, which
 * are containers and are allowed to be.
 *
 * TWO WAYS, ON PURPOSE. Recruiters copy an address and paste it into their own
 * tooling; they will not fill in a form. Hiring managers writing a real note
 * often prefer the form because it tells them what to say. Offering only one of
 * the two loses the other, so the address is written out in full rather than
 * hidden behind a mailto label.
 *
 * The footer also carries Email / LinkedIn / Resume at display size on every
 * route, including this one. That is not a duplicate to remove: the footer is
 * the site-wide exit, this is the page's own content, and this is the only
 * place the address appears as readable text.
 */

/* Direct routes. `mailto` rather than the form, for the people who want their
   own client and their own record of what they sent. */
const direct = [
  {
    label: "Email",
    value: "marissa.klymkiw@gmail.com",
    href: "mailto:marissa.klymkiw@gmail.com",
    ext: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/marissak",
    href: "https://www.linkedin.com/in/marissak/",
    ext: true,
  },
  /* THIS ROW IS ALLOWED TO SOUND HUMAN. It took three tries to land, so the
     reasoning is worth keeping.

     Email and LinkedIn answer with an identifier you would copy, and the first
     two attempts here assumed this row owed the same kind of answer: a
     filename ("Marissa-Klymkiw_Resume_2026.pdf"), then a spec ("PDF, two
     pages"). Both were literal and both read like a machine had filled the
     field in. The one before those, "The short version", was a leftover
     caption from the deleted /resume placeholder page.

     Nobody copies a resume the way they copy an address, so parallelism was
     the wrong target. This row is an invitation, phrased in the same first
     person as the "Or reach me directly" heading above it. MK's call, chosen
     from alternatives 2026-09-20.

     Do not "fix" this back into a filename, a file size, a page count, or a
     URL. It is not an oversight.

     ext: true because /resume 307s to a PDF. Same reasoning as Nav and Footer:
     it is a file, not a route, so it opens in a new tab. */
  {
    label: "Resume",
    value: "Take a copy with you",
    href: "/resume",
    ext: true,
  },
];

/* Mono label / value pairs, the same scaffolding the case-study metadata uses.
   These answer the three questions a stranger has before they write. */
const meta = [
  { label: "Based", value: "Los Angeles" },
  { label: "Open to", value: "Staff and principal AI or design systems roles" },
  { label: "Reply", value: "Usually within a few days" },
];

export default function ContactPage() {
  return (
    <div className="canvas pt-2xl pb-3xl">
      <header className="border-t border-ink pt-md">
        <h1 className="font-display text-section text-ink">Contact</h1>
        {/* Measure-capped, unlike /work's one-line standfirst: this is three
            clauses and wants the 62ch column to stay readable. */}
        <p className="mt-lg max-w-measure text-intro text-ink text-pretty">
          Hiring, building a design system, or working out how governance should
          run. Tell me what it is about and I will get back to you.
        </p>
      </header>

      {/* The form takes the wider track. Single column under 860px, where the
          aside falls BELOW the form: someone who came here to write should not
          have to scroll past the alternatives to reach the thing they came for. */}
      <div className="mt-2xl grid grid-cols-1 min-[860px]:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-x-3xl gap-y-2xl">
        {/* No section rule above either column heading, at MK's direction. The
            page header keeps its rule; these two would have drawn a second and
            third horizontal line across the same screen, which competes with
            the page rule rather than reinforcing it. The headings carry the
            two columns on their own. */}
        <section aria-labelledby="send-heading">
          <h2 id="send-heading" className="font-display text-h2 text-ink">
            Send a message
          </h2>
          <div className="mt-xl">
            <ContactForm />
          </div>
        </section>

        <aside aria-labelledby="direct-heading">
          <h2 id="direct-heading" className="font-display text-h2 text-ink">
            Or reach me directly
          </h2>

          {/* Label above, link below. The address is real text at reading size
              so it can be read off a screen and typed somewhere else, which a
              bare "Email" link cannot be. */}
          <ul className="mt-xl list-none p-0 m-0">
            {direct.map((item) => (
              <li key={item.label} className="border-t border-line py-md first:border-t-0 first:pt-0">
                <p className="font-mono text-label uppercase tracking-label text-muted">
                  {item.label}
                </p>
                {item.ext ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-xs inline-flex items-baseline gap-1.5 text-body text-ink underline decoration-1 underline-offset-[3px] transition-colors hover:text-signal break-words"
                  >
                    {item.value}
                    <ArrowForward className="-rotate-45" />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="mt-xs inline-flex items-baseline gap-1.5 text-body text-ink underline decoration-1 underline-offset-[3px] transition-colors hover:text-signal break-words"
                  >
                    {item.value}
                    <ArrowForward />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* The three facts, in the mono scaffolding. Hairline separators,
              because these group without announcing: they are reference, not
              structure. */}
          <dl className="mt-2xl m-0">
            {meta.map((row) => (
              <div key={row.label} className="border-t border-line py-md">
                <dt className="font-mono text-label uppercase tracking-label text-muted">
                  {row.label}
                </dt>
                <dd className="mt-xs m-0 text-body text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </div>
  );
}
