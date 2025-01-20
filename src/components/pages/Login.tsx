import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { setCustomerId } from '../../infrastructure/store/slices/customer-slice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setUser } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5021/api/Users/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('API Yanıtı:', data); // Yanıtı loglama

      if (data.isSuccess) {
        // LocalStorage'a kaydet
        localStorage.setItem('token', data.token);
        localStorage.setItem('customerId', data.customerId);

        // UserContext ve Redux için güncelleme
        setUser({ email: formData.email, token: data.token });
        dispatch(setCustomerId(data.customerId));

        // Yönlendirme
        navigate('/profile');
      } else {
        alert(data.message || 'Giriş başarısız.');
      }
    } catch (error) {
      console.error('Giriş sırasında hata oluştu:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
