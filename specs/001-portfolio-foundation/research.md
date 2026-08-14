# Research: Portfolio Foundation

**Date**: 2026-08-14
**Feature**: specs/001-portfolio-foundation

## Purpose

This document maps the spec requirements to concrete files in the existing Astro Keel codebase.
No technology choices are needed — the stack is fixed. Research here means: find exactly which
files to edit and what their current state is.

---

## Finding 1 — Single configuration entry point

**Decision**: All site-wide identity (title, author, description, RSS, footer text, social links)
is controlled by `src/consts.ts`. This is the only file that needs to change for identity.

**Rationale**: The `SITE` object and `SOCIAL_LINKS` array are imported by every page,
`BaseLayout.astro`, `rss.xml.ts`, and OG image generation. Editing consts.ts propagates changes
everywhere without touching any other file.

**Current state**:
- `SITE.title` → `'Astro Keel'`
- `SITE.description` → `'A minimal, neutral, and modern portfolio and blog theme for Astro.'`
- `SITE.author` → `'Astro Keel'`
- `SITE.footerText` → `'Built with Astro Keel.'`
- `SOCIAL_LINKS` → GitHub (kpab/astro-keel) + RSS only

**Required change**:
```ts
SITE.title: 'Joel Samaniego'
SITE.description: 'AI Solutions Builder — Cloud, automation, and generative AI.'
SITE.rssDescription: 'Engineering articles on AI solutions, cloud, and automation by Joel Samaniego.'
SITE.author: 'Joel Samaniego'
SITE.footerText: 'Joel Samaniego'
SOCIAL_LINKS: [GitHub samajoel, LinkedIn, email, RSS]
```

---

## Finding 2 — GitHub Pages deployment URL

**Decision**: Change `site` in `astro.config.mjs` from `https://kpab.github.io` to
`https://samajoel.github.io`. Keep `base: '/astro-keel'` — the repo name is `astro-keel`
(confirmed via `git remote get-url origin` → `https://github.com/samajoel/astro-keel`).

**Rationale**: GitHub Pages project sites deploy to `<username>.github.io/<repo>`. The
`site` field is the domain; `base` is the path prefix matching the repo name. Both are
already correct in structure — only the username changes.

**Alternatives considered**: Renaming the repo to `samajoel.github.io` would allow `base: '/'`
(root site). Not in scope for this feature — a repo rename is a separate decision.

---

## Finding 3 — Home page copy is in index.astro, not i18n

**Decision**: The home page hero, overview section, and section headings live directly in
`src/pages/index.astro` as inline text. The UI dictionary (`src/i18n/en.ts`) controls only
link labels and aria labels (e.g., "View works", "Read notes", "Latest works").

**Rationale**: This is intentional Astro Keel design. The comment in `en.ts` explicitly states:
"Placeholder prose on the home and about pages is *not* here: it lives in the `.astro` files."
This means copy changes are straightforward text edits in `index.astro`.

**Sections to rewrite in index.astro**:
1. `.hero` section — eyebrow, h1, lead paragraph
2. `.split-overview` section — eyebrow, h2, and three `<article>` items (currently describe
   the theme; replace with Joel's three focus areas: AI Solutions, Cloud, Automation)

**Sections to leave unchanged in index.astro**:
- Latest works feed (empty state handled automatically)
- Latest blog feed (empty state handled automatically)
- The works/blog section headings ("Built records." / "Field notes.") — these are generic
  enough to keep

---

## Finding 4 — About page is a self-contained Astro file

**Decision**: `src/pages/about/index.astro` contains all bio copy as inline text (not i18n).
Replace all placeholder copy with Joel's professional narrative across its four sections.

**Current sections**:
1. `.page-head` — placeholder h1 and lead
2. `.prose-grid` (Profile) — 2 placeholder paragraphs
3. `.about-ledger` (01/02/03) — 3 placeholder articles (Current focus, Background, Contact)
4. `.prose-grid.about-closing` (Method) — 1 placeholder paragraph

**Required**: Replace all inline text. Preserve all class names, layout structure, and Astro
imports unchanged.

---

## Finding 5 — Works index has no empty-state handler

**Decision**: Add a simple empty-state conditional to `src/pages/works/index.astro` similar to
the one already in `index.astro`. When no works entries exist, show a short professional
placeholder paragraph instead of an empty list.

**Rationale**: After deleting the 3 demo works files, the works list will be empty. The home
page handles this gracefully with a conditional — the works index does not. Without a handler,
visitors see a bare, incomplete-looking page. The fix is 4 lines mirroring the existing pattern.

**Implementation pattern** (matches existing home page pattern):
```astro
{works.length > 0 ? (
  <div class="work-list">...</div>
) : (
  <div class="empty-state">
    <p>Case studies in progress — check back soon.</p>
  </div>
)}
```

---

## Finding 6 — BaseLayout footer contains a third-party promotional link

**Decision**: Remove the hardcoded `<a href="https://almanac.p4ni.com">Almanac ↗</a>` from
`src/layouts/BaseLayout.astro` footer. This is the template author's commercial product link —
it has no place on a personal portfolio.

**Rationale**: The footer div currently contains two links: `/blog/` (Notes) and `almanac.p4ni.com`.
Removing the Almanac link is a one-line deletion. The `SITE.footerText` and `SocialLinks`
component are already in the footer and will show Joel's identity after consts.ts is updated.

---

## Finding 7 — Demo content file inventory

**Works (delete all 6 files)**:
- `src/content/works/code-reading-kit.mdx`
- `src/content/works/code-reading-kit.jpg`
- `src/content/works/field-notes-archive.md`
- `src/content/works/field-notes-archive.jpg`
- `src/content/works/keel-portfolio.md`
- `src/content/works/keel-portfolio.jpg`

**Blog (delete all 4 files)**:
- `src/content/blog/baseline-rhythm.mdx`
- `src/content/blog/blog-hero.jpg`
- `src/content/blog/content-layer-notes.md`
- `src/content/blog/release-checklist.md`

**Rationale**: These are the template author's demo entries. Deleting them is the cleanest
approach — no stubs, no "draft: true" workarounds, no confusion for visitors.

---

## Finding 8 — No accent color change required

**Decision**: Keep the existing accent (`oklch(0.54 0.14 35)` — warm orange/amber). The user
did not specify a preferred color. The existing color is professional and distinctive.

**Rationale**: The spec assumption says "existing accent color is retained unless the owner
specifies a preferred alternative." No preference was given. Changing the color without a
specific request would violate Principle II (config over code only when necessary) and
Principle X (don't touch working template functionality).

---

## Finding 9 — Social links icon set

**Available icons in SocialLinks.astro**: `github`, `x`, `linkedin`, `rss`, `email`

All four icons needed (GitHub, LinkedIn, email, RSS) are already bundled. No new icon work
required. Add entries to `SOCIAL_LINKS` in `consts.ts`:
```ts
{ label: 'GitHub', href: 'https://github.com/samajoel', icon: 'github' },
{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/joel-mateo-samaniego/', icon: 'linkedin' },
{ label: 'Email', href: 'mailto:samajoel@icloud.com', icon: 'email' },
{ label: 'RSS feed', href: '/rss.xml', icon: 'rss' },
```
