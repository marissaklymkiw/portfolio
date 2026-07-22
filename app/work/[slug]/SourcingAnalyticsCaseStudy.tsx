import Link from "next/link";
import {
  Beat,
  CaseStudyBody,
  CompetitorLandscape,
  CaseStudyHeader,
  CaseStudyLede,
  CaseStudyMeta,
  CaseStudyRoot,
  CaseStudyTools,
  Figure,
  FigureSlot,
  Prose,
  Pullquote,
  Quote,
  Stage,
  StatBand,
  Todo,
  VideoFigure,
  WindowFigure,
} from "@/components/ui/CaseStudy";

/**
 * Sourcing Analytics — the detail-view case study.
 *
 * Ported from ~/Downloads/MK_Case_Sourcing_Analytics.html, which was authored
 * against the OLD MK token system (DESIGN_NOTES.md — paper page, indigo footer,
 * yellow marker). This restages the SAME COPY on the Swiss primitives, exactly
 * as IndeedVisionCaseStudy did with its own source file. Nothing here is styled
 * locally; every block is a CaseStudy.tsx primitive.
 *
 * OVERLAP WITH indeed-vision, ON PURPOSE. That study is the vision→direction arc
 * and treats the shipped sourcing dashboard as its §06 payoff. THIS study is the
 * deep-dive on that same dashboard — the suite, the editorial decisions, the
 * data-viz and accessibility craft. The one real artifact they share, the
 * shipped Smart Sourcing summary page, is reused here as evidence (it lives in
 * /work/indeed-vision/); the acquisition-channels DETAIL view — the frame in the
 * "Sourcing Analytics Detailed Report.fig" — has no export yet, so it is a
 * <FigureSlot>, honestly marked, not a borrowed screenshot.
 *
 * RESOLVED against the sibling study (MK's own, approved): the "~87 slides" and
 * "20+ tools" the source flagged CONFIRM are now stated plainly — the teardown
 * was 87 slides across 11 direct and 7 indirect competitors. The items that are
 * genuinely still MK's to settle (the exact ship date and a real adoption
 * metric) stay as <Todo> — the one non-monochrome token, so they cannot survive
 * to publish unnoticed. Collaborator names are anonymized to role: quotes cite a
 * title, and the teardown reads as co-authored rather than naming the partner.
 *
 * Server component: nothing here needs the client.
 */
const STAGES = [
  { id: "problem", num: "01", name: "The problem" },
  { id: "study", num: "02", name: "How I studied it" },
  { id: "built", num: "03", name: "What I built" },
  { id: "landed", num: "04", name: "Where it landed" },
  { id: "words", num: "05", name: "In their words" },
  { id: "reflection", num: "06", name: "Reflection" },
];

