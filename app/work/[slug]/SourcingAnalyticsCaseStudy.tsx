import Link from "next/link";
import {
  BulletList,
  CaseStudyBody,
  CaseStudyHeader,
  CaseStudyLede,
  CaseStudyMeta,
  CaseStudyRoot,
  Figure,
  Prose,
  Quote,
  Stage,
  VideoFigure,
} from "@/components/ui/CaseStudy";
import FigureTabs from "@/components/ui/FigureTabs";
import StudyNav from "@/components/ui/StudyNav";

/**
 * Sourcing Analytics: restaged against MK's 2026 case-study doc
 * ("2026_MK_Portfolio_Case-Studies", Indeed · Sourcing Analytics).
 *
 * This replaced an earlier draft that ran a different arc: a recruiter with
 * twelve open roles, a teardown stage, a "what I built" walkthrough, and a
 * separate quotes stage. The doc reframes the study around the TA MANAGER
 * rather than the recruiter, and around the editorial decision rather than the
 * build, so the spine here is the doc's: problem, role, decision
 * infrastructure, restraint, outcomes, reflection.
 *
 * TOOL COUNT RESOLVED: the old draft carried a "20+ tools" stat alongside prose
 * describing "eleven direct competitors plus seven indirect ones". Those are the
 * same teardown, and 11 + 7 is 18, which is what the doc says. The rounded-up
 * 20+ is gone; 18 is stated once, with the direct/indirect split beside it.
 *
 * OVERLAP WITH indeed-vision, ON PURPOSE. That study is the vision-to-direction
 * arc and treats this dashboard as its payoff. This study is the deep-dive on
 * the dashboard itself. The shipped Overview screenshot lives in
 * /work/indeed-vision/ and is reused here as the same shipped artifact.
 *
 * Server component: nothing here needs the client.
 */
const STAGES = [
  { id: "problem", num: "01", name: "The problem" },
  { id: "role", num: "02", name: "My role" },
  {
    id: "decision",
    num: "03",
    name: "Design as decision infrastructure",
    short: "Decisions",
  },
  {
    id: "restraint",
    num: "04",
    name: "Building clarity through restraint",
    short: "Restraint",
  },
  { id: "outcomes", num: "05", name: "Outcomes" },
  { id: "reflection", num: "06", name: "Reflection" },
];

