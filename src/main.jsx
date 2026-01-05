import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'     
import './App.css'       
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react'; 

// --- DÜZELTME: Service Worker SİLİCİ kodları kaldırdık ---
// Artık tarayıcı, uygulamanın arka plan servislerini (PWA) yükleyebilir.
// Böylece "Uygulamayı Yükle" butonu tekrar çalışır hale gelecek.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
      <Analytics /> 
    </HelmetProvider>
  </React.StrictMode>,
)