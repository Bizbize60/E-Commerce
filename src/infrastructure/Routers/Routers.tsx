import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../components/pages/HomePage';
import AboutUs from '../../components/pages/AboutUsPage';
import CartPage from '../../components/pages/CartPage';
import ProductPage from '../../components/pages/ProductPage';
import PrivacyPolicyPage from '../../components/pages/PrivacyPolicyPage';
import TermsOfServicePage from '../../components/pages/TermsOfServicePage';
import ContactUsPage from '../../components/pages/ContactUsPage';
import React from 'react';

const Routers = () => {
	console.log('Routers is rendered.');
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/about' element={<AboutUs />} />
				<Route path='/cart' element={<CartPage />} />
				<Route path='/ürün/:id' element={<ProductPage />} />
				<Route path='/privacy' element={<PrivacyPolicyPage />} />
				<Route path='/terms' element={<TermsOfServicePage />} />
				<Route path='/contact' element={<ContactUsPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default React.memo(Routers);
