import {
  Beat,
  BulletList,
  CaseStudyBody,
  CaseStudyHeader,
  CaseStudyHero,
  CaseStudyMeta,
  CaseStudyRoot,
  Figure,
  GoBack,
  Prose,
  Quote,
  Stage,
} from "@/components/ui/CaseStudy";
import StudyNav from "@/components/ui/StudyNav";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import ExperienceCarousel from "@/components/ui/ExperienceCarousel";
import Image from "next/image";
import { LightboxImage } from "@/components/ui/Lightbox";

type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /* optional caption set under the image: a short title and a line of text */
  title?: string;
  text?: string;
};

/* Images side by side (2 or 3 across on desktop, stacked on phones). `narrow`
   holds the grid to a smaller width than the study, centered. */
function ImageGrid({
  shots,
  cols,
  narrow = false,
  zoomable = true,
}: {
  shots: Shot[];
  cols: 2 | 3;
  narrow?: boolean;
  /* false shows plain images: they do not open the lightbox and are left out of
     the gallery sequence. */
  zoomable?: boolean;
}) {
  return (
    <div
      className={`my-xl grid grid-cols-1 items-start gap-x-lg gap-y-xl ${
        cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
      } ${narrow ? "mx-auto max-w-[880px]" : ""}`}
    >
      {shots.map(({ title, text, ...sh }) => (
        <figure key={sh.src} className="m-0">
          {zoomable ? (
            <LightboxImage
              {...sh}
              className="!border-0"
              sizes={
                cols === 2
                  ? "(max-width: 768px) 100vw, 440px"
                  : "(max-width: 768px) 100vw, 365px"
              }
            />
          ) : (
            <Image
              src={sh.src}
              alt={sh.alt}
              width={sh.width}
              height={sh.height}
              sizes={
                cols === 2
                  ? "(max-width: 768px) 100vw, 440px"
                  : "(max-width: 768px) 100vw, 365px"
              }
              className="block h-auto w-full"
            />
          )}
          {(title || text) && (
            <figcaption className="mt-md">
              {title && (
                <span className="block font-display text-h3 text-ink">
                  {title}
                </span>
              )}
              {text && (
                <span className="mt-sm block text-small text-muted">
                  {text}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

export default function DeviceRegistrationOptionCCaseStudy() {
  return (
    /* All three studies carry the SAME four classes: the shared 1224px measure,
       squared content media, no ink rule above each section, and no stage
       numbers. If you change one study here, change all three, or the set stops
       reading as one system. See globals.css for what each class does. */
    <div className="no-media-radius no-section-rule no-stage-numbers study-canvas study-centered">
      <CaseStudyRoot>
        <div className="pt-xl">
          <GoBack />
        </div>
        <CaseStudyHeader
          badge={{ mark: "UCLA", label: "Platform Design" }}
          /* "3" and "24 hours" are held together so the range cannot split
             across lines. */
          title={
            <>
              Reducing device activation time by 66%: from{" "}
              <span className="whitespace-nowrap">3 days</span> to under 24
              hours
            </>
          }
        />

        <CaseStudyBody
          rail={false}
          lead={
            <>
              {/* A narrow strip: hairlines above and below, one short line per
                  column, no wrapping. Sits between the headline and the hero. */}
              <CaseStudyMeta
                className="border-t border-b border-line py-md"
                meta={[
                  { label: "Role", value: "Product design lead" },
                  { label: "Timeline", value: "Jul 2026 to 2027" },
                  { label: "Team", value: "3 PMs, 2 engineers, 1 analyst" },
                  { label: "Skills", value: "Coded prototypes, accessibility" },
                ]}
              />

              <CaseStudyHero
                src="/work/device-registration/drp-research-lab.jpg"
                alt="A researcher at a lab workstation beside a microscope, with the Device Registration Super Admin home on the monitor."
                width={1376}
                height={768}
                priority
                zoomable={false}
              />
            </>
          }
        >
          <div className="mt-md">
            {/* Situation */}
            <Stage id="situation" num="01" name="Situation">
              <Prose>
                <p>
                  UCLA needed an easier way for people to connect devices to its
                  network without asking Customer Success or IT for help each
                  time. I joined after engineers had started building and
                  designed a system people could use on their own. I designed
                  it so each person sees only what their role lets them do.
                  Engineers can reuse the same design for every screen.
                </p>
                <p>
                  <strong>In the first test:</strong>
                </p>
              </Prose>
              <BulletList
                items={[
                  <>
                    <strong>80%</strong> of users who started signing up
                    finished on their own.
                  </>,
                  <>
                    Teams received <strong>40% fewer</strong> help requests.
                  </>,
                  <>
                    Average approval wait time dropped from{" "}
                    <strong>72 hours to less than 24 hours</strong>.
                  </>,
                ]}
              />
            </Stage>

            {/* Task */}
            <Stage id="task" num="02" name="Task">
              <Beat>The problem</Beat>
              <div className="mt-md">
                <Prose>
                  <p>
                    Connecting a device to UCLA’s network meant sending a help
                    request and waiting up to three days. A lab manager trying
                    to connect a microscope could miss a planned test. IT staff
                    had to handle these requests on top of their other work.
                  </p>
                  <p>
                    Teams handled 200–500 requests each month. One request could
                    cover several devices. With a tight budget, this manual work
                    cost UCLA unnecessary time and money.
                  </p>
                  <p>
                    The first version asked users for detailed information
                    without clearly explaining what to enter or who was
                    responsible for each device.
                  </p>
                  <p>
                    My challenge was to design a system to help people connect
                    devices on their own while giving administrators the tools
                    to track who owned each device and control network access.
                  </p>
                </Prose>
              </div>

              <ExperienceCarousel
                title="What waiting on IT felt like"
                showTitle={false}
                wide
                zoomable={false}
                slides={[
                  {
                    src: "/work/device-registration/waiting-84-years.gif",
                    width: 373,
                    height: 263,
                    focus: "50% 100%",
                    alt: "An elderly woman looking down, captioned: It's been 84 years.",
                  },
                  {
                    src: "/work/device-registration/drp-img-2.jpg",
                    width: 1600,
                    height: 900,
                    alt: "A crying cat in front of a monitor, captioned: My device is ready. The network isn't. The ticket has been with IT for days. Why do I have to keep waiting to connect my gaming device.",
                  },
                  {
                    src: "/work/device-registration/drp-img-3.jpg",
                    width: 1600,
                    height: 900,
                    alt: "A microscope, a printer and a game console, each with a speech bubble that reads Waiting on it.",
                  },
                ]}
              />
            </Stage>

            {/* Approach */}
            <Stage id="approach" num="03" name="Approach">
              <Beat>My role: Owning the system, not the screens</Beat>
              <div className="mt-md">
                <Prose>
                  <p>
                    As the lead designer, I defined the end-to-end UX vision for
                    access, validation, and reuse. This vision connected{" "}
                    <strong>3 PMs and 10 teams</strong>, both within my
                    organization and across campus. The system needed to flow
                    smoothly for students, department tasks, IT review, and
                    network management, not just for one screen.
                  </p>
                </Prose>
              </div>

              <figure className="my-xl m-0 study-narrow">
                <LightboxImage
                  src="/work/device-registration/drp-staggered-role-cards.png"
                  alt="Four staggered role cards, stepping up from Basic User (5 devices) to Group User (10 devices), Group Admin (25 devices) and Super Admin (unlimited). Each card lists what it adds to the role below it."
                  width={1072}
                  height={618}
                  className="!border-0"
                  unoptimized
                />
              </figure>

              <div>
                <Prose>
                  <p>
                    I created the <strong>role-based model</strong> for device
                    registrations, and it shaped how the configuration
                    experience came together.
                  </p>
                  <p>
                    I also aligned UCLA’s network, security, and product teams on
                    compliance standards like accessibility and usability. Since
                    I joined after the first build was underway, I used the
                    model to prevent decisions from being made screen by screen.
                    I continued to work with consultants to validate concepts
                    with campus networking teams before engineering committed to
                    the next build.
                  </p>
                </Prose>
              </div>

              <ImageGrid
                cols={2}
                narrow
                zoomable={false}
                shots={[
                  {
                    src: "/work/device-registration/drp-uxr-1-frame2.jpg",
                    alt: "An illustrated avatar of the designer, hand on chin, against a pink gradient.",
                    width: 1600,
                    height: 1600,
                    title: "Stakeholder interviews",
                    text: "I talked with each team to learn what they needed.",
                  },
                  {
                    src: "/work/device-registration/drp-uxr-2-frame2.jpg",
                    alt: "A network administrator at a desk, a terminal and traffic charts on his monitor, cable and a router beside him.",
                    width: 1600,
                    height: 1600,
                    title: "Pre session",
                    text: "Before we met, I looked at how people do this work today.",
                  },
                  {
                    src: "/work/device-registration/drp-uxr-3-frame2.jpg",
                    alt: "A campus IT meeting room on a video call, a dozen staff around a conference table.",
                    width: 1600,
                    height: 1600,
                    title: "During session",
                    text: "I watched and listened as people worked through the screens.",
                  },
                  {
                    src: "/work/device-registration/drp-uxr-4-frame2.jpg",
                    alt: "A technical lead seated in his office during an interview, a window behind him.",
                    width: 1600,
                    height: 1600,
                    title: "Post session",
                    text: "Afterward, I asked what worked and what confused them.",
                  },
                ]}
              />

              <Prose>
                <p>
                  I joined five weeks into a project that was already behind
                  schedule and changed the plan because the product wasn’t
                  working.
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

              <Prose>
                <p>
                  Four teams sat at the table: Network, Business IT Products,
                  Information Security, and Digital Foundry. Each had different
                  needs, permissions, and operational habits. Without a shared
                  structure, the product would fragment into exceptions
                  negotiated team by team.
                </p>
                <p>
                  The role-based model became the shared map: one product
                  language for users, approvers, department supervisors, and
                  admins configuring the portal. Teams made decisions from the
                  same structure for ownership, permissions, and handoffs
                  instead of re-litigating each edge case.
                </p>
              </Prose>

              <Figure
                src="/work/device-registration/layer-02-flows.png"
                alt="Role-inheritance matrix: four tiers as rows; each inherits the shared Register and Manage path (light blue) and adds its own scope (dark blue), from Basic User up to Super Admin."
                width={1440}
                height={720}
                caption="The shared role model. Each tier inherits everything the tier below can do (light blue) and adds only its own scope (dark blue). One map for ownership, permissions, and handoffs."
              />

              <Beat>What it took to change course</Beat>
              <div className="mt-md">
                <Prose>
                  <p>
                    I proposed this model five weeks into a pilot that was
                    already behind schedule, with 62% of the backlog untouched,
                    one developer in flight, and a hard deadline. The objection
                    was reasonable: reorganizing the product around roles this
                    late looked like more work, and more work looked like a
                    later launch.
                  </p>
                </Prose>
              </div>

              <Beat>How I got buy in for my proposal</Beat>
              <div className="mt-md">
                <Prose>
                  <p>
                    <strong className="mb-sm block">
                      I explained the problem. I didn’t criticize.
                    </strong>
                    Things changed in a meeting where we looked at the screens
                    together. The business systems analyst and the engineering
                    lead were there. The engineer had already built the screens in code.
                    They followed the team’s own habits, but no design rules had
                    been used. I brought three flows I had made. I also brought
                    a clear explanation of how their screens worked.
                  </p>
                  <p>
                    I pointed out the gaps, the things that didn’t match, and
                    the guesses nobody had written down.
                  </p>
                  <p>
                    The Business Analyst said the solution was great. Then the
                    network subject-matter expert agreed that the role model described
                    the system better than their screens did. After that, it
                    wasn’t about what people liked anymore. It was just true.
                  </p>
                </Prose>
              </div>

              <Figure
                src="/work/device-registration/system-admin-flow.png"
                alt="A System Admin flow diagram: SSO login, home screen, then branches for audit logs, admin configuration tables, device roles, and device management, with sticky notes marking confirmed decisions and open questions."
                width={3052}
                height={1794}
              />

              <Prose>
                <p>
                  <strong className="mb-sm block">
                    The model saved work. It didn’t add any.
                  </strong>
                  Without roles, every team would have had to decide who can see
                  and do what on every single screen. That means a lot of
                  meetings and a lot of back-and-forth until the build was done.
                  Roles let us decide it once and reuse it everywhere. That was
                  the easier path. It also helped us fix twelve tricky cases
                  early, before the engineers had even started on them.
                </p>
                <p>
                  <strong className="mb-sm block">
                    I showed how the model worked. I didn’t just talk about it.
                  </strong>
                  I used AI to build the role model as a coded prototype instead
                  of in Figma. That way the engineers could look inside it and
                  try it out. Design stayed ahead of the build instead of
                  running behind it. That fixed the worry about the schedule,
                  because the example was ready before the decisions were.
                  Nobody had to pick between finishing on time and having good
                  design.
                </p>
                <p>
                  I also don’t just assume everyone agrees. I test my ideas with
                  the campus networking teams before the engineers start
                  building. That way, we know the shared model works for how
                  each team really does its job before it turns into code.
                </p>
              </Prose>

              <Figure
                src="/work/device-registration/layer-01-context.png"
                alt="The context the coded prototype was built from: project team milestones, a database tables list, and the Device Registration Portal Phase 1 analysis."
                width={1408}
                height={744}
              />
              <Figure
                src="/work/device-registration/layer-04-code.png"
                alt="The Storybook reference library beside the Claude Code skill file that generated the Phase 2 wireframes."
                width={1440}
                height={1080}
                caption="The Storybook library engineering built from, 105 stories with zero accessibility violations, plus the skill that produced the Phase 2 wireframes from the product's real screens and roles."
              />

              <Beat>Design that helps teams ship</Beat>
              <div className="mt-md">
                <Prose>
                  <p>
                    This was a pilot. We wanted to see if UCLA’s design system
                    could work for more than web pages with articles and text.
                    We wanted it to help with apps where people fill out forms
                    and get things approved. The goal was to make design helpful
                    earlier in the project. It wasn’t about making screens look
                    nice at the end. It was about giving teams a set of rules
                    they could use to make the same kind of choices every time.
                  </p>
                  <p>
                    I turned the flow into patterns the engineers could build
                    from. These covered forms, approvals, admin tables, activity
                    history, and accessibility rules. This gave the engineers
                    one shared guide to follow. Without it, a bunch of one-off
                    choices could have gotten stuck in the product.
                  </p>
                </Prose>
              </div>

              <Quote cite="Technical Lead, Workplace IT Products">
                &ldquo;The design prototype reference that Marissa provided let
                us build from a shared pattern instead of making
                screen-by-screen decisions during implementation.&rdquo;
              </Quote>

              <Figure
                src="/work/device-registration/layer-03-visuals-2.png"
                alt="Four design-system screens on a pale blue ground: the task-based Super Admin home, the registration form, inline help for choosing a building, and validation for a malformed MAC address."
                width={1440}
                height={900}
              />
              <Figure
                src="/work/device-registration/layer-03-visuals.png"
                alt="A device management admin table above three specimen cards: status states with their contrast ratios, a focus state, and a contrast check."
                width={1440}
                height={900}
                caption="The status states, focus treatment, and contrast each screen is assembled from. Border, icon, text and colour carry every state together, so nothing is signalled by colour alone."
              />
              <Figure
                src="/work/device-registration/superadmin-home.png"
                alt="The Super Admin home: a greeting, four task cards for registering devices, managing devices, system configuration, and audit logs, and a pending-approvals list."
                width={2880}
                height={1626}
              />
            </Stage>

            {/* Results */}
            <Stage id="results" num="04" name="Results">
              <BulletList
                items={[
                  <>
                    <strong>80%</strong> of users who started signing up
                    finished on their own
                  </>,
                  <>
                    Teams received <strong>40% fewer</strong> help requests
                  </>,
                  <>
                    Average approval wait time dropped from{" "}
                    <strong>72 hours to less than 24 hours</strong>
                  </>,
                ]}
              />
              <Prose>
                <p>
                  I designed a self-service system that lets people register
                  their own devices based on their role. This replaced the old
                  process of submitting support tickets and waiting for IT to
                  set up network access. Standard requests no longer need to wait
                  in the IT ticket queue. Pilot teams could register their own
                  devices, helping reduce wait times and support tickets.
                </p>
                <p>
                  I also created shared design patterns instead of designing
                  each screen from scratch. This gave UCLA a reusable system
                  with 14 device paths, 35 reusable components, and 12 special
                  cases worked out before development began. It also showed how
                  UCLA can use shared design patterns for more than just web
                  pages.
                </p>
              </Prose>

              <ImageGrid
                cols={3}
                shots={[
                  {
                    src: "/work/device-registration/drp-outcome-knudsen.jpg",
                    alt: "80%, in blue type over a duotone photo of a UCLA building.",
                    width: 1600,
                    height: 900,
                  },
                  {
                    src: "/work/device-registration/drp-outcome-haines.jpg",
                    alt: "24 hrs, in blue type over a duotone photo of campus trees and an arched building.",
                    width: 1600,
                    height: 900,
                  },
                  {
                    src: "/work/device-registration/drp-outcome-perloff.jpg",
                    alt: "40%, in blue type over a duotone photo of a UCLA brick building.",
                    width: 1600,
                    height: 900,
                  },
                ]}
              />

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
          </div>

          <StudyNav currentSlug="device-registration" />
        </CaseStudyBody>
      </CaseStudyRoot>
    </div>
  );
}
