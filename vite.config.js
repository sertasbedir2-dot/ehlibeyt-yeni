import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600, // Gereksiz uyarıları susturur
  },
  server: {
    host: true // Bazen yerel ağda test için gereklidir
  }
})