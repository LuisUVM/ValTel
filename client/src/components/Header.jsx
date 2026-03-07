import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FaSun, FaMoon, FaUser } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-black shadow-md sticky top-0 z-50 transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-yellow-400">
            Hotel Valera
          </Link>

          {/* Menú desktop y controles */}
          <div className="flex items-center space-x-4">
            {/* Enlaces de navegación desktop */}
            <ul className="hidden md:flex space-x-6">
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-yellow-400 transition text-gray-700 dark:text-gray-200">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="hover:text-blue-600 dark:hover:text-yellow-400 transition text-gray-700 dark:text-gray-200">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-600 dark:hover:text-yellow-400 transition text-gray-700 dark:text-gray-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/testimonios" className="hover:text-blue-600 dark:hover:text-yellow-400 transition text-gray-700 dark:text-gray-200">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link to="/reservas" className="hover:text-blue-600 dark:hover:text-yellow-400 transition text-gray-700 dark:text-gray-200">
                  Reservas
                </Link>
              </li>
              <li>
                <Link to="/habitaciones" className="hover:text-blue-600 dark:hover:text-yellow-400 transition text-gray-700 dark:text-gray-200 font-semibold">
                  Habitaciones
                </Link>
              </li>
            </ul>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Cambiar tema"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Menú de usuario */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <FaUser className="text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-700 dark:text-gray-200">{user?.name}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Panel Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 dark:text-yellow-400 border border-blue-600 dark:border-yellow-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition"
                >
                  Registrarse
                </Link>
              </div>
            )}

            {/* Botón menú hamburguesa (mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden focus:outline-none"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú mobile desplegable */}
        {isOpen && (
          <ul className="md:hidden mt-4 space-y-2 pb-4">
            <li>
              <Link
                to="/"
                className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/servicios"
                className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/testimonios"
                className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Testimonios
              </Link>
            </li>
            <li>
              <Link
                to="/reservas"
                className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Reservas
              </Link>
            </li>
            <li>
              <Link
                to="/habitaciones"
                className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Habitaciones
              </Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/perfil"
                    className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link
                      to="/admin"
                      className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-yellow-400 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Panel Admin
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="block w-full text-left py-2 text-red-600 dark:text-red-400 hover:text-blue-600 dark:hover:text-yellow-400 transition"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;