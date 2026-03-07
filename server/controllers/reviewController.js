const Review = require('../models/Review');
const Room = require('../models/Room');
const { validationResult } = require('express-validator');

// @desc    Crear reseña (usuario autenticado)
// @route   POST /api/reviews
const createReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { room, rating, comment } = req.body;
    const userId = req.user._id;

    // Verificar que la habitación existe
    const roomExists = await Room.findById(room);
    if (!roomExists) {
      return res.status(404).json({ error: 'Habitación no encontrada' });
    }

    // Verificar si el usuario ya dejó reseña para esta habitación
    const existingReview = await Review.findOne({ user: userId, room });
    if (existingReview) {
      return res.status(400).json({ error: 'Ya has dejado una reseña para esta habitación' });
    }

    // Crear reseña
    const review = await Review.create({
      user: userId,
      room,
      rating,
      comment
    });

    // Poblar datos del usuario
    await review.populate('user', 'name');

    res.status(201).json(review);
  } catch (error) {
    console.error('Error en createReview:', error);
    res.status(500).json({ error: 'Error al crear la reseña' });
  }
};

// @desc    Obtener reseñas de una habitación
// @route   GET /api/reviews/room/:roomId
const getRoomReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ room: req.params.roomId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error('Error en getRoomReviews:', error);
    res.status(500).json({ error: 'Error al obtener reseñas' });
  }
};

// @desc    Eliminar reseña (admin o dueño)
// @route   DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    // Verificar que sea admin o el dueño de la reseña
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No autorizado para eliminar esta reseña' });
    }

    await review.deleteOne();
    res.json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    console.error('Error en deleteReview:', error);
    res.status(500).json({ error: 'Error al eliminar reseña' });
  }
};

module.exports = {
  createReview,
  getRoomReviews,
  deleteReview
};