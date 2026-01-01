import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// --- BİLEŞENLER ---
import MusicPlayer from './components/MusicPlayer'; 

// --- SAYFALAR ---
import Home from './pages/Home'; // <--- ARTIK HARİCİ DOSYADAN GELİYOR
import Zikir from './pages/Zikir';
import ManeviReceteler from './pages/ManeviReceteler';
import OnDortMasum from './pages/OnDortMasum';
import SoruCevap from './pages/SoruCevap';
import Science from './pages/Science';
import Quiz from './pages/Quiz';
import MediaCenter from './pages/MediaCenter';
import Library from './pages/Library';
import KitapOku from './pages/KitapOku';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen w-full bg-slate-900 text-slate-200 flex flex-col font-sans relative">
        
        {/* --- NAVBAR --- */}
        <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              <div className="flex-shrink-0">
                <Link to="/" className="text-xl font-bold text-emerald-400 tracking-wide hover:text-emerald-300 transition-colors">
                  Ehlibeyt Yolu
                </Link>
              </div>

              {/* MASAÜSTÜ MENÜ */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink to="/" label="Ana Sayfa" />
                  <NavLink to="/zikir" label="Zikirmatik" />
                  <NavLink to="/library" label="Kütüphane" />
                  <NavLink to="/14-masum" label="14 Masum" />
                  <NavLink to="/soru-cevap" label="Soru/Cevap" />
                  <NavLink to="/ilim" label="İlim & Bilim" />
                  <NavLink to="/medya" label="Medya" />
                </div>
              </div>

              {/* MOBİL BUTON */}
              <div className="-mr-2 flex md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-slate-700 p-2 rounded-md text-slate-200 hover:text-white hover:bg-slate-600 focus:outline-none">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* MOBİL MENÜ İÇERİĞİ */}
          {isMenuOpen && (
            <div className="md:hidden bg-slate-800 border-t border-slate-700">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <MobileNavLink to="/" label="Ana Sayfa" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/zikir" label="Zikirmatik" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/library" label="Kütüphane" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/14-masum" label="14 Masum" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/soru-cevap" label="Soru & Cevap" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/ilim" label="İlim & Bilim" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/medya" label="Medya Merkezi" onClick={() => setIsMenuOpen(false)} />
              </div>
            </div>
          )}
        </nav>

        {/* --- ANA İÇERİK --- */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-24"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/zikir" element={<Zikir />} />
            <Route path="/manevi-receteler" element={<ManeviReceteler />} />
            <Route path="/library" element={<Library />} />
            <Route path="/kitap-oku" element={<KitapOku />} />
            <Route path="/14-masum" element={<OnDortMasum />} />
            <Route path="/soru-cevap" element={<SoruCevap />} />
            <Route path="/ilim" element={<Science />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/medya" element={<MediaCenter />} />
          </Routes>
        </main>

        {/* --- GLOBAL MÜZİK ÇALAR --- */}
        <div className="fixed bottom-6 right-6 z-[100] scale-90 md:scale-100 origin-bottom-right">
          <MusicPlayer />
        </div>

        {/* --- FOOTER --- */}
        <footer className="bg-slate-800 border-t border-slate-700 py-6">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
            &copy; 2025 Ehlibeyt Yolu.
          </div>
        </footer>
      </div>
    </Router>
  );
}

// Yardımcı Bileşenler
const NavLink = ({ to, label }) => (
  <Link to={to} className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
  >
    {label}
  </Link>
);

// BURADAKİ ESKİ "Home" KODU TAMAMEN SİLİNDİ.

export default App;