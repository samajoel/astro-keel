# Feature Specification: Portfolio UX and Professional Positioning Refinement

**Feature Branch**: `003-portfolio-ux-refinement`

**Created**: 2026-08-14

**Status**: Draft

**Input**: Comprehensive UX, content hierarchy, visual-quality, and professional-positioning
refinement of the existing portfolio and the Azure Agentic case study.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Recruiter First Impression (Priority: P1)

A recruiter or hiring manager visits the portfolio for the first time.
Within 30–90 seconds they can clearly understand: who Joel is, what he builds,
that he has a real deployed AI/cloud project, and how to contact him.
They feel confident enough to continue reading or to reach out.

**Why this priority**: The primary audience for a portfolio is recruiters and
hiring managers who make first-impression judgments quickly. If this journey fails,
no other content gets seen.

**Independent Test**: Visit the homepage without any prior context. Time how long it
takes to answer: (1) who Joel is, (2) what he builds, (3) whether he has a real project,
(4) how to contact him. All four should be answerable within 90 seconds from the homepage alone.

**Acceptance Scenarios**:

1. **Given** a first-time visitor lands on the homepage, **When** they read the above-the-fold
   content, **Then** they immediately understand Joel builds AI/cloud solutions.
2. **Given** a visitor scrolls past the hero, **When** they see the Featured Work section,
   **Then** they understand a real Azure AI project exists, is deployed, and they can view it.
3. **Given** a visitor wants to explore, **When** they click the primary CTA from the hero,
   **Then** they are taken directly to the Works section or case study.
4. **Given** a visitor wants to contact Joel, **When** they reach the bottom of the homepage,
   **Then** GitHub, LinkedIn, and email links are clearly available.
5. **Given** a recruiter reads the hero, **When** they scan the text, **Then** no repetition
   of the same positioning phrase appears more than once on the page.

---

### User Story 2 — Technical Peer Case Study Exploration (Priority: P2)

A technical lead, solutions architect, or experienced engineer opens the Azure Agentic
case study. They expect to find increasing technical depth as they scroll. They can
quickly assess Joel's personal contribution versus the Microsoft-provided foundation,
understand the architecture end-to-end, evaluate the engineering decisions made,
and review the validation outcomes.

**Why this priority**: Technical evaluators are the second-most important audience.
They need evidence of real technical judgment, not just a list of technologies.
The case study is the primary piece of evidence in the portfolio.

**Independent Test**: Open the case study. Check that: (1) Joel's personal contribution
is distinct from Microsoft's foundation within the first two screens; (2) the architecture
can be understood in simplified view within 15 seconds; (3) the App Service → Container Apps
decision is surfaced as a deliberate engineering choice before the troubleshooting section;
(4) all 11 validation outcomes are visible and readable.

**Acceptance Scenarios**:

1. **Given** a technical evaluator opens the case study, **When** they read the first screen,
   **Then** they understand what Joel did versus what Microsoft provided.
2. **Given** a technical evaluator views the architecture diagram, **When** they see the
   simplified view, **Then** they can trace the full request path in under 15 seconds.
3. **Given** a technical evaluator looks for the key architectural decision, **When** they
   read before the architecture section, **Then** they find the App Service → Container Apps
   pivot presented as an engineering decision with clear context.
4. **Given** a technical evaluator reaches the Validation section, **When** they read the
   section intro, **Then** they immediately see "11/11 validation scenarios passed" before
   reading the detailed table.
5. **Given** a technical evaluator reads the Troubleshooting section, **When** they scan
   the items, **Then** each issue has a clear Problem, Root Cause, and Fix structure.
6. **Given** a technical evaluator wants to see the live system, **When** they look at the
   case study header area, **Then** a "View Live Project" link is available.

---

### User Story 3 — Seamless Homepage-to-Project Journey (Priority: P3)

A visitor can discover and reach the Azure case study directly from the homepage
without needing to visit the Works index first. The Featured Work section on the
homepage presents the project with enough information to motivate a click.

