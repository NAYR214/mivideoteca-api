const prisma = require('../lib/prisma');

// ==========================
// GET ALL MOVIES
// ==========================
exports.getAllMovies = async (req, res) => {
  try {

    const movies = await prisma.movie.findMany({
      where: {
        ownerId: req.user.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(movies);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Error al obtener películas'
    });
  }
};

// ==========================
// GET MOVIE BY ID
// ==========================
exports.getMovieById = async (req, res) => {

  const { id } = req.params;

  try {

    const movie = await prisma.movie.findFirst({
      where: {
        id,
        ownerId: req.user.userId
      }
    });

    if (!movie) {
      return res.status(404).json({
        error: 'Película no encontrada'
      });
    }

    res.json(movie);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Error al obtener película'
    });
  }
};

// ==========================
// CREATE MOVIE
// ==========================
exports.createMovie = async (req, res) => {

  try {

    console.log('REQ.USER:', req.user);

    const {
      title,
      director,
      year,
      posterUrl
    } = req.body;

    const movie = await prisma.movie.create({
      data: {
        title,
        director,
        year,
        posterUrl,
        ownerId: req.user.userId
      }
    });

    res.status(201).json(movie);

  } catch (error) {

    console.error('CREATE MOVIE ERROR:', error);

    res.status(400).json({
      error: 'Datos inválidos'
    });
  }
};

// ==========================
// UPDATE MOVIE
// ==========================
exports.updateMovie = async (req, res) => {

  const { id } = req.params;

  try {

    const result = await prisma.movie.updateMany({
      where: {
        id,
        ownerId: req.user.userId
      },
      data: req.body
    });

    if (result.count === 0) {
      return res.status(404).json({
        error: 'Película no encontrada'
      });
    }

    res.json({
      message: 'Película actualizada'
    });

  } catch (error) {

    console.error(error);

    res.status(400).json({
      error: 'Error al actualizar película'
    });
  }
};

// ==========================
// DELETE MOVIE
// ==========================
exports.deleteMovie = async (req, res) => {

  const { id } = req.params;

  try {

    const result = await prisma.movie.deleteMany({
      where: {
        id,
        ownerId: req.user.userId
      }
    });

    if (result.count === 0) {
      return res.status(404).json({
        error: 'Película no encontrada'
      });
    }

    res.status(204).send();

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Error al eliminar película'
    });
  }
};

// ==========================
// TOGGLE FAVORITE
// ==========================
exports.toggleFavorite = async (req, res) => {
  res.json({
    message: 'Favorite actualizado'
  });
};

// ==========================
// SET RATING
// ==========================
exports.setRating = async (req, res) => {
  res.json({
    message: 'Rating actualizado'
  });
};