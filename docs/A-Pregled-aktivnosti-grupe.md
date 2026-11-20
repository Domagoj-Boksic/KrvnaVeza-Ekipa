# A. Pregled aktivnosti grupe

## A.1 Evidencija sastanaka
EP = Ema Pavić; DB = Domagoj Bokšić; MJ = Mihael Jakšić; JSN = Jakov Szavits Nossan; DG = Daniel Grubeša; LJG = Ljubo Grubišić.
		

| Datum i sudionici | Glavna tema | Donesena odluka ili zadatak  | Poveznica na zadatak ili  rezultat, ako postoji |
| --- | --- | --- | --- |
| 22.10.2026. - EP, DB, LJG, MJ, JSN, DG | Podjela uloga | Podijeljenje uloge (backend = DG, LJG, MJ ; frontend = EP, DB, JSN). EP i DB uređuju početnu dokumentaciju. DB i LJG početni izgled stranice. | Zadatci #1 i #2  |
| 29.10.2026. - EP, DB, LJG, MJ, JSN, DG | Podjela poslova za početni izgled sustava. | OAuth2.0 autorizacija, frontend i baza podataka. | Zadatci #3 i #4 |
| 10.11.2026. - EP, DB, LJG, MJ, JSN, DG | Izgled i funkcionalnosti web stranice, nadodavanje potrebne dokumentacije | Autorizacija(MJ), deploy baze podataka na cloud(LJG i DG), uređivanje izgleda stranice prijave i karte(DB, DG i JSN) te dokumentacija(EP) | Stvorene nove grane, riješen je deploy i dokumentacija je potpuna |
| 16.11.2026. - EP, DB, LJG, MJ, JSN, DG | Završne dorade prije 1. predaje | Dokumentacija(EP, DG i JSN), merge grana na main, provjera ispravnosti | Od #5 zadatka do #17 sve relevantno da 1. iteracija bude spremna za predaju |


## A.2 Plan rada


**Trenutačni plan:**

| Razdoblje/Tjedan | Glavni planirani rad | Odgovorni članovi | Poveznica na zadatke |
| --- | --- | --- | --- |
| 3. Tjedan | Jezgra baze podataka i dokumentacija | EP, DB, LJG | #1 #2 |
| 4. Tjedan | Baza podataka, OAuth2.0 | EP, DB, LJG, MJ, JSN, DG | #3 #4|
| 5. Tjedan | Dokumentacija 3, izgled stranice | EP, DB, MJ| #5 #6 #7|
| 6. Tjedan | Dokumentacija 4, homepage, prijava u sustav | DB, JSN, DG| #8 #9 #10 |
| 7. Tjedan | Funkcionalnost ( karta i lokacije transfuzijskih centara na njoj ), dokumentacija, merge grana na main | EP, DB, LJG, MJ, JSN, DG | #8 - #17|


## A.3 Aktivnosti i doprinosi članova

