import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import BreadCrumb from '../shared/BreadCrumb';
import CategoryList from '../left-nav/CategoryList';
import Footer from '../shared/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Endpoints from '../../infrastructure/helpers/api-endpoints';
import { Result } from '../../infrastructure/shared/Result';
import { ProductDto } from '../../infrastructure/dtos/ProductDto';
import AddToCart from '../product/AddToCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTurkishLiraSign } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
const ProductPage = () => {
	const [product, setProduct] = useState<Result<ProductDto>>();
	const { id } = useParams();

	useEffect(() => {
		if (id != (null || undefined)) {
			loadProduct();
		}
	}, [id]);

	const loadProduct = () => {
		axios
			.get(Endpoints.Products.List + '/' + id)
			.then((result) => {
				if (result.status == 200) {
					setProduct(result.data);
				}
				// Toats uyarısı eklenecek
			})
			.catch((reason) => {
				console.log(reason);
			});
	};

	return (
		<Page>
			<Page.Header>
				<Navbar />
			</Page.Header>
			<Page.BreadCrumb>
				<BreadCrumb />
			</Page.BreadCrumb>
			<Page.Aside>{product?.isSuccess && <CategoryList />}</Page.Aside>
			<Page.Main>
				<div className='container'>
					<div className='row'>
						<div className='col'>
							<h1>{product?.value.name}</h1>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<img
								src={product?.value.imageUrl} 
								className='card-img-top'
								alt={product?.value.name}
							/>
						</div>
						<div className='col'>
							<h2>
								Fiyat: {product?.value.price} <FontAwesomeIcon icon={faTurkishLiraSign} />
							</h2>
							<p>{product?.value.description}</p>
							<AddToCart product={product?.value as ProductDto} />
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
