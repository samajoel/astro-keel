# Data Model: Portfolio Foundation

**Date**: 2026-08-14

This document describes the content entities used by the portfolio site and their authoritative
source locations. There is no database — all data is file-based via Astro Content Collections
and the `src/consts.ts` configuration file.

---

## Entity 1: Site Identity

**Source**: `src/consts.ts` → `SITE` object

| Field | Type | Value | Used by |
|-------|------|-------|---------|
| `title` | string | `'Joel Samaniego'` | Header brand, `<title>`, og:site_name, RSS |
| `description` | string | `'AI Solutions Builder — Cloud, automation, and generative AI.'` | Default meta description, OG, RSS |
| `rssDescription` | string | `'Engineering articles on AI solutions, cloud, and automation by Joel Samaniego.'` | RSS feed subtitle |
| `author` | string | `'Joel Samaniego'` | JSON-LD BlogPosting structured data |
| `footerText` | string | `'Joel Samaniego'` | Footer credit line |
| `ogImage` | string | `'/og.jpg'` | Default social share image (unchanged) |
| `locale` | string | `'en'` | `<html lang>`, date formatting, RSS language (unchanged) |

---

## Entity 2: Social Links

**Source**: `src/consts.ts` → `SOCIAL_LINKS` array

| Label | Icon | href |
|-------|------|------|
| GitHub | `github` | `https://github.com/samajoel` |
| LinkedIn | `linkedin` | `https://www.linkedin.com/in/joel-mateo-samaniego/` |
| Email | `email` | `mailto:samajoel@icloud.com` |
| RSS feed | `rss` | `/rss.xml` |

Rendered by `src/components/SocialLinks.astro` in the footer.

---

## Entity 3: Works Entry

**Source**: `src/content/works/*.md` or `*.mdx`
**Schema**: `src/content.config.ts` (unchanged)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | ✅ | Shown in list and detail page |
| `description` | string | ✅ | Summary paragraph |
| `thumbnail` | image | optional | 720×480 display, lazy-loaded |
| `tech` | string[] | ✅ | Technology tags shown as a list |
| `link` | string | optional | Live project URL |
| `repo` | string | optional | Repository URL |
| `order` | number | optional | Sort priority (lower = first) |
| `publishDate` | date | ✅ | Used for sorting |

**Current state after foundation**: 0 entries (all demo files deleted).
The works index and home page both handle the empty state gracefully.

---

## Entity 4: Blog Post

**Source**: `src/content/blog/*.md` or `*.mdx`
**Schema**: `src/content.config.ts` (unchanged)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | ✅ | Shown in list and post page |
| `description` | string | ✅ | Meta description and list excerpt |
| `publishDate` | date | ✅ | Shown and used for sorting |
| `heroImage` | image | optional | Post cover (320×220 in list) |
| `tags` | string[] | optional | Used for tag archive pages |
| `draft` | boolean | optional | `true` hides post from all indexes |

**Current state after foundation**: 0 published entries (all demo files deleted).
Search, tags, RSS, and pagination all handle the zero-post state without breaking.

---

## Entity 5: Professional Biography

**Source**: `src/pages/about/index.astro` (inline prose, not a content collection)

| Section | Content |
|---------|---------|
| h1 (page head) | Short positioning headline |
| Lead paragraph | One sentence professional summary |
| Profile h2 | Section title for bio area |
| Profile paragraphs | Joel's short bio (provided) |
| Ledger 01 — Current focus | AI Solutions, Cloud, Automation |
| Ledger 02 — Background | Engineering + product background |
| Ledger 03 — Contact | samajoel@icloud.com |
| Closing section | Approach / philosophy |

Note: Biography prose lives in the `.astro` file by design (see Astro Keel source comment).
It is not in the i18n dictionary and is not a Content Collection entry.

---

## Entity 6: Deployment Configuration

**Source**: `astro.config.mjs`

| Field | Value | Notes |
|-------|-------|-------|
| `site` | `https://samajoel.github.io` | Base domain for canonical URLs, sitemap, RSS |
| `base` | `/astro-keel` | Path prefix matching GitHub repo name |

These two fields together produce canonical URLs like
`https://samajoel.github.io/astro-keel/works/some-project/`.
