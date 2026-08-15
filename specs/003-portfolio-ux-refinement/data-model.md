# Data Model: Portfolio UX and Professional Positioning Refinement

**Feature**: 003-portfolio-ux-refinement
**Date**: 2026-08-14

---

This feature modifies presentation and content structure, not a database or application
data store. "Data model" here describes the five named entities from the spec and how
each maps to the implementation.

---

## Entity 1: Featured Work Block

**Description**: A homepage section that prominently surfaces the primary portfolio
project directly on the homepage, before the visitor navigates to `/works/`.

**Fields used**:
- `work.data.title` — project title (linked to case study)
- `work.data.description` — one-sentence project description
- `work.data.tech` — technology tags (max 6 from array; hardcoded selection in template)
- `work.data.liveUrl` — live project URL (opens in new tab)
- `work.id` — used to construct `withBase('/works/{id}/')` case study link
- Static placeholder image URL — `/astro-keel/images/azure-agentic-placeholder.svg`

**Derivation**: Reads `works` collection sorted by `order` ascending; takes first entry
(Azure case study has `order: 1`). Same data source as the existing works feed.

**Relationship**: Featured Work reads the same `works` collection as `src/pages/works/index.astro`.
Both must remain consistent. When a real thumbnail is added, both pages update from frontmatter.

**Display context**: `src/pages/index.astro` — directly after the hero section.

---

## Entity 2: At-a-Glance Block

**Description**: A scannable summary block at the top of the case study page.
Presents 5 key facts: what was built, Joel's role, deployment status, key technologies,
and validation outcome.

**Fields** (all static prose, no data binding):
- What was built: "Modernized and deployed Microsoft's agentic enterprise-data accelerator"
- Role: "Cloud Deployment · Infrastructure · Modernization · Troubleshooting"
- Status: "Deployed · Live"
- Key technologies: "Microsoft Foundry · Azure Container Apps · Terraform · Python · Azure SQL"
- Validation: "11/11 validation scenarios passed"

**Constraints**:
- All 5 facts must be visible without scroll on a standard desktop viewport
- Uses `.about-ledger`-style bordered grid for visual consistency with the About page

**Display context**: `src/content/works/azure-agentic-case-study.mdx` — between the
hero block and the Problem section.

---

## Entity 3: Key Architectural Decision Section

**Description**: A case study section that surfaces the App Service → Container Apps
architectural pivot as deliberate engineering judgment, before the troubleshooting
section where it previously appeared.

**Stages** (static content structure):
1. Original Approach — Azure App Service B1 (per accelerator instructions)
2. Constraint — East US App Service VM quota = 0 cores; deployment blocked
3. Investigation — Quota limits confirmed, no immediate path forward via App Service
4. Decision — Pivot to Azure Container Apps Consumption plan (no pre-allocated VM quota)
5. Outcome — Full stack deployed successfully; Terraform manages Container Apps environment

**Display context**: `src/content/works/azure-agentic-case-study.mdx` — between
My Contribution and Architecture sections.

**Relationship to Technical Challenge section**: The Technical Challenge section
(later in the page) provides additional detail on implementation steps. The Key
Architectural Decision section focuses on the decision itself and its significance.
No duplication of prose — each section has a distinct purpose.

---

## Entity 4: Project Placeholder Image

**Description**: A polished SVG visual that represents the Azure Agentic project
on the Works index, homepage Featured Work section, and optionally the case study
header, before a real application screenshot is available.

**File**: `public/images/azure-agentic-placeholder.svg`

**Visual requirements**:
- 720×480 viewBox (matches thumbnail dimensions expected by templates)
- Dark background (near-neutral dark, similar to `var(--color-soft)` in dark mode)
- Project title text: "Agentic Data Application"
- Azure technology labels arranged as a mini architecture sketch
- Intentional, professional aesthetic — not a "missing image" placeholder
- Uses a fixed dark palette (not CSS variables — static SVG file) so it displays
  correctly in both light and dark modes without JavaScript

**Replacement path**:
1. Add `thumbnail` (Astro image) field to frontmatter with real screenshot path, OR
2. Update the static `src` URL in Astro templates to point to a new public image

**Display context**: Referenced from `src/pages/index.astro` (Featured Work section)
and `src/pages/works/index.astro` (work card).

---

## Entity 5: Portfolio Visitor

**Description**: The end-user navigating the site. Not a persisted entity — represents
the reader persona that informs all layout and content decisions.

