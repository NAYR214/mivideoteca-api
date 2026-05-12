const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleFavorite,
  setRating
} = require('../controllers/movieController');

// PROTEGER TODAS LAS RUTAS
router.use(authMiddleware);

// CRUD
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

// FAVORITO ❤️
router.patch('/:id/favorite', toggleFavorite);

// RATING ⭐
router.patch('/:id/rating', setRating);

module.exports = router;