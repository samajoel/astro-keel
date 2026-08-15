# Quickstart Validation Guide: Portfolio UX and Professional Positioning Refinement

**Feature**: 003-portfolio-ux-refinement
**Date**: 2026-08-14

---

## Prerequisites

- Feature implementation complete (all tasks in tasks.md marked `[x]`)
- `npm run build` has exited with code 0
- `npm run dev` is running (or `npm run preview` after build)
- Browser available at `http://localhost:4321/astro-keel/` (dev) or `http://localhost:4321/` (preview)
- DevTools available for viewport simulation (390px mobile)

---

## US1 — Recruiter First Impression

**Goal**: Verify homepage communicates Joel's value within 30–90 seconds.

### Scenario 1.1 — Above the fold

1. Open `http://localhost:4321/astro-keel/` in a fresh browser tab
2. Do not scroll — check only what is visible in the viewport
3. **Pass criteria**:
   - [ ] Hero H1 is short and includes "AI solutions" (FR-001)
   - [ ] One supporting sentence is visible below the H1
   - [ ] Primary CTA visible (e.g., "View selected work") (FR-002)
   - [ ] No email link competes with the primary CTA in the hero (FR-003)

### Scenario 1.2 — Featured Work section

1. Scroll past the hero
2. **Pass criteria**:
   - [ ] A Featured Work section is immediately visible (FR-004)
   - [ ] A project image/placeholder is present — it does not look like a missing image (FR-005, FR-046)
   - [ ] Project title is visible and linked
   - [ ] One-sentence description is visible
   - [ ] Deployment status is visible (e.g., "Deployed") (FR-005)
   - [ ] No more than 6 technology tags are shown (FR-007)
   - [ ] "View Case Study" link is present (FR-005)
   - [ ] "View Live Project" link is present and opens in a new tab (FR-005, FR-006)

### Scenario 1.3 — Content order and no repetition

1. Scroll the full homepage
2. **Pass criteria**:
   - [ ] Content order is: Hero → Featured Work → Areas of Focus → Technical Writing → About/Contact (FR-012)
   - [ ] The exact positioning phrase from the hero does NOT appear in another section (FR-011)
   - [ ] Areas of Focus section contains exactly three areas (FR-008)
   - [ ] Technical Writing section is present; if no posts exist, shows a subtle placeholder — not a large empty section (FR-009)
   - [ ] About/Contact section near the bottom has 1–2 sentences and links to About, LinkedIn, email (FR-010)

### Scenario 1.4 — No horizontal overflow at 390px

1. Open DevTools → set viewport to 390px width
2. Navigate to homepage
3. **Pass criteria**:
   - [ ] No horizontal scrollbar on the full page (SC-008)
   - [ ] Hero, Featured Work, Areas of Focus all fit within 390px width
   - [ ] All CTAs are tappable (min-height ≥ 2.85rem per `.button` CSS)

---

## US2 — Technical Peer Case Study Exploration

**Goal**: Verify the case study delivers progressive technical depth and engineering evidence.

### Scenario 2.1 — First two screens

1. Navigate to `http://localhost:4321/astro-keel/works/azure-agentic-case-study/`
2. Scroll through only the first two viewport heights
3. **Pass criteria**:
   - [ ] Case study hero includes: title, one-sentence description, "Deployed" status, role/contribution line (FR-016)
   - [ ] "View Live Project" link is present in the hero area and opens in new tab (FR-017)
   - [ ] At-a-Glance block is visible with 3–5 items (FR-018)
   - [ ] Attribution sentence is present but is NOT the first thing on the page — project outcome leads (FR-019)
   - [ ] Microsoft foundation and Joel's contribution are visually distinct (FR-020)

### Scenario 2.2 — My Contribution section

1. Scroll to My Contribution section
2. **Pass criteria**:
   - [ ] "Microsoft provided" block is clearly separate from Joel's work (FR-020)
   - [ ] Joel's work is grouped into four categories: Application, Infrastructure, Security & Data, Engineering & Validation (FR-021)
   - [ ] My Contribution appears before the architecture diagram (FR-022)

