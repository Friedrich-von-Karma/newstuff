/**
 * BIBLIOTEKA – literatura o karaczanach (strona /biblioteka/).
 * Pozycje zebrane z katalogów i baz (RCIN, BHL, PubMed, Pensoft); przed cytowaniem
 * warto sprawdzić szczegóły w źródle. Dodając pozycję, wybierz grupę (group).
 */
type T = { pl: string; en: string };

export interface LibItem {
  id: string;
  group: 'poland' | 'reference' | 'husbandry' | 'online';
  authors: string;
  year?: string;
  title: string;
  source?: string;
  url: string;
  doi?: string;
  lang: string;
  open?: boolean;
  note: T;
}

export const groups: { id: LibItem['group']; title: T; lead: T }[] = [
  {
    id: 'poland',
    title: { pl: 'Karaczany Polski i Europy Środkowej', en: 'Cockroaches of Poland and Central Europe' },
    lead: { pl: 'Faunistyka, klucze, katalogi i nowe stwierdzenia.', en: 'Faunistics, keys, catalogues and new records.' },
  },
  {
    id: 'reference',
    title: { pl: 'Systematyka i biologia', en: 'Systematics and biology' },
    lead: { pl: 'Podstawowe monografie i prace o pokrewieństwach karaczanów i termitów.', en: 'Core monographs and papers on the relationships of cockroaches and termites.' },
  },
  {
    id: 'husbandry',
    title: { pl: 'Hodowla', en: 'Husbandry' },
    lead: { pl: 'Książki, badania i sprawdzone strony o utrzymaniu karaczanów.', en: 'Books, studies and reliable websites on keeping cockroaches.' },
  },
  {
    id: 'online',
    title: { pl: 'Bazy danych i narzędzia', en: 'Databases and tools' },
    lead: { pl: 'Katalogi taksonomiczne, dane o występowaniu i repozytoria z darmowymi pełnymi tekstami.', en: 'Taxonomic catalogues, occurrence data and repositories with free full texts.' },
  },
];

