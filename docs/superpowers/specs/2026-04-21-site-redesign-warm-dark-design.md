# Site Redesign — Warm Dark Design Spec

## Overview

An alternative redesign of alocay.github.io using a warm, personal aesthetic. Deep brown background, cream text, and terracotta accent. Same content and structure as the bold design spec, different visual character — warmer, more distinctive, less aggressive.

---

## Design System

| Token | Value |
|---|---|
| Background | `#2b2118` |
| Surface / dividers | `#3d2e22` |
| Surface alt | `#342619` |
| Primary text | `#f0e2d0` (warm cream) |
| Secondary text | `#7a5c45` |
| Muted text | `#4a3828` |
| Accent | `#c4956a` (terracotta) |
| Font weight (headings) | 800 |
| Letter spacing (labels) | 2–4px, uppercase |

All pages share this token set. No additional color palettes.

---

## Page Structure

Same routes as the bold design spec. One new route added: `/` = Homepage, `/about` = About (moved from `/`), `/exp`, `/art`, `/contact`.

Page transitions use a full-page slide/wipe animation on route change.

**Top nav (inner pages only):** `AL` monogram in terracotta, a `1px #3d2e22` vertical rule, then nav links left-aligned. Active page underlined in terracotta. The `AL` monogram links back to `/`. The top nav does NOT appear on the homepage.

---

## Homepage (`/`)

**Layout:** Full-bleed hero. No top nav bar — the name owns the entire space.

**Minimal top strip:** Two pieces of text in very dim muted brown — site handle (`alocay.github.io`) on the left, year (`2026`) on the right. Barely visible, purely contextual.

**Hero:**
- Label: `SOFTWARE ENGINEER` in small uppercase secondary text, above the name
- Name in oversized heavy type, two lines: `ARMANDO` / `LOCAY.` — the period is terracotta
- Terracotta dash (`32px × 2px`) below the name, left-aligned
- Tagline: `Builder · Maker · Artist` in small muted uppercase next to the dash

**Bottom nav:** A `1px #3d2e22` top border, then four numbered nav items left-aligned with a gap between them. Each item has a small number label (`01`–`04`) in terracotta above the section name in bold cream uppercase. A terracotta `↗` arrow sits on the far right.

Clicking a nav item triggers the full-page transition to that route.

---

## About Page (`/about`)

**Layout:** Standard inner page with top nav (`AL | links`) and content area. No left rail.

**Content — FlipLabel section:**
- Small label: `I AM A` in secondary text uppercase
- Name: `Armando Locay.` in large bold cream
- Word list displayed horizontally below. Active word in terracotta with a terracotta underline; inactive words in muted brown.
- Word list: Developer · Artist · Gamer · Woodworker · Mead Maker · Hiker · Traveler
- Words cycle automatically with **random** selection — next word picked randomly from the pool, excluding the current word. (Same `FlipLabelPool.js` change as bold design spec.)

**Content — Bio:**
- Terracotta `24px × 2px` rule above bio
- Bio copy: *"Software engineer with 10+ years building products across defense, tech, and more. I design and write code by day and make art, woodwork, mead, and tools by night."*

---

## Experience Page (`/exp`)

**Layout:** Standard inner page with top nav. Two-column content grid.

**Left column — Professional:**
- Label: `PROFESSIONAL` in small terracotta uppercase
- Entries (newest first):
  1. **Apollo GraphQL** — 2025–Present — MCP Server, API Gateway, Apollo Studio frontend & backend, MCP/AI tooling. `Current` badge in terracotta.
  2. **OfferUp** — 2020–2024 — Backend microservices for job/rental imports, search, and internal tooling.
  3. **Northrop Grumman** — 2015–2020 — Satellite monitoring desktop & web application (WRMS).
  4. **Microsoft** — 2013–2015 — Windows Phone apps, podcast app, Maps platform components.
- Each entry: company name in bold uppercase cream, date in small muted brown, description in secondary brown.

**Right column — Projects & Side Work:**
- Label: `PROJECTS & SIDE WORK` in small terracotta uppercase
- Entries: Announcord, React Fuzzy / FuzzyJS, Potential Fields / Flies, Escape
- Same typographic treatment as professional entries.

---

## Art Page (`/art`)

**Layout:** Standard inner page with top nav. Full-width content area.

**Gallery structure:** Two sections — Artwork and Photography.

Each section has:
- Section header: label in small terracotta uppercase with a full-width `1px #3d2e22` rule on the same line
- Existing `FadeInImage` flex-wrap grid — no change to behavior
- Existing `LightBox` overlay — no change to behavior

---

## Contact Page (`/contact`)

**Layout:** Standard inner page with top nav. Content vertically centered.

**Content:**
- Label: `GET IN TOUCH` in secondary text uppercase
- Four link rows with `1px #3d2e22` bottom borders (except last). Each row:
  - Category label in small muted uppercase (e.g., `EMAIL`, `CODE`, `PROFESSIONAL`, `Q&A`)
  - Link name in bold cream
  - Terracotta `↗` arrow on the right

Links: Email (`alocay@gmail.com`), GitHub, LinkedIn, Stack Overflow.

---

## Page Transitions

Same approach as bold design spec — full-page slide/wipe CSS transition on route change.

---

## Component Changes

| Component | Change |
|---|---|
| `Root.js` / `App.js` | Add `/about` route, add Homepage component at `/`, add transition wrapper |
| `Navbar.js` | New `AL \| links` top nav, hidden on homepage |
| `About.js` | Update layout and word list |
| `FlipLabelPool.js` | Random non-current index selection (same as bold spec) |
| `Exp.js` | Two-column layout, add Apollo GraphQL entry |
| `Art.js` | Update page chrome only |
| `Contact.js` | Bold labeled link rows |
| CSS | New warm dark design system; keep `art.css` gallery rules |

---

## Key Differences from Bold Design

| Aspect | Bold Design | Warm Dark |
|---|---|---|
| Background | `#0d0d0d` near-black | `#2b2118` deep brown |
| Accent | `#ffbe0b` amber | `#c4956a` terracotta |
| Homepage layout | Split-screen (identity left, nav right) | Full-bleed hero, nav at bottom |
| Top nav on homepage | Yes | No |
| Name weight | 900 | 800 |
| Overall feel | Sharp, editorial, high contrast | Warm, personal, distinctive |

---

## Out of Scope

- No single-page scroll
- No carousel for the gallery
- No changes to `FadeInImage` or `LightBox` internals
- No backend or data changes
- No new pages or routes beyond `/about`
