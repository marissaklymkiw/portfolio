import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DeviceRegistrationOptionCCaseStudy from "./DeviceRegistrationOptionCCaseStudy";
import IndeedVisionCaseStudy from "./IndeedVisionCaseStudy";
import SourcingAnalyticsCaseStudy from "./SourcingAnalyticsCaseStudy";
import UscGuestAccessCaseStudy from "./UscGuestAccessCaseStudy";

/* /work/[slug] — case-study route.
   Add a study by mapping a slug to its component below. Every study composes the
   primitives in components/ui/CaseStudy.tsx, so a new one is content, not CSS. */
const STUDIES: Record<
  string,
  { title: string; description: string; Component: () => React.ReactElement }
> = {
  /* The Device Registration study. Option C won the variant comparison and was
     promoted into this slug; the other four arcs (base, trimmed, impact, anchor)
     are no longer routed. Their component files remain on disk, unreferenced, as
     a record of the options considered. */
  "device-registration": {
    title:
      "From 2\u20133 business days to under 24 hours: one path for every campus device that can\u2019t log in by itself | Marissa Klymkiw",
    description:
      "UCLA device registration: a leadership-led arc covering the problem, my role, delivery infrastructure, alignment, outcomes, and reflection.",
    Component: DeviceRegistrationOptionCCaseStudy,
  },
  "indeed-vision": {
    title:
      "Every team was shipping analytics. Nobody was shipping a direction. | Marissa Klymkiw",
    description:
      "Indeed analytics: facilitating the cross-functional workshop that set a two-year direction across merging teams, then following that priority into a sourcing dashboard that shipped in a paid product.",
    Component: IndeedVisionCaseStudy,
  },
  "sourcing-analytics": {
    title:
      "Recruiters were doing the work. They couldn’t see if it was working. | Marissa Klymkiw",
    description:
      "Indeed sourcing analytics: designing the suite that turned scattered recruiting effort into one honest read — is sourcing paying off, and what to do next. Problem → study → build → impact.",
    Component: SourcingAnalyticsCaseStudy,
  },
  "usc-guest-access": {
    title:
      "Redesigning guest access so students stop sharing their passwords | Marissa Klymkiw",
    description:
      "USC Guest Access: students were sharing real logins to let parents help. I designed a secure, FERPA-aware way to invite and manage guests with granular control. Problem → research → design → testing.",
    Component: UscGuestAccessCaseStudy,
  },
};

export function generateStaticParams() {
  return Object.keys(STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = STUDIES[slug];
  if (!study) return {};
  return { title: study.title, description: study.description };
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = STUDIES[slug];
  if (!study) notFound();
  const { Component } = study;
  return <Component />;
}
