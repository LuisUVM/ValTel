import React, { useState } from 'react';

const testimoniosData = [
  {
    id: 1,
    nombre: "María González",
    ubicacion: "Caracas, Venezuela",
    fecha: "15 Feb 2026",
    calificacion: 5,
    comentario: "Excelente hotel, la atención del personal es insuperable. Las habitaciones son muy cómodas y la vista a los Andes es espectacular. El desayuno buffet tiene muchas opciones y todo está delicioso. Sin duda volveré en mi próxima visita a Valera.",
    avatar: "👩‍🦰"
  },
  {
    id: 2,
    nombre: "Carlos Rodríguez",
    ubicacion: "Mérida, Venezuela",
    fecha: "10 Feb 2026",
    calificacion: 5,
    comentario: "El mejor hotel de Valera. La ubicación es perfecta, cerca de todo pero en una zona tranquila. El spa es increíble, me hicieron un masaje reparador después de una semana de trabajo. Muy recomendado.",
    avatar: "👨‍🦰"
  },
  {
    id: 3,
    nombre: "Ana Martínez",
    ubicacion: "Maracaibo, Venezuela",
    fecha: "5 Feb 2026",
    calificacion: 4,
    comentario: "Muy buena experiencia en general. La habitación amplia y limpia, el personal muy amable. Solo mejorarían la velocidad del WiFi en las habitaciones del último piso. Por lo demás, todo excelente.",
    avatar: "👩‍🦱"
  },
  {
    id: 4,
    nombre: "José Ramírez",
    ubicacion: "Valencia, Venezuela",
    fecha: "28 Ene 2026",
    calificacion: 5,
    comentario: "Pasamos una semana maravillosa en familia. Los niños disfrutaron mucho la piscina y las actividades. El restaurante tiene platos típicos deliciosos. El personal siempre dispuesto a ayudar. ¡Volveremos pronto!",
    avatar: "👨‍🦳"
  },
  {
    id: 5,
    nombre: "Laura Torres",
    ubicacion: "San Cristóbal, Venezuela",
    fecha: "20 Ene 2026",
    calificacion: 5,
    comentario: "Increíble experiencia. El hotel es precioso, con una arquitectura que combina lo moderno con lo tradicional andino. La habitación suite tiene una vista privilegiada. El servicio de habitaciones rápido y eficiente.",
    avatar: "👩"
  },
  {
    id: 6,
    nombre: "Pedro Sánchez",
    ubicacion: "Barquisimeto, Venezuela",
    fecha: "15 Ene 2026",
    calificacion: 4,
    comentario: "Buena relación calidad-precio. El hotel está bien ubicado, las instalaciones son cómodas y limpias. El personal de recepción muy atento. El desayuno podría tener más opciones para vegetarianos.",
    avatar: "👨‍🦱"
  },
  {
    id: 7,
    nombre: "Isabel Rojas",
    ubicacion: "Caracas, Venezuela",
    fecha: "8 Ene 2026",
    calificacion: 5,
    comentario: "Viaje de negocios pero logré desconectarme gracias al spa. El salón de eventos está muy bien equipado. La comida del restaurante es excelente. El personal del hotel siempre sonriente y dispuesto a ayudar.",
    avatar: "👩‍🦳"
  },
  {
    id: 8,
    nombre: "Ricardo Gómez",
    ubicacion: "Miami, USA",
    fecha: "2 Ene 2026",
    calificacion: 5,
    comentario: "Volví a mi país después de 10 años y este hotel me hizo sentir como en casa. La atención, la comida, la limpieza, todo de primera. Los tours que ofrecen a la Plaza Bolívar y los Andes son imperdibles.",
    avatar: "👨"
  }
];

// Componente para mostrar estrellas
const Estrellas = ({ calificacion }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((estrella) => (
        <span key={estrella} className="text-yellow-400 text-xl">
          {estrella <= calificacion ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

const Testimonios = () => {
  const [filtro, setFiltro] = useState('todos');

  // Filtrar testimonios por calificación
  const testimoniosFiltrados = filtro === 'todos' 
    ? testimoniosData 
    : testimoniosData.filter(t => t.calificacion === parseInt(filtro));

  // Calcular estadísticas
  const promedio = (testimoniosData.reduce((acc, t) => acc + t.calificacion, 0) / testimoniosData.length).toFixed(1);
  const total5 = testimoniosData.filter(t => t.calificacion === 5).length;
  const total4 = testimoniosData.filter(t => t.calificacion === 4).length;

  return (
    <div>
      {/* Hero de la página */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Testimonios</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Lo que nuestros huéspedes dicen sobre nosotros
          </p>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{promedio}</div>
              <Estrellas calificacion={Math.round(promedio)} />
              <p className="text-gray-600 mt-2">Calificación promedio</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{total5}</div>
              <Estrellas calificacion={5} />
              <p className="text-gray-600 mt-2">Valoraciones de 5 estrellas</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">{total4}</div>
              <Estrellas calificacion={4} />
              <p className="text-gray-600 mt-2">Valoraciones de 4 estrellas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setFiltro('todos')}
              className={`px-6 py-2 rounded-full transition ${
                filtro === 'todos' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltro('5')}
              className={`px-6 py-2 rounded-full transition ${
                filtro === '5' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              5 ⭐
            </button>
            <button
              onClick={() => setFiltro('4')}
              className={`px-6 py-2 rounded-full transition ${
                filtro === '4' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              4 ⭐
            </button>
          </div>
        </div>
      </section>

      {/* Lista de testimonios */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimoniosFiltrados.map((testimonio) => (
              <div key={testimonio.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="p-6">
                  {/* Header con avatar y nombre */}
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                      {testimonio.avatar}
                    </div>
                    <div className="ml-4">
                      <p className="font-bold text-lg">{testimonio.nombre}</p>
                      <p className="text-gray-500 text-sm">{testimonio.ubicacion}</p>
                    </div>
                  </div>

                  {/* Calificación y fecha */}
                  <div className="flex items-center justify-between mb-3">
                    <Estrellas calificacion={testimonio.calificacion} />
                    <span className="text-gray-400 text-sm">{testimonio.fecha}</span>
                  </div>

                  {/* Comentario */}
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "{testimonio.comentario}"
                  </p>

                  {/* Línea decorativa */}
                  <div className="border-t border-gray-100 pt-3">
                    <span className="text-blue-600 text-sm font-semibold">Huésped verificado</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje si no hay testimonios */}
          {testimoniosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No hay testimonios con esa calificación</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonios;