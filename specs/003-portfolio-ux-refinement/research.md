# Research: Portfolio UX and Professional Positioning Refinement

**Feature**: 003-portfolio-ux-refinement
**Date**: 2026-08-14

---

## 1. Homepage Pattern Analysis

### Current state

`src/pages/index.astro` renders four sections in this order:
1. `.hero` — eyebrow, H1, lead, action-row (View Works | Read notes)
2. `.split-overview` — Focus areas with three feature-list articles
3. `.index-feed` — Works feed (up to 3 works from collection)
4. `.index-feed` — Blog feed (up to 3 blog posts)

**Problems vs spec**:
- Hero H1 is too long; positioning phrase repeats in the split-overview H2
- No Featured Work section — works appear only in the generic feed
- Works feed uses `highlight-card` which is sized for 3 columns; with one entry it looks sparse
- Blog section shows an `empty-state.compact` which is currently visible since no posts exist
- No About/Contact section at homepage bottom
- Primary CTA goes to `/works/` not directly to the project

### Decision: incremental restructure, preserve CSS classes

Add a new `.featured-work` section after the hero using existing primitives. Keep
`.split-overview` but trim repeated eyebrow/H2 phrasing. Replace the `.index-feed`
works feed with a Technical Writing section (blog renamed). Add a compact About/Contact
section before the footer.

**Rationale**: The existing CSS classes (`.section`, `.highlight-card`, `.action-row`,
`.button`, `.tag-list`, `.split-overview`, `.feature-list`, `.eyebrow`) cover the
visual language needed. Adding one new `.featured-work` block class is the only
structural CSS addition needed.

---

## 2. Featured Work Block

### Approach

The Featured Work section reads the first work from the sorted collection (order: 1 is
the Azure case study) and renders a two-column card: image on the left, content on the
right. This mirrors the existing `.work-card` layout (already a 3-column grid in global.css)
but simplified for a 2-column prominence layout.

On mobile (≤760px), the `grid-template-columns` collapses to 1fr per the existing
responsive rule that already targets `.work-card`.

The section uses:
- `.section` for width/padding
- A new `.featured-work` class for the 2-column card layout
- `.tag-list` for technology tags (6 max per FR-007)
- `.action-row` for CTA buttons
- `.button` for "View Case Study"
- A plain `<a>` with target="_blank" for "View Live Project"
- `.meta` for the deployment status badge

**Rationale**: No new CSS primitives needed beyond `.featured-work`. All existing
token variables (colors, spacing, typography) apply unchanged.

---

## 3. Project Placeholder Image

### Decision: SVG in `public/images/` directory

**Option A — Astro `image()` with SVG in `src/content/works/`**: Uses Astro's image
pipeline; SVGs technically pass through but `widths` parameter in `<Image>` causes
a build warning. Requires `thumbnail` in frontmatter.

**Option B — SVG in `public/images/` with raw `<img>` tag**: Served at
`/astro-keel/images/azure-agentic-placeholder.svg`. No Astro processing. Templates
use `<img>` with descriptive `alt`. Replacing with real screenshot requires updating
the URL in one constant or the Astro template fallback.

**Option C — Thumbnail frontmatter field with Astro image**: Add a real PNG/JPG
placeholder asset to `src/assets/works/` and reference via `thumbnail` frontmatter.

**Decision: Option B** — SVG placeholder in `public/images/`. The MDX and Astro
templates reference a constant URL. When a real screenshot is available, it replaces
the SVG file or the template path is changed to use the Astro `thumbnail` field.

The placeholder SVG must visually communicate: AI/cloud project, Azure branding palette,
agentic/data theme, professional quality. Use a grid of labelled component boxes
(frontend, API, agent, SQL) on a dark-ish background with the project title.

---

## 4. Content Collection Schema Change

### Decision: add `liveUrl` field

The existing `link` field (already `z.string().url().optional()`) is used in `[slug].astro`
as a "Visit" CTA button. Rather than repurpose this field, add a separate `liveUrl` field
to carry the live project URL across all templates explicitly.

```typescript
liveUrl: z.string().url().optional(),
```

This is backward-compatible (optional). Existing MDX files without it continue building.
Templates can render it as "View Live Project" with `target="_blank"`.

**Rationale**: Keeping `link` and `liveUrl` separate means `link` can carry a GitHub repo
or docs link in future, while `liveUrl` is always the live demo. Avoids overloading one
field with two semantics.

---

## 5. CSS Additions for Diagram Containers

### Diagram scroll container

Both the architecture diagram and ER diagram are inline SVGs with `width="100%"` and a
`max-width`. On narrow viewports, `width="100%"` already scales them down. But on very
narrow viewports (390px) nodes become unreadable.

