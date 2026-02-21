import React, { useState } from 'react';

const articulosData = [
  {
    id: 1,
    titulo: "Descubriendo los Andes Venezolanos: Guía para visitar Valera",
    resumen: "Conoce los mejores lugares turísticos, restaurantes y actividades en la capital económica de Trujillo.",
    contenido: "Valera es una ciudad llena de contrastes, donde la modernidad se encuentra con la tradición andina. En esta guía completa te contamos todo lo que necesitas saber para aprovechar al máximo tu visita...",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlKA4erkmIySUg__xJDYv-5LoYEyDpkoR7A&s",
    autor: "María Fernández",
    fecha: "15 Feb 2026",
    categoria: "Guías de viaje",
    tiempoLectura: "5 min",
    tags: ["Valera", "Andes", "Turismo"]
  },
  {
    id: 2,
    titulo: "Gastronomía Trujillana: Sabores de los Andes",
    resumen: "Un recorrido por los platos típicos de la región andina y dónde probarlos en Valera.",
    contenido: "La gastronomía de Trujillo es un reflejo de su cultura y tradiciones. Desde la tradicional arepa andina hasta el exquisito dulce de lechoza, descubre los sabores que hacen única a esta región...",
    imagen: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    autor: "Carlos Méndez",
    fecha: "10 Feb 2026",
    categoria: "Gastronomía",
    tiempoLectura: "4 min",
    tags: ["Gastronomía", "Comida típica", "Restaurantes"]
  },
  {
    id: 3,
    titulo: "Los Mejores Miradores de los Andes cerca de Valera",
    resumen: "Disfruta de vistas espectaculares de la cordillera andina desde estos increíbles puntos panorámicos.",
    contenido: "A pocos minutos de Valera encontrarás miradores con vistas impresionantes de los Andes. Te contamos cómo llegar y cuál es la mejor hora para visitarlos...",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz9mM9aR9N1JmDiuDULq0OrNglrBBFCnHuog&s",
    autor: "Ana Torres",
    fecha: "5 Feb 2026",
    categoria: "Naturaleza",
    tiempoLectura: "6 min",
    tags: ["Miradores", "Naturaleza", "Fotografía"]
  },
  {
    id: 4,
    titulo: "Consejos para Viajar a los Andes Venezolanos",
    resumen: "Todo lo que debes saber antes de tu viaje: clima, qué ropa llevar, transporte y más.",
    contenido: "Viajar a los Andes requiere cierta preparación. Te compartimos consejos prácticos basados en nuestra experiencia para que tu viaje sea inolvidable...",
    imagen: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    autor: "Pedro Rivas",
    fecha: "28 Ene 2026",
    categoria: "Consejos",
    tiempoLectura: "7 min",
    tags: ["Consejos", "Planificación", "Viajes"]
  },
  {
    id: 5,
    titulo: "La Plaza Bolívar de Valera: Historia y Tradición",
    resumen: "Conoce la historia y los secretos de la principal plaza de la ciudad, punto de encuentro de locales y visitantes.",
    contenido: "La Plaza Bolívar de Valera es mucho más que un espacio público. Descubre su historia, los eventos que allí se realizan y los cafés tradicionales que la rodean...",
    imagen: "https://iamvenezuela.org/wp-content/uploads/sites/4/2017/07/imag2914-e1500103986780.jpg",
    autor: "Isabel Rojas",
    fecha: "20 Ene 2026",
    categoria: "Cultura",
    tiempoLectura: "5 min",
    tags: ["Historia", "Cultura", "Centro histórico"]
  },
  {
    id: 6,
    titulo: "Spa y Bienestar en los Andes: Relájate en Valera",
    resumen: "Los mejores centros de bienestar y spa para desconectarte y renovar energías en tu visita a los Andes.",
    contenido: "Después de un día de exploración, nada mejor que un buen masaje o un baño de vapor. Te recomendamos los mejores spas de Valera y sus alrededores...",
    imagen: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    autor: "Laura Méndez",
    fecha: "15 Ene 2026",
    categoria: "Bienestar",
    tiempoLectura: "4 min",
    tags: ["Spa", "Bienestar", "Relajación"]
  }
];

const Blog = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');

  // Obtener categorías únicas
  const categorias = ['todos', ...new Set(articulosData.map(art => art.categoria.toLowerCase()))];

  // Filtrar artículos por categoría
  const articulosFiltrados = categoriaSeleccionada === 'todos'
    ? articulosData
    : articulosData.filter(art => art.categoria.toLowerCase() === categoriaSeleccionada);

  return (
    <div>
      {/* Hero de la página */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog de Viajes</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Descubre artículos, guías y consejos sobre turismo en Trujillo y los Andes venezolanos
          </p>
        </div>
      </section>

      {/* Filtros por categoría */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaSeleccionada(categoria)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  categoriaSeleccionada === categoria
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {categoria === 'todos' ? 'Todos' : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de artículos */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articulosFiltrados.map((articulo) => (
              <article key={articulo.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300">
                {/* Imagen del artículo */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={articulo.imagen} 
                    alt={articulo.titulo}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Contenido */}
                <div className="p-6">
                  {/* Categoría y fecha */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                      {articulo.categoria}
                    </span>
                    <span className="text-gray-400 text-sm">{articulo.fecha}</span>
                  </div>

                  {/* Título */}
                  <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition">
                    <a href={`/blog/${articulo.id}`}>{articulo.titulo}</a>
                  </h2>

                  {/* Resumen */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {articulo.resumen}
                  </p>

                  {/* Meta información */}
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700">{articulo.autor}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {articulo.tiempoLectura}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {articulo.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Mensaje si no hay artículos */}
          {articulosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No hay artículos en esta categoría</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">¿No te pierdas ningún artículo?</h2>
          <p className="text-gray-600 mb-8">
            Suscríbete a nuestro newsletter y recibe las últimas guías y consejos sobre turismo en Trujillo
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Suscribirme
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-4">
            Respetamos tu privacidad. Sin spam, solo contenido de calidad.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blog;