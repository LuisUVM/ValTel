import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoomById } from '../services/roomService';
import ImageGallery from '../components/ImageGallery';
import Reviews from '../components/Reviews';
import Loader from '../components/Loader';
import { FaUser, FaDollarSign, FaWifi, FaTv, FaSnowflake, FaCoffee, FaBath } from 'react-icons/fa';
import { toast } from 'react-toastify';

const amenityIcons = {
  'wifi': <FaWifi />,
  'tv': <FaTv />,
  'aire acondicionado': <FaSnowflake />,
  'minibar': <FaCoffee />,
  'baño privado': <FaBath />
};

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoom();
  }, [id]);

  const loadRoom = async () => {
    try {
      const data = await getRoomById(id);
      setRoom(data);
    } catch (error) {
      toast.error('Error al cargar la habitación');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Loader />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Habitación no encontrada</h2>
          <Link to="/habitaciones" className="text-blue-600 hover:underline">
            Volver a habitaciones
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Enlace para volver */}
        <Link to="/habitaciones" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Volver a habitaciones
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6">{room.name}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Galería de imágenes */}
            <ImageGallery images={room.images} />

            {/* Información */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Descripción</h2>
                <p className="text-gray-700 leading-relaxed">{room.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <FaUser className="text-blue-600 text-2xl mx-auto mb-2" />
                  <p className="text-gray-600">Capacidad</p>
                  <p className="font-bold">{room.capacity} personas</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <FaDollarSign className="text-green-600 text-2xl mx-auto mb-2" />
                  <p className="text-gray-600">Precio</p>
                  <p className="font-bold">${room.price} / noche</p>
                </div>
              </div>

              {/* Comodidades */}
              {room.amenities && room.amenities.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Comodidades</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <span className="text-blue-600 mr-2">
                          {amenityIcons[amenity.toLowerCase()] || '•'}
                        </span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón de reserva */}
              <Link
                to={`/reservas?room=${room._id}`}
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                Reservar ahora
              </Link>
            </div>
          </div>

          {/* Sección de reseñas */}
          <Reviews roomId={room._id} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;