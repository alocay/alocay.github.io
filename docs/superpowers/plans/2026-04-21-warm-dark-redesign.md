# Warm Dark Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign alocay.github.io with a warm dark aesthetic — deep brown background, cream text, terracotta accent, bold typography, and a new split homepage/nav structure.

**Architecture:** Replace the existing Navbar + content-container layout with a new Homepage component at `/`, a new TopNav component on inner pages only, and rewritten page components using CSS custom properties from a shared token file. All routes shift: `/` becomes the homepage, `/about` becomes the new About route.

**Tech Stack:** React 18, React Router v6 (HashRouter), Webpack 5, plain CSS with custom properties.

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `css/tokens.css` | CSS custom properties for the design system |
| Modify | `css/App.css` | Base body/root reset; preserve gallery CSS |
| Create | `src/components/TopNav.js` | Inner-page nav: `AL \| links` |
| Create | `css/topnav.css` | TopNav styles |
| Create | `src/components/Home.js` | Homepage: full-bleed hero + bottom nav |
| Create | `css/home.css` | Homepage styles |
| Modify | `src/components/App.js` | New routes, conditional TopNav, page transition |
| Create | `css/transitions.css` | Page enter animation |
| Modify | `src/components/FlipLabel/FlipLabelPool.js` | Random (non-sequential) word cycling |
| Modify | `src/components/About.js` | New layout, consolidated word list |
| Create | `css/about.css` | About page styles |
| Modify | `src/components/Exp.js` | Two-column layout, Apollo GraphQL entry |
| Create | `css/exp.css` | Experience page styles |
| Modify | `src/components/Art.js` | Reskin page chrome; gallery internals unchanged |
| Create | `css/art-page.css` | Art page chrome styles |
| Modify | `src/components/Contact.js` | Bold labeled link rows |
| Create | `css/contact.css` | Contact page styles |
| Delete | `src/components/Navbar.js` | Replaced by TopNav.js |

---

## Task 1: Design system — CSS tokens and base reset

**Files:**
- Create: `css/tokens.css`
- Modify: `css/App.css`

- [ ] **Step 1: Create `css/tokens.css`**

```css
:root {
  --color-bg: #2b2118;
  --color-surface: #3d2e22;
  --color-surface-alt: #342619;
  --color-text-primary: #f0e2d0;
  --color-text-secondary: #7a5c45;
  --color-text-muted: #4a3828;
  --color-accent: #c4956a;
  --font-weight-heading: 800;
  --letter-spacing-label: 3px;
}
```

- [ ] **Step 2: Rewrite `css/App.css`**

Replace the entire file. This removes the old background image, kube import, and legacy layout styles. The gallery CSS (`.gallery`, `.image-container`, `.light-box`) is preserved because `FadeInImage` and `LightBox` components depend on these class names.

```css
@import url(tokens.css);

html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

body {
  background-color: var(--color-bg);
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: var(--color-text-primary);
}

*, *::before, *::after {
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: inherit;
}

.root-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Gallery (FadeInImage + LightBox — do not remove) ── */

div.gallery {
  display: flex;
  flex-wrap: wrap;
}

div.image-container {
  position: relative;
  margin: 0 10px 10px 10px;
}

div.image-container:hover {
  cursor: pointer;
}

div.image-container figure.loaded-image {
  position: absolute;
  z-index: 2;
  top: 0; right: 0; bottom: 0; left: 0;
}

div.image-container figure.loaded-image img.image-final {
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease;
}

div.image-container figure.loaded-image img.image-final.image-fade-in {
  opacity: 1;
}

div.image-container figure.loaded-image figcaption {
  overflow-wrap: normal;
  text-align: left;
  color: var(--color-text-secondary);
  background-color: rgba(0, 0, 0, 0.7);
}

div.image-container img.image-preload {
  position: absolute;
  z-index: 1;
  top: 0; right: 0; bottom: 0; left: 0;
}

div.light-box {
  position: absolute;
  z-index: 10;
  top: 0; left: 0; bottom: 0;
  margin-top: 0;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: auto;
}

div.light-box .light-box-image {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- [ ] **Step 3: Start dev server and verify**

```bash
npm start
```

Open `http://localhost:8080`. Expected: dark brown background (`#2b2118`), no old pattern image, no layout errors in console.

