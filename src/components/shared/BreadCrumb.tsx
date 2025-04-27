import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const BreadCrumb = () => {
	const location = useLocation();
	console.log('BreadCrumb is rendered.');
	const linkLabel = location.pathname.replace('/', '').charAt(0).toUpperCase() + location.pathname.slice(2);

	return (
		<nav aria-label='breadcrumb'>
			<ol className='breadcrumb'>
				<li className='breadcrumb-item'>
					<NavLink to='/' title='Anasayfa'>
						Anasayfa
					</NavLink>
				</li>
				<li className='breadcrumb-item'>
					<NavLink to='/'>{decodeURI(linkLabel)}</NavLink>
				</li>
			</ol>
		</nav>
	);
};

export default React.memo(BreadCrumb);
