const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'La calificación es obligatoria'],
    min: [1, 'La calificación mínima es 1'],
    max: [5, 'La calificación máxima es 5']
  },
  comment: {
    type: String,
    required: [true, 'El comentario es obligatorio'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

reviewSchema.index({ user: 1, room: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);