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
        // DİKKAT: .jpg ve .jpeg uzantıları eklendi (og-image.jpg önbelleğe alınabilsin diye)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        // Facebook'un eklediği takip parametrelerini görmezden gel
        ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
        navigateFallback: '/index.html'
      },
      devOptions: { enabled: true },
      manifest: {
        name: 'OnikiKapı',
        short_name: 'OnikiKapı',
        description: 'Ehlibeyt mektebinin dijital külliyesi.',
        // DİKKAT: PWA yükleme (splash) ekranı renkleri yeni Zümrüt temaya uyarlandı
        theme_color: '#04151a',
        background_color: '#04151a',
        display: 'standalone',
        orientation: 'any',
        icons: [
          { src: 'web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' }
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
