CREATE TABLE korisnik
(
  korisnik_id SERIAL NOT NULL,
  email VARCHAR(255) NOT NULL,
  google_id VARCHAR(50) NOT NULL,
  PRIMARY KEY (korisnik_id),
  UNIQUE (google_id),
  UNIQUE (email)
);

CREATE TABLE krvna_grupa
(
  krvna_grupa_id SERIAL NOT NULL,
  naziv VARCHAR(3) NOT NULL,
  PRIMARY KEY (krvna_grupa_id)
);

CREATE TABLE metoda_obavijesti
(
  metoda_obavijesti_id SERIAL NOT NULL,
  naziv VARCHAR(20) NOT NULL,
  PRIMARY KEY (metoda_obavijesti_id)
);

CREATE TABLE zupanija
(
  zupanija_id SERIAL NOT NULL,
  naziv VARCHAR(100) NOT NULL,
  PRIMARY KEY (zupanija_id)
);

CREATE TABLE mjesto
(
  pbr INT NOT NULL,
  naziv VARCHAR(100) NOT NULL,
  zupanija_id INT NOT NULL,
  PRIMARY KEY (pbr),
  FOREIGN KEY (zupanija_id) REFERENCES zupanija(zupanija_id)
);

CREATE TABLE ulica
(
  ulica_id SERIAL NOT NULL,
  naziv VARCHAR(100) NOT NULL,
  pbr INT NOT NULL,
  PRIMARY KEY (ulica_id),
  FOREIGN KEY (pbr) REFERENCES mjesto(pbr)
);

CREATE TABLE darivatelj
(
  darivatelj_id SERIAL NOT NULL,
  ime VARCHAR(50) NOT NULL,
  prezime VARCHAR(50) NOT NULL,
  datum_rod DATE NOT NULL,
  spol VARCHAR(1) NOT NULL,
  broj_telefona VARCHAR(16) NOT NULL,
  max_udaljenost INT NOT NULL,
  broj_adrese_stanovanja INT NOT NULL,
  krvna_grupa_potvrda BOOLEAN NOT NULL,
  korisnik_id INT NOT NULL,
  krvna_grupa_id INT NOT NULL,
  metoda_obavijesti_id INT NOT NULL,
  ulica_id INT NOT NULL,
  PRIMARY KEY (darivatelj_id),
  UNIQUE (korisnik_id),
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(korisnik_id),
  FOREIGN KEY (krvna_grupa_id) REFERENCES krvna_grupa(krvna_grupa_id),
  FOREIGN KEY (metoda_obavijesti_id) REFERENCES metoda_obavijesti(metoda_obavijesti_id),
  FOREIGN KEY (ulica_id) REFERENCES ulica(ulica_id)
);

CREATE TABLE transfuzijski_centar
(
  transfuzijski_centar_id SERIAL NOT NULL,
  naziv VARCHAR(100) NOT NULL,
  broj_adrese INT NOT NULL,
  radno_vrijeme JSONB NOT NULL,
  ulica_id INT NOT NULL,
  PRIMARY KEY (transfuzijski_centar_id),
  FOREIGN KEY (ulica_id) REFERENCES ulica(ulica_id)
);

CREATE TABLE termin
(
  termin_id SERIAL NOT NULL,
  kapacitet INT NOT NULL,
  trajanje INT NOT NULL,
  datum_vrijeme_zakazano TIMESTAMP NOT NULL,
  transfuzijski_centar_id INT NOT NULL,
  PRIMARY KEY (termin_id),
  FOREIGN KEY (transfuzijski_centar_id) REFERENCES transfuzijski_centar(transfuzijski_centar_id)
);

CREATE TABLE rezervacija_termina_stanje
(
  rezervacija_termina_stanje_id SERIAL NOT NULL,
  naziv VARCHAR(30) NOT NULL,
  PRIMARY KEY (rezervacija_termina_stanje_id)
);

CREATE TABLE rezervacija_termina
(
  upitnik_odgovori TEXT NOT NULL,
  rezervacija_termina_stanje_id INT NOT NULL,
  termin_id INT NOT NULL,
  darivatelj_id INT NOT NULL,
  PRIMARY KEY (termin_id, darivatelj_id),
  FOREIGN KEY (rezervacija_termina_stanje_id) REFERENCES rezervacija_termina_stanje(rezervacija_termina_stanje_id),
  FOREIGN KEY (termin_id) REFERENCES termin(termin_id),
  FOREIGN KEY (darivatelj_id) REFERENCES darivatelj(darivatelj_id)
);

CREATE TABLE doza_stanje
(
  doza_stanje_id SERIAL NOT NULL,
  naziv VARCHAR(30) NOT NULL,
  PRIMARY KEY (doza_stanje_id)
);

