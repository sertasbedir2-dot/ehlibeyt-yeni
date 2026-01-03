import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { RotateCcw, Volume2, VolumeX, ChevronDown, CheckCircle, Sparkles, Search, BookOpen, Calendar } from 'lucide-react';
import { esmaUlHusnaData } from '../data/esmalar';

export default function Zikir() {
  // --- STATE YÖNETİMİ ---
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(100);
  const [label, setLabel] = useState("Yükleniyor...");
  const [arabicText, setArabicText] = useState(""); // Arapça metin için yeni state
  const [isSoundOn, setIsSoundOn] = useState(true);
  
  // Zehra Modu State'leri
  const [zehraMode, setZehraMode] = useState(false);
  const [zehraStage, setZehraStage] = useState(0);
  
  // UI State'leri
  const [showSuccess, setShowSuccess] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Esma Modu State'leri
  const [esmaSearch, setEsmaSearch] = useState("");
  const [selectedEsma, setSelectedEsma] = useState(null);

  // --- 1. VERİTABANI: HAFTALIK ZİKİRLER ---
  const weeklyZikirs = [
    { id: 0, day: "Pazar", text: "Ya Ze'l-Celâli ve'l-İkrâm", arabic: "یا ذَالجَلالِ وَ اْلاِکْرام", target: 100 },
    { id: 1, day: "Pazartesi", text: "Ya Kâziye'l-Hâcât", arabic: "یا قاضیَ الحاجات", target: 100 },
    { id: 2, day: "Salı", text: "Ya Erhame'r-Râhimîn", arabic: "یا أَرْحَمَ الرَّاحِمِین", target: 100 },
    { id: 3, day: "Çarşamba", text: "Ya Hayyu Ya Kayyûm", arabic: "یا حَیُّ یا قَیّومُ", target: 100 },
    { id: 4, day: "Perşembe", text: "Lâ İlâhe İllallâhu'l-Meliku'l-Hakku'l-Mubîn", arabic: "لا إِلهَ إِلَّا اللَّهُ المَلِک الحقّ المُبین", target: 100 },
    { id: 5, day: "Cuma", text: "Allahumme Salli Alâ Muhammedin ve Âl-i Muhammed", arabic: "الّلهُمَّ صَلِّ عَلَی مُحَمَّدٍ وَآلِ مُحَمَّدٍ", target: 100 },
    { id: 6, day: "Cumartesi", text: "Ya Rabbe'l-Âlemîn", arabic: "یا رَبِّ الْعالَمِین", target: 100 }
  ];

  // --- SABİT ZİKİR LİSTESİ ---
  const standardZikirs = [
    { label: "Tesbihat-ı Zehra (Öncelikli)", value: "zehra", target: 34 },
    { label: "Salavat-ı Şerife", value: "salavat", target: 100 },
    { label: "La ilahe illallah", value: "tehvid", target: 100 },
    { label: "Estağfirullah", value: "istigfar", target: 100 },
    { label: "Serbest Mod", value: "free", target: 99999 }
  ];

  // --- ZEHRA MODU ADIMLARI ---
  const zehraSteps = [
    { label: "Allahu Ekber", target: 34 },
    { label: "Elhamdulillah", target: 33 },
    { label: "Subhanallah", target: 33 }
  ];

  // --- 2. AKILLI GÜN ALGILAMA (Smart Detection) ---
  useEffect(() => {
    // Sayfa ilk açıldığında çalışır
    const todayIndex = new Date().getDay(); // 0=Pazar...
    const todaysZikir = weeklyZikirs.find(z => z.id === todayIndex);
    
    if (todaysZikir) {
      setLabel(todaysZikir.text);
      setArabicText(todaysZikir.arabic);
      setTarget(todaysZikir.target);
      setZehraMode(false);
      setSelectedEsma(null);
    }
  }, []);

  // --- MANTIK MOTORU ---
  const playClickSound = () => {
    if (isSoundOn) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  };

  const handleIncrement = () => {
    if (isTransitioning) return;
    if (navigator.vibrate) navigator.vibrate(50);
    playClickSound();
    
    const nextCount = count + 1;
    
    // Serbest Mod
    if (label === "Serbest Mod") {
      setCount(nextCount);
      return;
    }

    if (count >= target) return;

    setCount(nextCount);

    if (nextCount === target) {
      setIsTransitioning(true);
      setTimeout(() => {
        if (zehraMode) {
          if (zehraStage < 2) {
            const nextStage = zehraStage + 1;
            setZehraStage(nextStage);
            setCount(0);
            setLabel(zehraSteps[nextStage].label);
            setTarget(zehraSteps[nextStage].target);
            setIsTransitioning(false);
          } else {
            setShowSuccess(true);
            setIsTransitioning(false);
          }
        } else {
          setShowSuccess(true);
          setIsTransitioning(false);
        }
      }, 500);
    }
  };

  const handleReset = () => {
    setCount(0);
    setShowSuccess(false);
    setIsTransitioning(false);
    if (zehraMode) {
      setZehraStage(0);
      setLabel(zehraSteps[0].label);
      setTarget(zehraSteps[0].target);
    }
  };

  // --- SEÇİM MANTIĞI ---
  const filteredEsmalar = esmaUlHusnaData.filter(esma => 
    esma.transliteration.toLowerCase().includes(esmaSearch.toLowerCase()) ||
    esma.meaning_tr.toLowerCase().includes(esmaSearch.toLowerCase()) ||
    esma.spiritual_benefit.toLowerCase().includes(esmaSearch.toLowerCase())
  );

  const handleSelectionChange = (e) => {
    const value = e.target.value;
    setCount(0);
    setShowSuccess(false);
    setIsTransitioning(false);

    // 1. Haftalık Zikir Kontrolü
    const weekly = weeklyZikirs.find(z => z.text === value); // value text olarak geliyor
    if (weekly) {
        setZehraMode(false);
        setSelectedEsma(null);
        setLabel(weekly.text);
        setArabicText(weekly.arabic);
        setTarget(weekly.target);
        return;
    }

    // 2. Standart Zikir Kontrolü
    const standard = standardZikirs.find(z => z.value === value);
    if (standard) {
      setSelectedEsma(null);
      setArabicText(""); // Standartlarda arapça yoksa boşalt
      if (value === "zehra") {
        setZehraMode(true);
        setZehraStage(0);
        setLabel(zehraSteps[0].label);
        setTarget(zehraSteps[0].target);
      } else {
        setZehraMode(false);
        setLabel(standard.label);
        setTarget(standard.target);
      }
      return;
    }

    // 3. Esma Kontrolü
    if (value.startsWith("esma_")) {
      const id = parseInt(value.split("_")[1]);
      const esma = esmaUlHusnaData.find(e => e.id === id);
      
      if (esma) {
        setZehraMode(false);
        setSelectedEsma(esma);
        setLabel(esma.transliteration);
        setArabicText(esma.arabic);
        setTarget(esma.abjad_value);
      }
    }
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = zehraMode && showSuccess ? 100 : Math.min((count / target) * 100, 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] animate-fade-in relative px-4 py-8">
      <Helmet>
        <title>Tesbihat & Zikir | OnikiKapı</title>
        <meta name="description" content="Günlük özel zikirler, Tesbihat-ı Zehra ve Esma-ül Hüsna." />
      </Helmet>

      {/* --- BİLGİ KARTI --- */}
      <div className="mb-6 bg-gold/10 backdrop-blur-md px-6 py-2 rounded-full border border-gold/20 flex items-center gap-2 animate-fade-in">
         <Calendar size={16} className="text-gold" />
         <p className="text-sm text-sand">
            Bugün: <span className="font-bold">{weeklyZikirs.find(z => z.id === new Date().getDay())?.day}</span> (Özel zikir seçildi)
         </p>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand mb-2">
          Tesbihat
        </h1>
        <p className="text-slate-300 font-serif text-lg">
          Kalbinizi zikirle cilalayın.
        </p>
      </div>

      {showSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-midnight/90 backdrop-blur-md rounded-3xl animate-fade-in">
          <div className="text-center space-y-4 animate-bounce">
            <Sparkles size={60} className="text-gold mx-auto" />
            <h2 className="text-4xl font-bold text-sand font-serif">Allah Kabul Etsin</h2>
            <button onClick={handleReset} className="bg-gold text-midnight px-6 py-2 rounded-full font-bold hover:bg-white transition">
              Yeniden Başla
            </button>
          </div>
        </div>
      )}

      {/* --- ARAMA VE SEÇİM --- */}
      <div className="mb-8 w-full max-w-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gold/50" size={18} />
          <input 
            type="text" 
            placeholder="Esma ara... (Örn: Şifa)" 
            className="w-full bg-midnight/50 border border-gold/20 rounded-xl py-2 pl-10 pr-4 text-sand placeholder-slate-500 focus:outline-none focus:border-gold/50 text-sm transition-all"
            value={esmaSearch}
            onChange={(e) => setEsmaSearch(e.target.value)}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gold">
            <ChevronDown size={20} />
          </div>
          <select 
            onChange={handleSelectionChange}
            // Varsayılan değer olarak label'ı kullanıyoruz (haftalık zikir seçiliyse o görünsün diye)
            value={weeklyZikirs.find(z => z.text === label) ? label : undefined}
            className="w-full appearance-none bg-midnight border-2 border-gold/30 text-gold py-3 px-6 rounded-2xl font-sans font-bold text-lg focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all cursor-pointer"
          >
            <optgroup label="🌟 Günün Özel Zikri">
                {weeklyZikirs.map(z => (
                    <option key={z.id} value={z.text}>
                        {z.day}: {z.text.substring(0, 30)}...
                    </option>
                ))}
            </optgroup>

            <optgroup label="Tesbihatlar">
              {standardZikirs.map((z, i) => (
                <option key={i} value={z.value}>{z.label}</option>
              ))}
            </optgroup>

            <optgroup label="Esma-ül Hüsna">
              {filteredEsmalar.map((esma) => (
                <option key={esma.id} value={`esma_${esma.id}`}>
                  {esma.transliteration} (Hedef: {esma.abjad_value})
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* --- ZİKİRMATİK GÖVDESİ --- */}
      <div className="relative group mb-8">
        <div className="absolute -inset-4 bg-gold/10 rounded-full blur-xl group-hover:bg-gold/20 transition-all duration-500"></div>
        <div className="relative w-80 h-80 bg-[#162e45] rounded-full shadow-2xl border-4 border-gold/10 flex items-center justify-center">
          
          <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 280 280">
            <circle cx="140" cy="140" r={radius} fill="transparent" stroke="#0f172a" strokeWidth="12" strokeDasharray="4 8" />
            <circle cx="140" cy="140" r={radius} fill="transparent" stroke="#FFD700" strokeWidth="12" strokeDasharray="4 8" strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-300 ease-out drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
          </svg>

          <div className="z-10 text-center space-y-2 flex flex-col items-center px-4">
            <p className="text-turquoise-light text-xs font-bold tracking-[0.2em] uppercase">
              {zehraMode ? `Adım ${zehraStage + 1}/3` : "Ruhun Nefesi"}
            </p>
            
            {/* Sayaç */}
            <h1 className="text-7xl font-sans font-bold text-sand tabular-nums drop-shadow-lg leading-none">
              {count}
            </h1>
            
            {label !== "Serbest Mod" && (
              <p className="text-gold/70 text-sm font-bold font-sans">/ {target}</p>
            )}

            {/* Zikir Metni */}
            <div className="mt-2">
                <p className="text-gold font-serif text-lg md:text-xl max-w-[220px] mx-auto leading-tight font-bold">
                {label}
                </p>
                {/* Arapça Metin (Varsa) */}
                {arabicText && (
                    <p className="text-slate-400 font-serif text-xl mt-1 opacity-80" dir="rtl" lang="ar">
                        {arabicText}
                    </p>
                )}
            </div>
          </div>
        </div>
        <button onClick={handleIncrement} className="absolute inset-0 w-full h-full rounded-full cursor-pointer z-20 focus:outline-none active:scale-95 transition-transform duration-100" aria-label="Zikir Çek"></button>
      </div>

      {/* --- ESMA KARTI (Sadece Esma Seçiliyse) --- */}
      {selectedEsma && (
        <div className="w-full max-w-lg bg-midnight/50 border border-gold/20 rounded-2xl p-6 animate-fade-in relative overflow-hidden group hover:border-gold/40 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <BookOpen size={100} className="text-gold" />
          </div>
          
          <div className="flex items-start gap-4 relative z-10">
            <div className="bg-turquoise/20 p-3 rounded-lg text-gold font-serif text-3xl border border-gold/20">
              {selectedEsma.arabic}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-sand">{selectedEsma.transliteration}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedEsma.meaning_tr}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Sparkles size={14} className="text-turquoise-light" />
                <span className="text-xs font-bold text-turquoise-light uppercase tracking-wide">
                  Manevi Sır: {selectedEsma.spiritual_benefit}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- KONTROL BUTONLARI --- */}
      <div className="mt-8 flex gap-6">
        <button onClick={handleReset} className="p-4 rounded-full bg-midnight border border-white/10 text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all">
          <RotateCcw size={24} />
        </button>
        <button onClick={() => setIsSoundOn(!isSoundOn)} className={`p-4 rounded-full border transition-all ${isSoundOn ? 'bg-gold/10 border-gold text-gold' : 'bg-midnight border-white/10 text-slate-400 hover:text-white'}`}>
          {isSoundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

    </div>
  );
}