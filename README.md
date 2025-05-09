🛒 Full Stack E-Commerce Projesi (React Vite + Sanic API)

Bu proje, E-Commerce (Alışveriş Sitesi) için geliştirilen
tam teşekküllü bir Frontend (React + Vite) ve Backend (Sanic + MySQL API) uygulamasıdır.

Frontend kısmı React + Vite,
Backend kısmı Sanic (Python) ve MySQL kullanılarak geliştirilmiştir.
🚀 Özellikler

    Kullanıcı kayıt ve giriş (JWT token ile kimlik doğrulama)

    Ürün listeleme (kategori bazlı veya genel)

    Ürün detaylarını veritabanından çekme

    Kullanıcılara özel sepet yönetimi (ürün ekleme, güncelleme, silme)

    Şifreler bcrypt ile güvenli şekilde hashlenerek saklanır

    Frontend ile tam uyumlu API yapısı (CORS aktif)

    Gerçek zamanlı güncellemeler ve güvenli veri transferi

🛠 Proje Kurulumu
1. Backend Kurulumu (Sanic)

    Python 3.8+ sürümüne sahip olmanız gerekir.

    Gerekli paketleri yüklemek için:

pip install -r requirements.txt

    DB_CONFIG kısmını kendi MySQL veritabanı ayarlarına göre düzenleyin:

DB_CONFIG = {
    "host": "localhost",
    "user": "your_user",
    "password": "your_password",
    "database": "your_database"
}

    Backend sunucusunu başlatmak için:

python main.py

Backend 5021 portunda çalışır.
2. Frontend Kurulumu (React + Vite)

    Node.js 16+ kurulu olmalıdır.

    Frontend klasörüne geçin ve bağımlılıkları yükleyin:

npm install

    Frontend uygulamasını başlatın:

npm run dev

Frontend varsayılan olarak 5173 portunda çalışır.

Backend API çağrıları için .env dosyasına doğru API base URL ayarlayın:

VITE_API_BASE_URL=http://localhost:5021

📚 API Endpointleri
Yöntem	URL	Açıklama
POST	/api/Users/Register	Kullanıcı kaydı
POST	/api/Users/Login	Kullanıcı girişi
GET	/api/Categories	Kategorileri getirir
GET	/api/products	Ürünleri listeler
POST	/api/Carts/AddProduct	Sepete ürün ekler
GET	/api/Carts/GetCartOfCustomer	Kullanıcının sepetini getirir
DELETE	/api/Carts/RemoveProduct	Sepetten ürün çıkarır
📦 Kullanılan Teknolojiler
Backend:

    Python

    Sanic

    MySQL

    PyJWT

    bcrypt

    sanic-ext

    sanic-cors

Frontend:

    React.js

    Vite.js

    Axios

    TailwindCSS (varsa opsiyonel)

⚡ Bilgilendirme

    Backend, hızlı API sunumu için Sanic framework'ü kullanılarak geliştirilmiştir.

    Frontend, modern Vite.js yapılandırması sayesinde hızlı başlama süresi ve performans sunar.

    JWT ile güvenli kullanıcı yönetimi yapılır.

👑 Hazırlayan

Dost canlısı bir geliştirici ✨

    Bu proje, gerçek dünya senaryolarına uygun bir full-stack E-Commerce sistemi oluşturmak için geliştirildi.
    Geliştirmeye ve büyütmeye açıktır! 🚀
