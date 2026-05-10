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
    const {
      title,
      director,
      year,
      posterUrl
    } = req.body;

    // Validaciones básicas
    if (!title || !director || !year) {
      return res.status(400).json({
        error: 'Título, director y año son obligatorios'
      });
    }

    // Verificar usuario autenticado
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        error: 'Usuario no autenticado'
      });
    }

    // Verificar que el usuario existe
    const userExists = await prisma.user.findUnique({
      where: {
        id: req.user.userId
      }
    });

    if (!userExists) {
      return res.status(401).json({
        error: 'Usuario no existe'
      });
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        director,
        year: Number(year),
        posterUrl,
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
        ...req.body
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
      where: {
        id
      },
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