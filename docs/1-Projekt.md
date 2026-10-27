# 1. Opseg projekta

**Cilj:** Objasniti odobreni projektni zadatak vlastitim riječima tima. Čitatelj treba razumjeti problem, ciljane korisnike, cilj projekta i njegove granice bez prethodnog čitanja detaljnih zahtjeva.

## 1.1 Problem i cilj projekta

**Cilj:** Jasno razgraničiti problem koji se rješava od predloženog rješenja i stvarne koristi za korisnika.

Bolnice svakodnevno trebaju krv za operacije, liječenje onkoloških bolesnika i zbrinjavanje hitnih stanja. Krv se ne može proizvesti, a njezini sastojci imaju ograničen rok trajanja, pa zalihe moraju stalno obnavljati dobrovoljni darivatelji.
Zalihe pritom nisu stabilne: ljeti i u vrijeme blagdana darivatelja je manje, a zaliha pojedinih krvnih grupa, osobito negativnih, zna pasti ispod kritične razine.
Mnogi bi darivatelji češće darivali krv kad bi znali kada ponovno smiju darivati, gdje se i kada održava najbliža akcija darivanja i da je upravo njihova krvna grupa trenutno potrebna. 
Postojeći sustavi oslanjaju se na zastarjele metode obavještavanja darivatelja (telefonski pozivi, plakati i poruke) koje ne dopiru do svih, dok se evidencija darivanja vodi odvojeno od informacija koje su darivateljima dostupne.
Cilj je stvoriti funkcionalnu platformu koja povezuje darivatelje krvi, transfuzijske centre i organizatore terenskih akcija darivanja. 
Darivatelj na njoj vidi kada i gdje može darivati i rezervira termin, centar prati zalihe i u slučaju potrebe ciljano poziva odgovarajuće darivatelje, a organizator akcija lakše planira akcije i prati odaziv.

## 1.2 Ciljani korisnici i dionici


**Cilj:** Utvrditi osobe, uloge i organizacije čije potrebe i interesi određuju projektni zadatak.

| Skupina korisnika ili dionika | Potreba ili interes relevantan za ovaj projekt |
| --- | --- |
| Građanin  | Pregled lokacija i slobodnih termina, rezervacija termina, primanje obavijesti i podsjetnika te pregled povijesti darivanja|
| Djelatnik | Kapacitet termina, radno vrijeme, potvrđivanje krvne grupe, unos i promjena zaliha, odobravanje hitnog poziva i određuje područje na koje se šalje, prihvaća ili odbija sudjelovanje na nekoj od akcija.  |
| Organizator akcija | Predlaganje terenskih akcija, za svaku akciju određuje vrijeme, lokaciju, datum i očekivani broj darivatelja, dodjela priznanja, |
| Administrator | Upravljanje korisnicima, dodjelivanje uloga, podešavaju parametre pravila podobnosti i pragove zaliha, pregled statistike korištenja sustava |

## 1.3 Granice projekta

**Cilj:** Jasno definirati granice sustava — što je obuhvaćeno odobrenim zadatkom, što je svjesno izostavljeno ili odgođeno te o kojim vanjskim uslugama sustav izravno ovisi.

**Uključeno:** Web aplikacija prilagođena mobilnim uređajima (responsive); registracija i prijava korisnika putem OAuth 2.0 protokola s tokenima; javni prikaz karte transfuzijskih centara, akcija i stanja zaliha; upravljanje profilom darivatelja i automatski izračun datuma podobnosti; rezervacija termina i prijava na terenske akcije uz ispunjavanje upitnika za samoprocjenu (još treba nadodat)
[Glavne mogućnosti.]  
**Izvan opsega ili odgođeno:** [Navedite funkcionalnosti koje su namjerno izostavljene ili prebačene u buduće verzije, uz kratko inženjersko ili vremensko obrazloženje.] 
**Vanjske ovisnosti:** Pružatelj kartografskih usluga za prikaz karte (npr. Google Maps); vanjski servis za slanje SMS poruka (npr. Infobip ili Twilio); autorizacija unutar aplikacije provodi se preko OAuth 2.0 protokola koristeći tokene.
[Navedite nužne vanjske usluge, API-je, baze podataka ili izvore informacija bez kojih sustav ne može funkcionirati (npr. Google Maps, platni pristupnici, vanjski pružatelj identiteta (OAuth)).]

## 1.4 Postojeći pristupi i opravdanost projekta

**Cilj:** Objasniti kako korisnici trenutačno rješavaju problem i koja preostala potreba opravdava odobreni projekt.

Krv trenutno građani mogu donirati u transfuzijski centrima i organiziranim akcijama, no sve te informacije su raštrkane po internetu, plakatima i panoima. U Hrvatskoj samo 4-5 % osoba daruje krv ("https://hztm.hr/2025/01/22/vodic-za-darivanje-krvi/"). Ovaj projekt bi mogao povećati te brojke spajajući sve informacije na jedno mjesto i aktivnim obavještavanjem darivatelja o akcijama i potrebama popunjavanja zaliha.

---

>**Završna provjera:** Opis problema, cilj projekta, korisnici i dionici, granice opsega te postojeći pristupi međusobno su usklađeni. Navedene koristi ne predstavljaju neprovjerene tvrdnje, a uključene i izostavljene funkcionalnosti odgovaraju odobrenom projektnom zadatku.
