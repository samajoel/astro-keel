# Implementation Plan: Portfolio UX and Professional Positioning Refinement

**Branch**: `003-portfolio-ux-refinement` | **Date**: 2026-08-14 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/003-portfolio-ux-refinement/spec.md`

---

## Summary

Refine the existing Astro Keel portfolio to surface Joel Samaniego's value more
clearly and efficiently for recruiters, technical leads, and AI/cloud hiring professionals.
The approach adds a Featured Work section to the homepage, restructures the Azure case study
with progressive disclosure layers, expands the ER diagram to all 10 verified entities,
redesigns the architecture SVG for readability, and tightens the About page structure —
all using existing CSS, tokens, layout primitives, and vanilla JS with no new dependencies.

---

## Technical Context

**Language/Version**: TypeScript (Astro frontmatter), MDX, CSS3, vanilla JavaScript

**Primary Dependencies**: Astro 7, @astrojs/mdx, Zod (content schema) — all existing

**Storage**: File-based (MDX content files, static SVG, public assets) — no database

**Testing**: Manual validation per quickstart.md; `npm run build` is the automated gate

**Target Platform**: GitHub Pages via Astro static build (`base: '/astro-keel'`)

**Project Type**: Static site / personal portfolio

**Performance Goals**: Maintain Lighthouse scores; no new JS bundles; no render-blocking resources

**Constraints**: No new npm packages (FR-060). All CSS uses existing custom property tokens (FR-059).
D3 and other visualization libraries are explicitly rejected (Constitution Principle XI).

**Scale/Scope**: 7 pages; 1 case study; 1 works index; 1 about page; 1 homepage.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|-----------|-------|--------|
| I. Architectural Preservation | No new layouts, components, or collection types | ✅ PASS |
| II. Configuration Over Code | Schema change minimal (1 optional field); CSS additions not rewrites | ✅ PASS |
| III. Reuse Existing Infrastructure | All layouts, styles, collections, SEO, responsive patterns preserved | ✅ PASS |
| IV. No Backend/Database | Static site only; no API endpoints added | ✅ PASS |
| V. Maintain Performance/A11y/SEO/Responsive | New elements use existing tokens and breakpoints | ✅ PASS |
| VI. Simple and Professional | Goal is clarity and evidence, not decoration | ✅ PASS |
| VII. Content Collections | Works in `works` collection; blog in `blog` collection | ✅ PASS |
| VIII. Shipping Speed > Feature Expansion | Refinement only; no new features beyond spec | ✅ PASS |
| IX. Build Must Pass | npm run build is required in tasks | ✅ PASS |
| X. Don't Modify Working Functionality | No changes to nav, search, RSS, OG, dark-mode toggle | ✅ PASS |
| XI. No D3, Keep Dependencies Minimal | SVG + vanilla JS only; no new libraries | ✅ PASS |
| XII. Production-Ready Quickly | Incremental content changes; existing build system | ✅ PASS |

**Post-design re-check**: The one schema addition (`liveUrl`) is backward-compatible (optional field).
The placeholder SVG in `public/` is a static asset requiring no processing. No violations.

---

## Project Structure

### Documentation (this feature)

```text
specs/003-portfolio-ux-refinement/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── checklists/
│   └── requirements.md  # All [x] — spec passed
└── tasks.md             # Phase 2 output (/speckit-tasks command)
```

### Source Code (files to change)

```text
src/
├── content.config.ts           # Add liveUrl field to works schema
├── content/works/
│   └── azure-agentic-case-study.mdx  # Major content restructure
├── pages/
│   ├── index.astro             # Homepage restructure
│   ├── about/index.astro       # About page restructure
│   └── works/index.astro       # Enhanced work card
└── styles/
    └── global.css              # Add diagram-scroll, featured-work, at-a-glance CSS

public/
├── images/
│   └── azure-agentic-placeholder.svg  # NEW: polished project visual placeholder
└── scripts/
    └── azure-agentic-diagram.js       # Touch interaction refinement (minor)
