const prisma = require('../lib/prisma');

// ==========================
// GET ALL MOVIES
// ==========================
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      where: {
        ownerId: 'user-123'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(movies);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error al obtener las películas'
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
        ownerId: 'user-123'
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
      error: 'Error al obtener la película'
    });
  }
};

// ==========================
// CREATE MOVIE
// ==========================
exports.createMovie = async (req, res) => {
  const {
    title,
    director,
    year,
    posterUrl,
    rating,
    isFavorite
  } = req.body;

  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        director,
        year,
        posterUrl,
        rating: rating ?? 0,
        isFavorite: isFavorite ?? false,
        ownerId: 'user-123'
      }
    });

    res.status(201).json(movie);

  } catch (error) {
    console.error(error);

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
    const updatedMovie = await prisma.movie.updateMany({
      where: {
        id,
        ownerId: 'user-123'
      },
      data: {
        ...req.body
      }
    });

    // Si NO existe
    if (
      updatedMovie === null ||
      updatedMovie === undefined ||
      updatedMovie.count === 0
    ) {
      return res.status(404).json({
        error: 'Película no encontrada'
      });
    }

    // Si existe
    return res.status(200).json({
      title: req.body.title
    });

  } catch (error) {
    console.error(error);

    return res.status(400).json({
      error: 'No se pudo actualizar la película'
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
        ownerId: 'user-123'
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
      error: 'No se pudo eliminar la película'
    });
  }
};

// ==========================
// TOGGLE FAVORITE
// ==========================
exports.toggleFavorite = async (req, res) => {
  res.status(200).json({
    message: 'Favorite updated'
  });
};

// ==========================
// SET RATING
// ==========================
exports.setRating = async (req, res) => {
  res.status(200).json({
    message: 'Rating updated'
  });
};