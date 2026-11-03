-- =========================================================================
-- 1. Statistika darivatelja
-- =========================================================================
CREATE VIEW v_statistika_darivatelja AS
SELECT
    d.darivatelj_id,
    d.ime,
    d.prezime,
    COUNT(*) FILTER (WHERE LOWER(s.naziv) = 'uspješno darovano') AS ukupno_darivanja,
    COUNT(*) FILTER (WHERE LOWER(s.naziv) = 'nije pristupio')    AS broj_nedolazaka
FROM darivatelj d
LEFT JOIN rezervacija_termina r
       ON r.darivatelj_id = d.darivatelj_id
LEFT JOIN rezervacija_termina_stanje s
       ON s.rezervacija_termina_stanje_id = r.rezervacija_termina_stanje_id
GROUP BY d.darivatelj_id, d.ime, d.prezime;

-- =========================================================================
-- 2. Stanje zaliha po krvnim grupama (javni prikaz)
-- =========================================================================
CREATE VIEW v_stanje_zaliha AS
SELECT
    kg.naziv AS krvna_grupa,
    COUNT(d.doza_id) FILTER (WHERE LOWER(sd.naziv) = 'na zalihi') AS broj_doza_na_zalihi,
    CASE
        WHEN COUNT(d.doza_id) FILTER (WHERE LOWER(sd.naziv) = 'na zalihi') < 5  THEN 'Kritično'
        WHEN COUNT(d.doza_id) FILTER (WHERE LOWER(sd.naziv) = 'na zalihi') <= 15 THEN 'Nisko'
        ELSE 'Dovoljno'
    END AS status_zaliha
FROM krvna_grupa kg
LEFT JOIN darivatelj dar ON dar.krvna_grupa_id = kg.krvna_grupa_id
LEFT JOIN doza d         ON d.darivatelj_id = dar.darivatelj_id
LEFT JOIN doza_stanje sd ON sd.doza_stanje_id = d.doza_stanje_id
GROUP BY kg.krvna_grupa_id, kg.naziv
ORDER BY kg.naziv;

-- =========================================================================
-- 3. Slobodni termini u centrima (budući termini s preostalim mjestima)
-- =========================================================================
CREATE VIEW v_slobodni_termini AS
SELECT
    t.termin_id,
    tc.transfuzijski_centar_id,
    tc.naziv AS centar,
    t.datum_vrijeme_zakazano,
    t.kapacitet,
    t.trajanje,
    t.kapacitet - COUNT(r.darivatelj_id) AS slobodnih_mjesta,
    u.naziv AS ulica,
    tc.broj_adrese,
    m.naziv AS grad
FROM termin t
JOIN transfuzijski_centar tc ON tc.transfuzijski_centar_id = t.transfuzijski_centar_id
JOIN ulica u                 ON u.ulica_id = tc.ulica_id
JOIN mjesto m                ON m.pbr = u.pbr
LEFT JOIN rezervacija_termina r
       ON r.termin_id = t.termin_id
      AND r.rezervacija_termina_stanje_id NOT IN (
            SELECT rezervacija_termina_stanje_id
            FROM rezervacija_termina_stanje
            WHERE LOWER(naziv) = 'otkazan')
WHERE t.datum_vrijeme_zakazano > CURRENT_TIMESTAMP
  AND NOT EXISTS (SELECT 1 FROM terenska_akcija ta WHERE ta.termin_id = t.termin_id)
GROUP BY t.termin_id, tc.transfuzijski_centar_id, tc.naziv,
         t.datum_vrijeme_zakazano, t.kapacitet, t.trajanje,
         u.naziv, tc.broj_adrese, m.naziv
HAVING t.kapacitet - COUNT(r.darivatelj_id) > 0;

-- =========================================================================
-- 4. Aktivne terenske akcije
-- =========================================================================
CREATE VIEW v_aktivne_terenske_akcije AS
SELECT
    ta.terenska_akcija_id,
    u.naziv AS ulica,
    ta.broj_adrese,
    m.naziv AS grad,
    t.datum_vrijeme_zakazano,
    t.kapacitet,
    tas.naziv AS stanje_akcije
FROM terenska_akcija ta
JOIN ulica u                    ON u.ulica_id = ta.ulica_id
JOIN mjesto m                   ON m.pbr = u.pbr
JOIN termin t                   ON t.termin_id = ta.termin_id
JOIN terenska_akcija_stanje tas ON tas.terenska_akcija_stanje_id = ta.terenska_akcija_stanje_id
WHERE LOWER(tas.naziv) IN ('potvrđena', 'otvorene prijave')
  AND t.datum_vrijeme_zakazano > CURRENT_TIMESTAMP;

-- =========================================================================
-- 5. Pregled audit loga
-- =========================================================================
CREATE VIEW v_audit_log_pregled AS
SELECT
    al.audit_log_id,
    k.email AS korisnik_email,
    al.akcija,
    al.detalji,
    al.datum_vrijeme
FROM audit_log al
JOIN korisnik k ON k.korisnik_id = al.korisnik_id
ORDER BY al.datum_vrijeme DESC;