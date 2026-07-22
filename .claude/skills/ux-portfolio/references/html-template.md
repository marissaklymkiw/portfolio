# HTML Template

The design system for case study output. Read this before generating any case study
HTML. Output is one self-contained .html file (inline CSS, no external assets except
images the user provides) saved to the project's `drafts/` folder.

Keep it clean, editorial, and fast to skim. Content earns attention, not chrome.

## CSS variables

Define these once in `:root` and use them everywhere. Never hardcode a color, space,
or size that a token already covers.

```css
:root {
  /* Color */
  --ink:        #1a1a1a;   /* body text */
  --ink-soft:   #555;      /* secondary text, captions */
  --line:       #e6e6e6;   /* hairlines, borders */
  --bg:         #ffffff;   /* page background */
  --bg-soft:    #f7f7f5;   /* section / card fill */
  --accent:     #2f6bff;   /* links, active states, one accent only */
  --accent-ink: #12245c;   /* accent text on light */
  --good:       #1f8a5b;   /* positive metric / shipped tag */
  --warn:       #b26b00;   /* concept / vision tag */

  /* Type scale (1.25 ratio) */
  --f-xs: 0.75rem; --f-sm: 0.875rem; --f-base: 1.0625rem;
  --f-lg: 1.33rem; --f-xl: 1.66rem; --f-2xl: 2.4rem; --f-3xl: 3.4rem;

  /* Space scale */
  --s-1: 4px; --s-2: 8px; --s-3: 16px; --s-4: 24px;
  --s-5: 40px; --s-6: 64px; --s-7: 96px; --s-8: 140px;

  /* Layout */
  --measure: 68ch;   /* reading width */
  --wide:    1080px; /* full content width */
  --radius:  10px;
}
```

## Typography

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
  color: var(--ink); background: var(--bg);
  font-size: var(--f-base); line-height: 1.6; margin: 0;
  -webkit-font-smoothing: antialiased;
}
h1 { font-size: var(--f-3xl); line-height: 1.05; letter-spacing: -0.02em; margin: 0; }
h2 { font-size: var(--f-2xl); line-height: 1.15; letter-spacing: -0.01em; margin: var(--s-7) 0 var(--s-3); }
h3 { font-size: var(--f-lg); margin: var(--s-5) 0 var(--s-2); }
p, li { max-width: var(--measure); }
a { color: var(--accent); text-decoration: none; border-bottom: 1px solid transparent; }
a:hover { border-bottom-color: currentColor; }
strong { font-weight: 650; }  /* one bold phrase per paragraph */
```

Rules: one typeface, two weights. Headers use the Action + Outcome pattern from the
creation guide. Body copy never exceeds `--measure`. Full-width elements (images,
outcomes band) may span `--wide`.

## Component reference

Copy-paste blocks. Each is self-contained and uses only the tokens above.

**Nav** — minimal, sticky, name + back link.
```html
<nav class="nav"><a href="#" class="nav-home">Marissa Klymkiw</a>
  <a href="#work">All work</a></nav>
```
```css
.nav { position: sticky; top: 0; background: var(--bg); border-bottom: 1px solid var(--line);
  display: flex; justify-content: space-between; padding: var(--s-3) var(--s-4);
  font-size: var(--f-sm); z-index: 10; }
.nav-home { font-weight: 650; border: 0; }
```

**Badge** — small kicker above the title (discipline / company / year).
```html
<span class="badge">Product Design · Guest Access · 2025</span>
```
```css
.badge { font-size: var(--f-xs); letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--ink-soft); }
```

**Title block** — badge, h1, one-line subtitle.
```html
<header class="title"><span class="badge">...</span>
  <h1>Letting guests in without making them sign up</h1>
  <p class="sub">Cut account-creation drop-off by giving guests a real way in.</p>
</header>
```
```css
.title { max-width: var(--wide); margin: var(--s-7) auto var(--s-5); padding: 0 var(--s-4); }
.title .sub { font-size: var(--f-xl); color: var(--ink-soft); line-height: 1.3; }
```

**Teaser** — the 4-panel above-the-fold grid (problem, role, outcome, visual).
```html
<section class="teaser">
  <div class="panel"><h4>Problem</h4><p>Guests couldn't reach shared accounts.</p></div>
  <div class="panel"><h4>Role</h4><p>Sole designer · 4 months · shipped with 2 eng.</p></div>
  <div class="panel"><h4>Outcome</h4><p class="metric">64 &rarr; 78% completion</p></div>
  <figure class="panel panel-visual"><img src="hero.png" alt="Before and after flow"></figure>
</section>
```
```css
.teaser { max-width: var(--wide); margin: 0 auto var(--s-7); padding: 0 var(--s-4);
  display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-3); }
