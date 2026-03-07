const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect, admin } = require('../middleware/authMiddleware');
const { uploadMultiple } = require('../middleware/uploadMiddleware');
const {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');

// Validaciones para crear/editar habitación
const roomValidation = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  body('price').isNumeric().withMessage('El precio debe ser un número').custom(value => value > 0),
  body('capacity').isInt({ min: 1 }).withMessage('La capacidad debe ser al menos 1')
];

// Rutas públicas
router.get('/', getRooms);
router.get('/:id', getRoomById);

// Rutas protegidas (solo admin)
router.post('/', protect, admin, uploadMultiple, roomValidation, createRoom);
router.put('/:id', protect, admin, uploadMultiple, roomValidation, updateRoom);
router.delete('/:id', protect, admin, deleteRoom);

module.exports = router;