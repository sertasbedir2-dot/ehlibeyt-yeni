import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// --- SAYFA IMPORTLARI ---
import Zikir from './pages/Zikir';
import ManeviReceteler from './pages/ManeviReceteler';
import OnDortMasum from './pages/OnDortMasum';
import SoruCevap from './pages/SoruCevap';
import Science from './pages/Science';
import Quiz from './pages/Quiz';
import MediaCenter from './pages/MediaCenter';
import Library from './pages/Library';
import KitapOku from './pages/KitapOku'; // <--- STRATEJİK EKLENTİ: Okuma Sayfası

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen w-full bg-slate-900 text-slate-200 flex flex-col font-sans">
        
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
                  <NavLink to="/manevi-receteler" label="Reçeteler" />
                  <NavLink to="/library" label="Kütüphane" />
                  <NavLink to="/14-masum" label="14 Masum" />
                  <NavLink to="/soru-cevap" label="Soru/Cevap" />
                  <NavLink to="/ilim" label="İlim & Bilim" />
                  <NavLink to="/quiz" label="Yarışma" />
                  <NavLink to="/medya" label="Medya" />
                </div>
              </div>

              {/* MOBİL BUTON */}
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="bg-slate-700 inline-flex items-center justify-center p-2 rounded-md text-slate-200 hover:text-white hover:bg-slate-600 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* MOBİL MENÜ */}
          {isMenuOpen && (
            <div className="md:hidden bg-slate-800 border-t border-slate-700">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <MobileNavLink to="/" label="Ana Sayfa" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/zikir" label="Zikirmatik" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/manevi-receteler" label="Reçeteler" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/library" label="Kütüphane" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/14-masum" label="14 Masum" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/soru-cevap" label="Soru & Cevap" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/ilim" label="İlim & Bilim" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/quiz" label="Yarışma" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/medya" label="Medya Merkezi" onClick={() => setIsMenuOpen(false)} />
              </div>
            </div>
          )}
        </nav>

        {/* --- ANA İÇERİK --- */}
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/zikir" element={<Zikir />} />
            <Route path="/manevi-receteler" element={<ManeviReceteler />} />
            <Route path="/library" element={<Library />} />
            <Route path="/kitap-oku" element={<KitapOku />} /> {/* <--- STRATEJİK ROUTE: Okuma Sayfası Yolu */}
            <Route path="/14-masum" element={<OnDortMasum />} />
            <Route path="/soru-cevap" element={<SoruCevap />} />
            <Route path="/ilim" element={<Science />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/medya" element={<MediaCenter />} />
          </Routes>
        </main>

        {/* --- FOOTER --- */}
        <footer className="bg-slate-800 border-t border-slate-700 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
            &copy; 2025 Ehlibeyt Yolu. <span className="text-emerald-500">İlim ve Hikmet Kapısı.</span>
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
  <Link to={to} onClick={onClick} className="text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
    {label}
  </Link>
);

const Home = () => (
  <div className="text-center py-12 space-y-6">
    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
      Ehlibeyt Yolu'na Hoş Geldiniz
    </h1>
    <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
      İlim, hikmet ve maneviyatın dijital kütüphanesi. 
      Lütfen menüden gitmek istediğiniz bölümü seçiniz.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-left">
      <Link to="/library" className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all group">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400">📚 Gönül Kütüphanesi</h3>
        <p className="text-slate-400 text-sm">Seçkin eserler ve özel yayınlarımızı dijital ortamda okuyun.</p>
      </Link>
      <Link to="/zikir" className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all group">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400">📿 Zikirmatik</h3>
        <p className="text-slate-400 text-sm">Ruhunuzu dinlendirecek zikirleri takip edin.</p>
      </Link>
      <Link to="/ilim" className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all group">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400">❓ İlim & Soru Cevap</h3>
        <p className="text-slate-400 text-sm">Merak ettiğiniz hakikatlere dair cevaplar.</p>
      </Link>
    </div>
  </div>
);

export default App;