// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blattodea.pl',
  trailingSlash: 'ignore',
  scopedStyleStrategy: 'class',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'pl', locales: { pl: 'pl-PL', en: 'en-GB' } },
    }),
  ],
});
