const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleFavorite,
  setRating
} = require('../controllers/movieController');

// Todas las rutas protegidas
router.use(auth);

// ==========================
// CRUD
// ==========================

router.get('/', getAllMovies);

router.get('/:id', getMovieById);

router.post('/', createMovie);

router.put('/:id', updateMovie);

router.delete('/:id', deleteMovie);

// ==========================
// EXTRAS
// ==========================

router.patch('/:id/favorite', toggleFavorite);

router.patch('/:id/rating', setRating);

module.exports = router;