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