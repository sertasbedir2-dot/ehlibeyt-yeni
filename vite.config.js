import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Otomatik güncelleme modu
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      
      workbox: {
        cleanupOutdatedCaches: true, // Eski sürümleri temizler
        clientsClaim: true, // Yeni sürümü hemen devreye alır
        skipWaiting: true, // Bekleme yapmaz
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        
        // 🚀 YENİ EKLENEN KISIM: Facebook ve reklam parametrelerini görmezden gelir
        ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
        navigateFallback: '/index.html' // Her durumda ana sayfaya yönlendirir
      },

      devOptions: {
        enabled: true
      },
      
      // Sizin mevcut manifest bilgileriniz
      manifest: {
        name: 'OnikiKapı',
        short_name: 'OnikiKapı',
        description: 'Ehlibeyt mektebinin dijital külliyesi.',
        theme_color: '#008080',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'any', 
        
        icons: [
          {
            src: 'web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})