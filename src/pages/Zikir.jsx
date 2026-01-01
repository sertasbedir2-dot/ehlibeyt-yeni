import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { RotateCcw, Volume2, VolumeX, ChevronDown, CheckCircle, Sparkles } from 'lucide-react';

export default function Zikir() {
  // --- STATE YÖNETİMİ ---
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(100);
  const [label, setLabel] = useState("Salavat-ı Şerife");
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [zehraMode, setZehraMode] = useState(false);
  const [zehraStage, setZehraStage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false); // Hızlı tıklamaları engellemek için

  // --- ZEHRA MODU VERİLERİ ---
  const zehraSteps = [
    { label: "Allahu Ekber", target: 34 },
    { label: "Elhamdulillah", target: 33 },
    { label: "Subhanallah", target: 33 }
  ];

  // --- ZİKİR LİSTESİ ---
  const zikirList = [
    { label: "Seçiniz...", value: "default", target: 100 },
    { label: "Tesbihat-ı Zehra (Özel Mod)", value: "zehra", target: 34 },
    { label: "Salavat-ı Şerife", value: "salavat", target: 100 },
    { label: "La ilahe illallah", value: "tehvid", target: 100 },
    { label: "Estağfirullah", value: "istigfar", target: 100 },
    { label: "Ya Allah", value: "esma", target: 99 },
    { label: "Serbest Mod", value: "free", target: 99999 } // Hedef çok yüksek
  ];

  // --- MANTIK MOTORU (CRITICAL BUG FIX APPLIED) ---
  const handleIncrement = () => {
    // Geçiş animasyonu sırasındaysa tıklamayı engelle
    if (isTransitioning) return;

    // Haptics (Titreşim)
    if (navigator.vibrate) navigator.vibrate(50);
    
    // Ses Efekti
    if (isSoundOn) {
      // const audio = new Audio('/assets/click.mp3'); audio.play().catch(() => {});
    }

    const nextCount = count + 1;
    
    // Serbest Mod mantığı (Hedef sınırı yok)
    if (label === "Serbest Mod") {
      setCount(nextCount);
      return;
    }

    // Hedefi aşmayı engelle
    if (count >= target) return;

    // ÖNCE SAYIYI GÜNCELLE (UI'da görünsün)
    setCount(nextCount);

    // HEDEF KONTROLÜ
    if (nextCount === target) {
      setIsTransitioning(true); // Tıklamaları kilitle

      // Kullanıcının hedef sayıyı (örn: 34) görmesi için kısa bekleme
      setTimeout(() => {
        if (zehraMode) {
          if (zehraStage < 2) {
            // Sonraki aşamaya geç
            const nextStage = zehraStage + 1;
            setZehraStage(nextStage);
            setCount(0);
            setLabel(zehraSteps[nextStage].label);
            setTarget(zehraSteps[nextStage].target);
            setIsTransitioning(false);
          } else {
            // Zehra modu bitti
            setShowSuccess(true);
            setIsTransitioning(false);
          }
        } else {
          // Normal mod hedef tamamlandı
          setShowSuccess(true);
          setIsTransitioning(false);
        }
      }, 500); // 500ms gecikme (Görsel algı için)
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

  const handleZikirChange = (e) => {
    const selectedValue = e.target.value;
    const selectedZikir = zikirList.find(z => z.value === selectedValue);

    setCount(0);
    setShowSuccess(false);
    setIsTransitioning(false);

    if (selectedValue === "zehra") {
      setZehraMode(true);
      setZehraStage(0);
      setLabel(zehraSteps[0].label);
      setTarget(zehraSteps[0].target);
    } else {
      setZehraMode(false);
      setLabel(selectedZikir.label);
      setTarget(selectedZikir.target);
    }
  };

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  // Progress bar görsel düzeltmesi
  const progress = zehraMode && showSuccess ? 100 : Math.min((count / target) * 100, 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] animate-fade-in relative px-4 py-8">
      <Helmet>
        {/* 3. CONTENT CORRECTION: Title Updated */}
        <title>Tesbihat | OnikiKapı</title>
        <meta name="description" content="Akıllı tesbihat modülü ile manevi odağınızı koruyun." />
      </Helmet>

      {/* 3. CONTENT CORRECTION: Header Updated */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand mb-2">
          Tesbihat
        </h1>
        <p className="text-slate-300 font-serif text-lg">
          Kalbinizi zikirle cilalayın.
        </p>
      </div>

      {/* --- BAŞARILI BİTİŞ OVERLAY --- */}
      {showSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-midnight/90 backdrop-blur-md rounded-3xl animate-fade-in">
          <div className="text-center space-y-4 animate-bounce">
            <Sparkles size={60} className="text-gold mx-auto" />
            <h2 className="text-4xl font-bold text-sand font-serif">Allah Kabul Etsin</h2>
            <button 
              onClick={handleReset}
              className="bg-gold text-midnight px-6 py-2 rounded-full font-bold hover:bg-white transition"
            >
              Yeniden Başla
            </button>
          </div>
        </div>
      )}

      {/* --- DROPDOWN --- */}
      <div className="mb-10 w-full max-w-xs relative">
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gold">
          <ChevronDown size={20} />
        </div>
        <select 
          onChange={handleZikirChange}
          className="w-full appearance-none bg-midnight border-2 border-gold/30 text-gold py-3 px-6 rounded-2xl font-sans font-bold text-lg focus:outline-none focus:border-gold focus:shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all cursor-pointer"
        >
          {zikirList.map((z, i) => (
            <option key={i} value={z.value} className="bg-midnight text-sand py-2">
              {z.label}
            </option>
          ))}
        </select>
      </div>

      {/* --- TESBİHAT GÖVDESİ --- */}
      <div className="relative group">
        
        <div className="absolute -inset-4 bg-gold/10 rounded-full blur-xl group-hover:bg-gold/20 transition-all duration-500"></div>

        <div className="relative w-80 h-80 bg-[#162e45] rounded-full shadow-2xl border-4 border-gold/10 flex items-center justify-center">
          
          {/* Progress Bar */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 280 280">
            <circle cx="140" cy="140" r={radius} fill="transparent" stroke="#0f172a" strokeWidth="12" strokeDasharray="4 8" />
            <circle cx="140" cy="140" r={radius} fill="transparent" stroke="#FFD700" strokeWidth="12" strokeDasharray="4 8" strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-300 ease-out drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
          </svg>

          {/* Orta Bilgi Alanı */}
          <div className="z-10 text-center space-y-2 flex flex-col items-center">
            
            <p className="text-turquoise-light text-xs font-bold tracking-[0.2em] uppercase">
              {zehraMode ? `Adım ${zehraStage + 1}/3` : "Ruhun Nefesi"}
            </p>
            
            <h1 className="text-7xl font-sans font-bold text-sand tabular-nums drop-shadow-lg leading-none">
              {count}
            </h1>

            {/* 2. UI UPDATE: TARGET DISPLAY */}
            {label !== "Serbest Mod" && (
              <p className="text-gold/70 text-sm font-bold font-sans">
                / {target}
              </p>
            )}
            
            <p className="text-gold font-serif text-xl max-w-[200px] mx-auto leading-tight mt-2">
              {label}
            </p>
          </div>

        </div>

        <button 
          onClick={handleIncrement}
          className="absolute inset-0 w-full h-full rounded-full cursor-pointer z-20 focus:outline-none active:scale-95 transition-transform duration-100"
          aria-label="Tesbihat Çek"
        ></button>
      </div>

      {/* --- KONTROL BUTONLARI --- */}
      <div className="mt-12 flex gap-6">
        <button 
          onClick={handleReset}
          className="p-4 rounded-full bg-midnight border border-white/10 text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all"
          title="Sıfırla"
        >
          <RotateCcw size={24} />
        </button>
        
        <button 
          onClick={() => setIsSoundOn(!isSoundOn)}
          className={`p-4 rounded-full border transition-all ${isSoundOn ? 'bg-gold/10 border-gold text-gold' : 'bg-midnight border-white/10 text-slate-400 hover:text-white'}`}
          title="Ses Aç/Kapat"
        >
          {isSoundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

    </div>
  );
}