```

**Structure Decision**: Single project. All changes are in-place edits to existing files,
plus one new public asset. The `works` content collection schema gains one optional field.

---

## Complexity Tracking

No constitution violations to justify.

---

## Implementation Phases

### Phase 1 — Setup (schema and asset foundation)

All subsequent content and template work depends on the schema change and placeholder
image being in place first.

**T001** — Add `liveUrl` field to works schema in `src/content.config.ts`

```typescript
// Inside the works schema z.object({...}):
liveUrl: z.string().url().optional(),
```

**T002** — Create `public/images/azure-agentic-placeholder.svg`

A 720×480 SVG with dark background, project title, and a schematic of the key
components (frontend, API, agent, SQL). Must look intentional. Fixed dark color palette
(not CSS variables — static file, must work in both light/dark modes without JS).

Visual concept:
- Background: dark charcoal (#1a1e2a)
- Grid/dot pattern: subtle (#ffffff08)
- Four component boxes (labelled: React, FastAPI, AI Agent, Azure SQL) connected by lines
- Project title: "Agentic Data Application" in white text
- Subtitle: "Azure · Python · Microsoft Foundry" in muted text
- Accent color (#4f90d9) borders on component boxes (neutral Azure-adjacent blue)

**T003** — Add `liveUrl` to `azure-agentic-case-study.mdx` frontmatter

```yaml
liveUrl: 'https://app-agentic-web-dev.thankfulfield-cc53b9b6.eastus.azurecontainerapps.io'
```

---

### Phase 2 — Global CSS Additions

**T004** — Add diagram scroll container and new block classes to `src/styles/global.css`

Additions (append to end of file, before the final `@media` block or at end):

```css
/* Diagram containers — horizontal scroll on narrow viewports */
.diagram-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.diagram-scroll svg {
  min-width: 600px;
}
.diagram-scroll.er-diagram svg {
  min-width: 900px;
}

/* Featured Work block — 2-column: image | content */
.featured-work {
  display: grid;
  grid-template-columns: minmax(10rem, 0.45fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: start;
  border: var(--hairline);
  background: var(--color-bg);
}
.featured-work-image {
  display: block;
  width: 100%;
  height: auto;
  border-right: var(--hairline);
  background: var(--color-soft);
}
.featured-work-content {
  padding: clamp(1.5rem, 3vw, 2.25rem);
}
.featured-work-content h3 {
  max-width: 20ch;
  margin-bottom: calc(var(--baseline) * 0.5);
}
.featured-work-status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: calc(var(--baseline) * 0.5);
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
}
.featured-work-status::before {
  content: '';
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--color-accent);
}

/* At-a-Glance block in case study */
.at-a-glance {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1px;
  background: var(--color-line);
  border: var(--hairline);
  margin-block: calc(var(--baseline) * 1.5);
}
.at-a-glance dt {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.35rem;
}
.at-a-glance dd {
  margin: 0;
  color: var(--color-text);
  font-size: 0.88rem;
  line-height: 1.5;
}
.at-a-glance > div {
  padding: clamp(1rem, 2.5vw, 1.5rem);
  background: var(--color-bg);
}

/* Work status badge */
.work-status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
}
.work-status::before {
  content: '';
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--color-accent);
}

/* Contribution blocks in case study */
.contribution-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  gap: 1px;
  background: var(--color-line);
  border: var(--hairline);
  margin-block: calc(var(--baseline) * 1.5);
}
.contribution-block {
  padding: clamp(1.25rem, 3vw, 2rem);
  background: var(--color-bg);
}
.contribution-block h4 {
  margin-top: 0;
  margin-bottom: calc(var(--baseline) * 0.75);
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-muted);
}
.contribution-category {
  margin-bottom: var(--baseline);
}
.contribution-category h5 {
  margin: 0 0 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-accent);
}
.contribution-category ul {
  margin: 0;
  padding-left: 1rem;
  color: var(--color-muted);
  font-size: 0.88rem;
}

