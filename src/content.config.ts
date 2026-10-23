import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/** Tekst w dwóch językach. */
const t = z.object({ pl: z.string(), en: z.string() });

const image = z.object({
  src: z.string(),
  alt: t,
  caption: t.optional(),
});

/**
 * Profile hodowlane – jeden plik YAML na gatunek w src/content/species/.
 * Nazwa pliku = adres strony (np. blaptica-dubia.yaml → /gatunki/blaptica-dubia).
 */
const species = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/species' }),
  schema: z.object({
    latin: z.string(),
    author: z.string().optional(),
    commonName: t.optional(),
    family: z.string(),
    origin: t,
    size: t,
    temperature: z.string(),
    humidity: t,
    substrate: t,
    food: t,
    reproduction: t,
    development: t,
    difficulty: z.number().int().min(1).max(3),
    climbs: z.boolean(),
    flies: z.boolean(),
    gallery: z.array(image).default([]),
    /** Dane przykładowe – oznaczane na stronie jako do podmiany. */
    sample: z.boolean().default(false),
  }),
});

/**
 * Opcjonalny opis własnymi słowami: src/content/species-notes/pl/<gatunek>.md
 * (i tak samo en/). Jeśli pliku nie ma – profil pokazuje tylko kartę i galerię.
 */
const speciesNotes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/species-notes' }),
  schema: z.object({}),
});

/** Blog: src/content/blog/pl/<wpis>.md i src/content/blog/en/<wpis>.md (ta sama nazwa pliku = tłumaczenie). */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    draft: z.boolean().default(false),
    sample: z.boolean().default(false),
  }),
});

const stageKeys = ['L1', 'L1-L2', 'L2-L3', 'L3-L4', 'nymph', 'subadult', 'adult', 'male', 'female', 'pair', 'colony'] as const;

/** Cennik – jeden plik src/data/pricelist.yaml. */
const pricelist = defineCollection({
  loader: file('./src/data/pricelist.yaml'),
  schema: z.object({
    latin: z.string(),
    /** Nazwa pliku profilu (bez .yaml), jeśli gatunek ma profil. */
    profile: z.string().optional(),
    status: z.enum(['available', 'low', 'out', 'soon']),
    note: t.optional(),
    prices: z.array(
      z.object({
        stage: z.enum(stageKeys),
        price: z.number(),
        /** Za ile sztuk jest cena (domyślnie 1). */
        per: z.number().int().positive().default(1),
      }),
    ),
    sample: z.boolean().default(false),
  }),
});

export const collections = { species, speciesNotes, blog, pricelist };
export type StageKey = (typeof stageKeys)[number];
