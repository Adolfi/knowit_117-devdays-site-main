# GitHub Copilot DevDays — Marketing Site

An informal marketing site for **GitHub Copilot DevDays**, hosted by
**Knowit Experience** in **Gothenburg**. Built with [Astro](https://astro.build/) as a
fast, static single-page site. Registration is handled by an embedded
[Luma](https://lu.ma) button.

> Design direction: *Knowit Experience meets GitHub* — a dark, developer-friendly theme
> with a vivid Knowit accent.

## Quick start

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:4321
npm run build     # build the static site into ./dist
npm run preview   # preview the production build locally
```

Requires Node.js 18+ (developed on Node 24).

## Editing content

All copy and event data live in **one file**: [`src/config/site.ts`](src/config/site.ts).
Everything there is a placeholder — edit the values to update the site:

- **Key facts** — `date`, `time`, `price`, `city`
- **Intro & highlights** — the "what to expect" cards
- **`agenda`** — the schedule rows
- **`speakers`** — speaker cards (avatars are auto-generated from initials)
- **`venue`** — location details
- **`contact.email`** — used in the footer and "coming soon" message

No component edits are needed for normal content changes.

## Hooking up registration (Luma)

The Register section **embeds the Luma registration form directly** on the page, and also
links out to the full event page. It's already wired to the event
<https://luma.com/mawlp9c7>.

To point it at a different event, grab the slug from its public URL
(`https://luma.com/<slug>`) and set it in `src/config/site.ts`:

```ts
luma: {
  slug: 'mawlp9c7',                       // the id in the public event URL
  publicUrl: 'https://luma.com/mawlp9c7', // used for the "open on Luma" link
},
```

The site embeds `https://luma.com/embed/event/<slug>/simple` in an iframe (no API key
needed). Clear `slug` to fall back to a "Registration opens soon" message.

## Project structure

```
src/
├── config/site.ts          # ← all content + Luma config (edit this)
├── layouts/BaseLayout.astro # <head>, meta/OG tags, global styles
├── styles/global.css        # design tokens (Knowit × GitHub) + base styles
├── components/              # Header, Hero, About, Agenda, Speakers, Venue, Register, Footer
└── pages/index.astro        # the single landing page
public/
└── favicon.svg
```

## Rebranding

Colors, fonts, and spacing are CSS custom properties at the top of
[`src/styles/global.css`](src/styles/global.css). Change `--accent` / `--accent-2` to match
official Knowit brand colors, and swap `public/favicon.svg` for a branded icon.

## Deployment

The site is fully static (output in `./dist`), so it deploys anywhere — GitHub Pages,
Vercel, Netlify, or any static host. Deployment target is not yet decided; when you pick
one, set the `site` URL in [`astro.config.mjs`](astro.config.mjs). That value drives the
canonical link, Open Graph URL, the generated `sitemap-*.xml`, and `public/robots.txt`
(update the `Sitemap:` line there to match your final domain).

## SEO & Lighthouse

The site is tuned for a perfect Lighthouse score — 100 in Performance, Accessibility,
Best Practices, and SEO on both mobile and desktop, with no scored failures. Notable
choices that keep it there:

- **Scroll snapping activates on first user interaction** (see the inline script in
  [`BaseLayout.astro`](src/layouts/BaseLayout.astro)). Enabling `scroll-snap-type` on the
  root scroller at load time suppresses Chrome's Largest Contentful Paint measurement, so
  it is deferred until the visitor actually scrolls.
- **The Luma registration form is click-to-load** ([`Register.astro`](src/components/Register.astro)).
  The embed sets third-party cookies, so it only loads when the visitor asks for it — the
  page itself makes zero third-party requests at load.
- **CSS is inlined** (`build.inlineStylesheets: 'always'`) to remove render-blocking
  requests, and JSON-LD `Event` structured data plus canonical/OG tags live in the layout.

Verify with a production preview (never the dev server):

```bash
npm run build && npm run preview   # then run Lighthouse against http://localhost:4321/
```

The embedded Google Map tiles trigger an informational (non-scored) "cache TTL" note from
Google's own servers — that's inherent to the free Maps embed and does not affect the score.

---

*Not affiliated with GitHub, Inc. "GitHub" and "Copilot" are trademarks of their respective
owners. Logos are intentionally not bundled — add official brand assets per each brand's
guidelines.*
