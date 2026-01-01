/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- YENİ VİZYON: TURKUAZ & MEDENİYET RENKLERİ ---
        // Sitenin yeni ana rengi (Teal/Turkuaz)
        turquoise: {
          DEFAULT: '#008080', // Ana Turkuaz (Selçuklu Çinisi)
          dark: '#004d4d',    // Koyu Turkuaz (Derinlik ve Footer için)
          light: '#4db8b8',   // Açık Turkuaz (Vurgular için)
        },
        
        // --- YARDIMCI RENKLER ---
        midnight: '#0f172a', // Daha modern, koyu lacivert (Eski midnight yerine)
        sand: '#f5f5dc',     // Krem/Bej (Okunabilirlik için ana metin rengi)
        gold: '#FFD700',     // Parlak Altın (Vurgular ve İkonlar için)
        
        // --- ESKİ RENKLER (Uyumluluk için tutuldu) ---
        emerald: '#005C42',  
        slate: '#4A5D75',    
        ice: '#E3F2FD',      
        clay: '#b45309',     // Kiremit rengi (Revize edildi)

        // Manevi Mavi Tonları
        spiritual: {
          DEFAULT: '#60a5fa',
          light: '#93c5fd',
          dim: '#1e3a8a',
        },
      },
      
      // --- YAZI TİPLERİ (Tipografi) ---
      fontFamily: {
        // Modern ve Okunaklı (Gövde metinleri için)
        sans: ['Inter', '"IBM Plex Arabic"', 'sans-serif'],
        // Estetik ve Başlıklar için (Kitap kapağı havası)
        serif: ['"Cinzel Decorative"', '"Amiri"', 'serif'],
      },

      // --- ANİMASYONLAR ---
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 4s linear infinite', // Logo'daki "Nur" (Sparkles) dönüşü için gerekli
      },
      
      // --- ANİMASYON KEYFRAME'LERİ ---
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}