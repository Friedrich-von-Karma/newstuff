// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://blattodea.pl',
  trailingSlash: 'ignore',
  // Strony zostają statyczne; tylko src/pages/api/* (logowanie do panelu /admin) działają jako funkcje Vercel.
  adapter: vercel(),
  // MapLibre (tło map) ma ok. 1 MB, ale ładuje się tylko na stronach z mapą
  vite: { build: { chunkSizeWarningLimit: 1200 } },
  scopedStyleStrategy: 'class',
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL', en: 'en-GB' } },
    }),
  ],
});
