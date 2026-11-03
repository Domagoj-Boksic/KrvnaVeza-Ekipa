const korisnici = new Map();
let sljedeciId = 1;

async function findOrCreateFromGoogle(profile) {
    let korisnik = [...korisnici.values()].find(k => k.googleId === profile.id);

    if (!korisnik) {
        korisnik = {
            id: sljedeciId++,
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            ime: profile.displayName,
            uloga: 'darivatelj',
        };

        korisnici.set(korisnik.id, korisnik);
        console.log('Novi korisnik:', korisnik);
    }

    return korisnik;
}

async function findById(id) {
    return korisnici.get(id);
}

module.exports = { findOrCreateFromGoogle, findById };