// Configura las variables de entorno desde el archivo .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Cliente de Prisma: ORM que conecta con la base de datos
const prisma = require('./lib/prisma');

// Importamos las rutas modularizadas
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Ruta raíz - Bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a MiVideoteca API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      movies: '/api/movies'
    }
  });
});

// =======================
// RUTAS DE LA API
// =======================

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API funcionando correctamente'
  });
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});