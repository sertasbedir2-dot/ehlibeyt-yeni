import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'     // Tailwind CSS
import './App.css'       // Yapısal Stiller ve Kart Tasarımları
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';

// --- 🔥 SÜRÜM KONTROL VE OTOMATİK TEMİZLİK SİSTEMİ 🔥 ---
// Her önemli güncellemede bu tırnak içindeki yazıyı değiştirin (Örn: 'v1.1', 'v1.2' vb.)
// Şu an 'v1-fix-sabah-virdi' yaptık ki telefonlar değişikliği hemen algılasın.
const APP_VERSION = 'v1-fix-sabah-virdi'; 

const checkVersionAndClearCache = () => {
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

    // 3. Yeni sürümü kaydet (Böylece bir dahaki sefere tekrar silmez)
    localStorage.setItem('app_version', APP_VERSION);

    // 4. Sayfayı sunucudan sıfırdan yükle (Force Reload)
    // (Kullanıcı bu sırada sayfanın bir kez gidip geldiğini görecek)
    window.location.reload(true);
  }
};

// Uygulama başlar başlamaz kontrolü yap
checkVersionAndClearCache();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>,
)