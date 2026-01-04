import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const timestamp = new Date().getTime();

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Otomatik güncelleme modu
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      
      // --- YENİ EKLENEN GÜÇLENDİRİLMİŞ AYARLAR ---
      // Bu ayarlar Service Worker'ın kullanıcıya sormadan
      // anında güncellemeyi yapmasını zorlar.
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      
      manifest: {
        name: 'OnikiKapı',
        short_name: 'OnikiKapı',
        description: 'Ehlibeyt mektebinin dijital külliyesi.',
        theme_color: '#008080',
        background_color: '#0f172a',
        display: 'standalone',
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
  ],
  build: {
    rollupOptions: {
      output: {
        // Cache-busting (Önbellek kırma) için zaman damgası
        entryFileNames: `assets/[name].${timestamp}.js`,
        chunkFileNames: `assets/[name].${timestamp}.js`,
        assetFileNames: `assets/[name].${timestamp}.[ext]`
      }
    }
  }
})