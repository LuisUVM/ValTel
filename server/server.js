const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); // <-- NUEVO: conexión a MongoDB

// Conectar a MongoDB
connectDB();

// Importar rutas (actuales y nuevas)
const reservasRouter = require('./routes/reservas');
const authRouter = require('./routes/auth'); // <-- NUEVA: autenticación
const roomsRouter = require('./routes/rooms'); // <-- NUEVA: habitaciones
const reviewsRouter = require('./routes/reviews'); // <-- NUEVA: reseñas

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (para imágenes subidas)
app.use('/uploads', express.static('uploads')); // <-- NUEVO: para multer

// Rutas
app.use('/api/reservas', reservasRouter);
app.use('/api/auth', authRouter); // <-- NUEVA
app.use('/api/rooms', roomsRouter); // <-- NUEVA
app.use('/api/reviews', reviewsRouter); // <-- NUEVA

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Servidor funcionando correctamente',
    version: '2.0',
    features: ['autenticación', 'habitaciones', 'reseñas', 'reservas']
  });
});

// Middleware para manejo de errores (opcional pero recomendado)
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    details: err.message 
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📦 Base de datos: ${process.env.MONGO_URI ? 'Conectada' : 'No configurada'}`);
});