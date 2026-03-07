import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información del hotel */}
          <div>
            <h3 className="text-xl font-bold mb-4">ValTel</h3>
            <p className="text-gray-300 dark:text-gray-200 mb-2">Avenida Páez, entre calles 5 y 6, Sector Centro.</p>
            <p className="text-gray-300 dark:text-gray-200 mb-2">La Puerta, Valera, Estado Trujillo.</p>
            <p className="text-gray-300 dark:text-gray-200 mb-2">Venezuela</p>
            <p className="text-gray-300 dark:text-gray-200 mt-4">📞 0412-9089673</p>
            <p className="text-gray-300 dark:text-gray-200"> ✉️   rodriguezhernandezlo@uvm.edu.ve</p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 dark:text-gray-200 hover:text-white transition">Inicio</Link></li>
              <li><Link to="/servicios" className="text-gray-300 dark:text-gray-200 hover:text-white transition">Servicios</Link></li>
              <li><Link to="/blog" className="text-gray-300 dark:text-gray-200 hover:text-white transition">Blog</Link></li>
              <li><Link to="/testimonios" className="text-gray-300 dark:text-gray-200 hover:text-white transition">Testimonios</Link></li>
              <li><Link to="/reservas" className="text-gray-300 dark:text-gray-200 hover:text-white transition">Reservas</Link></li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h3 className="text-xl font-bold mb-4">Horarios</h3>
            <p className="text-gray-300 dark:text-gray-200">Recepción: 24/7</p>
            <p className="text-gray-300 dark:text-gray-200">Restaurante: 7:00 AM - 10:00 PM</p>
            <p className="text-gray-300 dark:text-gray-200">Spa: 9:00 AM - 8:00 PM</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-4 text-center text-gray-400 dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} Hotel Valera. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;