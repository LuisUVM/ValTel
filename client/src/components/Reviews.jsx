import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRoomReviews, createReview, deleteReview } from '../services/reviewService';
import { FaStar, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Reviews = ({ roomId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    loadReviews();
  }, [roomId]);

  const loadReviews = async () => {
    try {
      const data = await getRoomReviews(roomId);
      setReviews(data);
    } catch (error) {
      toast.error('Error al cargar reseñas');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para dejar una reseña');
      return;
    }

    setSubmitting(true);
    try {
      const newReview = await createReview(
        { room: roomId, rating, comment },
        localStorage.getItem('token')
      );
      setReviews([newReview, ...reviews]);
      setRating(5);
      setComment('');
      toast.success('Reseña publicada');
    } catch (error) {
      toast.error(error.error || 'Error al publicar reseña');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('¿Eliminar esta reseña?')) return;
    
    try {
      await deleteReview(reviewId, localStorage.getItem('token'));
      setReviews(reviews.filter(r => r._id !== reviewId));
      toast.success('Reseña eliminada');
    } catch (error) {
      toast.error('Error al eliminar reseña');
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4 dark:text-white">Reseñas</h3>
      
      {/* Resumen de calificaciones */}
      {reviews.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mb-6">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-300 mr-3">{averageRating}</span>
            <div className="flex text-yellow-400 text-xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className={star <= averageRating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} />
              ))}
            </div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">({reviews.length} reseñas)</span>
          </div>
        </div>
      )}

      {/* Formulario de reseña */}
      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h4 className="font-bold mb-4 dark:text-white">Deja tu reseña</h4>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Calificación
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="5">5 - Excelente</option>
              <option value="4">4 - Muy buena</option>
              <option value="3">3 - Buena</option>
              <option value="2">2 - Regular</option>
              <option value="1">1 - Mala</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Comentario
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Comparte tu experiencia..."
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? 'Publicando...' : 'Publicar reseña'}
          </button>
        </form>
      )}

      {/* Lista de reseñas */}
      {loading ? (
        <div className="text-center py-4 dark:text-gray-300">Cargando reseñas...</div>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No hay reseñas aún. ¡Sé el primero en comentar!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="font-bold mr-3 dark:text-white">{review.user?.name}</span>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    {new Date(review.createdAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
                
                {(user?._id === review.user?._id || user?.role === 'admin') && (
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;