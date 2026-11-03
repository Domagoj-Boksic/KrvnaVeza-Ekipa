BEGIN;

-- =========================================================================
-- LOOKUP TABLES
-- =========================================================================
INSERT INTO krvna_grupa (krvna_grupa_id, naziv) VALUES
(1,'A+'),(2,'A-'),(3,'B+'),(4,'B-'),(5,'AB+'),(6,'AB-'),(7,'O+'),(8,'O-');

INSERT INTO metoda_obavijesti (metoda_obavijesti_id, naziv) VALUES
(1,'SMS'),(2,'E-pošta');

INSERT INTO rezervacija_termina_stanje (rezervacija_termina_stanje_id, naziv) VALUES
(1,'Rezerviran'),(2,'Pristupio'),(3,'Na pregledu'),(4,'Darivanje u tijeku'),
(5,'Uspješno darovano'),(6,'Odbijen na pregledu'),(7,'Otkazan'),(8,'Nije pristupio');

INSERT INTO doza_stanje (doza_stanje_id, naziv) VALUES
(1,'Prikupljena'),(2,'U testiranju'),(3,'Na zalihi'),(4,'Izdana bolnici'),(5,'Odbačena');

INSERT INTO terenska_akcija_stanje (terenska_akcija_stanje_id, naziv) VALUES
(1,'Predložena'),(2,'Potvrđena'),(3,'Otvorene prijave'),(4,'Održana'),(5,'Otkazana');

-- =========================================================================
-- GEOGRAPHY
-- =========================================================================
INSERT INTO zupanija (zupanija_id, naziv) VALUES
(1,'Grad Zagreb'),(2,'Splitsko-dalmatinska'),(3,'Primorsko-goranska'),(4,'Osječko-baranjska');

INSERT INTO mjesto (pbr, naziv, zupanija_id) VALUES
(10000,'Zagreb',1),(21000,'Split',2),(51000,'Rijeka',3),(31000,'Osijek',4);

INSERT INTO ulica (ulica_id, naziv, pbr) VALUES
(1,'Ilica',10000),
(2,'Vukovarska',10000),
(3,'Riva',21000),
(4,'Korzo',51000),
(5,'Europska avenija',31000);

INSERT INTO transfuzijski_centar (transfuzijski_centar_id, naziv, broj_adrese, radno_vrijeme, ulica_id) VALUES
(1,'Transfuzijski centar Zagreb',12,
   '{"pon-pet":"07:00-15:00","sub":"08:00-12:00"}', 2),
(2,'Transfuzijski centar Split',5,
   '{"pon-pet":"07:30-14:30"}', 3);

-- =========================================================================
-- USERS, ROLES, PERMISSIONS
-- =========================================================================
INSERT INTO korisnik (korisnik_id, email, google_id) VALUES
(1,'admin@krv.hr',          '100000000000000000001'),
(2,'djelatnik@krv.hr',      '100000000000000000002'),
(3,'organizator@crvenikriz.hr','100000000000000000003'),
(4,'ivan.horvat@gmail.com', '100000000000000000004'),
(5,'marija.kovac@gmail.com','100000000000000000005'),
(6,'luka.babic@gmail.com',  '100000000000000000006'),
(7,'ana.maric@gmail.com',   '100000000000000000007'),
(8,'petar.juric@gmail.com', '100000000000000000008'),
(9,'iva.novak@gmail.com',   '100000000000000000009');

INSERT INTO uloga (uloga_id, naziv, opis) VALUES
(1,'darivatelj','Registrirani darivatelj krvi'),
(2,'djelatnik','Djelatnik transfuzijskog centra'),
(3,'organizator','Organizator terenskih akcija'),
(4,'administrator','Administrator platforme');

INSERT INTO dozvola (dozvola_id, naziv, opis) VALUES
(1,'REZERVIRAJ_TERMIN','Rezervacija termina darivanja'),
(2,'EVIDENTIRAJ_DOZU','Unos doze krvi'),
(3,'VIDI_MEDICINSKE_PODATKE','Pristup osjetljivim zdravstvenim podacima'),
(4,'PREDLOZI_AKCIJU','Prijedlog terenske akcije'),
(5,'UPRAVLJAJ_KORISNICIMA','Upravljanje korisnicima i ulogama'),
(6,'POSALJI_HITNI_POZIV','Odobravanje hitnih poziva');

INSERT INTO korisnik_uloga (korisnik_id, uloga_id) VALUES
(1,4),(2,2),(3,3),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1);

INSERT INTO uloga_dozvola (uloga_id, dozvola_id) VALUES
(1,1),
(2,2),(2,3),(2,6),
(3,4),
(4,5);

-- =========================================================================
-- DONORS
-- =========================================================================
INSERT INTO darivatelj
(darivatelj_id, ime, prezime, datum_rod, spol, broj_telefona, max_udaljenost,
 broj_adrese_stanovanja, krvna_grupa_potvrda, korisnik_id, krvna_grupa_id,
 metoda_obavijesti_id, ulica_id) VALUES