export const library: LibItem[] = [
  // --- Polska i Europa Środkowa
  {
    id: 'bazyluk-1977', group: 'poland', authors: 'Bazyluk W.', year: '1977',
    title: 'Blattodea et Mantodea. Karaczany i modliszki (Insecta)', source: 'Fauna Polski 6, PWN, Warszawa',
    url: 'https://www.rcin.org.pl/publication/4023', lang: 'PL', open: true,
    note: { pl: 'Podstawowa monografia karaczanów i modliszek Polski.', en: 'The standard monograph on the cockroaches and mantises of Poland.' },
  },
  {
    id: 'bazyluk-1956', group: 'poland', authors: 'Bazyluk W.', year: '1956',
    title: 'Karaczany – Blattodea; Modliszki – Mantodea', source: 'Klucze do oznaczania owadów Polski, PTE, Warszawa',
    url: 'https://baza.biomap.pl/en/data/publication/bazyluk_1956a/default', lang: 'PL',
    note: { pl: 'Klasyczny polski klucz do oznaczania.', en: 'The classic Polish identification key.' },
  },
  {
    id: 'zurawlew-2022', group: 'poland', authors: 'Żurawlew P., Grobelny S., Orzechowski R., Radzikowski P., Rutkowski T.', year: '2022',
    title: 'New data on the distribution of cockroaches (Blattodea) and earwigs (Dermaptera) in Poland', source: 'Fragmenta Faunistica 65(1): 11–24',
    url: 'https://www.rcin.org.pl//Content/236928/WA058_273245_P256_FF.pdf', doi: '10.3161/00159301FF2022.65.1.011', lang: 'EN', open: true,
    note: { pl: 'Najnowsze dane o rozmieszczeniu 6 gatunków karaczanów w Polsce (145 stanowisk, 1957–2021).', en: 'The most recent distribution data for 6 cockroach species in Poland (145 localities, 1957–2021).' },
  },
  {
    id: 'zurawlew-2024', group: 'poland', authors: 'Żurawlew P., Vlk R., Kapusta B., Radzikowski P., Grabowski M.', year: '2024',
    title: 'Ectobius vittiventris (Costa, 1847) – pierwsze stwierdzenie w Polsce / first record in Poland', source: 'Fragmenta Faunistica 67(2): 113–119',
    url: 'https://www.rcin.org.pl/miiz/dlibra/publication/281628/edition/244886', doi: '10.3161/00159301FF2024.67.2.113', lang: 'EN', open: true,
    note: { pl: 'Pierwsze potwierdzone (także DNA) stwierdzenie tego rozprzestrzeniającego się gatunku w Polsce.', en: 'The first confirmed (also by DNA) record of this spreading species in Poland.' },
  },
  {
    id: 'liana-2002', group: 'poland', authors: 'Liana A.', year: '2002',
    title: 'Prostoskrzydłe (Orthoptera s.l.)', source: 'Czerwona lista zwierząt ginących i zagrożonych w Polsce, s. 115–121',
    url: 'https://rcin.org.pl//Content/115152/PDF/KR038_97667_r2002_CzLZ-Liana-115-121.pdf', lang: 'PL', open: true,
    note: { pl: 'Rozdział czerwonej listy obejmujący też karaczany; podaje 16 gatunków w Polsce, z czego ok. 6 w siedliskach naturalnych.', en: 'Red-list chapter that also covers cockroaches; lists 16 species in Poland, about 6 of them in natural habitats.' },
  },
  {
    id: 'kocarek-2005', group: 'poland', authors: 'Kočárek P., Holuša J., Vidlička Ľ.', year: '2005',
    title: 'Blattaria, Mantodea, Orthoptera & Dermaptera of the Czech and Slovak Republics. Illustrated key', source: 'Kabourek, Zlín',
    url: 'https://is.muni.cz/publication/673043?lang=en', lang: 'CZ/EN',
    note: { pl: 'Najpraktyczniejszy współczesny klucz z regionu sąsiadującego z Polską.', en: 'The most practical modern key for the region next to Poland.' },
  },
  {
    id: 'vidlicka-2001', group: 'poland', authors: 'Vidlička Ľ.', year: '2001',
    title: 'Blattaria – šváby; Mantodea – modlivky (Insecta: Orthopteroidea)', source: 'Fauna Slovenska, Veda, Bratislava',
    url: 'https://katalog.snk.sk/vufind/Record/554779/Similar', lang: 'SK',
    note: { pl: 'Słowacki tom fauny – bliski odpowiednik monografii Bazyluka.', en: 'The Slovak fauna volume – a close counterpart of Bazyluk’s monograph.' },
  },
  {
    id: 'bohn-2004', group: 'poland', authors: 'Bohn H.', year: '2004',
    title: 'The Blattoptera fauna of Switzerland and the adjacent regions of France, Italy and Austria I. The species of the sylvestris-group of Ectobius', source: 'Spixiana 27: 253–285',
    url: 'https://www.biodiversitylibrary.org/part/41429', lang: 'EN', open: true,
    note: { pl: 'Rewizja grupy Ectobius sylvestris – ważna dla polskich zadomek.', en: 'Revision of the Ectobius sylvestris group – relevant to Polish Ectobius.' },
  },
  {
    id: 'baur-2004', group: 'poland', authors: 'Baur H., Landau Lüscher I., Müller G. et al.', year: '2004',
    title: 'Taxonomie der Bernstein-Waldschabe Ectobius vittiventris (A. Costa, 1847) und ihre Verbreitung in der Schweiz', source: 'Revue suisse de Zoologie 111(2): 395–424',
    url: 'https://biostor.org/reference/115476', lang: 'DE', open: true,
    note: { pl: 'Taksonomia i biologia Ectobius vittiventris (pojawy dorosłych, prawdopodobnie 2-letni cykl).', en: 'Taxonomy and biology of Ectobius vittiventris (adult season, probably a 2-year life cycle).' },
  },
  {
    id: 'bohn-chladek-2011', group: 'poland', authors: 'Bohn H., Chládek F.', year: '2011',
    title: 'Revision of the maculata-group of Phyllodromica: species from Central Europe', source: 'Arthropod Systematics & Phylogeny 69(1): 3–54',
    url: 'https://arthropod-systematics.arphahub.com/article_preview.php?id=31735', doi: '10.3897/asp.69.e31735', lang: 'EN', open: true,
    note: { pl: 'Rewizja grupy Phyllodromica maculata, do której należy gatunek notowany w Polsce.', en: 'Revision of the Phyllodromica maculata group, which includes the species recorded in Poland.' },
  },
  {
    id: 'husemann-2021', group: 'poland', authors: 'Husemann M. et al.', year: '2021',
    title: 'Verbreitung der Bernstein-Waldschabe Ectobius vittiventris (A. Costa, 1847) in Deutschland mit dem Erstnachweis für Niedersachsen', source: 'Articulata 36: 9–22',
    url: 'https://www.zobodat.at/pdf/Articulata_36_2021_0009-0022.pdf', lang: 'DE', open: true,
    note: { pl: 'Ekspansja Ectobius vittiventris na północ przez Niemcy – tło dla stwierdzenia w Polsce.', en: 'Northward spread of Ectobius vittiventris through Germany – context for the Polish record.' },
  },
  {
    id: 'kohler-bohn-2011', group: 'poland', authors: 'Köhler G., Bohn H.', year: '2011',
    title: 'Rote Liste der Wildschaben (Blattoptera) Deutschlands', source: 'Naturschutz und Biologische Vielfalt 70(3): 609–625',
    url: 'https://rote-liste-zentrum.de/en/Schaben-Blattoptera-1754.html', lang: 'DE', open: true,
    note: { pl: 'Czerwona lista dziko żyjących karaczanów Niemiec.', en: 'The German red list of wild cockroaches.' },
  },
  {
    id: 'heller-2016', group: 'poland', authors: 'Heller K.-G., Bohn H., Haas F., Willemse F., de Jong Y.', year: '2016',
    title: 'Fauna Europaea: Orthopteroid orders', source: 'Biodiversity Data Journal 4: e8905',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5018117', lang: 'EN', open: true,
    note: { pl: 'Praca opisująca listę Fauna Europaea, w tym karaczany Europy.', en: 'The data paper behind the Fauna Europaea checklist, including European cockroaches.' },
  },
  {
    id: 'orthoptera-entomo', group: 'poland', authors: 'Prostoskrzydłe (Orthoptera) Polski', title: 'Karaczany – opisy gatunków',
    url: 'https://orthoptera.entomo.pl/index.php/karaczany/2-gatunki/116-12-ectobius-pallidus', lang: 'PL', open: true,
    note: { pl: 'Polskie opisy gatunków z polskimi nazwami i oceną występowania.', en: 'Polish species accounts with Polish names and occurrence notes.' },
  },
  // --- Systematyka i biologia
  {
    id: 'bell-2007', group: 'reference', authors: 'Bell W.J., Roth L.M., Nalepa C.A.', year: '2007',
    title: 'Cockroaches: Ecology, Behavior, and Natural History', source: 'Johns Hopkins University Press, Baltimore',
    url: 'https://blackwells.co.uk/bookshop/product/Cockroaches-by-William-J-Bell-Louis-M-Roth-Christine-A-Nalepa/9780801886164', lang: 'EN',
    note: { pl: 'Standardowe kompendium biologii i zachowania karaczanów.', en: 'The standard overview of cockroach biology and behaviour.' },
  },
  {
    id: 'bell-adiyodi-1982', group: 'reference', authors: 'Bell W.J., Adiyodi K.G. (red.)', year: '1982',
    title: 'The American Cockroach', source: 'Chapman and Hall, London',
    url: 'https://link.springer.com/book/9789400958296', lang: 'EN',
    note: { pl: 'Klasyczna monografia biologii i fizjologii karaczana amerykańskiego.', en: 'The classic monograph on the biology and physiology of the American cockroach.' },
  },
  {
    id: 'roth-2003', group: 'reference', authors: 'Roth L.M.', year: '2003',
    title: 'Systematics and phylogeny of cockroaches (Dictyoptera: Blattaria)', source: 'Oriental Insects 37: 1–186',
    url: 'https://doi.org/10.1080/00305316.2003.10417344', doi: '10.1080/00305316.2003.10417344', lang: 'EN',
    note: { pl: 'Podsumowanie wyższej klasyfikacji karaczanów autorstwa L.M. Rotha.', en: 'Roth’s summary of the higher classification of cockroaches.' },
  },
  {
    id: 'inward-2007', group: 'reference', authors: 'Inward D., Beccaloni G., Eggleton P.', year: '2007',
    title: 'Death of an order: a comprehensive molecular phylogenetic study confirms that termites are eusocial cockroaches', source: 'Biology Letters 3(3): 331–335',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2464702', lang: 'EN', open: true,
    note: { pl: 'Przełomowa praca: termity to społeczne karaczany.', en: 'Landmark paper: termites are social cockroaches.' },
  },
  {
    id: 'djernaes-2012', group: 'reference', authors: 'Djernæs M., Klass K.-D., Picker M.D., Damgaard J.', year: '2012',
    title: 'Phylogeny of cockroaches (Insecta, Dictyoptera, Blattodea), with placement of aberrant taxa and exploration of out-group sampling', source: 'Systematic Entomology 37(1): 65–83',
    url: 'https://doi.org/10.1111/j.1365-3113.2011.00598.x', doi: '10.1111/j.1365-3113.2011.00598.x', lang: 'EN',
    note: { pl: 'Duża wielogenowa filogeneza rodzin karaczanów.', en: 'A major multi-gene phylogeny of cockroach families.' },
  },
  {
    id: 'evangelista-2019', group: 'reference', authors: 'Evangelista D.A. et al.', year: '2019',
    title: 'An integrative phylogenomic approach illuminates the evolutionary history of cockroaches and termites (Blattodea)', source: 'Proceedings of the Royal Society B 286: 20182076',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6364590', doi: '10.1098/rspb.2018.2076', lang: 'EN', open: true,
    note: { pl: 'Aktualny szkielet drzewa rodowego karaczanów i termitów (ok. 2370 genów).', en: 'The current phylogenomic backbone of cockroaches and termites (about 2,370 genes).' },
  },
  {
    id: 'wipfler-2019', group: 'reference', authors: 'Wipfler B. et al.', year: '2019',
    title: 'Evolutionary history of Polyneoptera and its implications for our understanding of early winged insects', source: 'PNAS 116(8): 3024–3029',
    url: 'https://doi.org/10.1073/pnas.1817794116', doi: '10.1073/pnas.1817794116', lang: 'EN',
    note: { pl: 'Miejsce karaczanów wśród owadów prostoskrzydłopodobnych (Polyneoptera).', en: 'Where cockroaches sit within Polyneoptera.' },
  },
  // --- Hodowla
  {
    id: 'mcmonigle-2017', group: 'husbandry', authors: 'McMonigle O.', year: '2017',
    title: 'For the Love of Cockroaches: Husbandry, Biology, and History of Pet and Feeder Blattodea', source: 'Coachwhip Publications',
    url: 'https://www.nhbs.com/de/for-the-love-of-cockroaches-book', lang: 'EN',
    note: { pl: 'Najobszerniejsza książka o hodowli karaczanów, z opisami gatunków.', en: 'The most comprehensive cockroach husbandry book, with species accounts.' },
  },
  {
    id: 'mcmonigle-2000', group: 'husbandry', authors: 'McMonigle O., Willis R.', year: '2000',
    title: 'Allpet Roaches: Care and Identification Handbook for the Pet and Feeder Cockroaches',
    url: 'https://www.nhbs.com/allpet-roaches-care-and-identification-handbook-for-the-pet-and-feeder-cockroaches-book', lang: 'EN',
    note: { pl: 'Krótki, starszy poradnik: pokarm, pojemniki, rozmnażanie, gatunki.', en: 'A short older handbook: food, enclosures, breeding, species.' },
  },
  {
    id: 'wu-2017', group: 'husbandry', authors: 'Wu H., Hu X.P., Appel A.G.', year: '2017',
    title: 'Temperature-dependent development and thermal sensitivity of Blaptica dubia (Blattodea: Blaberidae)', source: 'Journal of Economic Entomology 110(2)',
    url: 'https://doi.org/10.1093/jee/tow278', doi: '10.1093/jee/tow278', lang: 'EN',
    note: { pl: 'Badanie wpływu temperatury na rozwój Blaptica dubia: 7 stadiów nimfalnych, rozwój przy 20–30 °C.', en: 'How temperature affects the development of Blaptica dubia: 7 nymphal instars, development at 20–30 °C.' },
  },
  {
    id: 'wu-2013', group: 'husbandry', authors: 'Wu H.', year: '2013',
    title: 'Biology of Blaptica dubia (Blattodea: Blaberidae)', source: 'praca magisterska / MSc thesis, Auburn University',
    url: 'https://etd.auburn.edu/handle/10415/3735', lang: 'EN', open: true,
    note: { pl: 'Darmowy pełny tekst o biologii najpopularniejszego karaczana karmowego.', en: 'A free full text on the biology of the most popular feeder cockroach.' },
  },
  {
    id: 'aes', group: 'husbandry', authors: 'Amateur Entomologists’ Society', title: 'Cockroach caresheet',
    url: 'https://www.amentsoc.org/insects/caresheets/cockroach.html', lang: 'EN', open: true,
    note: { pl: 'Karta hodowlana brytyjskiego towarzystwa entomologicznego.', en: 'A care sheet from the UK entomological society.' },
  },
  {
    id: 'roachcrossing', group: 'husbandry', authors: 'Kandilian K.', title: 'Roach Crossing – cockroach husbandry guide',
    url: 'https://www.roachcrossing.com/12-20-2022-cockroach-husbandry-guide-update-1/', lang: 'EN', open: true,
    note: { pl: 'Praktyczne notatki hodowlane specjalisty utrzymującego ponad 100 gatunków.', en: 'Practical notes from a specialist breeder keeping over 100 species.' },
  },
  // --- Bazy danych
  {
    id: 'csf', group: 'online', authors: 'Beccaloni G.W.', year: '2014–',
    title: 'Cockroach Species File Online', url: 'https://cockroach.speciesfile.org/', lang: 'EN', open: true,
    note: { pl: 'Światowy katalog taksonomiczny karaczanów – podstawowe źródło nazw.', en: 'The world taxonomic catalogue of cockroaches – the primary source for names.' },
  },
  {
    id: 'inat', group: 'online', authors: 'iNaturalist', title: 'Blattodea – przewodnik / guide',
    url: 'https://www.inaturalist.org/guide_taxa/1059197', lang: 'EN', open: true,
    note: { pl: 'Obserwacje obywatelskie i pomoc w oznaczaniu ze zdjęć.', en: 'Citizen-science records and help with identification from photos.' },
  },
  {
    id: 'biolib', group: 'online', authors: 'BioLib.cz', title: 'Karty taksonów karaczanów / cockroach taxon profiles',
    url: 'https://www.biolib.cz/en/taxon/id927422', lang: 'CZ/EN', open: true,
    note: { pl: 'Czeska baza taksonomiczna ze zdjęciami i nazwami w wielu językach, także po polsku.', en: 'A Czech taxonomic database with photos and names in many languages, including Polish.' },
  },
  {
    id: 'biomap', group: 'online', authors: 'BioMap', title: 'Bibliografia i dane o występowaniu (Bazyluk, Liana i inni)',
    url: 'https://baza.biomap.pl/en/data/person/bazyluk_w/publications', lang: 'PL/EN', open: true,
    note: { pl: 'Polska baza literatury i stwierdzeń – starsze prace o karaczanach.', en: 'Polish database of literature and records – older cockroach works.' },
  },
  {
    id: 'rcin', group: 'online', authors: 'RCIN', title: 'Repozytorium Cyfrowe Instytutów Naukowych PAN',
    url: 'https://www.rcin.org.pl/', lang: 'PL/EN', open: true,
    note: { pl: 'Darmowe pełne teksty „Fragmenta Faunistica”, „Fauny Polski” i innych prac.', en: 'Free full texts of “Fragmenta Faunistica”, “Fauna Polski” and more.' },
  },
  {
    id: 'ias', group: 'online', authors: 'IOP PAN Kraków', title: 'Gatunki obce w Polsce – Blattella germanica',
    url: 'https://www.iop.krakow.pl/ias/species/687', lang: 'PL/EN', open: true,
    note: { pl: 'Oficjalna karta gatunku obcego dla karaczana prusaka.', en: 'The official alien-species profile of the German cockroach in Poland.' },
  },
];
