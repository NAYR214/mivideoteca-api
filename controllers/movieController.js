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
        ownerId: req.user.userId
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
    const result = await prisma.movie.updateMany({
      where: {
        id,
        ownerId: req.user.userId
      },
      data: {
        ...req.body
      }
    });

    if (result.count === 0) {
      return res.status(404).json({
        error: 'Película no encontrada'
      });
    }

    res.status(200).json({
      title: req.body.title
    });

  } catch (error) {
    console.error(error);

    res.status(400).json({
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
      error: 'No se pudo eliminar la película'
    });
  }
};

// ==========================
// TOGGLE FAVORITE
// ==========================
exports.toggleFavorite = async (req, res) => {
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

    const updated = await prisma.movie.update({
      where: {
        id
      },
      data: {
        isFavorite: !movie.isFavorite
      }
    });

    res.json(updated);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error cambiando favorito'
    });
  }
};

// ==========================
// SET RATING
// ==========================
exports.setRating = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  if (rating < 0 || rating > 10) {
    return res.status(400).json({
      error: 'Rating debe ser entre 0 y 10'
    });
  }

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

    const updated = await prisma.movie.update({
      where: {
        id
      },
      data: {
        rating
      }
    });

    res.json(updated);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Error actualizando rating'
    });
  }
};