CREATE TABLE doza
(
  kolicina NUMERIC(6, 2) NOT NULL,
  rok_trajanja DATE NOT NULL,
  doza_id SERIAL NOT NULL,
  termin_id INT NOT NULL,
  darivatelj_id INT NOT NULL,
  doza_stanje_id INT NOT NULL,
  PRIMARY KEY (doza_id),
  FOREIGN KEY (termin_id) REFERENCES termin(termin_id),
  FOREIGN KEY (darivatelj_id) REFERENCES darivatelj(darivatelj_id),
  FOREIGN KEY (doza_stanje_id) REFERENCES doza_stanje(doza_stanje_id)
);

CREATE TABLE terenska_akcija_stanje
(
  terenska_akcija_stanje_id SERIAL NOT NULL,
  naziv VARCHAR(30) NOT NULL,
  PRIMARY KEY (terenska_akcija_stanje_id)
);

CREATE TABLE terenska_akcija
(
  terenska_akcija_id SERIAL NOT NULL,
  broj_adrese INT NOT NULL,
  organizator_id INT NOT NULL,
  termin_id INT NOT NULL,
  terenska_akcija_stanje_id INT NOT NULL,
  ulica_id INT NOT NULL,
  PRIMARY KEY (terenska_akcija_id),
  FOREIGN KEY (organizator_id) REFERENCES korisnik(korisnik_id),
  FOREIGN KEY (termin_id) REFERENCES termin(termin_id),
  FOREIGN KEY (terenska_akcija_stanje_id) REFERENCES terenska_akcija_stanje(terenska_akcija_stanje_id),
  FOREIGN KEY (ulica_id) REFERENCES ulica(ulica_id)
);

CREATE TABLE odbijeni_darivatelj
(
  odbijeni_darivatelj_id SERIAL NOT NULL,
  razlog TEXT NOT NULL,
  datum_kraja_odgode DATE,
  trajna_nepodobnost BOOLEAN NOT NULL,
  darivatelj_id INT NOT NULL,
  termin_id INT,
  djelatnik_id INT,
  PRIMARY KEY (odbijeni_darivatelj_id),
  FOREIGN KEY (darivatelj_id) REFERENCES darivatelj(darivatelj_id),
  FOREIGN KEY (termin_id) REFERENCES termin(termin_id),
  FOREIGN KEY (djelatnik_id) REFERENCES korisnik(korisnik_id)
);

CREATE TABLE uloga
(
  uloga_id SERIAL NOT NULL,
  naziv VARCHAR(50) NOT NULL,
  opis VARCHAR(255) NOT NULL,
  PRIMARY KEY (uloga_id)
);

CREATE TABLE korisnik_uloga
(
  korisnik_id INT NOT NULL,
  uloga_id INT NOT NULL,
  PRIMARY KEY (korisnik_id, uloga_id),
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(korisnik_id),
  FOREIGN KEY (uloga_id) REFERENCES uloga(uloga_id)
);

CREATE TABLE dozvola
(
  dozvola_id SERIAL NOT NULL,
  naziv VARCHAR(100) NOT NULL,
  opis VARCHAR(255) NOT NULL,
  PRIMARY KEY (dozvola_id)
);

CREATE TABLE uloga_dozvola
(
  uloga_id INT NOT NULL,
  dozvola_id INT NOT NULL,
  PRIMARY KEY (uloga_id, dozvola_id),
  FOREIGN KEY (uloga_id) REFERENCES uloga(uloga_id),
  FOREIGN KEY (dozvola_id) REFERENCES dozvola(dozvola_id)
);

CREATE TABLE audit_log
(
  audit_log_id SERIAL NOT NULL,
  akcija VARCHAR(100) NOT NULL,
  detalji TEXT NOT NULL,
  datum_vrijeme TIMESTAMP NOT NULL,
  korisnik_id INT NOT NULL,
  PRIMARY KEY (audit_log_id),
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(korisnik_id)
);

CREATE TABLE hitni_poziv
(
  hitni_poziv_id SERIAL NOT NULL,
  datum_vrijeme TIMESTAMP NOT NULL,
  djelatnik_id INT NOT NULL,
  PRIMARY KEY (hitni_poziv_id),
  FOREIGN KEY (djelatnik_id) REFERENCES korisnik(korisnik_id)
);

CREATE TABLE darivatelj_pozvan
(
  hitni_poziv_id INT NOT NULL,
  darivatelj_id INT NOT NULL,
  PRIMARY KEY (hitni_poziv_id, darivatelj_id),
  FOREIGN KEY (hitni_poziv_id) REFERENCES hitni_poziv(hitni_poziv_id),
  FOREIGN KEY (darivatelj_id) REFERENCES darivatelj(darivatelj_id)
);