Add `.diagram-scroll` wrapper class:
```css
.diagram-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.diagram-scroll svg {
  min-width: 600px;  /* architecture SVG min readable width */
}
.diagram-scroll.er-diagram svg {
  min-width: 860px;  /* ER SVG needs more width for 10 entities */
}
```

The wrapper `<div class="diagram-scroll">` goes around each SVG in the MDX file.
This prevents the page from scrolling horizontally while letting the diagram scroll
within its container.

**Alternative considered**: CSS `transform: scale()` — rejected because it breaks tooltip
positioning and makes text unreadable.

---

## 6. Architecture SVG Redesign

### Current issues

The simplified view places nodes at fixed x-coordinates with a roughly horizontal
left-to-right flow. Problems:
- Response return path (Azure SQL → FastAPI) uses a long dashed vertical line that's
  visually ambiguous
- `Terraform` and `Managed Identity` appear at the bottom but are not connected to other
  components with visible lines
- Node sizes are inconsistent (User is 80px wide, others range 110–120px)
- The SVG height (440) has significant empty space at the top and bottom

### Redesign approach

Keep viewBox width at 900 for simplified, increase height to 480 to give proper spacing.
Arrange nodes in clear horizontal bands by function:

```
Band 1 (y≈40):   [User]
Band 2 (y≈110):  [React/nginx Frontend]
Band 3 (y≈190):  [FastAPI Backend]        [Cosmos DB ←→ FastAPI]
Band 4 (y≈290):  [FoundryAgent]  [SQL Query Tool]
Band 5 (y≈380):  [Azure SQL]
```

Supporting components (Managed Identity, Terraform) appear on the right at y≈350-420
with lighter visual treatment (smaller boxes, muted borders).

Request flow arrows go strictly downward. The response path is a dashed return arrow
on the right side going back upward.

**Simplied view nodes**: User, React/nginx, FastAPI, FoundryAgent, SQL Query Tool,
Azure SQL, Cosmos DB, Managed Identity (supporting), Terraform (supporting).

**Full view adds**: Chat Orchestrator, Microsoft Foundry, ACR, ACA Environment,
Log Analytics, MS Fabric (inactive/dashed). Full view viewBox expands to 900×560.

### Visual encoding

- Joel-configured: `fill="var(--color-accent-soft)" stroke="var(--color-accent)"`
- Microsoft-provided: `fill="var(--color-surface)" stroke="var(--color-line-strong)"`
- Inactive alternative: `opacity="0.4"` + `stroke-dasharray="5 3"`
- Supporting infrastructure (Terraform, Managed Identity): accent-soft fill, secondary
  position, smaller label font

---

## 7. ER Diagram Expansion (10 Entities)

### Missing entities from current diagram (8 entities)

Current: Customer, SalesOrderHeader, SalesOrderDetail, Product, ProductCategory,
ProductModel, CustomerAddress, Address

Missing:
- **SalesLT.ProductDescription** — text descriptions for products (ID, Description)
- **SalesLT.ProductModelProductDescription** — junction table linking ProductModel to
  ProductDescription, with Culture (language code) as part of composite PK

### Layout expansion

Current viewBox: `0 0 760 500`. Expand to `0 0 1000 560` to accommodate 2 additional
entities in the Product Catalog group (right column).

**Placement**:
- ProductDescription: x=720, y=10, width=180, height=72 (top-right, beside ProductModel)
- ProductModelProductDescription: x=720, y=130, width=200, height=72 (junction table,
  below ProductDescription, clearly marked as junction with composite PK notation)

**New FK relationships to add**:
- ProductModelProductDescription.ProductModelID → ProductModel.ProductModelID (line from x≈820, y=130 to x≈590, y=82)
- ProductModelProductDescription.ProductDescriptionID → ProductDescription.ProductDescriptionID (line from x≈820, y=202 to x≈810, y=82)

**Entity cards for new entities**:
```
SalesLT.ProductDescription
  ProductDescriptionID (PK)
  Description

SalesLT.ProductModelProductDescription  [junction]
  ProductModelID (PK+FK)
  ProductDescriptionID (PK+FK)
  Culture (PK)
```

Culture is a language code (e.g., 'en') and part of the composite PK — note this
visually to distinguish the junction table function.

---

## 8. Case Study Content Changes

### Sections to add/restructure (no new technical facts)

**Hero area restructure** (FR-016/017): The existing `work-status` span and attribution
div at the top of the MDX become a more scannable header block. Add a role line:
"Cloud Deployment · Infrastructure · Modernization · Troubleshooting". Add live
project link with target="_blank".

