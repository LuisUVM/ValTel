import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const obtenerClima = async () => {
  try {
    const response = await axios.get(`${API_URL}/weather/current`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el clima real:', error);
    // Fallback a datos simulados
    return {
      weather: [{ main: 'Clear', description: 'cielo despejado' }],
      main: {
        temp: 24,
        feels_like: 23,
        humidity: 65,
        pressure: 1015
      },
      wind: { speed: 8 }
    };
  }
};

export const obtenerPronostico = async () => {
  try {
    const response = await axios.get(`${API_URL}/weather/forecast`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener pronóstico real:', error);
    // Fallback a datos simulados
    const dias = [
      { dt: Date.now() / 1000 + 86400, weather: [{ main: 'Clouds' }], main: { temp: 23 } },
      { dt: Date.now() / 1000 + 172800, weather: [{ main: 'Rain' }], main: { temp: 21 } },
      { dt: Date.now() / 1000 + 259200, weather: [{ main: 'Clear' }], main: { temp: 25 } },
      { dt: Date.now() / 1000 + 345600, weather: [{ main: 'Clouds' }], main: { temp: 22 } },
      { dt: Date.now() / 1000 + 432000, weather: [{ main: 'Clear' }], main: { temp: 26 } }
    ];
    return { list: dias };
  }
};