| Aktivnost ili rezultat | Član | Prijavljeni sati | Reprezentativni rezultat ili poveznica |
| --- | --- | --- | --- |
| Pisanje dokumentacije  | EP  | 7  | Zadatci #1 i #2 |
| Pisanje dokumentacije | DB | 2 | Zadatci #1, #2 i #3 |
| Izrada frontenda | DB | 5 | Oblikovana osnovna struktura i objašnjena u readme fileovima, api poveznica s backendom |
| Izrada frontenda | DB | 2 | Stiliziranje AuthPage-a, uvezena karta te preporuka za hendlanje uloga |
| Izrada baze podataka | EP | 2 | Zadatak #3 | 
| Pisanje dokumentacije | EP | 7 | Zadatci #8 i #11: Obrasci uporabe |
| Proučavanje OAuth 2.0, OpenID Connecta i biblioteke Passport.js | MJ | 5 | Upoznao sam način rada prijave putem Googlea i odlučili smo se za tok u kojem prijavu vodi backend, a prijavljeni korisnik se pamti u sesiji |
| Postavljanje Google OAuth klijenta | MJ | 1 | Napravio sam projekt i OAuth klijent u Google Cloud Consoleu, dodao povratne adrese i testne korisnike te predložak `backend/.env.example` |
| Izrada prijave putem Googlea na backendu | MJ | 6 | Zadatak #4; napravio sam rute za prijavu, povratak s Googlea, odjavu i dohvat prijavljenog korisnika (`/api/me`), zaštitu ruta za neprijavljene korisnike te privremenu pohranu korisnika u memoriji dok baza nije bila gotova |
| Povezivanje prijave s frontendom | MJ | 2 | Nakon prijave korisnik se vraća na početnu stranicu aplikacije umjesto na JSON odgovor; zajedno s DB spojeno kroz PR #13 i #14 |
| Popravak backenda nakon spajanja grana | MJ | 1 | Nakon spajanja PR #15 iz `backend/package.json` nestale su ovisnosti potrebne za pokretanje backenda pa sam ih vratio |
| Priprema podataka o prijavi za UML dijagrame | MJ | 1 | JSN-u sam poslao opis toka prijave, sudionika i mogućih grešaka te izvor sekvencijskog dijagrama prijave |
| Izrada baze podataka | LJG | 10 | Zadatak #3 |
| Baze podataka | DG | 6 |  Zadatak #3 i prebacivanje baze na cloud (Supabase) |
| Integracija baze s frontendom | DG | 4 | Implementacija backend API endpointa /api/centri |
| Dokumentacija | EP | 10 | Pregled dokumentacije, nadopuna readme predloška, uređivanje zahtjeva i obrazaca uporabe |
| Vođenje projekta | EP | 8 | Pisanje issuea, raspodjela poslova, pisanje dokumentacije vezano uz sastanke i uloge te završna predaja |


## A.4 Pregled promjena u repozitoriju

Pogledajte [GitHub Contributors Graph](https://github.com/Domagoj-Boksic/KrvnaVeza-Ekipa/graphs/contributors?selectedMetric=commits) za pregled aktivnosti.

## A.5 Ključni inženjerski izazovi i rješenja

| Izazov | Poduzeta radnja | Ishod ili preostalo ograničenje |
| --- | --- | --- |
| Odabir osnovnih ruta i autentikacija | Odabrane rute '/' i '/login'. Kad korisnik odabere "Nastavi kao gost" vodi ga na '/'. Uloge još nisu razrađene | Problem kad se otvori stranica vodi se direktno na HomePage prije prijave. Moguća rješenja novonastalog problema: 1. Svi ulaze kao gost na HomePage gdje imaju opciju prijave. Nakon prijave se sadržaj rendera na jednoj ruti ovisno o ulozi 2. Pri prvom učitavanju rute '/' linkat na '/login' i imat dodatnu rutu koja vodi na HomePage u ovisnosti u ulozi korisnika. 3. Nekakva kombinacija prethodne dvije točke? |
| Nakon prijave putem Googlea korisnik je završavao na sirovom JSON odgovoru `/api/me` umjesto u aplikaciji | MJ je preusmjeravanje nakon prijave promijenio na adresu klijentskog dijela (`FRONTEND_URL`), a povratnu adresu Googlea na `localhost:5173` preko Vite proxyja; neuspjela prijava vodi na `/login?prijava=neuspjeh` | Prijava lokalno vodi na početnu stranicu; za javno postavljanje potrebno je dodati produkcijsku povratnu adresu u Google Cloud Console |
| Nakon spajanja grane baze podataka (PR #15) poslužiteljski dio nije se mogao pokrenuti na novom računalu (`Cannot find module 'dotenv'`) | MJ je utvrdio da je pri razrješavanju konflikta `backend/package.json` zamijenjen inačicom bez ovisnosti za prijavu te ih je vratio uz zadržavanje `nodemon` ovisnosti | Poslužiteljski dio ponovno se pokreće nakon `npm install`; tim je dogovorio da se pri konfliktu u `package.json` zadržavaju ovisnosti obiju strana |

---

