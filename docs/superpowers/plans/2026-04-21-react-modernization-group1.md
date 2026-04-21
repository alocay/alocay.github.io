# React Modernization — Group 1 (Simple Pages) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert four render-only class components to functional components and delete two broken/unused components.

**Architecture:** Pure mechanical conversion — no behavior, prop contracts, CSS, or routing changes. Each class component's `render()` body becomes the function return. No state or lifecycle methods exist in these components, so no hooks are needed. `LightBox`'s single instance method becomes a `const` inside the function body.

**Tech Stack:** React 18, webpack 5, Babel (JSX transpilation requires `import React` to remain)

---

### Task 1: Delete unused components

**Files:**
- Delete: `src/components/FlipLabel/FlipGallery.js`
- Delete: `src/components/Gallery/ImageGallery.js`

- [ ] **Step 1: Confirm neither file is imported anywhere**

Run:
```bash
grep -r "FlipGallery\|ImageGallery" src/
```
Expected: no output (zero matches)

- [ ] **Step 2: Delete the files**

```bash
rm src/components/FlipLabel/FlipGallery.js
rm src/components/Gallery/ImageGallery.js
```

- [ ] **Step 3: Verify the build still passes**

```bash
npm run build
```
Expected: build completes with no errors

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: delete unused FlipGallery and ImageGallery components"
```

---

### Task 2: Convert `About.js`

**Files:**
- Modify: `src/components/About.js`

- [ ] **Step 1: Replace the file contents**

```js
import React from 'react';
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