**At-a-Glance block** (FR-018): 3–5 item summary using a simple definition-list or
a grid of labeled items. Reuse `.about-ledger` visual style (bordered grid cells).
Items: What was built / Role / Status / Key technologies / Validation.

**My Contribution restructure** (FR-020/021): Replace the flat bullet list with two
clearly separated blocks: "Microsoft provided" and "What I did". Group Joel's work
into four labeled categories: Application, Infrastructure, Security & Data,
Engineering & Validation. Use `<details>`-free approach — just visible labeled groups.

**Key Architectural Decision section** (FR-023/024/025): New section between My
Contribution and Architecture. Present as a labeled sequence with 5 stages.

**Validation Results opener** (FR-042): Add "11/11 validation scenarios passed."
as the first sentence before the `<table>`.

**Production Considerations reframe** (FR-043): Change from "intentionally out of
scope" list to "What I would add for a production deployment" — same items, positive framing.

**Related Technical Writing** (FR-044): New section near the end, replacing the
existing `<aside>` blog callout with a proper section listing future article topics.

**How It Works improvement** (FR-039): Reduce the numbered list item text to one
concise sentence each — remove the multi-sentence explanations.

**Troubleshooting structure** (FR-041): Restructure each item from `**N. Title** —
description` to labeled **Problem / Root Cause / Fix** format.

---

## 9. About Page Restructure

### Current structure

1. `page-head` section: H1 + lead
2. `prose-grid` section: "Profile" / "From business need to working solution." + 2 paragraphs
3. `section > about-ledger`: 3 ledger items (01 Current focus, 02 Background, 03 Contact)
4. `prose-grid about-closing`: "Approach" / "From prototype to production." + 1 paragraph

### New structure (FR-048)

1. `page-head` section: H1 "Introduction" → keep as page opener
2. `prose-grid` section: "What I Focus On" — AI, agents, cloud, automation, practical digital solutions
3. `section` with flow list: "How I Work" — problem → solution → build → deploy → troubleshoot → validate
4. `prose-grid` section: "Current Interests" — brief forward-looking content
5. `section > about-ledger`: Contact items (GitHub, LinkedIn, Email) — remove the numbered "01/02/03" structure or repurpose it

**Decision**: Reuse existing CSS classes throughout. The `about-ledger` grid can serve
as the Contact section. Eliminate the "about-closing" section by incorporating
the "From prototype to production" theme into the How I Work section.

**Contact email**: `samajoel@icloud.com` (from user_identity.md — portfolio email).
GitHub: https://github.com/samajoel
LinkedIn: https://www.linkedin.com/in/joel-mateo-samaniego/

---

## 10. Mobile and Responsive

### No regressions needed

The existing `@media (max-width: 760px)` rules already collapse `.work-card`,
`.split-overview`, `.highlight-grid`, `.about-ledger` to single-column. New CSS
additions must include corresponding mobile rules where applicable.

### New `.diagram-scroll` on mobile

The diagram-scroll container needs `overflow-x: auto` at all widths. The `min-width`
on the inner SVG ensures mobile triggers the horizontal scroll rather than collapsing.
No additional mobile media query override needed — the `overflow-x: auto` works at
all breakpoints.

### Touch target sizes

Interactive elements (arch-toggle button, diagram nodes) already have reasonable sizes.
The JS click handler in `azure-agentic-diagram.js` already fires on click events which
map to tap on mobile. No changes required for basic touch compatibility.

---

## 11. Dark Mode Verification

All new CSS must use existing custom property tokens only:

| Token | Usage |
|---|---|
| `var(--color-bg)` | Page background |
| `var(--color-surface)` | Card/element backgrounds |
| `var(--color-text)` | Primary text |
| `var(--color-muted)` | Secondary text, captions |
| `var(--color-accent)` | Borders, highlights, accent |
| `var(--color-accent-soft)` | Subtle tinted backgrounds |
| `var(--color-on-accent)` | Text on accent background |
| `var(--color-line)` | Subtle borders |
| `var(--color-line-strong)` | Strong borders |

No hard-coded hex/rgb values in any new CSS or SVG attributes. SVG `fill` and `stroke`
attributes must use `var(--color-*)` references.

---

## 12. Build Validation

**Command**: `npm run build` from repo root.

**Expected**: 7+ pages built (existing: home, works, works/azure-agentic-case-study,
about, blog, search, rss.xml). No TypeScript errors, no Astro content validation errors.

The content schema addition (`liveUrl`) is backward-compatible. The SVG placeholder in
`public/` is a static file; no processing needed.
