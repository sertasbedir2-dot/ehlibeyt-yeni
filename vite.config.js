import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Zaman damgası (Her build işleminde dosya ismini değiştirir)
// Bu sayede telefonunuz "Aaa dosya değişmiş!" diyip yenisini indirmek zorunda kalır.
const timestamp = new Date().getTime();

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].${timestamp}.js`,
        chunkFileNames: `assets/[name].${timestamp}.js`,
        assetFileNames: `assets/[name].${timestamp}.[ext]`
      }
    }
  }
})