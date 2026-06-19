import Label from "@/components/ui/Label";
import Button from "@/components/ui/Buttons";

/**
 * Placeholder — a lightweight, on-brand page for routes that aren't built yet,
 * so the nav never lands on a 404. Inherits Nav + Footer from the layout.
 */
export default function Placeholder({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="py-[var(--space-3xl)] border-b border-line">
      <div className="wrap">
        <Label className="block mb-[var(--space-md)]">{eyebrow}</Label>
        <h1 className="font-display font-extrabold text-hero tracking-[-.03em] text-indigo max-w-[14ch]">
          {title}
        </h1>
        <p className="mt-[var(--space-md)] max-w-[52ch] text-md text-ink leading-[1.6]">
          {body}
        </p>
        <div className="mt-[var(--space-lg)]">
          <Button href="/" variant="ghost">
            ← Back home
          </Button>
        </div>
      </div>
    </section>
  );
}
