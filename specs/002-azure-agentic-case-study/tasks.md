---
description: "Task list for Azure agentic case study implementation"
---

# Tasks: Azure Agentic Case Study

**Input**: Design documents from `specs/002-azure-agentic-case-study/`

**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | quickstart.md ✅

**Tests**: Not requested — validation is `npm run build` + manual spot check per quickstart.md.

**Organization**: All content goes into a single MDX file. Tasks are sequential additions to
that file, grouped by user story. No [P] markers within same-file tasks; they conflict.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no dependencies). Rarely applicable here — single file.
- **[Story]**: Maps to user story (US1–US4) from spec.md
- All tasks include exact file paths

---

## Phase 1: Setup — MDX File Foundation

**Purpose**: Create the works entry file with complete frontmatter so the case study
appears in the Works index immediately. This unblocks all subsequent story phases.

**⚠️ CRITICAL**: No user story sections can be written until T001 is complete (file must exist).

- [x] T001 Create `src/content/works/azure-agentic-case-study.mdx` with the following
  frontmatter block and an empty body (the file is created once; all sections below are
  appended to it in subsequent tasks):
  ```yaml
  ---
  title: 'Modernizing and Deploying an Agentic Data Application on Azure'
  description: "Modernized and deployed Microsoft's agentic enterprise-data accelerator using FastAPI, Terraform, Managed Identity, Azure Container Apps, and Azure SQL."
  tech:
    - Python
    - FastAPI
    - Terraform
    - Azure Container Apps
    - Azure Container Registry
    - Managed Identity
    - Azure RBAC
    - Azure SQL
    - Cosmos DB
    - Microsoft Foundry
    - React
    - Log Analytics
  order: 1
  publishDate: 2026-08-14
  ---
  ```

**Checkpoint**: `npm run build` passes; `/works/` index shows the case study card with title,
description, and tech tags.

---

## Phase 2: User Story 1 — Recruiter Quick Assessment (Priority: P1) 🎯

**Goal**: A recruiter can read the hero area, problem/solution narrative, contribution
breakdown, validation outcomes, and production considerations and understand the project
within 5 minutes.

**Independent Test**: Open the detail page; identify Microsoft vs. Joel contributions; read
the 11 PASS outcomes; read the "not implemented" list.

### Implementation for User Story 1

- [x] T002 [US1] Append the following sections to the MDX body of
  `src/content/works/azure-agentic-case-study.mdx`:

  **Attribution callout** (FR-002):
  ```html
  <div class="work-attribution">
  <p><strong>Attribution:</strong> This project is based on Microsoft's Agentic Applications
  for Unified Data Foundation solution accelerator; my work focused on modernization, Terraform
  infrastructure management, Azure deployment, troubleshooting, integration changes and
  end-to-end validation.</p>
  </div>
  ```

  **Status badge** (FR-005):
  ```html
  <p><span class="work-status">Completed · Deployed</span></p>
  ```

  **Problem section** (FR-006) — `## Problem` heading + prose explaining:
  - Starting point: Microsoft's "Agentic Applications for Unified Data Foundation" accelerator
  - Original deployment target: Azure App Service (B1 plan)
  - Blocker: Azure subscription had zero App Service VM quota in East US — provisioning failed
  - Consequence: Could not follow the accelerator's prescribed deployment path

  **Solution section** (FR-007) — `## Solution` heading + prose explaining:
  - Decision to adopt Azure Container Apps Consumption as the hosting target
  - Introduction of Terraform for brownfield infrastructure ownership
  - Container images pushed to Azure Container Registry (ACR) and deployed via Container Apps
  - User-assigned Managed Identity for credential-less service access
  - Azure SQL as the active structured-data backend with AdventureWorksLT sample data
  - Cosmos DB for conversation persistence
  - Deployment automation scripts to orchestrate the full stack

