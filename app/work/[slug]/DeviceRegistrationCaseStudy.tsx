import {
  Beat,
  BeforeAfter,
  CaseStudyBody,
  CaseStudyHeader,
  CaseStudyHero,
  CaseStudyLede,
  CaseStudyRoot,
  CaseStudyTools,
  Figure,
  FigureSlot,
  Kicker,
  NumberedList,
  PersonaList,
  Phase,
  Prose,
  Pullquote,
  Stage,
  StatBand,
  Todo,
} from "@/components/ui/CaseStudy";

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
  { id: "system", num: "03", name: "System Built" },
  { id: "adoption", num: "04", name: "Adoption" },
  { id: "impact", num: "05", name: "Impact" },
];

export default function DeviceRegistrationCaseStudy() {
  return (
    <CaseStudyRoot>
      <CaseStudyHeader
        badge={{ mark: "UCLA", label: "Platform Design" }}
        title="One front door for every device that can’t log in for itself"
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

      <CaseStudyTools
        label="Tools"
        chips={[
          "Claude Code",
          "Skills",
          "Node.js",
          "AI Design System",
          "Comet Browser (comparative analysis)",
        ]}
      />

      {/* the lede sits ABOVE the hero: the argument lands before the artifact,
          so the image is read as evidence for a claim already made rather than
          as decoration you have to scroll past to reach the point. */}
      <CaseStudyLede>
        Engineering was already building the device registration application,
        with no design input in the room. I reframed it:{" "}
        <strong>
          not one-off screens, but reusable patterns the whole system could
          inherit
        </strong>
        . The build now follows the code I designed.
      </CaseStudyLede>

      {/* width/height are the asset's true intrinsic pixels (3987×2439) — they
          set the aspect ratio next/image reserves, so a wrong pair here causes
          layout shift on load. Re-measure if the asset is ever swapped. */}
      <CaseStudyHero
        src="/work/device-registration/drp-super-admin-home.png"
        alt="The Device Registration super-admin home: Hello David, with cards for registering a device, managing devices, system configuration, and audit logs, plus a pending-approvals list."
        width={3987}
        height={2439}
        priority
        caption="The registration portal, built on design-system components and delivered as code."
      />

      {/* the stage spine, accompanied by the sticky rail. STAGES must stay in
          sync with the ids/nums on the <Stage> elements below — the rail's
          scrollspy looks them up by id. */}
      <CaseStudyBody stages={STAGES}>
      {/* 01 · Problem */}
      <Stage
        id="problem"
        num="01"
        name="Problem"
        title="Meet the device that can’t log in"
      >
        <Prose>
          <p>
            A university lab manager needs a microscope online for today’s run,
            but it can’t log in for itself, so the only path is a support ticket
            and a wait while the experiment sits idle.
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
          alt="A researcher in a lab coat at a microscope, its readings streaming to the monitor beside her, a device that works on the network but cannot log in for itself."
          width={3200}
          height={1786}
        />

        <Pullquote>
          A device that can’t log in still <strong>belongs to someone</strong>.
          Network Unification’s device registration application had to make that
          ownership effortless. For a student, a lab manager, and a network
          admin. Three very different people.
        </Pullquote>

        <Phase>We had a three-part challenge</Phase>
        <div className="mt-lg">
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
                label: "The build was moving without design",
                body: (
                  <p>
                    Engineering was already coding, and the flow formed around
                    what the system needed rather than what a user could finish.
                    Registration was a single field: MAC address. No explanation
                    of what that is or where to find it on a game console, no
                    device name, no owner, no purpose. It collected the database
                    key and nothing else. The one thing the form demanded was
                    the one thing a student doesn&rsquo;t have, and the network
                    still couldn&rsquo;t trace a device to a person.
                  </p>
                ),
              },
            ]}
          />
        </div>

        {/* the evidence for the three challenges, sitting directly under them.
            This is PROBLEM evidence — it shows what design walked into. It is
            deliberately not in Approach: a loud before/after there would argue
            "redesign" while the copy argues "platform", and the image would win.
            The two engineering screens stack so the panel reads as the state of
            the application, not as one screen being picked on.
            Names in the "before" are redacted: they belonged to a real UCLA
            colleague, and this is a public page. */}
        <BeforeAfter
          before={{
            label: "Before · built by engineering",
            shots: [
              {
                src: "/work/device-registration/drp-before-home.png",
                alt: "The portal home as engineering built it: a stock illustration banner overlaid with a paragraph describing role-based access, network segmentation and Aruba ClearPass integration, above three cards named Device Management, DRP Admin Management and System Admin.",
                width: 2160,
                height: 1240,
              },
              {
                src: "/work/device-registration/drp-before-registration.png",
                alt: "The registration screen as engineering built it: one labelled field, MAC Address, with the placeholder e.g. 00:1A:2B:3C:4D:5E, and a Register button. Nothing else.",
                width: 2160,
                height: 1243,
              },
            ],
          }}
          after={{
            label: "After · rebuilt on the pattern",
            shots: [
              {
                src: "/work/device-registration/drp-super-admin-home.png",
                alt: "The rebuilt super-admin home: Hello, David, with four task-named cards for registering a device, managing devices, system configuration and audit logs, plus a pending-approvals list.",
                width: 3987,
                height: 2439,
              },
            ],
          }}
          caption="What design walked into. The home opened with the architecture the thing was made of, Aruba ClearPass and network segmentation, and organised itself by the system's own admin structure. Registration was one field: the MAC address the system needed. The rebuild opens with the four things a person came to do."
        />

        <Phase>The state of the application when design arrived</Phase>
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
                "of the Jira backlog untouched as of April, one developer in flight",
            },
            {
              value: "0",
              label: "application-layer design components existed to build from",
            },
          ]}
          note="Four UCLA teams at the table, Network, Business IT, OCISO, and Digital Foundry, against a hard July deadline."
        />
      </Stage>

      {/* 02 · Approach */}
      <Stage
        id="approach"
        num="02"
        name="Approach"
        title="Patterns the system inherits, not screens I drew once"
      >
        <Prose>
          <p>
            The application wasn’t only a portal to ship. It was the sanctioned
            pilot for extending UCLA’s design system past editorial surfaces
            into application flows, the first test of whether the system could
            carry role-based forms, validation, and approval workflows at all.
            That raised the bar on every decision: whatever I built here had to
            be good enough to become the pattern the design system inherits, not
            just good enough to launch.
          </p>
          <p>
            The structural move was to stop treating each device type as its own
            problem. Instead of one-off screens, I designed{" "}
            <strong>
              reusable registration patterns the whole portal could inherit
            </strong>
            . Design one path well, and every case that follows gets it for
            free. That is the difference between decorating a build and giving
            it a spine.
          </p>
          <p>
            The reframe wasn’t a guess. I benchmarked eight systems across three
            ecosystems, using Comet Browser to move through it fast: higher-ed
            peers (Stanford, UMN, WCU/UARK), consumer smart home (Google Home,
            Apple HomeKit, Alexa), and enterprise NAC (Portnox, Aruba ClearPass
            Onboard). The scoping was the argument. Student expectations are set
            by Apple and Google, not by enterprise IT portals, and that gap is
            the design risk.
          </p>
          <p>
            The finding held across all eight:{" "}
            <strong>
              they hide MAC complexity behind friendly concepts
            </strong>
            , device type, room, and name, even the higher-ed portals. Apple’s
            Add Accessory flow exposes no MAC at all. The build had shipped the
            MAC address as the entire interface. It wasn’t a rough version of
            the right thing. It was the wrong organizing principle.
          </p>
        </Prose>

        {/* the artifact, not a redrawing of it: this is the real deck slide,
            UCLA blue and yellow included. Restyling it monochrome to match the
            page would misrepresent the thing it is evidence of. */}
        <Figure
          src="/work/device-registration/drp-comparator-landscape.png"
          alt="The Comparator Landscape slide from the competitive analysis: three columns, Higher Ed (Stanford SDR / Register Anywhere, UMN IoT / ClearPass Guest, WCU / UARK ClearPass Portals), Consumer Smart Home (Google Home / Nest, Apple Home / HomeKit, Amazon Alexa), and Enterprise NAC (Portnox, Aruba ClearPass Onboard), each with a one-line summary of its onboarding pattern."
          width={2400}
          height={1350}
          caption="The comparator landscape. Benchmarking across three ecosystems rather than just peer universities, because the bar a student brings to the page was set by Apple and Google."
        />

        <Beat>How I earned the seat</Beat>
        <div className="mt-md">
          <Prose>
            <p>
              The moment it turned was a review of three user flows with the
              business systems analyst and the engineer. On the table were
              screens the engineer had already built in code, to their own
              product conventions, with no design standards applied. I brought
              three flows I’d developed and a structured read of their logic,
              surfacing gaps, inconsistencies, and assumptions nobody had named
              yet. Not critique. Diagnosis. The BSA said the work was good, and
              that’s the signal that matters:{" "}
              <strong>
                when the subject-matter expert validates your read, you’ve
                earned the seat at the table rather than been handed it
              </strong>
              .
            </p>
          </Prose>
        </div>

        <Beat>Then I held it</Beat>
        <div className="mt-md">
          <Prose>
            <p>
              This was a team used to operating at lower design maturity, where
              design arrived late and deferred to whoever built first. It was
              also a project the organization needed to succeed, with a hard
              deadline, four teams, outside consultants, and real pressure to
              just ship and keep the room aligned. That pressure is exactly when
              user experience gets quietly traded away. I established the
              practice instead of fitting into the gap left for it, and{" "}
              <strong>
                held my position on the calls that mattered, including with the
                consultants, when the fastest path would have compromised the
                experience
              </strong>
              . The design standard held because someone was willing to defend
              it out loud while the stakes were high.
            </p>
          </Prose>
        </div>

        <div className="mt-2xl">
          <Kicker>Who the pattern serves</Kicker>
          <Beat>
            Four roles. One pattern that had to hold across all of them.
          </Beat>
          <div className="mt-md">
            <Prose>
              <p>
                The roles don’t sit side by side, they stack. Each tier inherits
                everything below it and adds its own scope, from a student
                registering one device to the administrator who configures the
                whole portal. Designing one inherited path meant designing for
                the tier that sees the least and the tier that controls the
                most, in the same structure.
              </p>
            </Prose>
          </div>
        </div>

        <div className="mt-xl">
          <PersonaList
            personas={[
              {
                tier: "01 · Basic User",
                name: "Priya",
                portrait: "/work/device-registration/priya.svg",
                portraitAlt: "Priya",
                body: (
                  <p>
                    A student with a game console and smart TV needs it on the
                    campus network. But there’s no obvious first step to connect
                    it, and no way to fix it when she’s stuck. Priya is the base
                    tier every other user builds on: get her two jobs right,
                    connecting a device and managing it after, and every role
                    above inherits them.
                  </p>
                ),
              },
              {
                tier: "02 · Group User",
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
                    registration form with department-level fields, and a device
                    list that shows his whole group’s inventory.
                  </p>
                ),
              },
              {
                tier: "03 · Group Admin",
                name: "Elena",
                scope: "Department scope",
                portrait: "/work/device-registration/persona-elena.svg",
                portraitAlt: "Elena",
                body: (
                  <p>
                    A departmental IT contact, accountable for everything that
                    connects under her group, needs to approve, review, and
                    oversee each registration in her scope. But she has no
                    delegated surface that shows only her group’s queue without
                    exposing the whole institution. Elena inherits everything
                    Marcus can do and adds oversight of her department: a
                    pending-approvals queue for her group’s requests, and audit
                    logs scoped to what she governs.
                  </p>
                ),
              },
              {
                tier: "04 · System Admin",
                name: "David",
                scope: "Portal-wide",
                portrait: "/work/device-registration/persona-david.svg",
                portraitAlt: "David",
                body: (
                  <p>
                    A central IT administrator, responsible for institution-wide
                    security and compliance, needs full visibility and control
                    across every group, status, and device on the portal. But
                    managing exceptions, quarantines, and expirations at campus
                    scale breaks down the moment the tools force manual,
                    device-by-device handling. David sits at the top of the
                    stack, inheriting everything below and adding portal-wide
                    control: the Configuration section for roles, policies,
                    network structure, and system sync, plus both device and
                    system audit logs.
                  </p>
                ),
              },
            ]}
          />
        </div>

        <div className="mt-xl">
          <Prose>
            <p>
              That nesting is the whole argument for one inherited path over
              four one-off builds. Get the base tier right and every tier above
              it extends the same structure instead of forking a new one, which
              is what makes the pattern cheaper to maintain and impossible to
              fragment.
            </p>
          </Prose>
          <p className="mt-lg font-mono text-label text-muted max-w-measure">
            Four user permission roles, department-scoped through Group Admin,
            portal-wide at System Admin. Distinct from the network device-role
            mappings a System Admin configures.
          </p>
        </div>

        <FigureSlot
          label="[ Insert visual: the pattern / system logic ]"
          hint="The reframe made visible, a pattern diagram, or one path shown as reusable. This slot is for the PLATFORM claim — the before/after in Problem proves the redesign, not the pattern."
          caption="After: one registration pattern the system reuses, instead of screens per case."
        />
      </Stage>

      {/* 03 · System Built */}
      <Stage
        id="system"
        num="03"
        name="System Built"
        title="Shipped in two layers, both as code"
      >
        <Phase>Layer 1: visual foundation</Phase>
        <div className="mt-md">
          <Prose>
            <p>
              I built the visual foundation first, the registration experience
              rendered against the design system, not sketched in a spec.
            </p>
          </Prose>
        </div>

        <div className="mt-xl">
          <Phase>Layer 2: UX on DS components</Phase>
        </div>
        <div className="mt-md">
          <Prose>
            <p>
              Then the interaction layer, built on design-system components so
              it stayed consistent with everything else UCLA ships. Because it
              was{" "}
              <strong>
                delivered as working code, engineering built from the thing
                itself, not a translation of it
              </strong>
              .
            </p>
            <p>
              Building as code is normally where a lone designer falls behind an
              engineering-led timeline, and where design gets cut to keep the
              project moving. It didn’t here. Using Claude Code to build the
              prototype and an AI-assisted pipeline to turn design-system
              components into code, I kept pace with the build instead of
              trailing it, which is what let the design decisions land in the
              reference before engineering needed them. The speed mattered for
              one reason only: the team never had to choose between shipping on
              time and shipping with design.
            </p>
          </Prose>
        </div>

        <div className="mt-2xl">
          <Phase>Accessibility: the bar I set for the team</Phase>
        </div>
        <div className="mt-md">
          <Prose>
            <p>
              The project had no accessibility plan, so I wrote the standard:
              WCAG 2.2 AA, ISO 9241-171, ADA, and EAA as the baseline, with one
              rule the team could hold to. If a barrier blocks a task, the
              feature is broken, not imperfect. Then I held the build to it, and
              the changelog shows the receipts: Building help moved from a
              tooltip to a persistent inline link because links don’t belong in
              tooltips, plus 44×44px hit targets, visible 2px focus rings,
              aria-live announcements for async states, and forced-colors
              support throughout. I raised the Quarantined status contrast from{" "}
              <strong>8.81:1 to 11.6:1, into AAA</strong>, while keeping status
              legible without relying on color alone.
            </p>
          </Prose>
        </div>

        <FigureSlot
          label="[ Insert visual: the built system, hi-fi ]"
          hint="The registration flow rendered, DS components visible. This can double as the hero export."
          caption="The registration flow, built on design-system components and delivered as code."
        />
      </Stage>

      {/* 04 · Adoption */}
      <Stage
        id="adoption"
        num="04"
        name="Adoption"
        title="Built on with confidence, without authority pushing it"
      >
        <Prose>
          <p>
            The test of a system is whether other people build on it when nobody
            makes them. The patterns held because the hard parts, the edge
            cases, were{" "}
            <strong>already resolved before anyone else touched them</strong>.
            The strongest proof of that isn’t my claim. It’s the engineer who
            built from the specs saying so.
          </p>
        </Prose>

        <Todo>
          <b>
            QUOTE SLOT, high-leverage. The single thing that turns “I think in
            systems” from claim to proof.
          </b>
          <p>
            <b>Strong (build-confidence):</b> “Her specs were detailed enough
            that we built with confidence, the edge cases were already thought
            through, so we didn’t hit surprises.”
          </p>
          <p>
            <b>Too weak (character):</b> “Marissa is great to work with.” Warmth
            isn’t evidence. The quote must be about the{" "}
            <b>work being solid enough to build on</b>.
          </p>
          <p>
            <b>Ask:</b> Alex (StratComm engineer), Bean, or a pod lead who built
            from your specs.
          </p>
        </Todo>
      </Stage>

      {/* 05 · Impact */}
      <Stage
        id="impact"
        num="05"
        name="Impact"
        title="A simpler path that outlived Phase 1"
      >
        <Prose>
          <p>
            The registration flow got simpler for the people who use it, and the
            patterns stayed in the system after I moved on. The pilot proved
            out: the design system now reaches into application flows it
            couldn’t handle before, and the application became the pattern the
            next one inherits. Durability is the real impact of platform work:{" "}
            <strong>
              the structure keeps paying out when the designer is no longer in
              the room
            </strong>
            .
          </p>
        </Prose>

        {/* PROVENANCE — keep this honest, the numbers are the whole point:
            14  sourced. DR Field & Database Tables: 16 role × VLAN × approval
                combinations, of which 2 (cf_user VLAN F and G) are unconfigured
                placeholders. 14 is the defensible figure, not 16.
            40  MK's own count from the DRP build plus engineering audits.
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
              value: "40",
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

        <div className="mt-2xl">
          <Phase>What scales next: Phase 2</Phase>
        </div>
        <div className="mt-md">
          <Prose>
            <p>
              Phase 1 registered devices one at a time. Phase 2, in build now,
              extends the same pattern to{" "}
              <strong>bulk import and bulk management</strong>, the workflows a
              lab or department needs to bring hundreds of devices on at once.
              The point isn’t new screens. It’s that the registration pattern
              was architected to absorb this load, so scaling the portal means
              extending the spine, not rebuilding it. I designed Phase 1 against
              a Phase 2 I could already see coming.
            </p>
            <p>
              To ground those workflows in how enterprise software actually
              solves bulk operations at scale, I’m running a comparative
              analysis of SaaS bulk-management patterns using the Mobbin MCP,
              pulling real interface precedents fast rather than designing from
              taste.
            </p>
          </Prose>
        </div>

        <Todo>
          <b>CONFIRM:</b> how many patterns/products compared, and the sharpest
          finding shaping the Phase 2 design.
        </Todo>
      </Stage>
      </CaseStudyBody>
    </CaseStudyRoot>
  );
}
