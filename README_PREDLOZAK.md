<!--
PREDLOŽAK — README završnog projekta na kolegiju Programsko inženjerstvo FER-a.
Kopirajte ovu datoteku u README.md u repozitoriju svojeg projekta. Zamijenite
svaku uputu u uglatim zagradama činjenicama o svojem projektu, uklonite sve
komentare s uputama i ogledne <details> blokove te prije predaje izbrišite ovu
napomenu. Nemojte kopirati nastavni primjer kao rezultat svojeg projekta.
-->

# KrvnaVeza

Web aplikacija koja darivateljima krvi omogućuje pregled transfuzijskih centara i akcija darivanja na karti, rezervaciju termina te primanje obavijesti kada ponovno smiju darivati.

**Projekt na kolegiju:** Ovu je aplikaciju razvio studentski tim u sklopu kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu (FER).

## Opis aplikacije

KrvnaVeza povezuje darivatelje krvi, transfuzijske centre i organizatore terenskih akcija. Darivatelj vidi gdje i kada može darivati i rezervira termin, centar prati zalihe i po potrebi šalje hitne pozive, a organizator predlaže terenske akcije i prati njihovu statistiku. Navedene su samo funkcionalnosti koje su u opsegu projekta; planirane funkcionalnosti označene su u dokumentaciji.

**Ključne funkcionalnosti**

- Pregled transfuzijskih centara i terenskih akcija darivanja krvi na interaktivnoj karti
- Rezervacija željenog termina za darivanje krvi putem aplikacije

Za potpuni opseg, zahtjeve, oblikovanje i dokaze ispitivanja pogledajte [docs](docs/Home.md).

<a id="deployment"></a>
## Postavljanje (engl. deployment)

<!-- UPUTA: Ovaj odjeljak opisuje već postavljenu aplikaciju koju se  može otvoriti i isprobati bez lokalnog pokretanja izvornog koda.
Za Iteraciju 1 i Završni pregled navedite konkretne podatke. Provjerite vodi li URL na javno dostupnu pokrenutu aplikaciju i radi li navedeni tijek uporabe. Nikada ne objavljujte lozinke ni pristupne tokene. -->

**Javno dostupna aplikacija:** https://krvnaveza-10-4.onrender.com

**Isprobajte:** <br>
Prijava:<br>
Klik na profil -> Sign in -> Nastavi s Googleom<br>
Pregled podataka o transfuzijskom centru:<br>
Pronađite marker na karti -> kliknite ga<br>

**Demonstracija:** Korisnički račun nije potreban.

**Ograničenja:** Još nisu rješene uloge te se ne prikazuju podaci o zalihama

[Vodič za postavljanje i pokretanje](docs/6-Postavljanje-instalacija-i-konfiguracija.md) opisuje smještaj aplikacije (engl. hosting) koji tim stvarno koristi. Tim može koristiti Render ili drugu platformu koju ste dogovorili s asistentom/demonstratorom.

<a id="quick-start"></a>
## Brzi početak / instalacija

<!-- Obavezno od Demo 1 nadalje. Zamijenite mjesta za unos naredbama koje je drugi član tima uspješno provjerio nakon čistog kloniranja repozitorija. Detaljne upute za administraciju držite u projektnoj dokumentaciji u direktoriju docs/. -->

**Preduvjeti:** 
Node.js 20+, npm, Supabase baza podataka, Google OAuth klijent<br>

```bash
git clone https://github.com/Domagoj-Boksic/KrvnaVeza-Ekipa
cd KrvnaVeza-Ekipa
```
**Konfiguracija:** u mapi `backend` kopiraj `.env.example` u `.env` i upiši vlastite vrijednosti<br>

```bash
cd backend
cp .env.example .env
```

| Varijabla | Gdje se dobiva |
|---|---|
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Google Cloud Console → APIs & Services → Credentials |
| `GOOGLE_CALLBACK_URL` | `http://localhost:3000/auth/google/callback` (mora biti dodan i u Authorized redirect URIs u Google konzoli) |
| `FRONTEND_URL` | `http://localhost:5173` |
| `PORT` | `3000` |
| `SESSION_SECRET` | proizvoljan dugi nasumični niz |
| `SUPABASE_URL` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API Keys |

**Pokretanje** (dva terminala):
- u oba krenite iz korijena repozitorija

```bash
# Terminal 1
cd backend
npm install
npm start
```

```bash
# Terminal 2
cd frontend
npm install
npm run dev
```

**Adresa:** http://localhost:5173/

**Provjera:** otvori http://localhost:5173/. Trebala bi se prikazati karta s lokacijama transfuzijskih centara prikazanih markerima. Klikom na marker trebali bi se prikazati podaci o samom transfuzijskom centru.

## Tehnologije

| Tehnologija ili alat | Uloga u ovom projektu | Razlog uporabe ili važno ograničenje |
| --- | --- | --- |
| React (JavaScript) | Korisničko sučelje: karta, rezervacije, profil i sučelja za djelatnike, organizatore i administratore | Stanje zaliha i termina može se osvježavati bez ponovnog učitavanja stranice (NF-04) |
| Node.js | Poslužiteljski dio: API, prijava, izračun podobnosti, upravljanje dozama i zalihama | isti jezik na klijentu i poslužitelju |
|  PostgreSQL | Pohrana korisnika, termina, doza i povijesti darivanja | Doze moraju ostati sljedive i nakon anonimizacije računa (NF-03, NF-07) |
| Google OAuth 2.0 | Prijava korisnika putem tokena | Zahtjev projektnog zadatka (C-01); bez Google računa nema prijave |
| Google Maps API | Prikaz karte centara i akcija | Ovisi o vanjskoj usluzi; aplikacija mora javiti korisniku ako karta nije dostupna (NF-06) |
| Google Calendar API | Unos rezerviranog termina u kalendar | Opcionalno; rezervacija vrijedi i bez unosa u kalendar (AS-02) |

