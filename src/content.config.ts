import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { load as loadYaml } from 'js-yaml';

/**
 * Pliki YAML w formacie { items: [...] } (wygodne do edycji w panelu /admin).
 * Pozycja bez `id` dostaje identyfikator z gatunku, daty i numeru (np. z panelu /admin).
 */
const itemsParser = (text: string) =>
  (((loadYaml(text) as { items?: unknown[] })?.items ?? []) as Record<string, unknown>[]).map((it, i) => {
    if (it.id) return it;
    const date = it.date instanceof Date ? it.date.toISOString().slice(0, 10) : String(it.date ?? '');
    return { ...it, id: [it.species ?? it.latin ?? 'item', date, i + 1].filter(Boolean).join('-').toString().toLowerCase().replace(/[^a-z0-9-]+/g, '-') };
  });

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
    /** Taksonomia: podrodzina, plemię, synonimy, nazwy handlowe, link do Cockroach Species File. */
    taxonomy: z
      .object({
        subfamily: z.string().optional(),
        tribe: z.string().optional(),
        synonyms: z.array(z.string()).default([]),
        tradeNames: z.array(z.string()).default([]),
        csf: z.string().url().optional(),
      })
      .optional(),
    /** Jak rozpoznać płeć – dorosłe i (jeśli się da) nimfy. Zdjęcia: galeria z stage: male / female. */
    sexing: z.object({ adults: t, nymphs: t.optional() }).optional(),
    /** Stadia rozwoju – jak wyglądają nimfy, ile wylinek itp. */
    stages: t.optional(),
    /** Typowe problemy w hodowli. */
    problems: z.array(t).default([]),
    /** Ważna uwaga lub ciekawostka (np. o pochodzeniu hodowlanych linii). */
    remark: t.optional(),
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

/**
 * Poradniki: src/content/guides/pl/<poradnik>.md i en/<poradnik>.md (ta sama nazwa pliku = tłumaczenie).
 * order – kolejność na liście (mniejsza liczba wyżej).
 */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(100),
    level: z.enum(['start', 'basic', 'advanced']).default('start'),
    minutes: z.number().optional(),
    updated: z.coerce.date(),
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
    /** Co jest w paczce: nymph (nimfy), mix (nimfy i imago) albo adult (imago). Każdy gatunek ma jeden wariant. */
    stage: z.enum(['nymph', 'mix', 'adult']),
    /** Cena (zł) za paczkę 10 szt. */
    price: z.number().positive(),
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
    /** co pokazuje zdjęcie: stadium lub płeć (zdjęcia male/female trafiają do sekcji „Jak rozpoznać płeć”) */
    stage: z.enum(['nymph', 'subadult', 'adult', 'male', 'female', 'ootheca']).optional(),
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

export const collections = { species, speciesNotes, blog, guides, pricelist, gallery, observations };
