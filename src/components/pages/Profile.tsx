// src/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserEdit, FaSignOutAlt, FaHistory } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { user, setUser } = useUser();  // Kullanıcı verisini almak için
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    // API'ye veri göndermek burada yapılabilir.
    // Güncellenmiş kullanıcı bilgilerini kaydetmek için API çağrısı yapabilirsiniz.

    // Başarıyla güncellendikten sonra:
    toast.success('Profil başarıyla güncellendi');
    setEditing(false); // Düzenleme modunu kapat
  };

  const handleLogout = () => {
    setUser(null);  // Kullanıcıyı çıkış yapmış olarak ayarlıyoruz
    navigate('/log-in');  // Giriş sayfasına yönlendiriyoruz
    toast.info('Çıkış yapıldı');
  };

  if (!user) {
    return <div>Yükleniyor...</div>;  // Kullanıcı verisi yoksa, yükleniyor mesajı gösteririz.
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Kullanıcı Profili</h2>
        <button onClick={() => setEditing(!editing)} className="edit-button">
          <FaUserEdit size={20} />
          {editing ? 'Düzenlemeyi Kapat' : 'Profili Düzenle'}
        </button>
      </div>

      <form onSubmit={handleSaveChanges}>
        <div className="profile-section">
          <label>Ad Soyad:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>

        <div className="profile-section">
          <label>E-posta:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            disabled
          />
        </div>

        <div className="profile-section">
          <label>Telefon Numarası:</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>

        <div className="profile-section">
          <label>Adres:</label>
          <textarea
            name="address"
            value={userData.address}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>

        {editing && (
          <div className="profile-actions">
            <button type="submit">Kaydet</button>
          </div>
        )}
      </form>

      <div className="profile-actions">
        <NavLink to="/orders" className="orders-link">
          <button className="modern-order-button">
            <FaHistory size={20} />
            Sipariş Geçmişi
          </button>
        </NavLink>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt size={20} />
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Profile;
