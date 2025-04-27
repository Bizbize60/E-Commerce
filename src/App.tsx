import React from 'react';
import Routers from './Routers'; // Routers.tsx dosyasını import ettik
import './assets/app.css'; // Stil dosyalarınızı import etmeyi unutmayın
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './context/UserContext'; // UserContext'i import ettik


const App = () => {
  return (
    <UserProvider> {/* UserProvider ile tüm uygulamayı sarıyoruz */}
      <div className="app-container">
        {/* Uygulama çevresel düzeni için bir kapsayıcı */}
        <Routers /> {/* Yönlendirme bileşenini buraya ekliyoruz */}
      </div>
      <ToastContainer
        position="bottom-right" // Mesajların konumu
        autoClose={5000} // Mesajın ne kadar süreyle görünmesi gerektiği
        hideProgressBar={true} // İlerleme çubuğunu gizle
        newestOnTop={false} // Yeni mesajların altta görünmesi
        closeOnClick // Mesaja tıklanarak kapatılabilmesi
        rtl={false} // Sağdan sola yönlendirme (Türkçe için false)
        pauseOnFocusLoss // Sayfa dışı iken mesajın durması
        draggable // Mesajın sürüklenebilir olması
        pauseOnHover // Hover durumunda mesajın durması
      />
    </UserProvider>
  );
};

export default React.memo(App);