**Why this priority**: The portfolio's strongest content should be immediately visible
on the homepage. Requiring navigation through Works creates unnecessary friction.

**Independent Test**: Visit only the homepage. Confirm the Azure Agentic project is
visible with title, description, deployment status, 4–6 technology tags, and a link to
the case study — all without navigating to another page first.

**Acceptance Scenarios**:

1. **Given** a visitor is on the homepage, **When** they scroll past the hero,
   **Then** they see a Featured Work section featuring the Azure project.
2. **Given** a visitor sees the Featured Work section, **When** they read it,
   **Then** they understand the project is deployed and what technologies it uses.
3. **Given** a visitor wants to explore further, **When** they click "View Case Study",
   **Then** they reach the full case study page.
4. **Given** a visitor wants to see the live project, **When** they look at the Featured
   Work section, **Then** a "View Live Project" link opens the deployed URL in a new tab.
5. **Given** the Featured Work shows technology tags, **When** a visitor reads them,
   **Then** they see no more than 6 tags — the most strategically important ones only.

---

### User Story 4 — Professional Brand and Positioning (Priority: P4)

The overall site feels like a deliberate technical builder portfolio — not a generic
template, a résumé, a services site, or a documentation portal. Each page has a clear
purpose, hierarchy, and professional tone. The visitor experience produces the impression:
"Joel can understand problems, work with modern AI/cloud, make technical decisions,
troubleshoot systems, ship solutions, and explain what he built."

**Why this priority**: Even with strong content, poor visual hierarchy and positioning
can undermine professional perception.

**Independent Test**: Show the site to a professional unfamiliar with the project.
Ask them to describe what Joel does and whether he seems technically credible.
Expected answer includes AI, cloud, deployment, and problem-solving.

**Acceptance Scenarios**:

1. **Given** a visitor reads any page, **When** they assess the tone and hierarchy,
   **Then** the site does not feel like a generic template.
2. **Given** a visitor reads the About page, **When** they scan the sections,
   **Then** they understand Joel's approach without reading a résumé chronology.
3. **Given** a visitor views the Works index with only one project, **When** they see
   the page, **Then** it feels intentional — not like an empty or unfinished template.
4. **Given** a visitor reads the homepage hero, **When** they see the CTA structure,
   **Then** there is one clear primary action leading toward portfolio proof.
5. **Given** a visitor reads the About page, **When** they see the contact section,
   **Then** GitHub, LinkedIn, and email links are available and clearly labeled.

---

### User Story 5 — Mobile and Responsive Experience (Priority: P5)

All primary portfolio content — including the architecture diagram, ER diagram,
validation table, and case study sections — is fully readable and usable on
mobile devices (≥390px width). Technical diagrams that cannot fit comfortably
in narrow viewports use horizontal scrolling within their container rather than
shrinking content to illegibility.

**Why this priority**: Recruiters and professionals frequently review portfolios
on mobile. Unreadable diagrams or broken layouts communicate poor attention to quality.

**Independent Test**: Open each major page at 390px width. Confirm: no full-page
horizontal overflow; architecture and ER diagrams are readable (or intentionally
horizontally scrollable within their container); validation table is accessible;
navigation works; all CTAs are tappable.

**Acceptance Scenarios**:

1. **Given** a visitor opens the homepage on mobile, **When** they view the hero
   and Featured Work, **Then** all content fits without horizontal overflow.
2. **Given** a visitor opens the case study on mobile, **When** they reach the
   architecture diagram, **Then** the diagram container scrolls horizontally without
   causing full-page overflow.
3. **Given** a visitor opens the case study on mobile, **When** they reach the ER diagram,
   **Then** the diagram is readable or clearly scrollable horizontally within its container.
4. **Given** a visitor taps any interactive element on mobile, **When** they interact,
   **Then** touch targets are adequate and interactions work correctly.
