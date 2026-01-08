import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { RotateCcw, Volume2, VolumeX, Sparkles, Search, Calendar, Moon, Sun, Heart } from 'lucide-react';

// DİKKAT: Gerçek veri dosyasını buradan çekiyoruz
// Bu dosyanın projenizde '../data/esmalar' yolunda olduğundan emin olun.
import { esmaUlHusnaData } from '../data/esmalar';

// --- SABİT VERİLER (NAVİGASYON VE NAMAZ İÇİN) ---
const WEEKLY_ZIKIRS = [
  { id: "w-0", day: "Pazar", text: "Ya Ze'l-Celâli ve'l-İkrâm", arabic: "یا ذَالجَلالِ وَ اْلاِکْرام", target: 100, type: 'weekly' },
  { id: "w-1", day: "Pazartesi", text: "Ya Kâziye'l-Hâcât", arabic: "یا قاضیَ الحاجات", target: 100, type: 'weekly' },
  { id: "w-2", day: "Salı", text: "Ya Erhame'r-Râhimîn", arabic: "یا أَرْحَمَ الرَّاحِمِین", target: 100, type: 'weekly' },
  { id: "w-3", day: "Çarşamba", text: "Ya Hayyu Ya Kayyûm", arabic: "یا حَیُّ یا قَیّومُ", target: 100, type: 'weekly' },
  { id: "w-4", day: "Perşembe", text: "Lâ İlâhe İllallâhu'l-Meliku'l-Hakku'l-Mubîn", arabic: "لا إِلهَ إِلَّا اللَّهُ المَلِک الحقّ المُبین", target: 100, type: 'weekly' },
  { id: "w-5", day: "Cuma", text: "Allahumme Salli Alâ Muhammedin ve Âl-i Muhammed", arabic: "الّلهُمَّ صَلِّ عَلَی مُحَمَّدٍ وَآلِ مُحَمَّدٍ", target: 100, type: 'weekly' },
  { id: "w-6", day: "Cumartesi", text: "Ya Rabbe'l-Âlemîn", arabic: "یا رَبِّ الْعالَمِین", target: 100, type: 'weekly' }
];

const STANDARD_ZIKIRS = [
  { id: "std-zehra", label: "Tesbihat-ı Zehra", target: 34, arabic: "تسبیحات حضرت زهرا", type: 'zehra' },
  { id: "std-salavat", label: "Salavat-ı Şerife", target: 100, arabic: "الّلهُمَّ صَلِّ عَلَی مُحَمَّدٍ وَآلِ مُحَمَّدٍ", type: 'standard' },
  { id: "std-tevhid", label: "La ilahe illallah", target: 100, arabic: "لا إله إلا الله", type: 'standard' },
  { id: "std-istigfar", label: "Estağfirullah", target: 100, arabic: "أَسْتَغْفِرُ اللَّهَ", type: 'standard' },
  { id: "std-free", label: "Serbest Mod", target: 99999, arabic: "", type: 'free' }
];

const ZEHRA_STEPS = [
  { label: "Allahu Ekber", target: 34, arabic: "اللّٰهُ أَكْبَر" },
  { label: "Elhamdulillah", target: 33, arabic: "ٱلْحَمْدُ لِلَّٰهِ" },
  { label: "Subhanallah", target: 33, arabic: "سُبْحَانَ ٱللَّٰهِ" }
];

