const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    console.log('AUTH HEADER:', authHeader);

    if (!authHeader) {
      return res.status(401).json({
        error: 'No autorizado'
      });
    }

    const token = authHeader.split(' ')[1];

    console.log('TOKEN:', token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log('DECODED:', decoded);

    req.user = {
      userId: decoded.userId
    };

    next();

  } catch (error) {

    console.error('AUTH ERROR:', error);

    res.status(401).json({
      error: 'Token inválido'
    });
  }
};