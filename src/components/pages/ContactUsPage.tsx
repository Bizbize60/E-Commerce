import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import BreadCrumb from '../shared/BreadCrumb';
import Footer from '../shared/Footer';
import React, { useState } from 'react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Mesajınız başarıyla gönderildi!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <Page>
      <Page.BreadCrumb>
        <BreadCrumb />
      </Page.BreadCrumb>
      <Page.Main fullPage>
        <div className="contact-us-form-container">
          <h2>Bizimle İletişime Geçin</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Ad Soyad</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Adınızı ve soyadınızı girin"
                required
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
                placeholder="E-posta adresinizi girin"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefon Numarası</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Telefon numaranızı girin"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mesaj</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mesajınızı buraya yazın"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Gönder</button>
          </form>
        </div>
      </Page.Main>
      <Page.Footer>
        <Footer />
      </Page.Footer>
    </Page>
  );
};

export default ContactUsPage;
