// Datos simulados para pruebas (sin necesidad de API key)
export const obtenerClima = async () => {
  // Simulamos una llamada a API con datos fijos
  return {
    weather: [{ main: 'Clear', description: 'cielo despejado' }],
    main: {
      temp: 24,
      feels_like: 23,
      humidity: 65,
      pressure: 1015
    },
    wind: { speed: 8 }
  };
};

export const obtenerPronostico = async () => {
  // Simulamos pronóstico de 5 días
  const dias = [
    { dt: Date.now() / 1000 + 86400, weather: [{ main: 'Clouds' }], main: { temp: 23 } },
    { dt: Date.now() / 1000 + 172800, weather: [{ main: 'Rain' }], main: { temp: 21 } },
    { dt: Date.now() / 1000 + 259200, weather: [{ main: 'Clear' }], main: { temp: 25 } },
    { dt: Date.now() / 1000 + 345600, weather: [{ main: 'Clouds' }], main: { temp: 22 } },
    { dt: Date.now() / 1000 + 432000, weather: [{ main: 'Clear' }], main: { temp: 26 } }
  ];
  
  return {
    list: dias
  };
};