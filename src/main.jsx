import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'     
import './App.css'       
import { HelmetProvider } from 'react-helmet-async';
// ErrorBoundary importunu TAMAMEN SİLDİK. Artık o dosya kullanılmıyor.

// --- ACİL DURUM KODU: HAFIZA SİLİCİ ---
// Bu kod, uygulama her açıldığında telefonun hafızasındaki o 'takılı kalmış'
// eski servis çalışanlarını (Service Worker) zorla siler.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      console.log('Eski servis siliniyor:', registration);
      registration.unregister(); // Hepsini kayıttan düşür
    }
  });
}

// Tarayıcı önbelleğini de temizle
if ('caches' in window) {
  caches.keys().then((names) => {
    names.forEach(name => caches.delete(name));
  });
}

// Versiyon bilgisini de sıfırla
localStorage.removeItem('app_version');

// ------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* Burada artık hiçbir engelleyici (ErrorBoundary) yok.
         Uygulama doğrudan ana sayfayı (App) açacak.
      */}
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)