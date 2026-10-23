import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { load as loadYaml } from 'js-yaml';

/** Pliki YAML w formacie { items: [...] } (wygodne do edycji w panelu /admin). */
const itemsParser = (text: string) => ((loadYaml(text) as { items?: unknown[] })?.items ?? []) as Record<string, unknown>[];

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

/** Cennik – jeden plik src/data/pricelist.yaml. Każda pozycja to paczka 10 sztuk. */
const pricelist = defineCollection({
  loader: file('./src/data/pricelist.yaml', { parser: itemsParser }),
  schema: z.object({
    latin: z.string(),
    /** Nazwa pliku profilu (bez .yaml), jeśli gatunek ma profil. */
    profile: z.string().optional(),
    status: z.enum(['available', 'low', 'out', 'soon']),
    note: t.optional(),
    /** Cena (zł) za paczkę 10 szt. w danym wariancie. Wariant pominięty = niedostępny. */
    packs: z
      .object({
        nymph: z.number().positive().nullish(),
        adult: z.number().positive().nullish(),
        mix: z.number().positive().nullish(),
      })
      .refine((p) => Object.values(p).some((v) => typeof v === 'number'), 'Podaj cenę co najmniej jednego wariantu'),
    sample: z.boolean().default(false),
  }),
});

/**
 * Galeria „Z mojej hodowli” – jeden plik YAML na zdjęcie lub film w src/content/gallery/.
 * Pliki zdjęć/filmów: public/images/hodowla/… (albo film z YouTube przez `youtube`).
 */
const gallery = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/gallery' }),
  schema: z.object({
    title: t,
    kind: z.enum(['photo', 'video']),
    /** ścieżka do pliku w public/, np. /images/hodowla/dubia-nimfy.jpg lub .mp4 */
    src: z.string().optional(),
    /** identyfikator filmu z YouTube (zamiast src) */
    youtube: z.string().optional(),
    /** miniatura filmu */
    poster: z.string().optional(),
    caption: t.optional(),
    /** identyfikator gatunku (nazwa pliku profilu lub id z klucza) */
    species: z.string().optional(),
    date: z.coerce.date(),
    sample: z.boolean().default(false),
  }),
});

/** Zweryfikowane obserwacje karaczanów w Polsce – src/data/observations.yaml (lista items). */
const observations = defineCollection({
  loader: file('./src/data/observations.yaml', { parser: itemsParser }),
  schema: z.object({
    /** identyfikator gatunku z klucza (src/data/key.ts), np. ectobius-sylvestris */
    species: z.string(),
    lat: z.number(),
    lng: z.number(),
    place: z.string(),
    date: z.coerce.date(),
    /** kto przysłał (opcjonalnie, za zgodą) */
    observer: z.string().optional(),
    note: z.string().optional(),
    /** zdjęcie w public/, np. /images/obserwacje/2026-07-kampinos.jpg */
    photo: z.string().optional(),
  }),
});

export const collections = { species, speciesNotes, blog, pricelist, gallery, observations };
