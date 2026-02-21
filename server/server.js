const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const reservasRouter = require('./routes/reservas');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/reservas', reservasRouter);

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});