import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRooms, deleteRoom } from '../../services/roomService';
import { useAuth } from '../../context/AuthContext';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await getRooms();
      setRooms(data);
    } catch (error) {
      toast.error('Error al cargar habitaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta habitación?')) return;

    try {
      await deleteRoom(id, localStorage.getItem('token'));
      setRooms(rooms.filter(room => room._id !== id));
      toast.success('Habitación eliminada');
    } catch (error) {
      toast.error('Error al eliminar habitación');
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestionar Habitaciones</h2>
        <Link
          to="/admin/habitaciones/nueva"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
        >
          <FaPlus className="mr-2" />
          Nueva Habitación
        </Link>
      </div>

      {rooms.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No hay habitaciones registradas</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Capacidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room._id}>
                  <td className="px-6 py-4">
                    <img
                      src={room.images?.[0] ? `http://localhost:5000${room.images[0]}` : 'https://via.placeholder.com/50'}
                      alt={room.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">{room.name}</td>
                  <td className="px-6 py-4">${room.price}</td>
                  <td className="px-6 py-4">{room.capacity} personas</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/habitaciones/editar/${room._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RoomList;