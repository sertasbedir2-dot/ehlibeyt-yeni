import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'     // Tailwind CSS
import './App.css'       // Yapısal Stiller ve Kart Tasarımları
import { HelmetProvider } from 'react-helmet-async';
// import ErrorBoundary from './components/ErrorBoundary'; // <-- BU SATIRI YORUMA ALDIK (KAPATTIK)

// --- 🔥 SÜRÜM KONTROL VE OTOMATİK TEMİZLİK SİSTEMİ 🔥 ---
// Sürüm adını değiştirdik ki telefonlar yeni kodları kesin olarak alsın.
const APP_VERSION = 'v2-rescue-mode'; 

const checkVersionAndClearCache = () => {
  try {
    const storedVersion = localStorage.getItem('app_version');

    // Eğer telefondaki sürüm bizim yeni sürümden farklıysa:
    if (storedVersion !== APP_VERSION) {
      console.log(`⚡ Yeni sürüm tespit edildi: ${APP_VERSION}. Temizlik başlıyor...`);
      
      // 1. Service Worker'ları (PWA hafızasını) sil
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      }

      // 2. Tarayıcı önbelleğini (Cache Storage) tamamen sil
      if ('caches' in window) {
        caches.keys().then((names) => {
          for (const name of names) {
            caches.delete(name);
          }
        });
      }

      // 3. Yeni sürümü kaydet
      localStorage.setItem('app_version', APP_VERSION);

      // 4. Sayfayı sunucudan sıfırdan yükle
      window.location.reload(true);
    }
  } catch (e) {
    console.error("Önbellek temizleme hatası:", e);
  }
};

// Uygulama başlar başlamaz kontrolü yap
checkVersionAndClearCache();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* ErrorBoundary KALDIRILDI. 
          Artık aradaki güvenlik görevlisi yok, kullanıcıyı direkt içeri alıyoruz.
      */}
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)