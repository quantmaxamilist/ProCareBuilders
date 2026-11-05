import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The old Wix site had two URLs (/ and /projects, per its sitemap and the Wayback index).
// Both keep their exact paths, so no redirects are needed. /home is a common Wix alias.
export const oldUrls = {
  '/home': '/',
};

export default defineConfig({
  site: 'https://www.procarebuilders.co.uk',
  trailingSlash: 'ignore',
  build: { format: 'file' },
  scopedStyleStrategy: 'class',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  redirects: oldUrls,
  integrations: [
    sitemap({
      filter: (p) => !p.includes('/404') && !Object.keys(oldUrls).some((u) => p.replace(/\/$/, '').endsWith(u)),
    }),
  ],
  server: { port: 4348 },
  devToolbar: { enabled: false },
  vite: { optimizeDeps: { include: ['gsap', 'gsap/ScrollTrigger', 'lenis', 'three'] } },
});
