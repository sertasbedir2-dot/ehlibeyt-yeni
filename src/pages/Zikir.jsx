import React, { useState, useEffect } from 'react';
import { Heart, RotateCcw, Volume2, VolumeX, Sparkles, BookOpen } from 'lucide-react';

// Ses Efekti Oluşturucu (Dosyasız Çalışır)
const playSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'click') {
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'finish') {
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch (e) {
    console.error("Ses hatası:", e);
  }
};

const Zikir = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(34);
  const [selectedZikir, setSelectedZikir] = useState('Allahu Ekber');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [esma, setEsma] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const zikirOptions = [
    { label: "Allahu Ekber", target: 34 },
    { label: "Elhamdulillah", target: 33 },
    { label: "Subhanallah", target: 33 },
    { label: "La ilahe illallah", target: 100 },
    { label: "Salavat-ı Şerife", target: 100 },
    { label: "Estağfirullah", target: 100 },
    { label: "Ya Fettah", target: 489 },
    { label: "Ya Vedud", target: 400 },
  ];

  const esmaList = [
    { name: "Er-Rahman", meaning: "Dünyada bütün mahlukata merhamet eden." },
    { name: "El-Melik", meaning: "Mülkün, kâinatın tek sahibi." },
    { name: "El-Kuddüs", meaning: "Her türlü eksiklikten münezzeh." },
    { name: "Es-Selam", meaning: "Kullarını selamete çıkaran." },
    { name: "El-Mümin", meaning: "Gönüllerde iman ışığı yakan." },
    { name: "El-Müheymin", meaning: "Evrenin bütün işlerini düzenleyen." },
    { name: "El-Aziz", meaning: "İzzet sahibi, her şeye galip gelen." },
    { name: "El-Fettah", meaning: "Her türlü müşkülleri açan ve kolaylaştıran." },
    { name: "El-Latif", meaning: "Lütuf ve ihsan sahibi olan." },
    { name: "El-Habir", meaning: "Her şeyden haberdar olan." },
  ];

  const handleIncrement = () => {
    if (count >= target) return;

    setCount(prev => prev + 1);
    
    // Ses
    if (soundEnabled) playSound('click');
    
    // Titreşim (Mobil için)
    if (navigator.vibrate) navigator.vibrate(10);

    // Bitiş Kontrolü
    if (count + 1 === target) {
      if (soundEnabled) playSound('finish');
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }
  };

  const handleReset = () => {
    if (window.confirm('Sayacı sıfırlamak istiyor musunuz?')) {
      setCount(0);
    }
  };

  const handleZikirChange = (e) => {
    const selected = zikirOptions.find(z => z.label === e.target.value);
    setSelectedZikir(selected.label);
    setTarget(selected.target);
    setCount(0);
  };

  const drawEsma = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const randomEsma = esmaList[Math.floor(Math.random() * esmaList.length)];
      setEsma(randomEsma);
      setIsFlipped(true);
      if (soundEnabled) playSound('finish');
    }, 200);
  };

  // İlerleme Yüzdesi
  const progress = (count / target) * 100;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 pb-32">
      
      {/* Başlık */}
      <div className="text-center mb-10 animate-fade-in">
        <h1 className="text-4xl font-bold text-[#C5A059] font-serif mb-2">Dijital Tesbih</h1>
        <p className="text-slate-400">Kalpler ancak Allah'ı anmakla huzur bulur.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* SOL: ZİKİRMATİK */}
        <div className="bg-slate-900/50 border border-[#C5A059]/30 rounded-3xl p-8 relative shadow-2xl backdrop-blur-sm">
          
          {/* Üst Bar: Seçim ve Ses */}
          <div className="flex justify-between items-center mb-8">
            <select 
              value={selectedZikir}
              onChange={handleZikirChange}
              className="bg-slate-950 border border-slate-700 text-[#C5A059] rounded-lg px-4 py-2 outline-none focus:border-[#C5A059] transition-colors"
            >
              {zikirOptions.map(z => (
                <option key={z.label} value={z.label}>{z.label} ({z.target})</option>
              ))}
            </select>
            
            <button 
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-[#C5A059] transition-colors"
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>

          {/* Orta: Sayaç */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-3xl font-bold text-white tracking-wide">{selectedZikir}</h2>
            
            {/* Sayaç Dairesi */}
            <div className="relative group cursor-pointer" onClick={handleIncrement}>
              {/* İlerleme Çemberi (SVG) */}
              <svg className="w-64 h-64 transform -rotate-90">
                <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                <circle 
                  cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  className={`text-[#C5A059] transition-all duration-300 ${count === target ? 'drop-shadow-[0_0_15px_rgba(197,160,89,0.5)]' : ''}`}
                  strokeDasharray={2 * Math.PI * 120}
                  strokeDashoffset={2 * Math.PI * 120 - (progress / 100) * 2 * Math.PI * 120}
                />
              </svg>
              
              {/* Ortadaki Sayı */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-7xl font-bold text-white select-none">{count}</span>
                <span className="text-sm text-slate-500 mt-2 font-medium tracking-widest">HEDEF: {target}</span>
              </div>

              {/* Tıklama Efekti (Ripple) */}
              <div className="absolute inset-0 rounded-full hover:bg-white/5 transition-colors active:scale-95" />
            </div>

            {/* Alt Butonlar */}
            <div className="flex gap-4 mt-4">
              <button 
                onClick={handleIncrement}
                className="bg-[#C5A059] text-black p-4 rounded-full shadow-lg shadow-[#C5A059]/20 hover:bg-[#d6b066] active:scale-90 transition-all"
              >
                <Heart size={32} className="fill-current" />
              </button>
              
              <button 
                onClick={handleReset}
                className="bg-slate-800 text-slate-400 p-4 rounded-full hover:text-red-400 hover:bg-slate-700 transition-all"
              >
                <RotateCcw size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* SAĞ: GÜNÜN NASİBİ (ESMA KARTI) */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={120} />
          </div>

          <h3 className="text-2xl font-bold text-[#C5A059] mb-6 flex items-center gap-2">
            <Sparkles size={24} /> Günün Nasibi
          </h3>

          {/* Kart Alanı */}
          <div className="relative w-full max-w-sm h-64 perspective-1000 mb-8">
            <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              
              {/* Kartın Ön Yüzü (Soru İşareti) */}
              <div className="absolute inset-0 bg-slate-950 border border-slate-700 rounded-2xl flex items-center justify-center backface-hidden shadow-xl">
                <span className="text-6xl text-slate-700 font-serif">?</span>
              </div>

              {/* Kartın Arka Yüzü (Esma) */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059] to-[#8a6e36] rounded-2xl flex flex-col items-center justify-center backface-hidden rotate-y-180 p-6 shadow-[0_0_30px_rgba(197,160,89,0.3)] border border-yellow-200">
                {esma && (
                  <>
                    <h2 className="text-4xl font-bold text-black font-serif mb-2 drop-shadow-sm">{esma.name}</h2>
                    <div className="w-16 h-1 bg-black/20 rounded-full mb-4"></div>
                    <p className="text-black/80 font-medium text-lg italic leading-relaxed">"{esma.meaning}"</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <p className="text-slate-400 mb-6 text-sm">
            Niyet et ve butona bas, bakalım gönlüne hangi Esma düşecek?
          </p>

          <button 
            onClick={drawEsma}
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-500 text-white rounded-xl font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <BookOpen size={18} />
            Niyet Et ve Çek
          </button>
        </div>
      </div>

      {/* CSS Animasyonları için Stil */}
      <style>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
};

export default Zikir; 