5. **Given** a visitor views the validation table on mobile, **When** the table is wider
   than the viewport, **Then** it scrolls horizontally within its container.

---

### Edge Cases

- What happens when the Blog section has no published posts? The homepage must show
  a subtle placeholder state without making the site feel unfinished.
- What happens if the live project URL becomes unavailable? Links open in a new tab
  and should not break page navigation.
- What happens in dark mode? Every new or modified element must remain readable
  and visually consistent using existing CSS custom property tokens.
- What happens when the architecture full-view toggle is activated on mobile?
  The full view must not cause layout overflow outside the diagram container.
- What happens when a screen reader encounters the architecture or ER diagram?
  Text descriptions must provide equivalent information to the visual.

---

## Requirements *(mandatory)*

### Functional Requirements

#### Homepage

- **FR-001**: The homepage hero MUST present a short primary positioning statement
  ("I build AI solutions.") and a supporting line of one sentence or fewer.
- **FR-002**: The homepage hero MUST have one primary CTA leading toward portfolio evidence,
  and secondary links to GitHub and LinkedIn.
- **FR-003**: Email MUST NOT appear as a competing CTA in the homepage hero.
- **FR-004**: A Featured Work section MUST appear on the homepage immediately after the hero,
  featuring the Azure Agentic project without requiring navigation to `/works/`.
- **FR-005**: The Featured Work section MUST include: a project image or intentional
  placeholder, project title, one-sentence description, deployment status, 4–6 technology
  tags, a "View Case Study" link, and a "View Live Project" link.
- **FR-006**: The "View Live Project" link on the homepage MUST open in a new tab.
- **FR-007**: The Featured Work technology tags MUST be limited to no more than 6 of the
  most strategically meaningful tags (e.g., Microsoft Foundry, Azure Container Apps,
  Terraform, Python, Azure SQL, AI Agents).
- **FR-008**: An Areas of Focus section MUST appear after Featured Work with exactly three
  areas: AI & Agents, Cloud Solutions, and Automation — each with one concise sentence.
- **FR-009**: A Technical Writing section MUST appear on the homepage. When no posts are
  published, it MUST show a subtle placeholder state, not an empty prominent section.
- **FR-010**: An About/Contact section MUST appear near the bottom of the homepage with
  1–2 sentences about Joel's approach and links to About, LinkedIn, and email.
- **FR-011**: The same positioning phrase MUST NOT appear in more than one homepage section.
- **FR-012**: The homepage content order MUST follow: Hero → Featured Work → Areas of Focus
  → Technical Writing → About/Contact.

#### Works Index

- **FR-013**: The Works index MUST display the case study as an intentional, prominent entry —
  not as an empty or placeholder state.
- **FR-014**: The Works card MUST include: project image or placeholder, title, concise
  summary, key technologies, deployment status, and links to the case study and live demo.
- **FR-015**: The Works layout MUST remain functional and visually balanced when a second
  project is added later.

#### Case Study — Hero and At-a-Glance

- **FR-016**: The case study hero MUST include: project title, one-sentence description of
  what was done, deployment status ("Deployed"), and a contribution/role summary line.
- **FR-017**: The case study hero MUST include a "View Live Project" link opening in a new tab.
- **FR-018**: An At-a-Glance block MUST appear near the top of the case study — a scannable
  summary (3–5 items) of: what was built, Joel's role, deployment status, key technologies,
  and validation outcome.
- **FR-019**: The Microsoft attribution MUST appear early, use the approved sentence exactly,
  and be positioned as secondary to the project outcome (not the opening statement).

#### Case Study — My Contribution

- **FR-020**: The My Contribution section MUST clearly distinguish Microsoft-provided
  components from Joel's engineering work in separate, visually distinct blocks.
- **FR-021**: Joel's contribution MUST be grouped into four labeled categories:
  Application, Infrastructure, Security & Data, and Engineering & Validation.
- **FR-022**: The My Contribution section MUST appear before the architecture diagram.