<details>
<summary><strong>Primjer: objašnjenje ključnih tehnoloških odluka</strong></summary>

**Primjer — CrisisMap:**

| Tehnologija ili alat | Uloga u ovom projektu | Razlog uporabe ili važno ograničenje |
| --- | --- | --- |
| React | Prikazuje obrazac za prijavu i kartu kriznih događaja u pregledniku. | Karta i poslane prijave mogu se ažurirati bez ponovnog učitavanja cijele stranice. |
| PostgreSQL | Pohranjuje prijave, lokacije i njihove odnose. | Zapisi o prijavama moraju ostati povezani s autorima i lokacijama; promjene sheme zahtijevaju migracije baze podataka (engl. database migrations). |
| Usluga kartografskih pločica (engl. map tile service) | Omogućuje prikaz karte u pregledniku. | Karta ovisi o vanjskoj usluzi; aplikacija mora imati definirano ponašanje i kada kartografske pločice nisu dostupne. |

**Analiza primjera:** Svaki redak opisuje ulogu ili posljedicu konkretne tehnologije u ovoj aplikaciji. Verzije paketa pripadaju datotekama s ovisnostima projekta; verzije izvršnog okruženja i konfiguracija važna za postavljanje pripadaju vodiču za instalaciju. Važne kompromise u oblikovanju (engl. design trade-offs) objasnite na stranici arhitekture u direktoriju `docs/` umjesto da ovdje ponavljate cijeli zapis odluke. Navodite samo usluge koje vaš tim stvarno integrira.

</details>

<a id="team-members"></a>
## Članovi tima

| Član | Glavna uloga ili doprinos |
| --- | --- |
| Ema Pavić | Dokumentacija 1,2,3 aktivnosti i readme predložak, baza podataka |
| Domagoj Bokšić | Frontend; postavljanje homepagea i prijave za prijenosna računala i mobitele te strukture dokumenata i izrade web-aplikacije |
| Mihael Jakšić | Backend; uspostava prijave preko Google OAuth2.0 tokena |
| Ljubo Grubišić | Baza podatka i deploy baze na cloud |
| Daniel Grubeša | Deploy baze i frontend (prikaz lokacija na karti), dokumantacija 4 |
| Jakov Szavits Nossan | Frontend i dokumentacija 4|

## Doprinos projektu

Zadaci i nedostaci vode se u [GitHub Issues](https://github.com/Domagoj-Boksic/KrvnaVeza-Ekipa/issues) 
Promjene se pregledavaju preko pull requestova.

<a id="license"></a>

**Status licence:** [Navedite licencu i postavite poveznicu na projektnu datoteku `LICENSE` ili izričito navedite da nije dodijeljena licenca koja dopušta javnu ponovnu uporabu. Namjeravani opseg provjerite s timom; nemojte prepisivati licencu predloška ove dokumentacije kao licencu svoje aplikacije.]

Dokumentacijski predložak kolegija sadrži otvorene obrazovne sadržaje (engl. Open Educational Resources, OER) i licenciran je licencom Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International. Ta licenca **ne određuje automatski licencu studentske aplikacije**; tim treba jasno navesti licencu svojeg projekta u prethodnom retku i datoteci `LICENSE`, ako je primjenjivo.

Kod trećih strana, skupovi podataka, slike, ikone i drugi sadržaji zadržavaju vlastite licence i uvjete uporabe. [Po potrebi postavite poveznicu na zahvale i izvore.]

<a id="ai-usage"></a>
## Uporaba umjetne inteligencije [![AI Usage: Disclosed](https://img.shields.io/badge/AI%20Usage-Disclosed-blue.svg)](https://www.fer.unizg.hr/_download/repository/Policy%20on%20the%20appropriate%20use%20of%20artificial%20intelligence%20at%20the%20faculty%20of%20electrical%20engineering%20and%20computing%5B1%5D.pdf)

Ovaj projekt slijedi FER-ova [pravila o primjerenoj uporabi umjetne inteligencije](https://www.fer.unizg.hr/_download/repository/Policy%20on%20the%20appropriate%20use%20of%20artificial%20intelligence%20at%20the%20faculty%20of%20electrical%20engineering%20and%20computing%5B1%5D.pdf).

**Izjava:** [Navedite jesu li korišteni alati umjetne inteligencije. Ako jesu, navedite alate i njihove glavne namjene te objasnite kako je tim pregledao nastali kod ili tekst i kako može objasniti vlastiti doprinos. Ako nisu korišteni, to jasno navedite. U alate umjetne inteligencije nemojte unositi privatne podatke, pristupne podatke ni tuđe zaštićene materijale.]

[Ako je za ovaj projekt potreban detaljniji zapis uporabe umjetne inteligencije, postavite poveznicu na njegovo jedinstveno mjerodavno mjesto u dokumentaciji.]

<a id="code-of-conduct-and-support"></a>
## Kodeks ponašanja i podrška [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

Od članova tima očekuje se pridržavanje **Kodeksa ponašanja studenata** Fakulteta elektrotehnike i računarstva Sveučilišta u Zagrebu, pravila timskog rada na kolegiju i [Etičkog kodeksa IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html). [Postavite poveznicu na `CODE_OF_CONDUCT.md` ako se ta datoteka koristi u vašem repozitoriju.]

---

Struktura dokumentacije prilagođena je predlošku kolegija Programsko inženjerstvo FER-a autora [Vlade Sruka](https://www.fer.unizg.hr/vlado.sruk), licenciranom pod [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Aplikaciju i njezin sadržaj izradio je gore navedeni studentski tim.
