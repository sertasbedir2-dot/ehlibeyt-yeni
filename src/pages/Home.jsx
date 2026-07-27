import PrayerTimesWidget from '../components/PrayerTimesWidget';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PenTool, Scale, Flower, BookOpen, Sparkles, Search, Heart, HelpCircle, Sun, RefreshCw, Volume2, Share2, Flame, Bell, X, Download, HandHeart, CheckCircle2, Star } from 'lucide-react';
import { wisdomData } from '../data/wisdomData';
import { globalSearchData } from '../data/siteData'; 
import { toPng } from 'html-to-image';
import { QRCodeSVG } from 'qrcode.react';

const GOREVLER = [
  { text: "Bugün telefon rehberinden uzun süredir konuşmadığın bir akrabanı ara ve halini hatırını sor.", type: "Sıla-i Rahim" },
  { text: "Bugün karşılaştığın bir çocuğun başını okşa veya ona küçük bir çikolata ikram et.", type: "Merhamet" },
  { text: "Bugün bir sokak hayvanına (kedi/köpek/kuş) su veya mama ver.", type: "Şefkat" },
  { text: "Bugün öfkelendiğin bir an olursa, hiçbir şey söyleme ve hemen oturup üç kez derin nefes al.", type: "Sabır (Hilim)" },
  { text: "Bugün yediğin yemeğin ardından, o yemeği hazırlayan kişiye (anne, eş veya aşçı) içtenlikle teşekkür et ve dua et.", type: "Vefa & Şükür" }
];

