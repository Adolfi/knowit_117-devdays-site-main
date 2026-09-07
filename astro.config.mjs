// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // The canonical production URL. Update this to your real domain when you deploy —
  // it drives the canonical link, Open Graph URL, sitemap and robots.txt.
  site: 'https://devdaygbg.se',
  integrations: [sitemap()],
  build: {
    // Inline all CSS into the HTML so there is no render-blocking stylesheet
    // request. The site is a single page, so this is a net win for load time.
    inlineStylesheets: 'always',
  },
});
