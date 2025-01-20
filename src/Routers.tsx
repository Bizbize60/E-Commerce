import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/pages/HomePage'; // Ana sayfa
import About from './components/pages/AboutUsPage'; // Hakkımızda sayfası
import Cart from './components/pages/CartPage'; // Sepet sayfası
import Login from './components/pages/Login'; // Login sayfası
import Register from './components/pages/Register'; // Register sayfası
import Profile from './components/pages/Profile'; // Profil sayfası
import Navbar from './components/shared/Navbar'; // Navbar bileşeni
import Orders from './components/pages/Orders';    // Sipariş geçmişi sayfası
import UserManagementPage from './components/pages/UserManagementPage';

const Routers = () => {
  return (
    <Router> 
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/log-in" element={<UserManagementPage />} /> {/* Giriş için yeni sayfa */}
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default Routers;
