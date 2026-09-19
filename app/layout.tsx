import type { Metadata } from "next";
import {
  Hanken_Grotesk,
  Inter,
  Permanent_Marker,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import CursorFollower from "@/components/ui/CursorFollower";

/* Fonts self-hosted via next/font (no layout shift, clean on Vercel).
   Each exposes a CSS variable consumed by the font tokens in globals.css.

   Three faces, three jobs (design.md §2):
   Hanken NAMES things (headings + logo). Inter SAYS things (body) and carries
   the big hero name — a display object, not a heading. Space Mono is the
   scaffolding. Archivo and JetBrains Mono are retired: --font-display and
   --font-mono now resolve to Hanken and Space Mono, so nothing referenced them. */
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-hanken",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});
/* DEPRECATED — the retired facilitation layer (sticky notes / marker script) on
   un-migrated routes still resolves --font-marker. Delete with those pages. */
const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-permanent-marker",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marissa Klymkiw | Design systems & platform design",
  description:
    "Design systems, governance, and the patterns ~20 product teams build on. Selected work, writing, and the system this site is built from.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${inter.variable} ${spaceMono.variable} ${permanentMarker.variable}`}
    >
      <body suppressHydrationWarning>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        {/* the one chromatic element on the site — a red disc that trails the
            pointer. Self-disables on touch + reduced-motion. See design.md §1. */}
        <CursorFollower />
      {/* impeccable-live-start */}
<script src="http://localhost:8400/live.js?token=abec2eb4-8c0e-473d-8d9f-1e1e7c3fec49"></script>
{/* impeccable-live-end */}
</body>
    </html>
  );
}
