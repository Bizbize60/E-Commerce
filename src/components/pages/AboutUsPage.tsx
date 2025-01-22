import Page from '../shared/Page';
import BreadCrumb from '../shared/BreadCrumb';
import Footer from '../shared/Footer';
import React from 'react';
import '../../assets/app.css';

const AboutUsPage = () => {
	return (
		<Page>
			<Page.Header>
			</Page.Header>
			<Page.BreadCrumb>
				<BreadCrumb />
			</Page.BreadCrumb>
			<Page.Main fullPage>
				<h1 style={{ textAlign: 'center' }}></h1>
				<section style={{ textAlign: 'center', margin: '20px 0' }}>
					<h2>Hakkımızda</h2>
					<p>
						ARA GELSİN olarak, müşteri memnuniyetini en üst seviyede tutmayı ve ihtiyaçlarınıza en hızlı şekilde cevap vermeyi hedefleyen bir e-ticaret platformuyuz. Geniş ürün yelpazemizle, günlük yaşamınıza konfor ve kolaylık katmak için buradayız.
					</p>
					<p>
						Faaliyetlerimize başladığımız ilk günden itibaren, kaliteli ürünleri en uygun fiyatlarla sizlerle buluşturmayı misyon edindik. Gıda, ev ihtiyaçları, teknoloji, kozmetik ve daha birçok kategorideki ürünlerle, alışverişi daha keyifli ve zahmetsiz hale getiriyoruz.
					</p>
					<p>
						Müşterilerimize güvenilir ödeme sistemleri, hızlı teslimat ve 7/24 destek hizmeti sunarak alışveriş deneyimini sorunsuz hale getirmek için çalışıyoruz. Sizlerin güveni ve memnuniyeti, bizim için her zaman önceliklidir.
					</p>
				</section>

				<section style={{ textAlign: 'center', margin: '20px 0' }}>
					<h2>Vizyonumuz</h2>
					<p>
						ARA GELSİN olarak vizyonumuz, Türkiye’nin en güvenilir ve yenilikçi e-ticaret platformu haline gelmektir. Müşterilerimize yalnızca bir alışveriş platformu değil, aynı zamanda yaşamlarını kolaylaştıran, güven ve kalite sunan bir çözüm ortağı olmayı hedefliyoruz. Teknolojik yenilikleri takip ederek, sürdürülebilir bir büyüme ile sektörde öncü konumda yer almak önceliğimizdir.
					</p>
				</section>

				<section style={{ textAlign: 'center', margin: '20px 0' }}>
					<h2>Misyonumuz</h2>
					<p>
						Misyonumuz, müşterilerimize en iyi alışveriş deneyimini yaşatmak ve hayatlarını kolaylaştırmaktır.
					</p>
					<ul style={{ display: 'inline-block', textAlign: 'left', margin: '0 auto', padding: '0' }}>
						<li>Her bütçeye uygun kaliteli ürünleri, hızlı ve güvenilir bir şekilde sunmak.</li>
						<li>Çevre dostu uygulamalarla sürdürülebilir bir alışveriş deneyimi sağlamak.</li>
						<li>Müşteri memnuniyetini öncelikli kılarak, onlara en iyi hizmeti sunmak.</li>
					</ul>
					<p>
						ARA GELSİN, güvenilirlik, kalite ve müşteri odaklı hizmet anlayışıyla, alışverişin değişmez adresi olmaya devam edecektir.
					</p>
				</section>

				<div className="social-media-container" style={{ textAlign: 'center' }}>
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
