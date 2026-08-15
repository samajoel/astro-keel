# Research: Azure Agentic Case Study

**Date**: 2026-08-14
**Feature**: specs/002-azure-agentic-case-study

---

## Finding 1 — Works collection schema is fully compatible; no changes needed

**Decision**: The MDX file uses the existing `works` collection schema without modification.

**Verified schema fields** (`src/content.config.ts`):
- `title: z.string()` ✅ — "Modernizing and Deploying an Agentic Data Application on Azure"
- `description: z.string()` ✅ — short description
- `tech: z.array(z.string())` ✅ — 12 technology tags
- `link: z.string().url().optional()` ✅ — omitted (no canonical project URL)
- `repo: z.string().url().optional()` ✅ — omitted (accelerator repo is Microsoft's)
- `thumbnail: image().optional()` ✅ — omitted initially; added when screenshot assets available
- `order: z.number().optional()` ✅ — set to 1 (first and featured work)
- `publishDate: z.coerce.date()` ✅ — 2026-08-14

**Rationale**: The existing schema handles all case study needs. No schema extension required.

---

## Finding 2 — Works detail layout renders MDX body inside `.prose` container

**Decision**: All custom HTML, SVG, and inline scripts go directly in the MDX body. No new
Astro component is needed.

**How `[slug].astro` works**:
1. Imports `render()` from `astro:content` and calls `await render(entry)` to get `<Content />`
2. Wraps `<Content />` in `<div class="prose">` inside `<article data-pagefind-body>`
3. The `data-pagefind-body` attribute means the case study text is indexed by Pagefind search

**Implication**: Inline `<script>` tags in MDX ARE processed by Astro's MDX pipeline. They
are emitted as regular `<script>` elements in the output HTML. Vanilla JS in these scripts
runs in the browser. This is the supported pattern for MDX interactivity in Astro.

**Rationale**: No component abstraction needed. The MDX file is self-contained.

---

## Finding 3 — D3.js rejected; inline SVG + vanilla JS chosen

**Decision**: Interactive architecture and data model diagrams are built with inline SVG and
vanilla JavaScript. No new npm dependency added.

**D3.js evaluation**:
- Size: ~600 KB minified, ~170 KB gzipped
- Purpose in this project: position nodes in a diagram (can be done with fixed SVG coordinates),
  add event listeners for hover/click (vanilla JS), draw lines/arrows (SVG `<path>`)
- D3 adds value for dynamic, data-driven layouts (force simulation, axis scales). Our diagrams
  are static layouts with fixed node positions. D3 would be used for <5% of its capability.
- Constitution Principle XI: Minimal Dependencies — D3 fails this test.

**Inline SVG + vanilla JS capability**:
- Fixed-position nodes: `<rect>` + `<text>` at predetermined `(x, y)` coordinates ✅
- Arrows/connections: `<line>` or `<path>` with `marker-end` arrowhead ✅
- Hover tooltips: `mouseover`/`mouseout` event listeners on `<g>` elements ✅
- Click for details: `click` listener toggles a detail panel ✅
- Show/hide full view: `hidden` attribute toggled on a `<g>` group ✅
- Light/dark mode: `fill: var(--color-accent-soft)` etc. adapt automatically ✅
- Mobile: `viewBox` + `width="100%"` makes SVG responsive ✅

**Alternatives considered**:
- Mermaid.js: lighter than D3 but still a new dependency (~400 KB). Also produces non-custom
  output that doesn't match the portfolio's visual language.
- CSS-only diagram: feasible for a simple flow but cannot achieve the two-view toggle and
  hover interaction cleanly.
- Pure inline SVG without JS: would produce a readable diagram but no interactivity. Rejected
  because the spec requires hover/click detail display.

---

## Finding 4 — AdventureWorksLT authoritative schema

**Decision**: Use the verified columns and relationships from the Microsoft-published
AdventureWorksLT schema (available on Microsoft Learn and the AdventureWorks GitHub repo).
Only include what is in data-model.md — no invented columns or relationships.

**Verified core entities and relationships**:

| Table | PK | FK(s) |
|-------|-----|-------|
| `SalesLT.Customer` | `CustomerID` | — |
| `SalesLT.SalesOrderHeader` | `SalesOrderID` | `CustomerID → Customer` |
| `SalesLT.SalesOrderDetail` | `SalesOrderDetailID` | `SalesOrderID → SalesOrderHeader`, `ProductID → Product` |
| `SalesLT.Product` | `ProductID` | `ProductModelID → ProductModel`, `ProductCategoryID → ProductCategory` |
| `SalesLT.ProductCategory` | `ProductCategoryID` | `ParentProductCategoryID → ProductCategory` (self-ref) |
| `SalesLT.ProductModel` | `ProductModelID` | — |
| `SalesLT.Address` | `AddressID` | — |
| `SalesLT.CustomerAddress` | `CustomerID + AddressID` (composite) | `CustomerID → Customer`, `AddressID → Address` |

**Key columns per entity** (selected for the diagram — not exhaustive):

- **Customer**: CustomerID (PK), FirstName, LastName, EmailAddress
- **SalesOrderHeader**: SalesOrderID (PK), CustomerID (FK), OrderDate, TotalDue
- **SalesOrderDetail**: SalesOrderDetailID (PK), SalesOrderID (FK), ProductID (FK), OrderQty, LineTotal
- **Product**: ProductID (PK), ProductModelID (FK), ProductCategoryID (FK), Name, ListPrice
- **ProductCategory**: ProductCategoryID (PK), ParentProductCategoryID (FK), Name
- **ProductModel**: ProductModelID (PK), Name
- **Address**: AddressID (PK), AddressLine1, City, StateProvince, CountryRegion
- **CustomerAddress**: CustomerID (FK), AddressID (FK), AddressType

**Disclaimer to include on the page**: "Showing entities and relationships relevant to
natural-language data queries in this project. Not the complete AdventureWorksLT schema."

---

## Finding 5 — MDX inline `<script>` scope and Astro behavior

**Decision**: Use a single `<script>` block at the bottom of the MDX file. Use `document.getElementById`
and `querySelectorAll` scoped to the diagram container IDs to avoid conflicts with the rest of
the page.

**Astro MDX script behavior**:
- MDX files in Astro can contain `<script>` tags
- In production builds, Astro may hoist or bundle inline scripts. To ensure the script runs
  after DOM is ready, wrap in `document.addEventListener('DOMContentLoaded', ...)` or use
  `<script is:inline>` syntax to prevent bundling.
- `<script is:inline>` in Astro MDX executes as a regular browser script, which is correct
  for our use case (no module imports needed).

**Tooltip implementation**:
- A `<div id="arch-tooltip">` is defined outside the SVG, positioned `fixed` via CSS
- On `mouseover`, the JS reads `getBoundingClientRect()` from the hovered `<g>` and positions
  the tooltip div. On `mouseout`, it hides the tooltip.
- The tooltip text comes from `data-detail` attributes on each node `<g>`.

---

## Finding 6 — CSS variable availability in inline SVG

**Decision**: All SVG `fill`, `stroke`, and `color` values use CSS custom properties from
`src/styles/global.css`. These are defined on `:root` for both light and dark mode. SVG
elements within the document inherit them automatically.

**Available variables**:
- `--color-accent` — primary accent (warm orange light, amber dark)
- `--color-accent-soft` — translucent accent (good for node fills)
- `--color-accent-hover` — hover state
- `--color-bg` — page background
- `--color-surface` — card/panel surface
- `--color-text` — primary text
- `--color-muted` — secondary text and arrows
- `--color-line` — borders and light rules
- `--color-line-strong` — stronger borders

**Dark mode**: When `data-theme='dark'` is applied to `<html>`, the variables switch
automatically (via `[data-theme='dark']` CSS rule). SVG elements using these variables
update immediately — no JavaScript needed for dark mode support.

---

## Finding 7 — Screenshot placeholder pattern

**Decision**: Use `<figure class="screenshot-placeholder">` with a `<figcaption>` describing
what the screenshot will show. No `<img>` tag until the asset exists. CSS styles the
placeholder as a bordered empty rectangle with the figcaption centered.

**Pattern**:
```html
<figure class="screenshot-placeholder">
  <figcaption>Screenshot: Live deployed application — add when available</figcaption>
</figure>
```

**CSS**: The `.screenshot-placeholder` class uses an `::before` pseudo-element or direct
styling to show a dashed border box. No inline styles needed; add to `global.css` as a
single rule block during implementation.

---

## Finding 8 — Pagefind search index compatibility

**Decision**: The case study MDX is wrapped in `<article data-pagefind-body>` by the
`[slug].astro` layout. All prose content inside `<Content />` is indexed automatically.
SVG text content is also indexable (Pagefind parses `<text>` in SVG). No special configuration.

**Implication**: No action needed. The case study will appear in site search results
automatically once added to the works collection.
