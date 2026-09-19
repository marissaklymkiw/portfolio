import {
  Beat,
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
 * Device Registration — TRIMMED draft ("less content" pass).
 *
 * A duplicate of DeviceRegistrationCaseStudy fitted with the leaner copy from
 * the Notion "trimmed draft" (Work Journal → Case study copy, v3, 2026-07-31).
 * Same primitives, same Swiss layout, but a six-stage teaser spine —
 * Overview → Problem → Design as delivery infrastructure → Alignment → Impact
 * signals → Reflection — and far fewer visuals, per the draft's "movie teaser"
 * visual direction (few, clear, value-led). The original, richer study is
 * untouched at /work/device-registration; this lives at
 * /work/device-registration-trimmed so the two can be compared side by side.
 *
 * Numbers are carried verbatim from the trimmed draft; they read as directional
 * early signals until the full pilot rollout completes.
 */
const STAGES = [
  { id: "overview", num: "01", name: "Overview" },
  { id: "problem", num: "02", name: "The problem" },
  {
    id: "delivery",
    num: "03",
    name: "Design as delivery infrastructure",
    short: "Delivery infrastructure",
  },
  {
    id: "alignment",
    num: "04",
    name: "Building alignment through structure",
    short: "Alignment",
  },
  { id: "impact", num: "05", name: "Impact signals" },
  { id: "reflection", num: "06", name: "Reflection" },
];

export default function DeviceRegistrationTrimmedCaseStudy() {
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
                { label: "Role", value: "Solo product design lead" },
                { label: "Scope", value: "Design-system pilot for applications" },
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
                {
                  label: "Results",
                  value: (
                    <>
                      80–85% self-service completion
                      <br />
                      30–40% fewer device-network tickets
                      <br />
                      Approvals cut from 2–3 days to &lt;24 hours
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
        {/* 01 · Overview */}
        <Stage
          id="overview"
          num="01"
          name="Overview"
          eyebrow="One front door for every device that can’t log in"
        >
          <Prose>
            <p>
              UCLA needed a faster way for students, staff, and IT admins to get
              non-login devices onto the campus network — game consoles,
              microscopes, printers, and shared lab equipment. The existing path
              depended on support tickets, which slowed people down and left the
              network with weak ownership signals.
            </p>
            <p>
              I joined after engineering had already started building. My
              contribution was not just to improve the screens, but to reset the
              shape of the product: clarify the roles, define the reusable path,
              set the accessibility bar, and give engineering a coded reference
              they could build from.
            </p>
          </Prose>
        </Stage>

        {/* 02 · The problem */}
        <Stage
          id="problem"
          num="02"
          name="The problem"
          eyebrow="A campus lab, locked off the network"
        >
          <Prose>
            <p>
              A university lab manager needs a microscope online for today’s
              run, but it can’t log in for itself. The only path is a support
              ticket and a wait while the experiment sits idle.
            </p>
            <p>
              Multiply that across a campus and you get a mountain of tickets,
              hours of staff and researcher time lost to the wait, and a network
              full of devices nobody can trace to an owner.
            </p>
          </Prose>

          <Figure
            src="/work/device-registration/lab-researcher.jpg"
            alt="A researcher at a microscope, its readings on a nearby monitor, on a device that cannot log in."
            width={3200}
            height={1786}
            zoomable={false}
          />

          <Prose>
            <p>
              The first build reflected the system’s needs more than the user’s
              task. It asked for the MAC address — the database key — without
              enough context, guidance, or ownership information. For a student
              or lab manager, the hardest part of registration was also the
              least explained.
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
              {
                side: "before",
                x: 42,
                y: 20,
                text: "Opens with the architecture",
              },
              {
                side: "before",
                x: 30,
                y: 62,
                text: "Cards named for the system",
              },
              {
                side: "after",
                dir: "up",
                x: 72,
                y: 46,
                text: "Cards named for the task",
              },
              {
                side: "after",
                x: 57,
                y: 76,
                text: "Plain language, not network jargon",
              },
            ]}
            caption="What design walked into: a system-centered developer interface. The redesign reframed the home screen around the four tasks users came to complete."
          />

          <Pullquote>
            The design challenge was bigger than one form: make device
            registration <strong>simple enough for a first-time student</strong>,
            structured enough for department workflows, and controlled enough
            for admins managing risk at campus scale.
          </Pullquote>
        </Stage>

        {/* 03 · Design as delivery infrastructure */}
        <Stage
          id="delivery"
          num="03"
          name="Design as delivery infrastructure"
          eyebrow="A coded reference, not a spec"
        >
          <Prose>
            <p>
              This was a pilot for extending UCLA’s design system beyond
              editorial pages into application workflows: role-based forms,
              validation, approvals, admin tables, and audit states. But design
              had no formal mandate when I joined. Engineering was already
              building, and the team was used to operating from
              implementation-first decisions.
            </p>
            <p>
              I treated that as the product problem underneath the product
              problem. Before the screens could improve, design had to become a
              delivery condition: user roles before screens, reusable patterns
              before one-off exceptions, accessibility before launch, and coded
              references before implementation drift could harden.
            </p>
          </Prose>

          <Figure
            src="/work/device-registration/layer-04-code.png"
            alt="The coded reference: a Storybook library of components and states engineering could inspect directly."
            width={1440}
            height={1080}
            caption="The coded reference: Storybook components and states engineering could build from, instead of screen-by-screen decisions during implementation."
          />

          <Pullquote>
            “The design prototype reference that Marissa provided let us build
            from a shared pattern instead of making screen-by-screen decisions
            during implementation.”
            <br />
            <strong>— Technical Lead, Workplace IT Products</strong>
          </Pullquote>
        </Stage>

        {/* 04 · Building alignment through structure */}
        <Stage
          id="alignment"
          num="04"
          name="Building alignment through structure"
          eyebrow="One product language across teams"
        >
          <Prose>
            <p>
              The project crossed central and distributed IT teams, each with
              different needs, permissions, and operational habits. Without a
              shared structure, the product risked becoming a set of exceptions
              negotiated screen by screen.
            </p>
            <p>
              I used the role model and inherited registration path to create
              alignment: one product language for users, approvers, admins, and
              engineering. That helped the team make decisions from the same map
              instead of re-litigating every edge case.
            </p>
          </Prose>

          <Figure
            src="/work/device-registration/layer-02-flows.png"
            alt="Role-inheritance matrix: four tiers as rows; each inherits the shared Register and Manage path (light blue) and adds its own scope (dark blue), from Basic User up to Super Admin."
            width={1440}
            height={720}
            caption="One inherited path, four roles. Each tier inherits everything the tier below can do (light blue) and adds only its own scope (dark blue) — so users, approvers, and admins all read from the same map."
          />
        </Stage>

        {/* 05 · Impact signals */}
        <Stage
          id="impact"
          num="05"
          name="Impact signals"
          eyebrow="Early signals from the pilot"
        >
          <Prose>
            <p>
              Phase 1 launched with one inherited pattern serving 14 device
              paths, built from 35 reusable application components, with 12 edge
              cases resolved before implementation ambiguity — and only 2
              accessibility issues found in UCLA’s Disabilities Computing Program
              audit.
            </p>
          </Prose>

          <StatBand
            stats={[
              {
                value: "14",
                label:
                  "device paths the single inherited pattern serves, across wired and wireless",
              },
              {
                value: "35",
                label:
                  "reusable application components the registration system is built from",
              },
              {
                value: "12",
                label:
                  "edge cases resolved before the build reached implementation ambiguity",
              },
              {
                value: "2",
                label:
                  "accessibility issues found in UCLA’s Disabilities Computing Program audit",
              },
            ]}
            note="Rolling out across a pilot footprint of 4 buildings, 5 stakeholder groups, and 7+ impacted campus units — roughly 50 staff users so far. These are directional early signals until the full rollout is complete."
          />

          <div className="mt-2xl mb-md">
            <Beat>What the early signals show</Beat>
          </div>
          <StatBand
            stats={[
              {
                value: "80–85%",
                label:
                  "self-service completion for users who start registration; the remaining 15–20% need help, approval follow-up, or correction",
              },
              {
                value: "30–40%",
                label:
                  "fewer device-network tickets for participating teams, versus the ticket-only process",
              },
              {
                value: "<24 hrs",
                label:
                  "median approval turnaround for standard requests, down from 2–3 business days",
              },
              {
                value: "<10 min",
                label:
                  "to submit a single-device registration, down from 1–2 days of ticket back-and-forth",
              },
            ]}
            note="Early friction clustered around pilot migration sites — Campus Services Building 1, Haines Hall, Knudsen Hall, and Perloff Hall. Signals to watch: unregistered devices falling back to Guest, delayed ownership confirmation, device cutsheet mismatches, and post-migration support volume."
          />

          <div className="mt-2xl">
            <Prose>
              <p>
                The value was not just a better registration flow. It gave UCLA
                a precedent for role-based, accessible application design inside
                a system that had mostly supported editorial surfaces before —
                and a structure that can now scale into Phase 2 bulk import and
                bulk management.
              </p>
            </Prose>
          </div>
        </Stage>

        {/* 06 · Reflection */}
        <Stage
          id="reflection"
          num="06"
          name="Reflection"
          eyebrow="What holds after I left"
        >
          <Prose>
            <p>
              This worked because design became a delivery condition, not a
              polish layer. I turned a late request into reusable product
              structure: roles, patterns, accessibility rules, coded references,
              and upstream decisions about device states, validation, approvals,
              and admin paths. AI helped me move faster, but only because I had
              already defined the context, constraints, and standards.
            </p>
            <p>
              Next time, I would formalize the design-system home and success
              measures earlier. Phase 1 proved the structure, but the components
              need ownership, and the learning loops should start at release:
              completion, errors, support patterns, and admin workload. From
              here, the same role logic can scale into bulk registration and
              management, and become a stronger precedent for future UCLA
              application flows.
            </p>
          </Prose>
        </Stage>
      </CaseStudyBody>
    </CaseStudyRoot>
  );
}
