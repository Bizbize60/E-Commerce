import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserEdit, FaSignOutAlt, FaHistory } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { user, setUser } = useUser();
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
    toast.success('Profil başarıyla güncellendi');
    setEditing(false);
  };

  const handleLogout = () => {
    setUser(null); // Kullanıcıyı çıkış yaptır
    toast.info('Çıkış yapıldı');
    navigate('/login'); // Giriş yap ekranına yönlendir
  };

  if (!user) {
    return <div>Yükleniyor...</div>; // Kullanıcı verisi yoksa yükleniyor mesajı
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
            <button type="submit" className="btn btn-primary">
              Kaydet
            </button>
          </div>
        )}
      </form>

      {/* Sipariş Geçmişi Linki */}
      <div className="profile-actions mt-4">
        <NavLink to="/orders" className="btn btn-outline-secondary">
          <FaHistory size={20} className="me-2" />
          Sipariş Geçmişi
        </NavLink>
      </div>

      {/* Çıkış Yap Butonu */}
      <div className="profile-actions mt-4">
        <button onClick={handleLogout} className="btn btn-danger">
          <FaSignOutAlt size={20} className="me-2" />
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Profile;
