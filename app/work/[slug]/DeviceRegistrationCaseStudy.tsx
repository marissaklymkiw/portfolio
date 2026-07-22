import {
  Beat,
  CaseStudyBody,
  CaseStudyHeader,
  CaseStudyHero,
  CaseStudyLede,
  CaseStudyMeta,
  CaseStudyRoot,
  CaseStudyTools,
  Figure,
  NumberedList,
  PersonaList,
  Prose,
  Pullquote,
  Stage,
  StatBand,
} from "@/components/ui/CaseStudy";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import ExperienceCarousel from "@/components/ui/ExperienceCarousel";
import FigureTabs from "@/components/ui/FigureTabs";
import MediaNote from "@/components/ui/MediaNote";

/**
 * Device Registration — the DRP case study, restaged in the Swiss system.
 *
 * The COPY is unchanged from the previous version: same argument, same five-
 * stage spine (Problem → Approach → System Built → Adoption → Impact), same
 * author placeholders (CONFIRM / SLOT / INSERT VISUAL) still marked as owed.
 * Only the layout changed — this now composes the primitives in
 * components/ui/CaseStudy.tsx rather than carrying 870 lines of scoped CSS.
 *
 * Dropped deliberately in the restage:
 *  - the teal hero background (a colour field; the system is monochrome on white)
 *  - the sticky scrollspy rail (the section rules carry the structure instead)
 *  - the four-persona radio-TAB interaction — but NOT the personas themselves:
 *    they're now a PersonaList, headshots and tier labels intact, all four
 *    visible at once instead of three hidden behind a control. Readable without
 *    JS, and the stacking argument reads better when you can see the tiers stack.
 * Both are recoverable from git if you want them back.
 *
 * This is a server component: nothing here needs the client.
 */
/**
 * The spine. These ids/nums MUST match the <Stage> elements below — the rail
 * resolves each id with getElementById to drive its scrollspy, so a typo here
 * silently kills the highlight for that stage.
 */
const STAGES = [
  { id: "problem", num: "01", name: "Problem" },
  { id: "approach", num: "02", name: "Approach" },
  {
    id: "system",
    num: "03",
    name: "From Context to Working Code",
    /* the rail gets the tail of the heading, not a synonym for it — "Working
       Code" appears verbatim in the full name, so the index and the section
       heading read as the same thing. A label that shares no words with the
       heading (e.g. "System") would also fail WCAG 2.5.3, since the accessible
       name of the link must contain its visible text. */
    short: "Working Code",
  },
  { id: "adoption", num: "04", name: "Adoption" },
  { id: "impact", num: "05", name: "Impact" },
  { id: "reflection", num: "06", name: "Reflection" },
];

/**
 * The reflection lists — bold lead-in, then the sentence, one rule between
 * items. Local to this study: it's the only place the close is structured as
 * three short decks rather than flowing paragraphs, so it doesn't earn a slot
 * in components/ui/CaseStudy.tsx until a second study wants it.
 */
function ReflectionList({
  items,
}: {
  items: { label: string; body: string }[];
}) {
  return (
    <ul className="list-none p-0 m-0 max-w-reading">
      {items.map((item) => (
        <li
          key={item.label}
          className="border-t border-line last:border-b py-lg text-prose text-ink"
        >
          <strong className="font-bold">{item.label}:</strong> {item.body}
        </li>
      ))}
    </ul>
  );
}

