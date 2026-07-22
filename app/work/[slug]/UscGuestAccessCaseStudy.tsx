import {
  Aside,
  Beat,
  Caption,
  CaseStudyBody,
  CaseStudyHeader,
  CaseStudyLede,
  CaseStudyMeta,
  CaseStudyRoot,
  CaseStudyTools,
  Figure,
  FigureRow,
  LabeledList,
  Phase,
  Prose,
  Pullquote,
  Stage,
  Todo,
} from "@/components/ui/CaseStudy";

/**
 * USC Guest Access — ported from ~/Downloads/usc-guest-access-revised.html
 * (old USC-cardinal token system) and restaged on the Swiss primitives, exactly
 * as the Indeed and Sourcing Analytics studies were.
 *
 * IMAGES: the source hotlinked from marissa-klymkiw.com; all ten are now
 * downloaded into /public/work/usc-guest-access/ so the study owns its assets
 * like every other study, rather than depending on the live WordPress site.
 *
 * THE HERO IS AN ANIMATED GIF (a student editing which services a guest can
 * see). It is rendered as a plain <img>, NOT next/image, because Next freezes an
 * optimized GIF to its first frame — the loop is the point. Same flat, square,
 * hairline framing as every Figure, so it still reads as part of the system.
 * (A polished device-composite hero exists but isn't in the repo yet; drop it in
 * and swap the <img> below for a CaseStudyHero.)
 *
 * STATUS: pre-launch. The design was validated in usability testing with a
 * planned launch in late 2021. That honesty is stated in §08 rather than dressed
 * up as a ship.
 *
 * The <Todo> blocks are the source's "TO ADD" markers, preserved verbatim in
 * intent: the three testing responses, the outcomes band, and one downstream
 * quote. They render in the one non-monochrome error token so they cannot reach
 * publish unnoticed — nothing here is fabricated.
 *
 * Server component: nothing here needs the client.
 */
const STAGES = [
  { id: "problem", num: "01", name: "The problem" },
  { id: "research", num: "02", name: "Research" },
  { id: "insights", num: "03", name: "Insights" },
  { id: "design", num: "04", name: "Design" },
  { id: "outcome", num: "05", name: "Outcome" },
];

