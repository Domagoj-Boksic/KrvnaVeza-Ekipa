# 2. Analiza zahtjeva

U ovom poglavlju opisani su funkcijski i nefunkcijski zahtjevi sustava KrvnaVeza, njegovi dionici i akteri, ograničenja i pretpostavke te povezanost zahtjeva s obrascima uporabe. Zahtjevi su definirani na temelju projektnog zadatka i predstavljaju osnovu za projektiranje, implementaciju i ispitivanje sustava.

## 2.1 Funkcijski zahtjevi

| ID | Opis | Prioritet | Izvor | Kriteriji prihvaćanja |
| --- | --- | --- | --- | --- |
| F-001 | Sustav omogućuje korisnicima registraciju i prijavu putem Google OAuth 2.0 protokola koristeći tokene. | Visok | Projektni zadatak | Korisnik se može registrirati putem Google računa, bit će preusmjeren na odgovarajući profil, a kasnije se može prijaviti bez ponovne registracije. |
| F-002 | Sustav omogućuje prikaz karte i lokacije transfuzijskih centara, najavljenih akcija darivanja za neregistrirane i registrirane korisnike. | Visok | Projektni zadatak | Korisnik ima pregled karte i lokacija neovisno o registraciji. |
| F-003 | Sustav omogućuje prikaz zaliha za neregistrirane i registrirane korisnike. | Visok | Projektni zadatak | Korisnik ima pregled zaliha neovisno o registraciji. |
| F-004 | Sustav omogućuje korisniku darivatelju unos svojih osobnih podataka. Sustav krvnu grupu označuje kao neprovjerenu | Visok | Projektni zadatak | Korisnik darivatelj može nakon registracije ispuniti svoje podatke i oznaka neprovjeren se uklanja kada djelatnik potvrdi. |
| F-005 | Sustav za svakog darivatelja izračunava datum od kojeg ponovno smije darivati. | Visok | Projektni zadatak | Darivatelju su ponuđeni datumi darivanja ovisno o izračunu kada može darivati. |
| F-006 | Sustav omogućuje darivatelju rezervaciju termina u centru ili prijavu na terensku akciju uz ispunjavanje upitnika | Visok | Projektni zadatak | Darivatelj ovisno o podobnosti može rezervirati termin. Upisuje se u GoogleCalendar darivatelja i generira se QR kod. Otkazivanje je moguće do dva sata prije početka. |
| F-007 | Sustav omogućuje djelatniku definiranje radnog vremena i kapaciteta termina te upravljanje tokom termina. | Visok | Projektni zadatak | Djelatnik transfuzijskog centra ima pristup i može unositi i definirati radno vrijeme i kapacitet. Upravlja tokom termina kako pregled napreduje |
| F-008 | Sustav omogućuje djelatniku evidentiranje dolazaka skeniranjem QR koda. | Visok | Projektni zadatak | Djelatniku radi skeniranje QR koda, a darivatelju je generiran QR kod. Djelatnik transfuzijskog centra unosi evidenciju dolaznosti i razlog zašto je potencijalni darivatelj odbijen. |
| F-009 | Sustav šalje obavijest s popisom termina i akcija darivatelju kad postane ponovno podoban | Visok | Projektni zadatak | Nakon prolaska izračunatog vremena nepodobnosti sustav obavještava darivatelja da može ponovno darivati krv. Prosljeđuje mu popis akcija i termina u njegovoj blizini. |
| F-010 | Sustav darivatelja prebacuje na kratki upitnik prije same rezervacije nakon kojeg ga upozorava ako vjerojatno neće moći darivati | Visok | Projektni zadatak | Prije same rezervacije termina darivatelju je priložen kratki upitnik. Njegovim odgovorima sustav određuje vjerojatnost odbijanja darivanja na pregledu i upozorava darivatelja. |
| F-011 | Sustav omogućuje djelatniku upravljanje prikupljenim dozama. | Visok | Projektni zadatak | Djelatnik regulira stanje doze kroz proces pregleda i testiranja. |
| F-012 | Sustav računa zalihe iz prikupljenih i odobrenih doza. | Visok | Projektni zadatak | Sustav ažurira stanje zaliha računanjem aktualnih doza. |
| F-013 | Sustav omogućuje darivatelju pregled povijesti njegovog darivanja. | Srednji | Projektni zadatak | Svako darivanje je evidentirano i sačuvano kako bi korisnici mogli pregledati svoju povijest darivanja. |
| F-014 | Nakon pada zaliha ispod kritične razine sustav predlaže djelatniku hitni poziv na darivanje te pregledava statistiku darivanja nakon. | Visok | Projektni zadatak | Kad zalihe padnu u kritično područje sustav predlaže hitni poziv na koji se djelatnici mogu odazvati. Nakon darivanja hitnog poziva sustav pregleda statistiku. |
| F-015 | Sustav omogućuje organizatoru akcija predlaganje akcija te unos podataka o akciji (lokacija, vrijeme, datum...) i pregled statistike. | Visok | Projektni zadatak | Organizator ima mogućnost prijedloga akcije darivanja. Unosi podatke o akciji kako bi korisnici znali gdje je i kada. Nakon akcije ima pristup statistici darivanja. |
| F-016 | Sustav djelatniku omogućuje prihvaćanje predložene akcije i slanje mobilnog tima te odbijanje akcije uz obrazloženje. | Visok | Projektni zadatak | Nakon što organizator predloži akciju djelatnici imaju mogućnost prihvaćanja i odbijanja. Ako prihvate šalju mobilni tim, ako odbiju prilažu objašnjenje zašto odbijaju. |
| F-017 | Sustav dodjeluje darivatelju značke nakon jubilarnih darivanja. | Nizak | Projektni zadatak | Nakon određenih jubilarnih darivanja sustav dodjeluje značke profilu darivatelja. |
| F-018 | Sustav omogućuje darivatelju preuzimanje potvrde darivanja u PDF formatu. | Srednji | Projektni zadatak | Nakon odrađenog uspješnog darivanja darivatelj ima pristup potvrdi darivanja u PDF formatu. |
| F-019 | Sustav omogućuje djelatniku pregled podataka o zalihama te mogućnost izvoza podataka u CSV formatu | Srednji | Projektni zadatak | Djelatnik ima pristup stranici "Statistika" gdje može vidjeti kretanje zaliha po krvnim grupama u vremenu, prosječnu dnevnu potrošnju, procjenu dana do nestašice. Također može navedeno izvesti u CSV formatu. |
| F-020 | Sustav omogućuje adminu održavanje platforme | Visok | Projektni zadatak | Admin može upravljati korisnicima i transfuzijskim centrima, podešava parametre pravila podobnosti i pragove zaliha te pregled statistike korištenja sustava te deaktivirati korisnički račun |
| F-021 | Sustav mora omogućiti administratoru dodjeljivanje i promjenu korisničkih uloga. Te promjene se moraju evidentirati u sustavu. | Visok | Projektni zadatak | Provjeriti dodjeljuju li se i pamte uloge korisnika prijavljenih u sustav. |