### Scenario 2.3 — Key Architectural Decision section

1. Scroll to the Key Architectural Decision section
2. **Pass criteria**:
   - [ ] Section appears between My Contribution and the Architecture diagram (FR-023)
   - [ ] Five stages are present: Original Approach, Constraint, Investigation, Decision, Outcome (FR-024)
   - [ ] The framing is engineering judgment — not a complaint about a problem (FR-025)

### Scenario 2.4 — Architecture diagram

1. Scroll to the Architecture section
2. In simplified view:
   - [ ] Primary request path is traceable in under 15 seconds (SC-004)
   - [ ] Nodes are large enough to read without zooming
   - [ ] Toggle button is present and labeled (FR-026)
3. Click toggle to show full architecture:
   - [ ] Full view loads without layout overflow
   - [ ] Microsoft Fabric is shown as inactive/dashed (FR-028)
   - [ ] Joel-configured vs Microsoft-provided components have distinct visual encoding (FR-029)
4. Hover/click a node:
   - [ ] Component detail appears (FR-030)
   - [ ] Tooltip/detail area does NOT obscure other nodes (FR-030)
5. Text description accessible:
   - [ ] `<details>` disclosure element for text architecture description is present (FR-032)

### Scenario 2.5 — ER diagram

1. Scroll to the Data Model section
2. **Pass criteria**:
   - [ ] All 10 AdventureWorksLT entities are visible in the diagram (FR-033)
   - [ ] ProductDescription entity is present
   - [ ] ProductModelProductDescription entity is present (labeled as junction table)
   - [ ] Entities are visually grouped: Customers, Sales, Product Catalog (FR-034)
   - [ ] 12 FK relationships are shown as lines (FR-036) — verify count

### Scenario 2.6 — Content sections

1. **Validation Results** section:
   - [ ] First sentence reads: "11/11 validation scenarios passed." (FR-042, SC-005)
   - [ ] All 11 validation rows are in the table (FR-042)
2. **Troubleshooting** section:
   - [ ] Each of the 7 items has Problem, Root Cause, and Fix labels (FR-041)
3. **Technical Challenge** section:
   - [ ] Stages are labeled: Original Approach, Constraint, Investigation, Decision, Implementation, Outcome (FR-040)
4. **Production Considerations** section:
   - [ ] Framed as "What I would add for a production deployment" — not a shortcomings list (FR-043)
5. **Related Technical Writing** section:
   - [ ] Appears near the end of the case study (FR-044)
   - [ ] Lists future article topics (not published links)
6. **Screenshots** section:
   - [ ] Six placeholder figures with descriptive captions (FR-045)

---

## US3 — Seamless Homepage-to-Project Journey

**Goal**: Verify the Azure project is reachable from the homepage in ≤2 interactions.

### Scenario 3.1 — Homepage discovery

1. Open homepage (fresh tab, no prior navigation)
2. **Pass criteria**:
   - [ ] Azure project is visible on the homepage without navigating to `/works/` first (SC-002)
   - [ ] Project title, description, deployment status, and ≤6 tags are visible in Featured Work (FR-005)

### Scenario 3.2 — Click to case study

1. From the homepage Featured Work section, click "View Case Study"
2. **Pass criteria**:
   - [ ] Browser navigates to `/astro-keel/works/azure-agentic-case-study/`
   - [ ] Case study page loads correctly

### Scenario 3.3 — Live project link

1. From the homepage Featured Work section, click "View Live Project"
2. **Pass criteria**:
   - [ ] A new browser tab opens with the live URL (FR-006)
   - [ ] Homepage tab is not affected

### Scenario 3.4 — Works index card

1. Navigate to `http://localhost:4321/astro-keel/works/`
2. **Pass criteria**:
   - [ ] Page does not look like an empty template (FR-013)
   - [ ] Card has: image/placeholder, title, summary, key technologies, deployment status (FR-014)
   - [ ] "View Case Study" and live demo links are present on the card (FR-014)
   - [ ] Page visually works with only one project entry (FR-015)

