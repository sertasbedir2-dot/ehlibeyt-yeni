/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- MEVCUT RENKLER (Korundu) ---
        midnight: '#0F2C45', // Derin Safir (Ana Arka Plan)
        sand: '#F4EFE0',     // Kum Sarısı (Ana Metin Rengi)
        emerald: '#005C42',  // Ehlibeyt Yeşili
        gold: '#C5A059',     // Altın Yaldız (Ana Vurgu)
        slate: '#4A5D75',    // Safir Grisi (İkincil Metin/Bölücü)
        ice: '#E3F2FD',      // Buz Mavisi
        clay: '#8D3F3F',     // Kerbela Kili

        // --- YENİ EKLENEN: MANEVİ FERAHLIK (Turkuaz/Teal) ---
        spiritual: {
          DEFAULT: '#008080', // Teal (Ana Turkuaz - Dengeleyici)
          light: '#20B2AA',   // Açık Turkuaz (Vurgular ve Hover için)
          dim: 'rgba(0, 128, 128, 0.1)', // Arka plan efektleri için opak
        },
      },
      fontFamily: {
        // GÜNCELLENDİ: Modern ve Geometrik Başlıklar
        sans: ['"IBM Plex Arabic"', '"29LT Bukra"', 'ui-sans-serif', 'system-ui'],
        
        // GÜNCELLENDİ: Klasik Naskh Hattı (Uzun Okuma Metinleri)
        serif: ['"Amiri"', '"Markazi Text"', 'ui-serif', 'Georgia'],
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards', // Sayfa geçişleri için yumuşak giriş
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      // Animasyon Tanımları (Keyframes)
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