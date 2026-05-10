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
  try {

    console.log('REQ.USER:', req.user);
    console.log('AUTH HEADER:', req.headers.authorization);
    console.log('BODY:', req.body);

    const {
      title,
      director,
      year,
      posterUrl
    } = req.body;

    // Validaciones básicas
    if (!title || !director || !year) {
      return res.status(400).json({
        error: 'Faltan campos obligatorios'
      });
    }

    const movie = await prisma.movie.create({
      data: {
        title: title.trim(),
        director: director.trim(),
        year: Number(year),
        posterUrl: posterUrl?.trim() || null,
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

    const updatedMovie = await prisma.movie.update({
      where: {
        id
      },
      data: {
        ...req.body,
        posterUrl: req.body.posterUrl?.trim() || null
      }
    });

    res.json(updatedMovie);

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

    await prisma.movie.delete({
      where: {
        id
      }
    });

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

    const updatedMovie = await prisma.movie.update({
      where: {
        id
      },
      data: {
        isFavorite: !movie.isFavorite
      }
    });

    res.json(updatedMovie);

  } catch (error) {
    console.error(error);

    res.status(400).json({
      error: 'No se pudo actualizar favorito'
    });
  }
};

// ==========================
// SET RATING
// ==========================
exports.setRating = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

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

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: {
        rating: Number(rating)
      }
    });

    res.json(updatedMovie);

  } catch (error) {
    console.error(error);

    res.status(400).json({
      error: 'No se pudo actualizar rating'
    });
  }
};