export default function DeviceRegistrationCaseStudy() {
  return (
    <CaseStudyRoot>
      <CaseStudyHeader
        badge={{ mark: "UCLA", label: "Platform Design" }}
        title="One front door for every device that can’t log in for itself"
        hero={
          /* width/height are the asset's true intrinsic pixels (3987×2439) — they
             set the aspect ratio next/image reserves, so a wrong pair here causes
             layout shift on load. Re-measure if the asset is ever swapped. */
          <CaseStudyHero
            src="/work/device-registration/drp-super-admin-home.png"
            alt="Super Admin screen with options: device registration, management, configurations, approvals."
            width={3987}
            height={2439}
            priority
            caption="The application, built on design-system components and delivered as a coded prototype."
          />
        }
      />

      {/* Metadata, tools, and lede lead the right column so the rail (Go back +
          index) starts at the metadata row rather than below the title block. */}
      <CaseStudyBody
        stages={STAGES}
        lead={
          <>
            <CaseStudyMeta
              className=""
              meta={[
                { label: "Role", value: "Senior Product Designer" },
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
                  label: "Team",
                  value: (
                    <>
                      Led end-to-end design
                      <br />2 engineers
                      <br />1 business systems analyst
                    </>
                  ),
                },
                {
                  label: "Responsibilities",
                  value: (
                    <>
                      Design prototype (coded)
                      <br />
                      AI-native build
                      <br />
                      Accessibility standard and review
                      <br />
                      AI design system
                    </>
                  ),
                },
              ]}
            />

            {/* Every chip is evidenced in the body copy: Claude.ai and Claude
                Code in the Layer 1–4 stack, Storybook in Layer 4, Comet Browser
                in the Phase 1 benchmarking, Mobbin in the Phase 2 analysis. The
                two analyses are labelled by phase because the study now cites
                both and they are easy to confuse. "Concept testing" is the one
                FORWARD-LOOKING entry — it is planned Phase 2 work, not something
                already run. Drop it if the sessions slip. */}
            <CaseStudyTools
              label="Tools & methods"
              chips={[
                "Claude.ai",
                "Claude Code",
                "Skills",
                "Storybook",
                "Node.js",
                "AI Design System",
                "Comet Browser (Phase 1 analysis)",
                "Mobbin MCP (Phase 2 analysis)",
                "Stakeholder interviews",
                "Concept testing (Phase 2)",
              ]}
            />

            <CaseStudyLede>
              Engineering was already building UCLA’s device registration app
              without design direction. I turned one-off screens into reusable
              patterns and delivered the coded reference engineering built from.
            </CaseStudyLede>
          </>
        }
      >
        {/* 01 · Problem */}
        <Stage
          id="problem"
          num="01"
          name="Problem"
          eyebrow="A campus lab, locked off the network"
        >
          <Prose>
            <p>
              A university lab manager needs a microscope online for today’s
              run, but it can’t log in for itself, so the only path is a support
              ticket and a wait while the experiment sits idle.
            </p>
            <p>
              Multiply that across a campus and you get a mountain of tickets,
              hours of staff and researcher time lost to the wait, and a network
              full of devices nobody can trace to an owner.
            </p>
          </Prose>

          {/* intrinsic pixels of the asset (3200×1786) — these set the aspect
            next/image reserves, so a wrong pair causes layout shift on load.
            Source is 11008×6144 / 11MB; downscaled to 3200 because the figure
            renders ~1084px and 3200 already covers 2x retina with headroom. */}
          <Figure
            src="/work/device-registration/lab-researcher.jpg"
            alt="A researcher at a microscope, its readings on a nearby monitor, on a device that cannot log in."
            width={3200}
            height={1786}
            /* not zoomable: this is a scene-setting stock photograph, not a
               product artifact. Nothing in it rewards a closer look, and a
               zoom-in cursor promises detail that isn't there. */
            zoomable={false}
          />

          <Pullquote>
            A device that can’t log in still <strong>belongs to someone</strong>
            . Network Unification’s device registration application had to make
            that ownership effortless. For a student, a lab manager, and a
            network admin. Three very different people.
          </Pullquote>

          <div className="mt-2xl mb-md">
            <Beat>We had a three-part challenge</Beat>
          </div>
          <NumberedList
            items={[
              {
                label: "The user was locked out of their own device",
                body: (
                  <p>
                    Registration meant filing a ticket and waiting on central
                    IT. The people who needed a device online, students and lab
                    staff, had no way to do it themselves.
                  </p>
                ),
              },
              {
                label: "The system had no pattern to build on",
                body: (
                  <p>
                    UCLA’s design system covered editorial surfaces, not
                    application flows. Role-based forms, MAC validation, and
                    approval workflows had no scaffolding to inherit, so every
                    case risked being solved from scratch.
                  </p>
                ),
              },
              {
                label: "Design had no mandate in the build",
                body: (
                  <p>
                    Engineering was already coding, and the flow had formed
                    around what the system needed rather than what a user could
                    finish. The deeper problem wasn&rsquo;t only that design
                    arrived late; it was that design had not yet been
                    established as a decision-making function. My first job was
                    to create the conditions of delivery: run stakeholder
                    interviews to settle who the users actually were, define the
                    roles that came out of them, name the reusable patterns, set
                    accessibility as a launch requirement, and give engineering
                    a coded reference they could build from instead of turning
                    every screen into a one-off solution.
                  </p>
                ),
              },
            ]}
          />

          {/* The evidence for challenge 03, directly under the list that makes
              the claim. Sources are deliberately NOT re-cropped to a shared
              aspect: the component covers + top-anchors them instead, which
              lines the two headers up without a lossy re-encode. Names in the
              dev build were already redacted at the source — it is a real UCLA
              colleague's session and this is a public page. */}
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
            /* x/y are percentages of the frame. Each dot has to sit inside its
               own half at the 50% default, so before dots stay under 45% and
               after dots stay over 55% — otherwise a callout is clipped away on
               first paint and reads as a rendering bug. */
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

          <div className="mt-2xl mb-md">
            <Beat>The state of the application when design arrived</Beat>
          </div>
          <StatBand
            stats={[
              {
                value: "5 wks",
                label:
                  "the pilot had already slipped before design was at the table",
              },
              {
                value: "62%",
                label:
                  "of the Jira backlog untouched as of April 2026, one developer in flight",
              },
              {
                value: "0",
                label:
                  "application-layer design components existed to build from",
              },
            ]}
            note="With Network, Business IT Products, OCISO, and Digital Foundry all at the table, the work had to align four UCLA teams against a hard July deadline."
          />
        </Stage>

        {/* 02 · Approach */}
        <Stage
          id="approach"
          num="02"
          name="Approach"
          eyebrow="One pattern the portal inherits"
        >
          <Prose>
            <p>
              The application wasn’t the only thing to ship. It was a sanctioned
              pilot for extending UCLA’s design system past editorial surfaces
              into application flows, the first test of whether the system could
              carry role-based forms, validation, and approval workflows at all.
              That raised the bar on every decision: whatever I built here had
              to be good enough to become the pattern the design system
              inherits, not just good enough to launch.
            </p>
            <p>
              The structural move was to stop treating each device type as its
              own problem. Instead of one-off screens, I designed{" "}
              <strong>
                reusable registration patterns the whole portal could inherit
              </strong>
              : a shared path that could flex across device types, permission
              levels, and approval states without splintering into separate
              flows. The goal was not to clean up the screens already in motion;
              it was to give the application a structure the design system could
              carry forward.
            </p>
            <p>
              The reframe wasn’t a guess. I benchmarked eight systems across
              three ecosystems, using Comet Browser: higher-ed peers (Stanford,
              UMN, WCU/UARK), consumer smart home (Google Home, Apple HomeKit,
              Alexa), and enterprise NAC (Portnox, Aruba ClearPass Onboard). The
              scoping was the argument. Student expectations are set by Apple
              and Google, not by enterprise IT portals, and that gap is the
              design risk.
            </p>
            <p>
              The finding held across all eight:{" "}
              <strong>they hide MAC complexity behind friendly concepts</strong>
              , device type, room, and name, even the higher-ed portals. Apple’s
              Add Accessory flow exposes no MAC at all. The build had shipped
              the MAC address as the entire interface. It wasn’t a rough version
              of the right thing. It was the wrong organizing principle.
            </p>
          </Prose>

          {/* the artifact, not a redrawing of it: this is the real deck slide,
            UCLA blue and yellow included. Restyling it monochrome to match the
            page would misrepresent the thing it is evidence of. */}
          <Figure
            src="/work/device-registration/drp-comparator-landscape.png"
            alt="Comparator landscape showing Higher Ed, Smart Home, and Enterprise NAC onboarding patterns."
            width={2400}
            height={1350}
            caption="The comparator landscape. Benchmarking across three ecosystems rather than just peer universities, because the bar a student brings to the page was set by Apple and Google."
          />

          <Beat>I turned diagnosis into authority</Beat>
          <div className="mt-md">
            <Prose>
              <p>
                The moment it turned was a review of three user flows with the
                business systems analyst (BSA) and the engineer. On the table
                were screens the engineer had already built in code, to their
                own product conventions, with no design standards applied. I
                brought three flows I’d developed and a structured read of their
                logic, surfacing gaps, inconsistencies, and assumptions nobody
                had named yet. Not critique. Diagnosis. The BSA said the work
                was good, and that mattered because the subject-matter expert
                was validating the read. Design was no longer reacting to what
                had already been built; it had become the structure the build
                needed to follow.
              </p>
            </Prose>
          </div>

          <Beat>I made design a condition of delivery</Beat>
          <div className="mt-md">
            <Prose>
              <p>
                This was a team used to operating at lower design maturity,
                where design arrived late and deferred to whatever had already
                been built. I treated that as the product problem underneath the
                visible product problem. The work was not only to redesign the
                registration flow, but to make design a condition of delivery:
                user roles before screens, reusable patterns before one-off
                exceptions, accessibility before launch, and coded references
                before implementation drift. That is what changed the project
                from emergency UX into platform work.
              </p>
            </Prose>
          </div>

          <div className="mt-2xl">
            <Beat>Four roles, one inherited path</Beat>
            {/* The session photo sits BESIDE the paragraph that describes it,
                so the evidence and the claim read together. Stacks under it
                below 900px, where a 340px card would squeeze the prose to an
                unreadable measure.

                The still is PRE-BLURRED in the asset itself, not with a CSS
                filter: a filter still ships the original file, and this is a
                room of identifiable UCLA colleagues. The Zoom room label is the
                only part left sharp. Source retained outside the repo. */}
            <div className="mt-md grid grid-cols-1 gap-xl md:grid-cols-[1fr_340px] md:items-start">
              <Prose>
                <p>
                  The four roles came out of stakeholder interviews with the
                  Network team. Different people described different users they
                  were building for, and nobody had reconciled those
                  descriptions into one model. Naming the tiers, and agreeing
                  what each could see and do, was the first thing that had to be
                  settled before any screen could be drawn.
                </p>
                <p>
                  <strong>The roles don’t sit side by side. They stack.</strong>{" "}
                  Each tier inherits everything below it and adds its own scope,
                  from a student registering one device to the administrator
                  configuring the whole portal. Designing one inherited path
                  meant making the same structure work for the user with the
                  least access and the admin with the most control.
                </p>
              </Prose>

              <MediaNote
                src="/work/device-registration/stakeholder-interviews-blurred.png"
                alt="A blurred video-call still of a stakeholder interview; only the Zoom room label is legible."
                label="Stakeholder interviews"
                width={1152}
                height={690}
              />
            </div>
          </div>

          <div className="mt-xl">
            <PersonaList
              personas={[
                {
                  num: "01",
                  role: "Basic User",
                  name: "Priya",
                  portrait: "/work/device-registration/priya.svg",
                  portraitAlt: "Priya",
                  body: (
                    <p>
                      A student with a game console and smart TV needs it on the
                      campus network. But there’s no obvious first step to
                      connect it, and no way to fix it when she’s stuck. Priya
                      is the base tier every other user builds on: get her two
                      jobs right, connecting a device and managing it after, and
                      every role above inherits them.
                    </p>
                  ),
                },
                {
                  num: "02",
                  role: "Group User",
                  name: "Marcus",
                  scope: "Department scope",
                  portrait: "/work/device-registration/persona-marcus.svg",
                  portraitAlt: "Marcus",
                  body: (
                    <p>
                      A staff member outfitting his unit needs to register and
                      track many devices at once, the shared lab and office
                      equipment that belongs to the department, not to any one
                      person. But the tools assume a single owner, so there’s no
                      efficient way to handle devices at volume. Marcus inherits
                      everything Priya can do and adds department scope: a
                      registration form with department-level fields, and a
                      device list that shows his whole group’s inventory.
                    </p>
                  ),
                },
                {
                  num: "03",
                  role: "Group Admin",
                  name: "Elena",
                  scope: "Department scope",
                  portrait: "/work/device-registration/persona-elena.svg",
                  portraitAlt: "Elena",
                  body: (
                    <p>
                      A departmental IT contact, accountable for everything that
                      connects under her group, needs to approve, review, and
                      oversee each registration in her scope. But she has no
                      delegated surface that shows only her group’s queue
                      without exposing the whole institution. Elena inherits
                      everything Marcus can do and adds oversight of her
                      department: a pending-approvals queue for her group’s
                      requests, and audit logs scoped to what she governs.
                    </p>
                  ),
                },
                {
                  num: "04",
                  role: "Super Admin",
                  name: "David",
                  scope: "Portal-wide",
                  portrait: "/work/device-registration/persona-david.svg",
                  portraitAlt: "David",
                  body: (
                    <p>
                      A central IT administrator, responsible for
                      institution-wide security and compliance, needs full
                      visibility and control across every group, status, and
                      device on the portal. But managing exceptions,
                      quarantines, and expirations at campus scale breaks down
                      the moment the tools force manual, device-by-device
                      handling. David sits at the top of the stack, inheriting
                      everything below and adding portal-wide control: the
                      Configuration section for roles, policies, network
                      structure, and system sync, plus both device and system
                      audit logs.
                    </p>
                  ),
                },
              ]}
            />
          </div>

          <Figure
            src="/work/device-registration/system-admin-flow.png"
            alt="Super Admin flow: sign-in, registration, device management, configuration, and audit logs."
            width={3052}
            height={1794}
            caption="The Super Admin user flows: single-device registration for Phase 1, device management, and configuration for device roles, policies, and buildings."
          />
        </Stage>

        {/* 03 · From Context to Working Code */}
        <Stage
          id="system"
          num="03"
          name="From Context to Working Code"
          eyebrow="A coded reference, not a spec"
        >
          <div className="mt-2xl">
            <Beat>Layer 1: project context</Beat>
          </div>
          <div className="mt-md">
            <Prose>
              <p>
                Before designing screens, I built a project in Claude.ai to hold
                the working context: milestones, the user roles, user stories,
                stakeholder constraints, design system gaps, accessibility
                requirements, and open product questions. That gave me a place
                to pressure-test assumptions, synthesize messy inputs, and keep
                the work anchored as the project moved from discovery into
                build.
              </p>
            </Prose>
          </div>

          <div className="mt-2xl border-t border-line pt-2xl">
            <Beat>Layer 2: user flows</Beat>
          </div>
          <div className="mt-md">
            <Prose>
              <p>
                From there, I mapped the product logic: who could register a
                device, who could approve it, who could manage it, and what
                changed at each permission level. The flows made the role model
                concrete before the interface took shape, so the team could see
                where one inherited path could hold and where admin control
                needed to branch.
              </p>
            </Prose>
          </div>

          <div className="mt-2xl border-t border-line pt-2xl">
            <Beat>Layer 3: visual foundation</Beat>
          </div>
          <div className="mt-md">
            <Prose>
              <p>
                Then I translated that structure into UCLA’s visual language:
                task-based entry points, form patterns, status states,
                validation, and help where users needed it. I used Claude Code
                to move quickly from product logic into rendered interface
                directions, testing layouts, content, and interaction patterns
                against the same bar: every screen had to feel like part of
                UCLA’s system, not a one-off application bolted onto it.
              </p>
            </Prose>
          </div>

          <div className="mt-2xl border-t border-line pt-2xl">
            <Beat>Layer 4: coded references</Beat>
          </div>
          <div className="mt-md">
            <Prose>
              <p>
                Once the visual direction held, I used Claude Code and Storybook
                to turn the Phase 1 patterns into a working reference: coded
                components, states, and examples engineering could inspect
                directly. For Phase 2, I extended the same method into bulk
                registration and management, wireframing the flows and building
                a Claude Code skill to keep the next round of design work
                anchored to the same product logic.
              </p>
            </Prose>
          </div>

          <div className="mt-2xl mb-md border-t border-line pt-2xl">
            <Beat>Accessibility: the bar I set for the team</Beat>
          </div>
          <Prose>
            <p>
              The project had no accessibility plan, so I set the baseline: WCAG
              2.1 AA, the ADA, and Section 508, with one rule the team could
              hold to. If a barrier blocks a task, the feature is broken, not
              imperfect. That standard showed up in the details: building help
              moved from a tooltip to a persistent inline link, hit targets met
              44×44px, focus rings were visible, async states used aria-live,
              forced-colors support was included, and the Quarantined status
              contrast moved from <strong>8.81:1 to 11.6:1</strong>, into AAA.
            </p>
          </Prose>

          {/* the four layers as switchable figures — the visual counterpart to
              the Layer 1–4 prose above. Replaces the old FigureSlot placeholder,
              which asked for "the built system, hi-fi"; this is that, and it
              shows all four stages of the method rather than only the finish. */}
          <FigureTabs
            label="Layers"
            tabs={[
              {
                label: "Context",
                src: "/work/device-registration/layer-01-context.png",
                alt: "A Claude.ai project: source materials feeding one analysis at the root of the work.",
                width: 1408,
                height: 744,
                caption:
                  "Layer 1: project context. Source materials, milestones, roles, and constraints held in one place.",
              },
              {
                label: "Flows",
                src: "/work/device-registration/layer-02-flows.png",
                alt: "Role logic as flows: what each of the four permission tiers inherits and what it adds.",
                width: 1440,
                height: 720,
                caption:
                  "Layer 2: user flows. Role logic resolved before any screen was drawn.",
              },
              {
                label: "Visuals",
                src: "/work/device-registration/layer-03-visuals.png",
                alt: "Interface patterns: task-based entry points, form patterns, status states, and validation.",
                width: 1440,
                height: 900,
                caption:
                  "Layer 3: visual foundation. UCLA's visual language applied to the application surface.",
              },
              {
                label: "Code",
                src: "/work/device-registration/layer-04-code.png",
                alt: "The coded reference: a Storybook library of components and states, plus a Claude Code skill.",
                width: 1440,
                height: 1080,
                caption:
                  "Layer 4: coded references. Storybook for Phase 2, plus a Claude Code skill to keep the next round anchored.",
              },
            ]}
          />
        </Stage>

        {/* 04 · Adoption */}
        <Stage
          id="adoption"
          num="04"
          name="Adoption"
          eyebrow="Teams want to build with the design system"
        >
          <Prose>
            <p>
              The test of a system is whether other people build on it when
              nobody makes them. The patterns held because the hard parts, the
              edge cases, were{" "}
              <strong>already resolved before anyone else touched them</strong>.
              The strongest proof of that isn’t my claim. It’s the engineer who
              built from the specs saying so.
            </p>
          </Prose>
        </Stage>

        {/* 05 · Impact */}
        <Stage id="impact" num="05" name="Impact" eyebrow="Structure in use">
          <Prose>
            <p>
              Phase 1 is now live, with the build following the structure I
              designed: one registration pattern serving device paths across
              wired and wireless use cases, built from reusable application
              components and resolved edge cases instead of one-off screens. I’m
              tracking launch evidence now, completion, errors, support
              patterns, and admin workload, while the build already shows the
              platform value.
            </p>
          </Prose>

          {/* PROVENANCE — keep this honest, the numbers are the whole point:
            14  sourced. DR Field & Database Tables: 16 role × VLAN × approval
                combinations, of which 2 (cf_user VLAN F and G) are unconfigured
                placeholders. 14 is the defensible figure, not 16.
            35  Storybook library count from the live phase2 build: 25 composed
                Components (26 titles minus the Components/Overview index page)
                plus 10 Elements. Foundations (7 token pages) are excluded —
                they are not components. Conservative: "Form elements" is one
                page covering six controls.
                NOTE the label says "built from", NOT "absorbed into the UCLA
                design system" — that was the original wording and it claims
                adoption this page cannot yet evidence. The Phase 1 analysis
                says outright: "There is no design system reference in the
                project documents." Do not restore the adoption wording until
                there is a source for it.
            12  MK's count, stated as a floor. Exact figure still owed. */}
          <StatBand
            stats={[
              {
                value: "14",
                label:
                  "device paths the single registration pattern serves, across wired and wireless",
              },
              {
                value: "35",
                label:
                  "components the registration system is built from, counted in engineering audit",
              },
              {
                value: "12+",
                label:
                  "edge cases the prototype resolved before the build reached them",
              },
            ]}
          />

          <div className="mt-2xl mb-md">
            <Beat>What scales next: Phase 2</Beat>
          </div>
          <Prose>
            <p>
              Phase 1 is the skateboard: a complete end-to-end path for
              registering one device. Phase 2 turns that same movement into
              something that can carry more weight: bulk import and bulk
              management for labs and departments bringing hundreds of devices
              online at once. The pattern does not restart; it evolves from one
              device to many, with the same role logic, validation model,
              accessibility baseline, and coded reference underneath.
            </p>
            {/* Counts derived from the Figma board "DRP P2 — Bulk Flows":
                20 distinct products in 6 dimensions. 18 of them come from Mobbin
                flows (43 captured frames); Flatfile and Google Workspace are
                documentation deep-dives rather than Mobbin captures, which is why
                the sentence attributes the 43 FLOWS to Mobbin and the 20 PRODUCTS
                to the analysis as a whole. Keep that split if the numbers change. */}
            <p>
              To ground those workflows in how enterprise software already
              solves bulk operations, I ran a comparative analysis across{" "}
              <strong>20 products</strong>, 43 of the flows captured through the
              Mobbin MCP, sorted into six dimensions. Forked entry, flow
              sequencing, error communication, column mapping, in-table bulk
              edit, and destructive actions.
            </p>
            <p>
              The sharpest finding was a constraint, not a feature.{" "}
              <strong>Import never deletes.</strong> Across HubSpot, Salesforce,
              Airtable, and Mailchimp, a file can add or update records, but
              removal is always an in-table action behind a guard: a typed
              confirmation, an explicit count, a stated restore window. That
              splits the Phase 2 surface in two. The CSV path stays additive,
              and quarantine or removal stays in the device table, where the
              number of affected devices and the consequence can be named before
              anything happens.
            </p>
            <p>
              The direction I’m carrying forward is Google Workspace’s
              round-trip: download the current devices as a CSV, edit what
              changed, then re-upload for validation. The file starts from real
              records rather than a blank template, which removes most of the
              column-mapping problem the rest of the field spends its interface
              budget solving. I’m translating that into wireframes and a Claude
              Code skill.
            </p>
            {/* Concept testing is PLANNED, not done — keep this in the future
                tense until there are findings, then replace it with what the
                sessions actually surfaced. */}
            <p>
              Then the flows go in front of the people who will run them. Phase
              1 was designed against benchmarks and reasoned edge cases, without
              user testing in the plan I inherited. For Phase 2 I’m running
              concept testing on the bulk paths with the lab managers and
              department staff who bring devices on at volume, because the
              failure modes that matter here, a mis-mapped column or a removal
              nobody expected, are the kind you only catch by putting the idea
              in front of someone before it is built. More launch evidence and
              design learnings will be added as Phase 1 usage comes in and Phase
              2 progresses.
            </p>
          </Prose>
        </Stage>

        {/* 06 · Reflection — mirrors the Indeed study's close: a Pullquote lead
          then three flowing paragraphs (what worked → what I'd do differently →
          what's next), no deck, no subheadings. DRAFT VOICE: a first pass drawn
          from the narrative for MK to make her own. */}
        <Stage
          id="reflection"
          num="06"
          name="Reflection"
          eyebrow="What holds after I left"
        >
          <Pullquote>
            The best proof of platform work isn’t a screen I shipped — it’s the
            pattern still holding after I left the room.
          </Pullquote>

          <div className="mt-2xl mb-md">
            <Beat>What worked</Beat>
          </div>
          <ReflectionList
            items={[
              {
                label: "Design became a delivery condition",
                body: "I reframed a late design request into reusable product structure with roles, patterns, accessibility rules, and coded references.",
              },
              {
                label: "AI accelerated the system work",
                body: "Claude.ai and Claude Code helped me keep pace with the build because I defined the context, constraints, and standards first.",
              },
              {
                label: "Edge cases moved upstream",
                body: "Resolving device states, validation, approvals, and admin paths before implementation gave engineering a clearer reference than static specs could.",
              },
            ]}
          />

          <div className="mt-2xl mb-md">
            <Beat>What I’d formalize earlier</Beat>
          </div>
          <ReflectionList
            items={[
              {
                label: "A design-system home",
                body: "Phase 1 launched with the structure in place, but the components still need a formal home in UCLA’s design system.",
              },
              {
                label: "Success measures",
                body: "I would have defined learning loops earlier, including completion, errors, support patterns, and admin workload, so impact tracking could start with the release.",
              },
            ]}
          />

          <div className="mt-2xl mb-md">
            <Beat>What scales from here</Beat>
          </div>
          <ReflectionList
            items={[
              {
                label: "From one device to many",
                body: "Phase 2 extends the same role logic into bulk import and bulk management for labs and departments.",
              },
              {
                label: "From one application to a system precedent",
                body: "The larger opportunity is to turn this pilot into a stronger reference for future UCLA application flows, so the next team starts with a proven structure instead of another blank slate.",
              },
            ]}
          />
        </Stage>
        {/* "The rest of the experience" — a peek carousel of the remaining
            product screens, after the reflection.

            Slides are captured from the live Phase 1 build at
            phase2.d3j837z0lknp4p.amplifyapp.com, each at 1366×854 — exactly the
            16/10 the carousel card uses, so object-cover fills the card without
            cropping. No labels: the alt text carries the description, and a
            caption under a peek carousel competes with the next card. */}
        <ExperienceCarousel
          title="The rest of the experience."
          slides={[
            {
              src: "/work/device-registration/carousel/01-basic-user-home.png",
              width: 2732,
              height: 1708,
              alt: "Basic User home: a greeting, a Register a device button, and a list of seven owned devices.",
            },
            {
              src: "/work/device-registration/carousel/02-group-admin-home.png",
              width: 2732,
              height: 1708,
              alt: "Group Admin home: three task cards and a pending-approvals queue for the department.",
            },
            {
              src: "/work/device-registration/carousel/03-super-admin-home.png",
              width: 2732,
              height: 1708,
              alt: "Super Admin home: four task cards including configuration, and a portal-wide approvals list.",
            },
            {
              src: "/work/device-registration/carousel/04-register-device.png",
              width: 2732,
              height: 1708,
              alt: "The registration form: who it is for, then MAC address, device name, connection type, role.",
            },
            {
              src: "/work/device-registration/carousel/05-manage-devices.png",
              width: 2732,
              height: 1708,
              alt: "Manage devices: a searchable table of devices with owner, MAC address, expiry, and status.",
            },
            {
              src: "/work/device-registration/carousel/06-manage-devices-edit-drawer.png",
              width: 2732,
              height: 1708,
              alt: "The device table with the Edit drawer open, showing editable and read-only fields.",
            },
            {
              src: "/work/device-registration/carousel/07-audit-log.png",
              width: 2732,
              height: 1708,
              alt: "Audit logs: a searchable table of timestamped Register, Approve, Reject, and Update events.",
            },
          ]}
        />
      </CaseStudyBody>
    </CaseStudyRoot>
  );
}
