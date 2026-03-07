const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db'); 

// Conexion a MongoDB
connectDB();

// Importacion de RUTAS
const reservasRouter = require('./routes/reservas');
const authRouter = require('./routes/auth'); 
const roomsRouter = require('./routes/rooms'); 
const reviewsRouter = require('./routes/reviews'); 
const weatherRouter = require('./routes/weather');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos 
app.use('/uploads', express.static('uploads')); // <-- Para multer

// Rutas USADAS
app.use('/api/reservas', reservasRouter);
app.use('/api/auth', authRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/weather', weatherRouter);

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Servidor funcionando correctamente',
    version: '2.0',
    features: ['autenticación', 'habitaciones', 'reseñas', 'reservas']
  });
});

// Middleware para manejo de errores 
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