#### Case Study — Key Architectural Decision

- **FR-023**: A Key Architectural Decision section MUST appear between My Contribution and
  the Architecture diagram.
- **FR-024**: This section MUST present the decision as a sequence: Original Approach →
  Constraint → Investigation → Decision → Outcome.
- **FR-025**: The section MUST frame the App Service → Container Apps pivot as evidence of
  engineering judgment, not merely as a problem encountered.

#### Case Study — Architecture Diagram

- **FR-026**: The architecture diagram MUST have Simplified (default) and Full Architecture
  views with a clear toggle control.
- **FR-027**: The simplified view MUST clearly show the primary request path and key
  supporting components with nodes sized and spaced for readability.
- **FR-028**: The full view MUST include all 15 verified components including Microsoft
  Fabric (marked inactive with dashed/reduced-opacity styling).
- **FR-029**: The diagram MUST visually distinguish Joel-configured versus Microsoft-provided
  components through consistent visual encoding.
- **FR-030**: Hovering or clicking a node MUST reveal component details without obscuring
  other nodes or causing layout shifts.
- **FR-031**: The diagram container on mobile MUST allow horizontal scrolling without
  causing full-page overflow.
- **FR-032**: A text description of the architecture MUST be accessible (e.g., via a
  disclosure element) for accessibility purposes.

#### Case Study — ER Diagram

- **FR-033**: The ER diagram MUST include all 10 verified AdventureWorksLT entities.
- **FR-034**: Entities MUST be grouped: Customers, Sales, and Product Catalog.
- **FR-035**: The core business path entities MUST be visually emphasized.
- **FR-036**: All 12 verified FK relationships MUST be shown; none may be invented.
- **FR-037**: Each entity card MUST show table name, primary key, and important FKs.
- **FR-038**: The ER diagram container on mobile MUST allow horizontal scrolling without
  full-page overflow.

#### Case Study — Content Sections

- **FR-039**: The How It Works section MUST present the 10-step flow with each step
  having a short title and one concise sentence (not large paragraphs).
- **FR-040**: The Technical Challenge section MUST have labeled stages: Original Approach,
  Constraint, Investigation, Decision, Implementation, Outcome.
- **FR-041**: The Troubleshooting section MUST preserve all seven items, each with
  Problem, Root Cause, and Fix structure.
- **FR-042**: The Validation Results section MUST open with "11/11 validation scenarios
  passed." before the detailed table.
- **FR-043**: The Production Considerations section MUST be framed as "What I would add
  for production" — not as a list of shortcomings.
- **FR-044**: A Related Technical Writing section MUST appear near the end of the case
  study listing potential future topics (not published links yet).
- **FR-045**: The Screenshots section MUST retain six intentional placeholder figures
  with descriptive captions. No credentials, secrets, or sensitive identifiers may appear.

#### Project Image / Visual Identity

- **FR-046**: The Azure Agentic project MUST have a visible image or polished placeholder
  in the Works card, homepage Featured Work, and case study header area.
- **FR-047**: The placeholder MUST look intentional. Replacing it with a real screenshot
  MUST require only a file or frontmatter reference change.

#### About Page

- **FR-048**: The About page MUST use this section order: Introduction, What I Focus On,
  How I Work, Current Interests, Contact.
- **FR-049**: The About page MUST NOT duplicate the homepage hero text verbatim.
- **FR-050**: The About page MUST include GitHub, LinkedIn, and email contact links.
- **FR-051**: The About page MUST NOT read like a résumé chronology.

#### Navigation and Footer

- **FR-052**: Global navigation destinations MUST be: Home, Work, Blog, About, Search.
  No new menu items are added.
- **FR-053**: The footer MUST contain: GitHub, LinkedIn, Email, and RSS. No promotional
  or template-author links.

#### Cross-Cutting: Accessibility

