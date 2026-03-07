const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  description: String,
  amenities: [String],
  price: Number,
  capacity: Number,
  images: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// SIN MIDDLEWARE - eliminamos el pre('save') problemático

module.exports = mongoose.model('Room', roomSchema);