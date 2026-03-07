import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Verificar preferencia guardada
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true; // true para iniciar en oscuro
  });

  useEffect(() => {
    // Guardar preferencia
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Aplicar o quitar clase dark al elemento html
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    console.log('Dark mode cambiado a:', darkMode); // Para debug
  }, [darkMode]);

  const toggleDarkMode = () => {
    console.log('Toggle ejecutado, valor actual:', darkMode); // Para debug
    setDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};