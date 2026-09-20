import {
  Beat,
  BulletList,
  CaseStudyBody,
  CaseStudyHeader,
  CaseStudyHero,
  CaseStudyMeta,
  CaseStudyRoot,
  Figure,
  Prose,
  Quote,
  Stage,
} from "@/components/ui/CaseStudy";
import StudyNav from "@/components/ui/StudyNav";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import ExperienceCarousel from "@/components/ui/ExperienceCarousel";
import FigureTabs from "@/components/ui/FigureTabs";

/**
 * Device Registration — OPTION C.
 *
 * A leadership-led long-form arc (Overview → Problem → My role → Delivery
 * infrastructure → Alignment → Outcomes → Reflection) that emphasises org-level
 * impact over granular execution. Two deliberate departures from the other DRP
 * variants, per the brief:
 *  - The HERO IMAGE is moved into the content container, directly under the
 *    metadata block (not full-width in the header).
 *  - Paragraphs run tighter than the 3–6 sentence editorial norm this arc is
 *    modelled on.
 *
 * Copy is the author's supplied Option-C draft, verbatim. Lives at
 * /work/device-registration-c for comparison with the other options.
 */
const STAGES = [
  { id: "problem", num: "01", name: "The problem" },
  { id: "role", num: "02", name: "My role" },
  /* Restructuring comes BEFORE delivery infrastructure. The argument only works
     in this order: the role model has to be won before the reference built from
     it means anything, and it puts the concrete artifact (the inheritance
     matrix) roughly 2,000px earlier for a reader who does not finish. */
  {
    id: "alignment",
    num: "03",
    name: "Restructuring the product around roles, five weeks into a slipping build",
    short: "Restructuring",
  },
  {
    id: "delivery",
    num: "04",
    name: "Design as delivery infrastructure",
    short: "Delivery",
  },
  { id: "outcomes", num: "05", name: "Outcomes" },
  { id: "reflection", num: "06", name: "Reflection" },
];

