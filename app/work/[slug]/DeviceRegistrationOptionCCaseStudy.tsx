import {
  CaseStudyBody,
  CaseStudyHeader,
  CaseStudyHero,
  CaseStudyMeta,
  CaseStudyRoot,
  Figure,
  Prose,
  Pullquote,
  Stage,
  StatBand,
} from "@/components/ui/CaseStudy";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import ExperienceCarousel from "@/components/ui/ExperienceCarousel";
import FigureTabs from "@/components/ui/FigureTabs";
import ArrowForward from "@/components/ui/ArrowForward";

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
  {
    id: "delivery",
    num: "03",
    name: "Design as delivery infrastructure",
    short: "Delivery",
  },
  {
    id: "alignment",
    num: "04",
    name: "Building alignment through structure",
    short: "Alignment",
  },
  { id: "outcomes", num: "05", name: "Outcomes" },
  { id: "reflection", num: "06", name: "Reflection" },
];

export default function DeviceRegistrationOptionCCaseStudy() {
  return (
    // Container narrowed ~15% for this option: the .canvas is 1440px, capped
    // here to 1224px so the whole column (rail + content) reads tighter, closer
    // to an editorial measure.
    <div className="no-media-radius mx-auto max-w-[1224px]">
    <CaseStudyRoot>
      {/* No hero in the header — it's moved down under the metadata, below. */}
      <CaseStudyHeader
        badge={{ mark: "UCLA", label: "Platform Design" }}
        title="From 2–3 business days to under 24 hours: one path for every campus device that can’t log in by itself"
      />

      <CaseStudyBody
        stages={STAGES}
        lead={
          <>
            <CaseStudyMeta
              className="mt-2xl border-t border-b border-line pt-lg pb-lg"
              meta={[
                { label: "My role", value: "Product design lead" },
                {
                  /* The figures repeat here ON PURPOSE. This block is the glance
                     surface: a recruiter deciding in under two minutes reads the
                     badge, the h1, and these columns, and may never scroll to
                     Outcomes. Removing them to avoid restating the stat band
                     costs the scan more than the repetition costs the read. The
                     sourcing lives on the stat band's note, which is where a
                     reader who wants provenance goes looking. */
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
              width={3987}
              height={2439}
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
            width={3200}
            height={1786}
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
            <p>
              I created the{" "}
              <strong>
                role-based model and human-in-the-loop approval framework
              </strong>{" "}
              for device registrations, and it shaped how the configuration
              experience came together. I also aligned UCLA’s network, security,
              and IT teams on compliance standards. Since I joined after the
              first build was underway, I used the framework to prevent decisions
              from being made screen by screen. I continue to work with
              consultants to validate concepts with campus networking teams
              before engineering commits to the next build.
            </p>
          </Prose>
        </Stage>

        {/* 03 · Design as delivery infrastructure */}
        <Stage
          id="delivery"
          num="03"
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

          <Pullquote>
            “The design prototype reference that Marissa provided let us build
            from a shared pattern instead of making screen-by-screen decisions
            during implementation.”
            <br />
            <strong>Technical Lead, Workplace IT Products</strong>
          </Pullquote>
        </Stage>

        {/* 04 · Building alignment through structure */}
        <Stage
          id="alignment"
          num="04"
          name="Building alignment through structure"
          eyebrow="One map across four teams"
        >
          <Prose>
            <p>
              The project crossed central and distributed IT teams, each with
              different needs, permissions, and operational habits. Without a
              shared structure, the product risked fragmenting into exceptions
              negotiated team by team.
            </p>
            <p>
              So the role-based model became the shared map: one product language
              for users, approvers, admins, and engineering. Teams made decisions
              from the same structure for ownership, permissions, and handoffs
              instead of re-litigating each edge case.
            </p>
            <p>
              That alignment is tested, not assumed. I validate concepts with the
              campus networking teams before engineering commits to a build, so
              the shared model holds up against how each team actually works
              before it becomes code.
            </p>
          </Prose>

          <Figure
            src="/work/device-registration/layer-02-flows.png"
            alt="Role-inheritance matrix: four tiers as rows; each inherits the shared Register and Manage path (light blue) and adds its own scope (dark blue), from Basic User up to Super Admin."
            width={1440}
            height={720}
            caption="The shared role model. Each tier inherits everything the tier below can do (light blue) and adds only its own scope (dark blue). One map for ownership, permissions, and handoffs."
          />
        </Stage>

        {/* 06 · Outcomes */}
        <Stage
          id="outcomes"
          num="05"
          name="Outcomes"
          eyebrow="From ticket queue to role-based system"
        >
          <StatBand
            bordered={false}
            stats={[
              {
                value: "80%",
                label:
                  "self-service completion for users who start registration",
              },
              {
                value: "40%",
                label:
                  "fewer device-network tickets for participating teams",
              },
              {
                value: "<24 hrs",
                label:
                  "median approval turnaround, down from 2–3 business days",
              },
            ]}
            note="Directional figures from the pilot, roughly 50 staff users across the participating teams. The 200 to 500 tickets a month described earlier was the wider device-network queue before this work, not the pilot's own baseline, so the two are not a like-for-like ratio."
          />

          <Prose>
            {/* The numbers are stated once, in the band above, where the note
                can qualify them. This paragraph says why they moved instead of
                restating them: the previous version repeated all three and then
                quietly dropped the 40%, which reads as a retreat. */}
            <p>
              By designing a self-service, role-based registration system to
              replace the support-ticket queue and manual IT networking work, I
              took standard approvals off the queue entirely. The teams in the
              pilot registered their own devices instead of waiting on IT to do
              it for them, which is where the reductions above come from.
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
        </Stage>

        {/* 07 · Reflection */}
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
      </CaseStudyBody>
    </CaseStudyRoot>

      {/* Option C's own footer: three oversized links, centered,
          with a small copyright below. Rendered here (the shared site footer is
          hidden on this page via globals.css) and kept in the Swiss system:
          Hanken display, rich-black on white, no serif and no accent colour. */}
      {/* id="contact" is what the header's CONTACT button targets. The shared
          site footer used to own that id and was hidden here with CSS, so the
          anchor resolved to an invisible element and the button did nothing. The
          shared footer now stands down on this route (lib/work/self-footer.ts),
          leaving the id free for the footer that is actually on screen.
          scroll-mt clears the sticky header so the jump lands correctly. */}
      <footer
        id="contact"
        className="mt-3xl scroll-mt-[calc(var(--hh)+24px)] border-t border-ink px-[var(--pad)] pt-lg pb-3xl"
      >
        <div className="flex justify-center">
          <a
            href="#main"
            className="inline-flex items-center gap-1.5 py-md -my-md font-mono text-label uppercase tracking-label text-muted hover:text-ink transition-colors"
          >
            Back to top <ArrowForward className="-rotate-90" />
          </a>
        </div>
        <nav
          aria-label="Elsewhere"
          className="mt-xl flex flex-wrap items-baseline justify-center gap-x-[7vw] gap-y-md text-center"
        >
          {/* Medium was here on href="#", which is a dead click that also implies
              published writing the site cannot show. PRODUCT.md is explicit that
              placeholders stay visibly unfinished rather than quietly becoming
              claims, so it is removed rather than pointed somewhere plausible.
              Put it back when there is a real URL.
              py-sm/-my-sm grows the tap target (these render at ~32px tall on a
              phone, where the clamp bottoms out) without changing the layout. */}
          {[
            { label: "Email", href: "mailto:marissa.klymkiw@gmail.com", ext: false },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/marissak/",
              ext: true,
            },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.ext ? { target: "_blank", rel: "noreferrer" } : {})}
              className="font-display leading-none tracking-[-0.02em] text-[clamp(2rem,5.5vw,4.375rem)] py-sm -my-sm text-ink hover:text-rich transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="mt-2xl text-center text-small text-muted">
          © 2026 Marissa Klymkiw
        </p>
      </footer>
    </div>
  );
}
