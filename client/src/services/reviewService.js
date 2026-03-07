import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getRoomReviews = async (roomId) => {
  try {
    const response = await axios.get(`${API_URL}/reviews/room/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    throw error.response?.data || { error: 'Error de conexión' };
  }
};

export const createReview = async (reviewData, token) => {
  try {
    const response = await axios.post(`${API_URL}/reviews`, reviewData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear reseña:', error);
    throw error.response?.data || { error: 'Error de conexión' };
  }
};

export const deleteReview = async (reviewId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    throw error.response?.data || { error: 'Error de conexión' };
  }
};