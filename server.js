const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mivideoteca-web.vercel.app"
  ],
  credentials: true
}));


// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));

// Ruta básica
app.get('/', (req, res) => {
  res.send('API funcionando ');
});

// SOLO iniciar servidor fuera de tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

// Exportar app para tests
module.exports = app;