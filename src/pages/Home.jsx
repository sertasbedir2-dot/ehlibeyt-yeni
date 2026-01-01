import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Activity, Star, PlayCircle, ChevronRight, Heart } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12 animate-fade-in pb-10">
      
      {/* --- HERO BÖLÜMÜ (Karşılama) --- */}
      <div className="relative bg-gradient-to-br from-[#0F2C45] via-[#162e45] to-[#0a1f35] rounded-3xl p-8 md:p-12 overflow-hidden border border-[#C5A059]/20 shadow-2xl text-center md:text-left">
        {/* Arka Plan Efekti */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059] rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600 rounded-full mix-blend-overlay filter blur-[80px] opacity-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-xs font-bold tracking-widest uppercase">
              <Star size={12} /> İlim ve Hikmet Kapısı
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F4EFE0] via-[#C5A059] to-[#F4EFE0] leading-tight">
              Ehlibeyt'in Nurlu Yoluna Hoş Geldiniz
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Hakikatin kaynağına yolculuk, kalplerin şifası zikirler ve ilmin derinliklerine açılan dijital kütüphane.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/library" className="bg-[#C5A059] text-[#0F2C45] px-8 py-3 rounded-xl font-bold hover:bg-white transition flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95">
                <BookOpen size={20} /> Kütüphaneyi Keşfet
              </Link>
              <Link to="/zikir" className="bg-slate-700/50 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-700 transition flex items-center gap-2 border border-slate-600 backdrop-blur-sm">
                <Activity size={20} /> Zikir Çek
              </Link>
            </div>
          </div>

          {/* Sağ Taraf Görseli */}
          <div className="hidden md:flex items-center justify-center w-64 h-64 bg-[#C5A059]/5 rounded-full border border-[#C5A059]/20 relative">
             <div className="absolute inset-4 border border-[#C5A059]/10 rounded-full animate-spin-slow"></div>
             <Heart size={80} className="text-[#C5A059] opacity-80" />
          </div>
        </div>
      </div>

      {/* --- GÜNÜN HİKMETİ --- */}
      <div className="bg-[#1e293b]/50 border-l-4 border-[#C5A059] p-6 rounded-r-xl italic text-slate-300 relative">
        <span className="text-4xl text-[#C5A059] absolute -top-2 left-2 opacity-50">"</span>
        <p className="text-lg md:text-xl text-center">
          İlim bir noktadır, onu cahiller çoğaltmıştır.
        </p>
        <p className="text-right text-[#C5A059] font-bold mt-2 text-sm">— Hz. Ali (a.s)</p>
      </div>

      {/* --- HIZLI ERİŞİM KARTLARI --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard 
          to="/library" 
          icon={<BookOpen size={32} />} 
          title="Gönül Kütüphanesi" 
          desc="Seçkin eserler, PDF kitaplar ve özel yayınlar." 
          color="group-hover:text-amber-400"
          borderColor="hover:border-amber-500/50"
        />
        <FeatureCard 
          to="/zikir" 
          icon={<Activity size={32} />} 
          title="Zikirmatik" 
          desc="Günlük zikirlerinizi kaydedin ve takip edin." 
          color="group-hover:text-emerald-400"
          borderColor="hover:border-emerald-500/50"
        />
        <FeatureCard 
          to="/14-masum" 
          icon={<Star size={32} />} 
          title="14 Masum" 
          desc="Ehlibeyt'in hayatı, hikmetleri ve faziletleri." 
          color="group-hover:text-blue-400"
          borderColor="hover:border-blue-500/50"
        />
        <FeatureCard 
          to="/medya" 
          icon={<PlayCircle size={32} />} 
          title="Medya Merkezi" 
          desc="Video sohbetler, mersiyeler ve belgeseller." 
          color="group-hover:text-rose-400"
          borderColor="hover:border-rose-500/50"
        />
      </div>

      {/* --- İLİM & BİLİM KESİTİ --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Link to="/ilim" className="group relative bg-[#0F2C45] rounded-2xl p-6 border border-slate-700 overflow-hidden hover:border-cyan-500/50 transition duration-500">
          <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">🧬 İlim ve Bilim</h3>
          <p className="text-slate-400 text-sm mb-4">
            Kuran ayetlerinin modern bilimle buluştuğu mucizevi gerçekleri keşfedin.
          </p>
          <div className="flex items-center text-cyan-500 text-sm font-bold gap-1">
            İncele <ChevronRight size={16} />
          </div>
        </Link>

        <Link to="/soru-cevap" className="group relative bg-[#0F2C45] rounded-2xl p-6 border border-slate-700 overflow-hidden hover:border-purple-500/50 transition duration-500">
          <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">❓ Soru & Cevap</h3>
          <p className="text-slate-400 text-sm mb-4">
            Aklınıza takılan fıkhi ve itikadi soruların cevaplarını burada bulun.
          </p>
          <div className="flex items-center text-purple-500 text-sm font-bold gap-1">
            Soruları Gör <ChevronRight size={16} />
          </div>
        </Link>
      </div>

    </div>
  );
}

// Yardımcı Kart Bileşeni
function FeatureCard({ to, icon, title, desc, color, borderColor }) {
  return (
    <Link to={to} className={`group bg-slate-800 p-6 rounded-2xl border border-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-lg ${borderColor}`}>
      <div className={`mb-4 text-slate-400 transition-colors duration-300 ${color}`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {desc}
      </p>
    </Link>
  );
}