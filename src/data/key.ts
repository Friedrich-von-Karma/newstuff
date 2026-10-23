/**
 * KLUCZ DO KARACZANÓW POLSKI – dane (wersja robocza, do weryfikacji).
 *
 * characters – cechy, które użytkownik może zaznaczyć (każda ma kilka stanów).
 * taxa       – gatunki; w `traits` lista stanów, jakie dany gatunek może mieć.
 *              Gdy cechy brak w `traits` (np. samiec nieznany), gatunek nie jest
 *              wykluczany po tej cesze.
 */

type T = { pl: string; en: string };

export interface KeyCharacter {
  id: string;
  name: T;
  help?: T;
  states: { id: string; label: T }[];
}

export interface KeyTaxon {
  id: string;
  latin: string;
  author: string;
  name?: T;
  status: 'native' | 'synanthropic' | 'introduced';
  /** Dane lub występowanie w Polsce wymagają potwierdzenia. */
  verify?: boolean;
  length: string;
  habitat: T;
  note: T;
  traits: Record<string, string[]>;
  /** Nazwa pliku profilu hodowlanego, jeśli istnieje. */
  profile?: string;
}

export const characters: KeyCharacter[] = [
  {
    id: 'length',
    name: { pl: 'Długość ciała dorosłego', en: 'Adult body length' },
    help: { pl: 'Od głowy do końca odwłoka lub pokryw, bez czułków.', en: 'From head to tip of abdomen or wings, without antennae.' },
    states: [
      { id: 'lt10', label: { pl: 'do 10 mm', en: 'up to 10 mm' } },
      { id: '10-15', label: { pl: '10–15 mm', en: '10–15 mm' } },
      { id: '15-25', label: { pl: '15–25 mm', en: '15–25 mm' } },
      { id: 'gt25', label: { pl: 'ponad 25 mm', en: 'over 25 mm' } },
    ],
  },
  {
    id: 'habitat',
    name: { pl: 'Gdzie znaleziony', en: 'Where found' },
    states: [
      { id: 'outdoors', label: { pl: 'w terenie – las, wrzosowisko, murawa', en: 'outdoors – woodland, heath, grassland' } },
      { id: 'buildings', label: { pl: 'w budynku – kuchnia, piwnica, kanały', en: 'indoors – kitchen, basement, ducts' } },
      { id: 'greenhouse', label: { pl: 'palmiarnia, szklarnia, zoo', en: 'glasshouse, palm house, zoo' } },
    ],
  },
  {
    id: 'pronotum',
    name: { pl: 'Rysunek przedplecza', en: 'Pronotum pattern' },
    help: { pl: 'Przedplecze to tarczka za głową, przykrywająca ją od góry.', en: 'The pronotum is the shield behind the head that covers it from above.' },
    states: [
      { id: 'uniform', label: { pl: 'jednolite', en: 'uniform' } },
      { id: 'darkCenter', label: { pl: 'ciemny środek, jasne przezroczyste brzegi', en: 'dark centre, pale translucent edges' } },
      { id: 'twoStripes', label: { pl: 'dwa ciemne podłużne pasy', en: 'two dark longitudinal stripes' } },
      { id: 'paleRing', label: { pl: 'wyraźna żółtawa obwódka wokół ciemnego środka', en: 'distinct yellowish ring around a dark centre' } },
    ],
  },
  {
    id: 'colour',
    name: { pl: 'Ogólne ubarwienie', en: 'Overall colour' },
    states: [
      { id: 'pale', label: { pl: 'jasne – słomkowe, żółtawobrązowe', en: 'pale – straw, yellowish-brown' } },
      { id: 'brown', label: { pl: 'rude do średniobrązowego', en: 'reddish to mid-brown' } },
      { id: 'dark', label: { pl: 'ciemnobrązowe do czarnego', en: 'dark brown to black' } },
    ],
  },
  {
    id: 'wingsMale',
    name: { pl: 'Skrzydła samca', en: 'Male wings' },
    help: { pl: 'Samce zwykle mają dłuższe skrzydła i smuklejszy odwłok.', en: 'Males usually have longer wings and a slimmer abdomen.' },
    states: [
      { id: 'full', label: { pl: 'sięgają końca odwłoka lub dalej', en: 'reach the abdomen tip or beyond' } },
      { id: 'short', label: { pl: 'skrócone – część odwłoka odkryta', en: 'shortened – part of abdomen exposed' } },
      { id: 'vestigial', label: { pl: 'szczątkowe płatki lub brak', en: 'small lobes or absent' } },
    ],
  },
  {
    id: 'wingsFemale',
    name: { pl: 'Skrzydła samicy', en: 'Female wings' },
    help: { pl: 'Samice mają szerszy odwłok, często z ooteką (kapsułą z jajami) na końcu.', en: 'Females have a broader abdomen, often carrying an ootheca (egg case) at the tip.' },
    states: [
      { id: 'full', label: { pl: 'sięgają końca odwłoka lub dalej', en: 'reach the abdomen tip or beyond' } },
      { id: 'short', label: { pl: 'skrócone – część odwłoka odkryta', en: 'shortened – part of abdomen exposed' } },
      { id: 'vestigial', label: { pl: 'szczątkowe płatki lub brak', en: 'small lobes or absent' } },
    ],
  },
  {
    id: 'marks',
    name: { pl: 'Znaki szczególne', en: 'Distinctive marks' },
    states: [
      { id: 'none', label: { pl: 'brak wyraźnych znaków', en: 'no distinctive marks' } },
      { id: 'spottedWings', label: { pl: 'jasne pokrywy z drobnymi ciemnymi kropkami', en: 'pale wings with tiny dark dots' } },
      { id: 'yellowShoulder', label: { pl: 'żółta kreska u nasady pokryw', en: 'yellow stripe at the base of the wings' } },
      { id: 'paleBands', label: { pl: 'dwie jasne poprzeczne przepaski', en: 'two pale transverse bands' } },
      { id: 'creamSides', label: { pl: 'kremowe plamy po bokach tułowia (samica)', en: 'cream patches on the sides of the thorax (female)' } },
    ],
  },
];

