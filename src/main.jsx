import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'     
import './App.css'       
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react'; // <-- YENİ EKLENDİ

// --- ACİL DURUM KODU: HAFIZA SİLİCİ ---
// Telefonlarda kalan eski sürümleri temizlemeye devam ediyoruz
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister(); 
    }
  });
}

if ('caches' in window) {
  caches.keys().then((names) => {
    names.forEach(name => caches.delete(name));
  });
}

localStorage.removeItem('app_version');
// ------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
      {/* Vercel Analiz Aracı: Ziyaretçileri sayar */}
      <Analytics /> 
    </HelmetProvider>
  </React.StrictMode>,
)