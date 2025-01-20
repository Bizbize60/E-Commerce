import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import BreadCrumb from '../shared/BreadCrumb';
import Footer from '../shared/Footer';
import React from 'react';

const ContactUsPage = () => {
	return (
		<Page>
			<Page.Header>
				<Navbar />
			</Page.Header>
			<Page.BreadCrumb>
				<BreadCrumb />
			</Page.BreadCrumb>
			<Page.Main fullPage>
				<div>
					<div className='mb-3'>
						<label htmlFor='exampleFormControlInput1' className='form-label'>
							Email address
						</label>
						<input type='email' className='form-control' id='exampleFormControlInput1' placeholder='name@example.com' />
					</div>
					<div className='mb-3'>
						<label htmlFor='exampleFormControlTextarea1' className='form-label'>
							Sorunlarınız
						</label>
						<textarea className='form-control' id='exampleFormControlTextarea1'></textarea>
					</div>
				</div>
			</Page.Main>
			<Page.Footer>
				<Footer />
			</Page.Footer>
		</Page>
	);
};

export default React.memo(ContactUsPage);