/* Key decision sequence */
.decision-flow {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-block: calc(var(--baseline) * 1.5);
  border: var(--hairline);
}
.decision-step {
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1rem;
  padding: 1rem clamp(1rem, 2vw, 1.5rem);
  background: var(--color-bg);
  border-bottom: var(--hairline);
}
.decision-step:last-child {
  border-bottom: 0;
}
.decision-step-label {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  padding-top: 0.2rem;
}
.decision-step-body {
  color: var(--color-muted);
  font-size: 0.9rem;
  line-height: 1.6;
}
.decision-step-body strong {
  color: var(--color-text);
}

/* Troubleshooting structured items */
.troubleshoot-item {
  margin-block: calc(var(--baseline) * 1.25);
  border: var(--hairline);
}
.troubleshoot-row {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  gap: 0.75rem 1rem;
  padding: 0.75rem clamp(1rem, 2vw, 1.5rem);
  border-bottom: var(--hairline);
}
.troubleshoot-row:last-child {
  border-bottom: 0;
}
.troubleshoot-label {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  padding-top: 0.2rem;
}
```

Mobile additions (inside `@media (max-width: 760px)` block or a new block):

```css
@media (max-width: 760px) {
  .featured-work {
    grid-template-columns: 1fr;
  }
  .featured-work-image {
    border-right: 0;
    border-bottom: var(--hairline);
  }
  .contribution-grid {
    grid-template-columns: 1fr;
  }
  .decision-step {
    grid-template-columns: 1fr;
  }
  .troubleshoot-row {
    grid-template-columns: 1fr;
  }
}
```

---

### Phase 3 — US3: Homepage-to-Project Journey (P3)

Blocks featured work discovery. Must complete before US1 homepage tasks.

**T005** — Restructure `src/pages/index.astro`: Featured Work section

After the hero section and before the Areas of Focus section, add a `.featured-work`
block that reads `works[0]` (the top-sorted work — Azure case study):

```astro
{works.length > 0 && (
  <section class="section" aria-labelledby="featured-work-heading" style="border-top: var(--hairline)">
    <div class="section-heading" style="margin-bottom: calc(var(--baseline) * 1.5)">
      <p class="eyebrow">Featured Work</p>
      <h2 id="featured-work-heading">Built and deployed.</h2>
    </div>
    <div class="featured-work">
      <img
        class="featured-work-image"
        src={withBase('/images/azure-agentic-placeholder.svg')}
        alt="Architecture schematic for the Agentic Data Application — showing React frontend, FastAPI backend, AI agent, and Azure SQL components"
        width="720"
        height="480"
        loading="lazy"
      />
      <div class="featured-work-content">
        <span class="featured-work-status">Deployed</span>
        <h3><a href={withBase(`/works/${works[0].id}/`)}>{works[0].data.title}</a></h3>
        <p>{works[0].data.description}</p>
        <ul class="tag-list" aria-label="Key technologies">
          {['Microsoft Foundry','Azure Container Apps','Terraform','Python','Azure SQL','AI Agents'].map(tag => (
            <li>{tag}</li>
          ))}
        </ul>
        <div class="action-row" style="margin-top: var(--baseline)">
          <a class="button" href={withBase(`/works/${works[0].id}/`)}>View Case Study</a>
          {works[0].data.liveUrl && (
            <a class="text-link" href={works[0].data.liveUrl} target="_blank" rel="noopener noreferrer">
              View Live Project ↗
            </a>
          )}
        </div>
      </div>
    </div>
  </section>
)}
```

**T006** — Update `src/pages/works/index.astro`: Enhanced work card

Add image, status badge, and action links to each work card. The `.work-card` CSS
already supports 3-column layout; use a `.work-card-enhanced` approach or update the
markup within the existing `.work-card` to use image + title/description + links.

Specifically, update the work card to include:
- `<img>` placeholder with descriptive alt
- `.work-status` badge showing "Deployed"
- "View Case Study" button + live demo link
- Technologies as a `.tag-list`

The current 3-column `.work-card` grid becomes: image | title+description | actions+tags.

---

### Phase 4 — US1: Recruiter First Impression (P1)

**T007** — Restructure `src/pages/index.astro`: Hero and content order

**Hero changes**:
- Remove current H1: "Building AI solutions, cloud systems, and automation for real-world problems."
- Remove current eyebrow: "Portfolio · AI Solutions · Cloud"
- New H1: "I build AI solutions."
- New eyebrow: "Joel Samaniego"
- New lead: "Cloud, agents and automation applied to real business problems."
- New action-row: primary button "View selected work" → `withBase('/works/')`, then GitHub and LinkedIn text-links (not an email link)

**Areas of Focus section**:
- Keep `.split-overview` CSS class and layout
- Change H2 from "AI Solutions · Cloud · Automation" to "Areas of Focus" or a variant that does not repeat the hero eyebrow
- Update three feature-list articles per spec section 7:
  1. "AI & Agents" — "Building practical applications with generative AI, agents, LLMs and tool-based workflows."
  2. "Cloud Solutions" — "Deploying and integrating cloud-native services, infrastructure and data components."
  3. "Automation" — "Turning repetitive or operational problems into practical automated solutions."

**Technical Writing section** (replaces the current Blog section):
- When `posts.length === 0`: show a subtle placeholder ("Technical deep dives coming soon.") inside an `empty-state.compact` div — not the full section heading
- When `posts.length > 0`: show the existing `note-list` rendering

**About/Contact section** (new, after Technical Writing):
```astro
<section class="section prose-grid about-closing" aria-label="About and contact">
  <div>
    <p class="eyebrow">About</p>
    <h2>Problems, solutions, and shipping.</h2>
  </div>
  <div class="prose-stack">
    <p>
      I combine understanding of real problems with technical execution across AI,
      cloud, and automation — from requirement to deployment.
    </p>
    <div class="action-row">
      <a class="button" href={withBase('/about/')}>About</a>
      <a class="text-link" href="https://www.linkedin.com/in/joel-mateo-samaniego/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      <a class="text-link" href="mailto:samajoel@icloud.com">Email</a>
    </div>
  </div>