- [ ] **Step 4: Commit**

```bash
git add css/tokens.css css/App.css
git commit -m "feat: add design system tokens and reset base CSS"
```

---

## Task 2: TopNav component

**Files:**
- Create: `src/components/TopNav.js`
- Create: `css/topnav.css`

- [ ] **Step 1: Create `css/topnav.css`**

```css
.topnav {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 28px;
  border-bottom: 1px solid var(--color-surface);
}

.topnav__monogram {
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--color-accent);
  text-transform: uppercase;
  font-weight: 700;
  text-decoration: none;
}

.topnav__divider {
  width: 1px;
  height: 14px;
  background: var(--color-surface);
  flex-shrink: 0;
}

.topnav__links {
  display: flex;
  gap: 22px;
}

.topnav__link {
  font-size: 9px;
  color: var(--color-text-muted);
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
}

.topnav__link--active {
  color: var(--color-accent);
  border-bottom: 1px solid var(--color-accent);
  padding-bottom: 2px;
}

.topnav__link:hover:not(.topnav__link--active) {
  color: var(--color-text-secondary);
}
```

- [ ] **Step 2: Create `src/components/TopNav.js`**

```jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../css/topnav.css';

const NAV_LINKS = [
    { to: '/about', label: 'About' },
    { to: '/exp', label: 'Experience' },
    { to: '/art', label: 'Art' },
    { to: '/contact', label: 'Contact' },
];

function TopNav() {
    const { pathname } = useLocation();
    return (
        <nav className="topnav">
            <Link to="/" className="topnav__monogram">AL</Link>
            <div className="topnav__divider" />
            <div className="topnav__links">
                {NAV_LINKS.map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`topnav__link${pathname === to ? ' topnav__link--active' : ''}`}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default TopNav;
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TopNav.js css/topnav.css
git commit -m "feat: add TopNav component"
```

---

## Task 3: Home component

**Files:**
- Create: `src/components/Home.js`
- Create: `css/home.css`

- [ ] **Step 1: Create `css/home.css`**

```css
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.home__top-strip {
  display: flex;
  justify-content: space-between;
  padding: 16px 28px;
}

.home__site-handle,
.home__year {
  font-size: 9px;
  letter-spacing: 3px;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.home__hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 28px 28px;
}

.home__label {
  font-size: 9px;
  letter-spacing: 4px;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: 18px;
}

.home__name {
  font-size: clamp(52px, 10vw, 96px);
  font-weight: var(--font-weight-heading);
  color: var(--color-text-primary);
  line-height: 0.88;
  letter-spacing: -2px;
  margin: 0 0 20px;
}

.home__period {
  color: var(--color-accent);
}

.home__tagline-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.home__dash {
  width: 32px;
  height: 2px;
  background: var(--color-accent);
  flex-shrink: 0;
}

.home__tagline {
  font-size: 9px;
  color: var(--color-text-muted);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.home__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-surface);
  padding: 18px 28px;
}

.home__nav-items {
  display: flex;
  gap: 32px;
}

.home__nav-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
}

.home__nav-number {
  font-size: 8px;
  color: var(--color-accent);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.home__nav-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.home__nav-item:hover .home__nav-label {
  color: var(--color-accent);
}

.home__nav-arrow {
  font-size: 14px;
  color: var(--color-accent);
}
```

- [ ] **Step 2: Create `src/components/Home.js`**

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/home.css';

const NAV_ITEMS = [
    { number: '01', label: 'About', to: '/about' },
    { number: '02', label: 'Experience', to: '/exp' },
    { number: '03', label: 'Art', to: '/art' },
    { number: '04', label: 'Contact', to: '/contact' },
];

