const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// ==========================
// MIDDLEWARES
// ==========================

app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://mivideoteca-web.vercel.app'
  ],
  credentials: true
}));

// ==========================
// ROUTES
// ==========================

app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/movies', require('./routes/movieRoutes'));

// ==========================
// ROOT
// ==========================

app.get('/', (req, res) => {
  res.send('API funcionando');
});

// ==========================
// START SERVER
// ==========================

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

module.exports = app;