export default function Zikir() {
  const [activeTab, setActiveTab] = useState('namaz');
  const [activeZikir, setActiveZikir] = useState(() => {
    const todayIndex = typeof window !== 'undefined' ? new Date().getDay() : 0;
    return WEEKLY_ZIKIRS.find(z => z.id === `w-${todayIndex}`) || STANDARD_ZIKIRS[0];
  });
  
  const [progressMap, setProgressMap] = useState({});
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [esmaSearch, setEsmaSearch] = useState("");
  
  // Ses Motoru Ref
  const audioRef = useRef(null);

  useEffect(() => {
    // Ses dosyasını sadece bir kez oluştur
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
      audioRef.current.volume = 0.3;
    }
    return () => {
      if(audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const currentProgress = progressMap[activeZikir.id] || { count: 0, stage: 0, isComplete: false };
  const currentCount = currentProgress.count;
  const currentStage = currentProgress.stage;

  const getCurrentDisplayInfo = () => {
    if (activeZikir.type === 'zehra') {
      const step = ZEHRA_STEPS[currentStage] || ZEHRA_STEPS[0];
      return { label: step.label, arabic: step.arabic, target: step.target };
    }
    return {
      label: activeZikir.transliteration || activeZikir.label || activeZikir.text,
      arabic: activeZikir.arabic,
      target: activeZikir.abjad_value || activeZikir.target || 100
    };
  };

  const displayInfo = getCurrentDisplayInfo();

  const playClickSound = () => {
    if (isSoundOn && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const updateProgress = (id, newProgress) => {
    setProgressMap(prev => ({ ...prev, [id]: newProgress }));
  };

  const handleIncrement = () => {
    if (showSuccess) return;
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
    
    playClickSound();
    
    const nextCount = currentCount + 1;
    const target = displayInfo.target;

    if (activeZikir.type === 'free') {
      updateProgress(activeZikir.id, { count: nextCount, stage: 0, isComplete: false });
      return;
    }

    if (nextCount > target) return;

    if (nextCount === target) {
      if (activeZikir.type === 'zehra') {
        if (currentStage < 2) {
          setTimeout(() => {
            updateProgress(activeZikir.id, { count: 0, stage: currentStage + 1, isComplete: false });
          }, 250);
        } else {
          setShowSuccess(true);
          updateProgress(activeZikir.id, { count: target, stage: currentStage, isComplete: true });
        }
      } else {
        setShowSuccess(true);
        updateProgress(activeZikir.id, { count: nextCount, stage: 0, isComplete: true });
      }
    } else {
      updateProgress(activeZikir.id, { count: nextCount, stage: currentStage, isComplete: false });
    }
  };

  const handleReset = () => {
    setShowSuccess(false);
    updateProgress(activeZikir.id, { count: 0, stage: 0, isComplete: false });
  };

  const handleSelectZikir = (zikir) => {
    setActiveZikir(zikir);
    setShowSuccess(false);
    if(typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- KRİTİK BÖLÜM: GERÇEK VERİYİ FİLTRELEME ---
  const filteredEsmalar = useMemo(() => {
    // Eğer esmaUlHusnaData yüklenemezse boş array döner (Hata önleyici)
    if (!esmaUlHusnaData) return [];
    
    return esmaUlHusnaData.filter(esma =>
      esma.transliteration.toLowerCase().includes(esmaSearch.toLowerCase()) ||
      esma.meaning_tr.toLowerCase().includes(esmaSearch.toLowerCase()) ||
      esma.spiritual_benefit.toLowerCase().includes(esmaSearch.toLowerCase())
    );
  }, [esmaSearch]);

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const safeTarget = displayInfo.target || 1;
  const progressPercent = Math.min((currentCount / safeTarget) * 100, 100);
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="flex flex-col items-center min-h-[85vh] animate-fade-in relative px-4 py-6 max-w-4xl mx-auto bg-[#0f172a] text-slate-200 font-sans">
      <Helmet>
        <title>Tesbihat & Zikir | OnikiKapı</title>
      </Helmet>

      {/* --- BÖLÜM 1: AKTİF ZİKİR KARTI (GÖRSEL SAYAÇ) --- */}
      <div className="relative group mb-6">
        <div className="absolute -inset-4 bg-yellow-500/5 rounded-full blur-xl group-hover:bg-yellow-500/10 transition-all duration-500"></div>
        <div className="relative w-72 h-72 bg-[#162e45] rounded-full shadow-2xl border-4 border-yellow-500/10 flex items-center justify-center overflow-hidden">
            <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 280 280">
                <circle cx="140" cy="140" r={radius} fill="transparent" stroke="#0f172a" strokeWidth="12" strokeDasharray="4 8" />
                <circle cx="140" cy="140" r={radius} fill="transparent" stroke="#FFD700" strokeWidth="12" strokeDasharray="4 8" strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-300 ease-out drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
            </svg>
            <div className="z-10 text-center flex flex-col items-center">
                {activeZikir.type === 'zehra' && (
                     <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2 bg-cyan-900/30 px-2 py-1 rounded">ADIM {currentStage + 1}/3</span>
                )}
                <h1 className="text-7xl font-bold text-[#eecda3] tabular-nums leading-none select-none">{currentCount}</h1>
                {activeZikir.type !== 'free' && (<p className="text-yellow-500/50 text-lg font-bold mt-2 font-mono">/ {displayInfo.target}</p>)}
            </div>
        </div>
        <button onClick={handleIncrement} className="absolute inset-0 w-full h-full rounded-full cursor-pointer z-20 focus:outline-none active:scale-95 transition-transform duration-100 touch-manipulation" aria-label="Zikir Çek"></button>
        
        {showSuccess && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0f172a]/95 backdrop-blur-sm rounded-full animate-fade-in border-4 border-yellow-500">
                <div className="text-center animate-bounce px-4">
                    <Sparkles size={40} className="text-yellow-500 mx-auto mb-2" />
                    <h3 className="text-xl font-bold text-[#eecda3] font-serif">Allah Kabul Etsin</h3>
                    <button onClick={handleReset} className="mt-3 text-sm bg-yellow-500 text-[#0f172a] px-6 py-2 rounded-full font-bold hover:bg-white transition-colors">Tekrar</button>
                </div>
            </div>
        )}
      </div>

      {/* Kontrol Butonları */}
      <div className="flex gap-4 mb-6">
        <button onClick={handleReset} className="p-3 rounded-full bg-[#1e293b] border border-white/10 text-slate-400 hover:text-white hover:border-red-500/50 hover:bg-red-500/10 transition-all"><RotateCcw size={20} /></button>
        <button onClick={() => setIsSoundOn(!isSoundOn)} className={`p-3 rounded-full border transition-all ${isSoundOn ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500' : 'bg-[#1e293b] border-white/10 text-slate-400'}`}>{isSoundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}</button>
      </div>

      {/* --- BÖLÜM 2: SEKMELİ SEÇİM ALANI --- */}
      <div className="w-full min-h-[300px]">
          {/* TAB MENÜSÜ (Eksik olan kısım tamamlandı) */}
          <div className="flex p-1 bg-[#1e293b] rounded-xl mb-4 border border-white/5">
              {['namaz', 'gunluk', 'esma'].map((tab) => (
                  <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all capitalize ${
                          activeTab === tab 
                          ? 'bg-yellow-500 text-[#0f172a] shadow-lg' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                  >
                      {tab === 'gunluk' ? 'Günlük' : tab}
                  </button>
              ))}
          </div>

          {activeTab === 'namaz' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in">
                  {STANDARD_ZIKIRS.map((zikir) => (
                      <button key={zikir.id} onClick={() => handleSelectZikir(zikir)} className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between group ${activeZikir.id === zikir.id ? 'bg-yellow-500/10 border-yellow-500 shadow-[0_0_15px_rgba(197,160,89,0.2)]' : 'bg-[#1e293b] border-white/5 hover:border-yellow-500/30 hover:bg-white/5'}`}>
                          <div><h3 className={`font-bold ${activeZikir.id === zikir.id ? 'text-yellow-500' : 'text-[#eecda3] group-hover:text-yellow-500'}`}>{zikir.label}</h3><p className="text-xs text-slate-500 mt-1">{zikir.arabic}</p></div>
                          {progressMap[zikir.id]?.count > 0 && (<span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-md font-mono font-bold">{progressMap[zikir.id].count}</span>)}
                      </button>
                  ))}
              </div>
          )}

          {activeTab === 'gunluk' && (
              <div className="space-y-3 animate-fade-in">
                  <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-xl flex items-center gap-3 mb-4">
                      <Calendar className="text-blue-400" size={20} />
                      <p className="text-sm text-blue-200">Bugün <strong>{WEEKLY_ZIKIRS.find(z => z.id === `w-${new Date().getDay()}`)?.day}</strong>. Özel zikriniz listenin en başında.</p>
                  </div>
                  {WEEKLY_ZIKIRS.map((zikir) => {
                      const isToday = zikir.id === `w-${new Date().getDay()}`;
                      return (
                        <button key={zikir.id} onClick={() => handleSelectZikir(zikir)} className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 group ${activeZikir.id === zikir.id ? 'bg-yellow-500/10 border-yellow-500' : isToday ? 'bg-blue-900/10 border-blue-500/30' : 'bg-[#1e293b] border-white/5 hover:border-yellow-500/30 hover:bg-white/5'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${isToday ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>{zikir.day.substring(0,3)}</div>
                            <div className="flex-1 min-w-0"><h3 className={`font-bold truncate ${activeZikir.id === zikir.id ? 'text-yellow-500' : 'text-[#eecda3]'}`}>{zikir.text}</h3><p className="text-xs text-slate-500 mt-1 font-serif opacity-70 truncate">{zikir.arabic}</p></div>
                            {progressMap[zikir.id]?.count > 0 && (<span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-md font-mono font-bold shrink-0">{progressMap[zikir.id].count}</span>)}
                        </button>
                      );
                  })}
              </div>
          )}

          {activeTab === 'esma' && (
              <div className="animate-fade-in">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-3 text-yellow-500/50" size={18} />
                    <input type="text" placeholder="Esma ara..." className="w-full bg-[#1e293b] border border-yellow-500/20 rounded-xl py-2 pl-10 pr-4 text-[#eecda3] placeholder-slate-500 focus:outline-none focus:border-yellow-500/50 text-sm focus:ring-1 focus:ring-yellow-500" value={esmaSearch} onChange={(e) => setEsmaSearch(e.target.value)}/>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                      {/* DİKKAT: Burada artık gerçek filteredEsmalar dönüyor */}
                      {filteredEsmalar.map((esma) => (
                          <button key={esma.id} onClick={() => handleSelectZikir({ ...esma, type: 'esma' })} className={`p-3 rounded-lg border text-left transition-all relative overflow-hidden flex flex-col h-full ${activeZikir.id === esma.id ? 'bg-yellow-500 text-[#0f172a] border-yellow-500' : 'bg-[#1e293b] border-white/5 hover:border-yellow-500/30 hover:bg-white/5'}`}>
                              <div className="flex justify-between items-start mb-1">
                                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${activeZikir.id === esma.id ? 'bg-[#1e293b]/20 text-[#1e293b]' : 'bg-yellow-500/20 text-yellow-500'}`}>#{esma.id}</span>
                                  {progressMap[esma.id]?.count > 0 && (<span className="text-[10px] font-mono font-bold bg-green-500/20 text-green-400 px-1 rounded">{progressMap[esma.id].count}</span>)}
                              </div>
                              <h4 className={`font-bold truncate text-sm ${activeZikir.id === esma.id ? 'text-[#0f172a]' : 'text-[#eecda3]'}`}>{esma.transliteration}</h4>
                              <p className={`text-xs truncate font-serif mt-auto pt-1 ${activeZikir.id === esma.id ? 'text-[#0f172a]/70' : 'text-slate-500'}`}>{esma.arabic}</p>
                          </button>
                      ))}
                      {filteredEsmalar.length === 0 && (<div className="col-span-full text-center py-8 text-slate-500 text-sm">Aradığınız esma bulunamadı.</div>)}
                  </div>
              </div>
          )}
      </div>
    </div>
  );
}