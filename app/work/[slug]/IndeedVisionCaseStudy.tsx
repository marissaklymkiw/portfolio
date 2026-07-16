import {
  Aside,
  CaseStudyBody,
  CaseStudyHeader,
  CaseStudyHero,
  CaseStudyLede,
  CaseStudyRoot,
  Figure,
  FigureRow,
  FigureSlot,
  LabeledList,
  NumberedList,
  Prose,
  Pullquote,
  Quote,
  Stage,
  StatBand,
  Todo,
} from "@/components/ui/CaseStudy";

/**
 * Indeed — analytics vision. Ported from indeed-vision-case-study_9.html and
 * restaged on the same primitives as the DRP study.
 *
 * COPY IS VERBATIM from the source file. The author's own placeholders survive
 * as <Todo> (three CONFIRMs) and <FigureSlot> (four visuals not yet exported).
 *
 * THE HERO IS THE JTBD PRIORITIZATION BOARD, not a screen. That is the point of
 * the study: the deliverable was a direction, not an interface, and the shipped
 * dashboard is behind Indeed's paywall anyway. The board is the only artifact
 * that evidences the claim — 31 overlapping jobs voted on a satisfaction-vs-
 * importance read, then ranked into the pyramid. It is unreadable at hero size
 * and that is correct: it reads as rigor, not as reading material.
 *
 * PUBLISHED AS-IS, at full 2430px, real JTBD labels and all. That is a
 * deliberate call by MK on the basis that the case studies will sit behind a
 * password. NOTE: that gate does not exist yet. If these pages ever go public
 * without it, the labels are legible to anyone who opens the image directly,
 * and this asset needs downscaling to ~1600px or redacting first.
 *
 * The two quotes are REAL and attributed, so they are <Quote>, not <Todo>.
 * They're also the thing the DRP study is still missing.
 *
 * Server component: nothing here needs the client.
 */
const STAGES = [
  { id: "problem", num: "01", name: "The problem" },
  { id: "why", num: "02", name: "The real fight" },
  { id: "workshop", num: "03", name: "The workshop" },
  { id: "direction", num: "04", name: "Shared direction" },
  { id: "offsite", num: "05", name: "Narrowing focus" },
  { id: "shipped", num: "06", name: "What shipped" },
  { id: "role", num: "07", name: "My role" },
];

