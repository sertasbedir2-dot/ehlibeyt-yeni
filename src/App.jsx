import React, { useState, useEffect, Suspense, Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, X, Share2, Book, Star, Sparkles, Flame, BookOpen, Shield, MessageCircle, Heart, Store, Compass, Headphones, GraduationCap, LayoutGrid, Droplets, PenTool, Send } from 'lucide-react';

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
const Bazaar = React.lazy(() => import('./pages/Bazaar')); 
const Podcast = React.lazy(() => import('./pages/Podcast')); 
const Akademi = React.lazy(() => import('./pages/Akademi')); 
const Kerbela = React.lazy(() => import('./pages/Kerbela')); 
const Ibadet = React.lazy(() => import('./pages/Ibadet')); 
const Kesfet = React.lazy(() => import('./pages/Kesfet'));
const Hakikat = React.lazy(() => import('./pages/Hakikat')); 

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
    
    const isChunkError = error?.name === 'ChunkLoadError' || 
                         error?.message?.includes('Failed to fetch dynamically imported module') ||
                         error?.message?.includes('Importing a module script failed');
                         
    if (isChunkError) {
      const lastReload = sessionStorage.getItem('last_chunk_reload');
      const now = Date.now();
      if (!lastReload || (now - parseInt(lastReload)) > 10000) {
          sessionStorage.setItem('last_chunk_reload', now.toString());
          window.location.reload(true);
          return;
      }
    }
    this.setState({ errorInfo: errorInfo.componentStack });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', backgroundColor: '#09303a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Flame size={48} color="#C5A059" style={{ marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#FDF6E3' }}>Meclis Güncellendi</h1>
          <p style={{ marginBottom: '2rem', color: '#94a3b8', textAlign: 'center', maxWidth: '400px' }}>
            Dergâhımız arka planda yeni bir sürüme geçti. Devam etmek için sayfayı tazelememiz gerekiyor.
          </p>
          <button onClick={() => window.location.reload()} style={{ padding: '0.75rem 2rem', backgroundColor: '#C5A059', color: '#04151a', fontWeight: 'bold', borderRadius: '0.5rem', cursor: 'pointer', border: 'none' }}>
            Sayfayı Yenile
          </button>
        </div>
      );
    }
    return this.props.children; 
  }
}

function Toast() {
  const { toastMessage } = useAppContext();
  if (!toastMessage) return null;
  return (
    <div className="fixed top-24 right-4 bg-[#C5A059] text-[#09303a] px-6 py-3 rounded-xl shadow-2xl z-[200] animate-fade-in font-bold border border-white/20 flex items-center gap-2">
      <Sparkles size={18} /> {toastMessage}
    </div>
  );
}

