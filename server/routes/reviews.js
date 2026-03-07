const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createReview,
  getRoomReviews,
  deleteReview
} = require('../controllers/reviewController');

// Validaciones para crear reseña
const reviewValidation = [
  body('room').notEmpty().withMessage('La habitación es obligatoria'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('La calificación debe ser entre 1 y 5'),
  body('comment').notEmpty().withMessage('El comentario es obligatorio')
];

// Rutas públicas
router.get('/room/:roomId', getRoomReviews);

// Rutas protegidas (requieren login)
router.post('/', protect, reviewValidation, createReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;