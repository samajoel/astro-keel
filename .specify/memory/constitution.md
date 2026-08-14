<!--
Sync Impact Report
==================
Version change: [TEMPLATE] → 1.0.0
Bump type: MAJOR — first concrete governance document replacing unfilled template.

Modified principles: N/A (first population)
Added sections:
  - Core Principles (7 principles)
  - Development Discipline (5 principles)
  - Governance

Removed sections: N/A

Templates reviewed:
  ✅ .specify/templates/plan-template.md
       "Constitution Check" gate is generic/project-agnostic — compatible.
       No updates required.
  ✅ .specify/templates/spec-template.md
       No constitution-specific references. Compatible as-is.
  ✅ .specify/templates/tasks-template.md
       No constitution-specific references. Compatible as-is.
  ℹ️  .specify/templates/commands/ — directory does not exist; no command files to review.

Deferred items: None. All placeholders resolved.
-->

# Personal Technical Portfolio Constitution

## Core Principles

### I. Architectural Preservation

The existing Astro Keel architecture MUST be preserved unless a change is strictly
necessary to satisfy an explicit feature specification. Structural changes require
written justification in the feature spec before implementation begins.

**Rationale**: The template ships at Lighthouse 100/100/100/100. Unsolicited
refactoring risks regressions in performance, accessibility, and SEO with no
corresponding user value.

### II. Configuration Over Code

Changes MUST be implemented as configuration or content edits before any new
component or architectural rewrite is considered. A new component is only justified
when a configuration-only path is verifiably impossible.

**Rationale**: The Astro Keel template is designed around a single config file
(`src/consts.ts`) and content collections. Respecting that contract keeps the site
maintainable by one person without deep framework expertise.

### III. Reuse Existing Infrastructure

All features MUST reuse the existing layouts, styles, content collections, SEO
metadata, search, accessibility attributes, and responsive breakpoints. Duplicating
or shadowing existing infrastructure is not permitted.

**Rationale**: Duplication creates drift. The template's existing infrastructure
already satisfies quality requirements; anything new must integrate, not parallel.

### IV. No Backend or Unnecessary Dependencies

The site MUST remain a static Astro build. No backend, database, authentication
system, CMS, or runtime server MUST be introduced. New npm packages require
explicit justification and MUST not be added if an existing Astro Keel dependency
already covers the need.

**Rationale**: Backend complexity is out of scope for a personal static portfolio.
Every dependency is a maintenance obligation and a potential supply-chain risk.

### V. Maintain Quality Standards

Every shipped change MUST preserve the existing Lighthouse 100/100/100/100 scores
(Performance, Accessibility, Best Practices, SEO), WCAG 2.1 AA accessibility
compliance, mobile-first responsive layout, and canonical SEO metadata.

**Rationale**: These standards define the production baseline. Regressions are
not acceptable tradeoffs for new features.

### VI. Professional Focus

The site MUST remain simple, professional, and editorial in tone. Visual redesign,
decorative complexity, animations beyond what the template ships, or content outside
the scope of technical projects and engineering writing are out of scope.

**Rationale**: The portfolio's purpose is to communicate technical competence to
professional audiences. Simplicity and clarity serve that goal better than novelty.

### VII. Content Collection Discipline

Portfolio projects MUST be added to the existing `works` content collection.
Technical articles MUST be added to the existing `blog` content collection.
No new top-level content collection MUST be created without an explicit specification
that justifies why the existing collections are insufficient.

**Rationale**: The template's two-collection model (works + blog) covers the full
scope of a technical portfolio. Proliferating collections fragments navigation and
increases maintenance surface.

## Development Discipline

### VIII. Ship Speed First

Shipping speed and long-term maintainability MUST take priority over feature
expansion. A working, content-populated site delivered quickly is more valuable than
a feature-rich site delivered slowly. Gold-plating and speculative generalization are
not permitted.

### IX. Build Gate (NON-NEGOTIABLE)

Every change MUST pass `npm run build` without errors or warnings before it is
considered complete. A change that breaks the build MUST be reverted or fixed before
any other work proceeds.

### X. Template Preservation

Working template functionality MUST NOT be modified unless an explicit, approved
specification requires it. If a feature can be delivered by adding to the template
rather than changing it, the additive path MUST be chosen.

### XI. Minimal Dependencies

The existing Astro Keel dependency stack MUST be reused wherever possible. Before
adding any new package, the implementer MUST verify that no existing dependency
already satisfies the need. Packages added solely for convenience or developer
ergonomics are not justified.

### XII. Production-Ready Goal

The objective is a production-ready personal portfolio delivered quickly — not a
redesign, re-engineering effort, or technology showcase. Every decision MUST be
evaluated against this goal. If a change does not make the portfolio more complete
or more accurate, it SHOULD NOT be made.

## Governance

This constitution supersedes all other informal practices for this project.

**Amendment procedure**: Any principle change requires a written rationale in the
feature spec before implementation. Amendments MUST increment the constitution
version following semantic versioning (MAJOR: principle removed or redefined;
MINOR: principle added or materially expanded; PATCH: clarification or wording fix)
and update `LAST_AMENDED` to the date of change.

**Compliance review**: Every feature plan MUST include a "Constitution Check" gate
that verifies the proposed design does not violate any principle above. Violations
require explicit justification and user approval before proceeding.

**Complexity justification**: Any deviation from the principles above MUST be
documented in the plan's Complexity Tracking table, naming the principle violated,
why it is necessary, and what simpler alternative was rejected and why.

**Runtime development guidance**: For day-to-day implementation decisions, refer
to `CLAUDE.md` at the repository root.

**Version**: 1.0.0 | **Ratified**: 2026-08-14 | **Last Amended**: 2026-08-14
