# Feature Specification: Azure Agentic Case Study

**Feature Branch**: `002-azure-agentic-case-study`

**Created**: 2026-08-14

**Status**: Draft

**Input**: Build the first featured technical portfolio case study: "Modernizing and Deploying an
Agentic Data Application on Azure," based on Microsoft's Agentic Applications for Unified Data
Foundation solution accelerator.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Recruiter Quick Assessment (Priority: P1)

A recruiter or hiring manager visits the case study page while evaluating Joel for an
engineering or product role. Within five minutes, they can understand what the project was,
what Joel's specific contribution was (distinct from Microsoft's provided components), what
technical challenge arose and how it was resolved, and what the outcome was.

**Why this priority**: This is the primary purpose of the portfolio case study. If a recruiter
cannot extract a clear professional narrative quickly, the page fails its core goal.

**Independent Test**: A reader with no prior knowledge of the project reads the page for five
minutes. They can answer: (1) What was the project? (2) What was Microsoft's role vs. Joel's
role? (3) What was the main technical obstacle and how was it resolved? (4) Was the project
successful?

**Acceptance Scenarios**:

1. **Given** a recruiter lands on the case study page, **When** they read the hero section,
   **Then** they see the project title, a concise description, the Microsoft attribution, Joel's
   role/contribution, the technology tags, and a completed/deployed status.
2. **Given** a recruiter reads the Problem section, **When** they finish it, **Then** they
   understand that the project started from an existing Microsoft accelerator and that the
   original deployment path was blocked by a real infrastructure constraint.
3. **Given** a recruiter reads the Solution section, **When** they finish it, **Then** they
   understand the architectural decision Joel made and the components he owned.
4. **Given** a recruiter reads the Contribution section, **When** they finish it, **Then** they
   can clearly list at least five specific engineering activities Joel performed, distinct from
   the Microsoft-provided foundation.
5. **Given** a recruiter reads the Results section, **When** they finish it, **Then** they see
   a concrete list of validation outcomes confirming the deployment succeeded.
6. **Given** a recruiter reads the Production Considerations section, **When** they finish it,
   **Then** they see an honest, clear statement of what was NOT implemented, with no
   overclaiming.

---

### User Story 2 — Technical Peer Architecture Review (Priority: P2)

A technical reviewer (engineer, cloud architect, or hiring technical lead) examines the
interactive architecture diagram to understand the actual deployed system: component
relationships, the request/response flow, infrastructure ownership, and which components are
Microsoft-provided versus Joel-configured.

**Why this priority**: Technical reviewers are the secondary audience for a technical portfolio.
The architecture visualization is the most powerful differentiator for this case study.

**Independent Test**: A technical reviewer uses the architecture diagram for three minutes. They
can identify: the request path from user to Azure SQL and back; which components are provided by
Microsoft Foundry versus configured by Joel; what Cosmos DB's role is; and which components the
Terraform configuration owns.

**Acceptance Scenarios**:

1. **Given** a technical reviewer views the architecture diagram, **When** the page loads,
   **Then** a simplified, readable view of the core request flow is shown by default.
2. **Given** a technical reviewer wants to see full infrastructure detail, **When** they
   expand or toggle to the full view, **Then** all infrastructure components (Container Apps
   Environment, ACR, Managed Identity, Log Analytics, Terraform, Microsoft Fabric alternative
   path) become visible.
3. **Given** a technical reviewer hovers over or clicks a node, **When** the interaction
   occurs, **Then** a tooltip or detail panel shows the node's role, responsibility
   (Microsoft-provided vs. Joel-configured), and key technical notes.
4. **Given** a technical reviewer views the diagram on a mobile device, **When** they scroll
   and interact, **Then** the diagram remains readable and usable without overflow or
   unreadable text.
5. **Given** a technical reviewer reads the natural-language-to-data flow section, **When**
   they finish it, **Then** they can trace a user question through frontend → FastAPI →
   FoundryAgent → SQL Tool → Azure SQL → streamed response and understand what happens at
   each step.

---

### User Story 3 — Technical Peer Deep Dive (Priority: P3)

A technical reader explores the troubleshooting narrative, data model visualization, and
validation table to assess Joel's problem-solving depth and engineering rigor.

**Why this priority**: This section builds credibility with senior technical evaluators who
want evidence of real-world engineering judgment.

**Independent Test**: A technical reader reads the Technical Challenge and Additional
Troubleshooting sections. They can confirm that the App Service quota constraint story is
clearly presented as the primary architectural pivot, and that the additional troubleshooting
items represent real-world infrastructure and security work.

**Acceptance Scenarios**:

