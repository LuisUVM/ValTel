import React from 'react';

const serviciosData = [
  {
    id: 1,
    icon: "🏨",
    titulo: "Habitaciones Estándar",
    descripcion: "Habitaciones acogedoras con todas las comodidades para una estancia confortable.",
    precio: "$60",
    horario: "Disponible 24/7",
    caracteristicas: [
      "Cama queen size",
      "Aire acondicionado",
      "TV por cable",
      "WiFi gratis",
      "Baño privado"
    ]
  },
  {
    id: 2,
    icon: "🏰",
    titulo: "Suites de Lujo",
    descripcion: "Amplias suites con vista panorámica a los Andes y acabados de primera calidad.",
    precio: "$120",
    horario: "Disponible 24/7",
    caracteristicas: [
      "Cama king size",
      "Sala de estar independiente",
      "Jacuzzi",
      "Mini bar",
      "Vista a la montaña"
    ]
  },
  {
    id: 3,
    icon: "🍽️",
    titulo: "Restaurante El Andino",
    descripcion: "Gastronomía local e internacional con los mejores ingredientes de la región.",
    precio: "15$ - $$",
    horario: "7:00 AM - 10:00 PM",
    caracteristicas: [
      "Desayuno buffet",
      "Almuerzo a la carta",
      "Cena gourmet",
      "Platos típicos andinos",
      "Bar de vinos"
    ]
  },
  {
    id: 4,
    icon: "💆‍♂️",
    titulo: "Spa Andino",
    descripcion: "Relajación y bienestar en un entorno natural con tratamientos exclusivos.",
    precio: "$40 - $120",
    horario: "9:00 AM - 8:00 PM",
    caracteristicas: [
      "Masajes terapéuticos",
      "Sauna",
      "Hidromasaje",
      "Tratamientos faciales",
      "Yoga y meditación"
    ]
  },
  {
    id: 5,
    icon: "🏊",
    titulo: "Piscina Climatizada",
    descripcion: "Disfruta de nuestra piscina temperada con vista a los Andes durante todo el año.",
    precio: "Incluido",
    horario: "8:00 AM - 8:00 PM",
    caracteristicas: [
      "Agua temperada",
      "Área de loungers",
      "Servicio de toallas",
      "Bar en la piscina",
      "Vestidores"
    ]
  },
  {
    id: 6,
    icon: "🚗",
    titulo: "Transporte y Tours",
    descripcion: "Excursiones guiadas por los principales atractivos turísticos de Trujillo.",
    precio: "Consultar",
    horario: "Previa reservación",
    caracteristicas: [
      "Tour por la ciudad",
      "Visita a la Plaza Bolívar",
      "Excursión a los Andes",
      "Traslado aeropuerto",
      "Guías bilingües"
    ]
  }
];

const Servicios = () => {
  return (
    <div>
      {/* Hero de la página */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Descubre todo lo que Hotel Valera tiene para ofrecerte
          </p>
        </div>
      </section>

      {/* Lista de servicios */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviciosData.map((servicio) => (
              <div key={servicio.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300">
                {/* Header del servicio */}
                <div className="bg-gray-50 p-6 border-b">
                  <div className="text-5xl mb-3">{servicio.icon}</div>
                  <h2 className="text-2xl font-bold">{servicio.titulo}</h2>
                </div>
                
                {/* Cuerpo del servicio */}
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{servicio.descripcion}</p>
                  
                  <div className="mb-4">
                    <span className="font-bold text-lg text-blue-600">{servicio.precio}</span>
                    <span className="text-gray-500 text-sm ml-2">• {servicio.horario}</span>
                  </div>
                  
                  <h3 className="font-bold mb-2">Características:</h3>
                  <ul className="space-y-2">
                    {servicio.caracteristicas.map((caract, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{caract}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de horarios generales */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Horarios Generales</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold">Recepción:</p>
                <p className="text-gray-700">24/7</p>
              </div>
              <div>
                <p className="font-bold">Restaurante:</p>
                <p className="text-gray-700">7:00 AM - 10:00 PM</p>
              </div>
              <div>
                <p className="font-bold">Spa:</p>
                <p className="text-gray-700">9:00 AM - 8:00 PM</p>
              </div>
              <div>
                <p className="font-bold">Piscina:</p>
                <p className="text-gray-700">8:00 AM - 8:00 PM</p>
              </div>
              <div>
                <p className="font-bold">Check-in:</p>
                <p className="text-gray-700">3:00 PM</p>
              </div>
              <div>
                <p className="font-bold">Check-out:</p>
                <p className="text-gray-700">12:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la acción */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para tu escapada?</h2>
          <p className="text-xl text-white mb-8">Disfruta de una experiencia inolvidable en los Andes venezolanos</p>
          <a 
            href="/reservas" 
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Reserva ahora
          </a>
        </div>
      </section>
    </div>
  );
};

export default Servicios;