---

## US4 — Professional Brand and Positioning

**Goal**: Verify each page has clear purpose, hierarchy, and professional tone.

### Scenario 4.1 — About page structure

1. Navigate to `http://localhost:4321/astro-keel/about/`
2. **Pass criteria**:
   - [ ] Section order matches: Introduction, What I Focus On, How I Work, Current Interests, Contact (FR-048)
   - [ ] Hero H1 text does NOT repeat the homepage hero verbatim (FR-049)
   - [ ] GitHub, LinkedIn, and email links are present and correctly attributed (FR-050)
   - [ ] No résumé-style chronology with dates and job titles (FR-051)

### Scenario 4.2 — Navigation

1. Check every page's navigation header
2. **Pass criteria**:
   - [ ] Navigation contains: Home, Work, Blog, About, Search (FR-052)
   - [ ] No new menu items have been added

### Scenario 4.3 — Page H1 uniqueness

1. Check each modified page's source
2. **Pass criteria**:
   - [ ] Each page has exactly one H1 element (FR-054)

---

## US5 — Mobile and Responsive Experience

**Goal**: Verify readable, usable layout at 390px viewport width.

### Scenario 5.1 — Diagram mobile scroll

1. Set DevTools viewport to 390px
2. Navigate to case study
3. Scroll to Architecture diagram
4. **Pass criteria**:
   - [ ] No full-page horizontal overflow (SC-008)
   - [ ] Diagram container shows a horizontal scrollbar or can be swiped (FR-031)
   - [ ] Nodes are legible at minimum-width display — labels readable
4. Repeat for the ER diagram
   - [ ] Same pass criteria (FR-038)

### Scenario 5.2 — Validation table on mobile

1. At 390px viewport, scroll to Validation Results
2. **Pass criteria**:
   - [ ] If table is wider than viewport, it scrolls horizontally within its container (FR-057 implied, US5.5)
   - [ ] No full-page overflow

### Scenario 5.3 — Interactive elements on mobile

1. At 390px viewport, tap the architecture toggle button
2. **Pass criteria**:
   - [ ] Toggle activates correctly (simplified ↔ full)
   - [ ] Full view does NOT cause page-level horizontal overflow

---

## Cross-Cutting Validation

### Build pass

```bash
npm run build
```

- [ ] Exits with code 0 (SC-007, FR-061)
- [ ] No Astro content validation errors in terminal output
- [ ] Page count ≥ 7 in build output

### No new npm packages

```bash
git diff package.json package-lock.json
```

- [ ] Neither file shows new dependency additions (FR-060, SC-010)

### Dark mode

1. Toggle dark mode via the theme toggle button (or `data-theme='dark'` on `<html>`)
2. Check every modified section
3. **Pass criteria**:
   - [ ] All new elements use CSS custom property tokens — no black boxes or invisible text (FR-059)
   - [ ] New SVG placeholder image is visible in both modes
   - [ ] Diagram tooltips/details remain readable in dark mode

### Accessibility (spot check)

1. Open case study and run browser accessibility audit (DevTools → Lighthouse → Accessibility)
2. **Pass criteria**:
   - [ ] SVG diagrams have `<title>` and `aria-labelledby` attributes (FR-055)
   - [ ] Architecture and ER diagrams have text description alternatives (FR-055)
   - [ ] All interactive elements are keyboard-accessible (Tab key navigation) (FR-056)
   - [ ] All images have descriptive `alt` text — not empty unless purely decorative (FR-057)
   - [ ] Validation table uses `<thead>`, `<th>` with appropriate scope (FR-058)

### Credibility accuracy check (SC-011)

1. Read the case study My Contribution section
2. **Pass criteria**:
   - [ ] No sentence implies Joel built the Microsoft accelerator from scratch
   - [ ] No sentence implies Microsoft Fabric was the active SQL backend
   - [ ] No sentence implies CI/CD was implemented
   - [ ] Attribution sentence is present and accurate
