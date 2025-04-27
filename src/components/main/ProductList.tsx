// ProductList.tsx
import { useEffect, useState } from 'react';
import Product from '../product/Product';
import Spinner from '../shared/Spinner';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../infrastructure/store/store';
import { loadProducts } from '../../infrastructure/store/slices/products-slice';
import ApiState from '../../infrastructure/enums/ApiState';

const ProductList = () => {
    console.log('ProductList is rendered.');

    const [searchQuery, setSearchQuery] = useState('');  // Kullanıcıdan alınan arama sorgusu
    const [triggerSearch, setTriggerSearch] = useState(false);  // Arama butonuna tıklanıp tıklanmadığını takip etmek için state

    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.products.state);
    const products = useAppSelector((state) => state.products.data);
    const activeCategory = useAppSelector((state) => state.categories.activeCategory);

    // İlk yükleme
    useEffect(() => {
        if (state === ApiState.Idle) {
            dispatch(loadProducts({ activeCategory: null, searchQuery: '' }));
        }
    }, []);

    // Arama tetiklendiğinde ürünleri yükle
    useEffect(() => {
        if (triggerSearch) {
            dispatch(loadProducts({ activeCategory, searchQuery }));
            setTriggerSearch(false);  // Arama tamamlandığında tetiklemeyi sıfırlıyoruz
        }
    }, [triggerSearch, activeCategory, searchQuery]);

    // Arama butonuna basıldığında
    const handleSearch = () => {
        setTriggerSearch(true);  // Butona tıklandığında arama işlemi tetiklenir
    };

    // Ürünleri filtreleme işlemi
    const filteredProducts = products?.value.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container-fluid">
            <div className="row">
                {state === ApiState.Pending && <Spinner color="primary" />}
                
                <div className="col-12 mb-3">
                    {/* Arama inputu */}
                    <input
                        type="text"
                        className="form-control"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Arama sorgusunun her değişiminde state güncellenir
                        placeholder="Search for a product"
                        style={{
                            border: '2px solid #ddd', // Çerçeve eklenmesi
                            borderRadius: '5px', // Kenar yuvarlama
                            padding: '10px', // İçerik boşluğu
                            fontSize: '16px', // Yazı boyutu
                        }}
                    />
                    {/* Ara butonu */}
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleSearch} // Arama butonuna tıklandığında arama tetiklenir
                    >
                        Ara
                    </button>
                </div>

                {/* Ürünlerin listelenmesi */}
                {filteredProducts?.map((item) => (
                    <Product product={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};

export default React.memo(ProductList);
