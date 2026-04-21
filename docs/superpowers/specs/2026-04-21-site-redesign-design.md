# Site Redesign — Design Spec

## Overview

Redesign alocay.github.io from a plain, unstyled layout into a bold, typographic personal site. The site presents Armando Locay primarily as a software engineer with wide creative and personal interests. The aesthetic is dark background, heavy white type, and amber accent.

---

## Design System

| Token | Value |
|---|---|
| Background | `#0d0d0d` |
| Surface / dividers | `#1c1c1c` |
| Primary text | `#ffffff` |
| Secondary text | `#555555` |
| Accent | `#ffbe0b` (amber) |
| Font weight (headings) | 900 |
| Letter spacing (labels) | 3–4px, uppercase |

All pages share this token set. No additional color palettes.

---

## Page Structure

The site gains one new route. Current routes: `/` = About, `/exp`, `/art`, `/contact`. New routes: `/` = Homepage (split-screen nav), `/about` = About, `/exp`, `/art`, `/contact`. The `App.js` route table must be updated accordingly. React Router v6 handles routing. Page transitions use a bold full-page slide/wipe animation triggered on route change.

A persistent top nav bar appears on all inner pages (About, Exp, Art, Contact). The current page is indicated by an amber underline on its nav label.

Each inner page has a narrow left rail (36px) with a vertically rotated section label in dark gray.

---

## Homepage (`/`)

**Layout:** Split-screen. Left panel (~42% width) contains identity. Right panel (remaining width) contains navigation rows. A thin top bar spans the full width.

**Top bar:**
- Left: `AL` monogram in amber, uppercase, wide letter-spacing
- Right: `Software Engineer — Builder — Artist` in dark gray, uppercase, wide letter-spacing

**Left panel (identity):**
- Name in oversized heavy type, two lines: `ARMANDO` / `LOCAY.` — the period is amber
- Amber dash (`36px × 2px`) sits directly below the name, left-aligned
- Bottom of panel: `SOFTWARE ENGINEER` label in small uppercase dark gray

**Right panel (nav rows):**
Four equal-height rows separated by `1px #1c1c1c` dividers. Each row contains:
- Number label (`01`–`04`) in small amber uppercase
- Section name in large bold white uppercase
- Amber `↗` arrow on the right

Rows: `01 About`, `02 Experience`, `03 Art`, `04 Contact`. All rows have equal visual weight — no dimming or de-emphasis.

**Hover state:** Each row gets an amber left-border flash on hover.

**Click:** Clicking a row triggers the full-page transition to that route.

---

## About Page (`/about`)

**Layout:** Standard inner page with top nav, left rail, and content area.

**Content — FlipLabel section:**
- Small label: `I AM A` in dark gray uppercase
- Name on its own line: `Armando Locay.` in large bold white
- Below the name: a horizontal list of identity words. The active word is highlighted in amber with an amber underline; inactive words are dark gray.
- Word list: Developer · Artist · Gamer · Woodworker · Mead Maker · Hiker · Traveler
- Words cycle automatically. Selection is **random** — the next word is picked randomly from the pool, excluding the currently active word. (Change from current sequential cycling in `FlipLabelPool.js`: replace `(activeLabel + 1) % labels.length` with a random index that differs from the current one.)

**Content — Bio:**
- Amber `24px × 2px` rule above the bio text
- Bio copy: *"Software engineer with 10+ years building products across defense, tech, and more. I design and write code by day and make art, woodwork, mead, and tools by night."*

---

## Experience Page (`/exp`)

**Layout:** Standard inner page with top nav, left rail, and a two-column content grid.

**Left column — Professional:**
- Section label: `PROFESSIONAL` in small amber uppercase
- Entries (newest first):
  1. **Apollo GraphQL** — 2025–Present — MCP Server, API Gateway work, Apollo Studio frontend & backend, MCP/AI-related tooling. Marked with a `Current` badge in amber.
  2. **OfferUp** — 2020–2024 — Backend microservices for job/rental imports, search, and internal tooling.
  3. **Northrop Grumman** — 2015–2020 — Satellite monitoring desktop & web application (WRMS).
  4. **Microsoft** — 2013–2015 — Windows Phone apps, podcast app, Maps platform components.
- Each entry: company name in bold uppercase white, date range in small dark gray, description in small gray.

**Right column — Projects & Side Work:**
- Section label: `PROJECTS & SIDE WORK` in small amber uppercase
- Entries: Announcord, React Fuzzy / FuzzyJS, Potential Fields / Flies, Escape
- Same typographic treatment as professional entries but slightly smaller company name size.

---

## Art Page (`/art`)

**Layout:** Standard inner page with top nav and left rail. Content is full-width below the rail.

**Gallery structure:** Two sections — Artwork and Photography — matching existing component structure (`Drawings` and `Photos` arrays from `GalleryImages.js`).

Each section has:
- A section header: label text (`ARTWORK` / `PHOTOGRAPHY`) in small amber uppercase, followed by a full-width `1px #1c1c1c` rule on the same line
- Existing `FadeInImage` component grid (`flex-wrap`) — no change to image loading or layout behavior
- Existing `LightBox` component for full-size image overlay — no change to behavior

The existing `FadeInImage` fade-in animation and `LightBox` overlay are kept as-is. Only the surrounding page chrome (nav, background, section headers) changes.

---

## Contact Page (`/contact`)

**Layout:** Standard inner page with top nav and left rail. Content is vertically centered.

**Content:**
- Small label: `GET IN TOUCH` in dark gray uppercase
- Four link rows, each containing:
  - Category label in small dark gray uppercase (e.g., `EMAIL`, `CODE`, `PROFESSIONAL`, `Q&A`)
  - Link name in large bold white
  - Amber `↗` arrow on the right
  - `1px #1c1c1c` bottom border (except last row)

Links: Email (`alocay@gmail.com`), GitHub, LinkedIn, Stack Overflow.

---

## Page Transitions

Route changes trigger a full-page slide/wipe animation. Implementation approach: use React Router's route change event combined with a CSS transition on a wrapper element. A simple approach is a translate or clip-path wipe — direction can be consistent (e.g., always slide left-to-right on forward navigation).

---

## Component Changes

| Component | Change |
|---|---|
| `Root.js` / `App.js` | Add `/about` route, add Homepage component at `/`, add transition wrapper around `<Routes>` |
| `Navbar.js` | Replace with persistent top nav bar (amber monogram left, links right, active underline) |
| `About.js` | Update layout, keep FlipLabelPool, update word list |
| `FlipLabelPool.js` | Change `changeToNextLabel` to pick a random non-current index |
| `Exp.js` | New two-column layout, add Apollo GraphQL entry |
| `Art.js` | Update page chrome only; keep `FadeInImage` + `LightBox` unchanged |
| `Contact.js` | Replace link list with bold labeled rows |
| CSS | Replace existing stylesheets with new design system; keep `art.css` gallery rules |

---

## Out of Scope

- No single-page scroll
- No carousel for the gallery
- No changes to `FadeInImage` or `LightBox` internals
- No backend or data changes
- No new pages or routes
