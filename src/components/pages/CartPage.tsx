// CartPage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { loadCarts, removeFromCart } from '../../infrastructure/store/slices/cart-slice';
import Page from '../shared/Page';
import BreadCrumb from '../shared/BreadCrumb';
import Footer from '../shared/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

type Product = {
    id: number;
    name: string;
    price: number;
};

type CartItem = {
    productId: number;
    product: Product;
    quantity: number;
};

type Cart = {
    cartItems: CartItem[];
};

const CartPage = () => {
    const dispatch = useAppDispatch();
    const cart: Cart | null = useAppSelector((state) => state.carts.data);
    const customerId = localStorage.getItem('customerId');

    useEffect(() => {
        if (customerId) {
            dispatch(loadCarts({ customerId }))
                .unwrap()
                .then((response) => {
                    console.log('Sepet Yüklendi:', response);
                })
                .catch((error) => {
                    console.error('Sepet Yükleme Hatası:', error);
                });
        } else {
            toast.error('Lütfen giriş yapın.');
        }
    }, [dispatch, customerId]);

    const handleRemoveItem = (productId: number) => {
        if (customerId) {
            axios
                .delete('http://localhost:5021/api/Carts/RemoveProduct', {
                    data: { customerId, productId },
                })
                .then(() => {
                    toast.success('Ürün sepetten kaldırıldı.');
                    dispatch(loadCarts({ customerId })); // Sepeti güncelle
                })
                .catch((error) => {
                    toast.error('Ürün silinirken hata oluştu.');
                    console.error(error);
                });
        } else {
            toast.error('Lütfen giriş yapın.');
        }
    };
    

    return (
        <Page>
            <Page.Header>
                <h1>Sepet</h1>
            </Page.Header>
            <Page.BreadCrumb>
                <BreadCrumb />
            </Page.BreadCrumb>
            <Page.Main fullPage>
                {cart ? (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Ürün Adı</th>
                                <th scope="col">Adet</th>
                                <th scope="col">Birim Fiyat</th>
                                <th scope="col">Tutar</th>
                                <th scope="col">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.cartItems && cart.cartItems.length > 0 ? (
                                cart.cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.product?.name || 'Bilinmeyen Ürün'}</td>
                                        <td>{item.quantity || 0}</td>
                                        <td>{item.product?.price ? item.product.price.toFixed(2) : '0.00'} TL</td>
                                        <td>{item.quantity && item.product?.price ? (item.quantity * item.product.price).toFixed(2) : '0.00'} TL</td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleRemoveItem(item.productId)}
                                            >
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        Sepetinizde ürün bulunmamaktadır.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-5">Yükleniyor...</div>
                )}
            </Page.Main>
            <Page.Footer>
                <Footer />
            </Page.Footer>
        </Page>
    );
};

export default CartPage;
