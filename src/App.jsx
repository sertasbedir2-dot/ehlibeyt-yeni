import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, X, Share2, Smartphone, Book, Star, Sparkles } from 'lucide-react';

// --- DATA ---
import { globalSearchData } from './data/siteData'; 

// --- COMPONENTS ---
import MusicPlayer from './components/MusicPlayer'; 
import Footer from './components/Footer'; 
import ScrollToTop from './components/ScrollToTop';
import InstallPrompt from './components/InstallPrompt';
import VisionTest from './components/VisionTest'; 

// --- CONTEXT ---
import { AppProvider, useAppContext } from './context/AppContext';

// --- PAGES (LAZY LOADING) ---
const Home = React.lazy(() => import('./pages/Home'));
const Zikir = React.lazy(() => import('./pages/Zikir'));
const ManeviReceteler = React.lazy(() => import('./pages/ManeviReceteler'));
const OnDortMasum = React.lazy(() => import('./pages/OnDortMasum'));
const SoruCevap = React.lazy(() => import('./pages/SoruCevap'));
const Science = React.lazy(() => import('./pages/Science'));
const Quiz = React.lazy(() => import('./pages/Quiz'));
const MediaCenter = React.lazy(() => import('./pages/MediaCenter'));
const Library = React.lazy(() => import('./pages/Library'));
const KitapOku = React.lazy(() => import('./pages/KitapOku'));
const Favorites = React.lazy(() => import('./pages/Favorites')); 

function Toast() {
  const { toastMessage } = useAppContext();
  if (!toastMessage) return null;
  return (
    <div className="fixed top-24 right-4 bg-gold text-midnight px-6 py-3 rounded-xl shadow-2xl z-[200] animate-fade-in font-bold border border-white/20 flex items-center gap-2">
      <Sparkles size={18} /> {toastMessage}
    </div>
  );
}

function SearchResults({ query, closeSearch }) {
  const navigate = useNavigate();
  if (!query) return null;
  
  const results = globalSearchData.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (url) => {
    navigate(url);
    closeSearch();
  };

  return (
    <div className="absolute top-16 left-0 w-full max-w-3xl mx-auto bg-turquoise-dark border border-gold/20 rounded-xl overflow-hidden shadow-2xl max-h-96 overflow-y-auto z-[150] custom-scrollbar">
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} onClick={() => handleNavigate(result.url)} className="p-4 border-b border-white/5 hover:bg-gold/10 cursor-pointer flex items-center gap-4 transition-colors group">
            <div className="p-2 bg-turquoise rounded-lg text-gold group-hover:scale-110 transition-transform">
               {result.type === "Kitap" && <Book size={20} />}
               {result.type === "14 Masum" && <Star size={20} />}
            </div>
            <div>
              <h4 className="text-sand font-bold text-lg group-hover:text-gold">{result.title}</h4>
              <span className="text-xs text-turquoise-light uppercase tracking-wider">{result.type} • {result.category}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="p-8 text-center text-slate-300 italic">"{query}" ile ilgili sonuç bulunamadı.</div>
      )}
    </div>
  );
}

function AppContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inFunnel, setInFunnel] = useState(true);
  
  // FACEBOOK KİLİDİ
  const isFacebookBrowser = /FBAN|FBAV|Instagram/i.test(navigator.userAgent);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('fbclid') || params.has('igshid')) {
        params.delete('fbclid');
        params.delete('igshid');
        const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        window.history.replaceState({}, document.title, newUrl);
      }
    } catch (error) {}
  }, []);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'OnikiKapı', text: 'İlim şehri OnikiKapı uygulamasını keşfet:', url: 'https://www.onikikapi.com' });
      } else {
        await navigator.clipboard.writeText('https://www.onikikapi.com');
        alert('Bağlantı kopyalandı!');
      }
    } catch (err) {}
  };

  // 1. AŞAMA: TARAYICI KONTROLÜ
  if (isFacebookBrowser && inFunnel) {
    return (
      <div className="min-h-screen w-full bg-[#0b3d2c] flex flex-col items-center justify-center p-6 font-sans text-center">
        <Smartphone size={64} className="text-[#f7d547] mb-6 animate-bounce" />
        <h1 className="text-2xl font-bold text-[#f7d547] mb-4">Sistem Sınırlaması Tespit Edildi</h1>
        <p className="text-[#e2e8f0] mb-8 max-w-md">Sosyal medya uygulamalarının dahili tarayıcıları platformu engellemektedir.</p>
        
        <div className="bg-[#052218] border border-[#f7d547] p-6 rounded-xl max-w-md w-full shadow-2xl">
          <h3 className="text-[#f7d547] font-bold mb-3 text-lg">Çözüm:</h3>
          <p className="text-[#cbd5e1] mb-6 text-sm">Sağ üst/alt köşedeki <strong>üç noktaya (...)</strong> tıklayın ve <br/><strong className="text-white bg-blue-600 px-2 py-1 rounded mt-2 inline-block">Sistem Tarayıcısında Aç (Chrome/Safari)</strong> seçin.</p>
          <hr className="border-[#f7d547]/30 mb-6" />
          <button onClick={() => setInFunnel(false)} className="text-[#8fa39b] text-sm hover:text-white underline">Yine de devam et</button>
        </div>
      </div>
    );
  }

  // 2. AŞAMA: EŞİK BEKÇİSİ
  if (inFunnel) {
    return (
      <div className="min-h-screen w-full bg-[#0b3d2c] flex flex-col items-center justify-center p-4 relative font-serif">
         <Helmet><title>OnikiKapı | Güvenlik Duvarı</title></Helmet>
         <VisionTest onComplete={() => setInFunnel(false)} />
      </div>
    );
  }

  // 3. AŞAMA: ANA SİTE
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-turquoise-dark to-turquoise text-sand flex flex-col font-serif relative animate-fade-in">
       
       <nav className="bg-turquoise-dark border-b border-gold/20 sticky top-0 z-50 shadow-xl backdrop-blur-md p-4">
         <div className="max-w-7xl mx-auto flex justify-between items-center relative">
            <Link to="/" className="text-2xl font-sans font-bold text-gold tracking-wide">OnikiKapı</Link>
            
            <div className="flex items-center gap-4">
              {isSearchOpen ? (
                <div className="flex items-center bg-white/10 rounded-lg px-2">
                  <input 
                    type="text" 
                    placeholder="Ara..." 
                    className="bg-transparent text-white focus:outline-none p-2 w-32 md:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <X size={18} className="text-gold cursor-pointer" onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} />
                </div>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="text-gold p-2 hover:bg-gold/10 rounded-lg">
                  <Search size={20} />
                </button>
              )}
              <button onClick={handleShare} className="flex items-center gap-2 bg-gold/10 text-gold border border-gold/30 px-3 py-2 rounded-lg font-bold text-sm"><Share2 size={18}/> Paylaş</button>
            </div>
            
            {isSearchOpen && searchQuery && <SearchResults query={searchQuery} closeSearch={() => { setIsSearchOpen(false); setSearchQuery(""); }} />}
         </div>
       </nav>

       <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 mb-24"> 
         <Suspense fallback={<div className="text-gold text-center p-20 font-sans font-bold">Arşiv Yükleniyor...</div>}>
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
             <Route path="/heybem" element={<Favorites />} /> 
           </Routes>
         </Suspense>
       </main>
       <Footer />
       <div className="fixed bottom-6 right-6 z-[100]"><MusicPlayer /></div>
       <InstallPrompt />
       <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
    </AppProvider>
  );
}
