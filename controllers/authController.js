const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ==========================
// REGISTER
// ==========================
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword
      }
    });

    res.json({ message: 'Usuario creado correctamente' });

  } catch (error) {
    console.error('REGISTER ERROR:', error);
    res.status(500).json({ error: 'Error en registro' });
  }
};

// ==========================
// LOGIN
// ==========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // ✅ TOKEN BIEN HECHO
    const token = jwt.sign(
      { userId: user.id },
      'secret123',
      { expiresIn: '1d' }
    );

    res.json({ token });

  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ error: 'Error en login' });
  }
};