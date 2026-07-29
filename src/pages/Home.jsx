import PrayerTimesWidget from '../components/PrayerTimesWidget';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PenTool, Scale, Flower, BookOpen, Book, Sparkles, Search, Heart, HelpCircle, Sun, Volume2, Share2, Bell, X, HandHeart, CheckCircle2, Star, ArrowRight } from 'lucide-react';
import { wisdomData } from '../data/wisdomData';
import { globalSearchData } from '../data/siteData'; 

// --- GÜNLÜK GÖREVLER DATA ---
const GOREVLER = [
  { text: "Bugün telefon rehberinden uzun süredir konuşmadığın bir akrabanı ara ve halini hatırını sor.", type: "Sıla-i Rahim", link: "/soru-cevap", ctaText: "Sıla-i Rahim hakkında oku" },
  { text: "Bugün karşılaştığın bir çocuğun başını okşa veya ona küçük bir çikolata ikram et.", type: "Merhamet", link: "/library", ctaText: "Şefkat kıssalarına göz at" },
  { text: "Bugün bir sokak hayvanına (kedi/köpek/kuş) su veya mama ver.", type: "Şefkat", link: "/manevi-receteler", ctaText: "Doğaya merhamet reçeteleri" }
];

export default function Home() {
  const [heroSearch, setHeroSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]); 
  const navigate = useNavigate();
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const wisdomSectionRef = useRef(null);

  const safeSearch = (query) => {
    if (!query || !query.trim() || !Array.isArray(globalSearchData)) return [];
    const queryLower = query.toLowerCase();
    return globalSearchData.filter(item => {
      if (!item) return false;
      const tMatch = item.title ? String(item.title).toLowerCase().includes(queryLower) : false;
      const cMatch = item.category ? String(item.category).toLowerCase().includes(queryLower) : false;
      const kMatch = item.keywords ? String(item.keywords).toLowerCase().includes(queryLower) : false;
      return tMatch || cMatch || kMatch;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchResults(safeSearch(heroSearch));
  };

  useEffect(() => {
    setSearchResults(safeSearch(heroSearch));
  }, [heroSearch]);

  const dailyWisdom = useMemo(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const data = Array.isArray(wisdomData) && wisdomData.length > 0 ? wisdomData : [{ quote: "İlim Çin'de de olsa gidip alınız.", source: "Hz. Muhammed (s.a.a)", category: "İlim" }];
    return data[(dayOfYear - 1) % data.length] || data[0];
  }, []);

  const dailyTask = useMemo(() => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return GOREVLER[(dayOfYear - 1) % GOREVLER.length] || GOREVLER[0];
  }, []);

  useEffect(() => {
    try {
      if (!localStorage.getItem('notificationAsked') && 'Notification' in window && Notification.permission === 'default') {
        setTimeout(() => setShowNotificationModal(true), 3000);
      }
    } catch (e) {
      console.error("Local Storage Hatası:", e);
    }
  }, []);

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
    try {
      localStorage.setItem('notificationAsked', 'true');
    } catch(e) {}
    
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setTimeout(() => alert("Teşekkürler! Sabah virdiniz her gün cihazınıza iletilecektir."), 300);
        try { localStorage.setItem('lastNotificationDate', new Date().toDateString()); } catch(e){}
      }
    });
  };

  // --- SÜRTÜNMESİZ PAYLAŞIM (NATIVE SHARE API) ---
  const handleNativeShare = async (title, textContent) => {
    const siteUrl = "https://www.onikikapi.com";
    const shareText = `${textContent}\n\nDaha fazlası için:`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: siteUrl,
        });
        console.log('Başarıyla paylaşıldı');
      } catch (err) {
        console.log('Paylaşım iptal edildi veya hata oluştu:', err);
      }
    } else {
      navigator.clipboard.writeText(`${title} - ${shareText} ${siteUrl}`);
      alert("Metin ve bağlantı kopyalandı! İstediğiniz yere yapıştırabilirsiniz.");
    }
  };

  return (
    <div className="space-y-16 animate-fade-in relative">
      {/* SAĞ ÜSTTE SABİT VAKİT/TAKVİM WIDGET'I */}
      <div className="hidden lg:block fixed top-24 right-6 z-[100]">
         <PrayerTimesWidget />
      </div>

      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#09303a] border border-[#C5A059] rounded-2xl p-6 max-w-sm text-center shadow-2xl relative animate-fade-in">
            <button onClick={() => setShowNotificationModal(false)} className="absolute top-2 right-2 text-slate-400 hover:text-white"><X size={20}/></button>
            <div className="mx-auto w-12 h-12 bg-[#C5A059]/20 rounded-full flex items-center justify-center mb-4"><Bell className="text-[#C5A059]" size={24} /></div>
            <h3 className="text-xl font-bold text-[#FDF6E3] mb-2">Sabah Virdi</h3>
            <p className="text-slate-300 text-sm mb-6">Her sabah günün hikmeti ve manevi görevini bildirim olarak almak ister misin?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowNotificationModal(false)} className="flex-1 py-2 rounded-lg border border-slate-600 text-slate-400 text-sm font-bold hover:bg-white/5 transition-colors">Daha Sonra</button>
              <button onClick={requestNotificationPermission} className="flex-1 py-2 rounded-lg bg-[#C5A059] text-[#09303a] text-sm font-bold hover:bg-white transition-colors">Evet, İsterim</button>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <div className="relative py-20 px-6 rounded-3xl overflow-hidden text-center border border-[#C5A059]/20 shadow-2xl group min-h-[500px] flex flex-col justify-center mt-6">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000&auto=format&fit=crop')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#04151a]/80 via-[#04151a]/60 to-[#04151a]/90"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center w-full">
          <div className="lg:hidden mb-4 animate-fade-in w-full max-w-xs mx-auto z-20"><PrayerTimesWidget /></div>
          
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center mb-2">
            <div className="absolute inset-0 bg-[#C5A059]/40 blur-2xl rounded-full animate-pulse-slow"></div>
            <Sparkles size={50} className="text-[#C5A059] absolute opacity-60 animate-spin-slow" />
            <BookOpen size={40} className="text-[#C5A059] relative z-10 drop-shadow-[0_0_15px_rgba(197,160,89,0.5)]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FDF6E3] via-[#C5A059] to-[#FDF6E3] drop-shadow-sm leading-tight">OnikiKapı</h1>
          <p className="text-xl md:text-2xl text-slate-200 font-serif leading-relaxed max-w-2xl">"İlim bir noktadır, onu cahiller çoğaltmıştır."</p>
          
          <div className="w-full max-w-2xl relative mt-4">
            <form onSubmit={handleSearch} className="relative flex items-center w-full z-30">
              <input 
                type="text" 
                placeholder="Bir kavram, hadis veya soru arayın..." 
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FDF6E3] placeholder-slate-300 rounded-full py-4 pl-8 pr-16 text-lg focus:outline-none focus:bg-white/20 focus:border-[#C5A059]/50 transition-all shadow-lg" 
                value={heroSearch} 
                onChange={(e) => setHeroSearch(e.target.value)} 
              />
              <button type="submit" className="absolute right-2 p-2 bg-[#C5A059]/90 hover:bg-[#C5A059] text-[#09303a] rounded-full transition-colors shadow-md"><Search size={24} /></button>
            </form>
            
            {heroSearch.trim() && (
              <div className="absolute top-20 left-0 w-full bg-[#09303a]/95 backdrop-blur-xl border border-[#C5A059]/30 rounded-xl overflow-hidden shadow-2xl z-40 max-h-80 overflow-y-auto text-left animate-fade-in custom-scrollbar">
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <div 
                      key={index} 
                      onClick={() => navigate(result.url || "/")} 
                      className="flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="p-2 bg-[#04151a] rounded-lg text-[#C5A059]">
                        {result.type === "Kitap" && <Book size={20} />}
                        {result.type === "14 Masum" && <Star size={20} />}
                        {result.type !== "Kitap" && result.type !== "14 Masum" && <Search size={20} />}
                      </div>
                      <div>
                        <h4 className="text-[#FDF6E3] font-bold text-lg">{result.title || "İsimsiz"}</h4>
                        <span className="text-xs text-[#93c5fd] uppercase tracking-wider">{result.type || "Belirsiz"} • {result.category || "Genel"}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-slate-300 italic">"{heroSearch}" ile ilgili sonuç bulunamadı.</div>
                )}
              </div>
            )}
          </div>

          <div className="w-full max-w-3xl mt-6 z-20">
            <p className="text-sm text-[#93c5fd] uppercase tracking-widest font-bold mb-4 drop-shadow-md">Bugün nasılsın?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <MoodChip label="Hüzünlü" icon={<Heart size={16} />} onClick={() => navigate("/medya?cat=mersiye")} color="bg-rose-500/20 border-rose-500/40 text-rose-100 hover:bg-rose-500/40 hover:scale-105" />
              <MoodChip label="Meraklı" icon={<HelpCircle size={16} />} onClick={() => navigate("/library")} color="bg-blue-500/20 border-blue-500/40 text-blue-100 hover:bg-blue-500/40 hover:scale-105" />
              <MoodChip label="Şükür Dolu" icon={<Sun size={16} />} onClick={() => navigate("/zikir")} color="bg-yellow-500/20 border-yellow-500/40 text-yellow-100 hover:bg-yellow-500/40 hover:scale-105" />
            </div>
          </div>
        </div>
      </div>

      {/* GÜNÜN HİKMETİ */}
      <div id="gunun-hikmeti-alani" ref={wisdomSectionRef} className="w-full max-w-4xl mx-auto my-8 px-4 scroll-mt-24">
        <div className="relative bg-gradient-to-r from-[#0f172a] to-[#1e293b] border border-[#C5A059]/30 rounded-2xl p-8 text-center shadow-[0_0_25px_rgba(197,160,89,0.15)] group hover:border-[#C5A059]/50 transition-all duration-500">
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
            
            {/* YENİ: SÜRTÜNMESİZ PAYLAŞ BUTONU */}
            <button 
              onClick={() => handleNativeShare("OnikiKapı - Günün Hikmeti", `"${dailyWisdom.quote}" — ${dailyWisdom.source}`)} 
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-[#09303a] transition-colors text-sm font-bold shadow-lg group-hover:scale-105 transform duration-300"
            >
              <Share2 size={18} /><span>Paylaş</span>
            </button>
          </div>
        </div>
      </div>

      {/* GÜNÜN MANEVİ GÖREVİ */}
      <div className="bg-gradient-to-br from-[#0F4C5C] to-[#09303a] p-10 rounded-3xl border border-[#C5A059]/20 relative overflow-hidden shadow-xl mx-4 transition-all duration-500 hover:shadow-[#C5A059]/10 group">
        <div className="absolute -bottom-10 -left-10 p-4 opacity-5 rotate-12 pointer-events-none group-hover:opacity-10 transition-opacity"><HandHeart size={200} className="text-[#C5A059]" /></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
          <div className="flex items-center gap-2 text-[#C5A059] font-bold uppercase tracking-widest text-sm bg-black/20 px-4 py-1 rounded-full border border-[#C5A059]/10"><CheckCircle2 size={16} /> Günün Manevi Görevi</div>
          <div className="space-y-6 animate-fade-in w-full max-w-2xl">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
              <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-2 opacity-80">{dailyTask.type}</p>
              <blockquote className="text-2xl md:text-3xl font-sans font-medium text-[#FDF6E3] leading-relaxed">"{dailyTask.text}"</blockquote>
            </div>
          </div>
          
          {/* BUTON GRUBU: Link + Paylaş */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            {dailyTask.link && (
              <Link to={dailyTask.link} className="flex items-center justify-center gap-2 text-[#C5A059] hover:text-white transition-colors font-bold text-sm bg-black/30 px-6 py-3 rounded-xl border border-[#C5A059]/20 hover:border-[#C5A059]/50 w-full sm:w-auto">
                {dailyTask.ctaText} <ArrowRight size={16} />
              </Link>
            )}
            
            {/* YENİ: SÜRTÜNMESİZ GÖREV PAYLAŞ BUTONU */}
            <button 
              onClick={() => handleNativeShare("OnikiKapı - Günün Manevi Görevi", dailyTask.text)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#C5A059] text-[#09303a] font-bold text-sm rounded-xl hover:bg-white transition-all shadow-lg group-hover:scale-105 w-full sm:w-auto"
            >
              <Share2 size={16} /> Görevi Paylaş
            </button>
          </div>

        </div>
      </div>

      {/* FEATURE CARDS */}
      <div className="grid md:grid-cols-3 gap-8 relative px-4 mt-8">
        <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none"><Flower size={300} className="text-[#93c5fd] rotate-12" /></div>
        <FeatureCard icon={<Flower size={32} className="text-rose-300" />} title="Manevi Reçeteler ve Muhabbet" desc="Ruhsal dinginlik ve ilahi aşk için Ehlibeyt kaynaklı manevi şifa kapısı." link="/manevi-receteler" />
        <FeatureCard icon={<PenTool size={32} className="text-[#C5A059]" />} title="İlim ve Hikmet Kütüphanesi" desc="'Oku' emrinin izinde, kadim ve sahih kaynaklara açılan ilim kapısı." link="/library" />
        <FeatureCard icon={<Scale size={32} className="text-[#93c5fd]" />} title="Adalet ve Hakikat Arayışı" desc="Evrensel adalet ilkesi ve hakikat üzerine Soru/Cevap kapısı." link="/soru-cevap" />
      </div>
    </div>
  );
}

function MoodChip({ label, icon, onClick, color }) { 
  return (
    <button 
      onClick={onClick} 
      className={`flex items-center gap-2 px-6 py-3 rounded-full border backdrop-blur-md text-sm font-bold transition-all duration-300 shadow-lg ${color}`}
    >
      {icon} {label}
    </button>
  ); 
}

function FeatureCard({ icon, title, desc, link }) { 
  return (
    <Link to={link} className="block group relative z-10 h-full">
      <div className="bg-[#09303a] p-8 rounded-2xl border border-white/10 h-full hover:border-[#C5A059]/50 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-2xl bg-opacity-80 backdrop-blur-sm flex flex-col">
        <div className="mb-6 p-4 bg-[#04151a] rounded-xl w-fit group-hover:scale-110 transition-transform border border-[#C5A059]/20 shadow-[0_0_15px_rgba(0,0,0,0.2)]">{icon}</div>
        <h3 className="text-2xl font-bold text-[#FDF6E3] mb-3 group-hover:text-[#C5A059] transition-colors font-sans">{title}</h3>
        <p className="text-slate-300 text-base leading-relaxed font-serif line-clamp-3">{desc}</p>
      </div>
    </Link>
  ); 
}