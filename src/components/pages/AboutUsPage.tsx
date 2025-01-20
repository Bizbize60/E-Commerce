import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import BreadCrumb from '../shared/BreadCrumb';
import Footer from '../shared/Footer';
import React from 'react';
import '../../assets/app.css';

const AboutUsPage = () => {
	return (
		<Page>
			<Page.Header>
				<Navbar />
			</Page.Header>
			<Page.BreadCrumb>
				<BreadCrumb />
			</Page.BreadCrumb>
			<Page.Main fullPage>
				<h1>About Us</h1>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
					make a type specimen book. It has survived not only five centuries, but also the leap into electronic
					typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
					sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
					PageMaker including versions of Lorem Ipsum.
				</p>
				<div className="social-media-container">
					<a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
						<img src="/images/instagram.png" alt="Instagram" style={{ width: '30px', height: '30px', margin: '0 10px' }} />
					</a>
					<a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
						<img src="/images/facebook.png" alt="Facebook" style={{ width: '30px', height: '30px', margin: '0 10px' }} />
					</a>
					<a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
						<img src="/images/twitter.png" alt="Twitter" style={{ width: '30px', height: '30px', margin: '0 10px' }} />
					</a>
					<a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
						<img src="/images/youtube.png" alt="YouTube" style={{ width: '30px', height: '30px', margin: '0 10px' }} />
					</a>
					<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
						<img src="/images/linkedin.png" alt="LinkedIn" style={{ width: '30px', height: '30px', margin: '0 10px' }} />
					</a>
				</div>
			</Page.Main>
			<Page.Footer>
				<Footer />
			</Page.Footer>
		</Page>
	);
};

export default React.memo(AboutUsPage);
