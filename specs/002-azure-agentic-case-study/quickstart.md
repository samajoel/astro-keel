# Quickstart Validation: Azure Agentic Case Study

**Date**: 2026-08-14
**Purpose**: Prove the case study page works end-to-end after implementation.

---

## Prerequisites

- `npm install` completed
- Repository at `https://github.com/samajoel/astro-keel`
- `src/content/works/azure-agentic-case-study.mdx` created

---

## Step 1 — Build validation (required gate)

```bash
npm run build
```

**Expected**: Exit code 0. No TypeScript errors. No MDX parse errors. No broken image imports.

**Pass**: `6 page(s) built` → `7 page(s) built` (new works detail page added).
**Fail**: Any error → fix before continuing.

---

## Step 2 — Preview

```bash
npm run preview
```

Open `http://localhost:4321/astro-keel/`

---

## Step 3 — Works index

Navigate to `/astro-keel/works/`:

- [ ] Case study card appears with title, description, and tech tags
- [ ] "Modernizing and Deploying an Agentic Data Application on Azure" is the entry title
- [ ] Technology tags include FastAPI, Terraform, Azure Container Apps, Azure SQL, Microsoft Foundry
- [ ] No demo placeholder content appears
- [ ] Clicking the card navigates to the case study detail page

---

## Step 4 — Case study detail page

Navigate to `/astro-keel/works/azure-agentic-case-study/`:

**Header (from layout)**:
- [ ] Page title: "Modernizing and Deploying an Agentic Data Application on Azure"
- [ ] Short description is shown
- [ ] Tech stack sidebar lists all 12 technology tags
- [ ] Publish date shown (2026-08-14)
- [ ] No "Visit project" or "View repository" button (link and repo fields are omitted)

**Attribution callout**:
- [ ] Microsoft attribution statement is visible at the top of the body
- [ ] Text matches: "This project is based on Microsoft's Agentic Applications for Unified
  Data Foundation solution accelerator; my work focused on modernization, Terraform
  infrastructure management, Azure deployment, troubleshooting, integration changes and
  end-to-end validation."

**Status**:
- [ ] "Completed · Deployed" status indicator is shown

**Sections present**:
- [ ] Problem section
- [ ] Solution section
- [ ] My Contribution section (with Microsoft vs. Joel distinction)
- [ ] Architecture section with interactive SVG diagram
- [ ] Data Model section with ER-style SVG
- [ ] How It Works section (NL-to-data flow)
- [ ] Technical Challenge section (App Service quota story)
- [ ] Additional Troubleshooting section (7 items)
- [ ] Validation Results table (11 PASS rows)
- [ ] Production Considerations section
- [ ] Screenshots section (6 placeholder figures, no broken images)
- [ ] Further Reading / blog callout

---

## Step 5 — Architecture diagram interaction

- [ ] Simplified view is shown by default (User → Frontend → FastAPI → FoundryAgent → SQL Tool → Azure SQL)
- [ ] Cosmos DB and supporting nodes visible
- [ ] Hovering over a node shows a tooltip with responsibility details
- [ ] "Show full architecture" button is present and clickable
- [ ] Clicking the button reveals full view (ACR, Container Apps Environment, Managed Identity,
  Log Analytics, Terraform, Microsoft Fabric alternative path)
- [ ] Fabric alternative path is visually distinguished (dashed/greyed)
- [ ] Clicking "Show full architecture" again collapses back to simplified view
- [ ] Static text fallback description of the architecture is present below the diagram

---

## Step 6 — Data model diagram

- [ ] ER-style diagram shows at minimum: Customer, SalesOrderHeader, SalesOrderDetail, Product
- [ ] Supporting entities present: ProductCategory, ProductModel, Address, CustomerAddress
- [ ] Relationship lines connect entities correctly
- [ ] No invented or unverified column detail is shown
- [ ] Disclaimer text present: "Not the complete AdventureWorksLT schema"

---

## Step 7 — Validation table

- [ ] Table has 11 rows
- [ ] All 11 outcomes show PASS status
- [ ] Items include: backend warm health, backend cold-start, frontend availability,
  runtime config, Cosmos connectivity, SQL connectivity, E2E AI chat and streaming,
  conversation persistence, Terraform state, no committed secrets, repeatable deployment

---

## Step 8 — Screenshot placeholders

- [ ] 6 placeholder figures are present
- [ ] No broken image icons — each placeholder shows a labeled empty state
- [ ] Labels describe: live application, natural-language query, Container Apps, MS Foundry
  agent, Azure SQL/Cosmos, Terraform validation

---

## Step 9 — Dark mode

- [ ] Toggle dark mode
- [ ] Architecture SVG diagram adapts (node fills and strokes use CSS variables — change automatically)
- [ ] ER diagram adapts
- [ ] All text remains legible
- [ ] Validation table and all prose sections remain readable

---

## Step 10 — Mobile check (375px)

- [ ] Architecture SVG is responsive (no overflow, readable node labels)
- [ ] ER diagram is readable (may scroll horizontally if needed, but no overflow clipping)
- [ ] All prose sections flow correctly
- [ ] Validation table is scrollable horizontally if wider than viewport

---

## Step 11 — SEO metadata

View page source:

- [ ] `<title>Modernizing and Deploying an Agentic Data Application on Azure — Joel Samaniego</title>`
- [ ] `<meta property="og:type" content="article">`
- [ ] Page is included in Pagefind search index (search for "Container Apps" returns the case study)

---

## Step 12 — Works index empty state no longer shown

- [ ] Navigating to `/astro-keel/works/` shows the case study card, not the empty-state message

---

## Done criteria

All checklist items above are checked. `npm run build` exits with code 0.
The case study is live at `https://samajoel.github.io/astro-keel/works/azure-agentic-case-study/`
after the next push to `main`.