## 2.2 Nefunkcijski zahtjevi

| ID | Opis | Prioritet | Izvor | Način provjere |
| --- | --- | --- | --- | --- |
| NF-01 | Kompatibilnost s mobitelima | Visok | Projektni zadatak | Testirati aplikaciju pri širini od 360px u različitim web-preglednicima. |
| NF-02 | Sigurnost korisničkih podataka  | Visok | Projektni zadatak | Provjeriti pristup s drugih računa tj. neovlaštenim korisnicima te pregledati zapisnik pristupa. |
| NF-03 | Zakonska usklađenost (GDPR) - podaci obrisanih korisnika moraju biti trajno anonimizirani | Visok | Projektni zadatak | Pokrenuti zahtjev brisanja računa te uz izravan pristup bazi provjeriti jesu li podaci (npr. ime, prezime) anonimizirani |
| NF-04 | Performanse ( vrijeme odziva ) - bez ručnog osvježavanja zaliha | Visok | Projektni zadatak | Promjena vidljiva svim korisnicima unutar 5 sekundi bez osvježavanja. |
| NF-05| Sigurnost ( Autorizacija ) - uloge | Visok | Projektni zadatak | Testiranje slanjem direktnih API zahtjeva i npr. testiranje može li uloga korisnik uređivati zaliha ili će izbaciti grešku |
| NF-06 | Pouzdanost i otpornost na greške - obavijestiti korisnika o nedostupnosti vanjske usluge ili prekidu veze | Srednji | Projektna pretpostavka | Simuliranje takvih nedostupnosti vanjskih usluga i provjera ponašanja sustava. |
| NF-07 | Integritet i sljedivost podataka doza krvi - imaju svoj id i status | Visok | Projektni zadatak| Analizirati zapise u bazi podataka, provjeriti kronološki slijed svih doza i njihovih statusa. |
| NF-08 | Sigurnost ( Autentifikacija ) - Aplikacija mora koristiti sigurnosni protokol OAuth 2.0 za zaštitu korisničkih podataka. (A-01 do A-04) | Visok | Projektni zadatak | Provjera mogućnosti prijave i redirect na Google sučelje za prijavu. |
| NF-09 | Dostupnost - kritične funkcije (hitni pozivi, zalihe i podaci darivatelja) dostupni tijekom demonstracije i testnog razdoblja | Visok | Projektna pretpostavka | Pratiti dopstupnost kritičnih funkcija tijekom testnog razdoblja putem dostupnih alata na webu |
| NF-10 | Upotrebljivost - jezik sučelja hrvatski | Srednji | Projektna pretpostavka | Pregled korisničkog sučelja |
| NF-11 | Intuitivnost - jednostavno korištenje web-aplikacije (jasni nazivi, opis dostupnih funkcionalnosti, upute za korištenje web-aplikacije s navedenim koracima korištenja) | Srednji | Projektna pretpostavla | Testiranje s pet osoba koje ne poznaju sustav: svaka mora samostalno bez pomoći prijaviti se u sustav i izvršiti rezervaciju na jedan od ponuđenih termina |


