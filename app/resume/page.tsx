import type { Metadata } from "next";
import Placeholder from "@/components/ui/Placeholder";

export const metadata: Metadata = { title: "Resume | Marissa Klymkiw" };

export default function ResumePage() {
  return (
    <Placeholder
      eyebrow="Resume"
      title="The short version."
      body="A downloadable resume will live here. In the meantime, the Library is the system this site is built from — exposed on purpose."
    />
  );
}
