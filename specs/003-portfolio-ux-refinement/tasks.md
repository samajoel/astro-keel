# Tasks: Portfolio UX and Professional Positioning Refinement

**Input**: Design documents from `/specs/003-portfolio-ux-refinement/`

**Prerequisites**: plan.md ✅ · spec.md ✅ · research.md ✅ · data-model.md ✅ · quickstart.md ✅

**Tests**: Not requested — manual validation via quickstart.md is the acceptance gate.

**Organization**: Tasks grouped by user story for independent implementation and validation.
Each phase is independently testable; `npm run build` must pass after every phase.

## Format: `[ID] [P?] [Story] Description with file path`

- **[P]**: Can run in parallel with other [P]-marked tasks (different files, no dependencies)
- **[US#]**: User story this task belongs to

---

## Phase 1: Setup (Schema and Asset Foundation)

**Purpose**: Schema change, static asset, and frontmatter — unblocks all subsequent phases.

**⚠️ CRITICAL**: Complete T001–T003 before any template or MDX work begins.

- [x] T001 Add `liveUrl: z.string().url().optional()` field to the `works` collection schema in `src/content.config.ts` inside the existing `z.object({...})` block, after the existing `link` field
- [x] T002 [P] Create `public/images/azure-agentic-placeholder.svg` — a 720×480 polished SVG placeholder with dark charcoal background (#1a1e2a), subtle grid pattern, four component boxes labelled React, FastAPI, AI Agent, Azure SQL connected by lines, project title "Agentic Data Application" in white, subtitle "Azure · Python · Microsoft Foundry" in muted text, and accent-blue (#4f90d9) borders on component boxes. Must be readable in both light and dark browser modes without CSS variables.
- [x] T003 Add `liveUrl: 'https://app-agentic-web-dev.thankfulfield-cc53b9b6.eastus.azurecontainerapps.io'` to the frontmatter of `src/content/works/azure-agentic-case-study.mdx` (alongside the existing `link`, `tech`, `order`, `publishDate` fields)

**Checkpoint**: `npm run build` must pass with exit 0 after T001–T003.

---

## Phase 2: Foundational (CSS Classes — Blocking All User Stories)

**Purpose**: Add all new CSS classes to `src/styles/global.css` before any template or MDX uses them.

**⚠️ CRITICAL**: No user story template/MDX work can begin until T004 is complete.

- [x] T004 Append the following CSS blocks to the end of `src/styles/global.css` (before or inside the existing `@media (max-width: 760px)` block for mobile overrides):

  **Diagram scroll containers**:
  `.diagram-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }`
  `.diagram-scroll svg { min-width: 600px; }`
  `.diagram-scroll.er-diagram svg { min-width: 900px; }`

  **Featured Work block** (2-column image | content):
  `.featured-work { display: grid; grid-template-columns: minmax(10rem, 0.45fr) minmax(0, 1fr); gap: clamp(1.5rem,4vw,3rem); align-items: start; border: var(--hairline); background: var(--color-bg); }`
  `.featured-work-image { display: block; width: 100%; height: auto; border-right: var(--hairline); background: var(--color-soft); }`
  `.featured-work-content { padding: clamp(1.5rem,3vw,2.25rem); }`
  `.featured-work-content h3 { max-width: 20ch; margin-bottom: calc(var(--baseline)*0.5); }`
  `.featured-work-status { display: inline-flex; align-items: center; gap: 0.4rem; margin-bottom: calc(var(--baseline)*0.5); color: var(--color-accent); font-family: var(--font-mono); font-size: 0.76rem; font-weight: 700; text-transform: uppercase; }`
  `.featured-work-status::before { content: ''; display: inline-block; width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--color-accent); }`

  **At-a-Glance block** (dl/dt/dd grid):
  `.at-a-glance { display: grid; grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); gap: 1px; background: var(--color-line); border: var(--hairline); margin-block: calc(var(--baseline)*1.5); }`
  `.at-a-glance > div { padding: clamp(1rem,2.5vw,1.5rem); background: var(--color-bg); }`
  `.at-a-glance dt { color: var(--color-accent); font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.35rem; }`
  `.at-a-glance dd { margin: 0; color: var(--color-text); font-size: 0.88rem; line-height: 1.5; }`

  **Work status badge**:
  `.work-status { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--color-accent); font-family: var(--font-mono); font-size: 0.76rem; font-weight: 700; text-transform: uppercase; }`
  `.work-status::before { content: ''; display: inline-block; width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--color-accent); }`

  **Contribution grid** (Microsoft | Joel side-by-side):
  `.contribution-grid { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1.5fr); gap: 1px; background: var(--color-line); border: var(--hairline); margin-block: calc(var(--baseline)*1.5); }`
  `.contribution-block { padding: clamp(1.25rem,3vw,2rem); background: var(--color-bg); }`
  `.contribution-block h4 { margin: 0 0 calc(var(--baseline)*0.75); font-family: var(--font-display); font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-muted); }`
  `.contribution-category { margin-bottom: var(--baseline); }`
  `.contribution-category h5 { margin: 0 0 0.35rem; font-family: var(--font-mono); font-size: 0.76rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent); }`
  `.contribution-category ul { margin: 0; padding-left: 1rem; color: var(--color-muted); font-size: 0.88rem; }`

  **Key decision flow** (5-stage sequence):
  `.decision-flow { display: flex; flex-direction: column; gap: 0; margin-block: calc(var(--baseline)*1.5); border: var(--hairline); }`
  `.decision-step { display: grid; grid-template-columns: 8rem 1fr; gap: 1rem; padding: 1rem clamp(1rem,2vw,1.5rem); background: var(--color-bg); border-bottom: var(--hairline); }`
  `.decision-step:last-child { border-bottom: 0; }`
  `.decision-step-label { color: var(--color-accent); font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700; text-transform: uppercase; padding-top: 0.2rem; }`
  `.decision-step-body { color: var(--color-muted); font-size: 0.9rem; line-height: 1.6; }`
  `.decision-step-body strong { color: var(--color-text); }`

  **Troubleshooting structured items**:
  `.troubleshoot-item { margin-block: calc(var(--baseline)*1.25); border: var(--hairline); }`
  `.troubleshoot-row { display: grid; grid-template-columns: 7.5rem 1fr; gap: 0.75rem 1rem; padding: 0.75rem clamp(1rem,2vw,1.5rem); border-bottom: var(--hairline); }`
  `.troubleshoot-row:last-child { border-bottom: 0; }`
  `.troubleshoot-label { color: var(--color-accent); font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700; text-transform: uppercase; padding-top: 0.2rem; }`

  **Mobile overrides** (inside or after the existing `@media (max-width: 760px)` block):
  `.featured-work, .contribution-grid { grid-template-columns: 1fr; }`
  `.featured-work-image { border-right: 0; border-bottom: var(--hairline); }`
  `.decision-step, .troubleshoot-row { grid-template-columns: 1fr; }`

**Checkpoint**: `npm run build` must pass with exit 0 after T004.

---

## Phase 3: User Story 1 — Recruiter First Impression (Priority: P1) 🎯 MVP

**Goal**: A first-time visitor understands who Joel is, what he builds, and how to contact
him within 90 seconds of landing on the homepage.

**Independent Test**: Open the homepage. Verify: H1 says "I build AI solutions." (or similar short form). Eyebrow shows "Joel Samaniego". One primary CTA is visible. Areas of Focus shows 3 items with updated text. Technical Writing shows a subtle empty state. About/Contact section is at the bottom. No positioning phrase repeats across sections.

Note: T005–T008 all edit `src/pages/index.astro` — execute sequentially as one continuous edit.

- [x] T005 [US1] Rewrite the `.hero` section in `src/pages/index.astro`: change the eyebrow from "Portfolio · AI Solutions · Cloud" to "Joel Samaniego"; replace the H1 with "I build AI solutions."; replace the lead paragraph with "Cloud, agents and automation applied to real business problems."; replace the action-row with a primary `.button` "View selected work" linking to `withBase('/works/')`, a `text-link` to GitHub (`https://github.com/samajoel`), and a `text-link` to LinkedIn (`https://www.linkedin.com/in/joel-mateo-samaniego/`) — no email in the hero.
- [x] T006 [US1] Update the `.split-overview` section in `src/pages/index.astro`: change the eyebrow from "Focus areas" to "Areas of Focus"; change H2 from "AI Solutions · Cloud · Automation" to "AI · Cloud · Automation" (shorter, not a repeat of the hero); update the three feature-list articles to: (1) h3 "AI & Agents" + p "Building practical applications with generative AI, agents, LLMs and tool-based workflows." (2) h3 "Cloud Solutions" + p "Deploying and integrating cloud-native services, infrastructure and data components." (3) h3 "Automation" + p "Turning repetitive or operational problems into practical automated solutions."
- [x] T007 [US1] Replace the blog `.index-feed` section in `src/pages/index.astro` with a Technical Writing section: when `posts.length === 0`, show `<section class="section index-feed" aria-labelledby="technical-writing"><div class="section-heading"><p class="eyebrow">Technical Writing</p><h2 id="technical-writing">Deep dives.</h2></div><div class="empty-state compact"><p>Technical articles on AI, cloud infrastructure, and deployment are in progress.</p></div></section>`; when `posts.length > 0`, show the existing note-list rendering with eyebrow "Technical Writing" and H2 "Deep dives."
- [x] T008 [US1] Add an About/Contact section at the bottom of `src/pages/index.astro` (after the Technical Writing section, before `</BaseLayout>`): use existing `.prose-grid.about-closing` classes with eyebrow "About", H2 "Problems, solutions, and shipping.", a lead paragraph "I combine understanding of real problems with technical execution across AI, cloud, and automation — from requirement to deployment.", and an action-row with a `.button` linking to `withBase('/about/')` labelled "About", a `text-link` to LinkedIn with `target="_blank" rel="noopener noreferrer"`, and a `text-link` mailto link for `samajoel@icloud.com`.

**Checkpoint**: Homepage should now satisfy US1 independent test. `npm run build` must pass.

---

## Phase 4: User Story 2 — Technical Peer Case Study Exploration (Priority: P2)

**Goal**: A technical evaluator can assess Joel's personal contribution, trace the
architecture in 15 seconds, find the App Service → Container Apps decision before
troubleshooting, and confirm 11/11 validations at a glance.

**Independent Test**: Open the case study. Verify: hero shows role line and live project link. At-a-Glance block has 5 items. Attribution is secondary to the project outcome. My Contribution has Microsoft vs Joel blocks (4 categories). Key Architectural Decision section exists before Architecture. Simplified architecture diagram traceable in 15 sec. ER diagram has 10 entities. "11/11 validation scenarios passed." is first sentence in Validation section. Troubleshooting items have Problem/Root Cause/Fix structure.

Note: T009–T015 all edit `src/content/works/azure-agentic-case-study.mdx` — execute as one continuous restructure of this file in section order.

- [x] T009 [US2] Restructure the case study hero block at the top of `src/content/works/azure-agentic-case-study.mdx`: replace the existing `<div class="work-attribution">` and `<p><span class="work-status">` block with: (1) a `<div>` containing `<span class="work-status">Deployed · Live</span>`, a `<p>` with "Cloud Deployment · Infrastructure · Modernization · Troubleshooting" using a small muted style, and an `<a href="[liveUrl]" target="_blank" rel="noopener noreferrer">View Live Project ↗</a>`; (2) then the attribution paragraph using `<p class="work-attribution"><strong>Attribution:</strong> This project is based on Microsoft's Agentic Applications for Unified Data Foundation solution accelerator; my work focused on modernization, Terraform infrastructure management, Azure deployment, troubleshooting, integration changes and end-to-end validation.</p>`
- [x] T010 [US2] Add the At-a-Glance block to `src/content/works/azure-agentic-case-study.mdx` immediately after the attribution paragraph (before `## Problem`): use `<dl class="at-a-glance">` with five `<div><dt>...</dt><dd>...</dd></div>` items — What was built / Role / Status / Key technologies / Validation — per the data-model.md Entity 2 field values.
- [x] T011 [US2] Restructure the `## My Contribution` section in `src/content/works/azure-agentic-case-study.mdx`: replace the existing flat bullet list with a `<div class="contribution-grid">` containing two `.contribution-block` divs — left block h4 "Microsoft provided" listing the 6 Microsoft-provided components as a flat `<ul>`, right block h4 "My engineering work" containing four `.contribution-category` groups with h5 headings: "Application" (FastAPI modernization), "Infrastructure" (Terraform, Container Apps, ACR, deployment automation), "Security & Data" (Managed Identity, RBAC, Cosmos DB, Azure SQL networking/auth), "Engineering & Validation" (quota investigation, architectural pivot, identity troubleshooting, networking troubleshooting, SQL auth troubleshooting, end-to-end validation).
- [x] T012 [US2] Add a `## Key Architectural Decision` section to `src/content/works/azure-agentic-case-study.mdx` between the My Contribution section and the Architecture section: use `<div class="decision-flow">` with five `.decision-step` divs, each containing `.decision-step-label` and `.decision-step-body`. Stages: (1) label "Original Approach" body "Azure App Service B1 plan per the accelerator's prescribed deployment instructions." (2) label "Constraint" body "East US App Service VM quota: 0 cores. No App Service SKU could be deployed — the error was explicit and immediate." (3) label "Investigation" body "Confirmed quota limit, no path forward via App Service without a quota increase that could take days or weeks." (4) label "Decision" body "Pivot to <strong>Azure Container Apps Consumption</strong> plan — no pre-allocated VM quota; compute provisions on-demand per request." (5) label "Outcome" body "Full stack deployed successfully. Terraform manages the Container Apps environment, ACR, Managed Identity, and all RBAC assignments."
- [x] T013 [US2] Redesign the architecture SVG in `src/content/works/azure-agentic-case-study.mdx`: wrap both the SVG and toggle button in `<div class="diagram-scroll">`. For the simplified view (`id="arch-simplified"`), redesign the node layout with viewBox `0 0 900 520` — arrange nodes in clear horizontal bands: User (y≈40, centered), React/nginx (y≈120), FastAPI (y≈210, center-left) + Cosmos DB (y≈210, right side), FoundryAgent (y≈310, center) + SQL Query Tool (y≈310, right-center), Azure SQL (y≈400, right). Supporting nodes Managed Identity and Terraform go at y≈400 left-center with reduced visual weight (smaller). Primary request path arrows go strictly downward on the main flow. Response path is a dashed upward line on the right side. Maintain the same `data-detail` tooltip content. For the full view (`id="arch-full"`), keep the existing 14 components but add Chat Orchestrator and reorganize into a similar band layout — viewBox `0 0 900 560`. All node fills/strokes must use CSS custom property variables (no hex colors). The `<details>` text description and accessibility attributes (`role="img"`, `aria-labelledby`) must be preserved.
- [x] T014 [US2] Expand the ER diagram in `src/content/works/azure-agentic-case-study.mdx` from 8 to 10 entities: wrap the `<svg id="db-svg">` in `<div class="diagram-scroll er-diagram">`. Expand viewBox to `0 0 1000 560`. Add `SalesLT.ProductDescription` entity (ProductDescriptionID PK, Description) at approximately x=720, y=10, width=185, height=58. Add `SalesLT.ProductModelProductDescription` junction entity (composite PK: ProductModelID PK+FK, ProductDescriptionID PK+FK, Culture PK) at approximately x=720, y=120, width=205, height=72 — include `[junction]` in the table name display or as a small label. Add two new FK lines: (1) ProductModelProductDescription.ProductModelID → ProductModel (line from x≈820, y=120 to x≈590, y=82); (2) ProductModelProductDescription.ProductDescriptionID → ProductDescription (line from x≈730, y=120 down to x≈810, y=68). Update the caption below to read "Showing all 10 AdventureWorksLT entities with 12 verified foreign-key relationships." All existing 8 entities and 7 FK relationships must remain unchanged.
- [x] T015 [US2] Update the remaining content sections in `src/content/works/azure-agentic-case-study.mdx`:
  (1) **How It Works** — reduce each of the 10 numbered list items to a bold short title (3–5 words) followed by one concise sentence; remove multi-sentence explanations;
  (2) **Technical Challenge** — add a labeled stage structure using `**Original Approach:**`, `**Constraint:**`, `**Investigation:**`, `**Decision:**`, `**Implementation:**`, `**Outcome:**` as bold paragraph openers for the existing paragraphs;
  (3) **Troubleshooting** — restructure each of the 7 items into a `<div class="troubleshoot-item">` containing three `.troubleshoot-row` divs with `.troubleshoot-label` "Problem" / "Root Cause" / "Fix" and the corresponding body text extracted from the existing prose;
  (4) **Validation Results** — add "11/11 validation scenarios passed." as the first sentence/paragraph before the `<table>`, and wrap the entire `<table>` block in `<div style="overflow-x:auto">`;
  (5) **Production Considerations** — change the section intro from "This deployment is a proof-of-concept... The following were intentionally out of scope:" to "What I would add for a production deployment:" keeping all 8 existing bullet items unchanged;
  (6) **Related Technical Writing** — replace the existing `<aside>` blog callout with a `## Related Technical Writing` heading and a short paragraph explaining planned future articles, listing 3–4 specific topics such as: "Terraform brownfield infrastructure management on Azure", "Troubleshooting Azure Container Apps: identity, networking, and SQL auth", "Deploying agentic applications with Microsoft Foundry", "AdventureWorksLT as an AI agent data source";
  (7) **Screenshots** — verify 6 `<figure>` placeholder blocks exist with descriptive captions (add any missing ones; captions must not contain credentials or sensitive identifiers).

**Checkpoint**: Case study should satisfy US2 independent test. `npm run build` must pass.

---

## Phase 5: User Story 3 — Seamless Homepage-to-Project Journey (Priority: P3)

**Goal**: A visitor discovers the Azure project directly on the homepage and can reach
the case study or live URL in ≤2 interactions, without visiting `/works/` first.

**Independent Test**: Open the homepage. Verify: a Featured Work section is visible after the hero showing the placeholder image, project title linked to the case study, one-sentence description, "Deployed" status, 6 technology tags, "View Case Study" button, and "View Live Project" link opening in a new tab. Then open `/works/` — verify the work card shows image, title, description, key technologies, status, and both CTA links.

Note: T016 edits `src/pages/index.astro` (add Featured Work section after the hero, before the Areas of Focus section). T017 edits `src/pages/works/index.astro`.

- [x] T016 [US3] Add the Featured Work section to `src/pages/index.astro` — insert after the closing `</section>` tag of the hero section and before the `.split-overview` section. The section should conditionally render when `works.length > 0` using `works[0]` (the first sorted work): wrap in `<section class="section" aria-labelledby="featured-work-heading">` with a `border-top: var(--hairline)` style; include a `.section-heading` div with eyebrow "Featured Work" and H2 "Built and deployed."; then a `<div class="featured-work">` containing: an `<img class="featured-work-image">` with `src={withBase('/images/azure-agentic-placeholder.svg')}`, descriptive alt text "Architecture schematic showing the Agentic Data Application components: React frontend, FastAPI backend, AI agent, and Azure SQL database", width="720", height="480", loading="lazy"; a `<div class="featured-work-content">` containing: `<span class="featured-work-status">Deployed</span>`, `<h3><a href={withBase(`/works/${works[0].id}/`)}>{works[0].data.title}</a></h3>`, `<p>{works[0].data.description}</p>`, a `<ul class="tag-list" aria-label="Key technologies">` with exactly these 6 tags: Microsoft Foundry, Azure Container Apps, Terraform, Python, Azure SQL, AI Agents; and an `<div class="action-row">` with a `.button` "View Case Study" and — if `works[0].data.liveUrl` exists — a `text-link` "View Live Project ↗" with `target="_blank" rel="noopener noreferrer"`.
- [x] T017 [US3] Update `src/pages/works/index.astro` to enhance the work card: replace the existing `<article class="work-card">` markup with a version that includes: (1) an `<img>` placeholder with the same source as T016 (`withBase('/images/azure-agentic-placeholder.svg')`), descriptive alt text, loading="lazy" — shown only for the Azure case study or as a conditional fallback; (2) a middle column with `<p class="entry-meta"><span class="work-status">Deployed</span></p>`, the existing `<h2><a href=...>{work.data.title}</a></h2>`, and `{work.data.description}`; (3) a third column with a `<ul class="tag-list">` showing `work.data.tech.slice(0, 6)` tags and an `<div class="action-row">` containing a `.button` "View Case Study" linking to the work URL and — if `work.data.liveUrl` — a `text-link` "View Live Project ↗" with `target="_blank" rel="noopener noreferrer"`.

**Checkpoint**: US3 independent test should pass. `npm run build` must pass.

---

## Phase 6: User Story 4 — Professional Brand and Positioning (Priority: P4)

**Goal**: The About page uses the new 5-section structure and reads as a professional
technical biography, not a résumé.

**Independent Test**: Open `/about/`. Verify section order: Introduction (page-head), What I Focus On (prose-grid), How I Work (section with flow), Current Interests (prose-grid), Contact (3 links). Verify H1 does not repeat the homepage hero text. Verify GitHub, LinkedIn, and email links are present.

- [x] T018 [US4] Restructure `src/pages/about/index.astro` with the following 5 sections, preserving all existing CSS classes:
  (1) **Introduction** (`page-head section`): eyebrow "Joel Samaniego"; H1 "AI solutions builder working at the intersection of cloud, automation, and AI."; lead "Building practical, deployable solutions from real business problems."
  (2) **What I Focus On** (`prose-grid section`): eyebrow "Focus"; H2 "What I build."; prose-stack with two short paragraphs covering generative AI and agentic applications, cloud deployment and infrastructure (Azure), automation and APIs, and practical digital solutions.
  (3) **How I Work** (`section`): eyebrow "Process"; H2 "How I work."; a short labeled flow presented as a styled paragraph or compact list: Understand the problem → Define the solution → Build and configure → Deploy → Troubleshoot → Validate. Can use the existing `.feature-list` grid or a simple ordered list styled in prose.
  (4) **Current Interests** (`prose-grid section`): eyebrow "Now"; H2 "Current interests."; prose-stack paragraph covering: agentic AI applications, Azure cloud architecture, infrastructure automation with Terraform, practical deployment engineering.
  (5) **Contact** (`section > about-ledger`): Three ledger articles (removing the "01/02/03" span numbers or keeping them): GitHub `https://github.com/samajoel`, LinkedIn `https://www.linkedin.com/in/joel-mateo-samaniego/`, Email `samajoel@icloud.com`. Remove the separate `about-closing` section.

**Checkpoint**: US4 independent test should pass. `npm run build` must pass.

---

## Phase 7: User Story 5 — Mobile and Responsive Experience (Priority: P5)

**Goal**: All primary content is readable and usable at 390px viewport width.
Diagrams scroll horizontally within their container; no full-page overflow.

**Independent Test**: At 390px viewport, confirm: no full-page horizontal overflow on any page; architecture diagram container scrolls horizontally; ER diagram container scrolls horizontally; validation table scrolls horizontally within its container; all CTA buttons are tappable (min-height ≥ 44px); theme toggle works; architecture toggle works on mobile tap.

- [x] T019 [US5] Verify that the `.diagram-scroll` containers added around the architecture SVG (T013) and ER diagram (T014) in `src/content/works/azure-agentic-case-study.mdx` are correctly in place, and that the validation table is wrapped in `<div style="overflow-x:auto">` (from T015). If any wrapper is missing, add it now. Also verify the `<table>` in the Validation Results section has `<thead>` with `<th>` elements — add `scope="col"` if missing.
- [x] T020 [US5] Review `public/scripts/azure-agentic-diagram.js` for mobile compatibility: the existing `click` handler fires on mobile tap (correct, no change needed). If the tooltip remains visible after tapping away from a node on mobile, add a `document.addEventListener('touchstart', ...)` handler that hides the tooltip when the touch target is not inside `#arch-svg` — only add this if the issue is confirmed by inspection. Also verify the toggle button height in `src/content/works/azure-agentic-case-study.mdx` meets minimum 44px touch target — update the button's inline style padding if needed (e.g., `padding: 0.75rem 1rem` instead of `0.35rem 1rem`).

**Checkpoint**: US5 independent test should pass. `npm run build` must pass.

---

## Phase 8: Polish and Final Validation

**Purpose**: Build verification and manual review against all acceptance criteria.

- [x] T021 Run `npm run build` from the project root and verify exit code 0 with no errors in `src/content.config.ts`, no Astro content validation errors, and no MDX parse errors. Fix any failures before proceeding.
- [x] T022 [P] Complete manual validation against `specs/003-portfolio-ux-refinement/quickstart.md` — work through all scenarios for US1 through US5 plus the cross-cutting checks (build pass, no new packages, dark mode, accessibility spot check, credibility accuracy check). Mark each scenario pass or fail. Fix any failures.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user story phases
- **US1 (Phase 3)**: Depends on Phases 1–2; edits `src/pages/index.astro`
- **US2 (Phase 4)**: Depends on Phases 1–2; edits `src/content/works/azure-agentic-case-study.mdx` — can run in parallel with US1 (different files)
- **US3 (Phase 5)**: Depends on Phases 1–2; T016 edits `src/pages/index.astro` (must complete after US1/T005-T008); T017 edits `src/pages/works/index.astro` (can run in parallel with US2)
- **US4 (Phase 6)**: Depends on Phases 1–2; edits `src/pages/about/index.astro` — can run in parallel with US2 and US3/T017
- **US5 (Phase 7)**: Depends on Phase 4 (T013, T014, T015 must complete first)
- **Polish (Phase 8)**: Depends on all phases complete

### User Story Dependencies

- **US1 → US3/T016**: Both edit `src/pages/index.astro`; do US1 first, then add Featured Work section (T016) after
- **US2**: Independent of US1, US3/T017, US4 — can run in parallel
- **US3/T017**: Independent of all except Phases 1–2
- **US4**: Independent of all except Phases 1–2
- **US5**: Depends on US2 (diagrams must exist before wrapping them)

### Parallel Opportunities (after Phases 1–2 complete)

- US2 (T009–T015) and US4 (T018) can run in parallel — different files
- US3/T017 and US4 (T018) can run in parallel — different files
- Within Phase 1: T001 and T002 can run in parallel (different files)

---

## Parallel Example: US1 and US2

```
After T001-T004 complete:
  Parallel A: T005, T006, T007, T008 (src/pages/index.astro — sequential within file)
  Parallel B: T009 → T010 → T011 → T012 → T013 → T014 → T015 (case study MDX — sequential within file)
  Parallel C: T018 (src/pages/about/index.astro — independent)

After A and B complete:
  T016 (add Featured Work to index.astro — sequential after A)
  T017 (works/index.astro — can run alongside T016)

After all above:
  T019, T020 (US5 — sequential after US2 diagrams exist)
  T021, T022 (validation — sequential last)
```

---

## Implementation Strategy

### MVP First (US1 + US3: Homepage)

1. Complete Phase 1: Setup (T001–T003)
2. Complete Phase 2: Foundational CSS (T004)
3. Complete Phase 3: US1 hero + areas + contact (T005–T008)
4. Complete Phase 5/T016: US3 Featured Work on homepage (T016)
5. **STOP and VALIDATE**: Homepage satisfies recruiter first-impression test
6. Build passes, homepage content order is correct, no positioning phrase repeats

### Full Incremental Delivery

1. Setup → CSS Foundation → US1 homepage → US3 Featured Work → **validate homepage**
2. US2 case study restructure → **validate case study**
3. US3 works index card (T017) → **validate works page**
4. US4 about page → **validate about**
5. US5 mobile verification → **validate responsive**
6. Final build + manual review → **done**

---

## Notes

- `[P]` tasks within a phase = different files, no mutual dependencies
- All 5 user stories can be independently tested — each builds on but does not break the others
- The MDX parser constraint from Feature 002 is still in force: no `{` characters inside `<script>` tags in MDX; all JS stays in `public/scripts/azure-agentic-diagram.js`
- Every SVG `fill` and `stroke` attribute must use `var(--color-*)` CSS custom properties — no hex colors in SVG markup (except the static placeholder PNG/SVG in `public/images/` which uses fixed colors)
- `npm run build` must pass after every phase checkpoint
- No new npm packages — use only existing Astro 7, MDX, CSS, and vanilla JS