function Home() {
    const navigate = useNavigate();
    return (
        <div className="home">
            <div className="home__top-strip">
                <span className="home__site-handle">alocay.github.io</span>
                <span className="home__year">2026</span>
            </div>
            <div className="home__hero">
                <div className="home__label">Software Engineer</div>
                <h1 className="home__name">
                    ARMANDO<br />
                    LOCAY<span className="home__period">.</span>
                </h1>
                <div className="home__tagline-row">
                    <div className="home__dash" />
                    <span className="home__tagline">Builder · Maker · Artist</span>
                </div>
            </div>
            <nav className="home__nav">
                <div className="home__nav-items">
                    {NAV_ITEMS.map(({ number, label, to }) => (
                        <button
                            key={to}
                            className="home__nav-item"
                            onClick={() => navigate(to)}
                        >
                            <span className="home__nav-number">{number}</span>
                            <span className="home__nav-label">{label}</span>
                        </button>
                    ))}
                </div>
                <span className="home__nav-arrow">↗</span>
            </nav>
        </div>
    );
}

export default Home;
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Home.js css/home.css
git commit -m "feat: add Home component"
```

---

## Task 4: Wire up routing in App.js

**Files:**
- Modify: `src/components/App.js`
- Create: `css/transitions.css`
- Delete: `src/components/Navbar.js`

- [ ] **Step 1: Create `css/transitions.css`**

```css
@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: pageEnter 0.25s ease forwards;
  flex: 1;
  display: flex;
  flex-direction: column;
}
```

- [ ] **Step 2: Rewrite `src/components/App.js`**

```jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TopNav from './TopNav.js';
import Home from './Home.js';
import About from './About.js';
import Exp from './Exp.js';
import Art from './Art.js';
import Contact from './Contact.js';
import '../../css/App.css';
import '../../css/transitions.css';

