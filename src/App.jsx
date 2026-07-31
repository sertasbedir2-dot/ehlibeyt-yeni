import React, { useState, useEffect, Suspense, Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, X, Share2, Book, Star, Sparkles, Menu, Flame, BookOpen, Shield, MessageCircle, Heart, Store } from 'lucide-react';

// --- DATA ---
import { globalSearchData } from './data/siteData'; 

// --- COMPONENTS ---
import MusicPlayer from './components/MusicPlayer'; 
import Footer from './components/Footer'; 
import ScrollToTop from './components/ScrollToTop';
import InstallPrompt from './components/InstallPrompt';

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
const IrfanAgi = React.lazy(() => import('./pages/IrfanAgi')); 
const CanliMeclis = React.lazy(() => import('./pages/CanliMeclis')); 
const Bazaar = React.lazy(() => import('./pages/Bazaar')); // YENİ ROTA EKLENDİ

// --- GLOBAL ÇÖKME ÖNLEYİCİ ---
class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("KRİTİK HATA YAKALANDI:", error, errorInfo);
    this.setState({ errorInfo: errorInfo.componentStack });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', backgroundColor: '#7f1d1d', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Sistem Bir Hata Yakaladı!</h1>
          <p style={{ marginBottom: '1rem' }}>Lütfen aşağıdaki hata mesajını kopyalayıp bana gönder:</p>
          <div style={{ backgroundColor: 'black', padding: '1rem', color: '#fca5a5', overflowX: 'auto', borderRadius: '0.5rem' }}>
            <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{this.state.error?.toString()}</p>
            <pre style={{ marginTop: '1rem', fontSize: '0.875rem' }}>{this.state.errorInfo}</pre>
          </div>
          <button onClick={() => window.location.reload()} style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', backgroundColor: 'white', color: 'black', fontWeight: 'bold', borderRadius: '0.25rem', cursor: 'pointer' }}>Sayfayı Yenile</button>
        </div>
      );
    }
    return this.props.children; 
  }
}

// --- BİLEŞEN: KÜÇÜK BİLDİRİM (TOAST) ---
function Toast() {
  const { toastMessage } = useAppContext();
  if (!toastMessage) return null;
  return (
    <div className="fixed top-24 right-4 bg-[#C5A059] text-[#09303a] px-6 py-3 rounded-xl shadow-2xl z-[200] animate-fade-in font-bold border border-white/20 flex items-center gap-2">
      <Sparkles size={18} /> {toastMessage}
    </div>
  );
}

// --- BİLEŞEN: EN ÜST İŞBİRLİĞİ VE DUYURU ÇUBUĞU ---
function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('announcementDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem('announcementDismissed', 'true');
    setIsVisible(false);
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#09303a] via-[#04151a] to-[#09303a] border-b border-[#C5A059]/20 px-4 py-2.5 flex items-center justify-between z-[60] relative animate-fade-in">
       <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 mx-auto font-sans text-center max-w-3xl">
         <Sparkles size={16} className="text-[#C5A059] hidden sm:block shrink-0" />
         <p>
           Ehl-i Beyt yolunda üreten bir kanal veya yazar mısınız? <a href="https://wa.me/905553137021?text=Selam%C3%BCn%20Aleyk%C3%BCm.%20%C4%B0rfan%20A%C4%9F%C4%B1'na%20i%C3%A7erik%20%C3%BCreticisi%20olarak%20kat%C4%B1lmak%20istiyorum." target="_blank" rel="noopener noreferrer" className="text-[#C5A059] font-bold underline hover:text-white transition-colors ml-1">İrfan Ağı'na katılın</a>, meclisi birlikte büyütelim.
         </p>
       </div>
       <button onClick={dismiss} className="text-slate-500 hover:text-white ml-4 shrink-0 transition-colors">
         <X size={16} />
       </button>
    </div>
  );
}

