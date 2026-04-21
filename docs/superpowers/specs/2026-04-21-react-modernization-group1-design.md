---
name: React Modernization — Group 1 (Simple Pages)
description: Design spec for converting render-only class components to functional components
type: project
---

# React Modernization — Group 1: Simple Pages

## Goal

Convert render-only class components to modern React functional components. No behavior, prop contracts, CSS, or routing changes.

## Scope

**In scope:**
- `src/components/About.js`
- `src/components/Contact.js`
- `src/components/Exp.js`
- `src/components/Gallery/LightBox.js`
- Delete `src/components/FlipLabel/FlipGallery.js` (broken, unused)
- Delete `src/components/Gallery/ImageGallery.js` (empty, unused)

**Out of scope:** Group 2 (Gallery system) and Group 3 (FlipLabel system) — separate sessions.

## Conversion Rules

All four components are render-only (no `state`, no lifecycle methods). The conversion is mechanical for each:

1. Replace `class Foo extends Component { render() { return (...) } }` with `function Foo(props) { return (...) }`
2. Remove `constructor` (none of these have one, except implicitly)
3. Convert instance methods to `const` functions inside the function body (only applies to `LightBox.onLightBoxClicked`)
4. Drop the `Component` named import; keep `import React from 'react'` (required for JSX transpilation in this webpack/babel setup)
5. Remove unused imports: `classnames` is imported in several files but never referenced — drop it
6. PropTypes declarations stay exactly as-is (bottom of file, unchanged)

## Per-Component Notes

**About.js** — Straightforward. No methods, no state. Pure render conversion.

**Contact.js** — Straightforward. No methods, no state. Pure render conversion.

**Exp.js** — Straightforward. No methods, no state. Pure render conversion.

**LightBox.js** — One instance method `onLightBoxClicked` that calls `e.stopPropagation()` and `props.onClose()`. Becomes a `const` inside the function. Also has a stray `FadeInImage.defaultPropTypes` assignment at the bottom (copy-paste artifact from FadeInImage) — remove it, it has no effect here.

## Deletions

`FlipGallery.js` — References `this.state.labelChars` which is never initialized; component is not imported anywhere in the codebase. Delete.

`ImageGallery.js` — Empty render body, not imported anywhere. Delete.

## Commit Strategy

Two commits:
1. `chore: delete unused FlipGallery and ImageGallery components`
2. `refactor: convert simple page class components to functions (Group 1)`

## Verification

After conversion, run `npm start` and manually verify:
- `/about` renders correctly
- `/contact` renders correctly
- `/exp` renders correctly
- Art page lightbox still opens and closes (exercises LightBox)
- No console errors or warnings about class components
