import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaDollarSign, FaStar } from 'react-icons/fa';

const RoomCard = ({ room }) => {
  // Calcular promedio de reseñas (simulado por ahora)
  const averageRating = 4.5; // Esto lo conectaremos después con reseñas reales
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      {/* Imagen de la habitación */}
      <div className="h-48 overflow-hidden">
        <img 
          src={room.images?.[0] ? `http://localhost:5000${room.images[0]}` : 'https://via.placeholder.com/400x300'}
          alt={room.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Contenido */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{room.name}</h3>
        
        {/* Capacidad y precio */}
        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          <div className="flex items-center">
            <FaUser className="mr-1" />
            <span>{room.capacity} personas</span>
          </div>
          <div className="flex items-center text-blue-600 font-bold">
            <FaDollarSign />
            <span>{room.price} / noche</span>
          </div>
        </div>

        {/* Descripción corta */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {room.description}
        </p>

        {/* Amenidades (primeras 3) */}
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities?.slice(0, 3).map((amenity, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
          {room.amenities?.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              +{room.amenities.length - 3}
            </span>
          )}
        </div>

        {/* Reseñas y botón */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-yellow-500">
            <FaStar />
            <span className="ml-1 text-gray-600">{averageRating}</span>
          </div>
          <Link 
            to={`/habitacion/${room._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;