export default function DeviceRegistrationOptionCCaseStudy() {
  return (
    /* All three studies carry the SAME four classes: the shared 1224px measure,
       squared content media, no ink rule above each section, and no stage
       numbers. If you change one study here, change all three, or the set stops
       reading as one system. See globals.css for what each class does. */
    <div className="no-media-radius no-section-rule no-stage-numbers study-canvas">
    <CaseStudyRoot>
      {/* No hero in the header — it's moved down under the metadata, below. */}
      <CaseStudyHeader
        badge={{ mark: "UCLA", label: "Platform Design" }}
        /* "2–3" is held together so it cannot split after the en dash, which
           was leaving a bare "2–" at the end of a line. The whole range now
           moves to the next line as one token. */
        title={
          <>
            Transforming wait times from{" "}
            <span className="whitespace-nowrap">2&ndash;3</span> business days
            to less than 24 hours: registering campus devices
          </>
        }
      />

      <CaseStudyBody
        stages={STAGES}
        lead={
          <>
            <CaseStudyMeta
              className="border-t border-b border-line pt-lg pb-lg"
              meta={[
                { label: "My role", value: "Product design lead" },
                {
                  /* The figures repeat here ON PURPOSE. This block is the glance
                     surface: a recruiter deciding in under two minutes reads the
                     badge, the h1, and these columns, and may never scroll to
                     Outcomes. Removing them to avoid restating the Outcomes
                     list costs the scan more than the repetition costs the
                     read. The sourcing lives in the qualifying line under that
                     list, which is where a reader who wants provenance goes
                     looking. */
                  label: "Results",
                  value: (
                    <>
                      80% self-service
                      <br />
                      40% fewer tickets
                      <br />
                      Approvals &lt;24 hrs
                    </>
                  ),
                },
                {
                  label: "Scope",
                  value: "Design-system pilot for applications",
                },
                {
                  label: "Tools & methods",
                  value: (
                    <>
                      Claude.ai
                      <br />
                      Claude Code
                      <br />
                      Storybook
                      <br />
                      Coded prototypes
                      <br />
                      Accessibility review
                    </>
                  ),
                },
              ]}
            />

            {/* The hero, moved into the container and set directly under the
                metadata block, rather than full-width in the header. */}
            <CaseStudyHero
              src="/work/device-registration/drp-super-admin-home.png"
              alt="Super Admin screen with options: device registration, management, configurations, approvals."
              width={2200}
              height={1346}
              priority
            />

            {/* Overview: an unnumbered opening. No heading, eyebrow,
                or rule — the numbered spine starts at "The problem". */}
            <div className="mt-3xl flex flex-col gap-xl">
              <Prose>
                <p>
                  UCLA needed a self-service method for students, department
                  managers, department members, and IT administrators to get
                  non-login
                  devices onto the campus network. Think game consoles,
                  microscopes, printers, and shared lab equipment. The
                  existing path depended on support tickets, which slowed people
                  down and left the network vulnerable.
                </p>
                <p>
                  I joined after engineering had already started building. My
                  contribution was not just to improve the screens, but to reset
                  the shape of the product: clarify the roles, define the
                  reusable path, set the compliance bar, and give engineering
                  a coded reference they could build from.
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
                width={1600}
                height={918}
                callouts={[
                  { side: "before", x: 42, y: 20, text: "Opens with the architecture" },
                  { side: "before", x: 30, y: 62, text: "Cards named for the system" },
                  { side: "after", dir: "up", x: 72, y: 46, text: "Cards named for the task" },
                  { side: "after", x: 57, y: 76, text: "Plain language, not network jargon" },
                ]}
                caption="What design walked into: a system-centered developer interface. The redesign reframed the home around the four tasks users came to complete."
              />
            </div>
          </>
        }
      >
        {/* 01 · The problem */}
        <Stage
          id="problem"
          num="01"
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
              Multiply that across a campus and the device-network queue ran 200
              to 500 tickets a month, alongside the staff and researcher hours
              lost to the wait and a network full of devices nobody could trace
              to an owner.
            </p>
            <p>
              The count understates it. A single ticket could be load-bearing
              for thousands of devices, so the length of the queue was never the
              size of what was waiting on it.
            </p>
            <p>
              The first build reflected the system’s needs more than the user’s
              task. It asked for the MAC address, the database key, without
              enough context, guidance, or ownership information. For a student
              or lab manager, the hardest part of registration was also the
              least explained.
            </p>
            <p>
              The design challenge was bigger than one form: make device
              registration simple enough for a first-time student, structured
              enough for department workflows, and controlled enough for admins
              managing risk at campus scale.
            </p>
          </Prose>

          <Figure
            src="/work/device-registration/lab-researcher.jpg"
            alt="A researcher at a microscope, its readings on a nearby monitor, on a device that cannot log in."
            width={1600}
            height={893}
            zoomable={false}
          />
        </Stage>

        {/* 02 · My role */}
        <Stage
          id="role"
          num="02"
          name="My role"
          eyebrow="Owning the system, not the screens"
        >
          <Prose>
            <p>
              As the lead designer, I defined the end-to-end UX vision for
              access, validation, and reuse. This vision connected{" "}
              <strong>3 PMs and 10 teams</strong>, both within my organization
              and across campus. The work needed to flow smoothly for students,
              department tasks, IT review, and network management, not only for
              one screen.
            </p>
            {/* The claim here used to be the "role-based model and
                human-in-the-loop approval framework". The HITL half was removed
                at MK's direction. The role-based model is the artifact the rest
                of the study actually traces — §03 calls it "the shared map",
                §04 builds patterns from it — whereas the approval framework was
                named once and never picked back up. Do not reinstate it. The
                approval *outcomes* in §05 are untouched: those describe how the
                product behaves, not a framework I claim to have authored. */}
            <p>
              I created the <strong>role-based model</strong> for device
              registrations, and it shaped how the configuration experience came
              together. I also aligned UCLA’s network, security, and IT teams on
              compliance standards. Since I joined after the first build was
              underway, I used the model to prevent decisions from being made
              screen by screen. I continue to work with consultants to validate
              concepts with campus networking teams before engineering commits
              to the next build.
            </p>
          </Prose>
        </Stage>

        {/* 03 · Restructuring the product around roles */}
        <Stage
          id="alignment"
          num="03"
          name="Restructuring the product around roles, five weeks into a slipping build"
          eyebrow="One map across four teams"
        >
          <Prose>
            <p>
              Four teams sat at the table: Network, Business IT Products,
              Information Security, and Digital Foundry. Each had different
              needs, permissions, and operational habits. Without a shared
              structure, the product would fragment into exceptions negotiated
              team by team.
            </p>
            <p>
              The role-based model became the shared map: one product language
              for users, approvers, department supervisors, and admins
              configuring the portal. Teams made decisions from the same
              structure for ownership, permissions, and handoffs instead of
              re-litigating each edge case.
            </p>
          </Prose>

          {/* HIERARCHY, fixed. This used to run <Phase> "What it took to change
              course" over three <Beat>s. Phase is a small mono marker and Beat
              is a Hanken h3, so the group heading was visually QUIETER than the
              three things it introduced: a label parenting three headings.

              Now there is exactly one sub-heading in this stage. "What it took
              to change course" is the Beat, and the three arguments lead their
              own paragraphs in bold, the same shape the other two studies use
              for a claim plus its explanation. Descending weight the whole way
              down: stage h2 → Beat → bold claim → prose. */}
          <Beat>What it took to change course</Beat>

          <div className="mt-md">
            <Prose>
              <p>
                I proposed this model five weeks into a pilot that had already
                slipped, with 62% of the backlog untouched, one developer in
                flight, and a hard July deadline. The objection was reasonable:
                reorganizing the product around roles this late looked like more
                work, and more work looked like a later launch.
              </p>
              <p>Three things that moved my model forward:</p>
              <p>
                <strong className="mb-sm block">Diagnosis, not critique</strong>
                The shift came in a flow review with the business systems analyst and the engineer.
                On the table were screens already built in code, to the
                team&rsquo;s own product conventions, with no design standards
                applied. I brought three flows of my own and a structured read of
                the logic behind theirs. I named gaps, inconsistencies, and
                assumptions nobody had written down. The BSA confirmed the read.
                Once the subject-matter expert agreed the role model described
                the system more accurately than their screens did, it stopped
                being a question of preference.
              </p>
              <p>
                <strong className="mb-sm block">
                  The model removed work instead of adding it
                </strong>
                The alternative to a shared structure was never no change. It was
                negotiating permissions and edge cases screen by screen, team by
                team, for the rest of the build. Reframed that way, roles were
                the cheaper path, and twelve edge cases got resolved upstream
                before engineering reached them.
              </p>
              <p>
                <strong className="mb-sm block">Proof, not a proposal</strong>
                Using AI strategically, I built the role model in a coded design prototype rather than in
                Figma, so engineering could inspect it and run it. This kept
                design ahead of the build instead of trailing it, which is what
                settled the timeline concern: the reference arrived before the
                decisions did. Nobody had to choose between shipping on time and
                shipping with design.
              </p>
            </Prose>
          </div>

          {/* mt-2xl (48px), double the gap-lg that separates paragraphs inside
              a Prose block. This paragraph closes the section and steps back
              from the three arguments, so it needs to read as its own beat; as
              a bare sibling it carried NO top margin at all and ran on from the
              block above with less air than the arguments have between
              themselves. */}
          <div className="mt-2xl">
            <Prose>
              <p>
                That alignment is then tested, not assumed. I validate concepts
                with the campus networking teams before engineering commits to a
                build, so the shared model holds up against how each team
                actually works before it becomes code.
              </p>
            </Prose>
          </div>

          <Figure
            src="/work/device-registration/layer-02-flows.png"
            alt="Role-inheritance matrix: four tiers as rows; each inherits the shared Register and Manage path (light blue) and adds its own scope (dark blue), from Basic User up to Super Admin."
            width={1440}
            height={720}
            caption="The shared role model. Each tier inherits everything the tier below can do (light blue) and adds only its own scope (dark blue). One map for ownership, permissions, and handoffs."
          />
        </Stage>

        {/* 04 · Design as delivery infrastructure */}
        <Stage
          id="delivery"
          num="04"
          name="Design as delivery infrastructure"
          eyebrow="A shared reference, not screen polish"
        >
          <Prose>
            <p>
              This was a pilot for extending UCLA’s design system beyond
              editorial pages into application workflows. The opportunity was to
              make design useful earlier in delivery: not as screen polish, but
              as the structure teams could use to make consistent product
              decisions.
            </p>
            <p>
              I translated the flow into buildable patterns for forms, approvals,
              admin tables, audit states, and accessibility rules. That gave
              engineering a shared reference before one-off decisions could
              harden into the product.
            </p>
          </Prose>

          <FigureTabs
            label="From components to the context they shipped in"
            tabs={[
              {
                label: "Components",
                src: "/work/device-registration/layer-03-visuals.png",
                alt: "A device management admin table above three specimen cards: status states with their contrast ratios, a focus state, and a contrast check.",
                width: 1440,
                height: 900,
                caption:
                  "Components: the status states, focus treatment, and contrast each screen is assembled from. Border, icon, text and colour carry every state together, so nothing is signalled by colour alone.",
              },
              {
                label: "Context",
                src: "/work/device-registration/layer-04-code.png",
                alt: "The Storybook reference library beside the Claude Code skill file that generated the Phase 2 wireframes.",
                width: 1440,
                height: 1080,
                caption:
                  "Context: the Storybook library engineering built from, 105 stories with zero accessibility violations, plus the skill that produced the Phase 2 wireframes from the product's real screens and roles.",
              },
            ]}
          />

          {/* <Quote>, not <Pullquote>, matching the sourcing study. Pullquote is
              for the AUTHOR's own line lifted out of her argument, so it has no
              attribution slot and the source had to be hand-set as bold text
              after a <br>. That renders a testimonial as a design flourish
              rather than sourced evidence, and it loses the semantics: Quote
              ships a real <blockquote> with a <figcaption>, so the attribution
              is attached to the quotation rather than merely sitting near it. */}
          <Quote cite="Technical Lead, Workplace IT Products">
            &ldquo;The design prototype reference that Marissa provided let us
            build from a shared pattern instead of making screen-by-screen
            decisions during implementation.&rdquo;
          </Quote>
        </Stage>


        {/* 05 · Outcomes */}
        <Stage
          id="outcomes"
          num="05"
          name="Outcomes"
          eyebrow="From ticket queue to role-based system"
        >
          {/* A list, not the stat band, at MK's direction. The band split each
              figure from its own sentence ("80%" oversized, the rest of the
              clause small beside it); as a list each line stays one readable
              statement. The number leads, so it still carries the scan. */}
          <BulletList
            items={[
              <>
                <strong>80%</strong> self-service completion for users who start
                registration
              </>,
              <>
                <strong>40%</strong> fewer device-network tickets for
                participating teams
              </>,
              <>
                <strong>&lt;24hrs</strong> median approval turnaround, down from
                2&ndash;3 business days
              </>,
            ]}
          />

          {/* A qualifying line used to sit here, carried over from the stat
              band's `note`: pilot size, and why the 200-to-500 ticket queue is
              not a like-for-like baseline for the 40%. Removed at MK's
              direction. The three figures above now stand unqualified, which
              matches the sourcing study. */}
          <Prose>
            {/* The numbers are stated once, in the list above, where the line
                beneath can qualify them. This paragraph says why they moved
                instead of restating them: an earlier version repeated all three
                and then quietly dropped the 40%, which reads as a retreat. */}
            <p>
              By designing a self-service, role-based registration system to
              replace the support-ticket queue and manual IT networking work, I
              took standard approvals off the queue entirely. The teams in the
              pilot registered their own devices instead of waiting on IT to do
              it for them, which is where those reductions come from.
            </p>
            <p>
              By designing one inherited pattern instead of one-off screens, I
              gave UCLA a reusable application system: 14 device paths, 35
              reusable components, and 12 edge cases resolved before
              implementation. It is a precedent for design-system work beyond
              editorial pages.
            </p>
          </Prose>

          <ExperienceCarousel
            title="The rest of the experience."
            slides={[
              {
                src: "/work/device-registration/carousel/01-basic-user-home.png",
                width: 1700,
                height: 1063,
                alt: "Basic User home: a greeting, a Register a device button, and a list of seven owned devices.",
              },
              {
                src: "/work/device-registration/carousel/02-group-admin-home.png",
                width: 1700,
                height: 1063,
                alt: "Group Admin home: three task cards and a pending-approvals queue for the department.",
              },
              {
                src: "/work/device-registration/carousel/03-super-admin-home.png",
                width: 1700,
                height: 1063,
                alt: "Super Admin home: four task cards including configuration, and a portal-wide approvals list.",
              },
              {
                src: "/work/device-registration/carousel/04-register-device.png",
                width: 1700,
                height: 1063,
                alt: "The registration form: who it is for, then MAC address, device name, connection type, role.",
              },
              {
                src: "/work/device-registration/carousel/05-manage-devices.png",
                width: 1700,
                height: 1063,
                alt: "Manage devices: a searchable table of devices with owner, MAC address, expiry, and status.",
              },
              {
                src: "/work/device-registration/carousel/06-manage-devices-edit-drawer.png",
                width: 1700,
                height: 1063,
                alt: "The device table with the Edit drawer open, showing editable and read-only fields.",
              },
              {
                src: "/work/device-registration/carousel/07-audit-log.png",
                width: 1700,
                height: 1063,
                alt: "Audit logs: a searchable table of timestamped Register, Approve, Reject, and Update events.",
              },
            ]}
          />
        </Stage>

        {/* 06 · Reflection */}
        <Stage
          id="reflection"
          num="06"
          name="Reflection"
          eyebrow="What Phase 1 taught me"
        >
          <Prose>
            <p>
              This worked because design became a delivery condition, not a
              polish layer. I turned a late design request into reusable product
              structure: roles, patterns, accessibility rules, and coded
              references, and resolved device states, validation, and approvals
              upstream so engineering had a clearer reference than static specs
              could give. Claude.ai and Claude Code held that pace, but only
              because I defined the context, constraints, and standards first.
            </p>
            <p>
              Next time I would formalize two things earlier: a real home for the
              components in UCLA’s design system, and the learning loops
              (completion, errors, support patterns, admin workload) so impact
              tracking could start at release. From here the same role logic
              scales into Phase 2 bulk import and management, and the bigger
              opportunity is a stronger reference for future UCLA application
              flows, so the next team starts from proven structure, not a blank
              slate.
            </p>
          </Prose>
        </Stage>
        <StudyNav currentSlug="device-registration" />
      </CaseStudyBody>
    </CaseStudyRoot>
    </div>
  );
}
