import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import BreadCrumb from '../shared/BreadCrumb';
import Footer from '../shared/Footer';
import React from 'react';

const TermsOfServicePage = () => {
	return (
		<Page>
			<Page.Header>
				<Navbar />
			</Page.Header>
			<Page.BreadCrumb>
				<BreadCrumb />
			</Page.BreadCrumb>
			<Page.Main fullPage>
				<h1 className='mb-4'>Hizmet Şartları</h1>
				<p>
					Bu hizmet şartları, AraGelsin tarafından sunulan hizmetlerin kullanımıyla ilgili şart ve koşulları
					belirler.
				</p>
				<h2>Kullanım Koşulları</h2>
				<p>
					Hizmetlerimizi kullanarak, bu şart ve koşulları kabul etmiş olursunuz. Bu şartları kabul etmiyorsanız,
					hizmetlerimizi kullanmamalısınız.
				</p>
				<h2>Hizmet Değişiklikleri</h2>
				<p>
					AraGelsin, hizmetlerini herhangi bir zamanda bildirimde bulunmaksızın değiştirme veya sona erdirme hakkını
					saklı tutar.
				</p>
				<h2>Sorumluluk Reddi</h2>
				<p>
					Hizmetlerimiz "olduğu gibi" ve "mevcut olduğu şekilde" sunulmaktadır. AraGelsin, hizmetlerin kesintisiz
					veya hatasız olacağını garanti etmez.
				</p>
				<h2>Fikri Mülkiyet</h2>
				<p>
					Hizmetlerimizde yer alan tüm içerik ve materyaller, AraGelsin'in mülkiyetindedir ve telif haklarıyla
					korunmaktadır.
				</p>
				<h2>Değişiklikler</h2>
				<p>
					Bu hizmet şartlarını zaman zaman güncelleyebiliriz. Herhangi bir değişikliği web sitemizde yeni hizmet
					şartları yayınlayarak bildireceğiz.
				</p>
				<h2>İletişim</h2>
				<p>Bu hizmet şartları hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin.</p>
			</Page.Main>
			<Page.Footer>
				<Footer />
			</Page.Footer>
		</Page>
	);
};

export default React.memo(TermsOfServicePage);
