import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getRooms = async (capacity = '') => {
  try {
    const url = capacity ? `${API_URL}/rooms?capacity=${capacity}` : `${API_URL}/rooms`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener habitaciones:', error);
    throw error.response?.data || { error: 'Error de conexión' };
  }
};

export const getRoomById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener habitación:', error);
    throw error.response?.data || { error: 'Error de conexión' };
  }
};

export const createRoom = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/rooms`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear habitación:', error);
    throw error.response?.data || { error: 'Error de conexión' };
  }
};

export const updateRoom = async (id, formData, token) => {
  try {
    const response = await axios.put(`${API_URL}/rooms/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar habitación:', error);
    throw error.response?.data || { error: 'Error de conexión' };
  }
};

export const deleteRoom = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar habitación:', error);
    throw error.response?.data || { error: 'Error de conexión' };
  }
};