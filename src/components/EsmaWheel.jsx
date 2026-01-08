import React, { useState } from 'react';
import { Sparkles, RefreshCcw, Heart, Share2 } from 'lucide-react';

export default function EsmaWheel() {
  const [selectedEsma, setSelectedEsma] = useState(null);
  const [loading, setLoading] = useState(false);

  const esmalar = [
    { name: "Er-Rahman", arabic: "الرَّحْمَنُ", meaning: "Dünyadaki her yaratılana merhamet eden.", zikir: 298 },
    { name: "El-Melik", arabic: "الْمَلِكُ", meaning: "Mülkün gerçek sahibi, mutlak hükümdar.", zikir: 90 },
    { name: "El-Kuddüs", arabic: "الْقُدُّوسُ", meaning: "Her türlü eksiklikten münezzeh olan.", zikir: 170 },
    { name: "El-Selam", arabic: "السَّلاَمُ", meaning: "Kullarını selamete çıkaran, cennetteki bahtiyar kullarına selam veren.", zikir: 131 },
    { name: "El-Mümin", arabic: "الْمُؤْمِنُ", meaning: "Güven veren, emin kılan, koruyan.", zikir: 137 },
    { name: "El-Müheymin", arabic: "الْمُهَيْمِنُ", meaning: "Gözetip koruyan, kainatın bütün işlerini idare eden.", zikir: 145 },
    { name: "El-Aziz", arabic: "الْعَزِيزُ", meaning: "İzzet sahibi, her şeye galip gelen.", zikir: 94 },
    { name: "El-Cebbar", arabic: "الْجَبَّارُ", meaning: "Azamet ve kudret sahibi, dilediğini yapan.", zikir: 206 },
    { name: "El-Mütekebbir", arabic: "الْمُتَكَبِّرُ", meaning: "Büyüklükte eşi, benzeri olmayan.", zikir: 662 },
    { name: "El-Halık", arabic: "الْخَالِقُ", meaning: "Yaratan, yoktan var eden.", zikir: 731 },
    { name: "El-Fettah", arabic: "الْفَتَّاحُ", meaning: "Her türlü müşkülleri açan ve kolaylaştıran.", zikir: 489 },
    { name: "El-Vedud", arabic: "الْوَدُودُ", meaning: "Kullarını en çok seven, sevilmeye en layık olan.", zikir: 20 },
    { name: "El-Hak", arabic: "الْحَقُّ", meaning: "Varlığı hiç değişmeden duran. Var olan, hakkı ortaya çıkaran.", zikir: 108 },
    { name: "El-Hayy", arabic: "الْحَيُّ", meaning: "Ezeli ve ebedi bir hayat ile diri olan.", zikir: 18 },
    { name: "El-Kayyum", arabic: "الْقَيُّومُ", meaning: "Gökleri, yeri ve her şeyi tutan.", zikir: 156 },
  ];

  const handleSpin = () => {
    setLoading(true);
    setSelectedEsma(null);
    
    // Haptik Geribildirim (Mobil cihazlar için)
    if (navigator.vibrate) navigator.vibrate(50);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * esmalar.length);
      setSelectedEsma(esmalar[randomIndex]);
      setLoading(false);
      if (navigator.vibrate) navigator.vibrate([10, 30, 10]);
    }, 1500);
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#0a192f] to-[#112240] p-8 rounded-[2rem] border border-gold/20 shadow-2xl text-center relative overflow-hidden group">
      
      {/* İslami Motifli Arka Plan Süsü */}
      <div className="absolute -top-10 -right-10 opacity-[0.03] text-gold pointer-events-none">
        <Sparkles size={250} />
      </div>

      <div className="relative z-10">
        <h2 className="text-xl font-serif font-bold text-gold mb-2 flex items-center justify-center gap-2 tracking-widest uppercase">
          <Sparkles size={20} className="animate-pulse" /> Günün Nasibi
        </h2>
        <p className="text-slate-400 mb-8 text-xs font-medium">Kalbini ferahlatacak esmayı niyet ederek seç.</p>

        {/* Sonuç Ekranı */}
        <div className="min-h-[220px] flex items-center justify-center mb-8 relative">
          {loading ? (
            <div className="flex flex-col items-center gap-4 animate-bounce">
              <RefreshCcw size={64} className="text-gold animate-spin-slow" />
              <span className="text-gold text-xs font-bold tracking-[0.2em] animate-pulse">TECELLİ BEKLENİYOR...</span>
            </div>
          ) : selectedEsma ? (
            <div className="animate-fade-in-up space-y-4 w-full px-4">
               {/* Arapça Hattı */}
               <div className="text-6xl md:text-7xl font-serif text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-2" dir="rtl">
                 {selectedEsma.arabic}
               </div>
               
               <h3 className="text-3xl font-bold text-gold tracking-widest uppercase font-sans">
                 {selectedEsma.name}
               </h3>
               
               <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto"></div>
               
               <p className="text-slate-300 italic text-sm md:text-base px-6 leading-relaxed font-serif">
                 "{selectedEsma.meaning}"
               </p>
               
               <div className="flex items-center justify-center gap-3 pt-2">
                 <div className="flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full text-gold text-xs font-bold">
                   <Heart size={12} fill="currentColor" className="opacity-50" />
                   Zikir: {selectedEsma.zikir}
                 </div>
               </div>
            </div>
          ) : (
            <div className="relative group cursor-pointer" onClick={handleSpin}>
              <div className="absolute inset-0 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-gold/30 flex items-center justify-center text-gold/20 text-7xl font-serif select-none transition-all group-hover:border-gold/60 group-hover:text-gold/40">
                ?
              </div>
            </div>
          )}
        </div>

        {/* Aksiyon Butonları */}
        <div className="space-y-3">
          <button 
            onClick={handleSpin} 
            disabled={loading}
            className={`
              w-full py-5 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-xl
              ${loading 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5" 
                : "bg-gold hover:bg-white text-midnight hover:scale-[1.02] active:scale-95 border border-gold shadow-[0_10px_30px_rgba(197,160,89,0.3)]"}
            `}
          >
            {loading ? <RefreshCcw className="animate-spin" size={20} /> : <Sparkles size={20} />}
            <span className="tracking-widest uppercase text-sm">
              {loading ? "Niyet Ediliyor..." : "Niyet Et ve Çek"}
            </span>
          </button>
          
          {selectedEsma && !loading && (
            <button className="flex items-center justify-center gap-2 w-full text-slate-500 hover:text-gold text-[10px] font-bold uppercase tracking-widest transition-colors py-2">
              <Share2 size={12} /> Paylaş ve Vesile Ol
            </button>
          )}
        </div>
      </div>
    </div>
  );
}