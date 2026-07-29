import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Star, Shield, Users, Sparkles, CheckCircle2, ChevronRight, BookOpen, Activity, Globe } from 'lucide-react';
import { MASUM_DEEP_DATA } from '../data/masumDeepData'; // YENİ: Statik veri bağlantısı (Sıfır Maliyet)

export default function OnDortMasum() {
  const [selectedMasum, setSelectedMasum] = useState(null);
  const [hpClaimed, setHpClaimed] = useState(false);

  // Masum değiştiğinde HP durumunu kontrol et
  useEffect(() => {
    if (selectedMasum) {
      const isClaimed = localStorage.getItem(`claimed_masum_${selectedMasum.id}`) === 'true';
      setHpClaimed(isClaimed);
    }
  }, [selectedMasum]);

  // --- HİKMET PUANI (İRFAN) KAZANIMI ---
  const handleClaimHP = () => {
    if (hpClaimed || !selectedMasum) return;
    
    const currentHP = parseInt(localStorage.getItem('hikmet_puani') || '0', 10);
    localStorage.setItem('hikmet_puani', (currentHP + 100).toString());
    localStorage.setItem(`claimed_masum_${selectedMasum.id}`, 'true'); // Bu Masum için HP alındı
    
    // Navbar'ı anında haberdar et
    window.dispatchEvent(new Event('hp-updated'));
    setHpClaimed(true);
  };

  return (
    <div className="min-h-screen bg-[#04151a] pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-[#FDF6E3] font-serif overflow-hidden relative">
      <Helmet>
        <title>14 Masum (Nuh'un Gemisi) | OnikiKapı</title>
        <meta name="description" content="Ehl-i Beyt'in, 14 Masum'un hayatı, ontolojik felsefesi ve çağdaş dünyadaki karşılığı." />
      </Helmet>

      {/* --- ARKA PLAN EFEKTLERİ --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#C5A059]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* --- BAŞLIK ALANI --- */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 mb-6">
          <Star size={16} /> <span className="text-xs font-bold tracking-widest uppercase font-sans">Nuh'un Gemisi</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#FDF6E3] mb-4">14 Masum</h1>
        <p className="text-slate-400 text-lg italic">
          "Benim Ehl-i Beyt'im Nuh'un gemisi gibidir; ona binen kurtulur, ondan geri kalan boğulur." <br/>
          <span className="text-[#C5A059] text-sm">— Hz. Muhammed (s.a.a)</span>
        </p>
      </div>

      {/* --- BENTO GRID (KARTLAR) --- */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 relative z-10 mb-20">
        {MASUM_DEEP_DATA.map((masum) => {
          const isClaimed = localStorage.getItem(`claimed_masum_${masum.id}`) === 'true';
          return (
            <motion.div
              key={masum.id}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMasum(masum)}
              className="bg-[#09303a]/80 backdrop-blur-md border border-[#C5A059]/20 rounded-2xl p-5 cursor-pointer flex flex-col items-center text-center shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(197,160,89,0.2)] transition-all relative overflow-hidden group"
            >
              {/* Claimed (Okundu) İşareti */}
              {isClaimed && (
                <div className="absolute top-3 right-3 text-emerald-500 bg-emerald-500/10 p-1 rounded-full">
                  <CheckCircle2 size={14} />
                </div>
              )}
              
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#04151a] to-[#09303a] border-2 border-[#C5A059]/50 flex items-center justify-center mb-4 group-hover:border-[#C5A059] transition-colors relative z-10 shadow-inner">
                {masum.id === 1 ? <Crown size={32} className="text-[#C5A059]" /> : <Star size={28} className="text-[#C5A059]" />}
              </div>
              <h3 className="font-bold text-[#FDF6E3] text-lg md:text-xl font-sans mb-1 z-10">{masum.identity.name_tr}</h3>
              <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest z-10">{masum.identity.title}</p>
              
              {/* Arkaplan Arapça Filigran */}
              <div className="absolute -bottom-4 right-2 text-6xl text-white/5 font-bold select-none whitespace-nowrap z-0 font-arabic">
                {masum.identity.name_ar}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- PWA LORE MODAL (Detay Ekranı) --- */}
      <AnimatePresence>
        {selectedMasum && (
          <motion.div 
            initial={{ y: "100%", opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: "100%", opacity: 0 }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }} 
            className="fixed inset-0 z-[200] flex justify-center bg-black/90 backdrop-blur-xl sm:p-4"
          >
            <div className="bg-[#0b1b24] w-full max-w-4xl sm:rounded-3xl shadow-2xl relative border-t-2 sm:border-2 border-[#C5A059]/50 flex flex-col h-full sm:h-auto sm:max-h-[95vh] overflow-hidden">
              
              {/* Modal Başlık */}
              <div className="bg-gradient-to-b from-[#C5A059]/20 to-transparent p-6 pb-8 border-b border-[#C5A059]/20 relative shrink-0">
                <div className="absolute -right-4 -top-10 text-[150px] text-white/5 font-bold whitespace-nowrap select-none font-arabic">
                  {selectedMasum.identity.name_ar}
                </div>
                
                <button onClick={() => setSelectedMasum(null)} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-slate-300 transition-colors z-20">
                  <X size={24} />
                </button>

                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                  <div className="w-24 h-24 rounded-full bg-[#04151a] border-4 border-[#C5A059] flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.3)] shrink-0">
                    {selectedMasum.id === 1 ? <Crown size={40} className="text-[#C5A059]" /> : <Star size={40} className="text-[#C5A059]" />}
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold font-sans text-white mb-2">{selectedMasum.identity.name_tr}</h2>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm">
                      <span className="bg-[#C5A059] text-[#04151a] px-3 py-1 rounded-full font-bold uppercase tracking-wider">{selectedMasum.identity.role}</span>
                      <span className="text-slate-300 font-sans border border-slate-600 px-3 py-1 rounded-full">{selectedMasum.identity.dates}</span>
                      <span className="text-slate-300 font-sans border border-slate-600 px-3 py-1 rounded-full">{selectedMasum.identity.burial}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal İçerik (Kaydırılabilir Alan) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                
                {/* 1. Özet & Çağdaş Karşılık */}
                <div className="bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-2xl p-6 text-center md:text-left relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#C5A059]"></div>
                  <p className="text-lg md:text-xl font-medium leading-relaxed text-[#FDF6E3] italic mb-4">
                    "{selectedMasum.identity.desc}"
                  </p>
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 flex gap-3 items-start">
                    <Globe className="text-[#C5A059] shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-1">Çağdaş İz Düşümü</h4>
                      <p className="text-slate-300 text-sm font-sans leading-relaxed">{selectedMasum.contemporary}</p>
                    </div>
                  </div>
                </div>

                {/* 2. Politik Strateji & Ontoloji Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
                    <h4 className="font-bold text-white font-sans flex items-center gap-2 mb-4 uppercase tracking-wider text-sm">
                      <Shield className="text-emerald-500" size={18}/> Politik Strateji
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{selectedMasum.politics.strategy}</p>
                    <div className="space-y-2">
                      {selectedMasum.politics.events.map((ev, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm bg-white/5 p-2 rounded-lg">
                          <span className="text-[#C5A059] font-bold font-mono text-xs">{ev.date}</span>
                          <span className="text-slate-200">{ev.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
                    <h4 className="font-bold text-white font-sans flex items-center gap-2 mb-4 uppercase tracking-wider text-sm">
                      <Sparkles className="text-purple-400" size={18}/> Ontolojik Nur
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-slate-500 uppercase block mb-1">Kuran-ı Kerim'deki Sırrı</span>
                        <p className="text-slate-200 text-sm italic border-l-2 border-purple-500/50 pl-2">{selectedMasum.ontology.quran}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 uppercase block mb-1">Kozmik Misyon</span>
                        <p className="text-slate-300 text-sm">{selectedMasum.ontology.cosmic}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 uppercase block mb-1">İlahi Yansıması</span>
                        <span className="bg-purple-900/30 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold">
                          {selectedMasum.ontology.noor}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Ağ & İbadet */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
                    <h4 className="font-bold text-white font-sans flex items-center gap-2 mb-4 uppercase tracking-wider text-sm">
                      <Users className="text-blue-400" size={18}/> Yarenler & Ağ
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMasum.network.companions.map((comp, idx) => (
                        <span key={idx} className="bg-blue-900/20 border border-blue-500/20 text-blue-300 px-3 py-1.5 rounded-lg text-xs font-medium">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
                    <h4 className="font-bold text-white font-sans flex items-center gap-2 mb-4 uppercase tracking-wider text-sm">
                      <BookOpen className="text-orange-400" size={18}/> Manevi Miras (Dualar)
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedMasum.liturgy.duas.map((dua, idx) => (
                        <span key={idx} className="bg-orange-900/20 border border-orange-500/20 text-orange-300 px-3 py-1.5 rounded-lg text-xs font-medium">
                          {dua}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 bg-white/5 p-2 rounded border border-white/5">
                      <strong className="text-slate-300">Özel Ziyaret:</strong> {selectedMasum.liturgy.ziyarat}
                    </p>
                  </div>
                </div>

              </div>

              {/* Modal Alt: Hook Modeli (HP Kazanımı) */}
              <div className="p-4 bg-[#04151a] border-t border-[#C5A059]/20 shrink-0">
                {!hpClaimed ? (
                  <button
                    onClick={handleClaimHP}
                    className="w-full py-4 bg-gradient-to-r from-[#C5A059] to-yellow-600 rounded-xl font-bold text-[#04151a] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:scale-[1.01] active:scale-95 transition-all animate-pulse"
                  >
                    <Sparkles size={20} />
                    İrfanı İçselleştir (+100 HP)
                  </button>
                ) : (
                  <div className="w-full py-4 bg-emerald-900/40 border border-emerald-500/40 rounded-xl font-bold text-emerald-400 flex items-center justify-center gap-2">
                    <CheckCircle2 size={20} />
                    İrfan Kaydedildi (+100 HP Eklendi)
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}