import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { load as loadYaml } from 'js-yaml';
import pricelistRaw from '../data/pricelist.yaml?raw';
import { site } from '../data/site';

export function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ł/g, 'l')
    .replace(/Ł/g, 'L')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function formatPrice(n: number, lang: Lang) {
  return new Intl.NumberFormat({ pl: 'pl-PL', en: 'en-GB', de: 'de-DE' }[lang], {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n);
}

/** Orientacyjna cena w euro (wersje obcojęzyczne); kurs w src/data/site.ts. */
export function formatEur(pln: number, lang: Lang) {
  const eur = pln / site.eurRate;
  return '≈ ' + new Intl.NumberFormat(lang === 'pl' ? 'pl-PL' : lang === 'en' ? 'en-GB' : 'de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: eur < 20 ? 2 : 0 }).format(eur);
}

export async function getSpecies() {
  const all = await getCollection('species');
  return all.sort((a, b) => a.data.latin.localeCompare(b.data.latin));
}

export async function getPricelist() {
  const items = await getCollection('pricelist');
  const order = { available: 0, low: 1, soon: 2, out: 3 } as const;
  return items.sort(
    (a, b) => order[a.data.status] - order[b.data.status] || a.data.latin.localeCompare(b.data.latin),
  );
}

/** Pozycja cennika powiązana z profilem (jeśli gatunek jest w cenniku). */
export async function getPriceForProfile(profileId: string) {
  const items = await getCollection('pricelist');
  return items.find((i) => i.data.profile === profileId);
}

export async function getSpeciesNote(id: string, lang: Lang) {
  const notes = await getCollection('speciesNotes');
  return notes.find((n) => n.id === `${lang}/${id}`);
}

export type Post = CollectionEntry<'blog'>;

export function postSlug(p: Post) {
  return p.id.split('/').slice(1).join('/');
}

/** Wpisy w danym języku; w wersji niemieckiej brakujące wpisy uzupełniane są angielskimi. */
export async function getPosts(lang: Lang) {
  const all = await getCollection('blog', (p) => import.meta.env.DEV || !p.data.draft);
  const own = all.filter((p) => p.id.startsWith(`${lang}/`));
  const fallback = lang === 'de' ? all.filter((p) => p.id.startsWith('en/') && !own.some((o) => postSlug(o) === postSlug(p))) : [];
  return [...own, ...fallback].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Język, w którym naprawdę napisany jest wpis/poradnik (id zaczyna się od „pl/”, „en/”…). */
export function entryLang(e: { id: string }): Lang {
  return e.id.split('/')[0] as Lang;
}

export async function hasTranslation(p: Post, target: Lang) {
  const posts = await getPosts(target);
  return posts.some((o) => postSlug(o) === postSlug(p));
}

/** Warianty paczek po 10 szt. Każdy gatunek w cenniku ma dokładnie jeden. */
export const packKinds = ['nymph', 'mix', 'adult'] as const;
export type PackKind = (typeof packKinds)[number];
export const PACK_SIZE = 10;

/** Data ostatniej aktualizacji cennika (pole `updated` w src/data/pricelist.yaml), RRRR-MM-DD. */
export function getPricelistUpdated(): string {
  const d = (loadYaml(pricelistRaw) as { updated?: string | Date })?.updated;
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  return String(d ?? '');
}

/** Zweryfikowane obserwacje do mapy. */
export async function getObservations() {
  const all = await getCollection('observations');
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Galeria „Z mojej hodowli” (najnowsze najpierw), opcjonalnie tylko dla jednego gatunku. */
export async function getGallery(species?: string) {
  const all = await getCollection('gallery', (g) => !species || g.data.species === species);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export type Guide = CollectionEntry<'guides'>;

/** Poradniki w danym języku, w kolejności `order`. */
export async function getGuides(lang: Lang) {
  const all = await getCollection('guides');
  const own = all.filter((g) => g.id.startsWith(`${lang}/`));
  const fallback = lang === 'de' ? all.filter((g) => g.id.startsWith('en/') && !own.some((o) => guideSlug(o) === guideSlug(g))) : [];
  return [...own, ...fallback].sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export function guideSlug(g: Guide) {
  return g.id.split('/').slice(1).join('/');
}

/** Karaczany Polski: gatunek z klucza + szczegóły (src/data/wild.ts). */
export async function getWildSpecies() {
  const { taxa } = await import('../data/key');
  const { wild } = await import('../data/wild');
  return taxa.map((t) => ({ ...t, info: wild[t.id] }));
}