1. **Given** a technical reader reads the Technical Challenge section, **When** they finish it,
   **Then** they understand that the App Service B1 quota was zero in East US, why this blocked
   deployment, and how the move to Azure Container Apps Consumption resolved it while preserving
   Terraform as infrastructure owner.
2. **Given** a technical reader reads the Additional Troubleshooting section, **When** they
   finish it, **Then** they find brief, accurate descriptions of at least seven real
   troubleshooting activities (resource provider registration, Managed Identity credential
   resolution, Cosmos networking, SQL firewall, SQL Entra authorization, SQL history tables,
   Container Apps runtime changes).
3. **Given** a technical reader views the data model visualization, **When** the page loads,
   **Then** they see a hierarchical or ER-style diagram showing the core AdventureWorksLT
   entities (Customer → SalesOrderHeader → SalesOrderDetail → Product) with supporting
   entities, without any invented or unverified relationships.
4. **Given** a technical reader views the validation results, **When** they read the table,
   **Then** all 11 validation outcomes show PASS status with clear, accurate descriptions
   matching the confirmed end-to-end validation.
5. **Given** a technical reader reads the Production Considerations section, **When** they
   finish it, **Then** they see honest disclosure of what was not implemented (CI/CD,
   Application Insights, private networking, production load testing, automated SQL schema
   lifecycle, enterprise-grade governance).

---

### User Story 4 — Portfolio Integration and Long-Form Blog Compatibility (Priority: P4)

The case study appears as a works entry in the portfolio, renders correctly in Works index and
detail pages, and is structured to support a future long-form technical blog article without
content duplication.

**Why this priority**: The Works collection integration is a prerequisite for the page to be
discoverable. Blog compatibility is a forward-planning requirement.

**Independent Test**: Navigate to the Works index — the case study card appears. Open the
detail page — all sections render correctly in both light and dark mode, `npm run build`
completes with no errors, and there is a clear indication on the page of where a future blog
link will be added.

**Acceptance Scenarios**:

1. **Given** the Works index is loaded, **When** a visitor sees the case study card, **Then**
   the title, short description, and technology tags are displayed correctly.
2. **Given** the case study detail page loads, **When** a visitor views it, **Then** all
   sections (hero, problem, solution, contribution, architecture, data model, NL-to-data flow,
   challenge, troubleshooting, results, production considerations, screenshots, attribution)
   render without layout errors.
3. **Given** the site is in dark mode, **When** a visitor views the case study, **Then** all
   sections including the interactive diagrams remain legible and appropriately styled.
4. **Given** `npm run build` is run, **When** it completes, **Then** exit code is 0 and no
   TypeScript or build errors are emitted.
5. **Given** a blog article is later written about this project, **When** it is published,
   **Then** the case study page can link to it without requiring a structural rewrite of the
   case study content.

---

### Edge Cases

- What if a visitor's browser does not support the interactive visualization? (A static
  fallback description of the architecture MUST be present.)
- What if a visitor views screenshots before they are added? (Placeholder sections must be
  clearly marked and not display broken images.)
- What does the page look like before screenshot assets are uploaded? (Must not break layout.)
- What if a technical reader notices that the data model does not include complete column
  details? (The page must clearly state that only verified entities/relationships are shown.)
- What if a recruiter searches for terms in the page? (Page search index must include the
  case study content.)

---

## Requirements *(mandatory)*

### Functional Requirements

**Hero / Overview**
- **FR-001**: The page MUST display the project title "Modernizing and Deploying an Agentic
  Data Application on Azure" and the short description.
- **FR-002**: The page MUST include a Microsoft attribution statement: "This project is based
  on Microsoft's Agentic Applications for Unified Data Foundation solution accelerator; my work
  focused on modernization, Terraform infrastructure management, Azure deployment,
  troubleshooting, integration changes and end-to-end validation."
- **FR-003**: The page MUST display Joel's role and contribution summary.
- **FR-004**: The page MUST display verified technology tags: FastAPI, Terraform, Azure Container
  Apps, Azure Container Registry, Managed Identity, Azure RBAC, Azure SQL, Cosmos DB, Microsoft
  Foundry, Log Analytics, React, Python.
- **FR-005**: The page MUST display a status indicator showing Completed / Deployed.

**Problem and Solution**
- **FR-006**: The Problem section MUST accurately describe that the starting point was an
  existing Microsoft accelerator and that the original App Service B1 deployment was blocked
  by zero App Service VM quota in East US.
- **FR-007**: The Solution section MUST explain the move to Azure Container Apps Consumption,
  the introduction of Terraform for infrastructure management, Managed Identity configuration,
  ACR usage, Azure SQL as the active data backend, Cosmos DB for conversation persistence,
  and deployment automation.

