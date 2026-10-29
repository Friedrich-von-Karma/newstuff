/**
 * KARACZANY POLSKI – szczegóły do kart gatunków (/karaczany-polski/) i kalendarza obserwacji.
 * Podstawowe dane (nazwa, długość, siedlisko, cechy do klucza) są w src/data/key.ts – tu tylko uzupełnienia.
 * Dane z literatury (m.in. Żurawlew i in. 2022, 2024; orthoptera.entomo.pl; baza IOP PAN) – do weryfikacji.
 */
type T = { pl: string; en: string };

export interface WildInfo {
  /** confirmed – potwierdzony; doubtful – niepewny; casual – tylko zawlekane/pojedyncze; culture – tylko w hodowli */
  record: 'confirmed' | 'doubtful' | 'casual' | 'culture';
  distribution: T;
  identification: T[];
  similar?: T;
  /** miesiące 1–12; `indoors` – przez cały rok w budynkach/szklarniach */
  phenology: { adults?: number[]; nymphs?: number[]; indoors?: boolean; note?: T };
  sources: { label: string; url: string }[];
}

const zur22 = { label: 'Żurawlew i in. 2022, Fragmenta Faunistica 65(1)', url: 'https://www.rcin.org.pl//Content/236928/WA058_273245_P256_FF.pdf' };
const zur24 = { label: 'Żurawlew i in. 2024, Fragmenta Faunistica 67(2)', url: 'https://www.rcin.org.pl/miiz/dlibra/publication/281628/edition/244886' };
const ofp = (path: string) => ({ label: 'Prostoskrzydłe (Orthoptera) Polski', url: `https://orthoptera.entomo.pl/index.php/karaczany${path}` });
const ias = (id: string) => ({ label: 'Gatunki obce w Polsce (IOP PAN)', url: `https://www.iop.krakow.pl/ias/species/${id}` });
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

