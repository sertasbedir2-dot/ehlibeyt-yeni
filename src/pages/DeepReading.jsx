import React, { useState } from 'react';
import { Share2, X, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DeepReading() {
  const [activeVerse, setActiveVerse] = useState(1);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    // Layout'un koyu rengini bu sayfa için açık renkle (#F4EFE0) değiştiriyoruz
    <div className="absolute inset-0 bg-[#F4EFE0] text-[#0F2C45] z-10 overflow-y-auto">
      
      {/* Üst Navigasyon */}
      <div className="sticky top-0 bg-[#F4EFE0]/95 backdrop-blur-sm border-b border-[#C5A059]/20 px-4 py-4 flex justify-between items-center z-40">
        <Link to="/" className="flex items-center gap-2 text-[#4A5D75] hover:text-[#0F2C45] transition font-medium">
          <ChevronLeft size={20} /> <span className="hidden sm:inline">Kütüphane</span>
        </Link>
        <div className="text-center">
          <h2 className="font-serif text-xl font-bold">Mülk Suresi</h2>
          <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest block">Mekki • 30 Ayet</span>
        </div>
        <button className="p-2 text-[#4A5D75] hover:bg-[#0F2C45]/5 rounded-full"><Share2 size={20} /></button>
      </div>

      {/* OKUMA ALANI */}
      <div className="max-w-2xl mx-auto pt-12 pb-32 px-6">
        
        {/* Besmele */}
        <div className="text-center mb-16 opacity-80">
             <h1 className="font-serif text-4xl text-[#0F2C45]">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</h1>
        </div>

        {/* Ayet 1 */}
        <div 
          onClick={() => {setActiveVerse(1); setIsPanelOpen(true)}}
          className={`mb-8 cursor-pointer transition-all duration-500 p-6 rounded-2xl border border-transparent
          ${activeVerse === 1 ? 'bg-white shadow-xl scale-100 border-[#C5A059]/20' : 'opacity-60 hover:opacity-100 hover:bg-white/50'}`}
        >
          <div className="flex justify-center mb-4"><span className={`w-8 h-8 rounded-full border border-[#C5A059] flex items-center justify-center font-serif text-sm transition-colors ${activeVerse === 1 ? 'bg-[#C5A059] text-white' : 'text-[#C5A059]'}`}>1</span></div>
          <p className="text-3xl md:text-4xl text-center font-serif leading-[2.2] mb-6 font-amiri text-[#0F2C45]" dir="rtl">تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ...</p>
          <p className="text-lg text-center text-[#4A5D75] font-light">Hükümranlık elinde olan Allah yücedir...</p>
        </div>

        {/* Ayet 2 */}
        <div 
          onClick={() => {setActiveVerse(2); setIsPanelOpen(true)}}
          className={`mb-8 cursor-pointer transition-all duration-500 p-6 rounded-2xl border border-transparent
          ${activeVerse === 2 ? 'bg-white shadow-xl scale-100 border-[#C5A059]/20' : 'opacity-60 hover:opacity-100 hover:bg-white/50'}`}
        >
          <div className="flex justify-center mb-4"><span className={`w-8 h-8 rounded-full border border-[#C5A059] flex items-center justify-center font-serif text-sm transition-colors ${activeVerse === 2 ? 'bg-[#C5A059] text-white' : 'text-[#C5A059]'}`}>2</span></div>
          <p className="text-3xl md:text-4xl text-center font-serif leading-[2.2] mb-6 font-amiri text-[#0F2C45]" dir="rtl">الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ...</p>
          <p className="text-lg text-center text-[#4A5D75] font-light">O, hanginizin daha güzel amel yapacağını sınamak için...</p>
        </div>

      </div>

      {/* YAN PANEL (TEFSİR) */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white shadow-2xl transition-transform duration-500 z-50 border-l border-[#C5A059]/30 ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-serif text-xl font-bold text-[#0F2C45]">Tefsir Notları</h3>
            <button onClick={(e) => {e.stopPropagation(); setIsPanelOpen(false)}} className="p-2 text-[#4A5D75] hover:bg-gray-200 rounded-full transition"><X size={20}/></button>
            </div>
            <div className="p-6 overflow-y-auto">
                <div className="bg-[#E3F2FD] p-4 rounded-xl border border-blue-100 mb-6">
                    <h4 className="text-[#005C42] font-bold text-xs uppercase tracking-wider mb-2">Özet Anlam</h4>
                    <p className="text-[#0F2C45] text-sm leading-relaxed">Bu ayet, hayatın ve ölümün birer "oluş" olduğunu, yokluk olmadığını vurgular.</p>
                </div>
                <p className="text-[#4A5D75] leading-relaxed">İmam Sadık (a.s) buyurur ki: "Ölüm, yok oluş değil, hal değişimidir."</p>
            </div>
        </div>
      </div>
    </div>
  );
}