function App() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="root-container">
            {!isHome && <TopNav />}
            <div key={location.pathname} className="page-enter">
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/exp" element={<Exp />} />
                    <Route path="/art" element={<Art />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
```

- [ ] **Step 3: Delete `src/components/Navbar.js`**

```bash
git rm src/components/Navbar.js
```

- [ ] **Step 4: Verify in dev server**

Open `http://localhost:8080`. Expected:
- Homepage loads with warm dark background, name in large type, bottom nav
- Clicking "About" navigates to `/about` with TopNav visible, page fades in
- Clicking `AL` in TopNav returns to homepage (no TopNav on homepage)
- All four nav items route correctly

- [ ] **Step 5: Commit**

```bash
git add src/components/App.js css/transitions.css
git commit -m "feat: wire up new routing, TopNav, and page transitions"
```

---

## Task 5: FlipLabelPool — random cycling

**Files:**
- Modify: `src/components/FlipLabel/FlipLabelPool.js`

- [ ] **Step 1: Replace `changeToNextLabel` in `FlipLabelPool.js`**

Find this method (line 33–36):
```js
changeToNextLabel() {
    const newActiveLabel = (this.state.activeLabel + 1) % this.props.labels.length;
    this.setState({ activeLabel: newActiveLabel });
}
```

Replace with:
```js
changeToNextLabel() {
    const { labels } = this.props;
    const { activeLabel } = this.state;
    if (labels.length <= 1) return;
    let next;
    do {
        next = Math.floor(Math.random() * labels.length);
    } while (next === activeLabel);
    this.setState({ activeLabel: next });
}
```

- [ ] **Step 2: Verify in dev server**

Navigate to `/about`. Watch the cycling word — it should jump to a non-sequential word each cycle. Refresh several times and confirm it's not always going in order.

- [ ] **Step 3: Commit**

```bash
git add src/components/FlipLabel/FlipLabelPool.js
git commit -m "feat: randomize FlipLabelPool word cycling"
```

---

## Task 6: About page

**Files:**
- Modify: `src/components/About.js`
- Create: `css/about.css`

- [ ] **Step 1: Create `css/about.css`**

```css
.about {
  padding: 36px 28px;
  max-width: 720px;
}

.about__iam-label {
  font-size: 9px;
  letter-spacing: var(--letter-spacing-label);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: 12px;
}

.about__name {
  font-size: 28px;
  font-weight: var(--font-weight-heading);
  color: var(--color-text-primary);
  margin-bottom: 16px;
}

.about__flip-word {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-accent);
  min-height: 28px;
}

/* FlipLabel renders its own spans — target the text color */
.about__flip-word span {
  color: var(--color-accent);
}

.about__bio {
  margin-top: 28px;
}

.about__bio-rule {
  width: 24px;
  height: 2px;
  background: var(--color-accent);
  margin-bottom: 16px;
}

.about__bio-text {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin: 0;
  max-width: 480px;
}
```

- [ ] **Step 2: Rewrite `src/components/About.js`**

The word list is consolidated into one pool. "Developer." is shown as the always-first static active label; the pool cycles through the rest.

```jsx
import React, { Component } from 'react';
import FlipLabelPool from './FlipLabel/FlipLabelPool.js';
import '../../css/about.css';

const IDENTITY_WORDS = [
    'Developer.',
    'Artist.',
    'Gamer.',
    'Woodworker.',
    'Mead Maker.',
    'Hiker.',
    'Traveler.',
];

class About extends Component {
    render() {
        return (
            <div className="about">
                <div className="about__iam-label">I am a</div>
                <div className="about__name">Armando Locay.</div>
                <div className="about__flip-word">
                    <FlipLabelPool labels={IDENTITY_WORDS} />
                </div>
                <div className="about__bio">
                    <div className="about__bio-rule" />
                    <p className="about__bio-text">
                        Software engineer with 10+ years building products across defense,
                        tech, and more. I design and write code by day and make art,
                        woodwork, mead, and tools by night.
                    </p>
                </div>
            </div>
        );
    }
}

export default About;
```

- [ ] **Step 3: Verify in dev server**

Navigate to `/about`. Expected:
- "I AM A" label in muted uppercase
- "Armando Locay." as a bold cream heading
- A word (e.g., "Developer.") cycling in terracotta below it using FlipLabel animation
- Bio text below the terracotta rule

- [ ] **Step 4: Commit**

```bash
git add src/components/About.js css/about.css
git commit -m "feat: rewrite About page with warm dark design"
```

---

## Task 7: Experience page

**Files:**
- Modify: `src/components/Exp.js`
- Create: `css/exp.css`

- [ ] **Step 1: Create `css/exp.css`**

```css
.exp {
  padding: 32px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
}

.exp__column {
  padding: 0 28px;
}

.exp__column + .exp__column {
  border-left: 1px solid var(--color-surface);
}

.exp__col-label {
  font-size: 9px;
  letter-spacing: var(--letter-spacing-label);
  color: var(--color-accent);
  text-transform: uppercase;
  margin-bottom: 20px;
}

.exp__entry {
  margin-bottom: 24px;
}

.exp__entry-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 4px;
}

.exp__company {
  font-size: 13px;
  font-weight: var(--font-weight-heading);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.exp__current-badge {
  font-size: 8px;
  color: var(--color-accent);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.exp__dates {
  font-size: 9px;
  color: var(--color-text-muted);
  letter-spacing: 1px;
  margin-bottom: 6px;
}

.exp__description {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.exp__project-company {
  font-size: 12px;
  font-weight: var(--font-weight-heading);
  color: var(--color-text-primary);
  letter-spacing: 1px;
}
```

- [ ] **Step 2: Rewrite `src/components/Exp.js`**

```jsx
import React, { Component } from 'react';
import '../../css/exp.css';

const PROFESSIONAL = [
    {
        company: 'Apollo GraphQL',
        dates: '2025 – Present',
        current: true,
        description: 'MCP Server, API Gateway work, Apollo Studio frontend & backend, and MCP/AI-related tooling.',
    },
    {
        company: 'OfferUp',
        dates: '2020 – 2024',
        current: false,
        description: 'Backend microservices for job/rental imports, search, and internal tooling.',
    },
    {
        company: 'Northrop Grumman',
        dates: '2015 – 2020',
        current: false,
        description: 'Satellite monitoring desktop & web application (WRMS).',
    },
    {
        company: 'Microsoft',
        dates: '2013 – 2015',
        current: false,
        description: 'Windows Phone apps, podcast app, Maps platform components.',
    },
];

const PROJECTS = [
    {
        name: 'Announcord',
        dates: '2018–2023',
        description: 'Discord bot with Amazon Polly TTS for voice channel announcements.',
        href: 'https://github.com/alocay/announcord',
    },
    {
        name: 'React Fuzzy / FuzzyJS',
        dates: '2014–2018',
        description: 'Image filter/processing JS library and its React component wrapper.',
        href: 'https://alocay.github.io/react-image-fuzzy',
    },
    {
        name: 'Potential Fields / Flies',
        dates: '2014',
        description: 'Algorithm visualizations using paper.js — boids flocking & potential fields.',
        href: null,
    },
    {
        name: 'Escape',
        dates: '2014',
        description: 'Mini-game exploring masking and shadows with paper.js.',
        href: 'https://alocay.github.io/escape-minigame/',
    },
];

class Exp extends Component {
    render() {
        return (
            <div className="exp">
                <div className="exp__column">
                    <div className="exp__col-label">Professional</div>
                    {PROFESSIONAL.map(({ company, dates, current, description }) => (
                        <div className="exp__entry" key={company}>
                            <div className="exp__entry-header">
                                <span className="exp__company">{company}</span>
                                {current && <span className="exp__current-badge">Current</span>}
                            </div>
                            <div className="exp__dates">{dates}</div>
                            <p className="exp__description">{description}</p>
                        </div>
                    ))}
                </div>
                <div className="exp__column">
                    <div className="exp__col-label">Projects &amp; Side Work</div>
                    {PROJECTS.map(({ name, dates, description, href }) => (
                        <div className="exp__entry" key={name}>
                            <div className="exp__project-company">
                                {href ? <a href={href} target="_blank" rel="noreferrer">{name}</a> : name}
                            </div>
                            <div className="exp__dates">{dates}</div>
                            <p className="exp__description">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Exp;
```

- [ ] **Step 3: Verify in dev server**

Navigate to `/exp`. Expected:
- Two columns separated by a `#3d2e22` vertical line
- Apollo GraphQL at the top with "Current" badge in terracotta
- Professional entries newest-first on the left; projects on the right
- Project names that have `href` are linked

- [ ] **Step 4: Commit**

```bash
git add src/components/Exp.js css/exp.css
git commit -m "feat: rewrite Experience page with two-column layout"
```

---

## Task 8: Art page

**Files:**
- Modify: `src/components/Art.js`
- Create: `css/art-page.css`

- [ ] **Step 1: Create `css/art-page.css`**

```css
.art {
  padding: 28px;
}

.art__section {
  margin-bottom: 36px;
}

.art__section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.art__section-label {
  font-size: 9px;
  letter-spacing: var(--letter-spacing-label);
  color: var(--color-accent);
  text-transform: uppercase;
  white-space: nowrap;
}

.art__section-rule {
  flex: 1;
  height: 1px;
  background: var(--color-surface);
}
```

- [ ] **Step 2: Update `src/components/Art.js`**

Only the page chrome changes. `FadeInImage`, `LightBox`, and the `gallery` div class are untouched.

```jsx
import React, { Component } from 'react';
import FadeInImage from './Gallery/FadeInImage.js';
import LightBox from './Gallery/LightBox.js';
import { Drawings, Photos } from './Gallery/GalleryImages.js';
import '../../css/art-page.css';

class Art extends Component {
    constructor(props) {
        super(props);
        this.state = { lightbox: null };
    }

    showLightbox(imageDetails) {
        this.setState({
            lightbox: (
                <LightBox
                    src={imageDetails.src}
                    preloadSrc={imageDetails.preload}
                    width={imageDetails.width}
                    height={imageDetails.height}
                    caption={imageDetails.caption}
                    offsetHeight={true}
                    onClose={this.closeLightbox.bind(this)}
                />
            ),
        });
    }

    closeLightbox() {
        this.setState({ lightbox: null });
    }

    render() {
        return (
            <div className="art">
                {this.state.lightbox}
                <div className="art__section">
                    <div className="art__section-header">
                        <span className="art__section-label">Artwork</span>
                        <div className="art__section-rule" />
                    </div>
                    <div className="gallery">
                        {Drawings.map(d => (
                            <FadeInImage
                                key={d.src}
                                src={d.src}
                                preloadSrc={d.preload}
                                width={d.width}
                                height={d.height}
                                onClick={this.showLightbox.bind(this, d.big)}
                            />
                        ))}
                    </div>
                </div>
                <div className="art__section">
                    <div className="art__section-header">
                        <span className="art__section-label">Photography</span>
                        <div className="art__section-rule" />
                    </div>
                    <div className="gallery">
                        {Photos.map(d => (
                            <FadeInImage
                                key={d.src}
                                src={d.src}
                                preloadSrc={d.preload}
                                width={d.width}
                                height={d.height}
                                onClick={this.showLightbox.bind(this, d.big)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Art;
```

- [ ] **Step 3: Verify in dev server**

Navigate to `/art`. Expected:
- "ARTWORK" and "PHOTOGRAPHY" labels in terracotta with a rule extending to the right
- Gallery images render and fade in as before
- Clicking an image opens the LightBox overlay

- [ ] **Step 4: Commit**

```bash
git add src/components/Art.js css/art-page.css
git commit -m "feat: reskin Art page chrome"
```

---

## Task 9: Contact page

**Files:**
- Modify: `src/components/Contact.js`
- Create: `css/contact.css`

- [ ] **Step 1: Create `css/contact.css`**

```css
.contact {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 36px 28px;
  flex: 1;
}

.contact__label {
  font-size: 9px;
  letter-spacing: var(--letter-spacing-label);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: 24px;
}

.contact__links {
  max-width: 480px;
}

.contact__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-surface);
  text-decoration: none;
  color: inherit;
}

.contact__link:last-child {
  border-bottom: none;
}

.contact__link:hover .contact__link-name {
  color: var(--color-accent);
}

.contact__link-meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.contact__link-category {
  font-size: 9px;
  letter-spacing: 2px;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.contact__link-name {
  font-size: 16px;
  font-weight: var(--font-weight-heading);
  color: var(--color-text-primary);
}

.contact__link-arrow {
  font-size: 16px;
  color: var(--color-accent);
}
```

- [ ] **Step 2: Rewrite `src/components/Contact.js`**

```jsx
import React, { Component } from 'react';
import '../../css/contact.css';

const LINKS = [
    { category: 'Email', name: 'alocay@gmail.com', href: 'mailto:alocay@gmail.com' },
    { category: 'Code', name: 'GitHub', href: 'https://github.com/alocay' },
    { category: 'Professional', name: 'LinkedIn', href: 'https://www.linkedin.com/in/armandolocay' },
    { category: 'Q&A', name: 'Stack Overflow', href: 'https://stackoverflow.com/users/278447/fizz?tab=profile' },
];

class Contact extends Component {
    render() {
        return (
            <div className="contact">
                <div className="contact__label">Get in touch</div>
                <div className="contact__links">
                    {LINKS.map(({ category, name, href }) => (
                        <a
                            key={href}
                            className="contact__link"
                            href={href}
                            target={href.startsWith('mailto') ? undefined : '_blank'}
                            rel="noreferrer"
                        >
                            <div className="contact__link-meta">
                                <span className="contact__link-category">{category}</span>
                                <span className="contact__link-name">{name}</span>
                            </div>
                            <span className="contact__link-arrow">↗</span>
                        </a>
                    ))}
                </div>
            </div>
        );
    }
}

export default Contact;
```

- [ ] **Step 3: Verify in dev server**

Navigate to `/contact`. Expected:
- "GET IN TOUCH" label in muted uppercase
- Four link rows with category labels, bold cream link names, terracotta `↗` arrows
- Hover turns link name terracotta
- All four links are correct hrefs

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.js css/contact.css
git commit -m "feat: rewrite Contact page with labeled link rows"
```

---

## Task 10: Final check and production build

**Files:**
- No code changes — verification and build only

- [ ] **Step 1: Full site walkthrough**

Start from `http://localhost:8080`. Check each page:

| Page | Check |
|---|---|
| `/` (Home) | Name in large cream type, terracotta period, bottom nav with 01–04, no TopNav |
| `/about` | TopNav visible with About underlined, FlipLabel cycling randomly, bio text correct |
| `/exp` | Two columns, Apollo GraphQL at top with Current badge, projects on right |
| `/art` | Artwork and Photography sections with terracotta section labels, images load and fade in, lightbox opens on click |
| `/contact` | Four link rows, correct hrefs, hover effect works |
| Any → Home (AL click) | TopNav AL navigates back to `/`, homepage shows with no TopNav |
| Page transitions | Each route change triggers fade-in animation |

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: build completes without errors. Output files in `/public` or the configured output dir.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: final warm dark redesign — production build verified"
```
