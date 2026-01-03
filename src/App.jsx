import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, X, ArrowRight, Book, Star, HelpCircle, FileText, Heart, Trophy, BookOpen, Sparkles, Share2 } from 'lucide-react';

// --- DATA ---
import { globalSearchData } from './data/siteData'; 

// --- COMPONENTS ---
import MusicPlayer from './components/MusicPlayer'; 
import InstallPrompt from './components/InstallPrompt'; 
import Footer from './components/Footer'; 
import ScrollToTop from './components/ScrollToTop';

// --- CONTEXT ---
import { AppProvider, useAppContext } from './context/AppContext';

// --- PAGES ---
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
import Favorites from './pages/Favorites'; 

// Toast Component
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

// Extracted App Logic Component
function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // --- PAYLAŞIM FONKSİYONU ---
  const handleShare = async () => {
    const shareData = {
      title: 'OnikiKapı',
      text: 'İlim şehri OnikiKapı uygulamasını keşfetmeni tavsiye ederim:',
      url: 'https://onikikapi.vercel.app'
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Bağlantı kopyalandı! Arkadaşına gönderebilirsin.');
      }
    } catch (err) {
      console.log('Paylaşım iptal');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-turquoise-dark to-turquoise text-sand flex flex-col font-serif relative">
       
       <ScrollToTop />
       
       <Helmet>
         <title>OnikiKapı | Adalet, İlim ve Hikmet Kapısı</title>
         <meta name="description" content="Ehlibeyt mektebinin evrensel mesajını, ilim, hikmet ve adalet ekseninde sunan dijital külliye." />
       </Helmet>
       
       <Toast />

       <nav className="bg-turquoise-dark border-b border-gold/20 sticky top-0 z-50 shadow-xl backdrop-blur-md bg-opacity-95 transition-all">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between h-20">
             
             {/* LOGO */}
             <div className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
               <Link to="/" className="flex items-center gap-3 relative">
                 <div className="absolute inset-0 bg-gold/30 blur-xl rounded-full animate-pulse-slow group-hover:bg-gold/50 transition-all"></div>
                 <div className="relative p-2 border border-gold/50 rounded-lg bg-turquoise-dark group-hover:bg-turquoise transition-colors overflow-hidden">
                    <Sparkles size={24} className="text-gold absolute top-0 right-0 opacity-50 animate-spin-slow" />
                    <BookOpen size={28} className="text-gold relative z-10" />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-2xl font-sans font-bold text-gold tracking-wide drop-shadow-md leading-none">OnikiKapı</span>
                   <span className="text-[10px] text-turquoise-light tracking-[0.3em] uppercase font-bold">İlim Şehri</span>
                 </div>
               </Link>
             </div>

             {/* DESKTOP MENU */}
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
               
               <button onClick={handleShare} className="flex items-center gap-2 mr-2 bg-gold/10 hover:bg-gold hover:text-turquoise-dark text-gold border border-gold/30 px-3 py-2 rounded-lg transition-all font-bold text-sm">
                 <Share2 size={18} />
                 <span>Tavsiye Et</span>
               </button>

               <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`p-2 rounded-full transition-all border ${isSearchOpen ? 'bg-gold text-turquoise-dark border-gold' : 'text-gold hover:bg-gold/10 border-transparent hover:border-gold/30'}`}>
                 {isSearchOpen ? <X size={20} /> : <Search size={20} />}
               </button>
             </div>

             {/* MOBILE MENU BUTTONS */}
             <div className="-mr-2 flex items-center md:hidden gap-2">
               <button onClick={handleShare} className="bg-gold/10 p-2 rounded-full text-gold hover:bg-gold hover:text-turquoise-dark border border-gold/30 transition-colors">
                 <Share2 size={20} />
               </button>

               <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-turquoise p-2 rounded-md text-sand hover:text-white border border-gold/20">
                 <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                 </svg>
               </button>
             </div>
           </div>
         </div>

         {/* SEARCH PANEL */}
         {isSearchOpen && (
           <div className="absolute top-full left-0 w-full bg-turquoise-dark border-b border-gold/20 p-6 shadow-2xl animate-fade-in z-40">
             <div className="max-w-3xl mx-auto flex items-center gap-4 border-b-2 border-gold/30 pb-2">
               <Search className="text-gold" size={28} />
               <input type="text" autoFocus placeholder="İlim şehrinde ara..." className="w-full bg-transparent text-2xl text-sand placeholder-slate-300 border-none outline-none font-sans" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
             </div>
             <SearchResults query={searchQuery} closeSearch={() => setIsSearchOpen(false)} />
           </div>
         )}

         {/* MOBILE MENU DROP-DOWN */}
         {isMenuOpen && (
           <div className="md:hidden bg-turquoise-dark border-t border-gold/20">
             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
               <MobileNavLink to="/" label="Ana Sayfa" onClick={() => setIsMenuOpen(false)} />
               <MobileNavLink to="/zikir" label="Tesbihat" onClick={() => setIsMenuOpen(false)} />
               <MobileNavLink to="/manevi-receteler" label="Şifa Kapısı" onClick={() => setIsMenuOpen(false)} />
               <MobileNavLink to="/library" label="Kütüphane" onClick={() => setIsMenuOpen(false)} />
               <MobileNavLink to="/14-masum" label="14 Masum" onClick={() => setIsMenuOpen(false)} />
               <MobileNavLink to="/soru-cevap" label="Soru/Cevap" onClick={() => setIsMenuOpen(false)} />
               <MobileNavLink to="/ilim" label="İlim" onClick={() => setIsMenuOpen(false)} />
               <MobileNavLink to="/medya" label="Medya" onClick={() => setIsMenuOpen(false)} />
               <MobileNavLink to="/quiz" label="Yarışma" onClick={() => setIsMenuOpen(false)} />
               <MobileNavLink to="/heybem" label="Heybem (Favoriler)" onClick={() => setIsMenuOpen(false)} />
             </div>
           </div>
         )}
       </nav>

       <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-24 animate-fade-in"> 
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
       </main>

       <div className="fixed bottom-6 right-6 z-[100] scale-90 md:scale-100 origin-bottom-right">
         <MusicPlayer />
       </div>

       <InstallPrompt />

       <Footer />

    </div>
  );
}

const NavLink = ({ to, label }) => (
  <Link to={to} className="text-slate-200 hover:text-gold hover:bg-gold/10 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 font-sans tracking-wide whitespace-nowrap">
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, onClick }) => (
  <Link to={to} onClick={onClick} className="text-slate-200 hover:text-gold hover:bg-gold/10 block px-3 py-2 rounded-lg text-base font-medium font-sans">
    {label}
  </Link>
);

// MAIN EXPORT
export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}