import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import '../../assets/order.css'; // Sipariş geçmişi stil dosyasını import et

const Orders = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Sipariş verisi simülasyonu
  const [orders, setOrders] = useState([
    {
      id: '123',
      date: '2024-12-15',
      total: 125.99,
      status: 'Delivered',
      items: [
        { name: 'Laptop', quantity: 1, price: 100 },
        { name: 'Mouse', quantity: 2, price: 25 },
      ],
    },
    {
      id: '124',
      date: '2024-12-10',
      total: 49.99,
      status: 'Pending',
      items: [
        { name: 'T-Shirt', quantity: 2, price: 24.99 },
      ],
    },
    {
      id: '125',
      date: '2024-12-05',
      total: 70.00,
      status: 'Delivered',
      items: [
        { name: 'Shoes', quantity: 1, price: 70 },
      ],
    },
  ]);

  useEffect(() => {
    if (!user) {
      navigate('/log-in');  // Kullanıcı giriş yapmamışsa, giriş sayfasına yönlendir
    }
  }, [user, navigate]);

  return (
    <div className="orders-container">
      <h2>Sipariş Geçmişiniz</h2>
      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Sipariş ID: {order.id}</h3>
                <p>
                  <FaCalendarAlt /> {order.date}
                </p>
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <p>{item.name} (x{item.quantity})</p>
                    <p><FaDollarSign /> {item.price * item.quantity} TL</p>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <p>
                  <strong>Toplam Tutar: </strong>{order.total} TL
                </p>
                <p className={`status ${order.status.toLowerCase()}`}>{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Sipariş geçmişiniz bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default Orders;
