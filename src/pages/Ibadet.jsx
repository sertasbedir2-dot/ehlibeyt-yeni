import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Compass, Droplets, Users, BookOpen, Clock, Heart, ArrowRight } from 'lucide-react';

export default function Ibadet() {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in space-y-10">
      {/* KUSURSUZ SEO VE PAYLAŞIM ETİKETLERİ */}
      <Helmet>
        <title>İbadet & Aile Okulu | OnikiKapı</title>
        <meta name="description" content="Ehl-i Beyt fıkhına göre namaz vakitleri, görsel abdest ve namaz rehberi, evlilik ve aile okulu dersleri." />
        <meta property="og:title" content="OnikiKapı - İbadet ve Aile Okulu" />
        <meta property="og:description" content="Namaz, abdest rehberleri ve Ehl-i Beyt ahlakıyla huzurlu yuvalar inşa etmenin yolları." />
      </Helmet>

      {/* HERO BÖLÜMÜ - ZÜMRÜT VE ALTIN TEMA */}
      <div className="text-center space-y-4 mb-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="inline-flex items-center justify-center p-4 bg-[#09303a] border border-[#C5A059]/30 rounded-full mb-2 relative z-10">
          <Compass size={40} className="text-[#C5A059]" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#FDF6E3] font-sans relative z-10">
          Kıblegâh & <span className="text-[#C5A059]">Aile Okulu</span>
        </h1>
        <p className="text-slate-400 font-serif max-w-xl mx-auto relative z-10">
          Bedenin miracı olan namazın incelikleri ve toplumun temeli olan ailenin Ehl-i Beyt ahlakıyla inşası.
        </p>
      </div>

      {/* BENTO GRID DÜZENİ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. KART: NAMAZ VAKİTLERİ (İleride API eklenecek) */}
        <div className="md:col-span-1 bg-[#0b1b24] border border-[#C5A059]/20 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute -right-10 -top-10 text-[#C5A059]/5 pointer-events-none group-hover:scale-110 transition-transform">
            <Clock size={150} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#FDF6E3] font-sans mb-1 flex items-center gap-2">
              <Clock size={20} className="text-[#C5A059]"/> Namaz Vakitleri
            </h3>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-6">İstanbul (Caferi Fıkhı)</p>
            
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-slate-400">İmsak / Sabah</span>
                <span className="text-[#FDF6E3] font-mono">04:30</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2 bg-[#C5A059]/10 -mx-2 px-2 rounded">
                <span className="text-[#C5A059] font-bold">Öğle / İkindi</span>
                <span className="text-[#C5A059] font-mono font-bold">13:15</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-slate-400">Akşam / Yatsı</span>
                <span className="text-[#FDF6E3] font-mono">20:45</span>
              </div>
            </div>
          </div>
          <button className="mt-6 w-full py-2 bg-white/5 text-slate-300 rounded-xl text-sm font-bold hover:bg-white/10 transition-colors">
            Konum Değiştir
          </button>
        </div>

        {/* 2. KART: GÖRSEL REHBERLER (Abdest & Namaz) */}
        <div className="md:col-span-2 bg-[#09303a]/50 border border-[#C5A059]/20 rounded-3xl p-6 md:p-8 flex flex-col justify-center group hover:border-[#C5A059]/50 transition-all">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-[#04151a] rounded-xl text-[#C5A059]">
              <Droplets size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#FDF6E3] font-sans">Görsel İbadet Rehberi</h3>
              <p className="text-slate-400 font-serif mt-1">Sıfırdan, adım adım Ehl-i Beyt mektebine göre abdest ve namaz eğitimi.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
            <button className="flex items-center justify-between p-4 bg-[#04151a] rounded-2xl border border-white/10 hover:border-[#C5A059] transition-colors text-left group/btn">
              <div>
                <span className="block text-sm font-bold text-[#C5A059] mb-1">Modül 1</span>
                <span className="text-[#FDF6E3] font-sans">Abdest Nasıl Alınır?</span>
              </div>
              <ArrowRight size={18} className="text-slate-500 group-hover/btn:text-[#C5A059] group-hover/btn:translate-x-1 transition-all" />
            </button>
            <button className="flex items-center justify-between p-4 bg-[#04151a] rounded-2xl border border-white/10 hover:border-[#C5A059] transition-colors text-left group/btn">
              <div>
                <span className="block text-sm font-bold text-[#C5A059] mb-1">Modül 2</span>
                <span className="text-[#FDF6E3] font-sans">Namazın Kılınışı</span>
              </div>
              <ArrowRight size={18} className="text-slate-500 group-hover/btn:text-[#C5A059] group-hover/btn:translate-x-1 transition-all" />
            </button>
          </div>
        </div>

        {/* 3. KART: AİLE OKULU */}
        <div className="md:col-span-3 bg-gradient-to-r from-[#04151a] to-[#09303a] border border-[#C5A059]/30 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 group">
          <div className="w-20 h-20 shrink-0 bg-[#C5A059]/10 rounded-full flex items-center justify-center border border-[#C5A059]/30">
            <Users size={36} className="text-[#C5A059]" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-[#C5A059]/20 text-[#C5A059] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3">
              <Heart size={12} className="fill-[#C5A059]"/> Yeni Modül
            </div>
            <h3 className="text-2xl font-bold text-[#FDF6E3] font-sans mb-2">Dergâh Aile Okulu</h3>
            <p className="text-slate-300 font-serif leading-relaxed text-sm md:text-base max-w-2xl">
              Evlilik öncesi eş seçim kriterleri, manevi psikoloji, çocuk terbiyesi ve Hz. Zehra (s.a) ile İmam Ali'nin (a.s) yuvasından günümüze yansıyan pratik hayat dersleri.
            </p>
          </div>
          
          <button className="shrink-0 bg-[#C5A059] text-[#04151a] px-6 py-3 rounded-xl font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(197,160,89,0.2)] flex items-center gap-2">
            <BookOpen size={18} /> Derslere Katıl
          </button>
        </div>

      </div>
    </div>
  );
}