export default function Home() {
  const [heroSearch, setHeroSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]); 
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showSharePreview, setShowSharePreview] = useState(false);
  const wisdomSectionRef = useRef(null);

  // --- ZIRHLANMIŞ GÜVENLİ ARAMA MOTORU ---
  const safeSearch = (query) => {
    if (!query.trim()) return [];
    const queryLower = query.toLowerCase();
    
    return globalSearchData.filter(item => {
      const tMatch = item.title ? String(item.title).toLowerCase().includes(queryLower) : false;
      const cMatch = item.category ? String(item.category).toLowerCase().includes(queryLower) : false;
      const kMatch = item.keywords ? String(item.keywords).toLowerCase().includes(queryLower) : false;
      return tMatch || cMatch || kMatch;
    });
  };

  // Eski uyarı mesajı (alert) tamamen silindi!
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchResults(safeSearch(heroSearch));
  };

  // Kullanıcı yazdıkça sonuçları anında getirir
  useEffect(() => {
    setSearchResults(safeSearch(heroSearch));
  }, [heroSearch]);
  // ----------------------------------------

  const dailyWisdom = useMemo(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return wisdomData[(dayOfYear - 1) % wisdomData.length] || wisdomData[0];
  }, []);

  const dailyTask = useMemo(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return GOREVLER[(dayOfYear - 1) % GOREVLER.length] || GOREVLER[0];
  }, []);

  const sendMorningNotification = () => {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    const notification = new Notification("🌅 Günün Manevi İkramı Hazır", {
      body: `💡 Hikmet: "${dailyWisdom.quote.substring(0, 50)}..."\n🎯 Görev: ${dailyTask.text}`,
      icon: "/favicon.ico"
    });
    notification.onclick = () => { window.focus(); notification.close(); wisdomSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
  };

  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');
    let currentStreak = parseInt(localStorage.getItem('streak') || '0');

    if (lastVisit !== today) {
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      currentStreak = lastVisit === yesterday.toDateString() ? currentStreak + 1 : 1;
      localStorage.setItem('lastVisit', today);
      localStorage.setItem('streak', currentStreak.toString());
    }
    setStreak(currentStreak);

    if (!localStorage.getItem('notificationAsked') && 'Notification' in window && Notification.permission === 'default') {
      setTimeout(() => setShowNotificationModal(true), 3000);
    }

    if (Notification.permission === "granted" && localStorage.getItem('lastNotificationDate') !== today) {
      sendMorningNotification();
      localStorage.setItem('lastNotificationDate', today);
    }
  }, [dailyWisdom, dailyTask]);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${dailyWisdom.quote}. Sözün sahibi: ${dailyWisdom.source}`);
      utterance.lang = 'tr-TR'; utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else alert("Tarayıcınız sesli okumayı desteklemiyor.");
  };

  const requestNotificationPermission = () => {
    setShowNotificationModal(false);
    localStorage.setItem('notificationAsked', 'true');
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setTimeout(() => alert("Teşekkürler! Sabah virdiniz her gün cihazınıza iletilecektir."), 300);
        sendMorningNotification();
        localStorage.setItem('lastNotificationDate', new Date().toDateString());
      }
    });
  };

  return (
    <div className="space-y-16 animate-fade-in relative">
      {showSharePreview && <SharePreviewModal dailyWisdom={dailyWisdom} onClose={() => setShowSharePreview(false)} />}
      
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-turquoise-dark border border-gold rounded-2xl p-6 max-w-sm text-center shadow-2xl relative animate-fade-in">
            <button onClick={() => setShowNotificationModal(false)} className="absolute top-2 right-2 text-slate-400 hover:text-white"><X size={20}/></button>
            <div className="mx-auto w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-4"><Bell className="text-gold" size={24} /></div>
            <h3 className="text-xl font-bold text-sand mb-2">Sabah Virdi</h3>
            <p className="text-slate-300 text-sm mb-6">Her sabah günün hikmeti ve manevi görevini bildirim olarak almak ister misin?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowNotificationModal(false)} className="flex-1 py-2 rounded-lg border border-slate-600 text-slate-400 text-sm font-bold hover:bg-white/5 transition-colors">Daha Sonra</button>
              <button onClick={requestNotificationPermission} className="flex-1 py-2 rounded-lg bg-gold text-turquoise-dark text-sm font-bold hover:bg-white transition-colors">Evet, İsterim</button>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <div className="relative py-20 px-6 rounded-3xl overflow-hidden text-center border border-gold/20 shadow-2xl group min-h-[600px] flex flex-col justify-center">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000&auto=format&fit=crop')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-turquoise-dark mix-blend-multiply"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center w-full">
          <div className="mb-4 animate-fade-in w-full max-w-xs mx-auto transform hover:scale-105 transition-transform duration-300 z-20"><PrayerTimesWidget /></div>
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center mb-2">
            <div className="absolute inset-0 bg-gold/40 blur-2xl rounded-full animate-pulse-slow"></div>
            <Sparkles size={50} className="text-gold absolute opacity-60 animate-spin-slow" />
            <BookOpen size={40} className="text-gold relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand drop-shadow-sm leading-tight">OnikiKapı</h1>
          <p className="text-xl md:text-2xl text-slate-200 font-serif leading-relaxed max-w-2xl">"İlim bir noktadır, onu cahiller çoğaltmıştır."</p>
          
          {/* ÇALIŞAN ARAMA ÇUBUĞU */}
          <div className="w-full max-w-2xl relative mt-4">
            <form onSubmit={handleSearch} className="relative flex items-center w-full z-30">
              <input 
                type="text" 
                placeholder="Bir kavram, hadis veya soru arayın..." 
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-sand placeholder-slate-300 rounded-full py-4 pl-8 pr-16 text-lg focus:outline-none focus:bg-white/20 focus:border-gold/50 transition-all shadow-lg" 
                value={heroSearch} 
                onChange={(e) => setHeroSearch(e.target.value)} 
              />
              <button type="submit" className="absolute right-2 p-2 bg-gold/90 hover:bg-gold text-turquoise-dark rounded-full transition-colors shadow-md"><Search size={24} /></button>
            </form>
            
            {/* ARAMA SONUÇLARI DROPDOWN */}
            {heroSearch.trim() && (
              <div className="absolute top-20 left-0 w-full bg-turquoise-dark/95 backdrop-blur-xl border border-gold/30 rounded-xl overflow-hidden shadow-2xl z-40 max-h-80 overflow-y-auto text-left animate-fade-in custom-scrollbar">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <Link to={result.url} key={index} className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/10 transition-colors">
                      <div className="p-2 bg-turquoise rounded-lg text-gold">
                        {result.type === "Kitap" ? <Book size={20} /> : <Star size={20} />}
                      </div>
                      <div>
                        <h4 className="text-sand font-bold text-lg">{result.title}</h4>
                        <span className="text-xs text-turquoise-light uppercase tracking-wider">{result.type} • {result.category}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-300 italic">"{heroSearch}" ile ilgili sonuç bulunamadı. Lütfen farklı bir kelime deneyin.</div>
                )}
              </div>
            )}
          </div>

          <div className="w-full max-w-3xl mt-6 z-20">
            <p className="text-sm text-turquoise-light uppercase tracking-widest font-bold mb-4">Bugün nasılsın?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <MoodChip label="Hüzünlü" icon={<Heart size={16} />} link="/manevi-receteler" color="hover:bg-rose-500/20 hover:border-rose-400 hover:text-rose-200" />
              <MoodChip label="Meraklı" icon={<HelpCircle size={16} />} link="/library" color="hover:bg-blue-500/20 hover:border-blue-400 hover:text-blue-200" />
              <MoodChip label="Şükür Dolu" icon={<Sun size={16} />} link="/zikir" color="hover:bg-yellow-500/20 hover:border-yellow-400 hover:text-yellow-200" />
              <MoodChip label="Kayıp Hissediyorum" icon={<Sparkles size={16} />} link="/14-masum" color="hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-200" />
            </div>
          </div>
        </div>
      </div>

      {/* GÜNÜN HİKMETİ */}
      <div id="gunun-hikmeti-alani" ref={wisdomSectionRef} className="w-full max-w-4xl mx-auto my-8 px-4 scroll-mt-24">
        <div className="relative bg-gradient-to-r from-[#0f172a] to-[#1e293b] border border-[#C5A059]/30 rounded-2xl p-8 text-center shadow-[0_0_25px_rgba(197,160,89,0.15)] group hover:border-[#C5A059]/50 transition-all duration-500">
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/40 border border-[#C5A059]/30 px-3 py-1 rounded-full text-[#C5A059] text-xs font-bold shadow-lg z-10" title="Aralıksız ziyaret serisi">
            <Flame size={14} className={`${streak > 0 ? 'fill-[#C5A059] animate-pulse' : 'text-slate-500'}`} />
            <span>{streak} Günlük Zincir</span>
          </div>
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#0B1120] border border-[#C5A059] p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <span className="inline-block mt-4 mb-4 text-xs font-bold text-[#C5A059] tracking-widest uppercase opacity-70 border-b border-[#C5A059]/30 pb-1">Günün Hikmeti • {dailyWisdom.category}</span>
          <h2 className="text-xl md:text-3xl font-serif text-slate-200 leading-relaxed italic mb-6">"{dailyWisdom.quote}"</h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-8 bg-[#C5A059]/50"></div>
            <p className="text-[#C5A059] font-bold font-sans text-sm md:text-base">{dailyWisdom.source}</p>
            <div className="h-px w-8 bg-[#C5A059]/50"></div>
          </div>
          <div className="flex justify-center gap-4 border-t border-white/5 pt-6">
            <button onClick={handleSpeak} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#C5A059]/20 text-slate-300 hover:text-[#C5A059] transition-colors text-sm font-medium"><Volume2 size={18} /><span className="hidden sm:inline">Dinle</span></button>
            <button onClick={() => setShowSharePreview(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-slate-900 transition-colors text-sm font-bold shadow-lg group-hover:scale-105 transform duration-300"><Share2 size={18} /><span>Hikayende Paylaş</span></button>
          </div>
        </div>
      </div>

      {/* GÜNÜN MANEVİ GÖREVİ */}
      <div className="bg-gradient-to-br from-[#0F4C5C] to-[#09303a] p-10 rounded-3xl border border-gold/20 relative overflow-hidden shadow-xl mx-4 transition-all duration-500 hover:shadow-gold/10 group">
        <div className="absolute -bottom-10 -left-10 p-4 opacity-5 rotate-12 pointer-events-none group-hover:opacity-10 transition-opacity"><HandHeart size={200} className="text-gold" /></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
          <div className="flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-sm bg-black/20 px-4 py-1 rounded-full border border-gold/10"><CheckCircle2 size={16} /> Günün Manevi Görevi</div>
          <div className="space-y-6 animate-fade-in w-full max-w-2xl">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
              <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2 opacity-80">{dailyTask.type}</p>
              <blockquote className="text-2xl md:text-3xl font-sans font-medium text-sand leading-relaxed">"{dailyTask.text}"</blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="grid md:grid-cols-3 gap-8 relative px-4 mt-8">
        <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none"><Flower size={300} className="text-turquoise-light rotate-12" /></div>
        <FeatureCard icon={<Flower size={32} className="text-rose-300" />} title="Manevi Reçeteler ve Muhabbet" desc="Ruhsal dinginlik ve ilahi aşk için Ehlibeyt kaynaklı manevi şifa kapısı." link="/manevi-receteler" />
        <FeatureCard icon={<PenTool size={32} className="text-gold" />} title="İlim ve Hikmet Kütüphanesi" desc="'Oku' emrinin izinde, kadim ve sahih kaynaklara açılan ilim kapısı." link="/library" />
        <FeatureCard icon={<Scale size={32} className="text-turquoise-light" />} title="Adalet ve Hakikat Arayışı" desc="Evrensel adalet ilkesi ve hakikat üzerine Soru/Cevap kapısı." link="/soru-cevap" />
      </div>
    </div>
  );
}

// --- ORTAK KART BİLEŞENİ ---
function StoryCardContent({ dailyWisdom }) {
  return (
    <div className="w-[1080px] h-[1920px] bg-[#0F4C5C] flex flex-col items-center justify-between text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F4C5C] via-[#09303a] to-[#04151a]"></div>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"}}></div>
        <div className="z-10 mt-32 flex flex-col items-center w-full px-12">
              <div className="p-8 border-[6px] border-[#E5C17C] rounded-full mb-8 bg-[#0F4C5C] shadow-2xl"><BookOpen size={120} className="text-[#E5C17C]" /></div>
              <h3 className="text-[#E5C17C] text-6xl font-sans tracking-[0.4em] uppercase font-bold mb-4">Günün Hikmeti</h3>
              <div className="w-64 h-2 bg-[#E5C17C] rounded-full"></div>
        </div>
        <div className="z-10 flex-grow flex flex-col justify-center px-24 relative w-full">
            <span className="absolute top-0 left-12 text-[#E5C17C] opacity-10 text-[500px] font-serif leading-none">“</span>
            <h1 className="text-[5.5rem] font-serif text-[#FDF6E3] leading-[1.2] italic mb-16 drop-shadow-xl px-4 tracking-wide">{dailyWisdom.quote}</h1>
            <div className="flex items-center justify-center gap-8 w-full"><div className="h-2 w-32 bg-[#E5C17C]"></div><p className="text-5xl text-[#E5C17C] font-sans font-black tracking-widest uppercase">{dailyWisdom.source}</p><div className="h-2 w-32 bg-[#E5C17C]"></div></div>
        </div>
        <div className="z-10 mb-32 w-full px-12 flex flex-col items-center gap-10">
            <div className="bg-white p-6 rounded-[3rem] shadow-[0_0_50px_rgba(229,193,124,0.3)] border-[10px] border-[#E5C17C]"><QRCodeSVG value="https://www.onikikapi.com/" size={250} /></div>
            <div className="bg-[#09303a] px-16 py-6 rounded-full border-2 border-[#E5C17C]/50 shadow-lg"><p className="text-4xl text-[#E5C17C] tracking-wider font-bold font-mono">www.onikikapi.com</p></div>
            <div className="flex flex-col items-center mt-4"><h1 className="text-[12rem] font-black text-[#E5C17C] leading-[0.8] tracking-tighter font-sans drop-shadow-2xl" style={{ textShadow: "10px 10px 0px rgba(0,0,0,0.5)" }}>OnikiKapı</h1><p className="text-4xl text-slate-400 font-serif tracking-[0.5em] mt-6 uppercase">İlim ve Hikmet Şehri</p></div>
        </div>
    </div>
  );
}

// --- ÖNİZLEME PENCERESİ (MODAL) ---
function SharePreviewModal({ dailyWisdom, onClose }) {
  const captureRef = useRef(null); 
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (captureRef.current && !downloading) {
      setDownloading(true);
      try {
        await document.fonts.ready;
        const dataUrl = await toPng(captureRef.current, { cacheBust: true, width: 1080, height: 1920, style: { transform: 'scale(1)', transformOrigin: 'top left', opacity: '1', visibility: 'visible', display: 'flex' } });
        const link = document.createElement("a"); link.href = dataUrl; link.download = `OnikiKapi_Hikmet_${new Date().toLocaleDateString()}.png`; link.click();
      } catch (err) { console.error("Hata:", err); alert("Resim indirilemedi. Lütfen tekrar deneyin."); } finally { setDownloading(false); }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 animate-fade-in backdrop-blur-md overflow-hidden">
      <div className="relative w-full max-w-lg flex flex-col items-center gap-4">
        <div className="flex justify-between items-center w-full text-white px-2"><h3 className="text-lg font-bold text-gold">Önizleme</h3><button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><X size={24} /></button></div>
        <div className="relative overflow-hidden shadow-2xl rounded-xl border-4 border-gold/30"><div style={{ transform: "scale(0.3)", transformOrigin: "top left", width: "1080px", height: "1920px", marginBottom: "-1344px" }}><StoryCardContent dailyWisdom={dailyWisdom} /></div></div>
        <div style={{ position: "fixed", top: 0, left: 0, zIndex: -9999, opacity: 0, pointerEvents: "none" }}><div ref={captureRef}><StoryCardContent dailyWisdom={dailyWisdom} /></div></div>
        <button onClick={handleDownload} disabled={downloading} className="w-full bg-[#E5C17C] text-[#09303a] font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white transition-all shadow-lg active:scale-95 disabled:opacity-50">{downloading ? <RefreshCw className="animate-spin" /> : <Download />}{downloading ? "Hazırlanıyor..." : "Resmi İndir"}</button>
        <p className="text-white/50 text-xs text-center">İndirdikten sonra Instagram veya WhatsApp'ta paylaşabilirsiniz.</p>
      </div>
    </div>
  );
}

function MoodChip({ label, icon, link, color }) { return (<Link to={link} className={`flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sand text-sm font-medium transition-all duration-300 ${color}`}>{icon} {label}</Link>); }
function FeatureCard({ icon, title, desc, link }) { return (<Link to={link} className="block group relative z-10 h-full"><div className="bg-turquoise p-8 rounded-2xl border border-white/10 h-full hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-2xl bg-opacity-80 backdrop-blur-sm flex flex-col"><div className="mb-6 p-4 bg-turquoise-dark rounded-xl w-fit group-hover:scale-110 transition-transform border border-gold/20 group-hover:border-gold/50 shadow-[0_0_15px_rgba(0,0,0,0.2)]">{icon}</div><h3 className="text-2xl font-bold text-sand mb-3 group-hover:text-gold transition-colors font-sans">{title}</h3><p className="text-slate-200 text-base leading-relaxed font-serif line-clamp-3">{desc}</p></div></Link>); }
