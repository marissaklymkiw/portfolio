import {
  CaseStudyBody,
  CaseStudyHeader,
  CaseStudyHero,
  CaseStudyMeta,
  CaseStudyRoot,
  CaseStudyTools,
  Figure,
  Prose,
  Pullquote,
  Stage,
  StatBand,
} from "@/components/ui/CaseStudy";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

/**
 * Device Registration — OPTION A, "Impact-first".
 *
 * A research-driven restructure of the trimmed DRP study. The staff-level
 * finding it applies: senior case studies LEAD WITH THE OUTCOME and then earn
 * it, make the PROBLEM REFRAME the hero beat (proof you changed the question,
 * not just answered it), and label the MULTIPLIER explicitly (a pattern other
 * teams build from, not screens one person owned). Lean four-stage spine:
 * Outcome → The reframe → One pattern, many devices → How it held.
 *
 * Same content and assets as /work/device-registration-trimmed; different
 * narrative order. Lives at /work/device-registration-impact for comparison.
 */
const STAGES = [
  { id: "outcome", num: "01", name: "Outcome" },
  { id: "reframe", num: "02", name: "The reframe" },
  {
    id: "pattern",
    num: "03",
    name: "One pattern, many devices",
    short: "The pattern",
  },
  { id: "held", num: "04", name: "How it held" },
];

