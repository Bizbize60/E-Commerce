import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import BreadCrumb from '../shared/BreadCrumb';
import Footer from '../shared/Footer';
import React from 'react';

const PrivacyPolicyPage = () => {
	return (
		<Page>
			<Page.Header>
				<Navbar />
			</Page.Header>
			<Page.BreadCrumb>
				<BreadCrumb />
			</Page.BreadCrumb>
			<Page.Main fullPage>
				<h1 className='mb-4'>Gizlilik Politikası</h1>
				<p>
					Bu gizlilik politikası, AraGelsin tarafından sunulan hizmetlerin kullanımı sırasında toplanan, kullanılan
					ve korunan kişisel bilgileri kapsar.
				</p>
				<h2>Toplanan Bilgiler</h2>
				<p>
					Hizmetlerimizi kullanırken, kimliğinizi belirlemek için kullanılabilecek belirli kişisel bilgileri bize
					sağlayabilirsiniz. Kişisel olarak tanımlanabilir bilgiler şunları içerebilir:
				</p>
				<ul>
					<li>İsim</li>
					<li>Email adresi</li>
					<li>Telefon numarası</li>
					<li>Adres</li>
				</ul>
				<h2>Bilgi Kullanımı</h2>
				<p>Topladığımız kişisel bilgiler aşağıdaki amaçlarla kullanılabilir:</p>
				<ul>
					<li>Hizmetlerimizi sağlamak ve sürdürmek</li>
					<li>Sizi bilgilendirmek</li>
					<li>Hizmetlerimizde yapılan değişiklikler hakkında sizi bilgilendirmek</li>
				</ul>
				<h2>Bilgi Güvenliği</h2>
				<p>
					Kişisel bilgilerinizin güvenliğini önemsiyoruz, ancak internet üzerinden yapılan hiçbir iletimin veya
					elektronik depolama yönteminin %100 güvenli olmadığını unutmayın. Kişisel bilgilerinizi korumak için ticari
					olarak kabul edilebilir yöntemler kullanıyoruz, ancak mutlak güvenliğini garanti edemeyiz.
				</p>
				<h2>Değişiklikler</h2>
				<p>
					Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Herhangi bir değişikliği web sitemizde yeni gizlilik
					politikası yayınlayarak bildireceğiz.
				</p>
				<h2>İletişim</h2>
				<p>Bu gizlilik politikası hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin.</p>
			</Page.Main>
			<Page.Footer>
				<Footer />
			</Page.Footer>
		</Page>
	);
};

export default React.memo(PrivacyPolicyPage);