- [x] T003 [US1] Append My Contribution section to
  `src/content/works/azure-agentic-case-study.mdx` (FR-008, FR-009):

  `## My Contribution` heading + clear distinction between Microsoft-provided and Joel-configured:

  **Microsoft-provided components** (used as-is, not authored by Joel):
  - Microsoft Foundry project and agent runtime
  - FoundryAgent ("first-agent") definition and tool registration
  - SQL Query Tool agent implementation
  - Chat orchestration layer
  - React frontend application (base)
  - Original accelerator architecture and configuration

  **Joel's engineering work** (9 enumerated activities):
  1. FastAPI backend modernization and customization
  2. Terraform brownfield infrastructure configuration (Container Apps, ACR, Managed Identity,
     Log Analytics, RBAC role assignments)
  3. Architectural pivot from Azure App Service to Azure Container Apps Consumption
  4. Container image build and deployment pipeline via ACR and Azure CLI
  5. User-assigned Managed Identity configuration and RBAC role assignments
  6. Azure SQL networking, firewall rules, and Entra authorization (contained user,
     db_datareader/db_datawriter roles)
  7. Cosmos DB networking configuration and data-plane permissions
  8. Deployment automation scripting
  9. End-to-end troubleshooting and system validation

- [x] T004 [US1] Append Validation Results and Production Considerations to
  `src/content/works/azure-agentic-case-study.mdx` (FR-028, FR-029):

  **Validation Results** — `## Validation Results` heading + HTML table:
  ```html
  <table>
  <thead><tr><th>Validation</th><th>Result</th></tr></thead>
  <tbody>
  <tr><td>Backend warm health check</td><td>✅ PASS</td></tr>
  <tr><td>Backend cold-start response</td><td>✅ PASS</td></tr>
  <tr><td>Frontend availability</td><td>✅ PASS</td></tr>
  <tr><td>Runtime configuration</td><td>✅ PASS</td></tr>
  <tr><td>Cosmos DB connectivity</td><td>✅ PASS</td></tr>
  <tr><td>Azure SQL connectivity</td><td>✅ PASS</td></tr>
  <tr><td>E2E AI chat and streaming</td><td>✅ PASS</td></tr>
  <tr><td>Conversation persistence</td><td>✅ PASS</td></tr>
  <tr><td>Terraform state (plan exit 0)</td><td>✅ PASS</td></tr>
  <tr><td>No committed secrets</td><td>✅ PASS</td></tr>
  <tr><td>Repeatable deployment</td><td>✅ PASS</td></tr>
  </tbody>
  </table>
  ```

  **Production Considerations** — `## Production Considerations` heading + intro sentence
  ("This deployment is a proof-of-concept and learning project. The following were intentionally
  out of scope:") + bullet list of what was NOT implemented:
  - CI/CD pipeline or GitHub Actions
  - Application Insights or distributed tracing
  - Private networking / VNet integration
  - Production load testing or performance benchmarking
  - Full resilience and failure-mode testing
  - Automated SQL schema lifecycle management
  - Enterprise-grade governance or compliance controls
  - Key Vault integration (not verified/implemented in this deployment)

**Checkpoint**: Detail page shows attribution, problem/solution narrative, contribution lists,
11 PASS rows in the validation table, and the production considerations bullet list.

---

## Phase 3: User Story 2 — Technical Peer Architecture Review (Priority: P2)

**Goal**: An interactive architecture diagram shows the verified final deployment — simplified
and expanded views, hover tooltips with responsibility details, and a static text fallback.

**Independent Test**: Hover over nodes to see tooltips; toggle to full view and back; read
the static fallback description below the diagram; trace the full request/response flow
in the How It Works prose section.

### Implementation for User Story 2

- [x] T005 [US2] Append the Architecture section opening and inline SVG simplified view to
  `src/content/works/azure-agentic-case-study.mdx` (FR-010, FR-011, FR-013–FR-017):

  Add `## Architecture` heading + brief intro sentence.

  Write the `<svg id="arch-svg" role="img" aria-labelledby="arch-title" viewBox="0 0 800 420" width="100%" style="max-width:800px;display:block;margin:0 auto">` element containing:

  - `<title id="arch-title">Architecture diagram: Agentic data application on Azure</title>`
  - `<defs>` block with an arrowhead marker:
    ```svg
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="var(--color-muted)" />
    </marker>
    ```
  - A `<g id="arch-simplified">` group containing the simplified view nodes and arrows.
    Use this layout (approximate pixel coordinates for viewBox 0 0 800 420):

    **Joel-configured nodes** (fill: var(--color-accent-soft), stroke: var(--color-accent)):
    - User: rect at (20, 180), 100×44, label "User"
    - Frontend: rect at (160, 180), 120×44, label "React / nginx", data-detail="React SPA containerized with nginx. Deployed by Joel to Azure Container Apps."
    - FastAPI: rect at (320, 180), 120×44, label "Python FastAPI", data-detail="FastAPI backend. Modernized by Joel. Routes chat to FoundryAgent. Persists history to Cosmos DB."
    - Cosmos DB: rect at (320, 290), 120×44, label "Cosmos DB", data-detail="Conversation persistence. Networking and data-plane permissions configured by Joel."
    - Managed Identity: rect at (500, 310), 130×44, label "Managed Identity", data-detail="User-assigned Managed Identity. Provides credential-less access to ACR, Cosmos, SQL. Configured by Joel."
    - Terraform: rect at (650, 310), 100×44, label "Terraform", data-detail="Brownfield IaC managing Container Apps, ACR, Managed Identity, Log Analytics, RBAC. Introduced by Joel."
    - Azure SQL: rect at (650, 180), 120×44, label "Azure SQL", data-detail="AdventureWorksLT. Active structured-data backend. SQL firewall, Entra auth, and role assignments configured by Joel."

    **Microsoft-provided nodes** (fill: var(--color-surface), stroke: var(--color-line-strong)):
    - FoundryAgent: rect at (480, 180), 130×44, label "FoundryAgent", data-detail="Microsoft Foundry FoundryAgent ('first-agent'). Microsoft-provided agent runtime."
    - SQL Tool: rect at (480, 60), 130×44, label "SQL Query Tool", data-detail="Tool registered in FoundryAgent. Generates and executes SQL against Azure SQL. Microsoft-provided."

    **Arrows** (stroke: var(--color-muted), marker-end: url(#arrow)):
    - User → Frontend: line (120,202) → (160,202)
    - Frontend → FastAPI: line (280,202) → (320,202)
    - FastAPI → FoundryAgent: line (440,202) → (480,202)
    - FoundryAgent → SQL Tool: line (545,180) → (545,104)
    - SQL Tool → Azure SQL: line (610,82) → (650,182) (diagonal)
    - Azure SQL → FoundryAgent (return): curved path or line (650,200) → (610,200) → (610,202)
    - FastAPI → Cosmos DB: line (380,224) → (380,290)

- [x] T006 [US2] Append the hidden full-view SVG group and the toggle button to the
  architecture diagram in `src/content/works/azure-agentic-case-study.mdx` (FR-012):

  Inside the same `<svg id="arch-svg">`, add a `<g id="arch-full" hidden>` group containing
  the additional nodes not shown in the simplified view:

  **Additional Joel-configured nodes** (same styling as simplified Joel nodes):
  - ACR: rect at (160, 310), 120×44, label "Azure Container Registry", data-detail="ACR for frontend and backend container images. Managed by Terraform."
  - Container Apps Env: rect at (160, 60), 150×44, label "Container Apps Env", data-detail="Consumption-tier Azure Container Apps Environment. Replaced App Service. Managed by Terraform."
  - Log Analytics: rect at (20, 60), 120×44, label "Log Analytics", data-detail="Workspace for Container Apps diagnostic logs. Managed by Terraform."

  **Additional Microsoft-provided nodes** (same styling as simplified MS nodes):
  - Chat Orchestrator: rect at (320, 60), 130×44, label "Chat Orchestrator", data-detail="Routes user messages to the correct agent. Microsoft-provided."
  - MS Foundry: rect at (480, -20) — or place at (480, 310), 130×44, label "Microsoft Foundry", data-detail="AI project runtime hosting agents. Microsoft-provided."

  **Microsoft Fabric alternative path** (dashed, reduced opacity — NOT active):
  ```svg
  <g opacity="0.5">
    <rect x="650" y="310" width="130" height="44" fill="none"
          stroke="var(--color-line)" stroke-dasharray="4 2" rx="4"/>
    <text x="715" y="336" text-anchor="middle" fill="var(--color-muted)" font-size="12">
      MS Fabric
    </text>
    <text x="715" y="350" text-anchor="middle" fill="var(--color-muted)" font-size="10">
      (alternative — not active)
    </text>
  </g>
  ```

  After the closing `</svg>`, add:
  ```html
  <div style="text-align:center;margin-top:0.75rem">
    <button id="arch-toggle" type="button" class="button"
            style="font-size:0.85rem;padding:0.35rem 1rem">
      Show full architecture ▼
    </button>
  </div>
  ```

  Then add the static fallback text (FR-016) in a `<details>` element:
  ```html
  <details style="margin-top:1rem">
    <summary>Text description of the architecture</summary>
    <p>User sends a message to the React/nginx frontend deployed on Azure Container Apps.
    The frontend forwards it to the Python FastAPI backend (also on Container Apps).
    FastAPI persists the conversation to Cosmos DB and routes the chat request to the
    Chat Orchestrator, which dispatches it to the FoundryAgent ("first-agent") running
    in Microsoft Foundry. The FoundryAgent invokes the SQL Query Tool, which generates
    and executes a SQL query against the Azure SQL database (AdventureWorksLT). Query
    results flow back to the FoundryAgent, which streams a natural-language response
    back through FastAPI to the frontend and user. Infrastructure is managed by Terraform.
    A user-assigned Managed Identity provides credential-less access to Cosmos DB, ACR,
    and other Azure services. Microsoft Fabric was an alternative accelerator data path
    but was not active in the final deployment.</p>
  </details>
  ```

- [x] T007 [US2] Append `<script is:inline>` block to
  `src/content/works/azure-agentic-case-study.mdx` implementing architecture diagram
  interactivity (FR-013, FR-014):

  The script must:
  1. Create a tooltip `<div id="arch-tooltip">` and append it to `document.body` with CSS:
     `position:fixed; background:var(--color-surface); border:1px solid var(--color-line);
     padding:0.5rem 0.75rem; border-radius:4px; font-size:0.8rem; max-width:280px;
     pointer-events:none; display:none; z-index:100; color:var(--color-text)`
  2. Query all `<g[data-detail]>` elements inside `#arch-svg`
  3. For each, add `mouseover` listener: show tooltip with `node.dataset.detail` text,
     positioned via `getBoundingClientRect()` (offset 12px right + 8px down from cursor)
  4. Add `mouseout` listener: hide tooltip
  5. Add `click` listener: same detail shown in tooltip (supports touch devices)
  6. Query `#arch-toggle` button:
     - On click: toggle `hidden` on `#arch-full` and `#arch-simplified`
     - Update button text: "Show full architecture ▼" ↔ "Show simplified view ▲"
  7. Wrap all DOM queries in `document.addEventListener('DOMContentLoaded', ...)` to ensure
     elements exist before binding

- [x] T008 [US2] Append How It Works section to
  `src/content/works/azure-agentic-case-study.mdx` (FR-023, FR-024):

  `## How It Works` heading + numbered list tracing the full NL-to-data flow:

  1. **User** types a natural-language question (e.g., "Which products have the highest sales
     this year?") into the React frontend.
  2. **Frontend** sends the message to the Python FastAPI backend via HTTP.
  3. **FastAPI** persists the message to Cosmos DB (conversation history) and forwards the
     chat request to the Chat Orchestrator.
  4. **Chat Orchestrator** routes the request to the FoundryAgent ("first-agent") running
     in the Microsoft Foundry project.
  5. **FoundryAgent** decides to invoke the SQL Query Tool based on the question type.
  6. **SQL Query Tool** generates a T-SQL query against the AdventureWorksLT schema and
     executes it against Azure SQL.
  7. **Azure SQL** returns the query results to the SQL Query Tool.
  8. **FoundryAgent** receives the results and composes a natural-language response.
  9. **Streaming response** travels back through FastAPI to the React frontend.
  10. **User** sees the answer streamed in real time in the chat interface.

  Add a note: "Cosmos DB is written on the parallel path at step 3 — FastAPI persists both
  the user message and the agent response to maintain full conversation history."

**Checkpoint**: Architecture SVG renders; hover tooltips appear; toggle button shows/hides
the full view; How It Works numbered list is readable.

---

## Phase 4: User Story 3 — Technical Peer Deep Dive (Priority: P3)

**Goal**: Technical readers find the troubleshooting narrative, ER data model, and challenge
story that demonstrate real engineering problem-solving.

**Independent Test**: Read the Technical Challenge section — App Service quota story is clearly
the primary architectural pivot; verify data model diagram shows 8 entities with verified
relationships; count 7 troubleshooting items.

### Implementation for User Story 3

- [x] T009 [US3] Append Data Model section to
  `src/content/works/azure-agentic-case-study.mdx` (FR-018–FR-022):

  `## Data Model` heading + brief context ("The project queries the AdventureWorksLT sample
  database, Microsoft's standard SQL schema for e-commerce scenarios.").

  Write inline SVG ER diagram: `<svg id="db-svg" role="img" aria-labelledby="db-title"
  viewBox="0 0 760 480" width="100%" style="max-width:760px;display:block;margin:0 auto">`.

  **Entity boxes** — each is a `<g>` with:
  - Outer `<rect>` for the entity box (fill: var(--color-surface), stroke: var(--color-line-strong))
  - Header `<rect>` for entity name row (fill: var(--color-accent-soft))
  - Entity name `<text>` (bold, fill: var(--color-text))
  - Column `<text>` lines for key columns (PK in bold, FK in italic, fill: var(--color-muted))

  **Layout** (top-down, approximate coordinates):
  - Customer: x=290, y=20 — columns: CustomerID (PK), FirstName, LastName, EmailAddress
  - SalesOrderHeader: x=290, y=180 — columns: SalesOrderID (PK), CustomerID (FK), OrderDate, TotalDue
  - SalesOrderDetail: x=290, y=340 — columns: SalesOrderDetailID (PK), SalesOrderID (FK), ProductID (FK), OrderQty, LineTotal
  - Product: x=530, y=340 — columns: ProductID (PK), ProductModelID (FK), ProductCategoryID (FK), Name, ListPrice
  - ProductCategory: x=530, y=180 — columns: ProductCategoryID (PK), ParentProductCategoryID (FK), Name
  - ProductModel: x=660, y=340 — columns: ProductModelID (PK), Name
  - CustomerAddress: x=30, y=180 — columns: CustomerID (FK), AddressID (FK), AddressType
  - Address: x=30, y=340 — columns: AddressID (PK), AddressLine1, City, StateProvince

  **Relationship lines** (stroke: var(--color-muted), marker-end: url(#arrow)):
  - Customer → SalesOrderHeader: vertical line
  - Customer → CustomerAddress: left vertical
  - SalesOrderHeader → SalesOrderDetail: vertical line
  - SalesOrderDetail → Product: horizontal line
  - Product → ProductCategory: vertical line
  - Product → ProductModel: short line to right
  - CustomerAddress → Address: vertical line

  Add relationship labels on each line (e.g., "1:N", "FK: CustomerID").

  Close the SVG and add disclaimer paragraph:
  "Showing entities and relationships relevant to natural-language data queries in this
  project. Not the complete AdventureWorksLT schema."

- [x] T010 [US3] Append Technical Challenge section to
  `src/content/works/azure-agentic-case-study.mdx` (FR-025, FR-026):

  `## Technical Challenge` heading + narrative covering:

  **The obstacle**: Attempting to provision the Azure App Service B1 plan per the accelerator's
  original instructions failed. The Azure subscription had zero App Service VM quota in the
  East US region. The error was explicit: the quota was exhausted at 0 cores, making any
  App Service SKU deployment impossible in that region.

  **The decision**: Rather than request a quota increase (which takes time and may not be
  approved for a learning subscription), the decision was made to pivot the entire hosting
  architecture to Azure Container Apps Consumption plan. The Consumption tier has no
  pre-allocated VM quota — it provisions on demand per request — so it bypasses the App
  Service quota constraint entirely.

  **What was preserved**: Terraform remained the infrastructure owner through the migration.
  Rather than using the accelerator's original deployment scripts, a Terraform configuration
  was introduced to manage the Container Apps environment, ACR, Managed Identity, and all
  associated RBAC assignments. This gave the deployment a reproducible, auditable state
  from the start.

  **The outcome**: The pivot was successful. Both frontend and backend containers were
  built, pushed to ACR, and deployed to Container Apps. The full accelerator stack became
  operational under a Terraform-managed architecture that was never part of the original
  accelerator design.

- [x] T011 [US3] Append Additional Troubleshooting section to
  `src/content/works/azure-agentic-case-study.mdx` (FR-027):

  `## Additional Troubleshooting` heading + intro sentence + 7 items as a definition list
  or headed sub-sections:

  1. **Resource provider registration** — Microsoft.App and related providers were not
     registered in the subscription. Resolved with `az provider register` before Container
     Apps deployment could proceed.
  2. **Managed Identity credential resolution** — The FastAPI backend's DefaultAzureCredential
     chain attempted local credential sources before the Managed Identity, causing failures
     in the container environment. Resolved by configuring the correct identity client ID
     in the Container Apps environment variables.
  3. **Cosmos DB networking** — Public network access to Cosmos DB was restricted by default.
     Resolved by configuring the Cosmos DB account to allow access from Azure services and
     the Container Apps outbound IPs.
  4. **SQL firewall configuration** — Azure SQL firewall initially blocked Container Apps
     outbound IPs. Resolved by adding the correct IP ranges and enabling "Allow Azure services"
     for the SQL server.
  5. **SQL Entra authorization** — The application used Entra (AAD) authentication to Azure
     SQL rather than SQL authentication. Resolved by creating a contained database user for
     the Managed Identity and granting db_datareader and db_datawriter roles.
  6. **SQL history tables** — The AdventureWorksLT schema includes temporal (history) tables
     that are not directly queryable by the SQL Query Tool in the same way as regular tables.
     Resolved by adjusting query scope to target the primary tables only.
  7. **Container Apps runtime configuration** — Several environment variables required by
     the FastAPI backend were not correctly passed to the Container Apps revision, causing
     startup failures. Resolved iteratively by inspecting Container Apps logs in Log Analytics
     and updating the Terraform configuration for environment variable injection.

**Checkpoint**: Technical Challenge section tells the App Service quota story clearly; data
model SVG renders 8 entities with relationship lines; troubleshooting section lists all 7 items.

---

## Phase 5: User Story 4 — Portfolio Integration and Blog Compatibility (Priority: P4)

**Goal**: Screenshots section with 6 placeholders renders without broken images; blog callout
section is present; the page builds and passes `npm run build`.

**Independent Test**: Load the page — no broken image icons; 6 screenshot placeholders have
descriptive captions; a blog callout section is visible at the bottom.

### Implementation for User Story 4

- [x] T012 [US4] Append Screenshots section to
  `src/content/works/azure-agentic-case-study.mdx` (FR-030, FR-031):

  `## Screenshots` heading + 6 `<figure>` elements. Use inline styles on each `<figure>` to
  show a bordered placeholder rectangle (no `<img>` elements until assets exist):

  ```html
  <figure style="border:2px dashed var(--color-line);border-radius:4px;
                 padding:2rem;text-align:center;margin:1.5rem 0;
                 background:var(--color-surface)">
    <figcaption style="color:var(--color-muted);font-size:0.85rem">
      Screenshot: Live deployed application — add when available
    </figcaption>
  </figure>
  ```

  Six placeholders with these figcaptions:
  1. "Screenshot: Live deployed application — add when available"
  2. "Screenshot: Successful natural-language query and AI response — add when available"
  3. "Screenshot: Azure Container Apps frontend and backend containers — add when available"
  4. "Screenshot: Microsoft Foundry agent and tool configuration — add when available"
  5. "Screenshot: Azure SQL and Cosmos DB resources — add when available"
  6. "Screenshot: Terraform plan exit 0 validation — add when available"

- [x] T013 [US4] Append Further Reading section to
  `src/content/works/azure-agentic-case-study.mdx` (FR-032):

  ```html
  <aside style="border-left:3px solid var(--color-accent);
                padding:0.75rem 1rem;margin:2rem 0;
                background:var(--color-accent-soft);border-radius:0 4px 4px 0">
    <p style="margin:0"><strong>Further reading</strong></p>
    <p style="margin:0.5rem 0 0">A long-form technical article covering this deployment
    in depth — infrastructure decisions, troubleshooting journal, and Terraform patterns —
    will be published on the blog. Link added when available.</p>
  </aside>
  ```

**Checkpoint**: Page ends with screenshot placeholders (no broken images) and the blog aside.

---

## Phase 6: Build Validation

**Purpose**: Confirm the complete implementation builds and passes all validations.

- [x] T014 Run `npm run build` from the repository root; confirm exit code 0, no TypeScript
  or MDX parse errors, and that the output includes the case study detail page
  (`/astro-keel/works/azure-agentic-case-study/index.html`)

- [x] T015 [P] Run `npm run preview` and manually validate against
  `specs/002-azure-agentic-case-study/quickstart.md`:
  - Works index shows case study card (no empty-state message)
  - Detail page: all sections present, no layout breaks
  - Architecture SVG: simplified view loads; toggle button works; hover shows tooltips
  - Full view: additional nodes visible after toggle; Fabric node is dashed/greyed
  - Data model SVG: 8 entities, relationship lines, disclaimer present
  - Validation table: 11 rows, all PASS
  - Screenshot placeholders: 6 figures, no broken images
  - Dark mode: SVG colors adapt via CSS variables; all text legible
  - Mobile (375px): SVGs scale with viewBox, no horizontal overflow
  - SEO: `<title>` includes project title + "Joel Samaniego"; `og:type = article`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **US1 (Phase 2)**: Depends on T001 (file must exist before body sections are appended)
- **US2 (Phase 3)**: Depends on T001; T006 depends on T005 (SVG group must exist before
  adding more nodes); T007 depends on T005 and T006 (script binds to node IDs)
- **US3 (Phase 4)**: Depends on T001; independent of US2
- **US4 (Phase 5)**: Depends on T001; independent of US2 and US3
- **Validation (Phase 6)**: T014 depends on all phases 1–5 complete; T015 depends on T014

### Sequential Constraints

All tasks T001–T013 append content to the same MDX file. They must be executed in order
within each phase. Across phases, the content can be authored in US1 → US2 → US3 → US4
order or any order that does not create MDX parse errors (each section is independent prose).

The recommended order matches the phase sequence: frontmatter → US1 prose → US2 SVG →
US3 SVG + prose → US4 placeholders → validate.

### Parallel Opportunities

Within the same file there are no safe parallel opportunities. The only true parallel is
T015 (manual check) which can overlap with reviewing the build output from T014.

---

## Implementation Strategy

### Single-session delivery

All 15 tasks are content-only (one file). A motivated implementer can complete the entire
case study in one focused session:

1. T001 — create file with frontmatter (2 min)
2. T002 → T004 — prose sections: attribution, problem/solution, contribution, validation, production (20 min)
3. T005 → T007 — architecture SVG: simplified + full view + JS interactivity (30 min)
4. T008 — How It Works prose (5 min)
5. T009 — Data model SVG (20 min)
6. T010 → T011 — technical challenge + troubleshooting (10 min)
7. T012 → T013 — screenshots + blog callout (5 min)
8. T014 → T015 — build + validate (5 min)

---

## Notes

- All tasks append to `src/content/works/azure-agentic-case-study.mdx` — never modify other files
- SVG coordinates are approximate; adjust to fit content and maintain readability
- CSS variable references in SVG (`var(--color-accent)`) work because the SVG is inline in
  the HTML document and inherits the document's CSS cascade
- The `<script is:inline>` tag bypasses Astro's module bundler — this is intentional and
  ensures the script runs as a regular browser script after the DOM is ready
- Do NOT include any credentials, secrets, tenant IDs, subscription IDs, or tokens in any content
- Do NOT invent AdventureWorksLT column details beyond what is listed in data-model.md
