const express = require('express');

const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleFavorite,
  setRating
} = require('../controllers/movieController');

router.get('/', authMiddleware, getAllMovies);

router.get('/:id', authMiddleware, getMovieById);

router.post('/', authMiddleware, createMovie);

router.put('/:id', authMiddleware, updateMovie);

router.delete('/:id', authMiddleware, deleteMovie);

router.patch('/:id/favorite', authMiddleware, toggleFavorite);

router.patch('/:id/rating', authMiddleware, setRating);

module.exports = router;