import { createHash } from 'node:crypto';

/**
 * Zdjęcia z Wikimedia Commons (wolne licencje). Wyświetlane bezpośrednio z serwerów Wikimedia,
 * zawsze z podpisem: autor, licencja, link do strony pliku.
 * Klucz = identyfikator gatunku (jak w kluczu / nazwa pliku profilu).
 */
export interface Photo {
  /** nazwa pliku na Commons, bez prefiksu „File:” */
  file: string;
  author: string;
  license: string;
  licenseUrl: string;
  subject?: { pl: string; en: string };
}

export const photos: Record<string, Photo> = {
  'ectobius-sylvestris': {
    file: 'ZM3 03840 c Ectobius sylvestris w oo.jpg',
    author: 'Christian Schulz (Zampel)',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    subject: { pl: 'samica z ooteką', en: 'female with ootheca' },
  },
  'ectobius-lapponicus': {
    file: 'Dusky Cockroach (Ectobius lapponicus) - Bærum, Norway 2021-07-03.jpg',
    author: 'Ryan Hodnett',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    subject: { pl: 'osobnik dorosły, Norwegia', en: 'adult, Norway' },
  },
  'ectobius-pallidus': {
    file: 'Grenchen - Bleke kakkerlak (Ectobius pallidus) on wall.jpg',
    author: 'Rudolphous',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    subject: { pl: 'osobnik dorosły na murze', en: 'adult on a wall' },
  },
  'ectobius-vittiventris': {
    file: 'Ectobius vittiventris 008.jpg',
    author: 'Amada44',
    license: 'CC BY 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    subject: { pl: 'osobnik dorosły', en: 'adult' },
  },
  'blattella-germanica': {
    file: 'Таракан-прусак (вид сверху).jpg',
    author: 'George Shuklin',
    license: 'domena publiczna',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    subject: { pl: 'osobnik dorosły, widok z góry', en: 'adult, dorsal view' },
  },
  'supella-longipalpa': {
    file: 'Supella longipalpa cdc.jpg',
    author: 'CDC Public Health Image Library',
    license: 'domena publiczna',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    subject: { pl: 'samiec i samica', en: 'male and female' },
  },
  'blatta-orientalis': {
    file: 'Blatta orientalis male from Botevgrad, Bulgaria 01.jpg',
    author: 'Dimitar Boevski',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    subject: { pl: 'samiec, Bułgaria', en: 'male, Bulgaria' },
  },
  'shelfordella-lateralis': {
    file: 'Blatta lateralis.jpg',
    author: 'Happy1892',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    subject: { pl: 'samica składająca ootekę', en: 'female laying an ootheca' },
  },
  'periplaneta-americana': {
    file: 'Periplaneta americana - American cockroach (25859665686).jpg',
    author: 'Alex Wild / Insects Unlocked, University of Texas at Austin',
    license: 'CC0 1.0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    subject: { pl: 'osobnik dorosły', en: 'adult' },
  },
  'periplaneta-australasiae': {
    file: 'Periplaneta australasiae.jpg',
    author: 'Charles Brewer',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    subject: { pl: 'osobnik dorosły', en: 'adult' },
  },
  'pycnoscelus-surinamensis': {
    file: 'Pycnoscelus surinamensis nymph.png',
    author: 'Piterkeo',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    subject: { pl: 'nimfa', en: 'nymph' },
  },
  'oxyhaloa-deusta': {
    file: 'Wild Cockroach (Oxyhaloa deusta) (15862162414).jpg',
    author: 'Bernard Dupont',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    subject: { pl: 'dziki osobnik, Park Narodowy Krugera, RPA', en: 'wild individual, Kruger National Park, South Africa' },
  },
  'macropanesthia-rhinoceros': {
    file: 'MP - Macropanesthia rhinoceros 2.jpg',
    author: 'Mark Pellegrini (Raul654)',
    license: 'CC BY-SA 2.5',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.5/',
    subject: { pl: 'okaz w Audubon Insectarium, Nowy Orlean', en: 'specimen at the Audubon Insectarium, New Orleans' },
  },
  'archimandrita-marmorata': {
    file: '16 Archimandrite cockroach (Archimandrita tesselata).jpg',
    author: 'Helmmet',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    subject: { pl: 'Archimandrita „tesselata” w insektarium', en: 'Archimandrita “tesselata” in an insectarium' },
  },
};

/** Adres miniatury z serwera Wikimedia (standardowe szerokości: 330, 500, 960, 1280). */
export function photoSrc(p: Photo, width: 330 | 500 | 960 | 1280 = 960) {
  const name = p.file.replace(/ /g, '_');
  const md5 = createHash('md5').update(name).digest('hex');
  const enc = encodeURIComponent(name);
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${md5[0]}/${md5.slice(0, 2)}/${enc}/${width}px-${enc}`;
}

export function photoPage(p: Photo) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(p.file.replace(/ /g, '_'))}`;
}
