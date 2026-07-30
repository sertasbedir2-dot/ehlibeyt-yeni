import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicon.svg'],
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        // JSON ve medya dosyalarını da offline için önbelleğe al
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,mp3,wav}'],
        ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
        navigateFallback: '/index.html',
        // Dış kaynakları (Fontlar vb.) cihazda depolama kuralları
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } // 1 Yıl
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      },
      devOptions: { enabled: true },
      manifest: {
        name: 'OnikiKapı | İlim ve Hikmet Şehri',
        short_name: 'OnikiKapı',
        description: 'Ehlibeyt mektebinin dijital külliyesi. Hakikati arayanların buluşma noktası.',
        theme_color: '#04151a', // Mimarimize uygun OLED Siyah
        background_color: '#04151a',
        display: 'standalone',
        orientation: 'portrait-primary', // Telefonda dikey deneyimi zorla
        icons: [
          { src: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' } // Android için dinamik ikon uyumu
        ]
      }
    })
  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
  },
  server: {
    host: true,
  }
})