export default function UscGuestAccessCaseStudy() {
  return (
    <CaseStudyRoot>
      <CaseStudyHeader
        badge={{ mark: "USC", label: "Enterprise UX" }}
        title="Redesigning guest access so students stop sharing their passwords"
        hero={
          /* the hero is the shipped interaction itself, as an animated GIF: a
             student choosing which services a guest can see. Plain <img>, not
             next/image, so the loop survives (Next freezes an optimized GIF to its
             first frame). Same flat square hairline framing as every Figure. */
          <figure className="mt-3xl m-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/usc-guest-access/student-edit-guest-services.gif"
              alt="A student in the redesigned Guest Access dashboard editing which services a guest can see, toggling individual services on and off."
              className="block w-full h-auto border border-line"
            />
            <Caption>
              The redesigned dashboard: a student choosing exactly which services
              each guest can see — the control the old system never gave them.
            </Caption>
          </figure>
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
                { label: "Role", value: "UX Design Lead" },
                { label: "Timeframe", value: "2020–2021" },
                {
                  label: "Team",
                  value: (
                    <>
                      Cross-functional scrum team
                      <br />
                      UX researcher partner
                    </>
                  ),
                },
                {
                  label: "Responsibilities",
                  value: (
                    <>
                      Information architecture
                      <br />
                      Visual design
                      <br />
                      Content design
                      <br />
                      Research (partnered)
                    </>
                  ),
                },
              ]}
            />

            <CaseStudyTools
              label="Tools & methods"
              chips={[
                "Sketch",
                "InVision",
                "Heuristic evaluation",
                "Comparative analysis",
                "Participatory design",
                "Usability testing",
              ]}
            />

            <CaseStudyLede>
              USC students were handing parents their{" "}
              <strong>actual logins</strong> to get help. I designed a secure,
              FERPA-aware way to invite and manage guests instead.
            </CaseStudyLede>
          </>
        }
      >
        {/* 01 · The problem */}
        <Stage
          id="problem"
          num="01"
          name="The problem"
          title="Sharing a login was the only way in."
        >
          <Prose>
            <p>
              USC runs on a federated model, so a student’s information is
              scattered across separate systems for academic records, financial
              aid, and billing. When a parent or spouse needed to help, there was
              no real way to grant them access.
            </p>
            <p>
              So students did the obvious thing: they handed over their
              credentials. That exposed FERPA-protected data and created a
              security liability the university couldn’t see or control. I
              designed <strong>Guest Access</strong>, an enterprise application
              that securely connects students to their guests across the Office
              of Academic Records and Registrar, Student Financial Services, and
              Financial Aid — and lets students invite guests and control exactly
              what each one can see.
            </p>
          </Prose>

          {/* the guests themselves — USC parents at orientation. It puts real
              faces on the people students were sharing passwords to help. Full
              colour, per the system. */}
          <Figure
            src="/work/usc-guest-access/university-parent-orientation.jpg"
            alt="A room of parents at a university orientation session — a Latino father in a cardinal 'PARENT' t-shirt with a 'Tony' name tag smiling at the front, among a diverse group listening and taking notes — the guests students needed a safe way to grant access to."
            width={2000}
            height={1125}
            caption="The guests, in the flesh: USC parents at orientation. These are the people students were handing their passwords to."
          />

          <Pullquote>
            How might we cut the barriers <em>and</em> the security risk in guest
            access — when the current OASIS system buries information behind many
            clicks and forces students to create and control their guests’ logins
            and PINs themselves?
          </Pullquote>
        </Stage>

        {/* 02 · Research — heuristic audit, peer comparison, staff interviews,
            then a workshop with real guests */}
        <Stage
          id="research"
          num="02"
          name="Research"
          title="A heuristic audit, a peer comparison, and staff interviews — then a workshop with the guests themselves."
        >
          <Beat>Auditing OASIS surfaced three ways the old system failed</Beat>
          <div className="mt-md">
            <Prose>
              <p>
                I ran a heuristic evaluation of the current student, guest, and
                advisor experience in OASIS, and a comparative analysis of how UCLA
                and Arizona State handle guests. The UX researcher and I then
                interviewed internal stakeholders across Financial Aid, the
                Registrar, and advising. The problems clustered into three themes.
              </p>
            </Prose>
          </div>

          <div className="mt-xl">
            <LabeledList
              items={[
                {
                  label: "No guidance",
                  body: (
                    <p>
                      Little to no context. No clear success or error messaging.
                      Guests got no invite email and no confirmation when services
                      changed. Students couldn’t tell what they were actually
                      sharing.
                    </p>
                  ),
                },
                {
                  label: "Inconsistent",
                  body: (
                    <p>
                      The eBill opt-out checkbox didn’t work, so every guest got
                      billing notifications. Students got no confirmation a guest
                      was added; guests only heard from USC when access was
                      revoked.
                    </p>
                  ),
                },
                {
                  label: "Inflexible",
                  body: (
                    <p>
                      Adding a guest opted them into everything at once. Students
                      couldn’t pick and choose, and guests couldn’t remove a
                      student or hide services.
                    </p>
                  ),
                },
              ]}
            />
          </div>

          <Figure
            src="/work/usc-guest-access/heuristic-evaluation.jpg"
            alt="A heuristic evaluation of the current OASIS guest experience, with usability issues grouped into three failure themes."
            width={2560}
            height={1024}
            caption="The heuristic audit of OASIS, with issues grouped into the three failure themes above."
          />

          <Beat>
            UCLA made guests self-register; USC’s account-on-behalf model was the
            opening
          </Beat>
          <div className="mt-md">
            <Prose>
              <p>
                I built a feature inventory comparing USC’s MVP requirements
                against UCLA and ASU. UCLA’s guests create their own accounts,
                which makes the student-to-guest handoff harder. USC lets students
                create the account on a guest’s behalf, and I treated that as the
                advantage to design around: keep the low-friction handoff, but
                give students real control over it.
              </p>
            </Prose>
          </div>

          <Figure
            src="/work/usc-guest-access/comparative-analysis.jpg"
            alt="A feature inventory comparing USC Guest Access against UCLA and Arizona State University."
            width={1600}
            height={869}
            caption="Feature inventory across USC, UCLA, and ASU. The comparison isolated where USC’s model was already stronger, and where it wasn’t."
          />
          {/* staff interviews — eight people who work directly with parents */}
          <Beat>Once a parent is involved, the stakes jump</Beat>
          <div className="mt-md">
            <Prose>
              <p>
                The UX researcher and I interviewed eight people who work directly
                with parents: four advisors, two from Financial Aid, and two from
                the Registrar. Their views on guests differed sharply, which shaped
                how much control the design had to give.
              </p>
            </Prose>
          </div>

          <div className="mt-xl">
            <LabeledList
              items={[
                {
                  label: "Monica · Advisor",
                  body: (
                    <p>
                      Some parents call for support when a student is having a
                      hard time. <strong>“Would be nice to see what the guest
                      sees, so I can focus on only what the student shared.”</strong>{" "}
                      <span className="text-muted">
                        Undergraduate Advisor, Viterbi School of Engineering
                      </span>
                    </p>
                  ),
                },
                {
                  label: "Amber · Financial Aid",
                  body: (
                    <p>
                      Callers expect things fixed fast, but the process isn’t
                      clear to them. Financial Aid takes{" "}
                      <strong>3,500–4,500 calls a week</strong> with a staff of 19,
                      plus walk-ins — and 35% of guests who call in already have
                      Guest Access.{" "}
                      <span className="text-muted">Manager, Financial Aid Office</span>
                    </p>
                  ),
                },
                {
                  label: "Patrick · Registrar",
                  body: (
                    <p>
                      Parents are motivated to save money. The student USC ID is
                      currently used to validate guests. The Registrar’s office
                      treats guests like students; advisors don’t.{" "}
                      <span className="text-muted">
                        Assistant Registrar, Office of Academic Records &amp;
                        Registrar
                      </span>
                    </p>
                  ),
                },
              ]}
            />
          </div>
          {/* the pivot — bring in real guests, not just staff */}
          <Beat>We’d only asked staff — so I ran a workshop with real guests</Beat>
          <div className="mt-md">
            <Prose>
              <p>
                The scrum team assumed we knew what guests wanted, but we’d only
                talked to USC staff — not a single actual guest. I pitched a remote
                participatory design workshop, got the go-ahead, and used guerrilla
                recruiting to bring in parents on a tight timeline. The goal was to
                have guests name their own problems and drive the solutioning, not
                react to ours.
              </p>
            </Prose>
          </div>

          <FigureRow
            figures={[
              {
                src: "/work/usc-guest-access/participatory-design-planning.jpg",
                alt: "The plan for the remote participatory design workshop with guests: icebreaker, blue-sky exercise, feature voting, and a qualitative pass on current detail pages.",
                width: 1500,
                height: 2000,
                label: "The workshop plan",
              },
              {
                src: "/work/usc-guest-access/participatory-design-session.jpg",
                alt: "Two USC parents giving feedback during the remote participatory design session over Zoom.",
                width: 1500,
                height: 844,
                label: "The session",
              },
            ]}
            caption="The workshop plan — icebreaker, blue-sky exercise, feature voting, a qualitative pass — and two parents of USC students working through the current experience with us over Zoom."
          />
        </Stage>

        {/* 03 · Insights — synthesis into personas, journeys, and a prioritized
            feature set across four audiences */}
        <Stage
          id="insights"
          num="03"
          name="Insights"
          title="Four audiences, one prioritized feature set."
        >
          <Prose>
            <p>
              Insights from the interviews, personas, and journey maps fed a
              feature set spanning four audiences: students, guests, staff and
              advisors, and the Customer Service Center. The UX researcher and I
              acted as the voice of the user, balancing needs against business
              goals to land a minimum viable experience and sequence the sprints.
            </p>
            <p>
              Two journeys stood out as high-stakes and worth mapping in depth: a
              student facing a cheating accusation (which pulls in SJACS and,
              often, a parent) and a student missing a deadline. COVID pushing all
              classes online made both more common, and mapping them exposed
              exactly where guests and students hit friction.
            </p>
          </Prose>

          <FigureRow
            figures={[
              {
                src: "/work/usc-guest-access/personas.jpg",
                alt: "Personas for guests and undergraduate academic advisors, drawn from the stakeholder interviews.",
                width: 2281,
                height: 2560,
                label: "Personas",
              },
              {
                src: "/work/usc-guest-access/journey-map.jpg",
                alt: "A journey map following a guest and student through a high-stakes scenario, marking the moments where control and clarity mattered most.",
                width: 2000,
                height: 1576,
                label: "Journey map",
              },
            ]}
            caption="Six personas came out of the interviews — guests and advisors anchored the decisions — and journey-mapping the high-stakes cases surfaced where control and clarity mattered most."
          />
        </Stage>

        {/* 04 · Design — three layout bets, prototyped to high fidelity, then
            tested with students */}
        <Stage
          id="design"
          num="04"
          name="Design"
          title="Three layout bets, prototyped to high fidelity, then tested with students."
        >
          <Prose>
            <p>
              After mapping the student and guest task flows, I wireframed the
              guest dashboard three ways: accordions to hide and show groups of
              services, grouped services leading to a detail modal, and a flat
              individual-services list. Putting the options side by side made the
              tradeoff between density and discoverability something we could test
              rather than argue about.
            </p>
          </Prose>

          <Figure
            src="/work/usc-guest-access/wireframe-concepts.png"
            alt="Three wireframe concepts for the guest dashboard: accordions, grouped services with a detail page, and an individual-services list."
            width={2000}
            height={688}
            caption="Three concepts for managing services: accordions, grouped-with-detail, and individual. Each makes a different bet on how much to show at once."
          />

          <div className="mt-xl">
            <Prose>
              <p>
                I translated the tested direction into high-fidelity, clickable
                prototypes in Sketch and InVision — including empty states, error
                states, and the multi-step invite flow. The edge cases were
                designed, not just the happy path.
              </p>
            </Prose>
          </div>

          <FigureRow
            figures={[
              {
                src: "/work/usc-guest-access/student-dashboard-empty.png",
                alt: "The student dashboard in its empty state, with no guests added yet and a clear path to invite one.",
                width: 400,
                height: 284,
                label: "Empty state",
              },
              {
                src: "/work/usc-guest-access/guest-create-errors.png",
                alt: "The guest account creation screen showing inline error states on the form fields.",
                width: 400,
                height: 284,
                label: "Error state",
              },
            ]}
            caption="Empty state with a clear path to invite, and inline errors on guest account creation — states and edge cases designed alongside the happy path."
          />
          {/* usability testing — three prioritized findings, folded into Design */}
          <Beat>Testing flagged three blockers I had to design around</Beat>
          <div className="mt-md">
            <Prose>
              <p>
                In the first round, students tried the prospective app with the new
                single sign-on. They liked that it was straightforward and clean,
                with room to breathe, and were glad they could pick which services
                to share — especially in financial aid. Three findings were
                prioritized, and each one is a design decision, not just a note.
              </p>
            </Prose>
          </div>

          <div className="mt-xl flex flex-col gap-xl">
            <div>
              <Phase>Finding 1 · flagged in usability testing</Phase>
              <div className="mt-md">
                <Prose>
                  <p>
                    <strong>
                      Too many steps before a student could even add a guest.
                    </strong>
                  </p>
                </Prose>
              </div>
              <Todo>
                <p>
                  <b>To add:</b> what you changed in response, and the result —
                  e.g. “I moved service selection ahead of contact entry and cut
                  the add-guest flow from N steps to N.”
                </p>
              </Todo>
            </div>

            <div>
              <Phase>Finding 2 · flagged in usability testing</Phase>
              <div className="mt-md">
                <Prose>
                  <p>
                    <strong>
                      Students would end up as tech support for their guests,
                    </strong>{" "}
                    so they needed upfront transparency about what the guest
                    experience would be like.
                  </p>
                </Prose>
              </div>
              <Todo>
                <p>
                  <b>To add:</b> how the design set that expectation (a preview of
                  the guest view, clearer confirmations, the invite email), and
                  how you worked with the Organizational Change Manager on what got
                  communicated.
                </p>
              </Todo>
            </div>

            <div>
              <Phase>Finding 3 · flagged in usability testing</Phase>
              <div className="mt-md">
                <Prose>
                  <p>
                    <strong>
                      The guest login ran to five steps and needed to be shorter.
                    </strong>
                  </p>
                </Prose>
              </div>
              <Todo>
                <p>
                  <b>To add:</b> the reduced step count and how you got there (SSO,
                  cutting confirmation screens). A concrete before/after worth
                  stating as a number.
                </p>
              </Todo>
            </div>
          </div>
        </Stage>

        {/* 05 · Outcome — validation, planned launch, and reflection */}
        <Stage
          id="outcome"
          num="05"
          name="Outcome"
          title="Validated with students, planned for a late-2021 launch."
        >
          <Prose>
            <p>
              The design was validated with students in usability testing and
              scheduled to launch in late 2021.
            </p>
          </Prose>

          <Phase>Status: pre-launch — validated in usability testing</Phase>

          <Todo>
            <p>
              <b>Fill this band with real results.</b> The study currently stops
              at Design QA, which caps how senior it reads — this is the
              highest-leverage thing to add. Strong candidates:
            </p>
            <p>
              · <b>Adoption:</b> how many of the three offices (Academic Records,
              Financial Aid, Student Financial Services) built on the specs, and
              whether the pattern was reused elsewhere at USC.
              <br />· <b>Support load:</b> any movement against the Financial Aid
              baseline of 3,500–4,500 calls a week.
              <br />· <b>Flow:</b> the invite and guest-login step counts, before
              and after.
              <br />· <b>Validation:</b> usability or task-completion scores,
              before and after.
            </p>
            <p>
              Every number needs a source and a timeframe. If it launched after
              you left, say so and use the last result you can stand behind.
            </p>
          </Todo>

          <Todo>
            <p>
              <b>To add — one verified quote.</b> The single strongest addition is
              two sentences from a developer or PM who built from your specs — not
              “she’s great,” but something like: the specs were detailed enough
              that we built with confidence because the edge cases were already
              thought through. Paste it verbatim with their name and role. Do not
              paraphrase or invent it.
            </p>
          </Todo>

          {/* reflection — folded into Outcome */}
          <Beat>Looking back</Beat>
          <Pullquote>
            We’d designed an entire guest experience without talking to a single
            guest — noticing that, and fixing it, was the turning point.
          </Pullquote>

          <Prose>
            <p>
              If I ran it again I’d bring guests in during discovery, not after
              the team had already formed opinions — so their input shaped the
              feature set from the start instead of correcting it late. Designing
              the states and edge cases as deliberately as the happy path is the
              other habit I carried forward: the invite flow, the error states,
              and the guest preview were where this system either earned trust or
              lost it.
            </p>
          </Prose>

          <Aside>
            Guest Access handles FERPA-protected student data, so this study shows
            the design and the research rather than live records or internal
            dashboards. Happy to walk through the full prototypes in a portfolio
            review.
          </Aside>
        </Stage>
      </CaseStudyBody>
    </CaseStudyRoot>
  );
}
