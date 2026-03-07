import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRooms } from '../../services/roomService';
import { FaBed, FaStar, FaUsers } from 'react-icons/fa';
import Loader from '../../components/Loader';

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const roomsData = await getRooms();
      setRooms(roomsData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const totalRooms = rooms.length;
  const totalCapacity = rooms.reduce((acc, room) => acc + room.capacity, 0);
  const averagePrice = rooms.length > 0
    ? (rooms.reduce((acc, room) => acc + room.price, 0) / rooms.length).toFixed(2)
    : 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaBed className="text-blue-600 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Habitaciones</p>
              <p className="text-3xl font-bold">{totalRooms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <FaUsers className="text-green-600 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Capacidad Total</p>
              <p className="text-3xl font-bold">{totalCapacity}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaStar className="text-yellow-600 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Precio Promedio</p>
              <p className="text-3xl font-bold">${averagePrice}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold mb-4">Acciones rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/habitaciones/nueva"
            className="bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Nueva Habitación
          </Link>
          <Link
            to="/admin/habitaciones"
            className="bg-gray-600 text-white text-center py-3 rounded-lg hover:bg-gray-700 transition"
          >
            Gestionar Habitaciones
          </Link>
          <Link
            to="/"
            className="bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition"
          >
            Ver Sitio Web
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;