## 2.3 Dionici i akteri


| ID uloge ili aktera | Odnos prema sustavu | Relevantni zahtjevi |
| --- | --- | --- |
| A-01 | Darivatelj krvi | F-001, F-004, NF-03, F-005, F-006, F-010, F-013, F-018: Uređuje profil, provjerava podobnost, rezervira termine, pregled povijesti, preuzimanje potvrde i ispunjava upitnik. |
| A-02 | Djelatnik centra | F-007, F-008, F-011, F-012, F-014, F-016, F-019: Upravlja terminima, evidentira dolaske, doze i zalihe te odobrava hitne obavijesti. | 
| A-03 | Organizator | F-015: Predlaže akcije, prati prijave, prati aktivnosti.  |
| A-04 | Administrator | F-020, F-021: Upravlja korisnicima, centrima, korisničkim ulogama, pravilima podobnosti i granicama zaliha. |
| A-05 | Posjetitelji | F-002, F-003: Bez prijave pregledava karte, najavljene akcije i zalihe krvi. |


---

## 2.4 Ograničenja i pretpostavke

| ID | Tip | Opis ograničenja ili pretpostavke | Izvor | Inženjerska posljedica / Provjera |
| --- | --- | --- | --- | --- |
| C-01 | Ograničenje | Projektni zadatak zahtijeva autorizaciju preko OAuth 2.0 protokola koristeći tokene | Projektni zadatak | Odraditi autorizaciju preko zadanog protokola |
| C-02 | Ograničenje | Obrada i unos osjetljivih zdravstvenih podataka darivatelja. | Zakonski propisi | Pristup podacima strogo kontroliran preko uloga i dozvola. |
| AS-01 | Pretpostavka | Korisnici imaju pristup internetu. | Procjena tima  | Planirati pristup značajkama bez interneta. |
| AS-02 | Pretpostavka | Korisnici koji dopuste sinkronizaciju s kalendarom imaju važeći Google račun.| Procjena tima | U slučaju da korisnik dopusti sinkronizaciju s kalendarom, a nema Google račun rezervacija termina će se uspješno izvršiti, ali će se preskočiti dio unosa u kalendar. |


---

## 2.5 Značajne promjene zahtjeva

| Datum | ID zahtjeva | Promjena i razlog | Dogovoreno s / dokaz |
| --- | --- | --- | --- |
|  |  |  |  |


## 2.6 Sljedivost zahtjeva

**Cilj:** Osigurati dvosmjernu sljedivost — povezati zahtjeve s opisanim ponašanjem, dijelovima sustava koji ih ostvaruju te ispitivanjem ili drugom provjerom. 

