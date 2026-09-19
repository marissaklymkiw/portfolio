import {
  Beat,
  CaseStudyBody,
  CaseStudyHeader,
  CaseStudyHero,
  CaseStudyMeta,
  CaseStudyRoot,
  CaseStudyTools,
  Figure,
  NumberedList,
  Prose,
  Pullquote,
  Stage,
  StatBand,
} from "@/components/ui/CaseStudy";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

/**
 * Device Registration — OPTION B, "Deep anchor".
 *
 * The fuller staff-level spine the research prizes for a 1–2 "deep anchor"
 * study. What it adds over the trimmed/impact versions:
 *  - Opens in the PROBLEM SPACE with the "work before the work" (design had no
 *    mandate; the reframe of what the project actually was).
 *  - A dedicated DECISIONS & TRADEOFFS stage — "what I didn't build and why"
 *    (the constraint the research names as a top senior signal).
 *  - The MULTIPLIER and INFLUENCE-WITHOUT-AUTHORITY beats made explicit.
 *  - Honest, why-tied metrics with post-launch iteration.
 *
 * Same content and assets as the other DRP variants; deeper structure. Lives
 * at /work/device-registration-anchor for comparison.
 */
const STAGES = [
  { id: "overview", num: "01", name: "Overview" },
  { id: "problem", num: "02", name: "The problem & the reframe", short: "The reframe" },
  { id: "pattern", num: "03", name: "One inherited path", short: "The pattern" },
  {
    id: "delivery",
    num: "04",
    name: "Design as delivery infrastructure",
    short: "Delivery",
  },
  { id: "tradeoffs", num: "05", name: "Decisions & tradeoffs", short: "Tradeoffs" },
  { id: "impact", num: "06", name: "Impact signals" },
  { id: "reflection", num: "07", name: "Reflection" },
];

