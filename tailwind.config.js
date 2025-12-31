/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0F2C45', // Derin Safir
        sand: '#F4EFE0',     // Kum Sarısı
        emerald: '#005C42',  // Ehlibeyt Yeşili
        gold: '#C5A059',     // Altın Yaldız
        slate: '#4A5D75',    // Safir Grisi
        ice: '#E3F2FD',      // Buz Mavisi
        clay: '#8D3F3F'      // Kerbela Kili
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Amiri', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
      }
    },
  },
  plugins: [],
}