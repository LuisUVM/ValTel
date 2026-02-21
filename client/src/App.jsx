import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Blog from './pages/Blog';
import Testimonios from './pages/Testimonios';
import Reservas from './pages/Reservas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="blog" element={<Blog />} />
          <Route path="testimonios" element={<Testimonios />} />
          <Route path="reservas" element={<Reservas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;