export default function DeviceRegistrationAnchorCaseStudy() {
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
                { label: "Role", value: "Solo design lead — end to end" },
                { label: "Scope", value: "Design-system pilot for applications" },
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
        {/* 01 · Overview — the problem space and the work before the work */}
        <Stage
          id="overview"
          num="01"
          name="Overview"
          eyebrow="What the project actually was"
        >
          <Prose>
            <p>
              UCLA needed a faster way for students, staff, and IT admins to get
              non-login devices onto the campus network — game consoles,
              microscopes, printers, shared lab equipment. The existing path
              depended on support tickets, which slowed people down and left the
              network with weak ownership signals.
            </p>
            <p>
              I joined after engineering had already started building, and the
              real problem was bigger than the screens. Design had no formal
              mandate; the flow had formed around what the system needed, not
              what a user could finish. My contribution was to reset the shape of
              the product — clarify the roles, define one reusable path, set the
              accessibility bar, and give engineering a coded reference to build
              from — and to establish design as a decision-making function while
              doing it.
            </p>
          </Prose>
        </Stage>

        {/* 02 · The problem & the reframe */}
        <Stage
          id="problem"
          num="02"
          name="The problem & the reframe"
          eyebrow="Changing the question, not just the screens"
        >
          <Prose>
            <p>
              A lab manager needs a microscope online for today’s run, but it
              can’t log in for itself. The only path is a support ticket and a
              wait while the experiment sits idle. Multiply that across a campus
              and you get a mountain of tickets, hours of researcher time lost to
              the wait, and a network full of devices nobody can trace to an
              owner.
            </p>
            <p>
              The first build asked for the MAC address — the database key —
              without enough context, guidance, or ownership information. For a
              student or lab manager, the hardest part of registration was also
              the least explained.
            </p>
          </Prose>

          <Pullquote>
            The build had shipped the MAC address as the entire interface. It
            wasn’t a rough version of the right thing —{" "}
            <strong>it was the wrong organizing principle.</strong>
          </Pullquote>

          <Prose>
            <p>
              I benchmarked eight onboarding systems across higher-ed, consumer
              smart home, and enterprise NAC. The finding held across all of
              them: they hide MAC complexity behind friendly concepts — device
              type, room, name. So I stopped treating the MAC address as the
              interface and reframed the home around the four tasks users
              actually came to do.
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

        {/* 03 · One inherited path — the multiplier / systems thinking */}
        <Stage
          id="pattern"
          num="03"
          name="One inherited path"
          eyebrow="A pattern the whole portal inherits"
        >
          <Prose>
            <p>
              The reframe only mattered if it scaled. The project crossed central
              and distributed IT teams, each with different needs and habits;
              without a shared structure, the product risked becoming a set of
              exceptions negotiated screen by screen.
            </p>
            <p>
              So instead of one-off screens per device type, I designed a single
              registration pattern the whole portal inherits — one product
              language for users, approvers, admins, and engineering. Four roles
              stack: each tier inherits everything below it and adds only its own
              scope, from a student’s one device up to portal-wide admin control.
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

        {/* 04 · Design as delivery infrastructure — influence without authority */}
        <Stage
          id="delivery"
          num="04"
          name="Design as delivery infrastructure"
          eyebrow="Making design a condition of delivery"
        >
          <Prose>
            <p>
              This was a pilot for extending UCLA’s design system beyond
              editorial pages into application workflows — role-based forms,
              validation, approvals, admin tables, audit states. But design had
              no formal mandate, and the team was used to implementation-first
              decisions. I treated that as the product problem underneath the
              product problem: before the screens could improve, design had to
              become a delivery condition — roles before screens, reusable
              patterns before one-off exceptions, accessibility before launch,
              coded references before drift could harden.
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

        {/* 05 · Decisions & tradeoffs — what I didn't build and why */}
        <Stage
          id="tradeoffs"
          num="05"
          name="Decisions & tradeoffs"
          eyebrow="What I didn’t build, and why"
        >
          <Prose>
            <p>
              Staff-level scope shows up in the constraints held as much as the
              screens shipped. Three decisions shaped what the pattern
              deliberately does not do.
            </p>
          </Prose>

          <NumberedList
            items={[
              {
                label: "Import never deletes",
                body: (
                  <p>
                    Analysing bulk operations across HubSpot, Salesforce,
                    Airtable, and Mailchimp, one constraint held everywhere: a
                    file can add or update records, but removal is always an
                    in-table action behind a guard. So for Phase 2 the CSV path
                    stays additive, and quarantine or removal stays in the device
                    table where the count and consequence can be named before
                    anything happens.
                  </p>
                ),
              },
              {
                label: "One inherited path, not four bespoke flows",
                body: (
                  <p>
                    It would have been faster to solve each role’s screens
                    separately. I didn’t — the whole point was a structure the
                    design system could carry forward, so the same path had to
                    work for the user with the least access and the admin with
                    the most control.
                  </p>
                ),
              },
              {
                label: "Accessibility as a launch gate, not a polish pass",
                body: (
                  <p>
                    The project had no accessibility plan, so I set one: WCAG 2.1
                    AA, ADA, Section 508, with a single rule the team could hold
                    to — if a barrier blocks a task, the feature is broken, not
                    imperfect. That moved the Quarantined status contrast from
                    8.81:1 to 11.6:1, into AAA, before launch rather than after.
                  </p>
                ),
              },
            ]}
          />
        </Stage>

        {/* 06 · Impact signals — two honest stat rows + post-launch */}
        <Stage
          id="impact"
          num="06"
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
          />

          <div className="mt-2xl mb-md">
            <Beat>What the early signals show</Beat>
          </div>
          <StatBand
            stats={[
              {
                value: "80–85%",
                label:
                  "self-service completion for users who start registration; 15–20% need help, approval follow-up, or correction",
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
            note="Early friction clustered around pilot migration sites — Campus Services Building 1, Haines Hall, Knudsen Hall, and Perloff Hall. Signals to watch: unregistered devices falling back to Guest, delayed ownership confirmation, cutsheet mismatches, and post-migration support volume. Directional until the full rollout completes."
          />

          <div className="mt-2xl">
            <Prose>
              <p>
                The value was not just a better registration flow. It gave UCLA a
                precedent for role-based, accessible application design inside a
                system that had mostly supported editorial surfaces before — and
                a structure that can now scale into Phase 2 bulk import and bulk
                management.
              </p>
            </Prose>
          </div>
        </Stage>

        {/* 07 · Reflection */}
        <Stage
          id="reflection"
          num="07"
          name="Reflection"
          eyebrow="What holds after I left"
        >
          <Prose>
            <p>
              This worked because design became a delivery condition, not a
              polish layer. I turned a late request into reusable product
              structure — roles, patterns, accessibility rules, coded references,
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