</section>
```

**Content order enforcement**: Hero → Featured Work (T005) → Areas of Focus → Technical Writing → About/Contact.

---

### Phase 5 — US2: Technical Peer Case Study (P2)

This is the largest single task. The MDX file `src/content/works/azure-agentic-case-study.mdx`
requires substantial restructuring.

**T008** — Case study MDX: Hero block restructure (FR-016/017/019)

Replace the current `<div class="work-attribution">` and `<p><span class="work-status">` block with:

```mdx
<div class="work-hero-meta">
  <span class="work-status">Deployed · Live</span>
  <p class="work-role-line">Cloud Deployment · Infrastructure · Modernization · Troubleshooting</p>
  <p class="work-hero-links">
    <a href="https://app-agentic-web-dev.thankfulfield-cc53b9b6.eastus.azurecontainerapps.io" target="_blank" rel="noopener noreferrer">View Live Project ↗</a>
  </p>
</div>

<p class="work-attribution">
  <strong>Attribution:</strong> This project is based on Microsoft's Agentic Applications for
  Unified Data Foundation solution accelerator; my work focused on modernization, Terraform
  infrastructure management, Azure deployment, troubleshooting, integration changes and
  end-to-end validation.
</p>
```

**T009** — Case study MDX: At-a-Glance block (FR-018)

Add immediately after the attribution paragraph, before the Problem heading:

```mdx
<dl class="at-a-glance">
  <div><dt>What was built</dt><dd>Modernized and deployed Microsoft's agentic enterprise-data accelerator on Azure</dd></div>
  <div><dt>Role</dt><dd>Cloud Deployment · Infrastructure · Modernization · Troubleshooting</dd></div>
  <div><dt>Status</dt><dd>Deployed · Live</dd></div>
  <div><dt>Key technologies</dt><dd>Microsoft Foundry · Azure Container Apps · Terraform · Python · Azure SQL</dd></div>
  <div><dt>Validation</dt><dd>11/11 scenarios passed</dd></div>
