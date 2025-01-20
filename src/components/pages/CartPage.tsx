import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { loadCarts } from '../../infrastructure/store/slices/cart-slice';
import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import BreadCrumb from '../shared/BreadCrumb';
import Footer from '../shared/Footer';
import CartItem from '../cart/CartItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.carts.data);
    const customerId  = localStorage.getItem('customerId'); // LocalStorage'dan customerId alınıyor

    useEffect(() => {
      if (customerId) {
          console.log('Sepet Yükleniyor - Müşteri ID:', customerId);
          dispatch(loadCarts({ customerId }))
              .unwrap()
              .then((response) => {
                  console.log('Sepet Başarıyla Yüklendi:', response);
              })
              .catch((error) => {
                  console.error('Sepet Yükleme Hatası:', error);
              });
      } else {
          toast.error('Lütfen giriş yapın.');
      }
  }, [dispatch, customerId]);
    return (
        <Page>
            <Page.Header>
                <Navbar />
            </Page.Header>
            <Page.BreadCrumb>
                <BreadCrumb />
            </Page.BreadCrumb>
            <Page.Main fullPage>
                <h1>Sepet</h1>
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
                    {cart?.cartItems && cart.cartItems.length > 0 ? (
                          cart.cartItems.map((item, index) => (
                              <tr key={index}>
                                  {/* Ürün Adı */}
                                  <td>{item.product.name}</td>
                                  
                                  {/* Adet */}
                                  <td>{item.quantity}</td>
                                  
                                  {/* Birim Fiyat */}
                                  <td>{item.product.price.toFixed(2)} TL</td>
                                  
                                  {/* Toplam Tutar */}
                                  <td>{(item.quantity * item.product.price).toFixed(2)} TL</td>
                                  
                                  {/* İşlem Butonları */}
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
            </Page.Main>
            <Page.Footer>
                <Footer />
            </Page.Footer>
        </Page>
    );
};

export default CartPage;
