const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Validaciones
const registerValidation = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria')
];

// Rutas públicas
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

// Ruta protegida
router.get('/profile', protect, getProfile);

module.exports = router;