**Three primary visitor types**:

| Type | Primary goal | Time budget | Key section |
|---|---|---|---|
| Recruiter | Quick read: who is Joel, what does he build? | 30–90 sec | Homepage hero + Featured Work |
| Technical lead | Deep read: what did Joel actually do? | 5–10 min | Case study: Contribution + Architecture |
| General professional | General orientation | 2–3 min | About page + works overview |

**Design implications**:
- Layer 1 (homepage hero) must work for all three visitor types in 30 seconds
- Layer 2 (Featured Work) delivers proof to recruiter
- Layer 3 (case study My Contribution) satisfies technical evaluator's first check
- Layers 4–6 (architecture, troubleshooting, validation) reward deeper reading

---

## AdventureWorksLT ER Diagram: Verified Entities and Relationships

These are the factual data structures used in the ER diagram visualization (FR-033–FR-038).
This is reference data only — not a schema to be created or migrated.

### 10 Verified Entities

| Entity | PK | Notes |
|---|---|---|
| SalesLT.Customer | CustomerID | First name, last name, email |
| SalesLT.CustomerAddress | CustomerID + AddressID | Composite PK, junction table |
| SalesLT.Address | AddressID | City, state, country |
| SalesLT.SalesOrderHeader | SalesOrderID | OrderDate, TotalDue, Status |
| SalesLT.SalesOrderDetail | SalesOrderDetailID | OrderQty, LineTotal |
| SalesLT.Product | ProductID | Name, ListPrice, SellStartDate |
| SalesLT.ProductCategory | ProductCategoryID | Name, self-referencing hierarchy |
| SalesLT.ProductModel | ProductModelID | Name |
| SalesLT.ProductDescription | ProductDescriptionID | Description text |
| SalesLT.ProductModelProductDescription | ProductModelID + ProductDescriptionID + Culture | Junction table, composite PK |

### 12 Verified FK Relationships

| FK Column | → References |
|---|---|
| CustomerAddress.CustomerID | Customer.CustomerID |
| CustomerAddress.AddressID | Address.AddressID |
| Product.ProductCategoryID | ProductCategory.ProductCategoryID |
| Product.ProductModelID | ProductModel.ProductModelID |
| ProductCategory.ParentProductCategoryID | ProductCategory.ProductCategoryID (self) |
| ProductModelProductDescription.ProductModelID | ProductModel.ProductModelID |
| ProductModelProductDescription.ProductDescriptionID | ProductDescription.ProductDescriptionID |
| SalesOrderDetail.ProductID | Product.ProductID |
| SalesOrderDetail.SalesOrderID | SalesOrderHeader.SalesOrderID |
| SalesOrderHeader.CustomerID | Customer.CustomerID |
| SalesOrderHeader.ShipToAddressID | Address.AddressID |
| SalesOrderHeader.BillToAddressID | Address.AddressID |

### ER Diagram Grouping (FR-034)

- **Customers**: Customer, CustomerAddress, Address
- **Sales**: SalesOrderHeader, SalesOrderDetail
- **Product Catalog**: Product, ProductCategory, ProductModel, ProductDescription, ProductModelProductDescription

### Core Business Path (FR-035, visually emphasized)

Customer → SalesOrderHeader → SalesOrderDetail → Product → ProductCategory

### Architecture Diagram: Verified Components (FR-028)

15 verified components for the full architecture view:

| Component | Type | Notes |
|---|---|---|
| User | External | Browser client |
| React / nginx Frontend | Joel-configured | Container App |
| Python FastAPI Backend | Joel-configured | Container App |
| Chat Orchestrator | Microsoft-provided | Routes queries |
| Microsoft Foundry | Microsoft-provided | AI project runtime |
| FoundryAgent (first-agent) | Microsoft-provided | Agent definition |
| SQL Query Tool | Microsoft-provided | NL → T-SQL |
| Azure SQL (AdventureWorksLT) | Joel-configured | Active SQL backend |
| Cosmos DB | Joel-configured | Conversation persistence |
| Azure Container Registry | Joel-configured | Image registry |
| ACA Environment | Joel-configured | Consumption tier |
| Managed Identity | Joel-configured | User-assigned, credential-less |
| Log Analytics | Joel-configured | Diagnostic logs |
| Terraform | Joel-configured | IaC, brownfield |
| Microsoft Fabric | Inactive alternative | USE_DATA_AGENT=false, not active |
