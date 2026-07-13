import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, X, ArrowRight, Book, Star, HelpCircle, FileText, Heart, Trophy, BookOpen, Sparkles, Share2 } from 'lucide-react';

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

// --- PAGES (LAZY LOADING ENTEGRASYONU - FACEBOOK ÇÖKMESİNİ ENGELLER) ---
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
    <div className="max-w-3xl mx-auto mt-4 bg-turquoise-dark border border-gold/20 rounded-xl overflow-hidden shadow-2xl max-h-96 overflow-y-auto custom-scrollbar">
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} onClick={() => handleNavigate(result.url)} className="p-4 border-b border-white/5 hover:bg-gold/10 cursor-pointer flex items-center gap-4 transition-colors group">
            <div className="p-2 bg-turquoise rounded-lg text-gold group-hover:scale-110 transition-transform">
               {result.type === "Kitap" && <Book size={20} />}
               {result.type === "14 Masum" && <Star size={20} />}
               {result.type === "Soru/Cevap" && <HelpCircle size={20} />}
               {result.type === "Makale" && <FileText size={20} />}
               {result.type === "Zikir" && <Star size={20} />}
               {result.type === "Reçete" && <Heart size={20} />}
               {result.type === "Yarışma" && <Trophy size={20} />}
            </div>
            <div>
              <h4 className="text-sand font-bold text-lg group-hover:text-gold">{result.title}</h4>
              <span className="text-xs text-turquoise-light uppercase tracking-wider">{result.type} • {result.category}</span>
            </div>
            <ArrowRight size={16} className="ml-auto text-slate-300 group-hover:text-gold opacity-0 group-hover:opacity-100 transition-all" />
          </div>
        ))
      ) : (
        <div className="p-8 text-center text-slate-300 italic">"{query}" ile ilgili bir sonuç bulunamadı.</div>
      )}
    </div>
  );
}

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inFunnel, setInFunnel] = useState(true);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has('fbclid')) {
        params.delete('fbclid');
        const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
        window.history.replaceState({}, document.title, newUrl);
      }
    } catch (error) {
      console.log('Facebook yönlendirmesi güvenli geçildi.');
    }
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'OnikiKapı',
      text: 'İlim şehri OnikiKapı uygulamasını keşfetmeni tavsiye ederim:',
      url: 'https://www.onikikapi.com'
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Bağlantı kopyalandı!');
      }
    } catch (err) {
      console.log('Paylaşım iptal');
    }
  };

  if (inFunnel) {
    return (
      <div className="min-h-screen w-full bg-[#0b3d2c] flex flex-col items-center justify-center p-4 relative font-serif">
         <Helmet>
           <title>OnikiKapı | Stratejik Vizyon Testi</title>
         </Helmet>
         
         <VisionTest />

         <button
           onClick={() => setInFunnel(false)}
           className="mt-8 text-[#8fa39b] hover:text-[#f7d547] text-sm md:text-base border-b border-[#8fa39b] hover:border-[#f7d547] pb-1 transition-all duration-300 font-sans"
         >
           Testi Atla ve Ana Siteye Giriş Yap ➡️
         </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-turquoise-dark to-turquoise text-sand flex flex-col font-serif relative animate-fade-in">
       <Helmet>
         <title>OnikiKapı | Adalet, İlim ve Hikmet Kapısı</title>
         <meta name="description" content="Ehlibeyt mektebinin evrensel mesajını sunan dijital külliye." />
       </Helmet>
       <Toast />

       <nav className="bg-turquoise-dark border-b border-gold/20 sticky top-0 z-50 shadow-xl backdrop-blur-md bg-opacity-95 transition-all">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between h-20">
             <div className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
               <Link to="/" className="flex items-center gap-3 relative">
                 <div className="absolute inset-0 bg-gold/30 blur-xl rounded-full animate-pulse-slow"></div>
                 <div className="relative p-2 border border-gold/50 rounded-lg bg-turquoise-dark">
                    <BookOpen size={28} className="text-gold" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-2xl font-sans font-bold text-gold tracking-wide">OnikiKapı</span>
                 </div>
               </Link>
             </div>

             <div className="hidden md:flex items-center space-x-1">
                <div className="flex items-baseline space-x-1 mr-4">
                 <NavLink to="/" label="Ana Sayfa" />
                 <NavLink to="/zikir" label="Tesbihat" />
                 <NavLink to="/manevi-receteler" label="Şifa Kapısı" />
                 <NavLink to="/library" label="Kütüphane" />
                 <NavLink to="/14-masum" label="14 Masum" />
                 <NavLink to="/soru-cevap" label="Soru/Cevap" />
                 <NavLink to="/ilim" label="İlim" />
                 <NavLink to="/medya" label="Medya" />
                 <NavLink to="/quiz" label="Yarışma" />
                 <NavLink to="/heybem" label="Heybem" /> 
               </div>
               <button onClick={handleShare} className="flex items-center gap-2 bg-gold/10 text-gold border border-gold/30 px-3 py-2 rounded-lg font-bold text-sm">
                 <Share2 size={18} /> Tavsiye Et
               </button>
             </div>
           </div>
         </div>
       </nav>

       <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-24"> 
         {/* SAYFALAR ARASI GEÇİŞTE BEKLEME EKRANI (FACEBOOK KİLİT ÇÖZÜCÜ) */}
         <Suspense fallback={<div className="text-gold text-center p-20 font-sans font-bold">Yükleniyor...</div>}>
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

       <div className="fixed bottom-6 right-6 z-[100]">
         <MusicPlayer />
       </div>
       <InstallPrompt />
       <Footer />
    </div>
  );
}

const NavLink = ({ to, label }) => (
  <Link to={to} className="text-slate-200 hover:text-gold hover:bg-gold/10 px-3 py-2 rounded-lg text-sm font-medium transition-all font-sans">
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, onClick }) => (
  <Link to={to} onClick={onClick} className="text-slate-200 block px-3 py-2 rounded-lg text-base font-medium font-sans">
    {label}
  </Link>
);

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
