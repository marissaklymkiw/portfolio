import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DeviceRegistrationCaseStudy from "./DeviceRegistrationCaseStudy";
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
  "device-registration": {
    title:
      "One front door for every device that can’t log in for itself | Marissa Klymkiw",
    description:
      "UCLA device registration: reframing an engineering-led build into reusable patterns the design system inherits. Problem → approach → system → adoption → impact.",
    Component: DeviceRegistrationCaseStudy,
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