export default function SourcingAnalyticsCaseStudy() {
  return (
    /* All three studies carry the SAME four classes: the shared 1224px measure,
       squared content media, no ink rule above each section, and no stage
       numbers. If you change one study here, change all three, or the set stops
       reading as one system. See globals.css for what each class does. */
    <div className="no-media-radius no-section-rule no-stage-numbers study-canvas">
    <CaseStudyRoot>
      {/* No hero in the header: it moves down under the metadata, below. */}
      <CaseStudyHeader
        badge={{ mark: "Indeed", label: "Sourcing Analytics" }}
        title="The team was doing the work. Managers couldn’t see what was working."
      />

      <CaseStudyBody
        stages={STAGES}
        lead={
          <>
            <CaseStudyMeta
              className="border-t border-b border-line pt-lg pb-lg"
              meta={[
                { label: "My role", value: "Senior UX designer" },
                {
                  /* EACH LINE MUST FIT ON ONE LINE. At md the meta is four
                     equal columns of roughly 180px, which at 0.95rem holds
                     about 22 characters. DRP's lines fit because they are
                     16 to 17 ("80% self-service", "40% fewer tickets"); these
                     were 23 and broke mid-phrase, orphaning "lift" on a line of
                     its own. Trimmed to 18 to 21.

                     What the trims cost: "lift" (the % and the Results label
                     already carry the direction). The full, unclipped versions
                     are in Outcomes, which is where a reader who wants the
                     exact claim goes.

                     "Shipped in paid MVP" was "Shipped in Galaxy MVP" until
                     2026-09-20. Project Galaxy was Indeed's internal codename
                     and meant nothing to a reader arriving cold, so every
                     reader-facing mention now names the product instead. Do
                     not reintroduce the codename.
                     It is "paid", not "Professional", for the reason above:
                     "Shipped in Professional MVP" is 27 characters and breaks
                     mid-phrase. "paid" is the load-bearing word anyway, since
                     the point is that this went into the revenue product. The
                     full claim is in the Overview and again in Outcomes.
                     If a metric ever needs more words than this, widen the
                     Results column rather than letting it wrap. */
                  label: "Results",
                  value: (
                    <>
                      60&ndash;100% engagement
                      <br />
                      3:1 positive feedback
                      <br />
                      Shipped in paid MVP
                    </>
                  ),
                },
                { label: "Scope", value: "Analytics for enterprise recruiting" },
                {
                  label: "Tools & methods",
                  value: (
                    <>
                      Competitive analysis
                      <br />
                      Dashboard IA
                      <br />
                      Data visualization
                      <br />
                      MVP design
                      <br />
                      Product strategy
                    </>
                  ),
                },
              ]}
            />

            {/* The hero, moved into the container and set directly under the
                metadata block rather than full-width in the header, matching
                DRP. */}
            <VideoFigure
              src="/work/sourcing-analytics/recruiter-hero.mp4"
              /* The doc's caption for this slot was "The plain-language read
                 managers see first, before any chart", which describes the
                 Overview SCREEN, not this clip. It promised a product artifact
                 that does not appear until stage 04, under a video of a person.
                 This one captions what is actually on screen and sets up the
                 question the lede then answers. */
              caption="A manager reading her team’s sourcing performance, looking for the one thing the activity data never told her: whether any of it was working."
            />

            <CaseStudyLede>
              I led the design of sourcing analytics that turned scattered effort
              into one usable read:{" "}
              <strong>
                is sourcing effort paying off, and what should the team do next?
              </strong>
            </CaseStudyLede>

            {/* Unnumbered opening. No heading, eyebrow, or rule: the numbered
                spine starts at "The problem". */}
            <div className="mt-3xl flex flex-col gap-xl">
              <Prose>
                <p>
                  Sourcing is the proactive part of recruiting: instead of
                  waiting for candidates to apply, recruiters go find them. It
                  can be through messaging people directly, searching resume
                  databases, or running paid outreach campaigns. It is active
                  work with a cost attached, in time and ad spend.
                </p>
                <p>
                  Talent acquisition managers were investing real time and money
                  into sourcing, but they still had to piece together whether
                  that effort was working. Recruiters could see raw activity
                  across messages, applies, screens, and pipeline movement, but
                  the signal was scattered across tools and tabs.
                </p>
                <p>
                  The work shipped in the first release of Indeed&rsquo;s paid
                  Professional subscription as three connected views, Overview,
                  Acquisition, and Pipeline.
                </p>
              </Prose>
            </div>
          </>
        }
      >
        {/* 01 · The problem */}
        <Stage
          id="problem"
          num="01"
          name="The problem"
          eyebrow="A manager rebuilding the story by hand"
        >
          <Prose>
            <p>
              A TA manager is accountable for her team&rsquo;s sourcing
              performance. As open roles multiply, so does the effort around
              them: outreach, sponsored jobs, follow-ups, candidate screens, and
              pipeline management across every recruiter.
            </p>
            <p>
              The team is busy, and the spend is real. But activity alone does
              not answer the question leadership cares about:{" "}
              <strong>is this effort producing qualified candidates?</strong>
            </p>
            <p>
              She can pull raw counts, messages sent, applies received,
              candidates contacted, but the signal is scattered across tools and
              tabs. Which channels are working? Which roles are stuck? Where
              should the team adjust? Is sourcing outperforming advertising?
              Without one clear read, she has to rebuild the story by hand.
            </p>
          </Prose>

          {/* Sits here, not in the opening: it illustrates the paragraph
              directly above it. Six tools ringing one manager IS "the signal is
              scattered across tools and tabs", and the spreadsheet label
              ("counted by hand") is the same phrase the prose lands on. */}
          <Figure
            /* zoomable={false}: an illustration, not an artifact. Everything in
               it is legible at the size it renders, so opening it larger would
               promise detail that is not there. Same call as the Betty figure
               on the vision study. Keeping it out of the gallery also means the
               lightbox arrows step only through the real product screens. */
            zoomable={false}
            src="/work/sourcing-analytics/ta-mgr-overwhelm-experience.png"
            alt="A talent acquisition manager at the center of a ring of six tools she has to reconcile by hand: LinkedIn for outbound sourcing across recruiters, Indeed for sponsored jobs and ad spend, a pipeline tracker for every open role, Zoom for candidate screens and interviews, a phone for follow-ups and candidate responses, and a spreadsheet where applies and messages are counted by hand."
            width={2560}
            height={1960}
            caption="What managers had before: activity spread across tools and tabs, with no single read on whether any of it was working."
          />

          <Quote cite="TA manager, sourcing analytics research">
            &ldquo;We&rsquo;ve never used any metrics but I would like to because
            we aren&rsquo;t doing anything in an efficient way. If leadership
            were to ask I wouldn&rsquo;t be able to provide them with
            anything.&rdquo;
          </Quote>

          <Prose>
            <p>
              The design challenge was not just to build another dashboard. It
              was to edit a dense analytics space down to the few decisions that
              mattered most.
            </p>
          </Prose>
        </Stage>

        {/* 02 · My role */}
        <Stage
          id="role"
          num="02"
          name="My role"
          eyebrow="Deciding what to leave out"
        >
          <Prose>
            <p>
              I shaped the product from early framing through MVP design,
              defining the dashboard structure, clarifying the core user
              questions and jobs to be done, and mapping the relationship between
              summary and diagnostic views.
            </p>
            <p>
              Every team could point to a metric worth showing. My contribution
              was deciding which ones actually helped a manager act, not just
              which were available.
            </p>
          </Prose>
        </Stage>

        {/* 03 · Design as decision infrastructure */}
        <Stage
          id="decision"
          num="03"
          name="Design as decision infrastructure"
          eyebrow="One question, three jobs"
        >
          <Prose>
            <p>
              The strongest competitive products did more than report activity.
              They helped users understand what happened, why it happened, and
              what to do next.
            </p>
          </Prose>

          {/* MK's text, verbatim. The CompetitorLandscape that used to sit here
              (four logos plus an "across 18 tools" punchline) is REMOVED: her
              spec for this section runs prose, list, prose, image, and the
              teardown injected a block of copy that was not in it. The 18-tool
              figure still appears once, in Reflection. */}
          <Prose>
            <p>
              That became the spine of the design. I framed the analytics around
              one question: <strong>is sourcing paying off?</strong> And then
              gave each view a clear job:
            </p>
          </Prose>

          <BulletList
            items={[
              <>
                <strong>Overview:</strong> the plain-language performance read
              </>,
              <>
                <strong>Acquisition:</strong> channel comparison across sourcing
                and advertising
              </>,
              <>
                <strong>Pipeline:</strong> deeper diagnosis of candidate movement
                and quality
              </>,
            ]}
          />

          <Prose>
            {/* The two questions carry weight, not italics. They still need a
                typographic break of some kind: without one the sentence reads
                as a run-on, since both halves are themselves questions ("from
                what metrics can we show to what decision does this screen need
                to support"). */}
            <p>
              I moved the team from <strong>what metrics can we show?</strong>{" "}
              to <strong>what decision does this screen need to support?</strong>
            </p>
          </Prose>

          {/* Tabs, because the list directly above gives each view its own job,
              and tabs let a reader compare them the way the product does:
              switch, don't scroll. Same primitive as the DRP study.

              TWO tabs, and neither is Acquisition or Pipeline. Both of those
              are named in the list above but NOT shown: an Acquisition tab
              using the job performance report was added and then removed at
              MK's direction, and Pipeline has no export at all. The tabs show
              the shipped summary and the report behind it; the other two views
              are described in the prose and left unillustrated rather than
              filled with a screenshot that does not depict them. */}
          <FigureTabs
            label="The views, and the job each one does"
            tabs={[
              {
                label: "Overview",
                src: "/work/sourcing-analytics/ss-overview.png",
                alt: "Smart Sourcing overview. A top insights panel reads “Team's positive response rate lagged the market”, comparing 21.7% against a 24.5% market average, with a “View messaging tips” action beside it. Stat tiles for contacts used, contacts expiring, positive response rate, and top-performing recruiter sit to the right. Below: a sourcing funnel broken down by recruiter, decline reasons as a ring chart, and a positive-response-rate scatter plotting each recruiter against contacts used.",
                /* 1600x2792, downscaled from a 2880x5026 export. These numbers
                   are not just metadata: the lightbox's zoomed state renders at
                   1:1 natural pixels (Lightbox.tsx sets width/height inline),
                   so a 2880-wide source zoomed to 2880 CSS px and was unusable.
                   1600 is still ~2x the ~792px column this renders in, so it
                   stays sharp on a retina display, and it cut the file by a
                   third. Keep new screenshots at roughly this scale. */
                width: 1600,
                height: 2792,
                caption:
                  "Overview: the read and the next move in the same glance. The insight names what happened and why, and the action sits beside it rather than in a report somewhere else. Charts sit underneath, not in front. Open it to see the full page.",
              },
              {
                /* Labelled for what the product calls this screen ("Detailed
                   report"), not "Pipeline". The list above defines Pipeline as
                   deeper diagnosis of candidate MOVEMENT and QUALITY; this is
                   recruiter performance over time, which is a different cut.
                   Rename it if that mapping is wrong. */
                label: "Detailed report",
                src: "/work/sourcing-analytics/ss-detail.png",
                alt: "Smart Sourcing detailed report. A Summary and Detailed report tab pair sits under “Analytics report: Candidate sourcing”, with a date range, a filter row, and a metrics-over-time line chart comparing two periods, its tooltip reading 308 contacts against 228 in the prior window. Below it, a table of 17 recruiters listing subscription type, response rate, responses, positive response rate, positive responses, and apply starts.",
                width: 1600,
                height: 1962,
                caption:
                  "The detailed report: the same question at full depth, per recruiter and over time. This is where the diagnosis moved so the Overview could stay on performance, urgency, and action.",
              },
            ]}
          />
        </Stage>

        {/* 04 · Building clarity through restraint */}
        <Stage
          id="restraint"
          num="04"
          name="Building clarity through restraint"
          eyebrow="Interpretation before evidence"
        >
          {/* MK's text, verbatim. This replaced a LabeledList whose three
              labels ("Lead with the read", "Compare by default", "Recommend in
              place") were invented to fit the primitive. Her three items are
              one sentence broken across lines, so they are a plain list and the
              explanation follows as prose. */}
          <Prose>
            <p>
              The hardest part was keeping the dashboard from becoming another
              dense analytics tab. Three decisions kept it from happening:
            </p>
          </Prose>

          <BulletList
            items={[
              "Interpretation before evidence,",
              "Comparison as the default frame, and",
              "Recommendations placed at the point of decision, not buried in a report",
            ]}
          />

          <Prose>
            <p>
              I led with interpretation before evidence: a plain-language
              performance read first, then charts and supporting details
              underneath.
            </p>
            <p>
              I made channel comparison central. Sourcing could not be evaluated
              in isolation; managers needed to understand whether it was
              returning value relative to the other effort they were already
              funding.
            </p>
            <p>
              I placed recommendations close to the performance signal, so the
              next move appeared at the same moment as the problem. Deeper
              diagnosis moved out of the first read and into supporting views,
              keeping the Overview focused on performance, urgency, and action.
            </p>
          </Prose>

        </Stage>

        {/* 05 · Outcomes */}
        <Stage
          id="outcomes"
          num="05"
          name="Outcomes"
          eyebrow="What made TA managers come back"
        >
          {/* MK's text, verbatim. The stat band that used to sit under this is
              gone: the three views and both figures are now stated in the
              paragraph itself, so a band repeating them was the "same metric
              twice" problem rather than a summary of it. */}
          <Prose>
            <p>
              <strong>
                Up to 2x weekly engagement and a product direction that moved
                beyond the MVP.
              </strong>
            </p>
            <p>
              By deciding what not to show, I kept the first read to the few
              things that mattered, which is what made managers trust and return
              to the dashboard instead of treating it like another report to
              decode. It shipped in the first release of Indeed&rsquo;s paid
              Professional subscription as three connected views: Overview,
              Acquisition, and Pipeline.{" "}
              <strong>
                Weekly engagement increased 60&ndash;100%, and feedback ran 3:1
                positive to negative.
              </strong>
            </p>
          </Prose>

          <Quote cite="TA manager, sourcing analytics research">
            &ldquo;It&rsquo;s so important because we need to know the time and
            effort we&rsquo;ve put into hiring these individuals.&rdquo;
          </Quote>

          <Prose>
            <p>
              That need, proving sourcing&rsquo;s effort to leadership, is part
              of what moved sourcing analytics from a free offering into
              Indeed&rsquo;s Professional subscription strategy.
            </p>
            <p>
              The direction also traveled beyond the MVP, turning the work from a
              feature-level dashboard into a broader product signal.
            </p>
          </Prose>

          <Quote cite="Senior Product Manager, Sourcing Analytics">
            &ldquo;Thanks to Marissa&rsquo;s design thinking, we were able to
            determine a scope that balanced a small number of user questions with
            engineering feasibility, timeline and broader UX alignment. Upon
            initial circulation, the approach was immediately picked up on in Job
            leadership as an exciting approach that could be adapted into the job
            details page.&rdquo;
          </Quote>

          <Prose>
            <p>
              Indeed&rsquo;s mission is to help people get jobs. Sourcing is the
              part of recruiting where effort is easiest to spend in the wrong
              place, and a manager who can see which channels return qualified
              candidates can move her team&rsquo;s hours toward the ones that do.
              Not more activity. Better aimed activity.
            </p>
          </Prose>
        </Stage>

        {/* 06 · Reflection */}
        <Stage
          id="reflection"
          num="06"
          name="Reflection"
          eyebrow="Editing it was the fast part. Defending it wasn’t."
        >
          {/* MK's text, verbatim, four paragraphs. The only markup liberty is
              the link on "analytics offsite", which changes no words. */}
          <Prose>
            <p>
              This worked because I committed design to a point of view. An
              analytics dashboard&rsquo;s value lies not in what it shows, but
              in the decisions it supports.
            </p>
            <p>
              Getting to this idea was quicker than it seems. Two factors came
              together. First, I looked at 18 sourcing and analytics tools. The
              best ones used simple language, solid evidence, and clear next
              steps. The weaker tools either tracked activity or provided static
              reports. Second, the{" "}
              <Link href="/work/indeed-vision">analytics offsite</Link> had
              already agreed that return on effort was the key to deciding what
              mattered. We based our direction on data, not intuition.
            </p>
            <p>
              The challenge came afterward. Each team had metrics they wanted to
              show, and every request made sense on its own. Nobody was wrong.
              But if the Overview became a place for everyone&rsquo;s evidence,
              we&rsquo;d end up with another dense report, which we aimed to
              avoid. So, we had to keep asking: what decision does this screen
              support? Adding a metric takes one meeting. Keeping it out takes
              many.
            </p>
            <p>
              Next time, I would measure whether managers could answer,
              &ldquo;Is sourcing working?&rdquo; faster, with fewer tabs and
              less manual digging. The research showed what managers needed.
              What I never proved was that the first read changed how quickly
              they could answer.
            </p>
          </Prose>
        </Stage>
        <StudyNav currentSlug="sourcing-analytics" />
      </CaseStudyBody>
    </CaseStudyRoot>
    </div>
  );
}
