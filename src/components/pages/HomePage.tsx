// HomePage.tsx
import React, { useEffect, useState } from 'react';
import Footer from '../shared/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categoriesWithImages = [
    { id: 1, name: 'Water & Beverage', image: '/images/beverages.jpeg' },
    { id: 2, name: 'Snacks', image: '/images/snacks.jpeg' },
    { id: 3, name: 'Fruits & Vegetables', image: '/images/fruits.jpeg' },
    { id: 4, name: 'Dairy Products', image: '/images/dairy.jpeg' },
    { id: 5, name: 'Bakery Products', image: '/images/bakery.jpeg' },
    { id: 6, name: 'Ice Cream', image: '/images/ice.jpeg' },
    { id: 7, name: 'Meat & Poultry', image: '/images/meat.png' },
    { id: 8, name: 'Breakfast Foods', image: '/images/breakfast.jpeg' },
    { id: 9, name: 'Personal Care Products', image: '/images/personal.jpeg' },
    { id: 10, name: 'Cleaning and Household Supplies', image: '/images/home.jpeg' },
    { id: 11, name: 'Pet Products', image: '/images/pet.jpeg' },
];

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    const customerId = localStorage.getItem('customerId');

    useEffect(() => {
        axios.get('http://localhost:5021/api/products')
            .then((response) => {
                if (response.data.isSuccess) {
                    const productsArray = Array.isArray(response.data.value) ? response.data.value : [response.data.value];
                    setProducts(productsArray);
                }
            })
            .catch((error) => console.error('Ürünleri alırken hata oluştu:', error));
    }, []);

    useEffect(() => {
        if (customerId) {
            axios.get('http://localhost:5021/api/Carts/GetCartOfCustomer', {
                params: { customerId },
            })
            .then((response) => {
                if (response.data.isSuccess) {
                    setCart(response.data.cartItems);
                    setQuantities(
                        response.data.cartItems.reduce((acc, item) => {
                            acc[item.productId] = item.quantity;
                            return acc;
                        }, {})
                    );
                }
            })
            .catch((error) => console.error('Sepeti alırken hata oluştu:', error));
        } else {
            toast.error('Lütfen giriş yapın.');
        }
    }, [customerId]);

    const handleIncreaseQuantity = (productId) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));
    };

    const handleDecreaseQuantity = (productId) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: Math.max((prev[productId] || 0) - 1, 0),
        }));
    };

    const handleAddToCart = (productId) => {
        const quantity = quantities[productId] || 0;

        if (quantity > 0) {
            axios.post('http://localhost:5021/api/Carts/AddProduct', {
                customerId,
                productId,
                quantity,
            })
            .then((response) => {
                if (response.data.isSuccess) {
                    setCart(response.data.cartItems);
                    toast.success('Ürün sepete eklendi.');
                }
            })
            .catch((error) => console.error('Sepete ekleme hatası:', error));
        } else {
            toast.warn('Lütfen önce miktar belirleyin.');
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <section className="bg-warning py-5">
                <div className="container d-flex align-items-center justify-content-between">
                    <div>
                        <h2 className="display-4 text-dark">Taze ve Uygun Fiyatlı Ürünler</h2>
                        <p className="lead text-dark">Her Gün Yeni Kampanyalar!</p>
                        <button className="btn btn-danger btn-lg">Alışverişe Başla</button>
                    </div>
                    <img
                        src="/images/market-products.jpeg"
                        alt="Market Ürünleri"
                        className="img-fluid rounded"
                        style={{ maxWidth: '500px' }}
                    />
                </div>
            </section>

            {/* Kategoriler Bölümü */}
            <section className="container my-5">
                <h2 className="text-center mb-4">Kategoriler</h2>
                <div className="row row-cols-2 row-cols-md-4 g-4">
                    {categoriesWithImages.map((category) => (
                        <div key={category.id} className="col">
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="card-img-top"
                                    style={{ height: '150px', objectFit: 'cover' }}
                                />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{category.name}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Ürünler Bölümü */}
            <section className="container my-5">
                <h2 className="text-center mb-4">Ürünler</h2>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {products.map((product) => (
                        <div key={product.id} className="col">
                            <div className="card shadow-sm h-100">
                                <img
                                    src={`data:image/jpeg;base64,${product.imageUrl}`}
                                    className="card-img-top"
                                    alt={product.name}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column justify-content-between">
                                    <h5 className="card-title text-center">{product.name}</h5>
                                    <p className="text-center">
                                        <strong>Fiyat: {product.price} TL</strong>
                                    </p>
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleDecreaseQuantity(product.id)}
                                            disabled={(quantities[product.id] || 0) <= 0}
                                        >
                                            -
                                        </button>
                                        <span>{quantities[product.id] || 0}</span>
                                        <button
                                            className="btn btn-outline-success btn-sm"
                                            onClick={() => handleIncreaseQuantity(product.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="btn btn-primary btn-sm mt-3"
                                        onClick={() => handleAddToCart(product.id)}
                                    >
                                        Sepete Ekle
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
