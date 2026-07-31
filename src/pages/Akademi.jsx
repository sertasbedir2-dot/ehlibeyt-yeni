import React from 'react';
import { Helmet } from 'react-helmet-async';
import { GraduationCap, BookOpen, Languages, Shield, Lock } from 'lucide-react';

export default function Akademi() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
      <Helmet>
        <title>OnikiKapı Akademi</title>
        <meta name="description" content="Oyunlaştırılmış Kur'an, Farsça ve Ehl-i Beyt fıkhı eğitim modülleri." />
      </Helmet>

      <div className="relative bg-gradient-to-r from-emerald-900/40 to-[#04151a] border border-emerald-500/20 rounded-3xl p-8 md:p-12 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <GraduationCap size={48} className="text-emerald-400 mb-6 relative z-10" />
        <h1 className="text-3xl md:text-5xl font-black text-[#FDF6E3] font-sans mb-4 relative z-10">İlim Akademisi</h1>
        <p className="text-slate-300 font-serif max-w-xl mx-auto relative z-10 mb-8">
          Sıkıcı makaleler bitti. Kur'an tilaveti, Farsça kelime hazinesi ve temel Alevi-Caferi fıkhını günde sadece 5 dakika ayırarak, seviye atlayarak öğrenin.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl relative z-10">
          
          <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center opacity-75 grayscale hover:grayscale-0 transition-all cursor-not-allowed relative">
            <Lock size={16} className="absolute top-3 right-3 text-slate-500" />
            <Languages size={28} className="text-purple-400 mb-2" />
            <span className="font-bold text-[#FDF6E3] text-sm">Farsça / Arapça</span>
          </div>

          <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center opacity-75 grayscale hover:grayscale-0 transition-all cursor-not-allowed relative">
            <Lock size={16} className="absolute top-3 right-3 text-slate-500" />
            <BookOpen size={28} className="text-emerald-400 mb-2" />
            <span className="font-bold text-[#FDF6E3] text-sm">Kur'an Modülü</span>
          </div>

          <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center opacity-75 grayscale hover:grayscale-0 transition-all cursor-not-allowed relative">
            <Lock size={16} className="absolute top-3 right-3 text-slate-500" />
            <Shield size={28} className="text-[#C5A059] mb-2" />
            <span className="font-bold text-[#FDF6E3] text-sm">Fıkıh ve Akide</span>
          </div>

        </div>

        <button className="mt-10 bg-white/5 border border-emerald-500/30 text-emerald-300 px-6 py-2 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-emerald-500/10 transition-colors">
          Erken Erişim İçin İrfan Ağına Katıl
        </button>
      </div>
    </div>
  );
}