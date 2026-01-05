import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Play, Pause, Search, Filter, Headphones, Video, 
  Mic, Film, Heart, Share2, MoreHorizontal, Flame 
} from 'lucide-react';
// Veri dosyanızın yolunun doğru olduğundan emin olun
import { mediaContent } from '../data/mediaData'; 

export default function MediaCenter() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [playingId, setPlayingId] = useState(null);

  // --- KATEGORİLER ---
  const categories = [
    { id: 'all', label: 'Tümü', icon: <Filter size={18} /> },
    { id: 'deyis', label: 'Deyişler', icon: <Headphones size={18} /> },
    { id: 'mersiye', label: 'Mersiyeler', icon: <Heart size={18} /> },
    { id: 'sohbet', label: 'Sohbetler', icon: <Mic size={18} /> },
    { id: 'belgesel', label: 'Belgeseller', icon: <Film size={18} /> },
  ];

  // --- FİLTRELEME MANTIĞI ---
  const filteredMedia = mediaContent.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // --- ÖNE ÇIKAN (FEATURED) ---
  // Eğer veri yoksa hata vermemesi için güvenli erişim
  const featuredItem = mediaContent.find(item => item.isFeatured) || mediaContent[0] || {
    id: 0, title: "Yükleniyor...", artist: "", type: "", image: ""
  };

  const handlePlay = (id) => {
    setPlayingId(playingId === id ? null : id);
    // İleride buraya global müzik player entegrasyonu yapılacak
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-20 animate-fade-in font-sans">
      <Helmet>
        <title>Medya Merkezi | OnikiKapı</title>
      </Helmet>

      {/* --- HERO BÖLÜMÜ (VİTRİN) --- */}
      <div className="relative h-[60vh] w-full overflow-hidden group">
        {/* Arka Plan Resmi */}
        <div className="absolute inset-0">
            <img 
                src={featuredItem.image} 
                alt="Featured Background" 
                className="w-full h-full object-cover opacity-60 transition-transform duration-[10s] group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent" />
        </div>

        {/* Hero İçerik */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-start gap-4 z-10">
            <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                <Flame size={14} fill="currentColor" /> Haftanın Öne Çıkanı
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl leading-tight max-w-4xl">
                {featuredItem.title}
            </h1>
            <p className="text-xl text-slate-300 font-serif italic border-l-4 border-amber-500 pl-4">
                {featuredItem.artist} • {featuredItem.type}
            </p>
            <div className="flex gap-4 mt-6">
                <button 
                    onClick={() => handlePlay(featuredItem.id)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95"
                >
                    {playingId === featuredItem.id ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
                    {playingId === featuredItem.id ? 'Durdur' : 'Hemen Dinle'}
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-4 rounded-full transition-all border border-white/10 hover:border-white/30">
                    <Heart />
                </button>
            </div>
        </div>
      </div>

      {/* --- ANA İÇERİK KAPSAYICISI --- */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        
        {/* --- KONTROL PANELİ (FİLTRE & ARAMA) --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 bg-[#1e293b]/80 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-xl">
            {/* Kategoriler */}
            <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                            activeTab === cat.id 
                            ? 'bg-amber-500 text-slate-900 shadow-lg scale-105' 
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        {cat.icon}
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Arama */}
            <div className="relative w-full md:w-80 group">
                <Search className="absolute left-3 top-3 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={20} />
                <input 
                    type="text" 
                    placeholder="Eser veya sanatçı ara..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0f172a] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-amber-500/50 transition-all placeholder-slate-600"
                />
            </div>
        </div>

        {/* --- MEDYA LİSTESİ (GRID) --- */}
        {filteredMedia.length === 0 ? (
            <div className="text-center py-20 text-slate-500 bg-[#1e293b]/30 rounded-2xl border border-white/5">
                <div className="mb-4 text-6xl opacity-50">🔍</div>
                <p className="text-lg">Aradığınız kriterlere uygun içerik bulunamadı.</p>
                <button onClick={() => {setSearchQuery(''); setActiveTab('all');}} className="mt-4 text-amber-500 hover:underline">Filtreleri Temizle</button>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMedia.map((item) => (
                    <div key={item.id} className="group bg-[#1e293b] rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                        {/* Kapak Resmi */}
                        <div className="relative aspect-video overflow-hidden">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                            {/* Overlay & Play Button */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                <button 
                                    onClick={() => handlePlay(item.id)}
                                    className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-amber-400"
                                >
                                    {playingId === item.id ? <Pause size={24} fill="#0f172a" /> : <Play size={24} fill="#0f172a" className="ml-1" />}
                                </button>
                            </div>
                            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm font-mono border border-white/10">
                                {item.duration}
                            </span>
                        </div>

                        {/* Bilgiler */}
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex-1 min-w-0 pr-2">
                                    <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors line-clamp-1" title={item.title}>
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm font-serif truncate">{item.artist}</p>
                                </div>
                                <button className="text-slate-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider border border-white/10 px-2 py-1 rounded bg-[#0f172a]">
                                    {item.type}
                                </span>
                                <div className="flex gap-2">
                                    <button className="text-slate-400 hover:text-red-500 transition-colors p-1.5 hover:bg-white/5 rounded-full"><Heart size={18} /></button>
                                    <button className="text-slate-400 hover:text-green-500 transition-colors p-1.5 hover:bg-white/5 rounded-full"><Share2 size={18} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}