import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // Şifreyi iki kez girme
    phoneNumber: '' // Telefon numarası
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Şifre doğrulama
    if (formData.password !== formData.confirmPassword) {
      toast.error("Şifreler uyuşmuyor!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5021/api/Users/Register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.isSuccess) {
        toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
        
        // Kayıt başarılı olduğunda login sayfasına yönlendirme
        setTimeout(() => {
          navigate('/log-in');  // Yönlendirme yapılır
        }, 1500);  // 1.5 saniye sonra yönlendirme yapılır
      } else {
        toast.error(data.message); // Hata mesajı
      }
    } catch (error) {
      toast.error('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Kayıt Ol</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ad</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Adınızı girin"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="E-posta adresinizi girin"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Telefon Numarası</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="Telefon numaranızı girin"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Şifrenizi girin"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Şifreyi Tekrar Girin</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Şifrenizi tekrar girin"
            />
          </div>
          <button type="submit">Kayıt Ol</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
