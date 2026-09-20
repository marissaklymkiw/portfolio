import {
  BulletList,
  CaseStudyBody,
  CaseStudyHeader,
  CaseStudyHero,
  CaseStudyLede,
  CaseStudyMeta,
  CaseStudyRoot,
  Figure,
  FigureRow,
  Prose,
  Pullquote,
  Quote,
  Stage,
} from "@/components/ui/CaseStudy";
import StudyNav from "@/components/ui/StudyNav";

/**
 * Indeed — analytics vision. Ported from indeed-vision-case-study_9.html and
 * restaged on the same primitives as the DRP study.
 *
 * COPY IS MK's OWN, supplied section by section in 2026. The "What shipped"
 * section was REMOVED at her direction: it carried the competitive teardown
 * (87 slides, 11 direct and 7 indirect competitors), an EvolutionRail tracing
 * the question across workshop → offsite → shipped, the shipped Smart Sourcing
 * summary screenshot, and a StatBand. The full block is recoverable from git.
 * The study now ends on "Unresolved" rather than on what shipped.
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
  { id: "background", num: "01", name: "Background" },
  { id: "problem", num: "02", name: "The problem" },
  { id: "why", num: "03", name: "The real fight" },
  { id: "workshop", num: "04", name: "The workshop" },
  { id: "direction", num: "05", name: "Shared direction" },
  { id: "offsite", num: "06", name: "Narrowing focus" },
  /* The close is "Unresolved", not "Reflection". The doc ends this study on the
     open question rather than on a summary, which is the stronger ending: the
     direction shipped at both ends of the spectrum it named, and whether that
     is the hybrid working or Betty opening two tabs is genuinely not settled.
     Naming that is the seniority signal a tidy reflection would spend. */
  {
    id: "reflection",
    num: "07",
    name: "Unresolved: where should analytics live?",
    short: "Unresolved",
  },
];

