const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt'); // Importamos bcrypt al inicio

// Generar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Registrar usuario
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  // Validar errores de express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Encriptar contraseña de forma síncrona
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Crear usuario con la contraseña hasheada
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Responder con los datos del usuario y token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('❌ Error en registerUser:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// @desc    Login usuario
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Comparar contraseña usando el método del modelo (síncrono)
    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('❌ Error en loginUser:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// @desc    Obtener perfil de usuario
// @route   GET /api/auth/profile
const getProfile = async (req, res) => {
  try {
    // req.user viene del middleware protect
    res.json(req.user);
  } catch (error) {
    console.error('❌ Error en getProfile:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile
};