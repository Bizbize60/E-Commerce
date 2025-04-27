import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // Şifre doğrulama alanı
    phoneNumber: '', // Telefon numarası
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Şifre doğrulama
    if (formData.password !== formData.confirmPassword) {
      toast.error('Şifreler uyuşmuyor!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5021/api/Users/Register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Kayıt sırasında bir hata oluştu!');
      }

      const data = await response.json();
      console.log('Kayıt başarılı:', data);

      toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
      navigate('/log-in'); // Başarılı kayıt sonrası giriş sayfasına yönlendirme
    } catch (err: any) {
      toast.error(err.message || 'Bir hata oluştu!');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Kayıt Ol</h1>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Ad Soyad</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Adınızı ve soyadınızı girin"
            required
          />
        </div>
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
          <label htmlFor="phoneNumber" className="form-label">Telefon Numarası</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            className="form-control"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Telefon numaranızı girin"
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
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Şifreyi Onayla</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Şifrenizi tekrar girin"
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Kayıt Ol</button>
      </form>
      <p className="text-center mt-3">
        Zaten bir hesabınız var mı?{' '}
        <a href="/log-in" className="text-danger text-decoration-none">Giriş Yap</a>
      </p>
    </div>
  );
};

export default Register;