- **FR-054**: Each page MUST have exactly one logical H1 heading.
- **FR-055**: All SVG diagrams MUST have accessible title/description elements.
  Understanding MUST NOT depend solely on color.
- **FR-056**: All interactive elements MUST be keyboard-accessible with visible focus states.
- **FR-057**: All images and placeholders MUST have descriptive alt text.
- **FR-058**: Tables MUST use semantic markup with proper headers.

#### Cross-Cutting: Dark Mode and Performance

- **FR-059**: Every new or modified visual element MUST use existing CSS custom property
  tokens — no hard-coded colors.
- **FR-060**: No new npm packages MUST be added as part of this feature.
- **FR-061**: The build MUST pass `npm run build` with exit code 0 after all changes.

---

### Key Entities

- **Featured Work block**: A new homepage section directly surfacing the primary project.
- **At-a-Glance block**: A scannable summary block near the top of the case study.
- **Key Architectural Decision section**: New case study section between My Contribution
  and Architecture presenting the App Service → Container Apps pivot as engineering judgment.
- **Project placeholder image**: A visual asset representing the project before a real
  screenshot is available; designed for easy replacement.
- **Portfolio visitor**: End-user who may be a recruiter (quick scan), a technical lead
  (deep read), or a general professional.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify who Joel is, what he builds, and that he
  has a real deployed project within 90 seconds of landing on the homepage.
- **SC-002**: A visitor can reach the Azure case study from the homepage in two interactions
  or fewer.
- **SC-003**: A technical evaluator can identify Joel's personal contribution as distinct
  from Microsoft's foundation within the first two visible screens of the case study.
- **SC-004**: The architecture diagram simplified view communicates the full request path
  within 15 seconds of viewing.
- **SC-005**: The Validation Results section is scannable: a visitor reading only the
  section heading and first line understands that 11 tests passed.
- **SC-006**: The homepage has no unintended repeated positioning phrases — the same
  tagline appears in at most one section.
- **SC-007**: All pages pass `npm run build` with exit code 0.
- **SC-008**: No page causes unintended horizontal overflow at 390px viewport width.
  Technical diagrams may scroll horizontally within their container intentionally.
- **SC-009**: Every interactive element works correctly on both desktop and mobile.
- **SC-010**: No new npm packages are added.
- **SC-011**: No section implies Joel built the Microsoft accelerator from scratch,
  Fabric was the active SQL backend, or CI/CD was implemented.

---

## Assumptions

- The existing Astro Keel architecture, design system, CSS custom properties, content
  collections, layouts, SEO system, and responsive patterns are retained unless a
  specific functional requirement mandates a change.
- No new npm packages are added. All improvements are achieved with existing dependencies
  (CSS, native SVG, vanilla JS, MDX, Astro).
- A real screenshot of the deployed Azure project is not yet available. A polished
  programmatic or SVG placeholder will be implemented and designed for easy replacement.
- The live project URL (`https://app-agentic-web-dev.thankfulfield-cc53b9b6.eastus.azurecontainerapps.io`)
  is treated as potentially ephemeral and appears as a convenience link, not as primary
  credibility evidence.
- Architecture and ER diagrams continue to use inline SVG and vanilla JavaScript.
  Improvements are to layout, sizing, hierarchy, and interaction quality only.
- Dark mode behavior for all new elements relies on existing CSS custom property tokens.
- The `src/content/works/azure-agentic-case-study.mdx` file from Feature 002 is the
  primary file to be revised. Changes stay within: `src/pages/index.astro`,
  `src/pages/about/index.astro`, `src/pages/works/index.astro`,
  `src/content/works/azure-agentic-case-study.mdx`,
  `public/scripts/azure-agentic-diagram.js`, global CSS additions (diagram container
  styles), and a new placeholder image file.
- The Blog index, Search page, and RSS feed require only minor empty-state text
  refinement, if anything.
- The spec assumes Feature 002 (azure-agentic-case-study.mdx) was completed and
  the build is passing. This feature builds on that foundation.
