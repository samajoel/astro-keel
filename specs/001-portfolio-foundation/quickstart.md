# Quickstart Validation: Portfolio Foundation

**Date**: 2026-08-14
**Purpose**: Prove the portfolio foundation works end-to-end after implementation.

---

## Prerequisites

- Node.js 22+ (check `.nvmrc`)
- Repository cloned from `https://github.com/samajoel/astro-keel`
- Dependencies installed: `npm install`

---

## Step 1 — Build validation (required gate)

```bash
npm run build
```

**Expected**: Build completes with no errors. No TypeScript errors, no broken imports.

**Pass**: Exit code 0, `dist/` directory created.
**Fail**: Any error in output → investigate before proceeding.

---

## Step 2 — Preview the built site

```bash
npm run preview
```

Open `http://localhost:4321/astro-keel/` (the `/astro-keel` prefix comes from `base` in
`astro.config.mjs`).

---

## Step 3 — Identity validation

On the home page, verify:

- [ ] Browser tab title reads `Joel Samaniego`
- [ ] Header brand name reads `Joel Samaniego`
- [ ] Hero section contains Joel's name and professional positioning
  (AI Solutions Builder · Cloud · Automation)
- [ ] Footer reads `Joel Samaniego` (not "Built with Astro Keel.")
- [ ] Footer does **not** contain the Almanac link

In the footer social icons, verify:
- [ ] GitHub icon links to `https://github.com/samajoel`
- [ ] LinkedIn icon links to `https://www.linkedin.com/in/joel-mateo-samaniego/`
- [ ] Email icon links to `mailto:samajoel@icloud.com`
- [ ] RSS icon links to `/astro-keel/rss.xml`

---

## Step 4 — About page

Navigate to `/astro-keel/about/`:

- [ ] Page title is `About — Joel Samaniego`
- [ ] Bio text matches Joel's confirmed short biography
- [ ] Ledger 03 (Contact) shows `samajoel@icloud.com`
- [ ] No placeholder "Astro Keel" copy remains

---

## Step 5 — Works section

Navigate to `/astro-keel/works/`:

- [ ] No demo projects appear (code-reading-kit, field-notes-archive, keel-portfolio are gone)
- [ ] Page does not show a broken empty layout — an empty state message is shown
- [ ] Page title reads `Works — Joel Samaniego`

---

## Step 6 — Blog section

Navigate to `/astro-keel/blog/`:

- [ ] No demo posts appear (baseline-rhythm, content-layer-notes, release-checklist are gone)
- [ ] Blog index renders without errors (empty state is shown)
- [ ] Search page at `/astro-keel/search/` loads without errors

---

## Step 7 — RSS feed

Open `/astro-keel/rss.xml` in the browser:

- [ ] Feed `<title>` reads `Joel Samaniego`
- [ ] Feed `<description>` matches the updated rssDescription
- [ ] Feed is valid XML (no parse errors)

---

## Step 8 — SEO metadata spot check

View page source on the home page:

- [ ] `<title>Joel Samaniego</title>`
- [ ] `<meta name="description" content="AI Solutions Builder…">`
- [ ] `<meta property="og:site_name" content="Joel Samaniego">`
- [ ] `<link rel="canonical" href="https://samajoel.github.io/astro-keel/">`

---

## Step 9 — Dark mode

- [ ] Toggle dark mode (header button)
- [ ] All pages remain legible; no contrast failures
- [ ] Mode preference persists on page reload

---

## Step 10 — Mobile responsiveness

Resize browser to 375px width (or use DevTools):

- [ ] Navigation is accessible (hamburger or visible links)
- [ ] Hero and about page text is readable
- [ ] No horizontal overflow

---

## Done criteria

All checklist items above are checked. `npm run build` exits with code 0.
The site is ready to be pushed to `samajoel/astro-keel` for GitHub Pages deployment.
