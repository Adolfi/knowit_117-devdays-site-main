# TODO — GitHub Copilot DevDays site

Working checklist for launching the event site. Most content lives in
[`src/config/site.ts`](../src/config/site.ts) — edit values there, no code changes needed.

## 🔜 Next up (requested 2026-09-03)

Design + content pass based on the [Luma event](https://luma.com/mawlp9c7) and confirmed
speakers. **Implemented 2026-09-03** — Lighthouse still 100/100/100/100 (mobile + desktop).

### Hero background — animated aurora orb
- [x] Replace the 3-blob hero background with a single large **circular aurora orb**
  (soft pink / magenta / purple / orange smoky gradient, per the reference image)
- [x] **Animate** it — colours slowly swirl/drift inside the circle so it feels alive
- [x] Keep it behind the glass veil; GPU transforms only, respect
  `prefers-reduced-motion`, no Lighthouse regression

### Copy hygiene — no loose strings
- [x] Audit every component for hardcoded visitor-facing copy
- [x] Move all copy into [`src/config/site.ts`](../src/config/site.ts) under a `ui`
  block (headings, CTA labels, nav, footer, code-of-conduct) so components only
  reference `site.*`

### Event facts (from Luma)
- [x] **Date: 15 October 2026** (was `TBA — Autumn 2026`)
- [x] **Time: 16:00 – 19:00** — agenda shifted to start 16:00
- [x] Title: "GitHub Copilot Dev Day: Gothenburg" (`site.fullName`)
- [x] Mention **food + drinks**
- [x] Venue coords: 57.7135761, 11.9713363
- [x] Added **Event Code of Conduct** link (footer)

### Drafted copy (from Luma)
- [x] About/intro/highlights reworded from the Luma description

### Speakers + talks (confirmed)
- [x] **Fredrik Skogman — GitHub**: new threats, defences, and AI's impact
- [x] **Victor Svensson — Knowit**: AI and the OWASP Top 10
- [x] **Andreas Heige — Knowit**: taming the agentic harness with Copilot
- [x] Talks mapped into the agenda + shown on speaker cards

### ❓ Still open for the organiser (assumptions made — easy to change in `site.ts`)
- [ ] Talk **order / exact times** — assumed ~30 min each: 16:30 Andreas, 17:00 Victor,
  17:30 Fredrik (GitHub headlining last). Confirm?
- [ ] Real **speaker bios / photos / links** (currently short placeholder bios + initials avatars)
- [ ] Final **talk titles** (I drafted catchy ones from your topic summaries)
- [ ] Keep the light/dark toggle? (kept — orb works in both)

## ✅ Done

- [x] Astro single-page site scaffold + all sections (Hero, About, Agenda, Speakers, Venue, Register, Footer)
- [x] "Knowit Experience meets GitHub" dark/terminal design (JetBrains Mono)
- [x] Animated glassmorphism hero + full-height snap-scroll sections
- [x] Light/dark theme toggle (no-flash, remembers choice)
- [x] Evening schedule (17:00–19:00), 3 speakers (one from GitHub)
- [x] Venue address + free Google Maps embed (Vikingsgatan 3)
- [x] Luma registration (click-to-load) + direct link
- [x] Floating back-to-top button, register CTAs in every section
- [x] Perfect Lighthouse (100 Performance / Accessibility / Best Practices / SEO, mobile + desktop)
- [x] SEO: canonical, Open Graph, JSON-LD Event, sitemap, robots.txt

## 📝 Content to finalise (placeholders)

- [ ] **Contact email** — currently `devdays@example.com` (`site.contact.email`)
- [ ] **Verify the Luma event URL/slug** is the final one (`site.luma`)
- [x] ~~Event date~~ — confirmed 15 Oct 2026 (see "Next up" above)
- [x] ~~Speaker names~~ — confirmed (see "Next up" above)
- [x] ~~Venue coordinates~~ — confirmed from Luma

## 🎨 Branding

- [ ] Swap `public/favicon.svg` for a branded icon
- [ ] Set `--accent` / `--accent-2` in [`src/styles/global.css`](../src/styles/global.css) to official Knowit brand colours
- [ ] Add an Open Graph share image and reference it in [`BaseLayout.astro`](../src/layouts/BaseLayout.astro) (`og:image`)

## 🚀 Deployment

- [ ] Pick a host (GitHub Pages / Vercel / Netlify)
- [ ] Set the real `site` URL in [`astro.config.mjs`](../astro.config.mjs)
- [ ] Update the `Sitemap:` line in [`public/robots.txt`](../public/robots.txt) to the final domain
- [ ] Re-run Lighthouse against the deployed URL to confirm 100s hold

## 🔍 Verify before launch

```bash
npm run build && npm run preview   # run Lighthouse against http://localhost:4321/
```

- [ ] Test registration flow end-to-end (facade → Luma form loads → sign up works)
- [ ] Check map + theme toggle on a real mobile device
- [ ] Proofread all copy
