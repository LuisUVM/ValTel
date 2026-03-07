import React from 'react';
import ClimaWidget from '../components/ClimaWidget';

const heroImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

const Inicio = () => {
  return (
    <div>
      {/* Hero Section - No necesita dark mode porque la imagen tiene overlay oscuro */}
      <section 
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})` }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Hotel Valera</h1>
          <p className="text-xl md:text-2xl mb-8">Tu refugio en los Andes venezolanos</p>
          <a 
            href="/reservas" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Reserva ahora
          </a>
        </div>
      </section>

      {/* Widget de clima - Fondo blanco → oscuro */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <ClimaWidget />
          </div>
        </div>
      </section>

      {/* Servicios destacados - Fondo gris claro → gris más oscuro */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🏨</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Habitaciones de lujo</h3>
              <p className="text-gray-600 dark:text-gray-300">Habitaciones espaciosas con vista a la montaña, aire acondicionado y WiFi gratis.</p>
            </div>
            {/* Servicio 2 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Restaurante gourmet</h3>
              <p className="text-gray-600 dark:text-gray-300">Disfruta de la mejor gastronomía local e internacional en nuestro restaurante.</p>
            </div>
            {/* Servicio 3 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">💆‍♂️</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Spa y bienestar</h3>
              <p className="text-gray-600 dark:text-gray-300">Relájate con nuestros tratamientos de spa, sauna y masajes terapéuticos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios destacados - Fondo blanco → oscuro */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Lo que dicen nuestros huéspedes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonio 1 */}
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-xl">
                  👤
                </div>
                <div className="ml-4">
                  <p className="font-bold dark:text-white">María González</p>
                  <p className="text-yellow-500">★★★★★</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">"Una experiencia inolvidable. La atención del personal es excepcional y las instalaciones son de primera. Definitivamente volveré."</p>
            </div>
            {/* Testimonio 2 */}
            <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-xl">
                  👤
                </div>
                <div className="ml-4">
                  <p className="font-bold dark:text-white">Carlos Rodríguez</p>
                  <p className="text-yellow-500">★★★★★</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">"El mejor hotel en Valera. La ubicación es perfecta y las habitaciones son muy cómodas. El desayuno buffet es delicioso."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog destacado - Fondo gris claro → gris más oscuro */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Últimas del blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Artículo 1 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                [Imagen]
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">15 Feb 2026</p>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Qué hacer en Valera</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Descubre los mejores lugares turísticos en los Andes venezolanos...</p>
                <a href="/blog/1" className="text-blue-600 dark:text-blue-400 hover:underline">Leer más →</a>
              </div>
            </div>
            {/* Artículo 2 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                [Imagen]
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">10 Feb 2026</p>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Gastronomía trujillana</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Los platos típicos que no puedes dejar de probar en tu visita...</p>
                <a href="/blog/2" className="text-blue-600 dark:text-blue-400 hover:underline">Leer más →</a>
              </div>
            </div>
            {/* Artículo 3 */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                [Imagen]
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">5 Feb 2026</p>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Consejos de viaje</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">Todo lo que necesitas saber antes de viajar a los Andes...</p>
                <a href="/blog/3" className="text-blue-600 dark:text-blue-400 hover:underline">Leer más →</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;