import type { Metadata } from "next";
import HomeHero from "@/components/ui/HomeHero";
import HowIWorkLayers from "@/components/ui/HowIWorkLayers";

export const metadata: Metadata = {
  title: "Marissa Klymkiw | Design systems & platform design",
  description:
    "Design systems, governance, and the patterns ~20 product teams build on. Selected work, writing, and the system this site is built from.",
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <HowIWorkLayers />
    </>
  );
}
