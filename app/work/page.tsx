import type { Metadata } from "next";
import Placeholder from "@/components/ui/Placeholder";

export const metadata: Metadata = { title: "Work | Marissa Klymkiw" };

export default function WorkPage() {
  return (
    <Placeholder
      eyebrow="Selected work"
      title="Case studies, in progress."
      body="The platform work — systems built, adoption earned, impact measured — lands here as case studies. Problem → approach → system → adoption → impact."
    />
  );
}
