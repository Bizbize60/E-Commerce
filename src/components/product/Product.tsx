import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProductDto } from '../../infrastructure/dtos/ProductDto';
import { NavLink } from 'react-router-dom';
import { faTurkishLiraSign } from '@fortawesome/free-solid-svg-icons/faTurkishLiraSign';
import AddToCart from './AddToCart';
import React from 'react';

const Product = (props: { product: ProductDto }) => {
	console.log('Product is rendered: ' + props.product.id);

	return (
		<div className='col-4'>
			<div className='card mb-2'>
				<NavLink to={'/ürün/' + props.product.id}>
					<img
						src={props.product.imageUrl}
						className='card-img-top'
						alt={props.product.name}
					/>
				</NavLink>
				<div className='card-body'>
					<h5 className='card-title'>{props.product.name}</h5>
					<h6 className='card-subtitle mb-2 text-body-secondary'>
						{props.product.price} <FontAwesomeIcon icon={faTurkishLiraSign} />
					</h6>
					<p className='card-text'>{props.product.description}</p>
					<AddToCart product={props.product} />
				</div>
			</div>
		</div>
	);
};

export default React.memo(Product);
