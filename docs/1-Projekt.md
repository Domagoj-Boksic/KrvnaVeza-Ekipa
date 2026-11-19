# 1. Opseg projekta

## 1.1 Problem i cilj projekta

Bolnice svakodnevno trebaju krv za operacije, liječenje onkoloških bolesnika i zbrinjavanje hitnih stanja. Krv se ne može proizvesti, a njezini sastojci imaju ograničen rok trajanja, pa zalihe moraju stalno obnavljati dobrovoljni darivatelji.
Zalihe pritom nisu stabilne: ljeti i u vrijeme blagdana darivatelja je manje, a zaliha pojedinih krvnih grupa, osobito negativnih, zna pasti ispod kritične razine.
Mnogi bi darivatelji češće darivali krv kad bi znali kada ponovno smiju darivati, gdje se i kada održava najbliža akcija darivanja i da je upravo njihova krvna grupa trenutno potrebna. 
Postojeći sustavi oslanjaju se na zastarjele metode obavještavanja darivatelja (telefonski pozivi, plakati i poruke) koje ne dopiru do svih, dok se evidencija darivanja vodi odvojeno od informacija koje su darivateljima dostupne.
Cilj je stvoriti funkcionalnu platformu koja povezuje darivatelje krvi, transfuzijske centre i organizatore terenskih akcija darivanja. 
Darivatelj na njoj vidi kada i gdje može darivati i rezervira termin, centar prati zalihe i u slučaju potrebe ciljano poziva odgovarajuće darivatelje, a organizator akcija lakše planira akcije i prati odaziv.

## 1.2 Ciljani korisnici i dionici

| Skupina korisnika ili dionika | Potreba ili interes relevantan za ovaj projekt |
| --- | --- |
| Građanin  | Pregled lokacija i slobodnih termina, rezervacija termina, primanje obavijesti i podsjetnika te pregled povijesti darivanja|
| Djelatnik | Kapacitet termina, radno vrijeme, potvrđivanje krvne grupe, unos i promjena zaliha, odobravanje hitnog poziva i određuje područje na koje se šalje, prihvaća ili odbija sudjelovanje na nekoj od akcija.  |
| Organizator akcija | Predlaganje terenskih akcija, za svaku akciju određuje vrijeme, lokaciju, datum i očekivani broj darivatelja, dodjela priznanja, |
| Administrator | Upravljanje korisnicima, dodjelivanje uloga, podešavaju parametre pravila podobnosti i pragove zaliha, pregled statistike korištenja sustava |

## 1.3 Granice projekta

**Uključeno:**
- web aplikacija prilagođena mobilnim uređajima (responsive)
- registracija i prijava korisnika putem Google OAuth 2.0 protokola s tokenima te upravljanje korisničkim ulogama
- javni prikaz karte transfuzijskih centara, najavljenih akcija i stanja zaliha
- upravljanje profilom darivatelja i automatski izračun datuma od kojeg ponovno smije darivati
- rezervacija termina i prijava na terenske akcije uz upitnik za samoprocjenu podobnosti, QR kod za potvrdu termina i sinkronizacija s Google Kalendarom
- evidentiranje dolazaka skeniranjem QR koda, upravljanje terminima, dozama i zalihama krvi;
- obavijesti darivateljima i hitni pozivi za darivanje pri padu zaliha ispod kritične razine;
- prijedlog i odobravanje terenskih akcija te pregled statistike
- pregled povijesti darivanja, PDF potvrda o darivanju i značke za jubilarna darivanja
- statistika zaliha s izvozom u CSV te administracija centara, korisnika i parametara sustava

**Izvan opsega ili odgođeno:** 
- integracija s bolničkim informacijskim sustavima
- stvarno medicinsko testiranje i potvrda zdravstvenog stanja darivatelja (sustav samo evidentira statuse)

Navedeno je izostavljeno jer nije dio odobrenog zadatka i nadilazi vremenski okvir projekta.

**Vanjske ovisnosti:** 
- Google OAuth 2.0 (autorizacija korisnika putem tokena)
- Google Maps API (prikaz karte i lokacija)
- Google Calendar API (sinkronizacija termina s kalendarom darivatelja)
- vanjski servis za slanje SMS poruka (npr. Infobip ili Twilio)

## 1.4 Postojeći pristupi i opravdanost projekta

Krv trenutno građani mogu donirati u transfuzijski centrima i organiziranim akcijama, no sve te informacije su raštrkane po internetu, plakatima i panoima. U Hrvatskoj samo 4-5 % osoba daruje krv ("https://hztm.hr/2025/01/22/vodic-za-darivanje-krvi/"). Ovaj projekt bi mogao povećati te brojke spajajući sve informacije na jedno mjesto i aktivnim obavještavanjem darivatelja o akcijama i potrebama popunjavanja zaliha.

---
