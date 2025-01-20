import React, { useState } from 'react';
import { ProductDto } from '../../infrastructure/dtos/ProductDto';
import axios from 'axios';
import Endpoints from '../../infrastructure/helpers/api-endpoints';
import QuantityManager from './QuantityManager';
import { toast } from 'react-toastify';

const AddToCart: React.FC<{ product: ProductDto }> = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const addToCart = async () => {
        const token = localStorage.getItem('token');
        const customerId = localStorage.getItem('customerId');

        if (!token || !customerId) {
            toast.error('Lütfen giriş yapın.');
            return;
        }

        try {
            const response = await axios.post(
                Endpoints.Carts.AddProduct,
                {
                    customerId,
                    productId: product.id,
                    quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
			console.log('AddToCart Gönderilen Parametreler:', {
				customerId,
				productId: product.id,
				quantity,
			  });

            if (response.data.isSuccess) {
                toast.success('Ürün sepete eklendi.');
            } else {
                toast.error(response.data.message || 'Ürün sepete eklenemedi.');
            }
        } catch (error: any) {
            console.error('Hata:', error.response?.data);
            toast.error(error.response?.data?.message || 'Sepet işlemi sırasında bir hata oluştu.');
        }
    };

    return (
        <div className="d-flex align-items-start">
            <QuantityManager setFunc={setQuantity} quantity={quantity} />
            <button className="btn btn-warning" onClick={addToCart}>
                Sepete Ekle
            </button>
        </div>
    );
};

export default React.memo(AddToCart);
