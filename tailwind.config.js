/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- ANA VİZYON ---
        turquoise: {
          DEFAULT: '#008080', // Selçuklu Turkuazı
          dark: '#004d4d',    // Derinlik
          light: '#4db8b8',   // Vurgu
        },
        
        // --- MODERN & MANEVİ PALET ---
        midnight: '#0f172a',  // Modern Lacivert Arka Plan
        sand: '#f5f5dc',     // Kitap Kağıdı Rengi (Okunabilirlik)
        gold: {
          DEFAULT: '#FFD700', // Altın Vurgu
          dim: '#C5A059',    // Antik Altın
        },
        
        // Manevi Mavi Tonları
        spiritual: {
          DEFAULT: '#60a5fa',
          light: '#93c5fd',
          dim: '#1e3a8a',
        },
      },
      
      fontFamily: {
        sans: ['Inter', '"IBM Plex Arabic"', 'sans-serif'],
        serif: ['"Cinzel Decorative"', '"Amiri"', 'serif'],
      },

      // --- ÖZEL GÖLGELENDİRMELER (Derinlik için) ---
      boxShadow: {
        'gold-glow': '0 0 20px rgba(255, 215, 0, 0.2)',
        'spiritual-glow': '0 0 15px rgba(96, 165, 250, 0.3)',
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite', 
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}