import type { Metadata } from "next";
import Placeholder from "@/components/ui/Placeholder";

export const metadata: Metadata = { title: "Writing | Marissa Klymkiw" };

export default function WritingPage() {
  return (
    <Placeholder
      eyebrow="Writing"
      title="Notes on systems & governance."
      body="Essays on design systems, influence without authority, and the patterns that keep alignment in place after I've moved on. Coming soon."
    />
  );
}