// --- BİLEŞEN: AKILLI KARŞILAMA EKRANI ---
function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    try {
      const today = new Date().toDateString();
      const lastModalDate = localStorage.getItem('lastModalDate');
      const legacyWelcome = localStorage.getItem('hasSeenWelcome_v1');

      if (lastModalDate === today) return;

      const hour = new Date().getHours();
      const greeting = hour < 11 ? 'Sabah-ı Şerifler' : hour < 18 ? 'Günün Aydın Olsun' : 'Akşam-ı Şerifler';
      let content = {};

      if (!lastModalDate && !legacyWelcome) {
        content = {
          title: "İlim Şehrine Hoş Geldin",
          desc: "Burası sıradan bir web sitesi değil; hakikati arayanların, Ehlibeyt'in nurlu yolunda yürümek isteyenlerin meclisidir. İrfan ağımızda yerini al.",
          icon: BookOpen,
          iconColor: "text-[#C5A059]",
          button: "Kapıdan İçeri Gir"
        };
      } else {
        let daysDiff = 1;
        if (lastModalDate) {
          const diffTime = Math.abs(new Date().setHours(0,0,0,0) - new Date(lastModalDate).setHours(0,0,0,0));
          daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        if (daysDiff >= 3) {
          content = {
            title: "Neredeydin Can?",
            desc: "Meclisimiz seni özledi. Uzun zamandır kapımızı çalmadın. Gel, ruhunu Ehlibeyt'in hikmet pınarlarıyla yeniden dinlendir, arayı soğutma.",
            icon: Flame,
            iconColor: "text-orange-400",
            button: "Meclise Tekrar Katıl"
          };
        } else {
          content = {
            title: `${greeting} Can`,
            desc: "İlim yolculuğuna kaldığın yerden devam et. Her yeni gün, hakikate ve marifete atılmış yeni bir adımdır.",
            icon: Sparkles,
            iconColor: "text-emerald-400",
            button: "İlme Devam Et"
          };
        }
      }

      setModalContent(content);
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    } catch (e) { console.error("Storage Hatası:", e); }
  }, []);

  const handleClose = () => {
    try { 
      localStorage.setItem('lastModalDate', new Date().toDateString());
      localStorage.setItem('hasSeenWelcome_v1', 'true');
    } catch (e) {}
    setIsOpen(false);
  };

  if (!isOpen || !modalContent) return null;

  const ActiveIcon = modalContent.icon;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative bg-[#0b1b24] border border-[#C5A059]/40 rounded-2xl p-8 md:p-10 max-w-lg text-center shadow-[0_0_40px_rgba(197,160,89,0.15)] overflow-hidden w-full flex flex-col">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#C5A059]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#C5A059]/10 rounded-full blur-3xl"></div>
        
        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10 p-2">
          <X size={24}/>
        </button>

        <div className="mx-auto w-16 h-16 bg-[#C5A059]/10 rounded-full flex items-center justify-center mb-6 border border-[#C5A059]/30 relative z-10">
          <ActiveIcon className={modalContent.iconColor} size={32} />
        </div>

        <h2 className="text-3xl font-serif font-bold text-[#FDF6E3] mb-4 relative z-10">
          {modalContent.title}
        </h2>
        
        <div className="space-y-4 text-slate-300 font-serif leading-relaxed relative z-10">
          <p>{modalContent.desc}</p>
        </div>

        <button onClick={handleClose} className="mt-8 relative z-10 bg-[#C5A059] text-[#09303a] px-8 py-3 rounded-xl font-bold text-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:scale-105 active:scale-95">
          {modalContent.button}
        </button>

        <a href="https://wa.me/905553137021?text=Selam%C3%BCn%20Aleyk%C3%BCm.%20OnikiKap%C4%B1%20hakk%C4%B1nda%20yaz%C4%B1yorum." 
           target="_blank" rel="noopener noreferrer" 
           className="mt-8 pt-5 border-t border-white/10 flex items-center justify-center gap-2 text-xs md:text-sm text-slate-400 hover:text-[#C5A059] transition-colors relative z-10 group cursor-pointer font-sans">
           <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
           <span>Öneri, şikayet veya <b>işbirliği</b> için bize ulaşın</span>
        </a>
      </div>
    </div>
  );
}

