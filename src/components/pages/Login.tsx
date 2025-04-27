import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { setCustomerId } from '../../infrastructure/store/slices/customer-slice';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Hata mesajını sıfırla

    try {
      const response = await fetch('http://localhost:5021/api/Users/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Giriş bilgileri hatalı!');
      }

      const data = await response.json();
      console.log('API Yanıtı:', data);

      // Kullanıcı bilgilerini güncelle
      setUser(data.user);
      dispatch(setCustomerId(data.user.id));
      navigate('/'); // Başarılı giriş sonrası anasayfaya yönlendir
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu!');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Giriş Yap</h1>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        {error && <div className="alert alert-danger">{error}</div>} {/* Hata mesajı */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Adresi</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email adresinizi girin"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Şifre</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            placeholder="Şifrenizi girin"
            required
          />
        </div>
        <button type="submit" className="btn btn-danger w-100">Giriş Yap</button>
      </form>
      <p className="text-center mt-3">
        Hesabınız yok mu?{' '}
        <a href="/register" className="text-danger text-decoration-none">Kayıt Ol</a>
      </p>
    </div>
  );
};

export default Login;
