# AGENTS.md

Guidance for AI coding agents working in this repo. (Not shipped to site visitors.)

## What this is

A single-page **Astro** static marketing site for **GitHub Copilot DevDays**, an evening
event hosted by Knowit Experience in Gothenburg. Design direction: "Knowit Experience meets
GitHub" — dark/terminal aesthetic, JetBrains Mono, animated glassmorphism hero.

## Commands

```bash
npm install
npm run dev        # local dev server (http://localhost:4321)
npm run build      # production build → ./dist
npm run preview    # serve the built site — ALWAYS Lighthouse-test this, not dev
```

## Where things live

- **All content is data** in [`src/config/site.ts`](src/config/site.ts) — dates, agenda,
  speakers, venue, Luma config. Edit values there; avoid hardcoding copy in components.
- Components in `src/components/`, layout in `src/layouts/BaseLayout.astro`, page in
  `src/pages/index.astro`, design tokens in `src/styles/global.css`.

## Conventions

- Content changes go in `site.ts`, not in component markup.
- Keep both light and dark themes working (`data-theme` on `<html>`); colours come from CSS
  custom properties in `global.css` — check contrast (WCAG AA) when changing accent tokens.
- Use free, no-API-key third parties (Google Maps `output=embed`, Luma embed) — no paid keys.
- Prefer `rel="noopener"` on every `target="_blank"`.

## ⚠️ Gotchas (don't regress these — they keep Lighthouse at 100)

1. **Scroll-snap is deferred.** `scroll-snap-type` on the root scroller suppresses Chrome's
   LCP and breaks the Performance score. It's applied via `html.snap-ready`, added by an
   inline script on first user interaction (see `BaseLayout.astro`). Do **not** put
   `scroll-snap-type` directly on `html`/`:root` in CSS.
2. **Luma is click-to-load.** The Luma iframe sets third-party cookies (fails Best
   Practices). It lives in a `<template>` in `Register.astro` and is injected on click.
   Don't render the Luma iframe eagerly.
3. **CSS is inlined** (`build.inlineStylesheets: 'always'`) to avoid render-blocking.
4. Test Lighthouse against `npm run preview` (production build), never the dev server.

## Before finishing

- `npm run build` must pass.
- If you touched layout/perf, re-check Lighthouse (Performance, Accessibility, Best
  Practices, SEO should all stay 100 on mobile and desktop).
- Outstanding content/launch tasks are tracked in [`docs/todo.md`](docs/todo.md).
