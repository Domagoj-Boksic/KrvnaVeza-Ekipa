require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middleware/requireAuth');

const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy'});
});

app.use('/auth', authRoutes);

app.get('/api/me', requireAuth, (req, res) => {
  const { id, ime, email, uloga } = req.user;
  res.json({ id, ime, email, uloga});
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend radi na http://localhost:${port}`);
});