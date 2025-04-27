import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';

const Navbar = () => {
  const { isAuthenticated } = useUser(); // Kullanıcı kimlik doğrulama durumu

  return (
    <header className="bg-danger text-white py-3 shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo text-white text-decoration-none d-flex align-items-center">
          <img
            src="/images/logo3.jpg" // Logo dosyanızın yolu
            alt="AraGelsin Logo"
            className="logo me-2"
            style={{ height: '40px', borderRadius: '50%' }}
          />
          <span className="fs-4 fw-bold"></span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="d-flex gap-4">
          <NavLink to="/" className="text-white text-decoration-none">Anasayfa</NavLink>
          <NavLink to="/about" className="text-white text-decoration-none">Hakkımızda</NavLink>
          <NavLink to="/categories" className="text-white text-decoration-none">Kategoriler</NavLink>
          <NavLink to="/contact" className="text-white text-decoration-none">İletişim</NavLink>
        </nav>

        {/* Profil ve Sepetim Butonları */}
        <div className="d-flex gap-3">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className="btn btn-outline-light btn-sm d-flex align-items-center"
              >
                <FaUser className="me-2" />
                Profil
              </NavLink>
              <NavLink
                to="/cart"
                className="btn btn-outline-light btn-sm d-flex align-items-center"
              >
                <FaShoppingCart className="me-2" />
                Sepetim
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className="btn btn-outline-light btn-sm"
            >
              Giriş Yap / Kaydol
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;


