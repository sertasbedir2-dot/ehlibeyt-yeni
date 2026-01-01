import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ShieldCheck, X, ArrowRight } from 'lucide-react'; // <--- X ve ArrowRight EKLENDİ

// --- BİLEŞENLER ---
import MusicPlayer from './components/MusicPlayer'; 

// --- SAYFALAR ---
import Home from './pages/Home';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false); // <--- ARAMA DURUMU
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <div className="min-h-screen w-full bg-midnight text-sand flex flex-col font-serif relative">
        
        {/* --- GLOBAL SEO AYARLARI --- */}
        <Helmet>
          <title>Ehlibeyt Yolu | İlim ve Hikmet Kapısı</title>
          <meta name="description" content="Ehlibeyt'in nurlu yolunda ilim, hikmet ve maneviyat durağı." />
        </Helmet>

        {/* --- NAVBAR --- */}
        <nav className="bg-midnight border-b border-gold/20 sticky top-0 z-50 shadow-2xl backdrop-blur-md bg-opacity-90 transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center gap-3">
                <Link to="/" className="text-2xl font-sans font-bold text-gold tracking-wide hover:text-spiritual-light transition-colors drop-shadow-md">
                  Ehlibeyt Yolu
                </Link>
              </div>

              {/* MASAÜSTÜ MENÜ */}
              <div className="hidden md:flex items-center space-x-1">
                 <div className="flex items-baseline space-x-1 mr-4">
                  <NavLink to="/" label="Ana Sayfa" />
                  <NavLink to="/zikir" label="Zikirmatik" />
                  <NavLink to="/library" label="Kütüphane" />
                  <NavLink to="/14-masum" label="14 Masum" />
                  <NavLink to="/soru-cevap" label="Soru/Cevap" />
                  <NavLink to="/ilim" label="İlim & Bilim" />
                  <NavLink to="/medya" label="Medya" />
                </div>
                
                {/* ARAMA BUTONU (Artık İşlevsel) */}
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`p-2 rounded-full transition-all border ${isSearchOpen ? 'bg-gold text-midnight border-gold' : 'text-gold hover:bg-gold/10 border-transparent hover:border-gold/30'}`}
                  title="Arama Yap"
                >
                  {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                </button>
              </div>

              {/* MOBİL BUTON */}
              <div className="-mr-2 flex md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-slate p-2 rounded-md text-sand hover:text-white border border-gold/20">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* --- AÇILIR ARAMA PANELI (YENİ) --- */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 w-full bg-[#162e45] border-b border-gold/20 p-4 shadow-2xl animate-fade-in z-40">
              <div className="max-w-3xl mx-auto flex items-center gap-4">
                <Search className="text-gold opacity-50" size={24} />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Site genelinde ara (Örn: Namaz, Kerbela, Kütüphane)..." 
                  className="w-full bg-transparent text-xl text-sand placeholder-slate-400 border-none outline-none font-sans"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && alert("Global Arama özelliği yakında tüm veritabanına bağlanacak.")}
                />
                <button className="bg-gold text-midnight px-4 py-2 rounded-lg font-bold text-sm hover:bg-white transition flex items-center gap-2">
                  Ara <ArrowRight size={16}/>
                </button>
              </div>
              <div className="max-w-3xl mx-auto mt-2 text-xs text-slate-400">
                Popüler: <span className="text-spiritual-light cursor-pointer hover:underline">Zikirler</span>, <span className="text-spiritual-light cursor-pointer hover:underline">14 Masum</span>, <span className="text-spiritual-light cursor-pointer hover:underline">Mersiyeler</span>
              </div>
            </div>
          )}

          {/* MOBİL MENÜ İÇERİĞİ */}
          {isMenuOpen && (
            <div className="md:hidden bg-midnight border-t border-gold/20">
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
        <footer className="bg-midnight border-t border-gold/10 py-8 mt-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4 relative z-10">
            <div>
              <span className="text-xl font-sans font-bold text-gold block mb-1">Ehlibeyt Yolu</span>
              <span className="text-xs text-slate tracking-widest uppercase">İlim ve Hikmet Kapısı</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-spiritual-light bg-spiritual-dim/10 py-2 px-4 rounded-full mx-auto w-fit border border-spiritual/20">
              <ShieldCheck size={16} />
              <span className="text-xs font-bold">Reklamsız & Takipçisiz Güvenli Alan</span>
            </div>
            <p className="text-slate text-xs max-w-2xl mx-auto leading-relaxed opacity-70">
              Bu platformda kullanıcı verileri asla toplanmaz. &copy; 2025 Ehlibeyt Yolu.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

// Yardımcı Bileşenler
const NavLink = ({ to, label }) => (
  <Link to={to} className="text-slate-300 hover:text-gold hover:bg-gold/5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 font-sans tracking-wide">
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-slate-300 hover:text-gold hover:bg-gold/5 block px-3 py-2 rounded-lg text-base font-medium font-sans"
  >
    {label}
  </Link>
);

export default App;