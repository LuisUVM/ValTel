import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Blog from './pages/Blog';
import Testimonios from './pages/Testimonios';
import Reservas from './pages/Reservas';
import Login from './pages/Login';
import Register from './pages/Register';
import PageTransition from './components/PageTransition';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PageTransition><Inicio /></PageTransition>} />
        <Route path="servicios" element={<PageTransition><Servicios /></PageTransition>} />
        <Route path="blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="testimonios" element={<PageTransition><Testimonios /></PageTransition>} />
        <Route path="reservas" element={<PageTransition><Reservas /></PageTransition>} />
      </Route>
      {/* Rutas de autenticación (sin Layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;