export const taxa: KeyTaxon[] = [
  {
    id: 'ectobius-sylvestris',
    latin: 'Ectobius sylvestris',
    author: '(Poda, 1761)',
    status: 'native',
    length: '7–11 mm',
    habitat: { pl: 'lasy, zwłaszcza ich skraje i polany; ściółka, krzewy', en: 'woodland, especially edges and clearings; leaf litter, shrubs' },
    note: {
      pl: 'Najpospolitszy leśny karaczan w Polsce. Przedplecze czarne z szerokimi, jasnymi i przezroczystymi brzegami. Samica ma wyraźnie skrócone skrzydła.',
      en: 'The commonest woodland cockroach in Poland. The pronotum is black with broad, pale translucent margins. The female has clearly shortened wings.',
    },
    traits: {
      length: ['lt10', '10-15'],
      habitat: ['outdoors'],
      pronotum: ['darkCenter'],
      colour: ['brown', 'dark'],
      wingsMale: ['full'],
      wingsFemale: ['short'],
      marks: ['none'],
    },
  },
  {
    id: 'ectobius-lapponicus',
    latin: 'Ectobius lapponicus',
    author: '(Linnaeus, 1758)',
    status: 'native',
    length: '7–11 mm',
    habitat: { pl: 'lasy i wrzosowiska, krzewy i niskie gałęzie drzew', en: 'woodland and heath, shrubs and low branches' },
    note: {
      pl: 'Jaśniejszy od E. sylvestris. Samica ma skrzydła prawie tak długie jak samiec. Pewne odróżnienie od pokrewnych gatunków wymaga obejrzenia gruczołu na grzbiecie samca.',
      en: 'Paler than E. sylvestris. The female’s wings are almost as long as the male’s. Reliable separation from related species requires examining the male’s dorsal gland.',
    },
    traits: {
      length: ['lt10', '10-15'],
      habitat: ['outdoors'],
      pronotum: ['darkCenter'],
      colour: ['pale', 'brown'],
      wingsMale: ['full'],
      wingsFemale: ['full', 'short'],
      marks: ['none', 'spottedWings'],
    },
  },
  {
    id: 'ectobius-pallidus',
    latin: 'Ectobius pallidus',
    author: '(Olivier, 1789)',
    status: 'native',
    verify: true,
    length: '6–10 mm',
    habitat: { pl: 'suche, nasłonecznione skraje lasów, murawy, wrzosowiska', en: 'dry, sunny woodland edges, grassland, heath' },
    note: {
      pl: 'Cały jasny, słomkowożółty, z drobnymi ciemnymi kropkami na pokrywach. Obie płcie mają pełne skrzydła. Rozmieszczenie w Polsce wymaga potwierdzenia.',
      en: 'Entirely pale, straw-yellow, with tiny dark dots on the wings. Both sexes are fully winged. Distribution in Poland needs confirmation.',
    },
    traits: {
      length: ['lt10'],
      habitat: ['outdoors'],
      pronotum: ['uniform'],
      colour: ['pale'],
      wingsMale: ['full'],
      wingsFemale: ['full'],
      marks: ['spottedWings'],
    },
  },
  {
    id: 'ectobius-vittiventris',
    latin: 'Ectobius vittiventris',
    author: '(A. Costa, 1847)',
    status: 'introduced',
    verify: true,
    length: '9–12 mm',
    habitat: { pl: 'ogrody, zieleń miejska; jesienią czasem zalatuje do mieszkań', en: 'gardens, urban greenery; in autumn sometimes flies into homes' },
    note: {
      pl: 'Gatunek południowy, który rozprzestrzenia się na północ Europy. Jest jasny, jednolicie żółtawobrązowy i lata do światła. Może być mylony z prusakiem, ale nie ma pasów na przedpleczu. Status w Polsce do weryfikacji.',
      en: 'A southern species spreading north through Europe. Pale, uniformly yellowish-brown and attracted to light. Can be mistaken for the German cockroach but lacks the pronotal stripes. Status in Poland to be verified.',
    },
    traits: {
      length: ['lt10', '10-15'],
      habitat: ['outdoors', 'buildings'],
      pronotum: ['uniform'],
      colour: ['pale'],
      wingsMale: ['full'],
      wingsFemale: ['full'],
      marks: ['none'],
    },
  },
  {
    id: 'phyllodromica-maculata',
    latin: 'Phyllodromica maculata',
    author: '(Schreber, 1781)',
    status: 'native',
    verify: true,
    length: '5–7 mm',
    habitat: { pl: 'ciepłe murawy kserotermiczne, nasłonecznione zbocza', en: 'warm dry grassland, sunny slopes' },
    note: {
      pl: 'Bardzo mały i ciemny. Obie płcie mają skrócone pokrywy i nie latają. Łatwo przeoczyć go w ściółce. Cechy i rozmieszczenie wymagają weryfikacji.',
      en: 'Very small and dark. Both sexes have shortened wings and cannot fly. Easily overlooked in leaf litter. Features and distribution need verification.',
    },
    traits: {
      length: ['lt10'],
      habitat: ['outdoors'],
      pronotum: ['darkCenter'],
      colour: ['dark'],
      wingsMale: ['short'],
      wingsFemale: ['short', 'vestigial'],
      marks: ['none'],
    },
  },
  {
    id: 'blattella-germanica',
    latin: 'Blattella germanica',
    author: '(Linnaeus, 1767)',
    name: { pl: 'karaczan prusak', en: 'German cockroach' },
    status: 'synanthropic',
    length: '10–15 mm',
    habitat: { pl: 'budynki – kuchnie, łazienki, gastronomia; także szklarnie', en: 'buildings – kitchens, bathrooms, restaurants; also glasshouses' },
    note: {
      pl: 'Najłatwiej go rozpoznać po dwóch ciemnych podłużnych pasach na jasnym przedpleczu. Samica często nosi ootekę aż do wylęgu nimf.',
      en: 'Easily recognised by the two dark longitudinal stripes on its pale pronotum. The female often carries the ootheca until the nymphs hatch.',
    },
    traits: {
      length: ['10-15'],
      habitat: ['buildings', 'greenhouse'],
      pronotum: ['twoStripes'],
      colour: ['pale', 'brown'],
      wingsMale: ['full'],
      wingsFemale: ['full'],
      marks: ['none'],
    },
  },
  {
    id: 'supella-longipalpa',
    latin: 'Supella longipalpa',
    author: '(Fabricius, 1798)',
    name: { pl: '', en: 'brown-banded cockroach' },
    status: 'synanthropic',
    length: '10–14 mm',
    habitat: { pl: 'ciepłe, suche miejsca w budynkach – meble, elektronika, sufity', en: 'warm, dry places in buildings – furniture, electronics, ceilings' },
    note: {
      pl: 'Ma dwie jasne poprzeczne przepaski na pokrywach i odwłoku. Unika wilgoci, częściej spotykany w pokojach niż w kuchni. W Polsce notowany rzadko.',
      en: 'Two pale transverse bands across the wings and abdomen. Avoids moisture and is found in rooms more than in kitchens. Rarely recorded in Poland.',
    },
    traits: {
      length: ['10-15'],
      habitat: ['buildings'],
      pronotum: ['darkCenter'],
      colour: ['pale', 'brown'],
      wingsMale: ['full'],
      wingsFemale: ['short'],
      marks: ['paleBands'],
    },
  },
  {
    id: 'blatta-orientalis',
    latin: 'Blatta orientalis',
    author: 'Linnaeus, 1758',
    name: { pl: 'karaczan wschodni (karaluch)', en: 'Oriental cockroach' },
    status: 'synanthropic',
    length: '18–30 mm',
    habitat: { pl: 'piwnice, kanały, wilgotne pomieszczenia', en: 'basements, sewers, damp rooms' },
    note: {
      pl: 'Duży, ciemnobrązowy do czarnego i błyszczący. Skrzydła samca nie sięgają końca odwłoka, a samica ma tylko szczątkowe płatki. Nie wspina się po gładkich powierzchniach.',
      en: 'Large, dark brown to black and glossy. The male’s wings do not reach the abdomen tip and the female has only small lobes. Cannot climb smooth surfaces.',
    },
    traits: {
      length: ['15-25', 'gt25'],
      habitat: ['buildings'],
      pronotum: ['uniform'],
      colour: ['dark'],
      wingsMale: ['short'],
      wingsFemale: ['vestigial'],
      marks: ['none'],
    },
  },
  {
    id: 'shelfordella-lateralis',
    latin: 'Shelfordella lateralis',
    author: '(Walker, 1868)',
    name: { pl: 'karaczan turkiestański', en: 'Turkestan cockroach' },
    status: 'introduced',
    verify: true,
    length: '18–25 mm',
    habitat: { pl: 'gatunek karmowy – uciekinierzy z hodowli w budynkach', en: 'feeder species – escapees from cultures inside buildings' },
    note: {
      pl: 'Samiec jest jasnordzawy i ma pełne skrzydła. Samica jest ciemna, ma szczątkowe skrzydła i kremowe plamy po bokach tułowia. W Polsce znany głównie z hodowli.',
      en: 'The male is pale rusty and fully winged. The female is dark, with vestigial wings and cream patches on the sides of the thorax. In Poland known mainly from cultures.',
    },
    traits: {
      length: ['15-25'],
      habitat: ['buildings'],
      pronotum: ['uniform', 'darkCenter'],
      colour: ['brown', 'dark'],
      wingsMale: ['full'],
      wingsFemale: ['vestigial'],
      marks: ['creamSides'],
    },
    profile: 'shelfordella-lateralis',
  },
  {
    id: 'periplaneta-americana',
    latin: 'Periplaneta americana',
    author: '(Linnaeus, 1758)',
    name: { pl: 'przybyszka amerykańska', en: 'American cockroach' },
    status: 'synanthropic',
    length: '28–44 mm',
    habitat: { pl: 'kanały, ciepłe piwnice, zoo, palmiarnie', en: 'sewers, warm basements, zoos, palm houses' },
    note: {
      pl: 'Największy karaczan spotykany w Polsce. Jest rudobrązowy, a przedplecze ma jaśniejszą obwódkę. Obie płcie mają długie skrzydła.',
      en: 'The largest cockroach found in Poland. Reddish-brown, with a paler ring around the pronotum. Both sexes have long wings.',
    },
    traits: {
      length: ['gt25'],
      habitat: ['buildings', 'greenhouse'],
      pronotum: ['paleRing'],
      colour: ['brown'],
      wingsMale: ['full'],
      wingsFemale: ['full'],
      marks: ['none'],
    },
  },
  {
    id: 'periplaneta-australasiae',
    latin: 'Periplaneta australasiae',
    author: '(Fabricius, 1775)',
    name: { pl: 'przybyszka australijska', en: 'Australian cockroach' },
    status: 'introduced',
    length: '23–35 mm',
    habitat: { pl: 'palmiarnie, szklarnie, ogrody botaniczne', en: 'palm houses, glasshouses, botanical gardens' },
    note: {
      pl: 'Podobna do przybyszki amerykańskiej, ale ma jaskrawożółtą obwódkę przedplecza i żółtą kreskę u nasady pokryw.',
      en: 'Similar to the American cockroach, but with a bright yellow pronotal ring and a yellow stripe at the base of the wings.',
    },
    traits: {
      length: ['15-25', 'gt25'],
      habitat: ['greenhouse', 'buildings'],
      pronotum: ['paleRing'],
      colour: ['brown'],
      wingsMale: ['full'],
      wingsFemale: ['full'],
      marks: ['yellowShoulder'],
    },
  },
  {
    id: 'pycnoscelus-surinamensis',
    latin: 'Pycnoscelus surinamensis',
    author: '(Linnaeus, 1758)',
    name: { pl: '', en: 'Surinam cockroach' },
    status: 'introduced',
    verify: true,
    length: '18–25 mm',
    habitat: { pl: 'szklarnie i palmiarnie – zakopuje się w podłożu doniczek', en: 'glasshouses and palm houses – burrows in potting soil' },
    note: {
      pl: 'Krępy, ciemny i błyszczący, z jaśniejszymi skrzydłami. W Europie występują głównie samice rozmnażające się bez zapłodnienia, więc samców zwykle się nie spotyka.',
      en: 'Stocky, dark and glossy, with paler wings. European populations are mostly parthenogenetic females, so males are rarely seen.',
    },
    traits: {
      length: ['15-25'],
      habitat: ['greenhouse'],
      pronotum: ['uniform', 'darkCenter'],
      colour: ['dark'],
      wingsFemale: ['full'],
      marks: ['none'],
    },
  },
];
