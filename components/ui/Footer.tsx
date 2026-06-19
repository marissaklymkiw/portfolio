/**
 * Footer — the single inversion moment: the one dark indigo band on the page.
 */
const links = [
  { label: "linkedin →", href: "#" },
  { label: "resume →", href: "#" },
  { label: "email →", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-indigo text-paper py-[var(--space-2xl)]">
      <div className="wrap flex flex-wrap justify-end items-end gap-[var(--space-md)]">
        <div className="flex flex-col gap-2 text-right">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-yellow no-underline font-mono text-sm py-1.5 inline-block"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
