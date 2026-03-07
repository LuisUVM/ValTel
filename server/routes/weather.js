const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = 'd9e54c7255fa3c0c3353e1118081dd07'; // Tu API key
const CIUDAD = 'Valera,ve';
const UNITS = 'metric';
const LANG = 'es';

// Ruta para obtener clima actual
router.get('/current', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${CIUDAD}&appid=${API_KEY}&units=${UNITS}&lang=${LANG}`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener clima:', error.message);
    res.status(500).json({ error: 'Error al obtener clima' });
  }
});

// Ruta para obtener pronóstico
router.get('/forecast', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${CIUDAD}&appid=${API_KEY}&units=${UNITS}&lang=${LANG}&cnt=5`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener pronóstico:', error.message);
    res.status(500).json({ error: 'Error al obtener pronóstico' });
  }
});

module.exports = router;