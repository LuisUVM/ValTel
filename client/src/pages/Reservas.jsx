import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { enviarReserva } from '../services/reservaService';

// Tipos de habitación
const tiposHabitacion = [
  { id: 'estandar', nombre: 'Habitación Estándar', precio: 60, capacidad: 4 },
  { id: 'suite', nombre: 'Suite de Lujo', precio: 120, capacidad: 6 },
];

// Servicios adicionales
const serviciosAdicionales = [
  { id: 'desayuno', nombre: 'Desayuno Buffet', precio: 15 },
  { id: 'spa', nombre: 'Acceso al Spa', precio: 25 },
  { id: 'cena', nombre: 'Cena Gourmet', precio: 35 },
  { id: 'tour', nombre: 'Tour por los Andes', precio: 40 }
];

const Reservas = () => {
  const [loading, setLoading] = useState(false);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();

  // Watch para calcular precios
  const tipoHabitacion = watch('tipoHabitacion');
  const fechaEntrada = watch('fechaEntrada');
  const fechaSalida = watch('fechaSalida');
  const huespedes = watch('huespedes');

  // Calcular número de noches
  const calcularNoches = () => {
    if (fechaEntrada && fechaSalida) {
      const entrada = new Date(fechaEntrada);
      const salida = new Date(fechaSalida);
      const diffTime = Math.abs(salida - entrada);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  // Calcular precio total
  const calcularTotal = () => {
    let total = 0;
    
    // Precio habitación
    if (tipoHabitacion) {
      const habitacion = tiposHabitacion.find(h => h.id === tipoHabitacion);
      if (habitacion) {
        total += habitacion.precio * calcularNoches();
      }
    }
    
    // Servicios adicionales
    serviciosSeleccionados.forEach(servicioId => {
      const servicio = serviciosAdicionales.find(s => s.id === servicioId);
      if (servicio) {
        total += servicio.precio * calcularNoches();
      }
    });
    
    return total;
  };

  // Manejar selección de servicios
  const toggleServicio = (servicioId) => {
    setServiciosSeleccionados(prev =>
      prev.includes(servicioId)
        ? prev.filter(id => id !== servicioId)
        : [...prev, servicioId]
    );
  };

  // Enviar reserva
  const onSubmit = async (data) => {
    setLoading(true);
    
    // Preparar datos para enviar
    const reservaData = {
      ...data,
      servicios: serviciosSeleccionados,
      noches: calcularNoches(),
      total: calcularTotal(),
      fechaReserva: new Date().toISOString()
    };

    try {
      // Enviar al backend
      const respuesta = await enviarReserva(reservaData);
      
      // Mostrar éxito
      toast.success('¡Reserva enviada con éxito! Revisa tu correo para más detalles.', {
        position: "top-right",
        autoClose: 5000
      });
      
      // Si hay URL de vista previa (Ethereal), abrirla
      if (respuesta.previewUrl) {
        window.open(respuesta.previewUrl, '_blank');
      }
      
      // Limpiar formulario
      reset();
      setServiciosSeleccionados([]);
      
    } catch (error) {
      toast.error(error.error || 'Error al procesar la reserva. Intenta nuevamente.', {
        position: "top-right",
        autoClose: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      
      {/* Hero de la página */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Reservas</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Completa el formulario y confirma tu estadía en los Andes venezolanos
          </p>
        </div>
      </section>

      {/* Formulario de reservas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8">
              {/* Información personal */}
              <h2 className="text-2xl font-bold mb-6">Información personal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    {...register('nombre', { 
                      required: 'El nombre es obligatorio',
                      minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.nombre ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'El email es obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    {...register('telefono', { 
                      required: 'El teléfono es obligatorio',
                      pattern: {
                        value: /^[0-9+\-\s]+$/,
                        message: 'Teléfono inválido'
                      }
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.telefono ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    placeholder="+58 424 1234567"
                  />
                  {errors.telefono && (
                    <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
                  )}
                </div>
              </div>

              {/* Detalles de la reserva */}
              <h2 className="text-2xl font-bold mb-6">Detalles de la reserva</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Fecha de entrada *
                  </label>
                  <input
                    type="date"
                    {...register('fechaEntrada', { 
                      required: 'La fecha de entrada es obligatoria',
                      validate: value => {
                        const fecha = new Date(value);
                        const hoy = new Date();
                        hoy.setHours(0,0,0,0);
                        return fecha >= hoy || 'La fecha no puede ser en el pasado';
                      }
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.fechaEntrada ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.fechaEntrada && (
                    <p className="text-red-500 text-sm mt-1">{errors.fechaEntrada.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Fecha de salida *
                  </label>
                  <input
                    type="date"
                    {...register('fechaSalida', { 
                      required: 'La fecha de salida es obligatoria',
                      validate: value => {
                        if (!fechaEntrada) return true;
                        const entrada = new Date(fechaEntrada);
                        const salida = new Date(value);
                        return salida > entrada || 'La salida debe ser posterior a la entrada';
                      }
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.fechaSalida ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.fechaSalida && (
                    <p className="text-red-500 text-sm mt-1">{errors.fechaSalida.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Tipo de habitación *
                  </label>
                  <select
                    {...register('tipoHabitacion', { 
                      required: 'Selecciona un tipo de habitación'
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.tipoHabitacion ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  >
                    <option value="">Selecciona una habitación</option>
                    {tiposHabitacion.map(h => (
                      <option key={h.id} value={h.id}>
                        {h.nombre} - ${h.precio}/noche (hasta {h.capacidad} pers)
                      </option>
                    ))}
                  </select>
                  {errors.tipoHabitacion && (
                    <p className="text-red-500 text-sm mt-1">{errors.tipoHabitacion.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Número de huéspedes *
                  </label>
                  <input
                    type="number"
                    {...register('huespedes', { 
                      required: 'Indica el número de huéspedes',
                      min: { value: 1, message: 'Mínimo 1 huésped' },
                      max: { value: 6, message: 'Máximo 6 huéspedes' }
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.huespedes ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    min="1"
                    max="6"
                  />
                  {errors.huespedes && (
                    <p className="text-red-500 text-sm mt-1">{errors.huespedes.message}</p>
                  )}
                </div>
              </div>

              {/* Servicios adicionales */}
              <h2 className="text-2xl font-bold mb-6">Servicios adicionales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {serviciosAdicionales.map(servicio => (
                  <label key={servicio.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      value={servicio.id}
                      onChange={(e) => toggleServicio(servicio.id)}
                      checked={serviciosSeleccionados.includes(servicio.id)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="flex-1">{servicio.nombre}</span>
                    <span className="text-blue-600 font-medium">${servicio.precio}/noche</span>
                  </label>
                ))}
              </div>

              {/* Solicitudes especiales */}
              <h2 className="text-2xl font-bold mb-6">Solicitudes especiales</h2>
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">
                  Comentarios adicionales
                </label>
                <textarea
                  {...register('comentarios')}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="¿Alguna solicitud especial? (alergias, preferencias, etc.)"
                ></textarea>
              </div>

              {/* Resumen y total */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4">Resumen de tu reserva</h3>
                <div className="space-y-2 mb-4">
                  {tipoHabitacion && (
                    <p className="flex justify-between">
                      <span>Habitación:</span>
                      <span className="font-medium">
                        ${tiposHabitacion.find(h => h.id === tipoHabitacion)?.precio} x {calcularNoches()} noches
                      </span>
                    </p>
                  )}
                  {serviciosSeleccionados.map(servicioId => {
                    const servicio = serviciosAdicionales.find(s => s.id === servicioId);
                    return (
                      <p key={servicioId} className="flex justify-between text-gray-600">
                        <span>{servicio.nombre}:</span>
                        <span>${servicio.precio} x {calcularNoches()} noches</span>
                      </p>
                    );
                  })}
                </div>
                <div className="border-t pt-4">
                  <p className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-blue-600">${calcularTotal()}</span>
                  </p>
                </div>
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Procesando...' : 'Confirmar reserva'}
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                * Recibirás un correo con los detalles para confirmar tu reserva
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservas;