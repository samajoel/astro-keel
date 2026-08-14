---
description: "Task list for portfolio foundation implementation"
---

# Tasks: Portfolio Foundation

**Input**: Design documents from `specs/001-portfolio-foundation/`

**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | quickstart.md ✅

**Tests**: Not requested — validation is `npm run build` + manual spot check.

**Organization**: Tasks grouped by user story to enable independent delivery.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other [P] tasks in the same phase
- **[Story]**: Maps to user story (US1–US4) from spec.md
- All tasks include exact file paths

---

## Phase 1: Foundational — Site Identity (blocks all user stories)

**Purpose**: Update the single source of truth for site identity and clean the shared layout.
These changes propagate to every page via `BaseLayout.astro` and are prerequisites for
US1–US4 visual validation.

**⚠️ CRITICAL**: No user story validation is meaningful until this phase is complete.

- [x] T001 Update `src/consts.ts`: set `SITE.title = 'Joel Samaniego'`,
  `SITE.description = 'AI Solutions Builder — Cloud, automation, and generative AI.'`,
  `SITE.rssDescription = 'Engineering articles on AI solutions, cloud, and automation by Joel Samaniego.'`,
  `SITE.author = 'Joel Samaniego'`, `SITE.footerText = 'Joel Samaniego'`;
  replace `SOCIAL_LINKS` with:
  `{ label: 'GitHub', href: 'https://github.com/samajoel', icon: 'github' }`,
  `{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/joel-mateo-samaniego/', icon: 'linkedin' }`,
  `{ label: 'Email', href: 'mailto:samajoel@icloud.com', icon: 'email' }`,
  `{ label: 'RSS feed', href: '/rss.xml', icon: 'rss' }`

- [x] T002 [P] Remove the `<a href="https://almanac.p4ni.com" …>Almanac ↗</a>` element from
  the `.footer-links` div in `src/layouts/BaseLayout.astro` (leave the Notes blog link intact)

**Checkpoint**: Header shows "Joel Samaniego" brand; footer shows updated credit + social icons

---

## Phase 2: User Story 1 — Professional First Impression (Priority: P1) 🎯

**Goal**: Home page and About page clearly present Joel's identity and professional positioning.

**Independent Test**: Open the home page; identify the owner's name and focus (AI Solutions
Builder · Cloud · Automation) within 10 seconds; navigate to About and read Joel's bio.

### Implementation for User Story 1

- [x] T003 [P] [US1] Rewrite `src/pages/index.astro` hero section and split-overview section:
  - `.hero` eyebrow → `'Portfolio · AI Solutions · Cloud'`
  - `.hero` h1 → `'Building AI solutions, cloud systems, and automation for real-world problems.'`
  - `.hero` lead → `'I turn business needs into practical AI prototypes and deployable applications, working at the intersection of generative AI, cloud technologies, and software engineering.'`
  - `.split-overview` eyebrow → `'Focus areas'`
  - `.split-overview` h2 → `'AI Solutions · Cloud · Automation'`
  - Replace the three `<article>` elements with: (1) "Generative AI & Agents" — building LLM-powered prototypes and agents connected to real operational workflows; (2) "Cloud & Infrastructure" — designing deployable, scalable solutions on cloud platforms; (3) "Automation & APIs" — connecting systems and automating processes to reduce manual overhead
  - Leave the works feed, blog feed, and all i18n-driven labels (`t(...)` calls) unchanged

- [x] T004 [P] [US1] Rewrite all placeholder prose in `src/pages/about/index.astro`:
  - `.page-head` h1 → `'AI Solutions Builder working at the intersection of cloud, automation, and software engineering.'`
  - `.page-head` lead → `'Building practical prototypes and deployable applications from business needs.'`
  - Profile section h2 → `'From business need to working solution.'`
  - Profile paragraphs → Joel's short bio: `'I build AI, cloud, and automation solutions focused on turning business needs into practical prototypes and deployable applications.'` + `'I work with generative AI, AI agents, APIs, and cloud technologies to create solutions that are useful, scalable, and connected to real operational challenges.'`
  - Ledger 01 h3 → `'Current focus'`, p → `'Generative AI solutions, cloud deployment, and automation systems that connect to real business workflows.'`
  - Ledger 02 h3 → `'Background'`, p → `'Product development, project management, software engineering, and AI solution design across cloud and automation domains.'`
  - Ledger 03 h3 → `'Contact'`, p → `'Open to engineering and product roles. Reach me at samajoel@icloud.com'`
  - Closing section h2 → `'From prototype to production.'`
  - Closing paragraph → `'Every project starts with a clear business problem. The focus is on solutions that work in practice: useful, connected, and ready to deploy.'`
  - Preserve all class names, Astro imports, and layout structure

**Checkpoint**: Home page shows Joel's identity and positioning; About shows bio and contact

---

## Phase 3: User Story 2 — Technical Work Discovery (Priority: P2)

**Goal**: Works section contains no demo content and presents professionally with an empty state.

**Independent Test**: Navigate to `/works/`; confirm no demo projects appear; confirm page
renders a professional message rather than a broken empty list.

