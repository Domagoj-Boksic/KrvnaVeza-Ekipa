const supabase = require('../models/database');

async function findOrCreateFromGoogle(profile) {
    const googleId = profile.id;
    const email = profile.emails?.[0]?.value;
    const googleIme = profile.displayName || 'Korisnik';

    // 1. Provjeri postoji li korisnik već u tablici korisnik
    const { data: postojeci, error: findError } = await supabase
        .from('korisnik')
        .select('korisnik_id, email, google_id')
        .eq('google_id', googleId)
        .maybeSingle();

    if (findError) throw findError;

    let korisnikRow = postojeci;

    // 2. Ako ne postoji, ubaci ga u tablicu korisnik
    if (!korisnikRow) {
        const { data: noviKorisnik, error: insertError } = await supabase
            .from('korisnik')
            .insert([{ email, google_id: googleId }])
            .select('korisnik_id, email, google_id')
            .single();

        if (insertError) throw insertError;
        korisnikRow = noviKorisnik;

        // Dohvati ID uloge 'darivatelj' i poveži u korisnik_uloga
        const { data: uloge } = await supabase
            .from('uloga')
            .select('uloga_id, naziv');

        const darivateljUloga = uloge?.find(
            u => u.naziv && u.naziv.toLowerCase() === 'darivatelj'
        );

        if (darivateljUloga) {
            await supabase
                .from('korisnik_uloga')
                .upsert(
                    {
                        korisnik_id: korisnikRow.korisnik_id,
                        uloga_id: darivateljUloga.uloga_id
                    },
                    { onConflict: 'korisnik_id,uloga_id', ignoreDuplicates: true }
                );
        }
    }

    // 3. Vrati kompletan objekt (s imenom iz baze ili s Googlea)
    return await findById(korisnikRow.korisnik_id, googleIme);
}

async function findById(id, fallbackIme = 'Korisnik') {
    const { data: k, error } = await supabase
        .from('korisnik')
        .select(`
            korisnik_id,
            email,
            google_id,
            darivatelj (
                ime,
                prezime
            ),
            korisnik_uloga (
                uloga (
                    naziv
                )
            )
        `)
        .eq('korisnik_id', id)
        .maybeSingle();

    if (error) throw error;
    if (!k) return null;

    // Supabase za 1-na-1 relacije ponekad vrati objekt, a ponekad polje s 1 elementom
    const darivatelj = Array.isArray(k.darivatelj) ? k.darivatelj[0] : k.darivatelj;
    const punoIme = darivatelj
        ? `${darivatelj.ime || ''} ${darivatelj.prezime || ''}`.trim()
        : '';

    const ulogaNaziv = k.korisnik_uloga?.[0]?.uloga?.naziv || 'darivatelj';

    return {
        id: k.korisnik_id,
        email: k.email,
        google_id: k.google_id,
        ime: punoIme || fallbackIme,
        uloga: ulogaNaziv
    };
}

module.exports = { findOrCreateFromGoogle, findById };