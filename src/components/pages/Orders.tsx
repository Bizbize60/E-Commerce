import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import '../../assets/order.css'; // Sipariş geçmişi stil dosyasını import et

// Define the structure of an order
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
}

const Orders = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/log-in');  // Kullanıcı giriş yapmamışsa, giriş sayfasına yönlendir
    } else {
      fetchOrders();
    }
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders'); // API endpoint for fetching orders
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
