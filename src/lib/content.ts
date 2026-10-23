import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

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
  return new Intl.NumberFormat(lang === 'pl' ? 'pl-PL' : 'en-GB', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n);
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

export async function getPosts(lang: Lang) {
  const posts = await getCollection(
    'blog',
    (p) => p.id.startsWith(`${lang}/`) && (import.meta.env.DEV || !p.data.draft),
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function hasTranslation(p: Post, target: Lang) {
  const posts = await getPosts(target);
  return posts.some((o) => postSlug(o) === postSlug(p));
}