| ID zahtjeva | Obrazac uporabe / modul | Arhitekturna realizacija | Ispitivanje ili provjera |
| --- | --- | --- | --- |
| F-001 | UC-001: Registracija darivatelja krvi, UC-002:Prijava u sustav.| OAuth2.0,modul baze podataka za korisnika. | ST-01 Valjano podnošenje prijave; ST-02 Odbijanje nevaljanog tokena |
| F-002 | UC-004: Pristup gostima | Web sučelje, Google Maps API | ST-03 Prikaz karte i centara neregistriranim korisnicima |
| F-003 | UC-004: Pristup gostima | Modul zaliha, web sučelje | ST-04 Pregled zaliha za određenu krvnu grupu neregistriranim korisnicima |
| F-004 | UC-005: Uređivanje profila | Web sučelje, modul baze podataka | ST-05 Unos podataka i označavanje podataka kao neprovjerenim |
| F-005 | UC-006: Rezervacija termina/Prijava na akciju | Izračun podobnosti | ST-06 Provjera izračuna datuma |
| F-006 |UC-006: Rezervacija termina/Prijava na akciju ; UC-015: Sinkronizacija s kalendarom | Prijava na termine i akcije | ST-07 Rezervacija termina, generiranje QR koda i upis u kalendar|
| F-007 | UC-007: Upravljanje rasporedom i kapacitetom termina | definiranje radnog vremena i kapaciteta | ST-08 Unos i izmjena termina od strane djelatnika |
| F-008 | UC-008: Evidentiranje dolaska darivatelja | QR kod servis | ST-09 Skeniranje QR koda i obilježen dolazak ili razlog zašto je odbijen |
| F-009 | Pozadinski proces | Sustav obavijesti | ST-10 Provjera slanja obavijesti |
| F-010 | UC-014: Ispunjavanje upitnika| Popunjavanje podataka za izračun podobnosti | ST-11 Procjena rizika od odbijanja na terminu na temelju upitnika |
| F-011 | UC-011: Upravljanje dozama krvi | Modul za upravljanje dozama | ST-12 Ažuriranje statusa doza  |
| F-012 | UC-011: Upravljanje dozama krvi | Baza podataka  | ST-13 Automatski izračun zaliha na temelju odobrenih doza |
| F-013 | Na čekanju - UC još nije definiran | Baza podataka (darivatelj)| ST-14 Pristup prijavljenim korisnicima svojoj povijesti darivanja |
| F-014 | UC-010: Slanje hitnog poziva za darivanje | Pozadinski nadzor zaliha | ST-15 Automatska detekcija pada zaliha ispod kritične razine i slanje hitnog poziva |
| F-015 | UC-009: Predlaganje terenske akcije | Sučelje organizatora | ST-16 Organizator predlaže akciju s lokacijom i vremenom |
| F-016 | UC-009: Predlaganje terenske akcije | Sučelje djelatnika | ST-17 Prihvaćanje ili odbijanje akcije |
| F-017 | Sustav nagrađivanja | Modul znački | ST-18 Dodavanje jubilarnih znački |
| F-018 | Na čekanju - UC još nije definiran | Izvoz u PDF | ST-19 Generiranje valjane potvrde o darivanju|
| F-019 | UC-012: Izvoz statističkih podataka | Statistika, izvoz u CSV| ST-20 Izvoz statističkih podataka u CSV formatu |
| F-020 | UC-013: Upravljanje transfuzijskim centrima | Role-Based Access Control | ST-21 Upravljanje centrima i parametrima sustava |
| F-021 | UC-003: Upravljanje korisničkim ulogama | Korisničke uloge i audit log| ST-22 Promjena uloga i evidentiranje te iste promjene|

---

## 2.7 Pregled zahtjeva

**Cilj:** Zabilježiti važne povratne informacije o zahtjevima i odluke koje iz njih proizlaze na dvije formalne kontrolne točke projekta, u 7. i 14. tjednu.

| Kontrolna točka | Povratna informacija ili nalaz | Odluka o zahtjevu ili opsegu |
| --- | --- | --- |
| Iteracija 1 | [Povratna informacija] | [Odluka; vidi odjeljak 2.5] |
| Demo 2  | [Povratna informacija] | [Odluka; vidi odjeljak 2.5] |
| Završni pregled | [Povratna informacija] | [Odluka; vidi odjeljak 2.5] |

---