// --- DİNAMİK SAATE DUYARLI KARŞILAMA MODALI ---
function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [greeting, setGreeting] = useState({ title: "", text: "", icon: BookOpen, color: "" });

  useEffect(() => {
    // Sadece günde 1 kez çıkması için tarih kontrolü
    const today = new Date().toDateString();
    if (localStorage.getItem('lastModalDate') === today) return;

    // Saate göre mesaj ayarlama
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting({ title: "Sabahın Nuru Üzerine Olsun", text: "Güne İlim ve Ehlibeyt'in hikmetiyle başlamak, rızkın en güzelidir. Dergâha hoş geldin.", color: "text-[#C5A059]" });
    } else if (hour >= 12 && hour < 17) {
      setGreeting({ title: "Günün Bereketli Olsun", text: "Dünya telaşının arasında hakikati aramaya vakit ayırdın. Meclisimize hoş geldin.", color: "text-white" });
    } else if (hour >= 17 && hour < 22) {
      setGreeting({ title: "Akşamın Hayr Olsun", text: "Günün yorgunluğunu manevi reçeteler ve hikmetli sözlerle at. İlim şehrine hoş geldin.", color: "text-[#C5A059]" });
    } else {
      setGreeting({ title: "Gecenin Sükuneti", text: "Herkes uykudayken hakikati arayan gözler ne mübarektir. Gece meclisine hoş geldin.", color: "text-emerald-400" });
    }

    const timer = setTimeout(() => setIsOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-[#0b1b24] border border-[#C5A059]/40 rounded-2xl p-8 max-w-lg text-center shadow-2xl relative w-full">
        <button onClick={() => {localStorage.setItem('lastModalDate', new Date().toDateString()); setIsOpen(false);}} className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"><X size={24}/></button>
        <BookOpen className={`${greeting.color} mx-auto mb-4`} size={40} />
        <h2 className={`text-2xl font-bold mb-2 ${greeting.color}`}>{greeting.title}</h2>
        <p className="text-slate-300 mb-6 font-serif leading-relaxed">{greeting.text}</p>
        <button onClick={() => {localStorage.setItem('lastModalDate', new Date().toDateString()); setIsOpen(false);}} className="bg-[#C5A059] text-[#09303a] px-8 py-3 rounded-xl font-bold w-full hover:bg-white transition-all shadow-[0_0_15px_rgba(197,160,89,0.3)]">Kapıdan İçeri Gir</button>
      </div>
    </div>
  );
}

function SearchResults({ query, closeSearch }) {
  const navigate = useNavigate();
  if (!query) return null;
  const results = (Array.isArray(globalSearchData) ? globalSearchData : []).filter(item => 
    item && (item.title?.toLowerCase().includes(query.toLowerCase()) || 
             item.category?.toLowerCase().includes(query.toLowerCase()) ||
             (item.keywords && item.keywords.toLowerCase().includes(query.toLowerCase())))
  );
  return (
    <div className="absolute top-16 right-0 w-full md:w-[400px] bg-[#0b1b24]/95 backdrop-blur-xl border border-[#C5A059]/30 rounded-xl overflow-hidden shadow-2xl max-h-96 overflow-y-auto z-[150]">
      {results.length > 0 ? results.map((r, i) => (
        <div key={i} onClick={() => {navigate(r.url || "/"); closeSearch();}} className="p-4 border-b border-white/5 hover:bg-white/10 cursor-pointer flex items-center gap-3">
          <Search size={16} className="text-[#C5A059]" />
          <div><h4 className="text-[#FDF6E3] font-bold text-sm">{r.title}</h4><span className="text-[10px] text-blue-300 uppercase">{r.type}</span></div>
        </div>
      )) : <div className="p-4 text-slate-400 text-sm">Sonuç bulunamadı.</div>}
    </div>
  );
}

function TopNavigation() {
  const location = useLocation();
  const navLinks = [
    { name: "Hakikat", path: "/hakikat" }, 
    { name: "İbadet", path: "/ibadet" },
    { name: "Kerbela", path: "/kerbela" },
    { name: "Kütüphane", path: "/library" },
    { name: "Soru/Cevap", path: "/soru-cevap" }
  ];
  return (
    <div className="hidden lg:flex items-center gap-6 ml-8">
      {navLinks.map((link) => (
        <Link key={link.path} to={link.path} className={`text-sm font-bold transition-all hover:text-white ${location.pathname === link.path ? 'text-[#C5A059] border-b-2 border-[#C5A059] pb-1' : 'text-slate-300'}`}>
          {link.name}
        </Link>
      ))}
      <Link to="/kesfet" className="text-sm font-bold text-[#C5A059] bg-[#C5A059]/10 px-3 py-1.5 rounded-lg hover:bg-[#C5A059] hover:text-[#04151a] transition-all flex items-center gap-1.5">
        <LayoutGrid size={16}/> Tüm Menü
      </Link>
    </div>
  );
}

function BottomNavigation() {
  const location = useLocation();
  const tabs = [
    { name: "Dergâh", path: "/", icon: Compass },
    { name: "İbadet", path: "/ibadet", icon: Droplets },
    { name: "Hakikat", path: "/hakikat", icon: Flame }, 
    { name: "Dinleti", path: "/podcast", icon: Headphones },
    { name: "Menü", path: "/kesfet", icon: LayoutGrid } 
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#0b1b24]/95 backdrop-blur-xl border-t border-[#C5A059]/20 flex items-center justify-between px-1 sm:px-2 z-[150] pt-2 pb-4 shadow-[0_-10px_40px_rgba(0,0,0,0.6)]">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const Icon = tab.icon;
        const isCenter = tab.name === "Hakikat";

        return (
          <Link key={tab.path} to={tab.path} className="flex flex-col items-center p-1 w-[20%] relative">
            <div className={`p-1.5 sm:p-2 rounded-xl transition-all duration-300 ${isActive ? (isCenter ? 'bg-red-900/40 scale-110 shadow-lg border border-red-500/30' : 'bg-[#C5A059]/20 scale-110') : 'bg-transparent'}`}>
              <Icon size={22} className={`${isActive ? (isCenter ? 'text-red-500' : 'text-[#C5A059]') : 'text-slate-400'}`} />
            </div>
            <span className={`text-[9px] font-bold mt-1 tracking-wide ${isActive ? (isCenter ? 'text-red-400' : 'text-[#C5A059]') : 'text-slate-400'}`}>
              {tab.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function DergahDefteri() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');

  // TELEGRAM BOT AYARLARI (Daha sonra kendi bilgilerinizi gireceksiniz)
  const TELEGRAM_BOT_TOKEN = "BURAYA_BOT_TOKEN_GELECEK"; 
  const TELEGRAM_CHAT_ID = "BURAYA_CHAT_ID_GELECEK";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const text = `📜 *Dergâh Defterine Yeni Yazı!*\n\n👤 *Kimden:* ${name || 'İsimsiz Can'}\n💬 *Mesaj:* ${message}`;

    try {
      if(TELEGRAM_BOT_TOKEN !== "BURAYA_BOT_TOKEN_GELECEK") {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: text, parse_mode: 'Markdown' })
        });
      }
      setStatus('success');
      setTimeout(() => { setIsOpen(false); setStatus('idle'); setMessage(''); setName(''); }, 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 lg:bottom-6 left-4 lg:left-6 z-[100] bg-[#C5A059] text-[#04151a] p-3 rounded-full shadow-[0_0_15px_rgba(197,160,89,0.5)] hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <PenTool size={24} />
        <span className="absolute left-14 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#C5A059]/30">
          Dergâh Defteri
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#0b1b24] border border-[#C5A059]/40 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
            <div className="bg-[#09303a] p-4 border-b border-[#C5A059]/20 flex justify-between items-center">
              <h3 className="text-[#C5A059] font-bold flex items-center gap-2"><BookOpen size={18}/> Dergâh Defteri</h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <p className="text-sm text-slate-300 mb-2 font-serif italic text-center">
                "Buraya bir iz bırak, yazın kalbine ulaşsın."
              </p>
              
              <input 
                type="text" 
                placeholder="İsminiz (İsteğe Bağlı)" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[#C5A059] outline-none transition-colors"
              />
              
              <textarea 
                required
                placeholder="Meclise iletmek istediğin söz nedir?" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-[#C5A059] outline-none transition-colors resize-none"
              />
              
              <button 
                type="submit" 
                disabled={status === 'sending' || status === 'success'}
                className={`mt-2 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${
                  status === 'success' ? 'bg-emerald-500 text-white' : 'bg-[#C5A059] text-[#04151a] hover:bg-white'
                }`}
              >
                {status === 'sending' ? 'Gönderiliyor...' : status === 'success' ? 'Sözünüz Ulaştı!' : <><Send size={18}/> Gönder</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function AppContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hp, setHp] = useState(parseInt(localStorage.getItem('hikmet_puani') || '0'));
  const navigate = useNavigate(); 

  // ONESIGNAL BİLDİRİM ATEŞLEYİCİSİ (HOOK MODELİ)
  useEffect(() => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function(OneSignal) {
      await OneSignal.init({
        appId: "524cbacc-4aea-46b8-96e9-eca2bbebe8e6", // APP ID ENJEKTE EDİLDİ
        safari_web_id: "",
        notifyButton: {
          enable: true,
          size: 'medium',
          theme: 'dark',
          position: 'bottom-left',
          offset: { bottom: '100px', left: '15px' }, // Dergâh Defteri butonunun hemen üzerinde duracak
          colors: { 
            'circle.background': '#C5A059',
            'circle.foreground': '#04151a',
            'badge.background': '#04151a',
            'badge.foreground': '#C5A059',
            'badge.bordercolor': '#04151a',
            'pulse.color': '#C5A059',
            'dialog.button.background.hovering': '#04151a',
            'dialog.button.background.active': '#04151a',
            'dialog.button.background': '#09303a',
            'dialog.button.foreground.textColor': '#C5A059'
          }
        },
      });
    });
  }, []);

  useEffect(() => {
    const loadHp = () => setHp(parseInt(localStorage.getItem('hikmet_puani') || '0'));
    window.addEventListener('hp_updated', loadHp); 
    return () => window.removeEventListener('hp_updated', loadHp);
  }, []);

  const handleGlobalShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "OnikiKapı | İlim ve Hikmet Şehri",
          text: "Hakikati arayanların, Ehlibeyt'in nurlu yolunda yürümek isteyenlerin meclisi. İlim şehrine davetlisin.",
          url: "https://www.onikikapi.com"
        });
      } catch (e) {
        console.log("Paylaşım iptal edildi");
      }
    } else {
      navigator.clipboard.writeText("https://www.onikikapi.com");
      alert("Site linki kopyalandı!");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#04151a] text-[#FDF6E3] flex flex-col font-serif relative animate-fade-in">
       <WelcomeModal />
       
       <nav className="bg-[#09303a] border-b border-[#C5A059]/20 sticky top-0 z-50 shadow-xl backdrop-blur-md px-4 py-3">
         <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="text-2xl font-sans font-black text-[#C5A059] tracking-widest uppercase drop-shadow-md">
              OnikiKapı
            </Link>
            
            <TopNavigation />
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 bg-black/30 border border-[#C5A059]/30 px-3 py-1.5 rounded-full text-[#C5A059] text-xs font-bold hidden sm:flex">
                <Shield size={14} /> <span>{hp} HP</span>
              </div>

              <button onClick={handleGlobalShare} className="text-slate-300 hover:text-[#C5A059] p-2 hover:bg-[#C5A059]/10 rounded-lg transition-colors" title="Siteyi Paylaş">
                <Share2 size={20} />
              </button>

              {isSearchOpen ? (
                <div className="flex items-center bg-white/10 rounded-lg px-2 relative z-50">
                  <input type="text" placeholder="Ara..." className="bg-transparent text-white focus:outline-none p-1.5 w-32 md:w-48 font-sans text-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
                  <X size={18} className="text-[#C5A059] cursor-pointer" onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} />
                  {searchQuery && <SearchResults query={searchQuery} closeSearch={() => { setIsSearchOpen(false); setSearchQuery(""); }} />}
                </div>
              ) : (
                <button onClick={() => setIsSearchOpen(true)} className="text-[#C5A059] p-2 hover:bg-[#C5A059]/10 rounded-lg transition-colors">
                  <Search size={22} />
                </button>
              )}
            </div>
         </div>
       </nav>

       <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-6 pb-28 md:pb-12"> 
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
             <Route path="/bazaar" element={<Bazaar />} /> 
             <Route path="/podcast" element={<Podcast />} /> 
             <Route path="/akademi" element={<Akademi />} /> 
             <Route path="/kerbela" element={<Kerbela />} /> 
             <Route path="/ibadet" element={<Ibadet />} />
             <Route path="/kesfet" element={<Kesfet />} /> 
             <Route path="/hakikat" element={<Hakikat />} /> 
           </Routes>
         </Suspense>
       </main>
       
       <Footer />
       <BottomNavigation />
       
       {/* Müzik Çalar ve Ziyaretçi Defteri */}
       <div className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-[100]"><MusicPlayer /></div>
       <DergahDefteri />
       
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