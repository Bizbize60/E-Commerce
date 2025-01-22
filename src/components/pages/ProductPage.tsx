import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import BreadCrumb from '../shared/BreadCrumb';
import CategoryList from '../left-nav/CategoryList';
import Footer from '../shared/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTurkishLiraSign } from '@fortawesome/free-solid-svg-icons';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5021/api/products/${id}`);
      if (response.status === 200) {
        setProduct(response.data.value);
      }
    } catch (error) {
      console.error('Ürün yüklenirken bir hata oluştu:', error);
    }
  };

  if (!product) {
    return <div className="container">Ürün yükleniyor...</div>;
  }

  return (
    <Page>
      <Page.Header>
        <Navbar />
      </Page.Header>
      <Page.BreadCrumb>
        <BreadCrumb />
      </Page.BreadCrumb>
      <Page.Aside>
        <CategoryList />
      </Page.Aside>
      <Page.Main>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>{product.name}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
              />
            </div>
            <div className="col-md-6">
              <h2>
                Fiyat: {product.price} <FontAwesomeIcon icon={faTurkishLiraSign} />
              </h2>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </Page.Main>
      <Page.Footer>
        <Footer />
      </Page.Footer>
    </Page>
  );
};

export default React.memo(ProductPage);

