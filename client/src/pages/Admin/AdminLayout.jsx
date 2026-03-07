import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaBed, FaSignOutAlt } from 'react-icons/fa';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header del admin */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Panel de Administración</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Hola, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-500 hover:text-red-700"
              >
                <FaSignOutAlt className="mr-1" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navegación del admin */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6">
            <Link
              to="/admin"
              className="py-3 px-2 text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 flex items-center"
            >
              <FaHome className="mr-1" />
              Dashboard
            </Link>
            <Link
              to="/admin/habitaciones"
              className="py-3 px-2 text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 flex items-center"
            >
              <FaBed className="mr-1" />
              Habitaciones
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;