</dl>
```

**T010** — Case study MDX: My Contribution restructure (FR-020/021/022)

Replace the current flat list with two distinct visual blocks using `.contribution-grid`:
- Left block: "Microsoft provided" (shorter list)
- Right block: "My engineering work" in 4 labeled categories (Application, Infrastructure, Security & Data, Engineering & Validation)

**T011** — Case study MDX: Key Architectural Decision section (FR-023/024/025)

Add a new `## Key Architectural Decision` section between My Contribution and Architecture using `.decision-flow` layout with 5 labeled stages.

**T012** — Case study MDX: Architecture SVG redesign (FR-026/027/028/029/030/031/032)

Redesign the SVG layout for both simplified and full views:

- Simplified viewBox: `0 0 900 520`
- Arrange nodes in clear horizontal bands (User → Frontend → Backend → Agent layer → SQL)
- Supporting components (Cosmos DB, Managed Identity, Terraform) at right/bottom with secondary visual weight
- Response path: dashed upward arrow on right side of the main flow
- Wrap in `<div class="diagram-scroll">` for mobile horizontal scroll

Full view additions: Chat Orchestrator, Microsoft Foundry, ACR, ACA Environment, Log Analytics, MS Fabric (inactive).

Node sizing: minimum 120px wide × 44px tall for all primary nodes. Support nodes: 100px × 40px.

**T013** — Case study MDX: ER diagram expansion to 10 entities (FR-033/034/035/036/037/038)

Expand viewBox to `0 0 1000 560`. Add two missing entities:

1. `SalesLT.ProductDescription` (x≈720, y≈10): ProductDescriptionID (PK), Description
2. `SalesLT.ProductModelProductDescription` (x≈720, y≈130): ProductModelID (PK+FK), ProductDescriptionID (PK+FK), Culture (PK) — labeled [junction]

Add 2 new FK relationship lines:
- ProductModelProductDescription → ProductModel
- ProductModelProductDescription → ProductDescription

Wrap in `<div class="diagram-scroll er-diagram">` for mobile horizontal scroll.

**T014** — Case study MDX: Content section improvements

- **How It Works** (FR-039): Reduce each numbered step to a bold short title + one sentence
- **Technical Challenge** (FR-040): Add stage labels: Original Approach, Constraint, Investigation, Decision, Implementation, Outcome
- **Troubleshooting** (FR-041): Restructure each of 7 items into `.troubleshoot-item` with Problem / Root Cause / Fix rows
- **Validation Results** (FR-042): Add "11/11 validation scenarios passed." as first paragraph before the table. Wrap table in `<div style="overflow-x:auto">` for mobile.
- **Production Considerations** (FR-043): Reframe heading and intro as "What I would add for production"
- **Related Technical Writing** (FR-044): Convert existing `<aside>` blog callout into a `## Related Technical Writing` section listing 3–4 potential article topics
- **Screenshots** (FR-045): Confirm 6 placeholder `<figure>` elements with descriptive captions

---

### Phase 6 — US4: Professional Brand (P4)

**T015** — Restructure `src/pages/about/index.astro`

New section structure per FR-048:

1. **Introduction** (page-head section): H1 "Joel Samaniego" or "AI Solutions Builder."
   Lead: brief, human opening without repeating homepage hero.
2. **What I Focus On** (prose-grid): AI, agents, cloud, automation, practical digital solutions.
3. **How I Work** (section): Problem → Solution → Build → Deploy → Troubleshoot → Validate.
   Can use a compact flow list or a `.decision-flow`-style layout.
4. **Current Interests** (prose-grid): Generative AI, agentic applications, Azure, APIs, automation.
5. **Contact** (about-ledger or similar): GitHub, LinkedIn, Email — three visible contact methods (FR-050).

Remove the `about-closing` section (incorporated into How I Work).