export const wild: Record<string, WildInfo> = {
  'ectobius-sylvestris': {
    record: 'confirmed',
    distribution: {
      pl: 'W całym kraju w lasach; od Europy Zachodniej po Skandynawię, Europę Południowo-Wschodnią i Azję Mniejszą.',
      en: 'Throughout the country in woodland; from Western Europe to Scandinavia, south-eastern Europe and Asia Minor.',
    },
    identification: [
      { pl: 'Przedplecze czarne z ostro odciętymi, jasnymi bokami.', en: 'Pronotum black with sharply defined pale sides.' },
      { pl: 'Długość ok. 7–11 mm.', en: 'Length approx. 7–11 mm.' },
      { pl: 'Samiec ma pełne skrzydła, samica – wyraźnie skrócone.', en: 'The male is fully winged, the female has clearly shortened wings.' },
      { pl: 'Aktywny także w dzień, w ściółce i na krzewach.', en: 'Active by day too, in leaf litter and on shrubs.' },
    ],
    similar: {
      pl: 'E. lapponicus – brzegi przedplecza przezroczyste, nieostro przechodzące w ciemny środek. Rysunek bywa zmienny – przy wątpliwościach liczy się samiec.',
      en: 'E. lapponicus – translucent pronotal margins blending into the dark centre. The pattern varies – when in doubt, a male is needed.',
    },
    phenology: { adults: range(5, 9), nymphs: range(4, 10) },
    sources: [zur22, ofp('')],
  },
  'ectobius-lapponicus': {
    record: 'confirmed',
    distribution: {
      pl: 'Szeroko rozmieszczony w Polsce (m.in. Pomorze, Dolny Śląsk); Europa i Syberia Zachodnia.',
      en: 'Widespread in Poland (e.g. Pomerania, Lower Silesia); Europe and Western Siberia.',
    },
    identification: [
      { pl: 'Przedplecze ciemnobrązowe z przezroczystym brzegiem, nieostro przechodzącym w środek.', en: 'Pronotum dark brown with a translucent margin blending into the centre.' },
      { pl: 'Samica ma brązowożółtą głowę, samiec czarną z rudawą plamą między oczami.', en: 'The female’s head is brownish-yellow, the male’s black with a reddish patch between the eyes.' },
      { pl: 'Długość ok. 7–13 mm; samiec w pełni uskrzydlony.', en: 'Length approx. 7–13 mm; the male is fully winged.' },
      { pl: 'Cykl dwuletni – zimują nimfy.', en: 'Two-year life cycle – nymphs overwinter.' },
    ],
    similar: { pl: 'E. sylvestris (ostro odcięte jasne boki przedplecza) i E. erythronotus.', en: 'E. sylvestris (sharply defined pale pronotal sides) and E. erythronotus.' },
    phenology: { adults: range(5, 9), nymphs: range(4, 10), note: { pl: 'ooteki składane od czerwca', en: 'oothecae laid from June' } },
    sources: [zur22, ofp('')],
  },
  'ectobius-erythronotus': {
    record: 'confirmed',
    distribution: {
      pl: 'Gatunek rodzimy, potwierdzony w Polsce; szczegóły rozmieszczenia do uzupełnienia.',
      en: 'A native species confirmed in Poland; distribution details still to be added.',
    },
    identification: [
      { pl: 'Podobny do E. lapponicus – pewne oznaczenie wymaga obejrzenia samca.', en: 'Similar to E. lapponicus – reliable identification requires a male.' },
    ],
    similar: { pl: 'E. lapponicus.', en: 'E. lapponicus.' },
    phenology: {},
    sources: [zur24, ofp('/2-gatunki/114-10-ectobius-erythronotus')],
  },
  'ectobius-pallidus': {
    record: 'doubtful',
    distribution: {
      pl: 'W Polsce niepotwierdzony – dawne dane mogą dotyczyć innych zadomek. Europa Zachodnia i Południowa, Afryka Północna; rozprzestrzenia się na wschód (wschodnie Niemcy).',
      en: 'Not confirmed in Poland – older records may refer to other Ectobius species. Western and Southern Europe, North Africa; spreading east (eastern Germany).',
    },
    identification: [
      { pl: 'Mały, jednolicie jasny, słomkowożółty.', en: 'Small, uniformly pale, straw-yellow.' },
      { pl: 'Ooteka mała, owalna i gładka.', en: 'Ootheca small, oval and smooth.' },
    ],
    similar: { pl: 'E. vittiventris – niemal identyczny z wyglądu; ma dużą ootekę z ponad 30 podłużnymi żeberkami.', en: 'E. vittiventris – almost identical; it has a large ootheca with more than 30 longitudinal ridges.' },
    phenology: {},
    sources: [ofp('/2-gatunki/116-12-ectobius-pallidus')],
  },
  'ectobius-vittiventris': {
    record: 'confirmed',
    distribution: {
      pl: 'Pierwsze stwierdzenie w Polsce w 2024 r. (Pilawa, Nizina Mazowiecka), potwierdzone badaniem DNA. Stanowiska leżą często przy ruchliwych drogach – gatunek prawdopodobnie przemieszcza się z transportem. Rozszerza zasięg z południa Europy przez Szwajcarię, Niemcy i Czechy.',
      en: 'First recorded in Poland in 2024 (Pilawa, Mazovian Lowland), confirmed by DNA barcoding. Sites often lie along busy roads – the species probably travels with transport. Expanding from southern Europe through Switzerland, Germany and Czechia.',
    },
    identification: [
      { pl: 'Jasny, smukły, jednolicie żółtawobrązowy.', en: 'Pale, slender, uniformly yellowish-brown.' },
      { pl: 'Ooteka duża, owalna, z ponad 30 podłużnymi żeberkami.', en: 'Ootheca large, oval, with more than 30 longitudinal ridges.' },
      { pl: 'Lata do światła – jesienią zdarza się w mieszkaniach.', en: 'Comes to light – in autumn it may turn up indoors.' },
    ],
    similar: { pl: 'E. pallidus (prawie identyczny); od prusaka różni się brakiem pasów na przedpleczu.', en: 'E. pallidus (almost identical); differs from the German cockroach by lacking pronotal stripes.' },
    phenology: { adults: range(8, 11) },
    sources: [zur24],
  },
  'phyllodromica-maculata': {
    record: 'confirmed',
    distribution: {
      pl: 'Rozproszone stanowiska (m.in. Kotlina Sandomierska, łódzkie, lubuskie); Europa Środkowa i Wschodnia. Łatwo go przeoczyć.',
      en: 'Scattered sites (e.g. Sandomierz Basin, Łódź and Lubusz regions); Central and Eastern Europe. Easily overlooked.',
    },
    identification: [
      { pl: 'Bardzo mały (ok. 5–7 mm), ciemny, plamisty.', en: 'Very small (approx. 5–7 mm), dark and spotted.' },
      { pl: 'Obie płcie nielotne; skrzydła tylne szczątkowe.', en: 'Both sexes flightless; hindwings rudimentary.' },
      { pl: 'Pokrywy krótkie, prawie bez żyłek – stąd nazwa „bezżyłka”.', en: 'Short, almost veinless tegmina – hence the Polish name “bezżyłka” (“veinless”).' },
    ],
    similar: { pl: 'Nimfy i krótkoskrzydłe samice zadomek – zadomki mają wyraźnie użyłkowane pokrywy, a samce pełne skrzydła.', en: 'Ectobius nymphs and short-winged females – Ectobius have clearly veined tegmina and fully winged males.' },
    phenology: { adults: range(5, 7), nymphs: range(6, 9), note: { pl: 'aktywna wieczorem; dane głównie z Niemiec', en: 'active in the evening; data mostly from Germany' } },
    sources: [zur22, ofp('/2-gatunki/117-13-phyllodromica-maculata')],
  },
  'blattella-germanica': {
    record: 'confirmed',
    distribution: { pl: 'W całym kraju w ogrzewanych budynkach; kosmopolityczny.', en: 'Throughout the country in heated buildings; cosmopolitan.' },
    identification: [
      { pl: 'Dwa ciemne podłużne pasy na jasnym przedpleczu.', en: 'Two dark longitudinal stripes on a pale pronotum.' },
      { pl: 'Długość 10–15 mm, jasnobrązowy.', en: 'Length 10–15 mm, light brown.' },
      { pl: 'Samica nosi ootekę prawie do wylęgu nimf.', en: 'The female carries the ootheca until shortly before the nymphs hatch.' },
    ],
    similar: { pl: 'Supella longipalpa ma poprzeczne jasne przepaski, nie podłużne pasy.', en: 'Supella longipalpa has transverse pale bands, not longitudinal stripes.' },
    phenology: { indoors: true },
    sources: [zur22, ias('687')],
  },
  'supella-longipalpa': {
    record: 'casual',
    distribution: { pl: 'W Polsce tylko pojedyncze, zawleczone przypadki; kosmopolityczny, pochodzi z Afryki.', en: 'In Poland only isolated imported cases; cosmopolitan, of African origin.' },
    identification: [
      { pl: 'Dwie jasne poprzeczne przepaski na pokrywach i odwłoku.', en: 'Two pale transverse bands across the tegmina and abdomen.' },
      { pl: 'Długie głaszczki szczękowe; trzyma się suchych, wysoko położonych miejsc.', en: 'Long maxillary palps; keeps to dry, high places.' },
    ],
    phenology: { indoors: true },
    sources: [{ label: 'Nauka w Polsce – prof. S. Ignatowicz', url: 'https://naukawpolsce.pl/aktualnosci/news,108962,prof-ignatowicz-o-karaczanie-owad-ktory-nosi-jajka-w-teczce.html' }],
  },
  'blatta-orientalis': {
    record: 'confirmed',
    distribution: { pl: 'W całym kraju w budynkach – piwnice, piekarnie, kanały; kosmopolityczny.', en: 'Throughout the country in buildings – basements, bakeries, sewers; cosmopolitan.' },
    identification: [
      { pl: 'Duży (20–27 mm), ciemnobrązowy do czarnego, błyszczący.', en: 'Large (20–27 mm), dark brown to black, glossy.' },
      { pl: 'Skrzydła samca odsłaniają ok. 1/3 odwłoka, samica ma tylko szczątkowe płatki.', en: 'The male’s wings leave about a third of the abdomen exposed; the female has only tiny lobes.' },
      { pl: 'Nie lata i słabo wspina się po gładkich powierzchniach.', en: 'Flightless and a poor climber on smooth surfaces.' },
    ],
    similar: { pl: 'Shelfordella lateralis – jasne boczne pasy u samców i plamy u samic.', en: 'Shelfordella lateralis – pale side stripes in males and pale marks in females.' },
    phenology: { indoors: true },
    sources: [zur22, ias('688')],
  },
  'shelfordella-lateralis': {
    record: 'culture',
    distribution: { pl: 'W Polsce tylko jako owad karmowy w hodowlach; bez populacji na wolności. Naturalnie od Afryki Północnej po Azję Środkową.', en: 'In Poland only as a feeder insect in culture; no wild populations. Native from North Africa to Central Asia.' },
    identification: [
      { pl: 'Samiec jasnobrązowy, w pełni uskrzydlony, z kremowymi pasami wzdłuż brzegów pokryw.', en: 'The male is light brown, fully winged, with cream stripes along the tegmina edges.' },
      { pl: 'Samica ciemna, z krótkimi zawiązkami skrzydeł i jasnymi plamami po bokach.', en: 'The female is dark, with short wing pads and pale side marks.' },
      { pl: 'Nie wspina się po gładkich ściankach; wrażliwy na chłód.', en: 'Cannot climb smooth walls; sensitive to cold.' },
    ],
    phenology: { indoors: true },
    sources: [{ label: 'GBIF', url: 'https://www.gbif.org/species/165239647' }],
  },
  'periplaneta-americana': {
    record: 'confirmed',
    distribution: { pl: 'Rzadko i miejscowo – ogrzewane budynki, zoo, szklarnie, porty; kosmopolityczny w strefie tropikalnej.', en: 'Rare and local – heated buildings, zoos, glasshouses, ports; cosmopolitan in the tropics.' },
    identification: [
      { pl: 'Największy synantrop w Polsce (28–44 mm), rudobrązowy.', en: 'The largest synanthropic species in Poland (28–44 mm), reddish-brown.' },
      { pl: 'Przedplecze z bladą, żółtawą obwódką.', en: 'Pronotum with a pale yellowish ring.' },
      { pl: 'Obie płcie mają pełne skrzydła i potrafią latać.', en: 'Both sexes are fully winged and can fly.' },
    ],
    similar: { pl: 'P. australasiae – mniejsza, z ostrą żółtą obwódką i żółtą kreską u nasady pokryw.', en: 'P. australasiae – smaller, with a sharp yellow ring and a yellow streak at the base of the tegmina.' },
    phenology: { indoors: true },
    sources: [zur22],
  },
  'periplaneta-australasiae': {
    record: 'casual',
    distribution: { pl: 'Tylko pojedyncze osobniki (uciekinierzy z hodowli, szklarnie); pantropikalny.', en: 'Only single individuals (escapees, glasshouses); pantropical.' },
    identification: [
      { pl: 'Jaskrawożółta, ostro odcięta obwódka przedplecza.', en: 'Bright yellow, sharply defined pronotal ring.' },
      { pl: 'Krótka żółta kreska u nasady przedniego brzegu pokryw.', en: 'A short yellow streak at the base of the front edge of the tegmina.' },
    ],
    phenology: { indoors: true },
    sources: [{ label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Australian_cockroach' }],
  },
  'pycnoscelus-surinamensis': {
    record: 'confirmed',
    distribution: { pl: 'Szklarnie i palmiarnie, gdzie się rozmnaża; IOP PAN uznaje go za gatunek potencjalnie inwazyjny. Pantropikalny.', en: 'Glasshouses and palm houses, where it breeds; IOP PAN lists it as potentially invasive. Pantropical.' },
    identification: [
      { pl: 'Krępy, błyszczący, ciemnobrązowy do czarnego; pokrywy jaśniejsze.', en: 'Stocky, glossy, dark brown to black; tegmina paler.' },
      { pl: 'Nimfy: przód błyszcząco czarny, odwłok matowy i szorstki.', en: 'Nymphs: glossy black at the front, the abdomen matte and rough.' },
      { pl: 'Kopie w ziemi doniczek; rozmnaża się bez samców (partenogeneza).', en: 'Burrows in potting soil; reproduces without males (parthenogenesis).' },
    ],
    phenology: { indoors: true },
    sources: [{ label: 'Gatunki obce w Polsce (IOP PAN)', url: 'https://www.iop.krakow.pl/ias/gatunki/1029' }],
  },
};
