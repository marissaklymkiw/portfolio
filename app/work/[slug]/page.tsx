import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkGate from "@/components/ui/WorkGate";
import { isGated, isUnlocked } from "@/lib/work-gate";
import DeviceRegistrationOptionCCaseStudy from "./DeviceRegistrationOptionCCaseStudy";
import IndeedVisionCaseStudy from "./IndeedVisionCaseStudy";
import SourcingAnalyticsCaseStudy from "./SourcingAnalyticsCaseStudy";
/* UscGuestAccessCaseStudy is intentionally not imported: USC Guest Access is
   held back from the first launch, so the slug is unrouted and /work/usc-guest-
   access 404s rather than shipping work that is not part of the launch set. The
   component file remains beside this one, ready to re-import. */

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
      "Transforming wait times from 2\u20133 business days to less than 24 hours: registering campus devices | Marissa Klymkiw",
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
      "The team was doing the work. Managers couldn’t see what was working. | Marissa Klymkiw",
    description:
      "Indeed sourcing analytics: designing the suite that turned scattered recruiting effort into one honest read — is sourcing paying off, and what to do next. Problem → study → build → impact.",
    Component: SourcingAnalyticsCaseStudy,
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

  /* A LOCKED STUDY GETS NEUTRAL METADATA. Gating the body while leaving the
     real title in <head> would have defeated the point: these titles carry the
     delta ("from 2-3 business days to less than 24 hours"), and <title> shows
     up in the browser tab, in search results, and in the unfurled card when the
     link is pasted into Slack or LinkedIn. PRODUCT.md notes that the unfurl is
     frequently the first impression, which cuts both ways.

     `robots: noindex` for the same reason: there is nothing behind the gate for
     a crawler to index, and without this the gate page itself could surface in
     search carrying the real headline.

     Note the metadata is resolved per request, like the page, so it flips back
     to the real title once unlocked. */
  if (isGated(slug) && !(await isUnlocked())) {
    return {
      title: "Protected case study | Marissa Klymkiw",
      description:
        "This case study is password protected. The password is on my resume, or get in touch and I will send it over.",
      robots: { index: false, follow: false },
    };
  }

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

  /* THE GATE. Deliberately here rather than inside the template: when a study
     is locked the study component is never INVOKED, so none of its markup is
     built, rendered, or serialised. Not the headline, not the metadata columns,
     not an image URL. A gate further down the tree could only omit part of a
     page whose top had already been rendered, and the top is where the outcome
     figures live. See lib/work-gate.ts for why this is server-side at all. */
  if (isGated(slug) && !(await isUnlocked())) return <WorkGate />;

  const { Component } = study;
  return <Component />;
}
