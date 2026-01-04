import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'   // Tailwind CSS
import './App.css'     // Yapısal Stiller ve Kart Tasarımları
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary'; // Uygulama Kurtarıcı Katman

/**
 * STRATEJİK MÜDAHALE: ZOMBİ ÖNBELLEK TEMİZLİĞİ
 * Kullanıcının tarayıcısında takılı kalan eski veya bozuk dosyaları temizleyerek
 * her zaman en güncel OnikiKapı verilerine (Esma, Zikir, Vakit) ulaşmasını sağlar.
 */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      // Eski servis işleyicilerini kayıttan çıkararak güncellemeyi zorlar
      registration.unregister();
    }
  });

  // Tarayıcı önbelleğini (Cache Storage) tamamen temizleyerek taze veri akışı sağlar
  if (window.caches) {
    caches.keys().then(function(names) {
      for (let name of names) {
        caches.delete(name);
      }
    });
  }
}

// React Uygulamasını Başlatma
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* ErrorBoundary: Uygulama içerisinde bir JavaScript hatası oluşursa 
        beyaz ekran yerine kullanıcıya "Sistemi Onar" butonu sunan koruyucu katman.
      */}
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>,
)