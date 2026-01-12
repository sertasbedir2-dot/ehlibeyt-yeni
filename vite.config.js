import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Düzeltme: Olmayan 'mask-icon.svg' kaldırıldı, varlığı kesin olanlar eklendi.
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicon.svg'], 
      
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        // UTM ve FBCLID parametrelerini yoksayarak önbellek şişmesini önler
        ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
        navigateFallback: '/index.html'
      },

      devOptions: {
        enabled: true
      },
      
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