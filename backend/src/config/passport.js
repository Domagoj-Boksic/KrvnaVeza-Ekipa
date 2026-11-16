const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const userService = require('../services/userService');

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID || "lazni_client_ID",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "lazni_client_secret",
        callbackURL: process.env.GOOGLE_CALLBACK_URL || "lazni_callback_url",
        state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const korisnik = await userService.findOrCreateFromGoogle(profile);
            done(null, korisnik);
        } catch(err) {
            done(err);
        }
    }
));

passport.serializeUser((korisnik, done) => done(null, korisnik.id));

passport.deserializeUser(async(id, done) => {
    try {
        done(null, (await userService.findById(id)) || false);
    } catch (err) {
        done(err)
    }
});