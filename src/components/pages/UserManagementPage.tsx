import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../context/UserContext';
import { useDispatch } from 'react-redux'; // Redux için ekledik
import { setCustomerId } from '../../infrastructure/store/slices/customer-slice'; // Redux Slice'tan import

const UserManagementPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Login ve Register arasında geçiş için state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const { setUser } = useUser();
  const dispatch = useDispatch(); // Redux Dispatch

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoginMode && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const endpoint = isLoginMode
      ? 'http://localhost:5021/api/Users/Login'
      : 'http://localhost:5021/api/Users/Register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log('API Yanıtı:', data); // Debug için

      if (data.isSuccess) {
        if (isLoginMode) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('customerId', data.customerId); // customerId'yi kaydediyoruz
            setUser({ email: formData.email, token: data.token });
            toast.success('Login successful!');
            navigate('/profile');
        } else {
            toast.success('Registration successful! You can now log in.');
            setIsLoginMode(true);
        }
    } else {
        toast.error(data.message);
    }
    
    } catch (error) {
      console.error('Bir hata oluştu:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>{isLoginMode ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter your password"
              />
            </div>
          )}
          <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
        </form>
        <button
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="toggle-button"
        >
          {isLoginMode ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
};

export default UserManagementPage;

