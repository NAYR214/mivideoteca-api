const express = require('express');
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

const router = express.Router();

// TODAS las rutas protegidas
router.use(authMiddleware);

// CRUD
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', createMovie);
router.patch('/:id', updateMovie);
router.delete('/:id', deleteMovie);

// FAVORITO
router.patch('/:id/favorite', toggleFavorite);

// RATING
router.patch('/:id/rating', setRating);

module.exports = router;