Contact email: `samajoel@icloud.com` (as in user_identity.md).
GitHub: `https://github.com/samajoel`
LinkedIn: `https://www.linkedin.com/in/joel-mateo-samaniego/`

---

### Phase 7 — US5: Mobile and Responsive (P5)

**T016** — Verify mobile responsive behavior for all new components

- [ ] `.featured-work` collapses to 1-column at ≤760px (covered by T004 mobile CSS)
- [ ] `.diagram-scroll` works on 390px viewport (covered by T004 CSS)
- [ ] `.contribution-grid` collapses at ≤760px (covered by T004 mobile CSS)
- [ ] `.decision-flow` collapses at ≤760px (covered by T004 mobile CSS)
- [ ] Validation table is wrapped in `overflow-x:auto` container

This task is a verification step; fixes go back to the T004 CSS or the MDX.

---

### Phase 8 — Polish and Validation

**T017** — `public/scripts/azure-agentic-diagram.js`: Touch interaction verification

Check that the existing click handler in the JS works on mobile:
- The `click` event fires on mobile tap — no changes needed
- The `mouseover`/`mousemove`/`mouseout` events don't fire on mobile — tooltip only
  shows on tap (correct, acceptable behavior)
- If the tooltip gets stuck on mobile (no `mouseout`), add a `touchstart` handler on
  `document` to hide the tooltip when tapping outside a node

**T018** — npm run build validation (FR-061, SC-007)

```bash
npm run build
```

Expected: exit 0, all pages built, no content errors, no TypeScript errors.

**T019** — Manual validation per quickstart.md

Complete all pass/fail checks in `specs/003-portfolio-ux-refinement/quickstart.md`.
Document any failures and fix before marking complete.

---

## Dependencies Between Tasks

```
T001 → T003 → T005, T006 (schema + frontmatter before templates use liveUrl)
T002 → T005, T006 (placeholder image before templates reference it)
T004 → T005, T006, T008-T015 (CSS classes needed by all content/template tasks)
T007 → T005 (homepage reorder needs Featured Work markup)
T005, T006, T007, T008-T015 → T017, T018, T019
```

Tasks that can run in parallel after T001-T004 complete:
- T005, T006 (different files)
- T007, T008, T009, T010, T011, T012, T013, T014 (different files or sections)
- T015 (different file)

---

## Parallel Execution Examples

**Batch A** (setup — sequential): T001 → T002 → T003 → T004

**Batch B** (templates and content — parallel after Batch A):
- T005 (`index.astro` Featured Work)
- T006 (`works/index.astro` card)
- T008 + T009 + T010 + T011 (`azure-agentic-case-study.mdx` sections: grouped as one file)
- T015 (`about/index.astro`)

**Batch C** (homepage restructure — after T005):
- T007 (`index.astro` hero, areas of focus, technical writing, about/contact)

**Batch D** (diagrams — after T004):
- T012 (Architecture SVG — part of the MDX file, batch with T008-T014)
- T013 (ER diagram — part of the MDX file)

**Batch E** (validation — sequential after all above):
- T016 → T017 → T018 → T019

---

## Implementation Strategy

**Start with**: T001 and T002 (schema + asset) — unblocks everything else.

**Largest task**: T008–T014 (case study MDX restructure) — treat as a single continuous
edit to the MDX file to avoid multiple passes. Plan the full new structure before editing.

**Risk area**: Architecture SVG redesign (T012) and ER diagram expansion (T013) — both
require careful SVG coordinate math. Draft on paper or in comments before writing final
SVG attributes. Test after each SVG edit with `npm run build` to catch parser issues.

**MDX parser constraint** (from Feature 002): All JavaScript for diagrams must stay in
`public/scripts/azure-agentic-diagram.js`. The MDX file must not contain `{` characters
inside `<script>` tags. The existing external script pattern is correct — do not inline.

**CSS-first**: Add all new CSS classes (T004) before editing any Astro or MDX template
that uses them. This prevents reference errors during incremental testing.
