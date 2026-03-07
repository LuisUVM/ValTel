import React, { useState, useEffect } from 'react';
import { getRooms } from '../services/roomService';
import RoomCard from '../components/RoomCard';
import RoomFilter from '../components/RoomFilter';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    loadRooms();
  }, [capacity]);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const data = await getRooms(capacity);
      setRooms(data);
    } catch (error) {
      toast.error('Error al cargar las habitaciones');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">Nuestras Habitaciones</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Descubre todas las opciones de alojamiento que tenemos para ti
        </p>

        <RoomFilter capacity={capacity} setCapacity={setCapacity} />

        {loading ? (
          <Loader />
        ) : rooms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">No hay habitaciones disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map(room => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsList;