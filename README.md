# Blattodea.pl

Strona hodowli karaczanów: cennik, profile hodowlane, poradniki, blog, klucz i karty karaczanów Polski, kalendarz obserwacji, biblioteka. Jest w trzech językach: PL, EN i DE (adresy `/en/…` i `/de/…`).

Tłumaczenia: napisy interfejsu są w `src/i18n/ui.ts`, teksty stron w plikach `src/views/*.astro` (obiekty `pick(lang, { pl, en, de })`). Treści (profile, poradniki, wpisy, klucz) mają wersje `pl` i `en`; gdy brakuje niemieckiej (`de`), strona pokazuje angielską.
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

### Cennik

Każdy gatunek jest sprzedawany w paczkach po 10 sztuk w jednym wariancie: nimfy, mix (nimfy i imago) albo imago. Przykładowa pozycja w `src/data/pricelist.yaml`:

```yaml
- id: blaptica-dubia
  latin: Blaptica dubia
  profile: blaptica-dubia   # opcjonalnie: link do profilu hodowlanego
  status: available         # available | low | out | soon
  stage: mix                # nymph (nimfy) | mix (nimfy + imago) | adult (imago)
  price: 18                 # cena w zł za paczkę 10 szt.
```

Strona /cennik/ to prosta lista: nazwa łacińska, co jest w paczce i cena za 10 szt. Kliknięcie nazwy otwiera profil hodowlany gatunku (pole `profile`), gdzie klient dodaje paczkę do koszyka albo zamawia od razu. Gatunek bez `profile` jest na liście bez linku.

### Zdjęcia z Wikimedia Commons

Zdjęcia gatunków są w `src/data/photos.ts`. Każde ma nazwę pliku na Commons, autora i licencję, a strona podpisuje je automatycznie. Własne zdjęcia z `gallery:` w profilu mają pierwszeństwo przed zdjęciem z Commons.

## Publikacja (Vercel i domena w OVH)

1. Zaimportuj repozytorium na [vercel.com/new](https://vercel.com/new). Astro zostanie wykryte automatycznie.
2. W projekcie na Vercelu otwórz **Settings → Domains** i dodaj `blattodea.pl` oraz `www.blattodea.pl`.
3. W panelu OVH otwórz **Domeny → blattodea.pl → Strefa DNS** i ustaw:
   - rekord `A` dla `blattodea.pl` (pole subdomeny puste) na `216.198.79.1`, a stare rekordy `A` i `AAAA` dla domeny głównej usuń,
   - rekord `CNAME` dla `www` na adres podany przez Vercel w **Settings → Domains** (np. `48d1dbff176cd3ce.vercel-dns-017.com.`).
4. Poczekaj, aż DNS się odświeży (zwykle do kilku godzin). Vercel sam wystawi certyfikat HTTPS.

Każda zmiana wypchnięta na gałąź główną publikuje się automatycznie.

## Panel do edycji (/admin)

Cennik, wpisy na blogu, profile gatunków, galerię i obserwacje na mapie można edytować w przeglądarce pod adresem **https://blattodea.pl/admin/** (panel [Decap CMS](https://decapcms.org)). Każdy zapis w panelu to commit w repozytorium `Friedrich-von-Karma/newstuff` na gałęzi `main` – Vercel sam przebudowuje stronę i po ok. 1 minucie zmiany są widoczne.

Logowanie odbywa się przez GitHub. Trzeba je raz skonfigurować:

1. **Utwórz aplikację OAuth na GitHubie:** GitHub → zdjęcie profilowe → **Settings → Developer settings → OAuth Apps → New OAuth App**:
   - *Application name*: `Blattodea.pl – panel`
   - *Homepage URL*: `https://blattodea.pl`
   - *Authorization callback URL*: `https://blattodea.pl/api/callback`
   
   Kliknij **Register application**, skopiuj **Client ID**, potem **Generate a new client secret** i skopiuj sekret (widać go tylko raz).
2. **Dodaj zmienne w Vercelu:** projekt → **Settings → Environment Variables** → dodaj dwie zmienne (środowisko *Production*):
   - `OAUTH_GITHUB_CLIENT_ID` = Client ID z kroku 1
   - `OAUTH_GITHUB_CLIENT_SECRET` = Client secret z kroku 1
   
   Następnie **Deployments → ⋯ przy najnowszym → Redeploy**, żeby zmienne zaczęły działać.
3. **Wejdź na https://blattodea.pl/admin/** i kliknij przycisk logowania przez GitHub (otworzy się okienko GitHuba – zatwierdź dostęp). Konto GitHub musi mieć dostęp do zapisu w repozytorium `Friedrich-von-Karma/newstuff` (właściciel albo współpracownik).
4. Wybierz dział po lewej (np. **Cennik**), zmień dane i kliknij **Opublikuj**. Strona przebuduje się sama w ok. 1 minutę.

Jak to działa technicznie: `public/admin/index.html` ładuje panel, `public/admin/config.yml` opisuje działy i pola, a logowanie obsługują dwie funkcje serwerowe `src/pages/api/auth.ts` i `src/pages/api/callback.ts` (adapter `@astrojs/vercel`; reszta strony pozostaje statyczna). Uwaga: przy zapisie z panelu komentarze `#` w plikach YAML (np. w `src/data/pricelist.yaml`) mogą zniknąć – to normalne.

### Zdjęcia i filmy w galerii „Z mojej hodowli” (/galeria/)

**Przez panel:** `/admin/` → **Galeria „Z mojej hodowli”** → **Nowy** → wpisz tytuł (PL i EN), wybierz rodzaj (zdjęcie / film), wgraj plik (trafi do `public/images/hodowla/`), opcjonalnie podpis, gatunek (nazwa pliku profilu, np. `blaptica-dubia` – wtedy pod zdjęciem pojawi się link do profilu) i datę → **Opublikuj**.

**Ręcznie:**

1. Wrzuć plik (`.jpg`, `.webp`, `.mp4`) do `public/images/hodowla/`. Zdjęcia najlepiej zmniejsz do ok. 2000 px szerokości, a filmy do kilkudziesięciu MB – większe lepiej wrzucić na YouTube.
2. Dodaj plik YAML w `src/content/gallery/`, np. `2026-11-02-dubia-nimfy.yaml`:

```yaml
kind: photo                    # photo (zdjęcie) albo video (film)
title: { pl: "Nimfy Blaptica dubia", en: "Blaptica dubia nymphs" }
src: /images/hodowla/dubia-nimfy.jpg
caption: { pl: "Świeżo po linieniu.", en: "Freshly moulted." }   # opcjonalnie
species: blaptica-dubia        # opcjonalnie – link do profilu gatunku
date: 2026-11-02
```

Film z YouTube: zamiast `src` wpisz `youtube: dQw4w9WgXcQ` (identyfikator z adresu filmu, to co po `v=`); miniatura pobierze się sama, a własną można podać w `poster:`. Film z pliku `.mp4` też może mieć `poster:` (obrazek pokazywany przed odtworzeniem).

Trzy wpisy z `sample: true` (bez pliku) to przykłady – na stronie mają ramkę „miejsce na Twoje zdjęcie” i dopisek „przykład”. Usuń je, gdy dodasz własne materiały.
