const Room = require('../models/Room');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

// @desc    Obtener todas las habitaciones (con filtro por capacidad)
// @route   GET /api/rooms
const getRooms = async (req, res) => {
  try {
    const { capacity } = req.query;
    let filter = {};
    
    if (capacity) {
      filter.capacity = { $gte: parseInt(capacity) };
    }

    const rooms = await Room.find(filter).sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    console.error('Error en getRooms:', error);
    res.status(500).json({ error: 'Error al obtener habitaciones' });
  }
};

// @desc    Obtener una habitación por ID
// @route   GET /api/rooms/:id
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({ error: 'Habitación no encontrada' });
    }
    
    res.json(room);
  } catch (error) {
    console.error('Error en getRoomById:', error);
    res.status(500).json({ error: 'Error al obtener la habitación' });
  }
};

// @desc    Crear nueva habitación (solo admin)
// @route   POST /api/rooms
const createRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Procesar imágenes subidas
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    if (images.length === 0) {
      return res.status(400).json({ error: 'Al menos una imagen es obligatoria' });
    }

    // Procesar amenities (viene como string, convertir a array)
    let amenities = req.body.amenities;
    if (amenities && typeof amenities === 'string') {
      amenities = amenities.split(',').map(item => item.trim());
    }

    const roomData = {
      name: req.body.name,
      description: req.body.description,
      amenities: amenities || [],
      price: req.body.price,
      capacity: req.body.capacity,
      images
    };

    const room = await Room.create(roomData);
    res.status(201).json(room);
  } catch (error) {
    console.error('Error en createRoom:', error);
    res.status(500).json({ error: 'Error al crear la habitación' });
  }
};

// @desc    Actualizar habitación (solo admin)
// @route   PUT /api/rooms/:id
const updateRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({ error: 'Habitación no encontrada' });
    }

    // Procesar nuevas imágenes si se subieron
    let images = room.images;
    if (req.files && req.files.length > 0) {
      // Eliminar imágenes antiguas del servidor
      room.images.forEach(imgPath => {
        const fullPath = path.join(__dirname, '..', imgPath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      });
      
      images = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Procesar amenities
    let amenities = req.body.amenities;
    if (amenities && typeof amenities === 'string') {
      amenities = amenities.split(',').map(item => item.trim());
    }

    const roomData = {
      name: req.body.name || room.name,
      description: req.body.description || room.description,
      amenities: amenities || room.amenities,
      price: req.body.price || room.price,
      capacity: req.body.capacity || room.capacity,
      images,
      updatedAt: Date.now()
    };

    room = await Room.findByIdAndUpdate(req.params.id, roomData, { new: true });
    res.json(room);
  } catch (error) {
    console.error('Error en updateRoom:', error);
    res.status(500).json({ error: 'Error al actualizar la habitación' });
  }
};

// @desc    Eliminar habitación (solo admin)
// @route   DELETE /api/rooms/:id
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    
    if (!room) {
      return res.status(404).json({ error: 'Habitación no encontrada' });
    }

    // Eliminar imágenes del servidor
    room.images.forEach(imgPath => {
      const fullPath = path.join(__dirname, '..', imgPath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });

    await room.deleteOne();
    res.json({ message: 'Habitación eliminada correctamente' });
  } catch (error) {
    console.error('Error en deleteRoom:', error);
    res.status(500).json({ error: 'Error al eliminar la habitación' });
  }
};

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom
};