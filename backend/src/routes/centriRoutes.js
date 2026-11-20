const router = require('express').Router();
const supabase = require('../models/database');

router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('transfuzijski_centar')
            .select(`
                transfuzijski_centar_id,
                naziv,
                broj_adrese,
                radno_vrijeme,
                lat,
                lng,
                ulica (
                    naziv,
                    mjesto (
                        naziv,
                        pbr
                    )
                )
            `);

        if (error) throw error;

        const centriZaFrontend = data.map(centar => {
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

            const ulicaNaziv = centar.ulica?.naziv || '';
            const gradNaziv = centar.ulica?.mjesto?.naziv || '';

            return {
                id: centar.transfuzijski_centar_id,
                naziv: centar.naziv,
                adresa: `${ulicaNaziv} ${centar.broj_adrese || ''}, ${gradNaziv}`.trim(),
                radnoVrijeme: radnoVrijemeTekst,
                lat: centar.lat,
                lng: centar.lng
            };
        });

        res.json(centriZaFrontend);
    } catch (err) {
        console.error("Greška pri dohvatu centara iz baze:", err);
        res.status(500).json({ greska: "Greška pri dohvaćanju centara iz baze podataka" });
    }
});

module.exports = router;