**My Contribution**
- **FR-008**: The Contribution section MUST clearly distinguish Joel's work from
  Microsoft-provided components. It MUST NOT claim Joel built Microsoft Foundry, the Agent
  Framework, or the original accelerator architecture from scratch.
- **FR-009**: The Contribution section MUST enumerate Joel's specific activities: FastAPI
  backend modernization; Terraform brownfield infrastructure management; Azure App Service →
  Azure Container Apps migration; container deployment via ACR; Managed Identity and RBAC
  configuration; Azure SQL networking and Entra authorization; Cosmos DB networking and
  data-plane permissions; deployment automation; troubleshooting; end-to-end validation.

**Interactive Architecture Visualization**
- **FR-010**: The page MUST include an interactive architecture diagram showing the verified
  final request/response flow.
- **FR-011**: The simplified/default view MUST show: User → Frontend → FastAPI → FoundryAgent
  → SQL Tool → Azure SQL → Response, plus supporting nodes (Cosmos DB, Managed Identity,
  Terraform).
- **FR-012**: The expanded/full view MUST add: Microsoft Foundry project, Chat Orchestrator,
  FoundryAgent, SQL Tool, ACR, Container Apps Environment, Log Analytics, Microsoft Fabric
  alternative path (clearly labeled as not the active path).
- **FR-013**: Each node MUST show responsibility details (Microsoft-provided vs.
  Joel-configured) on hover or click.
- **FR-014**: The diagram MUST visually distinguish Microsoft-provided components from
  Joel-configured/deployed components.
- **FR-015**: The diagram MUST be usable on both desktop and mobile screen sizes.
- **FR-016**: A static text description of the architecture MUST be present as a fallback for
  non-interactive contexts.
- **FR-017**: The diagram MUST use the portfolio's existing visual language (colors, typography,
  spacing); it MUST NOT introduce a conflicting visual style.

**Data Model Visualization**
- **FR-018**: The page MUST include a data model visualization showing the AdventureWorksLT
  entities used by the project.
- **FR-019**: The visualization MUST use an ER-style or hierarchical layout (NOT a
  force-directed/random graph).
- **FR-020**: The visualization MUST show the confirmed core entities: Customer,
  SalesOrderHeader, SalesOrderDetail, Product, with supporting entities (ProductCategory,
  ProductModel, Address, CustomerAddress) where they appear in the confirmed schema.
- **FR-021**: The visualization MUST NOT display invented or unverified column-level detail;
  only verified relationships from the authoritative AdventureWorksLT schema MAY be shown.
- **FR-022**: A note MUST clarify that the diagram shows the entities relevant to the
  project's natural-language queries, not the complete schema.

**Natural-Language-to-Data Flow**
- **FR-023**: The page MUST include a section explaining how a user question travels through
  the system: Frontend → FastAPI → Chat Orchestrator → Microsoft Foundry → FoundryAgent
  → SQL Query Tool → Azure SQL → Query results → FoundryAgent → Streaming response
  → FastAPI → Frontend → User.
- **FR-024**: The explanation MUST accurately note that the Cosmos DB parallel path persists
  conversation history at the FastAPI layer.

**Technical Challenge**
- **FR-025**: The Technical Challenge section MUST lead with the App Service B1 quota story:
  provisioning failed because East US App Service VM quota was 0.
- **FR-026**: The section MUST explain the decision to pivot to Azure Container Apps
  Consumption and why Terraform remained the infrastructure owner through the migration.

**Additional Troubleshooting**
- **FR-027**: The page MUST include brief, accurate coverage of the following real
  troubleshooting activities: resource provider registration; Managed Identity credential
  resolution; Cosmos DB networking; SQL firewall configuration; SQL Entra contained user with
  db_datareader/db_datawriter roles; SQL history tables; Container Apps runtime and
  configuration changes.

**Validation Results**
- **FR-028**: The page MUST display all 11 validation outcomes as PASS:
  backend warm health, backend cold-start, frontend availability, runtime config,
  Cosmos connectivity, SQL connectivity, E2E AI chat and streaming, conversation persistence,
  Terraform state, no committed secrets, repeatable deployment.

**Production Considerations**
- **FR-029**: The page MUST clearly state that the following were NOT implemented in this
  project: CI/CD, Application Insights, private networking architecture, production load
  testing, full resilience testing, automated SQL schema lifecycle, enterprise-grade governance.

**Screenshots**
- **FR-030**: The page MUST include placeholder sections for six screenshot categories:
  live deployed application; successful natural-language query; Container Apps frontend/backend;
  Microsoft Foundry agent; Azure SQL/Cosmos; Terraform validation. Placeholders MUST NOT
  display broken images.
