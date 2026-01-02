import PrayerTimesWidget from '../components/PrayerTimesWidget';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PenTool, Scale, Flower, BookOpen, Sparkles, Search, Heart, HelpCircle, Sun, Gift, RefreshCw, Volume2, Share2, Flame, Bell, Globe } from 'lucide-react';
import { wisdomData } from '../data/wisdomData';
import html2canvas from 'html2canvas'; // Resim oluşturmak için gerekli paket

export default function Home() {
  const [heroSearch, setHeroSearch] = useState("");
  const navigate = useNavigate();
  
  // --- YENİ EKLENEN STATE'LER ---
  const [streak, setStreak] = useState(0); // Zincir sayacı
  const [showNotificationModal, setShowNotificationModal] = useState(false); // Bildirim izni penceresi
  const storyRef = useRef(null); // Resim yapılacak alanın referansı

  const handleSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      alert("Detaylı arama sonuçları için üst menüdeki büyüteci kullanabilirsiniz.");
    }
  };

  // --- 1. GÜNÜN HİKMETİ MANTIĞI ---
  const dailyWisdom = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const dataIndex = (dayOfYear - 1) % wisdomData.length;
    return wisdomData[dataIndex] || wisdomData[0];
  }, []);

  // --- 2. ZİNCİR (STREAK) VE BİLDİRİM KONTROLÜ ---
  useEffect(() => {
    // Zincir Mantığı
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');
    let currentStreak = parseInt(localStorage.getItem('streak') || '0');

    if (lastVisit !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      // Eğer son ziyaret dün ise zinciri artır, değilse sıfırla (1 yap)
      if (lastVisit === yesterday.toDateString()) {
        currentStreak += 1; 
      } else {
        currentStreak = 1; 
      }
      
      localStorage.setItem('lastVisit', today);
      localStorage.setItem('streak', currentStreak.toString());
    }
    setStreak(currentStreak);

    // Bildirim İzni Kontrolü (Daha önce sorulmadıysa 3 sn sonra sor)
    const notificationAsked = localStorage.getItem('notificationAsked');
    if (!notificationAsked && 'Notification' in window) {
      const timer = setTimeout(() => setShowNotificationModal(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  // --- 3. SESLİ OKUMA (TTS) FONKSİYONU ---
  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Varsa eski konuşmayı durdur
      const utterance = new SpeechSynthesisUtterance(`${dailyWisdom.quote}. Sözün sahibi: ${dailyWisdom.source}`);
      utterance.lang = 'tr-TR'; 
      utterance.rate = 0.9; // Tane tane okuması için hız ayarı
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Tarayıcınız sesli okumayı desteklemiyor.");
    }
  };

  // --- 4. HİKAYE PAYLAŞIMI (RESİM OLUŞTURMA) ---
  const handleShareStory = async () => {
    if (storyRef.current) {
      try {
        // Gizli duran storyRef alanını resme çevir
        const canvas = await html2canvas(storyRef.current, {
          scale: 2, // Yüksek kalite için scale artırıldı
          backgroundColor: null, // Gradienti korumak için null
          useCORS: true // Dış kaynaklı görseller (QR) için gerekli
        });
        
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `OnikiKapi_Gunluk_Hikmet_${new Date().toLocaleDateString()}.png`;
        link.click();
      } catch (err) {
        console.error("Resim oluşturma hatası:", err);
        alert("Resim oluşturulurken bir hata oluştu.");
      }
    }
  };

  // --- BİLDİRİM İZNİ İSTEME ---
  const requestNotificationPermission = () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        alert("Teşekkürler! Sabah virdiniz her gün 09:00'da gönderilecektir.");
      }
      localStorage.setItem('notificationAsked', 'true');
      setShowNotificationModal(false);
    });
  };

  return (
    <div className="space-y-16 animate-fade-in relative">
      
      {/* --- BİLDİRİM MODALI (POP-UP) --- */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/80 z-[300] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-turquoise-dark border border-gold rounded-2xl p-6 max-w-sm text-center shadow-2xl relative animate-fade-in">
            <button 
              onClick={() => {setShowNotificationModal(false); localStorage.setItem('notificationAsked', 'true');}} 
              className="absolute top-2 right-2 text-slate-400 hover:text-white"
            >
              <RefreshCw className="rotate-45" size={20}/>
            </button>
            <div className="mx-auto w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-4">
              <Bell className="text-gold" size={24} />
            </div>
            <h3 className="text-xl font-bold text-sand mb-2">Sabah Virdi</h3>
            <p className="text-slate-300 text-sm mb-6">Her sabah 09:00'da günün hikmetini cebinize gönderelim mi?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => {setShowNotificationModal(false); localStorage.setItem('notificationAsked', 'true');}} 
                className="flex-1 py-2 rounded-lg border border-slate-600 text-slate-400 text-sm font-bold hover:bg-slate-800"
              >
                Daha Sonra
              </button>
              <button 
                onClick={requestNotificationPermission} 
                className="flex-1 py-2 rounded-lg bg-gold text-turquoise-dark text-sm font-bold hover:bg-white transition-colors"
              >
                Evet, İsterim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- TASARIM: VİRAL PAYLAŞIM KARTI (GİZLİ ALAN) --- */}
      <div className="absolute top-0 left-[-9999px]">
        <div ref={storyRef} className="w-[1080px] h-[1920px] flex flex-col justify-between items-center text-center relative overflow-hidden bg-gradient-to-br from-[#0F4C5C] via-[#09303a] to-[#04151a]">
           
           {/* Arka Plan Deseni (CSS ile) */}
           <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 50% 50%, #E5C17C 1px, transparent 1px)", backgroundSize: "40px 40px"}}></div>
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5"></div>

           {/* --- ÜST KISIM --- */}
           <div className="z-10 mt-24 w-full px-12">
             <div className="flex flex-col items-center">
               <div className="p-5 border-2 border-[#E5C17C]/30 rounded-full mb-6 bg-[#0F4C5C]/50 backdrop-blur-md">
                 <BookOpen size={64} className="text-[#E5C17C]" />
               </div>
               <h3 className="text-[#E5C17C] text-3xl font-sans tracking-[0.3em] uppercase opacity-90">Günün Hikmeti</h3>
               <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E5C17C] to-transparent mt-4"></div>
             </div>
           </div>

           {/* --- ORTA KISIM (SÖZ) --- */}
           <div className="z-10 flex-grow flex flex-col justify-center px-16 relative">
             {/* Tırnak İşaretleri (Dekoratif) */}
             <span className="absolute top-20 left-4 text-[#E5C17C] opacity-20 text-[200px] font-serif leading-none">“</span>
             
             <h1 className="text-6xl font-serif text-[#FDF6E3] leading-snug italic mb-10 drop-shadow-2xl">
               {dailyWisdom.quote}
             </h1>
             
             <div className="flex items-center justify-center gap-4">
               <div className="h-[2px] w-12 bg-[#E5C17C]"></div>
               <p className="text-4xl text-[#E5C17C] font-sans font-bold tracking-wider uppercase">
                 {dailyWisdom.source}
               </p>
               <div className="h-[2px] w-12 bg-[#E5C17C]"></div>
             </div>
           </div>

           {/* --- ALT KISIM (BRANDING & CTA) --- */}
           <div className="z-10 mb-20 w-full px-12 flex flex-col items-center gap-8">
             
             {/* CTA Button Görünümlü Alan */}
             <div className="bg-[#E5C17C] text-[#09303a] px-10 py-5 rounded-full font-bold text-3xl shadow-xl flex items-center gap-4 border-4 border-[#09303a]/20">
               <Globe size={32} strokeWidth={3} />
               <span>Maneviyatı Cebine Taşı ➔ www.onikikapi.com</span>
             </div>

             {/* QR Kod (Statik API) */}
             <div className="absolute bottom-24 right-12 bg-white p-2 rounded-xl shadow-2xl">
                {/* Bu URL, sitenizin QR kodunu oluşturur */}
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://onikikapi.vercel.app&color=09303a`} 
                  alt="QR Kod" 
                  className="w-32 h-32"
                  crossOrigin="anonymous" 
                />
             </div>

             {/* Marka & Footer */}
             <div className="mt-4">
                <h1 className="text-[5rem] font-bold text-[#E5C17C] leading-none tracking-tight drop-shadow-lg font-sans">OnikiKapı</h1>
                <p className="text-3xl text-slate-300 font-serif tracking-widest mt-2">İlim ve Hikmet Web Uygulaması</p>
             </div>

           </div>
        </div>
      </div>

      {/* --- HERO (GİRİŞ) BÖLÜMÜ --- */}
      <div className="relative py-20 px-6 rounded-3xl overflow-hidden text-center border border-gold/20 shadow-2xl group min-h-[600px] flex flex-col justify-center">
        
        {/* Background and Contrast */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000&auto=format&fit=crop')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-turquoise-dark mix-blend-multiply"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center">
          
          {/* --- PRAYER TIMES WIDGET --- */}
          <div className="mb-4 animate-fade-in w-full max-w-xs mx-auto transform hover:scale-105 transition-transform duration-300 z-20">
             <PrayerTimesWidget />
          </div>

          {/* Logo & Icon */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center mb-2">
            <div className="absolute inset-0 bg-gold/40 blur-2xl rounded-full animate-pulse-slow"></div>
            <Sparkles size={50} className="text-gold absolute opacity-60 animate-spin-slow" />
            <BookOpen size={40} className="text-gold relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand drop-shadow-sm leading-tight">
            OnikiKapı
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-serif leading-relaxed max-w-2xl">
            "İlim bir noktadır, onu cahiller çoğaltmıştır."
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl relative mt-4 group/search">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Bir kavram, hadis veya soru arayın... (Örn: Adalet)" 
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-sand placeholder-slate-300 rounded-full py-4 pl-8 pr-16 text-lg focus:outline-none focus:bg-white/20 focus:border-gold/50 transition-all shadow-lg"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
              />
              <button type="submit" className="absolute right-2 p-2 bg-gold/90 hover:bg-gold text-turquoise-dark rounded-full transition-colors shadow-md">
                <Search size={24} />
              </button>
            </div>
          </form>

          {/* Mood Selector */}
          <div className="w-full max-w-3xl mt-6">
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

      {/* --- CARDS --- */}
      <div className="grid md:grid-cols-3 gap-8 relative px-4">
        <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none">
           <Flower size={300} className="text-turquoise-light rotate-12" />
        </div>

        <FeatureCard 
          icon={<Flower size={32} className="text-rose-300" />}
          title="Manevi Reçeteler ve Muhabbet"
          desc="Ruhsal dinginlik ve ilahi aşk için Ehlibeyt kaynaklı manevi şifa kapısı. Kalbinizi ferahlatacak dualar ve zikirler burada."
          link="/manevi-receteler"
        />
        <FeatureCard 
          icon={<PenTool size={32} className="text-gold" />}
          title="İlim ve Hikmet Kütüphanesi"
          desc="'Oku' emrinin izinde, kadim ve sahih kaynaklara açılan ilim kapısı. Binlerce yıllık mirasın dijital raflardaki yansıması."
          link="/library"
        />
        <FeatureCard 
          icon={<Scale size={32} className="text-turquoise-light" />}
          title="Adalet ve Hakikat Arayışı"
          desc="Evrensel adalet ilkesi ve hakikat üzerine Soru/Cevap kapısı. Aklınıza takılan sorulara usuli bakış açısıyla cevaplar."
          link="/soru-cevap"
        />
      </div>

      {/* --- WISDOM OF THE DAY (YENİLENMİŞ VERSİYON) --- */}
      <div className="w-full max-w-4xl mx-auto my-8 px-4">
        <div className="relative bg-gradient-to-r from-[#0f172a] to-[#1e293b] border border-[#C5A059]/30 rounded-2xl p-8 text-center shadow-[0_0_25px_rgba(197,160,89,0.15)] group hover:border-[#C5A059]/50 transition-all duration-500">
          
          {/* ZİNCİR (STREAK) ROZETİ */}
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/40 border border-[#C5A059]/30 px-3 py-1 rounded-full text-[#C5A059] text-xs font-bold shadow-lg z-10" title="Aralıksız ziyaret serisi">
            <Flame size={14} className={`${streak > 0 ? 'fill-[#C5A059] animate-pulse' : 'text-slate-500'}`} />
            <span>{streak} Günlük Zincir</span>
          </div>

          {/* Decorative Icon */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#0B1120] border border-[#C5A059] p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>

          {/* Category Label */}
          <span className="inline-block mt-4 mb-4 text-xs font-bold text-[#C5A059] tracking-widest uppercase opacity-70 border-b border-[#C5A059]/30 pb-1">
            Günün Hikmeti • {dailyWisdom.category}
          </span>

          {/* Quote */}
          <h2 className="text-xl md:text-3xl font-serif text-slate-200 leading-relaxed italic mb-6">
            "{dailyWisdom.quote}"
          </h2>

          {/* Source */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-8 bg-[#C5A059]/50"></div>
            <p className="text-[#C5A059] font-bold font-sans text-sm md:text-base">
              {dailyWisdom.source}
            </p>
            <div className="h-px w-8 bg-[#C5A059]/50"></div>
          </div>

          {/* --- ETKİLEŞİM BUTONLARI (SESLENDİRME VE PAYLAŞIM) --- */}
          <div className="flex justify-center gap-4 border-t border-white/5 pt-6">
            
            {/* Sesli Okuma Butonu */}
            <button 
              onClick={handleSpeak}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#C5A059]/20 text-slate-300 hover:text-[#C5A059] transition-colors text-sm font-medium"
              title="Sesli Dinle"
            >
              <Volume2 size={18} />
              <span className="hidden sm:inline">Dinle</span>
            </button>

            {/* Hikayende Paylaş Butonu */}
            <button 
              onClick={handleShareStory}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C5A059] hover:bg-[#b08d48] text-slate-900 transition-colors text-sm font-bold shadow-lg group-hover:scale-105 transform duration-300"
              title="Instagram Hikaye Formatında İndir"
            >
              <Share2 size={18} />
              <span>Hikayende Paylaş</span>
            </button>

          </div>

        </div>
      </div>

      {/* --- INTERACTIVE DAILY DESTINY (GÜNÜN NASİBİ) --- */}
      <GununNasibi />

    </div>
  );
}

// --- GÜNÜN NASİBİ COMPONENT ---
function GununNasibi() {
  const [nasip, setNasip] = useState(null);
  const [loading, setLoading] = useState(false);

  // Destiny Pool
  const nasipler = [
    { text: "İnsanlar uykudadır, öldükleri zaman uyanırlar.", source: "Hz. Ali (a.s)" },
    { text: "Hiçbir süs, edep kadar güzel değildir.", source: "Hz. Ali (a.s)" },
    { text: "İlim bir hazinedir, anahtarı ise sorudur.", source: "Hz. Muhammed (s.a.a)" },
    { text: "Dua müminin silahı, dinin direği ve göklerin nurudur.", source: "Hz. Muhammed (s.a.a)" },
    { text: "Haksızlık karşısında susan dilsiz şeytandır.", source: "Hz. Muhammed (s.a.a)" },
    { text: "Komşusu açken tok yatan bizden değildir.", source: "Hz. Muhammed (s.a.a)" },
    { text: "Mazlumun zalimden öcünü alacağı gün, zalimin mazluma zulmettiği günden daha çetin olacaktır.", source: "Hz. Ali (a.s)" },
    { text: "Senin hakkında zannını güzel yapan kimsenin zannını, o işi yaparak gerçekleştir.", source: "Hz. Ali (a.s)" },
    { text: "Dünya, müminin zindanı ve kafirin cennetidir.", source: "Hadis-i Şerif" },
    { text: "En hayırlınız, ahlakı en güzel olanınızdır.", source: "Hz. Muhammed (s.a.a)" }
  ];

  const nasipCek = () => {
    setLoading(true);
    setNasip(null);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * nasipler.length);
      setNasip(nasipler[randomIndex]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="bg-turquoise-dark p-10 rounded-3xl border border-gold/20 relative overflow-hidden shadow-xl mx-4 transition-all duration-500 hover:shadow-gold/10">
      
      {/* Decorative Background */}
      <div className="absolute -bottom-10 -left-10 p-4 opacity-5 rotate-12 pointer-events-none">
         <Gift size={200} className="text-gold" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
        
        <div className="flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-sm">
          <Sparkles size={16} /> Günün Nasibi
        </div>

        {nasip ? (
          <div className="space-y-6 animate-fade-in">
              <blockquote className="text-2xl md:text-4xl font-serif text-sand italic leading-relaxed drop-shadow-md">
               "{nasip.text}"
             </blockquote>
            <p className="text-turquoise-light font-bold text-lg">— {nasip.source}</p>
            
            <button 
              onClick={nasipCek}
              className="mt-4 flex items-center gap-2 mx-auto text-sm text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw size={14} /> Başka bir nasip çek
            </button>
          </div>
        ) : (
          <div className="py-8 space-y-4">
              <h3 className="text-2xl font-serif text-slate-200">
               {loading ? "Kalbinize doğan nasip aranıyor..." : "Bugün sizin için ayrılan manevi rızkı görmek ister misiniz?"}
              </h3>
              {!loading && (
                <button 
                 onClick={nasipCek}
                 className="bg-gold text-turquoise-dark px-8 py-3 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
                >
                  <Gift size={20} /> Niyet Et ve Nasibini Gör
                </button>
              )}
          </div>
        )}

      </div>
    </div>
  );
}

// --- OTHER COMPONENTS ---

function MoodChip({ label, icon, link, color }) {
  return (
    <Link 
      to={link} 
      className={`flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sand text-sm font-medium transition-all duration-300 ${color}`}
    >
      {icon} {label}
    </Link>
  );
}

function FeatureCard({ icon, title, desc, link }) {
  return (
    <Link to={link} className="block group relative z-10 h-full">
      <div className="bg-turquoise p-8 rounded-2xl border border-white/10 h-full hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-2xl bg-opacity-80 backdrop-blur-sm flex flex-col">
        <div className="mb-6 p-4 bg-turquoise-dark rounded-xl w-fit group-hover:scale-110 transition-transform border border-gold/20 group-hover:border-gold/50 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-sand mb-3 group-hover:text-gold transition-colors font-sans">{title}</h3>
        <p className="text-slate-200 text-base leading-relaxed font-serif line-clamp-3">
          {desc}
        </p>
      </div>
    </Link>
  );
}