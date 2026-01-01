import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// SEO ve Meta Etiket Yönetimi için Gerekli Kütüphane
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Uygulamanın tamamını SEO sağlayıcısı ile sarmalıyoruz */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)