// --- BİLEŞEN: ARAMA SONUÇLARI ---
function SearchResults({ query, closeSearch }) {
  const navigate = useNavigate();
  if (!query) return null;
  
  const queryLower = query.toLowerCase();
  const validData = Array.isArray(globalSearchData) ? globalSearchData : [];
  
  const results = validData.filter(item => {
    if(!item) return false;
    const tMatch = item.title ? String(item.title).toLowerCase().includes(queryLower) : false;
    const cMatch = item.category ? String(item.category).toLowerCase().includes(queryLower) : false;
    const kMatch = item.keywords ? String(item.keywords).toLowerCase().includes(queryLower) : false;
    return tMatch || cMatch || kMatch;
  });

  const handleNavigate = (url) => {
    navigate(url || "/");
    closeSearch();
  };

  return (
    <div className="absolute top-20 left-0 w-full md:w-[600px] md:-ml-[300px] bg-[#0b1b24]/95 backdrop-blur-xl border border-[#C5A059]/30 rounded-xl overflow-hidden shadow-2xl max-h-96 overflow-y-auto z-[150] custom-scrollbar">
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} onClick={() => handleNavigate(result.url)} className="p-4 border-b border-white/5 hover:bg-white/10 cursor-pointer flex items-center gap-4 transition-colors group">
            <div className="p-2 bg-[#09303a] rounded-lg text-[#C5A059] group-hover:scale-110 transition-transform">
               {result.type === "Kitap" && <Book size={20} />}
               {result.type === "14 Masum" && <Star size={20} />}
               {result.type !== "Kitap" && result.type !== "14 Masum" && <Search size={20} />}
            </div>
            <div>
              <h4 className="text-[#FDF6E3] font-bold text-lg group-hover:text-[#C5A059]">{result.title}</h4>
              <span className="text-xs text-[#93c5fd] uppercase tracking-wider">{result.type} • {result.category}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="p-8 text-center text-slate-300 italic">"{query}" ile ilgili sonuç bulunamadı.</div>
      )}
    </div>
  );
}

