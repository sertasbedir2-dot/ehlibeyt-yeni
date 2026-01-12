import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import legacy from '@vitejs/plugin-legacy' // 👈 YENİ EKLENTİ

export default defineConfig({
  plugins: [
    react(),
    // 👇 AĞIR SİLAH BURASI: Facebook/Instagram ve eski Android'ler için özel paket
    legacy({
      targets: ['defaults', 'not IE 11', 'Android >= 5'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicon.svg'],
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // Facebook'un eklediği takip parametrelerini görmezden gel
        ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
        navigateFallback: '/index.html'
      },
      devOptions: { enabled: true },
      manifest: {
        name: 'OnikiKapı',
        short_name: 'OnikiKapı',
        description: 'Ehlibeyt mektebinin dijital külliyesi.',
        theme_color: '#008080',
        background_color: '#0f172a',
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
    // Legacy plugin kullandığımız için manuel target ayarını kaldırdık, plugin hallediyor.
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
  },
  server: {
    host: true,
  }
})