export default function SourcingAnalyticsCaseStudy() {
  return (
    <CaseStudyRoot>
      <CaseStudyHeader
        badge={{ mark: "Indeed", label: "Analytics & Insights" }}
        title="Recruiters were doing the work. They couldn't see if it was working."
        hero={
          /* Opening hero — an AI-generated clip of the recruiter analyzing her
             sourcing data, resolving onto the Indeed / Smart Sourcing brand. */
          <VideoFigure src="/work/sourcing-analytics/recruiter-hero.mp4" />
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
                { label: "Role", value: "Senior UX Designer" },
                { label: "Timeframe", value: "2023–2024" },
                {
                  label: "Team",
                  value: (
                    <>
                      Solo on the suite
                      <br />
                      Co-authored teardown
                      <br />
                      PM + Galaxy on delivery
                    </>
                  ),
                },
                {
                  label: "Responsibilities",
                  value: (
                    <>
                      Information design
                      <br />
                      Data visualization
                      <br />
                      Accessibility
                      <br />
                      Competitive analysis
                    </>
                  ),
                },
              ]}
            />

            <CaseStudyTools
              label="Tools & methods"
              chips={[
                "Figma",
                "Competitive analysis",
                "Data visualization",
                "Return-on-effort framing",
                "Accessibility",
              ]}
            />

            <CaseStudyLede>
              I designed the sourcing-analytics suite that turned scattered effort
              into one honest read:{" "}
              <strong>is my sourcing paying off, and what should I do next</strong>
              .
            </CaseStudyLede>
          </>
        }
      >
        {/* 01 · The problem */}
        <Stage
          id="problem"
          num="01"
          name="Meet the recruiter with twelve open roles."
          title="Meet the recruiter with twelve open roles."
        >
          <Prose>
            <p>
              She is running a dozen requisitions at once. All week she sources:
              she messages candidates, screens the replies, nudges the ones who
              go quiet, and runs sponsored jobs alongside it. It is a lot of
              effort, spread across a lot of tools and tabs.
            </p>
            <p>
              Then her manager asks the simple question:{" "}
              <strong>is it working?</strong>
            </p>
            <p>
              She can pull raw counts (messages sent, applies received), but
              nothing tells her the thing she actually needs to know. Is sourcing
              outperforming advertising, or the other way around? Where are her
              best candidates coming from? Which roles are stuck, and why? She
              reconstructs a partial answer by hand, and hopes it holds up.
            </p>
          </Prose>

          {/* The problem visual carries the fragmentation the copy describes:
              one recruiter ringed by the six tools a week of sourcing is spread
              across. The opening hero video carries "person at her desk," so this
              leads with the mess, not another portrait. */}
          <Figure
            src="/work/sourcing-analytics/ss-overwhelm.png"
            alt="A weary recruiter at the center of a ring of six tools she juggles all week: sourcing candidates on LinkedIn, posting and reviewing jobs on Indeed, tracking the pipeline in a spreadsheet, interviewing over Zoom, phone screens to identify candidates, and jotting candidate notes."
            width={2560}
            height={1960}
            caption="A week of sourcing, spread across tools and tabs, with no single read on whether any of it is working."
          />

          <Pullquote>
            She had the effort going in. She had no read on the return.
          </Pullquote>
        </Stage>

        {/* 02 · How I studied it */}
        <Stage
          id="study"
          num="02"
          name="How I studied it"
          title="A teardown of 20+ tools set the bar Indeed's reporting hadn't cleared."
        >
          <Prose>
            <p>Two things pointed me at the answer.</p>
            <p>
              First, I ran a{" "}
              <strong>
                competitive analysis of the sourcing and analytics landscape
              </strong>{" "}
              (an 87-slide teardown of eleven direct competitors, among them
              LinkedIn Recruiter, SeekOut, Gem, and HireEZ, plus seven indirect
              ones). Against each, I asked the same set of questions: what problem
              it solved, how it organized its data, how it served different roles,
              and whether its insight was contextual to the recruiter&rsquo;s
              moment or static regardless of it. That last question was the one I
              cared about most.
            </p>
            <p>
              A pattern separated the leaders from the rest. The strongest tools
              didn&rsquo;t stop at <em>what happened</em>: they tied each read to
              a next move, layered detail beneath a plain summary so it could be
              scanned or explored, and adapted to where the recruiter was in the
              cycle instead of shipping one report for everyone.{" "}
              <strong>Indeed offered no sourcing insight at all</strong>, nothing
              that told a recruiter whether the effort was working. That gap was
              the opening.
            </p>
            <p>
              Second, coming out of the 2024 analytics vision offsite, the team
              had used a <strong>return-on-effort framing</strong> to decide what
              mattered, and sourcing analytics rose to the top. That gave me the
              spine for the design: don&rsquo;t just report activity, but measure
              whether the effort was returning results, lead with the answer, and
              pair every read with a next step.
            </p>
          </Prose>

          <CompetitorLandscape
            items={[
              {
                logo: "/work/sourcing-analytics/logos/linkedin.png",
                name: "LinkedIn Recruiter",
                note: "The market default for reach and outreach. But its reports count activity, not whether the effort paid off.",
              },
              {
                logo: "/work/sourcing-analytics/logos/seekout.png",
                name: "SeekOut",
                note: "Deep talent-pool and market data. But the read on what's working is yours to assemble.",
              },
              {
                logo: "/work/sourcing-analytics/logos/gem.png",
                name: "Gem",
                note: "Strong pipeline and outreach analytics. But never the sourcing-versus-advertising call.",
              },
              {
                logo: "/work/sourcing-analytics/logos/hireez.png",
                name: "hireEZ",
                note: "Broad reach and real dashboards. But analytics sit beside the work, not inside the decision.",
              },
            ]}
            punchline="None of them answered the question a recruiter actually asks: is my sourcing paying off, and what should I do next?"
          />
        </Stage>

        {/* 03 · What I built */}
        <Stage
          id="built"
          num="03"
          name="What I built"
          title="The hard part wasn't the charts. It was deciding what a recruiter needed to know before seeing anything."
        >
          <Prose>
            <p>
              A dashboard can show everything. This one couldn&rsquo;t, or it
              would just be the tabs again, reassembled. So the real design work
              was editorial: decide the one question the recruiter actually asks,
              answer it first, and let the detail earn its place underneath. The
              suite is built around{" "}
              <strong>&ldquo;How is your recruiting performance?&rdquo;</strong>,
              and everything on the screen is downstream of that question.
            </p>
          </Prose>

          <div className="mt-xl">
            <Beat>It leads with the answer, not the data</Beat>
            <div className="mt-md">
              <Prose>
                <p>
                  The Overview opens with a plain-language performance summary and
                  a simple gauge, then flags what needs attention: candidates
                  stuck in the pipeline past five days, contacts about to expire.
                  Recommendations sit right there (adjust your jobs, send more
                  outreach, draft messages with AI), so the read comes with a next
                  step.
                </p>
              </Prose>
            </div>
          </div>

          {/* The shipped Overview shown as evidence, next to the copy that
              describes it — the payoff of "leads with the answer." Top-anchored
              window so the plain-language read stays visible without the full
              1988px page eating the scroll. Reused from the sibling study because
              it is the same shipped artifact. */}
          <WindowFigure
            src="/work/indeed-vision/sourcing-summary-shipped.png"
            alt="The shipped sourcing performance summary. It opens with a plain-language sourcing-at-a-glance read and stat tiles, then a sourcing funnel from contacts used to positive responses, a decline-reasons breakdown, and a per-recruiter performance chart measured against the team average — leading with the answer rather than raw charts."
            width={1440}
            height={1988}
            caption="The Overview as it shipped, shown from the top: a plain-language answer first, then the funnel, decline reasons, and per-recruiter performance below. Open it to see the full page."
          />

          <div className="mt-xl">
            <Beat>It makes sourcing legible against advertising</Beat>
            <div className="mt-md">
              <Prose>
                <p>
                  The Acquisition channels view compares where candidates actually
                  come from, sourcing versus advertising, with a full
                  candidate-acquisition funnel for each, channel breakdowns by
                  job, and positive-response rates. A recruiter can finally see
                  which effort is buying results. This is the detail view behind
                  the summary above.
                </p>
              </Prose>
            </div>
          </div>

          <FigureSlot
            label="Export → Figma: Acquisition channels (detail)"
            hint="The detail view from “Sourcing Analytics Detailed Report.fig”: sourcing vs. advertising, a candidate-acquisition funnel per channel, and positive-response rates. Pair it with the summary hero — before, raw counts across tabs; after, one read on whether sourcing beat advertising."
          />

          <div className="mt-xl">
            <Beat>It shows pipeline health at a glance</Beat>
            <div className="mt-md">
              <Prose>
                <p>
                  A candidates-in-pipeline breakdown by stage, plus a
                  time-in-pipeline view, surface where people are getting stuck,
                  so the recruiter knows where to intervene.
                </p>
                <p>
                  Throughout, the craft was in restraint and accessibility: dense
                  information designed to be scanned, status never carried by
                  color alone, a chart chosen to answer a question rather than to
                  decorate. This is the data-visualization work I care most
                  about: complex data made genuinely usable.
                </p>
              </Prose>
            </div>
          </div>

          <Todo>
            <p>
              <b>The tradeoff to name here:</b> the strongest version of this
              section shows one thing you cut. What did you leave <b>off</b> the
              Overview so the recruiter saw the answer first — an earlier layout, a
              metric you demoted, a view you collapsed? Add one real example, in
              your words.
            </p>
          </Todo>
        </Stage>

        {/* 04 · Where it landed */}
        <Stage
          id="landed"
          num="04"
          name="Where it landed"
          title="It shipped into Galaxy's MVP, behind Indeed's paywall."
        >
          <Prose>
            <p>
              The suite fed <strong>Project Galaxy&rsquo;s MVP</strong> and lives
              today behind the paywall in Indeed&rsquo;s paid product. The
              competitive analysis fed Galaxy too, so the teardown shaped more
              than my own screens.
            </p>
          </Prose>

          <StatBand
            stats={[
              { value: "20+", label: "tools benchmarked in the teardown" },
              {
                value: "3",
                label: "connected views: Overview, Acquisition, Pipeline",
              },
              { value: "Shipped", label: "into Project Galaxy’s MVP" },
            ]}
            note="This is a shipped, paywalled enterprise feature, so the credibility signal is “designed and shipped in a paid product,” not a public metric."
          />

          <Todo>
            <p>
              <b>High-leverage, if you can get it:</b> one metric from a Galaxy PM
              — adoption, activation, or a before/after on how fast a recruiter
              can answer &ldquo;is it working&rdquo; — plus the exact ship date.
              Source it; do not estimate it. It goes here as the single impact
              figure.
            </p>
          </Todo>
        </Stage>

        {/* 05 · In their words — real quotes, anonymized to role like indeed-vision */}
        <Stage id="words" num="05" name="In their words">
          <Quote cite="Product Manager, Sourcing Analytics (Galaxy)">
            &ldquo;We were able to successfully collaborate to determine a scope
            that balanced a small number of user questions with engineering
            feasibility, timeline and broader UX alignment. Upon initial
            circulation the approach was immediately picked up on in Job
            leadership as an exciting approach that could be adapted into the job
            details page.&rdquo;
          </Quote>

          <Quote cite="Senior Designer, teardown co-author">
            &ldquo;Marissa&rsquo;s strengths, especially her ability to think
            critically through the users&rsquo; problems, and create quality work
            that bridges knowledge gaps for users.&rdquo;
          </Quote>
        </Stage>

        {/* 06 · Reflection — DRAFT VOICE, drawn from the narrative for MK to make
            her own. Not wrapped in <Todo> so the page can publish, but this is the
            block to rewrite first. */}
        <Stage id="reflection" num="06" name="Reflection">
          <Pullquote>
            The hard part was editing a dashboard down to the one question that
            matters — then trusting the answer to lead.
          </Pullquote>

          <Prose>
            <p>
              What this taught me is that a dashboard&rsquo;s value isn&rsquo;t in
              what it can show, it&rsquo;s in what it decides not to. The tabs
              already showed everything; the design only became useful once it
              committed to one question and made everything else earn its place
              underneath. Leading with a plain-language answer, and pairing every
              read with a next step, is the move I&rsquo;d carry into any
              analytics surface.
            </p>
            <p>
              What stays with me most is watching the upstream work actually
              ship. The{" "}
              <Link
                href="/work/indeed-vision"
                className="text-rich underline decoration-1 underline-offset-[3px] hover:text-rich-hover"
              >
                vision and direction-setting
              </Link>{" "}
              could easily have stayed a deck. Seeing the strategy, the
              refinement, and the focus survive all the way into a usable
              product, one recruiters open inside a paid tool, is the payoff I
              care about most. The line from a two-year direction to a screen
              someone actually relies on is the whole reason to do the upstream
              work.
            </p>
            <p>
              Where I&rsquo;d push further next time is the recommendations. Today
              they point you at an action; the version I want simulates the
              outcome of pulling a lever before you pull it. And I&rsquo;d
              instrument the outcome sooner. The number that closes the loop on
              whether recruiters answer &ldquo;is it working&rdquo; faster is the
              one this study is still chasing.
            </p>
          </Prose>
        </Stage>
      </CaseStudyBody>
    </CaseStudyRoot>
  );
}
