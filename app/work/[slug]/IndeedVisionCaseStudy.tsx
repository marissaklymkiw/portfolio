import {
  Aside,
  CaseStudyBody,
  CaseStudyHeader,
  CaseStudyHero,
  CaseStudyLede,
  CaseStudyMeta,
  CaseStudyRoot,
  EvolutionRail,
  Figure,
  FigureRow,
  NumberedList,
  Prose,
  Pullquote,
  Quote,
  Stage,
  StatBand,
  WindowFigure,
} from "@/components/ui/CaseStudy";

/**
 * Indeed — analytics vision. Ported from indeed-vision-case-study_9.html and
 * restaged on the same primitives as the DRP study.
 *
 * COPY IS VERBATIM from the source file, save for §06 and §07. In §06 the
 * shipped summary page is now designed: the old FigureSlot placeholder is
 * replaced by an <EvolutionRail> (the workshop → offsite → shipped question,
 * sharpened across three stages) followed by the shipped page in a
 * <WindowFigure>. In §07 the old "My role" credit block is replaced by a
 * Reflection. No <Todo> CONFIRMs remain.
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
  { id: "reflection", num: "07", name: "Reflection" },
];

export default function IndeedVisionCaseStudy() {
  return (
    <CaseStudyRoot>
      <CaseStudyHeader
        badge={{ mark: "Indeed", label: "Analytics & Insights" }}
        title="Every team was shipping analytics. Nobody was shipping a direction."
        hero={
          /* This board IS the claim — a direction being made — so it can open
             cold, above the facts, and the lede below reads as its caption. */
          <CaseStudyHero
            src="/work/indeed-vision/jtbd-prioritization.png"
            alt="JTBD prioritization board: a satisfaction-versus-importance plot, and jobs voted into a pyramid."
            width={2430}
            height={1416}
            priority
            caption="The direction, being made. Jobs plotted by satisfaction against importance, voted, then ranked into the pyramid that became the two-year direction."
          />
        }
      />

      {/* Metadata and lede lead the right column so the rail (Go back + index)
          starts at the metadata row rather than below the title block. */}
      <CaseStudyBody
        stages={STAGES}
        lead={
          <>
            <CaseStudyMeta
              className=""
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

            <CaseStudyLede>
              Indeed reorganized its analytics teams and asked a hard question:
              what should these tools become together? I facilitated the
              cross-functional workshop that set that direction, then{" "}
              <strong>
                followed the priority it surfaced into sourcing analytics, where
                my work shipped in a paid product
              </strong>
              .
            </CaseStudyLede>
          </>
        }
      >
        {/* 01 · The problem */}
        <Stage
          id="problem"
          num="01"
          name="The problem"
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

          {/* zoomable={false}: an illustration, not an artifact. There is no
              detail to enlarge, so a click would promise one that isn't there. */}
          <Figure
            zoomable={false}
            src="/work/indeed-vision/betty-coherence.png"
            alt="A person holding together scattered, disconnected charts from tools that share no common view."
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
            alt="Analytics in Journeys slide: reports decentralized, then centralized, then inside the product."
            width={2542}
            height={1420}
            caption="The merge as the org saw it: decentralized, then unified, then pushed closer to the user. A tidy story about tools, which is exactly why it kept reading as an org-chart problem rather than a direction problem."
          />

          <div className="mt-xl">
            <Prose>
              <p>
                The competitive analysis I ran alongside the merge put the real
                choice on a single slide: analytics as a{" "}
                <strong>destination</strong> you go to, analytics{" "}
                <strong>threaded</strong> into the products where the work
                already happens, or a <strong>hybrid</strong> that gives you the
                right amount in context and a deep dive when you want one. Naming
                that spectrum is what turned “merge two tools” into a decision
                somebody could make. Indeed went on to ship both ends of it: the
                job performance report is threaded, and the sourcing analytics
                summary is a destination.
              </p>
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
              a senior designer. In the session, the group used that
              prioritized set and a satisfaction-versus-importance read to vote
              the top jobs into a shared two-year direction.
            </p>
          </Prose>

          {/* fills the slot that asked for "the define-opportunities workflow /
              need-statement boards" — it is exactly that, for JTBD 1.05.3. */}
          <Figure
            src="/work/indeed-vision/opportunity-workflow-hmw.png"
            alt="Opportunity workflow board: a five-step journey, its future state, and How Might We statements."
            width={3138}
            height={1746}
            caption="One job, worked end to end: the five-step workflow, the future state under it, and the How Might We statements the group generated from it."
          />

          <Quote cite="Senior UX Researcher, Analytics and Insights">
            “Marissa extensively researched and prepared to facilitate the most
            effective workshop I have ever attended.”
          </Quote>

          <Quote cite="Senior Product Manager, Analytics and Insights">
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
        >
          <Prose>
            <p>
              The teams aligned on a single, prioritized set of user needs to
              build toward, instead of three tools solving overlapping jobs in
              isolation. That alignment fed a two-year roadmap and, as the senior
              PM quoted above notes, helped orient leadership who were new to the
              product space.
            </p>
          </Prose>

          {/* the direction, then the plan it became. Both slides are MK's own
              work; the partner PM later incorporated them into the vision deck
              owned for the leadership narrative. Names are kept off the page
              (see the anonymized quotes in §03). */}
          <FigureRow
            figures={[
              {
                src: "/work/indeed-vision/where-are-we-going.png",
                alt: "Where are we going? slide: five user outcomes on a journey line, tagged to the problems they fix.",
                width: 2526,
                height: 1420,
              },
              {
                src: "/work/indeed-vision/roadmap-wip.png",
                alt: "Work-in-progress roadmap: swimlanes across five quarters, plus a What isn't here? gaps column.",
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
                alt: "ANEX offsite boards: two teams working future-state journeys down the same timeboxed structure.",
                width: 3434,
                height: 1964,
              },
              {
                src: "/work/indeed-vision/anex-workflow-wireframe.png",
                alt: "Future-state wireframe: How is my team performing?, with recruiters needing help and why.",
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
        >
          <Prose>
            <p>
              A vision is only as real as the piece of it that ships. Coming out
              of the offsite I moved from facilitating the direction to
              designing it. I started with a competitive analysis of the
              sourcing and analytics landscape —{" "}
              <strong>eleven direct competitors and seven indirect ones</strong>
              , torn down across <strong>87 slides</strong> — mapping how
              competitors structured their data and where they placed analytics
              in the workflow.
            </p>
            <p>
              The teardown said the quiet part plainly: Indeed offered “very
              basic insights around sourcing performance,” and for its most
              powerful sourcing capabilities,{" "}
              <strong>no reporting at all</strong>. It also named the pattern
              set a credible answer would have to match — LinkedIn Recruiter’s
              performance summary and sourcing pipeline reports, Gem’s pipeline
              analytics grouped by recruiter — and the drill-down logic to hang
              it on, which I wrote up as the “Icicles” framework: relevant data
              made contextually available, with the option to go deeper.
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

          {/* the throughline made explicit: one question, sharpened across
              three stages, ending on the page that shipped. The first two
              thumbnails are the artifacts already shown in full above (§03,
              §05); here they are reference, so the rail reads as one thought
              maturing rather than three separate exhibits. The shipped page is
              then given at full size below as the payoff. */}
          <EvolutionRail
            caption="One question, sharpened across three stages. The workshop asked how to make ROI legible; the offsite turned that into “how is my team performing?”; the shipped page answers it as “how is your recruiting performance?” — the same thought, three fidelities apart."
            steps={[
              {
                src: "/work/indeed-vision/opportunity-workflow-hmw.png",
                alt: "Workshop opportunity board: a five-step workflow beside grouped How Might We statements.",
                width: 3138,
                height: 1746,
                stage: "03 · Workshop",
                question: "How might we make ROI legible?",
              },
              {
                src: "/work/indeed-vision/anex-workflow-wireframe.png",
                alt: "Offsite wireframe: How is my team performing?, a measures row and a ranked performance table.",
                width: 1390,
                height: 1944,
                stage: "05 · Offsite",
                question: "How is my team performing?",
              },
              {
                src: "/work/indeed-vision/sourcing-summary-shipped.png",
                alt: "Shipped summary page: a plain-language read and stat tiles above the sourcing funnel.",
                // @2x export (2880×3976 on disk); declared at 1x so the lightbox
                // zoom ceiling is 1440, not the doubled pixel width.
                width: 1440,
                height: 1988,
                stage: "06 · Shipped",
                question: "How is your recruiting performance?",
              },
            ]}
          />

          <WindowFigure
            src="/work/indeed-vision/sourcing-summary-shipped.png"
            alt="Smart Sourcing summary: a plain-language read, stat tiles, funnel, and per-recruiter results."
            /* @2x export (2880×3976 on disk); declared at 1x so the lightbox
               zoom ceiling is 1440, not the doubled pixel width. */
            width={1440}
            height={1988}
            caption="The Smart Sourcing summary page as delivered, shown from the top — a plain-language answer, then the funnel, decline reasons, and per-recruiter performance below. Open it to see the full page. This is the piece of the vision that shipped into Project Galaxy’s MVP."
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

        {/* 07 · Reflection — replaces the old "My role" credit block. The
            confidentiality Aside is preserved: it is a viewing caveat, not role
            copy, and still governs what this page can show. DRAFT VOICE: the
            body is a first pass drawn from the narrative for MK to make her own. */}
        <Stage
          id="reflection"
          num="07"
          name="Reflection"
        >
          <Pullquote>
            A direction is only real once a piece of it ships — so I stopped
            handing vision off and followed it into the product myself.
          </Pullquote>

          <Prose>
            <p>
              What worked was triangulating across functions before anyone asked
              for a direction. Pulling the merging teams to a single prioritized
              set of user needs — through the JTBD overlap audit, the
              satisfaction-versus-importance vote, and the workshop — turned three
              tools solving overlapping jobs into one shared two-year direction.
              That direction held: it survived every leadership transition and
              became shared language across time zones, and the part I’m proudest
              of is that I carried the priority it set all the way into a sourcing
              dashboard that shipped, rather than handing the vision off at the
              slide.
            </p>
            <p>
              What I’d do differently is instrument the outcome sooner. I can show
              the direction, the priority, and the surface that shipped, but the
              number that closes the loop — Galaxy adoption, or a before-and-after
              on sourcing performance — is the one I’m still chasing; next time the
              metric goes into the plan on day one. I’d also design the gaps as
              deliberately as the features earlier. The roadmap’s “What isn’t
              here?” column was the uncomfortable slide and the most useful one,
              and naming what a plan doesn’t cover is what keeps a direction from
              hardening into a promise nobody agreed to.
            </p>
            <p>
              The vision only partly shipped, and that’s where the work goes next.
              The summary page answers “how is your recruiting performance?” at a
              glance, but the fuller experience — the acquisition-channels view
              comparing sourcing against advertising, and the deeper drill-downs
              the “Icicles” framework was built to carry — is still ahead, along
              with closing the adoption loop that would prove the direction paid
              off.
            </p>
          </Prose>

          <Aside>
            Indeed’s analytics roadmap and the Galaxy product are proprietary.
            What’s here is limited to my own working artifacts — the workshop
            boards, the direction slides, and a roadmap still marked
            work-in-progress — and stops short of the shipped product, its
            internal metrics, and the competitive teardown. Happy to walk through
            more live.
          </Aside>
        </Stage>
      </CaseStudyBody>
    </CaseStudyRoot>
  );
}
