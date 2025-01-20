import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useUser } from '../../context/UserContext'; // UserContext'i import ettik
import { useDispatch } from 'react-redux'; // Redux Dispatch
import { setCustomerId } from '../../infrastructure/store/slices/customer-slice'; // Redux Slice
import { toast } from 'react-toastify';
import '../../assets/app.css';

const Navbar = () => {
  const { user, isAuthenticated, setUser } = useUser(); // UserContext'ten kullanıcı bilgilerini alıyoruz
  const dispatch = useDispatch(); // Redux için
  const navigate = useNavigate(); // Yönlendirme için

  const handleLogout = () => {
    // Çıkış işlemleri
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('customerId');
    setUser(null); // UserContext sıfırlanıyor
    dispatch(setCustomerId(null)); // Redux Store sıfırlanıyor
    toast.success('Logged out successfully!');
    navigate('/'); // Ana sayfaya yönlendir
  };

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        {/* Logo */}
        <NavLink to="/" className="navbar-logo">
          <img src="/images/logo3.jpg" alt="Site Logo" className="logo" />
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarScroll'
          aria-controls='navbarScroll'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarScroll'>
          <ul className='navbar-nav my-lg-0 navbar-nav-scroll'>
            <li className='nav-item'>
              <NavLink to='/about' className={'nav-link'}>
                About Us
              </NavLink>
            </li>
          </ul>

          {/* Sağ Taraf */}
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <NavLink to='/cart' className={'nav-link'}>
                <div className='nav-icon-container'>
                  <FaShoppingCart className='navbar-icons' size={30} />
                  <span>Cart</span>
                </div>
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li className='nav-item'>
                  <NavLink to='/profile' className={'nav-link'}>
                    <div className='nav-icon-container'>
                      <FaUser className='navbar-icons' size={30} />
                      <span>Profile</span>
                    </div>
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <button
                    className='btn btn-outline-danger'
                    onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className='nav-item'>
                <NavLink to='/log-in' className={'nav-link'}>
                  <div className='nav-icon-container'>
                    <FaUser className='navbar-icons' size={30} />
                    <span>Sign Up or Log In</span>
                  </div>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
