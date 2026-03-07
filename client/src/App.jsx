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
import RoomsList from './pages/RoomsList';
import RoomDetail from './pages/RoomDetail';
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import RoomList from './pages/Admin/RoomList';
import RoomForm from './pages/Admin/RoomForm';
import PageTransition from './components/PageTransition';

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Layout />}>
        <Route index element={<PageTransition><Inicio /></PageTransition>} />
        <Route path="servicios" element={<PageTransition><Servicios /></PageTransition>} />
        <Route path="blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="testimonios" element={<PageTransition><Testimonios /></PageTransition>} />
        <Route path="reservas" element={<PageTransition><Reservas /></PageTransition>} />
        <Route path="habitaciones" element={<PageTransition><RoomsList /></PageTransition>} />
        <Route path="habitacion/:id" element={<PageTransition><RoomDetail /></PageTransition>} />
      </Route>

      {/* Rutas de autenticación */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas admin (protegidas) */}
      <Route path="/admin" element={
        <PrivateRoute adminOnly>
          <AdminLayout />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="habitaciones" element={<RoomList />} />
        <Route path="habitaciones/nueva" element={<RoomForm />} />
        <Route path="habitaciones/editar/:id" element={<RoomForm />} />
      </Route>
    </Routes>
  );
}

export default App;