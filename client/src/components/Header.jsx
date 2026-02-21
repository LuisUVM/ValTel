import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Hotel Valera
          </Link>

          {/* Menú desktop */}
          <ul className="hidden md:flex space-x-6">
            <li><Link to="/" className="hover:text-blue-600 transition">Inicio</Link></li>
            <li><Link to="/servicios" className="hover:text-blue-600 transition">Servicios</Link></li>
            <li><Link to="/blog" className="hover:text-blue-600 transition">Blog</Link></li>
            <li><Link to="/testimonios" className="hover:text-blue-600 transition">Testimonios</Link></li>
            <li><Link to="/reservas" className="hover:text-blue-600 transition">Reservas</Link></li>
          </ul>

          {/* Botón menú hamburguesa (mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú mobile desplegable */}
        {isOpen && (
          <ul className="md:hidden mt-4 space-y-2 pb-4">
            <li><Link to="/" className="block py-2 hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Inicio</Link></li>
            <li><Link to="/servicios" className="block py-2 hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Servicios</Link></li>
            <li><Link to="/blog" className="block py-2 hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Blog</Link></li>
            <li><Link to="/testimonios" className="block py-2 hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Testimonios</Link></li>
            <li><Link to="/reservas" className="block py-2 hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Reservas</Link></li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;