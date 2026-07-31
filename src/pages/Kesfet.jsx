import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Compass, Flame, Droplets, Heart, BookOpen, Star, HelpCircle, 
  BrainCircuit, Headphones, PlayCircle, Users, Radio, Map, ShieldCheck, 
  ShoppingBag, Library, LayoutGrid, Search
} from 'lucide-react';

export default function Kesfet() {
  // Tüm modülleri mantıksal kategorilere ayırıyoruz
  const menuCategories = [
    {
      title: "İbadet & Günlük Hayat",
      color: "border-emerald-500/30",
      items: [
        { name: "Namaz & Abdest", path: "/ibadet", icon: Droplets, color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { name: "Zikirmatik", path: "/zikir", icon: Compass, color: "text-emerald-400", bg: "bg-emerald-400/10" },
        { name: "Manevi Reçeteler", path: "/manevi-receteler", icon: Heart, color: "text-emerald-400", bg: "bg-emerald-400/10" },
      ]
    },
    {
      title: "İlim & Kütüphane",
      color: "border-[#C5A059]/30",
      items: [
        { name: "Dergâh Kütüphanesi", path: "/library", icon: Library, color: "text-[#C5A059]", bg: "bg-[#C5A059]/10" },
        { name: "14 Masum (a.s)", path: "/14-masum", icon: Star, color: "text-[#C5A059]", bg: "bg-[#C5A059]/10" },
        { name: "Soru & Cevap", path: "/soru-cevap", icon: HelpCircle, color: "text-[#C5A059]", bg: "bg-[#C5A059]/10" },
        { name: "İlim Meydanı (Test)", path: "/quiz", icon: BrainCircuit, color: "text-[#C5A059]", bg: "bg-[#C5A059]/10" },
        { name: "Aile Okulu", path: "/akademi", icon: BookOpen, color: "text-[#C5A059]", bg: "bg-[#C5A059]/10" },
      ]
    },
    {
      title: "Medya & Topluluk",
      color: "border-blue-500/30",
      items: [
        { name: "Podcast / Dinleti", path: "/podcast", icon: Headphones, color: "text-blue-400", bg: "bg-blue-400/10" },
        { name: "Medya Merkezi", path: "/medya", icon: PlayCircle, color: "text-blue-400", bg: "bg-blue-400/10" },
        { name: "İrfan Ağı (Yazarlar)", path: "/irfan-agi", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
        { name: "Canlı Meclis", path: "/canli-meclis", icon: Radio, color: "text-blue-400", bg: "bg-blue-400/10" },
      ]
    },
    {
      title: "Hizmet & Özel",
      color: "border-rose-500/30",
      items: [
        { name: "Kerbela & Erbain", path: "/kerbela", icon: Map, color: "text-rose-400", bg: "bg-rose-400/10" },
        { name: "Dergâh Çarşısı", path: "/bazaar", icon: ShoppingBag, color: "text-rose-400", bg: "bg-rose-400/10" },
        { name: "Heybem (Kayıtlılar)", path: "/heybem", icon: ShieldCheck, color: "text-rose-400", bg: "bg-rose-400/10" },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-8 pb-10">
      <Helmet>
        <title>Keşfet | OnikiKapı Tüm Menü</title>
        <meta name="description" content="OnikiKapı platformundaki tüm ilim, ibadet, kütüphane ve medya modüllerine tek sayfadan ulaşın." />
      </Helmet>

      {/* SAYFA BAŞLIĞI */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 pt-4">
        <div className="p-3 bg-[#C5A059]/10 rounded-2xl border border-[#C5A059]/30">
          <LayoutGrid size={32} className="text-[#C5A059]" />
        </div>
        <h1 className="text-3xl font-black text-[#FDF6E3] font-sans tracking-tight">Keşfet</h1>
        <p className="text-slate-400 font-serif text-sm">Aradığın her şey tek bir kapının ardında.</p>
      </div>

      {/* HIZLI ARAMA ÇUBUĞU (Sayfa İçi) */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text" 
          placeholder="Modül veya sayfa ara..." 
          className="w-full bg-[#0b1b24] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-[#FDF6E3] font-sans focus:outline-none focus:border-[#C5A059]/50 transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Mobilde klavye açılınca düzgün odaklansın
        />
      </div>

      {/* KATEGORİ IZGARALARI (BENTO GRID) */}
      <div className="space-y-8">
        {menuCategories.map((cat, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-lg font-bold text-slate-300 font-sans border-b border-white/5 pb-2 pl-2">
              {cat.title}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {cat.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={idx} 
                    to={item.path} 
                    className={`flex flex-col items-center justify-center p-4 md:p-6 bg-[#0b1b24] border border-white/5 rounded-2xl hover:bg-white/5 hover:${cat.color} transition-all group shadow-lg active:scale-95`}
                  >
                    <div className={`p-3 rounded-xl mb-3 ${item.bg} group-hover:scale-110 transition-transform`}>
                      <Icon size={28} className={item.color} />
                    </div>
                    <span className="text-center font-bold text-[#FDF6E3] font-sans text-xs md:text-sm leading-tight">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}