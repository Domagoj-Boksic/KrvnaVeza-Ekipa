require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const centriRoutes = require('./routes/centriRoutes');
require('./config/passport');

const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middleware/requireAuth');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';


if (isProduction) {
  app.set('trust proxy', 1);
}

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));


app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: 'auto',
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

app.use('/api/centri', centriRoutes);

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend radi na http://localhost:${port}`);
});