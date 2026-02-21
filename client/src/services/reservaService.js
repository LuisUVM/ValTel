import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const enviarReserva = async (datosReserva) => {
  try {
    const response = await axios.post(`${API_URL}/reservas`, datosReserva);
    return response.data;
  } catch (error) {
    console.error('Error al enviar reserva:', error);
    
    // Si el error viene del servidor con un mensaje
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    
    // Error de red o desconocido
    throw { error: 'Error de conexión con el servidor' };
  }
};