import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/pages/HomePage';
import About from './components/pages/AboutUsPage';
import Cart from './components/pages/CartPage';
import UserManagementPage from './components/pages/UserManagementPage';
import Orders from './components/pages/Orders';
import Profile from './components/pages/Profile';
import Navbar from './components/shared/Navbar';
import CategoryList from './components/left-nav/CategoryList';
import ContactUsPage from './components/pages/ContactUsPage';

const Routers = () => {
  return (
    <Router>
      {/* Navbar her sayfa için global */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/contact" element={<ContactUsPage />} />
        {/* Dinamik Kullanıcı Yönetimi */}
        <Route path="/login" element={<UserManagementPage isLoginMode={true} />} />
        <Route path="/register" element={<UserManagementPage isLoginMode={false} />} />
      </Routes>
    </Router>
  );
};

export default Routers;