### Implementation for User Story 2

- [x] T005 [US2] Delete all 6 demo files from `src/content/works/`:
  `code-reading-kit.mdx`, `code-reading-kit.jpg`,
  `field-notes-archive.md`, `field-notes-archive.jpg`,
  `keel-portfolio.md`, `keel-portfolio.jpg`

- [x] T006 [US2] Update `src/pages/works/index.astro`:
  - Update `<h1>` → `'Selected projects and case studies.'`
  - Update lead `<p>` → `'A curated set of technical projects across AI solutions, cloud infrastructure, and automation. Case studies in progress.'`
  - Wrap the `<div class="work-list">` in a conditional:
    ```astro
    {works.length > 0 ? (
      <div class="work-list">…existing map…</div>
    ) : (
      <div class="empty-state">
        <p>Case studies in progress — the first project will be published here shortly.</p>
      </div>
    )}
    ```
  - Do not change the page query, sorting, layout imports, or any other code

**Checkpoint**: `/works/` shows the empty-state paragraph; no demo projects listed

---

## Phase 4: User Story 3 — Technical Writing Discovery (Priority: P3)

**Goal**: Blog section contains no demo posts; search, RSS, tags, and pagination remain functional.

**Independent Test**: Navigate to `/blog/`; confirm no demo posts appear; open `/rss.xml`
and verify feed metadata shows Joel's identity.

### Implementation for User Story 3

- [x] T007 [US3] Delete all 4 demo files from `src/content/blog/`:
  `baseline-rhythm.mdx`, `blog-hero.jpg`, `content-layer-notes.md`, `release-checklist.md`

**Checkpoint**: `/blog/` shows an empty state; `/rss.xml` is valid XML with Joel's identity;
`/search/` loads without errors

---

## Phase 5: User Story 4 — Deployment Configuration (Priority: P4)

**Goal**: Site builds and deploys correctly to `https://samajoel.github.io/astro-keel/`.

**Independent Test**: `npm run build` completes with exit code 0; view source shows
canonical URL `https://samajoel.github.io/astro-keel/`.

### Implementation for User Story 4

- [x] T008 [US4] Update `astro.config.mjs`: change `site` from `'https://kpab.github.io'`
  to `'https://samajoel.github.io'`; leave `base: '/astro-keel'` unchanged

**Checkpoint**: `astro.config.mjs` site value updated; base remains `/astro-keel`

---

## Phase 6: Build Validation & Manual Check

**Purpose**: Confirm the complete implementation produces a working, error-free build.

- [x] T009 Run `npm run build` from the repository root; confirm exit code 0 and no TypeScript
  or build errors in the output

- [x] T010 [P] Run `npm run preview` and manually validate against `specs/001-portfolio-foundation/quickstart.md`:
  - Home: "Joel Samaniego" in tab title, header, hero
  - About: bio text present, contact email shown
  - Works: empty-state message shown, no demo projects
  - Blog: empty-state shown, no demo posts
  - Search: page loads without errors
  - RSS: `/astro-keel/rss.xml` is valid XML with Joel's identity
  - Footer: GitHub, LinkedIn, email, RSS icons present; no Almanac link
  - Light and dark mode: toggle works, content remains legible
  - Navigation: all five nav links (Home, About, Works, Blog, Search) route correctly

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: No dependencies — start immediately
- **US1 (Phase 2)**: Depends on Foundational (T001, T002) — MUST be complete for identity to propagate
- **US2, US3, US4 (Phases 3–5)**: Each independent; all can start after Foundational is complete
- **Validation (Phase 6)**: Depends on all phases 1–5 being complete

### Within Each Phase

- T001 → T002 can run in parallel [P] (different files, no dependency)
- T003 → T004 can run in parallel [P] (different files)
- T005 → T006 sequential within US2 (delete files before adding empty-state check, to verify behavior)
- T009 → T010 sequential (preview requires successful build)

### Parallel Opportunities

```bash
# Phase 1 — run together:
Task: "Update src/consts.ts site identity and social links"       # T001
Task: "Remove Almanac link from src/layouts/BaseLayout.astro"     # T002

# Phase 2 — run together after Phase 1:
Task: "Rewrite index.astro hero and overview"                      # T003
Task: "Rewrite about/index.astro bio copy"                         # T004

# Phases 3–5 — run together after Phase 1:
Task: "Delete demo works files"                                    # T005
Task: "Delete demo blog files"                                     # T007
Task: "Update astro.config.mjs site URL"                          # T008
```

---

## Implementation Strategy

### Fastest Path (all tasks are small — complete in one session)

1. Complete Phase 1 (T001 + T002) → foundation propagates everywhere
2. Complete Phase 2 (T003 + T004 in parallel) → US1 done
3. Complete Phases 3–5 (T005–T008, T006 after T005) → US2–US4 done
4. T009 build → T010 manual check

### Estimated scope

10 tasks across 6 phases. Total files changed: 6. Total files deleted: 10.
No new files created. No new dependencies. No component or architecture work.
