# Blattodea.pl

Strona hodowli karaczanów: cennik, profile hodowlane, blog i klucz do karaczanów Polski. Jest w dwóch językach (PL i EN).
Zbudowana w [Astro](https://astro.build) jako strona statyczna.

## Uruchomienie

```sh
npm install
npm run dev      # podgląd na http://localhost:4321
npm run build    # sprawdzenie typów i zbudowanie strony do dist/
```

## Gdzie co edytować

| Co | Plik |
| --- | --- |
| Dane kontaktowe, data aktualizacji cennika, zasady wysyłki | `src/data/site.ts` |
| Cennik | `src/data/pricelist.yaml` |
| Profile hodowlane (karta parametrów i galeria) | `src/content/species/<gatunek>.yaml` |
| Opis gatunku własnymi słowami (opcjonalny) | `src/content/species-notes/pl/<gatunek>.md` i `en/<gatunek>.md` |
| Wpisy na blogu | `src/content/blog/pl/<wpis>.md` i `en/<wpis>.md` (ta sama nazwa pliku = tłumaczenie) |
| Klucz do karaczanów Polski (cechy i gatunki) | `src/data/key.ts` |
| Napisy w interfejsie (PL/EN) | `src/i18n/ui.ts` |
| Zdjęcia | `public/images/species/<gatunek>/…`, `public/images/blog/…` |

Treści przykładowe mają `sample: true` i na stronie są oznaczone jako „Dane przykładowe”. Usuń tę flagę, gdy dane są prawdziwe.

Pozycja w cenniku z polem `profile:` ma link do profilu. Profil gatunku obecnego w cenniku pokazuje ceny i dostępność.

## Publikacja (Vercel i domena w OVH)

1. Zaimportuj repozytorium na [vercel.com/new](https://vercel.com/new). Astro zostanie wykryte automatycznie.
2. W projekcie na Vercelu otwórz **Settings → Domains** i dodaj `blattodea.pl` oraz `www.blattodea.pl`.
3. W panelu OVH otwórz **Domeny → blattodea.pl → Strefa DNS** i ustaw:
   - rekord `A` dla `blattodea.pl` (pole subdomeny puste) na `76.76.21.21`, a stare rekordy `A` i `AAAA` dla domeny głównej usuń,
   - rekord `CNAME` dla `www` na `cname.vercel-dns.com.`.
4. Poczekaj, aż DNS się odświeży (zwykle do kilku godzin). Vercel sam wystawi certyfikat HTTPS.

Każda zmiana wypchnięta na gałąź główną publikuje się automatycznie.
