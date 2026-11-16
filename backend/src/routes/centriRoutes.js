const router = require('express').Router();
const pool = require('../models/database');

router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                tc.transfuzijski_centar_id AS id,
                tc.naziv,
                tc.broj_adrese,
                tc.radno_vrijeme,
                tc.lat,
                tc.lng,
                u.naziv AS ulica_naziv,
                m.naziv AS grad_naziv,
                m.pbr
            FROM transfuzijski_centar tc
            LEFT JOIN ulica u ON tc.ulica_id = u.ulica_id
            LEFT JOIN mjesto m ON u.pbr = m.pbr
        `;

        const result = await pool.query(query);

        const centriZaFrontend = result.rows.map(centar => {
            // Pretvorba radnog vremena iz jsonb objekta u čitak string
            let radnoVrijemeTekst = "Radno vrijeme nije definirano";

            if (centar.radno_vrijeme) {
                if (typeof centar.radno_vrijeme === 'object') {
                    radnoVrijemeTekst = Object.entries(centar.radno_vrijeme)
                        .map(([dan, vrijeme]) => `${dan}: ${vrijeme}`)
                        .join(' | ');
                } else {
                    radnoVrijemeTekst = centar.radno_vrijeme;
                }
            }

            return {
                id: centar.id,
                naziv: centar.naziv,
                adresa: `${centar.ulica_naziv || ''} ${centar.broj_adrese || ''}, ${centar.grad_naziv || ''}`,
                radnoVrijeme: radnoVrijemeTekst,
                lat: centar.lat, // Koordinate dolaze direktno iz baze
                lng: centar.lng  // Koordinate dolaze direktno iz baze
            };
        });

        res.json(centriZaFrontend);
    } catch (err) {
        console.error("Greška pri dohvatu centara iz baze:", err);
        res.status(500).json({ greska: "Greška pri dohvaćanju centara iz baze podataka" });
    }
});

module.exports = router;