export default function IndeedVisionCaseStudy() {
  return (
    <CaseStudyRoot>
      <CaseStudyHeader
        badge={{ mark: "Indeed", label: "Analytics & Insights" }}
        title="Every team was shipping analytics. Nobody was shipping a direction."
        meta={[
          { label: "Role", value: "Senior UX Designer" },
          { label: "Timeframe", value: "2023–2024" },
          {
            label: "Team",
            value: (
              <>
                2 designers
                <br />1 content designer
              </>
            ),
          },
          {
            label: "Responsibilities",
            value: (
              <>
                Facilitation
                <br />
                JTBD synthesis
                <br />
                Competitive analysis
                <br />
                Vision design
              </>
            ),
          },
        ]}
      />

      {/* hero ABOVE the lede here, unlike the DRP study where the argument
          lands first. The reason is what the artifact is: the DRP hero is a
          shipped screen, which only means something once you know the claim it
          answers. This board IS the claim — a direction being made — so it can
          open cold and the lede reads as its caption. */}
      <CaseStudyHero
        src="/work/indeed-vision/jtbd-prioritization.png"
        alt="The workshop's prioritization board. On the left, Prioritize JTBDs with Voting: a satisfaction-score versus importance-score plot with jobs-to-be-done plotted as bubbles carrying vote counts, and an opportunity zone marked under 75% satisfaction and over 75% importance. On the right, a decision tree of prioritized JTBDs arranged as a pyramid, ranked by votes from thirteen at the apex down to zero at the base."
        width={2430}
        height={1416}
        priority
        caption="The direction, being made. Jobs plotted by satisfaction against importance, voted, then ranked into the pyramid that became the two-year direction."
      />

      <CaseStudyLede>
        Indeed reorganized its analytics teams and asked a hard question: what
        should these tools become together? I facilitated the cross-functional
        workshop that set that direction, then{" "}
        <strong>
          followed the priority it surfaced into sourcing analytics, where my
          work shipped in a paid product
        </strong>
        .
      </CaseStudyLede>

      <CaseStudyBody stages={STAGES}>
        {/* 01 · The problem */}
        <Stage
          id="problem"
          num="01"
          name="The problem"
          title="Betty doesn’t have a data problem"
        >
          <Prose>
            <p>
              Betty is a VP of Talent Acquisition at a large employer. She
              spends real money with Indeed, and she has to answer one question
              to her leadership: is it working?
            </p>
            <p>
              Today she opens one tool to see her spend, another to see how her
              jobs are performing, and a third to read the hiring market she is
              competing in. They don’t share terminology. None of them tells her
              what to do next. Every month she exports three screenshots into a
              slide and reconstructs the story by hand.
            </p>
            <p>
              Betty doesn’t have a data problem. Indeed has more data than
              almost anyone. <strong>Betty has a coherence problem.</strong>
            </p>
          </Prose>

          <Figure
            src="/work/indeed-vision/betty-coherence.png"
            alt="A person at the center holding together scattered, disconnected charts and documents in separate color families on either side, illustrating fragmented analytics tools that don't share a common view."
            width={1376}
            height={768}
          />

          <Pullquote>The data was everywhere. The direction was nowhere.</Pullquote>
        </Stage>

        {/* 02 · The real fight */}
        <Stage
          id="why"
          num="02"
          name="The real fight"
          title="Merging two tools was really a fight about product direction"
        >
          <Prose>
            <p>
              The mandate looked like an org-chart problem: get Hiring Insights
              and Centralized Analytics to come together instead of growing as
              separate tools with separate OKRs. It was really a
              product-direction problem, and four things made it hard.
            </p>
          </Prose>

          <div className="mt-xl">
            <NumberedList
              items={[
                {
                  label: "No shared view of user need",
                  body: (
                    <p>
                      Each team held its own research in its own silo. The same
                      customer job was being solved three different ways, or not
                      at all.
                    </p>
                  ),
                },
                {
                  label: "No shared direction",
                  body: (
                    <p>
                      Nobody had articulated what these products should become
                      together, and there was no room where the people who could
                      decide that sat down at once.
                    </p>
                  ),
                },
                {
                  label: "Demand from beyond analytics",
                  body: (
                    <p>
                      Other product teams wanted to reuse analytics in their own
                      surfaces, so the answer couldn’t just merge two tools. It
                      had to set a direction the whole org could build on.
                    </p>
                  ),
                },
                {
                  label: "A moving target",
                  body: (
                    <p>
                      Priorities shifted mid-flight. Partway through, sourcing
                      analytics rose in importance, and the direction had to
                      absorb that instead of ignoring it.
                    </p>
                  ),
                },
              ]}
            />
          </div>

          {/* the merge, as a picture: decentralized and disjointed, then
              unified, then closer to the user. This is the org-chart problem the
              stage opens on, before it argues the problem was really direction. */}
          <Figure
            src="/work/indeed-vision/analytics-in-journeys.png"
            alt="A slide headed Analytics in Journeys, the evolution of analytics at Indeed, in three stages. Before: analytics experiences are decentralized and disjointed, shown as a single dense report. Fully available in the first half of 2023: centralized analytics provides a unified experience across key product areas, shown as a set of consistent report screens. Launching in the third and fourth quarters of the 2023 financial year: analytics capabilities are getting closer to the user, shown as a performance module inside a job detail page."
            width={2542}
            height={1420}
            caption="The merge as the org saw it: decentralized, then unified, then pushed closer to the user. A tidy story about tools, which is exactly why it kept reading as an org-chart problem rather than a direction problem."
          />

          <div className="mt-xl">
            <Prose>
              <p>
                My job wasn’t to design another screen. It was to{" "}
                <strong>
                  create the alignment that would tell everyone which screens
                  were worth designing
                </strong>
                .
              </p>
            </Prose>
          </div>
        </Stage>

        {/* 03 · The workshop */}
        <Stage
          id="workshop"
          num="03"
          name="The workshop"
          title="A workshop that set the shared foundation, not a feature debate"
        >
          <Prose>
            <p>
              You can’t merge two products in a slide deck. So I helped pull the
              decision into a room. I planned and facilitated a cross-functional
              ideation workshop in FigJam across May and June 2023, bringing
              together people who normally worked in silos: PMs, leadership new
              to analytics, an architect, engineering managers, research, and
              customer success.
            </p>
            <p>
              The session ran on real methods, not opinion. Teams worked from a{" "}
              <strong>prioritized set of jobs-to-be-done</strong>, ranked by
              value, then built <strong>end-to-end opportunity workflows</strong>{" "}
              for the jobs that mattered most, generated{" "}
              <strong>How-Might-We statements</strong>, and translated each into
              a clear <strong>need statement</strong>. That is how the group
              moved from three siloed tools to one shared, prioritized
              foundation to build on.
            </p>
            <p>
              The groundwork predated the mandate. Before the reorg formalized
              the merge, I audited the jobs-to-be-done across both products and
              found <strong>31 that overlapped</strong>. I prioritized them by
              user need and RICE and built the vision brief and scope alongside
              senior designer Alissa Lee. In the session, the group used that
              prioritized set and a satisfaction-versus-importance read to vote
              the top jobs into a shared two-year direction.
            </p>
          </Prose>

          {/* fills the slot that asked for "the define-opportunities workflow /
              need-statement boards" — it is exactly that, for JTBD 1.05.3. */}
          <Figure
            src="/work/indeed-vision/opportunity-workflow-hmw.png"
            alt="The opportunity workflow board for one job-to-be-done, 1.05.3, diagnose issues when troubleshooting poor performance on a job. A five-step end-to-end workflow runs left to right with the current state in grey and the future state in pink beneath it, and a field of How Might We statements is clustered to the right under grouping labels such as educate clients on their market, clearly communicate ROI, and correlate performance with the market."
            width={3138}
            height={1746}
            caption="One job, worked end to end: the five-step workflow, the future state under it, and the How Might We statements the group generated from it."
          />

          <Quote cite="Kathleen Denyer" role="Senior UX Researcher">
            “Marissa extensively researched and prepared to facilitate the most
            effective workshop I have ever attended.”
          </Quote>

          <Quote cite="Maggie Fidler" role="Product Manager">
            “Marissa did a lot of work on the vision workshop, including
            gathering the JTBD and curating them before the workshop, helping to
            facilitate, and summarize take aways. The work from this lead into
            the product vision and roadmap, as well as getting new leadership
            more familiar with the new product space.”
          </Quote>
        </Stage>

        {/* 04 · Shared direction */}
        <Stage
          id="direction"
          num="04"
          name="Shared direction"
          title="For the first time, siloed teams prioritized the same user needs"
        >
          <Prose>
            <p>
              The teams aligned on a single, prioritized set of user needs to
              build toward, instead of three tools solving overlapping jobs in
              isolation. That alignment fed a two-year roadmap and, as Maggie
              notes above, helped orient leadership who were new to the product
              space.
            </p>
          </Prose>

          {/* the direction, then the plan it became. Both slides are MK's own
              work; Maggie incorporated them into the vision deck she owned for
              the leadership narrative, which is why the study credits the deck
              to her under "Shared" but shows these here. */}
          <FigureRow
            figures={[
              {
                src: "/work/indeed-vision/where-are-we-going.png",
                alt: "A slide headed Where are we going? As an external Analytics Experience user. A journey line carries five outcomes stated in the user's voice: threaded analytics, navigation, benchmarking, return on investment, and actionable next steps. Each is tagged against the key problems it addresses: discoverability, data consistency, or user questions.",
                width: 2526,
                height: 1420,
              },
              {
                src: "/work/indeed-vision/roadmap-wip.png",
                alt: "A roadmap slide marked work in progress. Swimlanes of work are laid across five quarters, from ROI and spend summary through benchmarking to job optimization and recommendations, with a What isn't here? column listing the gaps the roadmap does not yet cover.",
                width: 2530,
                height: 1410,
              },
            ]}
            caption="The direction stated as user outcomes, and the plan it turned into. The roadmap keeps a “What isn’t here?” column, which is the honest half: naming what the plan does not cover is what stops a direction from quietly becoming a promise."
          />
        </Stage>

        {/* 05 · Narrowing focus */}
        <Stage
          id="offsite"
          num="05"
          name="Narrowing focus"
          title="Narrowing direction to focus: the ANEX offsite where sourcing rose to the top"
        >
          <Prose>
            <p>
              A direction is not the same as a focus. By early 2024 the teams
              needed to decide what, specifically, analytics should build next,
              and the 2023 foundation had a new pressure on it: sourcing had
              widened the scope. I facilitated the ANEX offsite over three days,
              leveraging an <strong>employer accelerator framework</strong> to
              build future-state journeys, and adjusting the direction to absorb
              the expanded sourcing scope rather than ignore it. Teams named the
              top opportunities, then pressure-tested each through a{" "}
              <strong>return-on-effort metrics framework</strong> and a phased
              path to delivery, from a “skateboard” first version to the full
              “car.” Afterward I RICE-sized the resulting jobs-to-be-done to rank
              them.
            </p>
            <p>
              That is how a broad direction became a focus, and where sourcing
              analytics rose to the top.
            </p>
          </Prose>

          {/* the offsite's two halves: the boards the teams worked, and what
              one of those journeys became. Paired in a FigureRow so the
              landscape board and the portrait wireframe land on the same
              height. The skateboard-to-car map is a separate artifact, still
              owed. */}
          <FigureRow
            figures={[
              {
                src: "/work/indeed-vision/anex-future-state-journeys.png",
                alt: "The ANEX offsite boards. Two teams, Blue and Yellow, each working a future-state journey down the same structure: user journey with a stated goal and five steps, then context and capabilities, data needs, dependencies and collaborators, value to users, value to Indeed, and opportunity crafting, each block timeboxed.",
                width: 3434,
                height: 1964,
              },
              {
                src: "/work/indeed-vision/anex-workflow-wireframe.png",
                alt: "A wireframe of the future-state analytics workflow, headed How is my team performing? A row of measures sits above a Recruiters who may need help section, which states that three recruiters have candidates stuck in the pipeline for more than five days, gives a Why? breakdown of likely causes, and offers an action beside each. Below it, a table ranks recruiter performance by slowest response time.",
                width: 1390,
                height: 1944,
              },
            ]}
            caption="The offsite, both halves. Two teams down the same structure, from a stated goal through data needs and dependencies to a crafted opportunity — and one of those journeys drawn out as a workflow that leads with what to do about the data rather than the data itself."
          />
        </Stage>

        {/* 06 · What shipped */}
        <Stage
          id="shipped"
          num="06"
          name="What shipped"
          title="I followed the priority I set into a dashboard that shipped"
        >
          <Prose>
            <p>
              A vision is only as real as the piece of it that ships. Coming out
              of the offsite I moved from facilitating the direction to
              designing it. I started with a competitive analysis of the
              sourcing and analytics landscape, roughly{" "}
              <strong>20+ products</strong> in a slide teardown, mapping how
              competitors structured their data and where they placed analytics
              in the workflow. I did the bulk of it; Alissa Lee contributed
              after.
            </p>
            <p>
              From there I designed and delivered the sourcing-analytics
              experience: a{" "}
              <strong>recruiter and talent-management dashboard</strong> built
              around one question, “how is your recruiting performance?” It led
              with a plain-language performance summary and gauge, surfaced
              pipeline-health and expiring-contact signals, compared sourcing
              against advertising through full candidate-acquisition funnels,
              and offered insight-led recommendations instead of raw charts.
              That work fed <strong>Project Galaxy’s MVP</strong>, which shipped
              and lives today behind the paywall in Indeed’s paid product.
            </p>
          </Prose>

          <Todo>
            <b>CONFIRM:</b> the slide count of the competitive teardown (~87),
            and the Project Galaxy MVP ship date (April 2024). Both are stated
            as fact in the copy above with the numbers removed until sourced.
          </Todo>

          <FigureSlot
            label="[ Insert visual: the “How is your recruiting performance?” dashboard ]"
            hint="Overview + Acquisition channels views, the hero. Figma (ANEX Vision ROE explorations)."
          />

          <StatBand
            stats={[
              {
                value: "31",
                label:
                  "overlapping jobs audited across two products, prioritized into one direction",
              },
              {
                value: "2",
                label:
                  "cross-functional vision workshops planned and facilitated across the reorg",
              },
              {
                value: "Shipped",
                label:
                  "sourcing dashboard reached Project Galaxy’s MVP, live in a paid product",
              },
            ]}
            note="The confidential parts stay off the page. The number still to chase is a single Galaxy adoption or before/after figure."
          />
        </Stage>

        {/* 07 · My role */}
        <Stage
          id="role"
          num="07"
          name="My role"
          title="My role, precisely"
        >
          <Prose>
            <p>Strategy and vision work is a team sport, so here is the clean line:</p>
          </Prose>

          <div className="mt-xl">
            <LabeledList
              items={[
                {
                  label: "Mine",
                  body: (
                    <p>
                      Planning and facilitating both cross-functional vision
                      workshops (2023 merge, 2024 ANEX offsite); the pre-reorg
                      JTBD overlap audit and the synthesis the workshops ran on;
                      and the sourcing-analytics work, from competitive analysis
                      through the delivered dashboard, that fed Galaxy.
                    </p>
                  ),
                },
                {
                  label: "Shared",
                  body: (
                    <p>
                      The vision deck was owned by my PM partner, Maggie Fidler,
                      for the leadership narrative; Alissa Lee contributed to the
                      competitive analysis after I built it out; the workshop was
                      cross-functional and I facilitated it.
                    </p>
                  ),
                },
                {
                  label: "Not mine",
                  body: (
                    <p>
                      Company-level strategy memos by Indeed leadership are
                      context I worked within, not my deliverables. The
                      “Analytics 360” articulation lives in a team FigJam and
                      deck, so I don’t claim it as mine.
                    </p>
                  ),
                },
              ]}
            />
          </div>

          <Aside>
            Indeed’s analytics roadmap and the Galaxy product are proprietary, so
            this study shows the thinking and process rather than confidential
            screens or internal metrics. Happy to walk through the detail live.
          </Aside>
        </Stage>
      </CaseStudyBody>
    </CaseStudyRoot>
  );
}
