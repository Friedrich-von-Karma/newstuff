/**
 * SŁOWNICZEK – terminy z definicjami.
 * `match` to wyrażenie regularne (bez flag) łapiące odmiany słowa w tekście;
 * na stronie pierwsze wystąpienie terminu w tekście dostaje dymek z definicją.
 */
export interface Term {
  id: string;
  term: { pl: string; en: string };
  def: { pl: string; en: string };
  match: { pl: string; en: string };
}

export const glossary: Term[] = [
  {
    id: 'ooteka',
    term: { pl: 'ooteka', en: 'ootheca' },
    def: {
      pl: 'Kapsuła z jajami produkowana przez samicę. U jednych gatunków składana w kryjówce, u innych noszona na końcu odwłoka albo cofana do ciała aż do wylęgu.',
      en: 'An egg case produced by the female. Some species deposit it in a crevice, others carry it at the tip of the abdomen or retract it into the body until hatching.',
    },
    match: { pl: 'oote[kc][a-ząćęłńóśźż]*', en: 'oothec(?:a|ae)' },
  },
  {
    id: 'nimfa',
    term: { pl: 'nimfa', en: 'nymph' },
    def: {
      pl: 'Młodociane stadium karaczana. Wygląda jak mniejsza wersja dorosłego, ale nie ma skrzydeł; rośnie, linieniejąc kilka razy.',
      en: 'The juvenile stage of a cockroach. It resembles a small adult without wings and grows by moulting several times.',
    },
    match: { pl: 'nimf[a-ząćęłńóśźż]*', en: 'nymphs?' },
  },
  {
    id: 'linienie',
    term: { pl: 'linienie', en: 'moulting' },
    def: {
      pl: 'Zrzucanie starego oskórka, żeby urosnąć. Świeżo wylinkowany karaczan jest jasny, prawie biały, i ciemnieje w ciągu kilku godzin.',
      en: 'Shedding the old exoskeleton in order to grow. A freshly moulted cockroach is pale, almost white, and darkens within a few hours.',
    },
    match: { pl: '(?:lini[ea][a-ząćęłńóśźż]*|wylink[a-ząćęłńóśźż]*|wylin[a-ząćęłńóśźż]*)', en: 'moult(?:ing|ed|s)?' },
  },
  {
    id: 'imago',
    term: { pl: 'imago', en: 'adult (imago)' },
    def: {
      pl: 'Dorosły, w pełni wykształcony osobnik zdolny do rozmnażania. U wielu gatunków ma skrzydła; po osiągnięciu tego stadium karaczan już nie linieje.',
      en: 'The fully developed, sexually mature adult. Many species have wings at this stage; an adult cockroach no longer moults.',
    },
    match: { pl: 'imag[oa]', en: 'imag(?:o|ines)' },
  },
  {
    id: 'subadult',
    term: { pl: 'subadult', en: 'subadult' },
    def: {
      pl: 'Nimfa w ostatnim stadium przed dorosłością – po jeszcze jednym linieniu stanie się imago.',
      en: 'A nymph in its last stage before adulthood – one more moult and it becomes an adult.',
    },
    match: { pl: 'subadult[a-ząćęłńóśźż]*', en: 'subadults?' },
  },
  {
    id: 'jajozyworodnosc',
    term: { pl: 'jajożyworodność', en: 'ovoviviparity' },
    def: {
      pl: 'Sposób rozmnażania, w którym jaja rozwijają się w ootece ukrytej wewnątrz ciała samicy, a na świat przychodzą od razu ruchliwe nimfy. Tak rozmnaża się np. Blaptica dubia.',
      en: 'A mode of reproduction in which eggs develop in an ootheca kept inside the female, which then gives birth to active nymphs – e.g. Blaptica dubia.',
    },
    match: { pl: 'jajożyworod[a-ząćęłńóśźż]*', en: 'ovovivipar[a-z]*' },
  },
  {
    id: 'jajorodnosc',
    term: { pl: 'jajorodność', en: 'oviparity' },
    def: {
      pl: 'Sposób rozmnażania, w którym samica składa ootekę na zewnątrz (np. w szczelinie), a nimfy wylęgają się z niej po kilku tygodniach.',
      en: 'A mode of reproduction in which the female deposits the ootheca outside (e.g. in a crevice) and nymphs hatch from it weeks later.',
    },
    match: { pl: 'jajorod[a-ząćęłńóśźż]*', en: 'ovipar[a-z]*' },
  },
  {
    id: 'przedplecze',
    term: { pl: 'przedplecze', en: 'pronotum' },
    def: {
      pl: 'Tarczka za głową, która u karaczanów przykrywa głowę od góry. Jej kształt i rysunek to ważne cechy przy oznaczaniu gatunków.',
      en: 'The shield behind the head that covers it from above. Its shape and pattern are key features for identification.',
    },
    match: { pl: 'przedplecz[a-ząćęłńóśźż]*', en: 'pronot(?:um|a)' },
  },
  {
    id: 'pokrywy',
    term: { pl: 'pokrywy', en: 'tegmina' },
    def: {
      pl: 'Przednia para skrzydeł – twardsza, skórzasta, przykrywająca błoniaste skrzydła tylne. Ich długość różni samce i samice wielu gatunków.',
      en: 'The front pair of wings – leathery and covering the membranous hind wings. Their length often differs between males and females.',
    },
    match: { pl: 'pokryw[a-ząćęłńóśźż]*', en: 'tegmin(?:a|en)' },
  },
  {
    id: 'przysadki',
    term: { pl: 'przysadki odwłokowe', en: 'cerci' },
    def: {
      pl: 'Para krótkich wyrostków na końcu odwłoka, wyczulonych na ruch powietrza – dzięki nim karaczan tak szybko ucieka.',
      en: 'A pair of short appendages at the tip of the abdomen, sensitive to air movement – one reason cockroaches escape so fast.',
    },
    match: { pl: 'przysad[a-ząćęłńóśźż]*', en: 'cerc(?:i|us)' },
  },
  {
    id: 'synantrop',
    term: { pl: 'gatunek synantropijny', en: 'synanthropic species' },
    def: {
      pl: 'Gatunek żyjący przy człowieku – w budynkach, piwnicach czy kanałach – jak karaczan prusak czy karaczan wschodni.',
      en: 'A species living alongside people – in buildings, basements or sewers – such as the German or Oriental cockroach.',
    },
    match: { pl: 'synantropij[a-ząćęłńóśźż]*', en: 'synanthropic' },
  },
  {
    id: 'partenogeneza',
    term: { pl: 'partenogeneza', en: 'parthenogenesis' },
    def: {
      pl: 'Rozmnażanie bez udziału samców – samice wydają potomstwo z niezapłodnionych jaj. Tak rozmnażają się europejskie populacje Pycnoscelus surinamensis.',
      en: 'Reproduction without males – females produce offspring from unfertilised eggs, as in European populations of Pycnoscelus surinamensis.',
    },
    match: { pl: '(?:partenogene[a-ząćęłńóśźż]*|bez zapłodnienia)', en: 'parthenogene[a-z]*' },
  },
];
