import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// SEO ve Meta Etiket Yönetimi için Gerekli Kütüphane
import { HelmetProvider } from 'react-helmet-async';
// YENİ: Hata Yakalayıcı (Bakım Ekranı) Bileşenini Çağırıyoruz
import ErrorBoundary from './components/ErrorBoundary.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* KALKAN DEVREDE: 
        ErrorBoundary'yi en dışa koyuyoruz ki, 
        hem App hem de HelmetProvider içinde bir hata olursa yakalasın.
    */}
    <ErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)