- **FR-031**: Screenshots MUST NOT contain credentials, secrets, tenant IDs, subscription IDs,
  tokens, or sensitive environment variables.

**Blog Integration**
- **FR-032**: The case study page MUST include a designated section or call-to-action area
  where a future long-form blog article link can be added without restructuring the page.

**Build and Quality**
- **FR-033**: The case study MUST be implemented as a works content entry so it appears in
  the Works index and detail page using existing layouts.
- **FR-034**: The page MUST build successfully with `npm run build` (exit code 0, no errors).
- **FR-035**: The page MUST be accessible in both light and dark modes with all content legible.
- **FR-036**: The page MUST NOT introduce new npm dependencies unless a dependency is strictly
  required for the interactive visualization and no simpler built-in approach is feasible.

### Key Entities

- **Works Entry**: A content collection entry (MDX) with title, description, tech tags,
  publish date, and a link field. The case study is implemented as one works entry.
- **Architecture Node**: A component in the deployment — typed as either Microsoft-provided or
  Joel-configured. Displayed in the interactive diagram with a label, layer grouping, and
  responsibility detail.
- **AdventureWorksLT Entity**: A database table in the project's Azure SQL instance. Shown in
  the data model visualization with confirmed relationships only.
- **Validation Outcome**: One of 11 confirmed end-to-end test results. Each has a name, a
  description of what was validated, and a PASS status.
- **Troubleshooting Item**: A real engineering obstacle encountered during the project, with
  a cause and resolution.
- **Screenshot Placeholder**: A designated content slot for a future visual asset, displayed
  as a labeled empty state until the asset is provided.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor unfamiliar with the project can identify Joel's specific
  contribution (as distinct from Microsoft's) within five minutes of reading the page.
- **SC-002**: A technical reviewer can trace the complete request/response flow through the
  architecture diagram (simplified and expanded views) without referring to external
  documentation.
- **SC-003**: The page makes zero unverified technical claims — every stated fact about the
  architecture, tools used, and validation outcomes matches the confirmed technical facts
  provided in this specification.
- **SC-004**: All 11 validation outcomes are present and correctly labeled as PASS.
- **SC-005**: The data model visualization contains no invented entity relationships or
  column-level detail beyond what the authoritative AdventureWorksLT schema supports.
- **SC-006**: The page is fully navigable and readable on both desktop and mobile screen
  sizes, including the interactive diagrams.
- **SC-007**: The case study appears in the Works index as a card, and opening the card leads
  to the full case study page.
- **SC-008**: `npm run build` completes with exit code 0 and no errors after the case study
  is added.
- **SC-009**: A future long-form blog article about this project can be linked from the case
  study page by adding a single content field, with no structural page rewrite required.
- **SC-010**: The Production Considerations section makes it clear that this is a
  proof-of-concept / learning deployment, not a production-grade system.

---

## Assumptions

- The case study is implemented as a single MDX works entry in `src/content/works/`. All
  interactive content (D3 diagrams, validation table) is authored inline in MDX using
  imported components or inline script elements.
- D3.js is the user-specified visualization library for both interactive diagrams. This
  introduces a new npm dependency. The plan phase MUST evaluate whether D3 is justified under
  Constitution Principle XI (Minimal Dependencies) or whether a simpler built-in SVG/CSS
  approach is sufficient. If an equivalent result is achievable without D3, the simpler
  approach takes precedence per the constitution.
- The AdventureWorksLT schema reference used for the data model visualization is the
  authoritative Microsoft-published schema. Only the four core entities (Customer,
  SalesOrderHeader, SalesOrderDetail, Product) and the named supporting entities are shown.
  No column-level detail is added without verification against the published schema.
- Screenshot assets are not yet available. Placeholder sections will be implemented with
  clear labels (e.g., "Screenshot: Live Application — add when available"). The page
  structure supports dropping in images by updating the content file.
- The works entry's `link` field will point to the GitHub repository for the Microsoft
  accelerator (or remain empty if a canonical link is not confirmed). This is not blocking
  for the page itself.
- The publish date is set to 2026-08-14 (today) as the portfolio completion date.
- The page is written in English throughout, consistent with the portfolio locale.
- The interactive visualizations use the portfolio's CSS variables (`--color-accent`,
  `--color-text`, `--color-bg`, etc.) so they automatically adapt to light/dark mode.
  No additional theming work is required.
- `USE_DATA_AGENT=false` and the Microsoft Fabric path are both mentioned accurately in the
  architecture section as alternative paths that were not active in the final deployment.
- The six screenshot placeholder slots use a consistent placeholder pattern (e.g., a labeled
  `<figure>` with a caption) rather than broken `<img>` tags.