(1,'Ivan','Horvat','1990-03-14','M','+385911234567',30,45,TRUE, 4,8,1,1),
(2,'Marija','Kovač','1988-07-22','F','+385921112233',20,10,TRUE, 5,1,2,2),
(3,'Luka','Babić','1995-11-02','M','+385955551234',50,7, TRUE, 6,7,1,3),
(4,'Ana','Marić','1992-05-30','F','+385981234000',25,22,TRUE, 7,3,1,3),
(5,'Petar','Jurić','1985-01-09','M','+385912223344',40,3, FALSE,8,2,2,5),
(6,'Iva','Novak','2000-09-17','F','+385997778899',15,18,TRUE, 9,5,1,4);

-- =========================================================================
-- APPOINTMENTS (1-6 upcoming center slots, 7-8 field actions,
--               9-12 past, 13-14 later upcoming)
-- =========================================================================
INSERT INTO termin (termin_id, kapacitet, trajanje, datum_vrijeme_zakazano, transfuzijski_centar_id) VALUES
(1, 4, 15,'2026-11-10 09:00',1),
(2, 4, 15,'2026-11-10 09:15',1),
(3, 4, 15,'2026-11-12 10:00',2),
(4, 4, 15,'2026-11-12 10:15',2),
(5, 4, 15,'2026-11-17 09:00',1),
(6, 4, 15,'2026-11-19 11:00',2),
(7, 60,480,'2026-11-21 10:00',1),
(8, 40,420,'2026-11-28 09:00',2),
(9, 4, 15,'2026-10-15 09:00',1),
(10,4, 15,'2026-10-20 10:00',2),
(11,4, 15,'2026-06-10 09:00',1),
(12,4, 15,'2026-07-08 09:00',2),
(13,4, 15,'2027-01-25 09:00',1),
(14,4, 15,'2027-02-18 10:00',2);

INSERT INTO terenska_akcija
(terenska_akcija_id, broj_adrese, organizator_id, termin_id, terenska_akcija_stanje_id, ulica_id) VALUES
(1,10,3,7,3,1),   -- Otvorene prijave
(2,8, 3,8,1,4);   -- Predložena

INSERT INTO rezervacija_termina
(upitnik_odgovori, rezervacija_termina_stanje_id, termin_id, darivatelj_id) VALUES
-- past
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',5, 9,1),
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',5, 9,2),
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',5, 9,3),
('{"tetovaza":false,"putovanje":false,"lijekovi":["željezo"]}',6, 9,4),
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',8, 9,5),
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',5,10,6),
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',5,11,1),
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',5,11,2),
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',5,11,3),
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',5,12,4),
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',5,12,5),
-- upcoming
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',1, 1,5),
('{"tetovaza":true,"putovanje":false,"lijekovi":[]}', 7, 3,4),  -- cancelled
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',1,13,1),
('{"tetovaza":false,"putovanje":true,"lijekovi":[]}', 1,13,3),
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',1,13,6),
('{"tetovaza":false,"putovanje":false,"lijekovi":[]}',1,14,2);

-- =========================================================================
-- BLOOD UNITS
-- =========================================================================
INSERT INTO doza (doza_id, kolicina, rok_trajanja, termin_id, darivatelj_id, doza_stanje_id) VALUES
(1,450.00,'2026-11-26', 9,1,3),  -- na zalihi
(2,450.00,'2026-11-26', 9,2,3),  -- na zalihi
(3,450.00,'2026-11-26', 9,3,2),  -- u testiranju
(4,450.00,'2026-12-01',10,6,1),  -- prikupljena
(5,450.00,'2026-07-22',11,1,4),  -- izdana
(6,450.00,'2026-07-22',11,2,5),  -- odbačena
(7,450.00,'2026-07-22',11,3,4),  -- izdana
(8,450.00,'2026-08-19',12,4,5),  -- odbačena
(9,450.00,'2026-08-19',12,5,4);  -- izdana

-- =========================================================================
-- DEFERRALS
-- =========================================================================
INSERT INTO odbijeni_darivatelj
(odbijeni_darivatelj_id, razlog, datum_kraja_odgode, trajna_nepodobnost,
 darivatelj_id, termin_id, djelatnik_id) VALUES
(1,'Niska razina hemoglobina','2026-11-30',FALSE,4,9,2);

-- =========================================================================
-- EMERGENCY CALLS
-- =========================================================================
INSERT INTO hitni_poziv (hitni_poziv_id, datum_vrijeme, djelatnik_id) VALUES
(1,'2026-10-30 08:30',2);

INSERT INTO darivatelj_pozvan (hitni_poziv_id, darivatelj_id) VALUES
(1,1),(1,3);

-- =========================================================================
-- AUDIT LOG
-- =========================================================================
INSERT INTO audit_log (audit_log_id, akcija, detalji, datum_vrijeme, korisnik_id) VALUES
(1,'READ_MEDICAL_DATA','Pregled upitnika darivatelja 4, termin 9','2026-10-15 09:10',2),
(2,'UPDATE_DONOR',     'Odbijanje darivatelja 4, razlog: hemoglobin','2026-10-15 09:20',2),
(3,'READ_MEDICAL_DATA','Pregled odbijanja darivatelja 4','2026-10-16 11:00',2);

COMMIT;