.panel { background: var(--bg-soft); border-radius: var(--radius); padding: var(--s-4); }
.panel h4 { font-size: var(--f-xs); text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--ink-soft); margin: 0 0 var(--s-2); }
.panel-visual { grid-column: 1 / -1; padding: 0; overflow: hidden; }
.panel-visual img { width: 100%; display: block; }
.metric { font-size: var(--f-lg); font-weight: 650; color: var(--good); }
```

**Status tags** — label shipped vs concept vs vision honestly.
```html
<span class="tag tag-shipped">Shipped</span>
<span class="tag tag-concept">Concept</span>
```
```css
.tag { font-size: var(--f-xs); font-weight: 650; padding: 2px var(--s-2); border-radius: 999px;
  text-transform: uppercase; letter-spacing: 0.05em; }
.tag-shipped { background: #e7f5ee; color: var(--good); }
.tag-concept { background: #fbf0dd; color: var(--warn); }
```

**Callout** — a constraint, tradeoff, or aside.
```html
<aside class="callout"><strong>The constraint:</strong> legal blocked storing guest data
beyond the session, so the flow had to work with zero persistence.</aside>
```
```css
.callout { max-width: var(--measure); background: var(--bg-soft);
  border-left: 3px solid var(--accent); border-radius: 0 var(--radius) var(--radius) 0;
  padding: var(--s-3) var(--s-4); margin: var(--s-4) 0; }
```

**Blockquote** — a verified quote from a real person about this project.
```html
<blockquote class="quote">Guests finally stopped emailing us for help.
  <cite>Support lead, post-launch retro</cite></blockquote>
```
```css
.quote { max-width: var(--measure); font-size: var(--f-lg); line-height: 1.4;
  border-left: 0; margin: var(--s-5) 0; padding: 0; }
.quote cite { display: block; font-size: var(--f-sm); font-style: normal;
  color: var(--ink-soft); margin-top: var(--s-2); }
```

**Image slot** — full-width figure with a transformation caption.
```html
<figure class="shot"><img src="flow.png" alt="Old 7-step flow vs new 3-step flow">
  <figcaption>Before: seven screens to reach a shared account. After: three.</figcaption>
</figure>
```
```css
.shot { max-width: var(--wide); margin: var(--s-5) auto; padding: 0 var(--s-4); }
.shot img { width: 100%; border-radius: var(--radius); display: block; }
.shot figcaption { font-size: var(--f-sm); color: var(--ink-soft); margin-top: var(--s-2); }
```

**Outcomes band** — the second and final metric placement.
```html
<section class="outcomes">
  <div><span class="big">78%</span><span>guest checkout completion, up from 64%</span></div>
  <div><span class="big">-31%</span><span>support tickets on access, 90 days post-launch</span></div>
</section>
```
```css
.outcomes { background: var(--bg-soft); margin: var(--s-7) 0; padding: var(--s-6) var(--s-4);
  display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--s-5);
  text-align: center; }
.outcomes .big { display: block; font-size: var(--f-2xl); font-weight: 700; color: var(--good); }
.outcomes span:last-child { font-size: var(--f-sm); color: var(--ink-soft); }
```

**Reflection** — short, honest close.
```html
<section class="reflection"><h2>What I'd do differently</h2>
  <p>I validated the flow with power users first. If I ran it again I'd start with
  first-time guests, since they hit the wall hardest.</p></section>
```
```css
.reflection { max-width: var(--wide); margin: 0 auto; padding: 0 var(--s-4); }
```

**Footer** — contact and next project.
```html
<footer class="foot"><a href="mailto:marissa.klymkiw@gmail.com">Get in touch</a>
  <a href="#next">Next project &rarr;</a></footer>
```
```css
.foot { border-top: 1px solid var(--line); margin-top: var(--s-7);
  padding: var(--s-5) var(--s-4); display: flex; justify-content: space-between;
  font-size: var(--f-sm); max-width: var(--wide); margin-left: auto; margin-right: auto; }
```

## Responsive styles

```css
@media (max-width: 720px) {
  :root { --f-3xl: 2.3rem; --f-2xl: 1.8rem; --s-7: 64px; }
  .teaser { grid-template-columns: 1fr; }
  .foot { flex-direction: column; gap: var(--s-2); }
}
```

Rules: single breakpoint at 720px unless the content needs more. Teaser collapses to
one column, type scales down, touch targets stay at least 44px, images never overflow.

## Output checklist

Before presenting the file:

- Single self-contained .html file; CSS in one `<style>` block in the head.
- All colors, spacing, and sizes come from tokens; nothing hardcoded.
- Metric appears exactly twice (teaser + outcomes band), each sourced.
- Every image has meaningful alt text and a transformation caption.
- Concept and vision work carries a status tag; nothing unshipped implied as shipped.
- Headers follow Action + Outcome and read as a story on their own.
- No em dashes, no jargon, no AI tells (see creation-guide.md tone guide).
- Renders cleanly at 375px and 1280px.
- Saved to the project's `drafts/` folder, never as markdown.
