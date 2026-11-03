const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/neuspjeh' }),
    (req, res) => res.redirect('/api/me')
);

router.get('/neuspjeh', (req, res) => res.status(401).send('Prijava nije uspjela'));

router.post('/logout', (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.json({ ok: true });
        });
    }) ;
});

module.exports = router;