export default function IndeedVisionCaseStudy() {
  return (
    /* All three studies carry the SAME four classes: the shared 1224px measure,
       squared content media, no ink rule above each section, and no stage
       numbers. If you change one study here, change all three, or the set stops
       reading as one system. See globals.css for what each class does. */
    <div className="no-media-radius no-section-rule no-stage-numbers study-canvas">
    <CaseStudyRoot>
      {/* No hero in the header: it moves down under the metadata, below. */}
      <CaseStudyHeader
        badge={{ mark: "Indeed", label: "Analytics & Insights" }}
        title="Every team was shipping analytics. Nobody was shipping a direction."
      />

      {/* Metadata and lede lead the right column so the rail (Go back + index)
          starts at the metadata row rather than below the title block. */}
      <CaseStudyBody
        stages={STAGES}
        lead={
          <>
            <CaseStudyMeta
              className="border-t border-b border-line pt-lg pb-lg"
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

            {/* The hero, moved into the container and set directly under the
                metadata block rather than full-width in the header, matching
                DRP. This board IS the claim, a direction being made, so the
                lede below still reads as its caption. */}
            <CaseStudyHero
              src="/work/indeed-vision/jtbd-prioritization.png"
              alt="JTBD prioritization board: a satisfaction-versus-importance plot, and jobs voted into a pyramid."
              width={2430}
              height={1416}
              priority
              caption="The direction, being made. Jobs plotted by satisfaction against importance, voted, then ranked into the pyramid that became the two-year direction."
            />

            {/* MK's text, verbatim, and set plain. The previous lede bolded its
                second half; nothing here is marked for emphasis, and inventing
                a bold phrase would put stress on a clause she did not stress. */}
            <CaseStudyLede>
              I aligned three analytics teams around a shared product direction,
              then helped carry the highest-priority opportunity into the
              sourcing analytics work that became part of Project
              Galaxy&rsquo;s MVP.
            </CaseStudyLede>
          </>
        }
      >
        {/* 01 · Background — MK's text, verbatim. Opens the spine ahead of
            "The problem": the history is what makes the merge-to-direction
            turn legible, and without it the reorg and the third team arrive
            later as assumed context.

            The two products are NAMED here rather than left as "One" and
            "Another", so that "Hiring Insights and Centralized Analytics" in
            The real fight lands on terms the reader already has.

            The umbrella is "the employer analytics experience", lower case and
            deliberately not a proper noun: an earlier draft called it "Employer
            Analytics", which read as a third product name sitting beside the
            two real ones. Only Hiring Insights and Centralized Analytics are
            products here. */}
        <Stage
          id="background"
          num="01"
          name="Background"
          eyebrow="Two analytics products...then a third"
        >
          <Prose>
            <p>
              Indeed provided employers with several ways to see how their
              hiring was going, and it had built them in different places.
              The employer analytics experience lived across separate products,
              each with its own team, research, terminology, and roadmap.
              Centralized
              Analytics reported what an employer was spending and how their
              jobs were performing. Hiring Insights covered the hiring market
              they were competing in. Nobody had built
              them to be read together, because until customers started asking a
              question that spanned all of them, nobody had needed to.
            </p>
            <p>
              In 2023 a reorganization brought those teams under the same
              product leadership, and the senior leaders inheriting analytics
              were new to the space. The mandate was the merge.
            </p>
            <p>
              Then the shape changed. Partway through, sourcing analytics rose
              in priority: a third team, covering the proactive side of
              recruiting where employers go find candidates instead of waiting
              for them to apply. That is what turned a merge problem into a
              direction problem. Two tools can be combined. Three teams, with
              other product groups already asking to reuse analytics in their
              own surfaces, need a model to build from.
            </p>
            <p>
              I started on this work before the reorganization formalized
              anything, auditing jobs to be done (JTBD) across the products.
              That audit became the basis for a cross-functional workshop in May
              and June 2023, and a year later for a three-day offsite in April
              2024, where the direction had to absorb sourcing without going
              vague.
            </p>
          </Prose>
        </Stage>

        {/* 02 · The problem */}
        <Stage
          id="problem"
          num="02"
          name="The problem"
          eyebrow="Three tools, one story rebuilt by hand"
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
          num="03"
          name="The real fight"
          eyebrow="Not an org chart, a product direction"
        >
          {/* MK's text, verbatim. This replaced a NumberedList whose four labels
              ("No shared view of user need", "No shared direction", "Demand
              from beyond analytics", "A moving target") were invented to fit
              that primitive, and whose bodies paraphrased rather than quoted.
              Her four items lead with their own claim sentence, so they are a
              plain list with the claim in bold. */}
          <Prose>
            <p>
              The mandate sounded simple: bring Hiring Insights and Centralized
              Analytics together instead of letting them grow as separate tools
              with separate OKRs.
            </p>
            <p>
              But the real problem was not the org chart. It was the absence of
              a shared product direction.
            </p>
            <p>Four things made that visible:</p>
          </Prose>

          <BulletList
            items={[
              <>
                <strong>Teams were solving the same jobs differently.</strong>{" "}
                Each product had its own research, terminology, and roadmap, so
                overlapping customer needs were being answered in different
                ways, or not at all.
              </>,
              <>
                <strong>No one had named the future state.</strong> The teams
                did not yet have a shared answer for what analytics should
                become together.
              </>,
              <>
                <strong>Other products wanted analytics too.</strong> The
                solution could not be &ldquo;merge two tools.&rdquo; It had to
                define a model other teams could build from.
              </>,
              <>
                <strong>The target kept moving.</strong> As sourcing rose in
                priority, the direction had to expand without losing coherence.
              </>,
            ]}
          />

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

          {/* MK's text, verbatim, and set plain. The previous version bolded
              "destination", "threaded", and "hybrid", and closed on a further
              paragraph ("My job wasn't to design another screen...") that is
              not in her text, so it is gone. */}
          <div className="mt-xl">
            <Prose>
              <p>
                The choice I helped clarify was where analytics should live: as
                a destination customers visit, threaded into the workflow where
                decisions happen, or a hybrid of both. This mattered because the
                decision was not just where to put analytics; it was how Indeed
                would avoid building three disconnected answers to the same
                employer questions.
              </p>
              <p>
                That framing turned &ldquo;merge the tools&rdquo; into a product
                decision the organization could actually make.
              </p>
            </Prose>
          </div>
        </Stage>

        {/* 03 · The workshop */}
        <Stage
          id="workshop"
          num="04"
          name="The workshop"
          eyebrow="Pulling the decision into a room"
        >
          {/* MK's text, verbatim, and set plain. The previous version opened on
              "You can't merge two products in a slide deck", bolded five method
              names mid-paragraph, and ran the audit LAST as backfill. Hers puts
              the audit first, which is the right order: the audit is what made
              the workshop a decision-making room rather than an ideation
              session, and that is the claim the section rests on. */}
          <Prose>
            <p>
              Before the reorg formalized the merge, I audited the JTBD across
              Hiring Insights and Centralized Analytics
              and found <strong>31 overlapping customer jobs</strong>.
            </p>
            <p>
              The audit turned 31 overlapping jobs into a shared decision set,
              giving the group a way to prioritize investment instead of
              continuing parallel discovery across separate tools.
            </p>
            <p>
              That became the foundation for the workshop: not a blank ideation
              session, but a decision-making room built around prioritized user
              need.
            </p>
            <p>
              Across May and June 2023, I planned and facilitated a
              cross-functional FigJam workshop with PMs, new analytics
              leadership, architecture, engineering, research, and customer
              success. The group worked from the prioritized JTBD set, mapped{" "}
              <strong>end-to-end opportunity workflows</strong>, generated{" "}
              <strong>How Might We statements</strong>, and translated them into{" "}
              <strong>need statements</strong>.
            </p>
            <p>
              The output was a shared, ranked foundation for the two-year
              direction: which customer jobs mattered most, where analytics
              should support them, and what the teams should build toward
              together.
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
          num="05"
          name="Shared direction"
          eyebrow="What three teams agreed to build toward"
        >
          <Prose>
            <p>
              {/* "as the senior PM quoted above notes" replaced: a spatial
                  reference assumes the reader arrived top-down and sighted, and
                  it silently breaks whenever a section is reordered, which has
                  already happened twice on this page. The attribution now names
                  the role instead of a position. */}
              The teams aligned on a single, prioritized set of user needs to
              build toward, instead of three tools solving overlapping jobs in
              isolation. That alignment fed a two-year roadmap and, as the
              senior product manager on the analytics team put it, helped orient
              leadership who were new to the product space.
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
          num="06"
          name="Narrowing focus"
          eyebrow="Three days to absorb sourcing without going vague"
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
              “car.” Afterward I RICE-sized the resulting JTBD to rank them.
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
            caption="The offsite, both halves. Two teams down the same structure, from a stated goal through data needs and dependencies to a crafted opportunity, and one of those journeys drawn out as a workflow that leads with what to do about the data rather than the data itself."
          />
        </Stage>

        {/* 07 · Unresolved. Body is MK's own copy from the 2026 case-study doc,
            which closes this study on the open question rather than a summary.
            The confidentiality Aside that used to close this stage was removed
            at MK's direction. */}
        <Stage
          id="reflection"
          num="07"
          name="Unresolved: where should analytics live?"
          eyebrow="Both ends of the spectrum, and no owner for the choice"
        >
          <Prose>
            <p>
              Where analytics belongs is not a settled question. An
              employer&rsquo;s question spans products, but each product ships on
              its own roadmap and owns its own surface, so the cheapest answer is
              always the local one. Indeed shipped both ends of the spectrum I
              had named: the job performance report threaded into the workflow,
              the sourcing analytics summary as a destination you go to. Both are
              defensible alone. Together they are either the hybrid working
              exactly as intended, or Betty opening two tabs instead of three.
            </p>
            {/* The "direction held" sentence is carried over from the reflection
                this section replaced. It earns its place here rather than in a
                summary: it is the evidence that the approach worked, and the
                concession that follows only lands if the thing being conceded
                was otherwise durable. */}
            <p>
              I&rsquo;d run the vision work the same way, because the audit and
              the workshop are what gave three teams a shared set of jobs to
              argue from. That direction held: it survived every leadership
              transition and became shared language across time zones. What
              I&rsquo;d change is where I stopped. I framed the choice and handed
              it to the room. If I started again from the assumption that a
              direction decays the moment nobody owns it, I think I&rsquo;d have
              made naming that owner part of the output rather than the
              follow-up.
            </p>
          </Prose>
        </Stage>
        <StudyNav currentSlug="indeed-vision" />
      </CaseStudyBody>
    </CaseStudyRoot>
    </div>
  );
}