function About() {
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

export default About;
```

- [ ] **Step 2: Verify the build passes**

```bash
npm run build
```
Expected: build completes with no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/About.js
git commit -m "refactor: convert About to functional component"
```

---

### Task 3: Convert `Contact.js`

**Files:**
- Modify: `src/components/Contact.js`

- [ ] **Step 1: Replace the file contents**

```js
import React from 'react';
import '../../css/contact.css';

const LINKS = [
    { platform: 'Email', label: 'alocay@gmail.com', href: 'mailto:alocay@gmail.com' },
    { platform: 'GitHub', label: 'github.com/alocay', href: 'https://github.com/alocay' },
    { platform: 'LinkedIn', label: 'linkedin.com/in/armandolocay', href: 'https://www.linkedin.com/in/armandolocay' },
    { platform: 'Stack Overflow', label: 'stackoverflow.com', href: 'https://stackoverflow.com/users/278447/fizz?tab=profile' },
];

function Contact() {
    return (
        <div className="contact">
            <div className="contact__label">Get in touch</div>
            <div className="contact__links">
                {LINKS.map(({ platform, label, href }) => (
                    <div className="contact__link-row" key={platform}>
                        <span className="contact__link-platform">{platform}</span>
                        <a className="contact__link-value" href={href} target="_blank" rel="noopener noreferrer">
                            {label}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Contact;
```

- [ ] **Step 2: Verify the build passes**

```bash
npm run build
```
Expected: build completes with no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.js
git commit -m "refactor: convert Contact to functional component"
```

---

### Task 4: Convert `Exp.js`

**Files:**
- Modify: `src/components/Exp.js`

- [ ] **Step 1: Replace the file contents**

```js
import React from 'react';
import '../../css/exp.css';

const PROFESSIONAL = [
    {
        company: 'Apollo GraphQL',
        dates: '2025 – Present',
        current: true,
        description: 'Building developer tooling and platform features for the Apollo GraphQL ecosystem.',
    },
    {
        company: 'OfferUp',
        dates: 'April 2020 – December 2024',
        description: 'Various backend Spring microservices for importing millions of jobs and property rentals, handling searching, and direct job posts. Internal administration web application for use by customer service, sales, and other engineers.',
    },
    {
        company: 'Northrop Grumman',
        dates: 'Sep 2015 – March 2020',
        description: 'Wideband Remote Monitoring Sensor (WRMS) application — a desktop and web application for monitoring satellite data and alerting on anomalies.',
    },
    {
        company: 'Microsoft',
        dates: 'June 2013 – Sep 2015',
        description: 'Windows Phone Companion Application for Windows 8. Windows Phone Podcast Application. Microsoft Maps platform components for Windows 10 and Windows Phone.',
    },
];

const PROJECTS = [
    {
        name: 'Announcord',
        url: 'https://github.com/alocay/announcord',
        dates: '2018 – 2023',
        description: 'Discord bot that announces users entering and exiting voice channels using Amazon Polly TTS with customizable greetings and voice options.',
    },
    {
        name: 'React Fuzzy / FuzzyJS',
        url: 'https://alocay.github.io/react-image-fuzzy',
        dates: '2014 – 2018',
        description: 'FuzzyJS is an image filter/processing JavaScript library. React Fuzzy is a React component wrapper around it.',
    },
    {
        name: 'Potential Fields / Flies',
        url: null,
        dates: '2014',
        description: 'Potential fields visualization and boids flock algorithm visualization, both built with paper.js.',
    },
    {
        name: 'Escape',
        url: 'https://alocay.github.io/escape-minigame/',
        dates: '2014',
        description: 'A mini-game exploring masking and shadows using paper.js.',
    },
];

function Exp() {
    return (
        <div className="exp">
            <div className="exp__column">
                <div className="exp__col-label">Professional</div>
                {PROFESSIONAL.map((entry) => (
                    <div className="exp__entry" key={entry.company}>
                        <div className="exp__entry-header">
                            <span className="exp__company">{entry.company}</span>
                            {entry.current && <span className="exp__current-badge">Current</span>}
                        </div>
                        <div className="exp__dates">{entry.dates}</div>
                        <p className="exp__description">{entry.description}</p>
                    </div>
                ))}
            </div>
            <div className="exp__column">
                <div className="exp__col-label">Projects</div>
                {PROJECTS.map((project) => (
                    <div className="exp__entry" key={project.name}>
                        <div className="exp__project-company">
                            {project.url
                                ? <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
                                : project.name}
                        </div>
                        <div className="exp__dates">{project.dates}</div>
                        <p className="exp__description">{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Exp;
```

- [ ] **Step 2: Verify the build passes**

```bash
npm run build
```
Expected: build completes with no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/Exp.js
git commit -m "refactor: convert Exp to functional component"
```

---

### Task 5: Convert `LightBox.js`

**Files:**
- Modify: `src/components/Gallery/LightBox.js`

- [ ] **Step 1: Replace the file contents**

Note: the stray `FadeInImage.defaultPropTypes` assignment at the bottom of the original is a copy-paste artifact with no effect — it is removed here.

```js
import React from 'react';
import PropTypes from 'prop-types';
import FadeInImage from './FadeInImage.js';

function LightBox({ src, preloadSrc, caption, width, height, offsetHeight, onClose }) {
    const onLightBoxClicked = (e) => {
        e.stopPropagation();
        onClose();
    };

    return (
        <div className="light-box" onClick={onLightBoxClicked}>
            <div className="light-box-image">
                <FadeInImage
                    src={src}
                    preloadSrc={preloadSrc}
                    caption={caption}
                    width={width}
                    height={height}
                    offsetHeight={offsetHeight}
                />
            </div>
        </div>
    );
}

LightBox.propTypes = {
    src: PropTypes.string.isRequired,
    preloadSrc: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    offsetHeight: PropTypes.bool,
    caption: PropTypes.string,
};

export default LightBox;
```

- [ ] **Step 2: Verify the build passes**

```bash
npm run build
```
Expected: build completes with no errors

- [ ] **Step 3: Manual verification**

Run `npm start`, navigate to `/art`, click an image to open the lightbox, and click to close it. Confirm it opens and closes correctly with no console errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Gallery/LightBox.js
git commit -m "refactor: convert LightBox to functional component"
```
