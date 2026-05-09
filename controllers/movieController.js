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