export default function DeviceRegistrationImpactCaseStudy() {
  return (
    <CaseStudyRoot>
      <CaseStudyHeader
        badge={{ mark: "UCLA", label: "Platform Design" }}
        title="One pattern, 14 device paths — a front door for everything on campus that can’t log in by itself"
        hero={
          <CaseStudyHero
            src="/work/device-registration/drp-super-admin-home.png"
            alt="Super Admin screen with options: device registration, management, configurations, approvals."
            width={3987}
            height={2439}
            priority
            caption="The task-based application home, built on design-system components and delivered as a coded prototype."
          />
        }
      />

      <CaseStudyBody
        stages={STAGES}
        lead={
          <>
            <CaseStudyMeta
              meta={[
                {
                  label: "Role",
                  value: "Solo design lead — end to end",
                },
                {
                  label: "Scope",
                  value: "Design-system pilot for applications",
                },
                {
                  label: "Cross-team",
                  value: (
                    <>
                      Aligned Network, Business IT Products, OCISO &amp; Digital
                      Foundry against a hard July deadline
                    </>
                  ),
                },
                {
                  label: "Timeframe",
                  value: (
                    <>
                      Phase 1: July 2026
                      <br />
                      Phase 2: in progress
                    </>
                  ),
                },
              ]}
            />

            <CaseStudyTools
              label="Tools & methods"
              chips={[
                "Claude.ai",
                "Claude Code",
                "Storybook",
                "Coded prototypes",
                "Accessibility review",
              ]}
            />
          </>
        }
      >
        {/* 01 · Outcome — lead with where it landed, then earn it */}
        <Stage
          id="outcome"
          num="01"
          name="Outcome"
          eyebrow="Lead with where it landed"
        >
          <Prose>
            <p>
              Phase 1 is live. One inherited pattern now serves fourteen device
              paths across wired and wireless — and the early pilot signals are
              already moving the numbers that matter.
            </p>
          </Prose>

          <StatBand
            stats={[
              {
                value: "80–85%",
                label:
                  "self-service completion for users who start registration",
              },
              {
                value: "30–40%",
                label:
                  "fewer device-network tickets for participating teams",
              },
              {
                value: "<24 hrs",
                label:
                  "median approval turnaround, down from 2–3 business days",
              },
              {
                value: "<10 min",
                label:
                  "to submit a registration, down from 1–2 days of ticket back-and-forth",
              },
            ]}
            note="Rolling out across 4 buildings, 5 stakeholder groups, and 7+ impacted campus units — roughly 50 staff users so far. Directional early signals until the full rollout completes."
          />

          <div className="mt-2xl">
            <Pullquote>
              The build had shipped the MAC address as the entire interface. It
              wasn’t a rough version of the right thing —{" "}
              <strong>it was the wrong organizing principle.</strong>
            </Pullquote>
          </div>
        </Stage>

        {/* 02 · The reframe — the beat that separates staff from mid-level */}
        <Stage
          id="reframe"
          num="02"
          name="The reframe"
          eyebrow="Changing the question"
        >
          <Prose>
            <p>
              A lab manager needs a microscope online for today’s run, but it
              can’t log in for itself — so the only path is a support ticket and
              a wait while the experiment sits idle. Multiply that across a
              campus and you get a mountain of tickets and a network full of
              devices nobody can trace to an owner.
            </p>
            <p>
              I joined after engineering had already started building. The first
              build reflected the system’s needs, not the user’s task: it asked
              for the MAC address — the database key — without context,
              guidance, or ownership. So I stopped treating the MAC address as
              the interface and{" "}
              <strong>
                reframed the home around the four tasks users actually came to
                do.
              </strong>
            </p>
          </Prose>

          <BeforeAfterSlider
            label="Compare the original developer version with the redesigned Super Admin home"
            beforeSrc="/work/device-registration/drp-before-home.png"
            beforeAlt="The dev-built home: a stock banner, an architecture paragraph, and three system-named cards."
            afterSrc="/work/device-registration/carousel/03-super-admin-home.png"
            afterAlt="The rebuilt home: a greeting, four task-named cards, and a pending-approvals list."
            beforeLabel="Before"
            afterLabel="After"
            width={2160}
            height={1240}
            callouts={[
              { side: "before", x: 42, y: 20, text: "Opens with the architecture" },
              { side: "before", x: 30, y: 62, text: "Cards named for the system" },
              { side: "after", dir: "up", x: 72, y: 46, text: "Cards named for the task" },
              { side: "after", x: 57, y: 76, text: "Plain language, not network jargon" },
            ]}
            caption="What design walked into: a system-centered developer interface. The redesign reframed the home around the four tasks users came to complete."
          />
        </Stage>

        {/* 03 · One pattern, many devices — the multiplier, made explicit */}
        <Stage
          id="pattern"
          num="03"
          name="One pattern, many devices"
          eyebrow="The multiplier"
        >
          <Prose>
            <p>
              The reframe only mattered if it scaled. Instead of one-off screens
              per device type, I designed a single registration pattern the
              whole portal inherits — the same path flexing across four roles,
              from a student’s one device up to portal-wide admin control.
            </p>
            <p>
              <strong>
                The value wasn’t a better form. It was a reusable pattern the
                design system inherits
              </strong>{" "}
              — the first proof UCLA’s system could carry application flows, not
              just editorial pages.
            </p>
          </Prose>

          <Figure
            src="/work/device-registration/layer-02-flows.png"
            alt="Role-inheritance matrix: four tiers as rows; each inherits the shared Register and Manage path (light blue) and adds its own scope (dark blue), from Basic User up to Super Admin."
            width={1440}
            height={720}
            caption="One inherited path, four roles. Each tier inherits everything the tier below can do (light blue) and adds only its own scope (dark blue)."
          />

          <StatBand
            stats={[
              {
                value: "14",
                label:
                  "device paths the single pattern serves, across wired and wireless",
              },
              {
                value: "35",
                label:
                  "reusable application components the system is built from",
              },
              {
                value: "12",
                label:
                  "edge cases resolved before the build reached implementation",
              },
              {
                value: "2",
                label:
                  "accessibility issues found in UCLA’s Disabilities Computing Program audit",
              },
            ]}
          />
        </Stage>

        {/* 04 · How it held — influence without authority, then the proof */}
        <Stage
          id="held"
          num="04"
          name="How it held"
          eyebrow="Influence without a mandate"
        >
          <Prose>
            <p>
              Design had no formal mandate when I joined; engineering was already
              building. I treated that as the product problem underneath the
              product problem, and made design a delivery condition — user roles
              before screens, reusable patterns before one-off exceptions,
              accessibility before launch, coded references before drift could
              harden. The test of a pattern is whether people build on it when
              nobody makes them.
            </p>
          </Prose>

          <Pullquote>
            “The design prototype reference that Marissa provided let us build
            from a shared pattern instead of making screen-by-screen decisions
            during implementation.”
            <br />
            <strong>— Technical Lead, Workplace IT Products</strong>
          </Pullquote>

          <div className="mt-2xl">
            <Prose>
              <p>
                From here the same role logic scales into Phase 2 — bulk import
                and bulk management for labs and departments bringing hundreds of
                devices online at once. The pattern doesn’t restart; it carries
                the same validation model, accessibility baseline, and coded
                reference underneath.
              </p>
            </Prose>
          </div>
        </Stage>
      </CaseStudyBody>
    </CaseStudyRoot>
  );
}
