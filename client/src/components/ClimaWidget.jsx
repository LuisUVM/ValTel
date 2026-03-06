import React, { useState, useEffect } from 'react';
import { obtenerClima, obtenerPronostico } from '../services/climaService.js';

const ClimaWidget = () => {
  const [clima, setClima] = useState(null);
  const [pronostico, setPronostico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarClima = async () => {
      try {
        const dataClima = await obtenerClima();
        const dataPronostico = await obtenerPronostico();
        
        if (dataClima) setClima(dataClima);
        if (dataPronostico) setPronostico(dataPronostico);
        setError(null);
      } catch (err) {
        setError('No se pudo cargar el clima');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarClima();

    // Actualizar cada 30 minutos
    const intervalo = setInterval(cargarClima, 30 * 60 * 1000);
    return () => clearInterval(intervalo);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error || !clima) {
    return (
      <div className="bg-white rounded-lg shadow p-4 text-gray-500">
        <p>⛅ Clima no disponible</p>
      </div>
    );
  }

  // Función para obtener icono según condición
  const getIcono = (condicion) => {
    const iconMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️'
    };
    return iconMap[condicion] || '☀️';
  };

  // Función para obtener día de la semana
  const getDiaSemana = (timestamp) => {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fecha = new Date(timestamp * 1000);
    return dias[fecha.getDay()];
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Clima actual */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold">Clima en Valera</h3>
          <p className="text-gray-600">Trujillo, Venezuela</p>
        </div>
        <div className="text-right">
          <span className="text-4xl">{getIcono(clima.weather[0].main)}</span>
          <p className="text-2xl font-bold">{Math.round(clima.main.temp)}°C</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="bg-blue-50 p-2 rounded text-center">
          <p className="text-gray-600">Sensación térmica</p>
          <p className="font-bold">{Math.round(clima.main.feels_like)}°C</p>
        </div>
        <div className="bg-blue-50 p-2 rounded text-center">
          <p className="text-gray-600">Humedad</p>
          <p className="font-bold">{clima.main.humidity}%</p>
        </div>
        <div className="bg-blue-50 p-2 rounded text-center">
          <p className="text-gray-600">Viento</p>
          <p className="font-bold">{Math.round(clima.wind.speed)} km/h</p>
        </div>
        <div className="bg-blue-50 p-2 rounded text-center">
          <p className="text-gray-600">Presión</p>
          <p className="font-bold">{clima.main.pressure} hPa</p>
        </div>
      </div>

      {/* Pronóstico */}
      {pronostico && (
        <div>
          <h4 className="font-bold mb-3">Pronóstico 5 días</h4>
          <div className="grid grid-cols-5 gap-2">
            {pronostico.list.filter((item, index) => index % 8 === 0).map((dia, idx) => (
              <div key={idx} className="text-center">
                <p className="text-xs text-gray-600">{getDiaSemana(dia.dt)}</p>
                <span className="text-2xl">{getIcono(dia.weather[0].main)}</span>
                <p className="font-bold text-sm">{Math.round(dia.main.temp)}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-4 text-right">
        Actualizado: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
};

export default ClimaWidget;