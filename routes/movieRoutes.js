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

// Middleware auth
router.use(auth);

// CRUD
router.get('/', getAllMovies);

router.get('/:id', getMovieById);

router.post('/', createMovie);

router.put('/:id', updateMovie);

router.delete('/:id', deleteMovie);

// Extras
router.patch('/:id/favorite', toggleFavorite);

router.patch('/:id/rating', setRating);

module.exports = router;