// --- BİLEŞEN: ÜST MENÜ VE GÜNLÜK AKILLI ROZETLER ---
function TopNavigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getDayBasedBadge = (path) => {
    const today = new Date().getDay(); 
    if (today === 1 && path === '/library') return { text: "İlme Başla", color: "bg-blue-500/90 text-white" }; 
    if (today === 2 && path === '/quiz') return { text: "Zihnini Sına", color: "bg-red-500/90 text-white" }; 
    if (today === 3 && path === '/soru-cevap') return { text: "Akla Danış", color: "bg-purple-500/90 text-white" }; 
    if (today === 4 && path === '/manevi-receteler') return { text: "Şifa Bul", color: "bg-emerald-500/90 text-white" }; 
    if (today === 5 && path === '/14-masum') return { text: "Nurlu Yol", color: "bg-[#C5A059] text-[#04151a]" }; 
    if ((today === 6 || today === 0) && path === '/irfan-agi') return { text: "Meclise Katıl", color: "bg-[#C5A059] text-[#04151a]" }; 
    return null; 
  };

  const baseNavLinks = [
    { name: "Manevi Reçeteler", path: "/manevi-receteler" },
    { name: "Kütüphane", path: "/library" },
    { name: "Soru/Cevap", path: "/soru-cevap" },
    { name: "14 Masum", path: "/14-masum" },
    { name: "İlim Meydanı", path: "/quiz" }, 
    { name: "İrfan Ağı", path: "/irfan-agi" },
    { name: "Medya", path: "/medya" }
  ];

  const navLinks = baseNavLinks.map(link => ({
    ...link,
    badgeInfo: getDayBasedBadge(link.path)
  }));

  return (
    <>
      <div className="hidden lg:flex items-center gap-6 ml-8">
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} className={`relative text-sm font-bold transition-all hover:-translate-y-0.5 ${location.pathname === link.path ? 'text-[#C5A059] border-b-2 border-[#C5A059] pb-1' : 'text-slate-300 hover:text-white'}`}>
            {link.name}
            {link.badgeInfo && (
              <span className={`absolute -top-3.5 -right-5 px-1.5 py-0.5 text-[8px] font-black uppercase rounded-full animate-pulse shadow-md border border-white/20 whitespace-nowrap ${link.badgeInfo.color}`}>
                {link.badgeInfo.text}
              </span>
            )}
          </Link>
        ))}
      </div>
      <button className="lg:hidden text-[#C5A059] p-2 hover:bg-white/10 rounded-lg ml-auto" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isMobileMenuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-[#09303a] border-b border-[#C5A059]/20 shadow-2xl lg:hidden z-[200] animate-fade-in">
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`relative flex items-center justify-between text-base font-bold p-3 rounded-lg transition-colors ${location.pathname === link.path ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
                <span>{link.name}</span>
                {link.badgeInfo && (
                  <span className={`px-2 py-1 text-[9px] font-black uppercase rounded-full animate-pulse shadow-md border border-white/20 shrink-0 ${link.badgeInfo.color}`}>
                    {link.badgeInfo.text}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const getLevelInfo = (hp) => {
  if(hp < 100) return { name: "Yolcu", next: 100, prev: 0 };
  if(hp < 500) return { name: "Talip", next: 500, prev: 100 };
  if(hp < 1500) return { name: "Derviş", next: 1500, prev: 500 };
  if(hp < 4000) return { name: "Ahi", next: 4000, prev: 1500 };
  if(hp < 10000) return { name: "Arif", next: 10000, prev: 4000 };
  return { name: "Kamil", next: 10000, prev: 10000, isMax: true };
};

function AppContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [streak, setStreak] = useState(0);
  const [hp, setHp] = useState(0);
  const navigate = useNavigate(); // Yönlendirme için eklendi

  useEffect(() => {
    try {
      const today = new Date().toDateString();
      const lastVisit = localStorage.getItem('lastVisit');
      let currentStreak = parseInt(localStorage.getItem('streak') || '0');

      if (lastVisit !== today) {
        const yesterday = new Date(); 
        yesterday.setDate(yesterday.getDate() - 1);
        currentStreak = lastVisit === yesterday.toDateString() ? currentStreak + 1 : 1;
        localStorage.setItem('lastVisit', today);
        localStorage.setItem('streak', currentStreak.toString());
      }
      setStreak(currentStreak);
    } catch (e) { console.error("Storage Hatası", e); }
    
    const loadHp = () => {
      const savedHp = parseInt(localStorage.getItem('hikmet_puani') || '0');
      setHp(savedHp);
    };
    
    loadHp(); 
    
    window.addEventListener('hp_updated', loadHp); 
    window.addEventListener('hp-updated', loadHp); 
    
    return () => {
      window.removeEventListener('hp_updated', loadHp);
      window.removeEventListener('hp-updated', loadHp);
    };
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

  const levelInfo = getLevelInfo(hp);
  const progressPercent = levelInfo.isMax ? 100 : ((hp - levelInfo.prev) / (levelInfo.next - levelInfo.prev)) * 100;

  return (
    <div className="min-h-screen w-full bg-[#04151a] text-[#FDF6E3] flex flex-col font-serif relative animate-fade-in">
       <AnnouncementBar />
       <WelcomeModal />
       
       <nav className="bg-[#09303a] border-b border-[#C5A059]/20 sticky top-0 z-50 shadow-xl backdrop-blur-md px-4 py-3">
         <div className="max-w-7xl mx-auto flex items-center relative">
            <Link to="/" className="text-2xl font-sans font-black text-[#C5A059] tracking-widest uppercase drop-shadow-md hover:scale-105 transition-transform">
              OnikiKapı
            </Link>
            
            <TopNavigation />
            
            <div className="flex items-center gap-3 md:gap-4 ml-auto lg:ml-0">
              
              {/* LOKMA BIRAK VE ÇARŞI BUTONU (YENİ GELİR MODELİ) */}
              <button 
                onClick={() => navigate('/bazaar')}
                className="group flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors relative" 
                title="Dergâh Çarşısı & Lokma Bırak"
              >
                <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-md animate-pulse"></div>
                <Heart size={20} className="text-rose-400 relative z-10 group-hover:scale-110 transition-transform" />
              </button>

              <div className="flex flex-col items-end mr-1 md:mr-3 hidden sm:flex" title={`${hp} HP - Sonraki seviye: ${levelInfo.next}`}>
                 <div className="flex items-center gap-1.5 text-[#C5A059] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    <Shield size={12} className="sm:w-[14px] sm:h-[14px]" /> 
                    <span>{levelInfo.name}</span> 
                    <span className="hidden sm:inline text-white/40 text-[10px] ml-1 font-mono lowercase">{hp} hp</span>
                 </div>
                 <div className="w-16 sm:w-24 md:w-32 h-1 sm:h-1.5 bg-black/50 rounded-full mt-1 overflow-hidden border border-[#C5A059]/20 shadow-inner">
                    <div className="h-full bg-gradient-to-r from-yellow-700 via-yellow-500 to-[#C5A059] rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
                 </div>
              </div>

              <div className="flex items-center gap-1.5 bg-black/30 border border-[#C5A059]/30 px-2 sm:px-3 py-1.5 rounded-full text-[#C5A059] text-xs font-bold shadow-inner" title="Aralıksız ziyaret serisi">
                <Flame size={14} className={`${streak > 0 ? 'fill-[#C5A059] animate-pulse' : 'text-slate-500'}`} />
                <span className="hidden sm:inline">{streak} Gün</span>
                <span className="sm:hidden">{streak}</span>
              </div>

              <button onClick={handleShare} className="hidden sm:flex items-center gap-2 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 p-2 sm:px-3 sm:py-2 rounded-lg font-bold text-sm hover:bg-[#C5A059] hover:text-[#09303a] transition-colors">
                <Share2 size={18} className="sm:w-4 sm:h-4"/> 
                <span>Paylaş</span>
              </button>

              {isSearchOpen ? (
                <div className="flex items-center bg-white/10 rounded-lg px-2 relative z-50">
                  <input type="text" placeholder="Ara..." className="bg-transparent text-white focus:outline-none p-2 w-32 md:w-64 font-sans text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
                  <X size={18} className="text-[#C5A059] cursor-pointer" onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} />
                  {searchQuery && <SearchResults query={searchQuery} closeSearch={() => { setIsSearchOpen(false); setSearchQuery(""); }} />}
                </div>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="text-[#C5A059] p-2 hover:bg-[#C5A059]/10 rounded-lg transition-colors">
                  <Search size={20} />
                </button>
              )}
            </div>
         </div>
       </nav>

       <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8 mb-24"> 
         <Suspense fallback={<div className="text-[#C5A059] flex flex-col items-center justify-center p-20 font-sans font-bold"><Flame className="animate-bounce mb-4" size={40}/>Yükleniyor...</div>}>
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
             <Route path="/irfan-agi" element={<IrfanAgi />} /> 
             <Route path="/canli-meclis" element={<CanliMeclis />} /> 
             <Route path="/bazaar" element={<Bazaar />} /> {/* ÇARŞI ROTASI */}
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
          <GlobalErrorBoundary>
            <AppContent />
          </GlobalErrorBoundary>
        </Router>
    </AppProvider>
  );
}