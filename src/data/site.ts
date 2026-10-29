/** Ustawienia strony i dane kontaktowe. */
export const site = {
  name: 'Blattodea.pl',
  url: 'https://blattodea.pl',
  author: 'Blattodea.pl',

  contact: {
    email: 'mikolaj.stachowiak@blattodea.pl',
    facebook: 'https://www.facebook.com/primarchgodot/',
    facebookName: 'primarchgodot',
    messenger: 'https://m.me/primarchgodot',
    instagram: 'https://www.instagram.com/insectastic/',
    instagramName: '@insectastic',
  },

  /**
   * Orientacyjny kurs euro (zł za 1 €) – do cen „≈ €” w wersji angielskiej.
   * Zmień, gdy kurs się wyraźnie przesunie.
   */
  eurRate: 4.25,

  /** Wysyłka za granicę (strona /wysylka/). */
  international: {
    pl: [
      'Wysyłam do krajów Unii Europejskiej – przed zamówieniem napisz, do jakiego kraju, a podam koszt i termin wysyłki.',
      'Paczki zagraniczne idą kurierem ekspresowym, żeby były w drodze jak najkrócej; termin ustalam tak, by nie trafiły na weekend.',
      'Ceny w cenniku są w złotych; kwoty w euro przy wersji angielskiej są orientacyjne. Płatność przelewem (SEPA) przed wysyłką.',
      'Przed zamówieniem sprawdź przepisy swojego kraju dotyczące przywozu żywych bezkręgowców – za ich zgodność odpowiada odbiorca.',
    ],
    en: [
      'I ship to European Union countries – before ordering, write to me with your country and I will quote the cost and shipping date.',
      'International parcels go by express courier so they spend as little time in transit as possible; I plan the date so they never sit over a weekend.',
      'Prices on the price list are in Polish złoty; the euro amounts shown are approximate. Payment by bank transfer (SEPA) before shipping.',
      'Before ordering, please check your country’s rules on importing live invertebrates – compliance is the buyer’s responsibility.',
    ],
  },

  /** Zasady wysyłki, odbioru i płatności pokazywane pod cennikiem. */
  shipping: {
    pl: [
      'Wysyłka kurierem z ociepleniem lub chłodzeniem zależnie od pogody, od poniedziałku do środy – paczki nie leżą w sortowni przez weekend.',
      'Przy temperaturach poniżej 0 °C lub powyżej 30 °C wysyłki wstrzymuję albo dodaję ogrzewacz lub wkład chłodzący.',
      'Możliwy odbiór osobisty – po wcześniejszym umówieniu.',
      'Płatność przelewem lub BLIK-iem przed wysyłką.',
      'Gwarantuję żywe dotarcie zwierząt. Jeśli coś pójdzie nie tak, prześlij zdjęcie zawartości paczki w dniu odbioru.',
    ],
    en: [
      'Courier shipping with heat packs or cool packs depending on the weather, Monday to Wednesday only – so parcels never sit in a depot over the weekend.',
      'Below 0 °C or above 30 °C I pause shipping or add a heat pack or cool pack.',
      'Local pickup is possible by appointment.',
      'Payment by bank transfer or BLIK before shipping. International orders – please ask first.',
      'Live arrival is guaranteed. If anything goes wrong, send a photo of the opened parcel on the day of delivery.',
    ],
  },
} as const;
