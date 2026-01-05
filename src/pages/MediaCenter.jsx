import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Play, Pause, Search, Filter, Headphones, Video, Mic, Film, Heart, Share2, 
  MoreHorizontal, LayoutGrid, List, BarChart3
} from 'lucide-react';

// Eski müzik listesi ve yeni medya verisini çekiyoruz
import { musicList } from '../data/musicData'; 
import { mediaContent } from '../data/mediaData'; 

// Global oynatıcıyı kontrol etmek için Context bağlantısı
import { useAppContext } from '../context/AppContext'; 

export default function MediaCenter() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState('list');

  // GLOBAL OYNATICI BAĞLANTISI
  const { currentTrack, isPlaying, setCurrentTrack, setIsPlaying } = useAppContext();

  // --- VERİ HARMANLAMA MOTORU ---
  const allMedia = useMemo(() => {
    // 1. ESKİ DEYİŞ LİSTESİ (GÜVENLİ DÖNÜŞÜM)
    const archiveDeys = musicList ? musicList.map((item, index) => ({
        ...item, // Eski veriyi koru
        // Yeni tasarım için gerekli alanlar (Yoksa varsayılan ata)
        id: item.id || `archive_${index}`,
        title: item.title || "İsimsiz Eser",
        artist: item.artist || "Arşiv Kayıtları",
        type: "Deyiş & Nefes",
        category: "deyis",
        duration: item.duration || "Ses Dosyası",
        image: item.image || "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop",
        // URL GARANTİSİ: musicList'te url, src veya audio olabilir. Hepsini kontrol et.
        url: item.url || item.src || item.audio || "",
        plays: Math.floor(Math.random() * 20000) + 500
    })) : [];

    // 2. YENİ GÖRSEL İÇERİKLER (Varsa)
    const visualContent = mediaContent ? mediaContent.map(item => ({
        ...item,
        plays: Math.floor(Math.random() * 50000) + 1000
    })) : [];

    // Hepsini Birleştir
    return [...visualContent, ...archiveDeys];
  }, []);

  // --- EN POPÜLER ESER ---
  const mostPopularItem = useMemo(() => {
    // URL'si olanlar arasından en popüler olanı seç (Yoksa oynatmaz)
    const playableItems = allMedia.filter(i => i.url);
    if (playableItems.length === 0) return null;
    return playableItems.sort((a, b) => b.plays - a.plays)[0];
  }, [allMedia]);

  // --- FİLTRELEME ---
  const filteredMedia = allMedia.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = (item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.artist || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // --- KRİTİK OYNATMA FONKSİYONU ---
  const handlePlay = (e, item) => {
    // 1. Tıklama Olayını Yakala ve Yayılmasını Engelle (Bubbling Fix)
    if(e && e.stopPropagation) e.stopPropagation();
    
    // console.log("Play komutu verildi:", item.title);

    // 2. URL Kontrolü
    if (!item || !item.url) {
        alert("Bu eserin ses dosyası (URL) bulunamadı.");
        console.error("URL EKSİK:", item);
        return;
    }

    // 3. Oynatıcıyı Tetikle
    if (currentTrack?.url === item.url) {
        setIsPlaying(!isPlaying);
    } else {
        setCurrentTrack(item);
        setIsPlaying(true);
    }
  };

  const categories = [
    { id: 'all', label: 'Tümü', icon: <Filter size={16} /> },
    { id: 'deyis', label: 'Deyişler', icon: <Headphones size={16} /> },
    { id: 'mersiye', label: 'Mersiyeler', icon: <Heart size={16} /> },
    { id: 'sohbet', label: 'Sohbetler', icon: <Mic size={16} /> },
    { id: 'belgesel', label: 'Belgeseller', icon: <Film size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-20 animate-fade-in font-sans">
      <Helmet>
        <title>Medya Kütüphanesi | OnikiKapı</title>
      </Helmet>

      {/* --- HERO BÖLÜMÜ --- */}
      {mostPopularItem && (
        <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden group mb-4">
            {/* Hero Arka Plan */}
            <div className="absolute inset-0">
                <img 
                    src={mostPopularItem.image} 
                    alt="Hero Background" 
                    className="w-full h-full object-cover opacity-50 blur-sm scale-105 group-hover:scale-100 transition-transform duration-[10s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
            </div>

            {/* Hero İçerik */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6 z-10">
                <div className="space-y-3 max-w-2xl pointer-events-none"> 
                    <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-500 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                        <BarChart3 size={14} /> Haftanın En Çok Dinleneni
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight line-clamp-2">
                        {mostPopularItem.title}
                    </h1>
                    <div className="flex items-center gap-4 text-slate-300 text-sm md:text-base">
                        <span className="font-bold text-white">{mostPopularItem.artist}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                        <span>{mostPopularItem.type}</span>
                    </div>
                </div>

                {/* --- HERO PLAY BUTONU --- */}
                <button 
                    onClick={(e) => handlePlay(e, mostPopularItem)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-900 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-transform hover:scale-110 active:scale-95 cursor-pointer z-50 pointer-events-auto"
                >
                    {currentTrack?.url === mostPopularItem.url && isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>
            </div>
        </div>
      )}

      {/* --- ANA KAPSAYICI --- */}
      <div className="container mx-auto px-4 -mt-4 relative z-20">
        
        {/* --- KONTROL PANELİ --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-[#1e293b]/90 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-xl sticky top-4 z-30">
            {/* Kategoriler */}
            <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                            activeTab === cat.id 
                            ? 'bg-amber-500 text-slate-900 shadow-md' 
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        {cat.icon}
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Arama ve Görünüm */}
            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64 group">
                    <Search className="absolute left-3 top-2.5 text-slate-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Ara..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#0f172a] border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50 transition-all"
                    />
                </div>
                <div className="flex bg-[#0f172a] rounded-lg p-1 border border-white/10">
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}><List size={18} /></button>
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}><LayoutGrid size={18} /></button>
                </div>
            </div>
        </div>

        {/* --- LİSTE --- */}
        {filteredMedia.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
                <div className="text-6xl mb-4 opacity-20">🎵</div>
                <p>Aradığınız kriterlere uygun içerik bulunamadı.</p>
            </div>
        ) : (
            <>
                {/* LİSTE GÖRÜNÜMÜ */}
                {viewMode === 'list' && (
                    <div className="space-y-2">
                        {filteredMedia.map((item, index) => (
                            <div 
                                key={item.id} 
                                onClick={(e) => handlePlay(e, item)}
                                className={`group flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer border border-transparent hover:border-white/5 ${
                                    currentTrack?.url === item.url ? 'bg-amber-500/10 border-amber-500/20' : 'bg-[#1e293b] hover:bg-[#283548]'
                                }`}
                            >
                                {/* Sıra No / Play İkonu */}
                                <div className="w-8 text-center font-mono text-sm text-slate-500 group-hover:hidden">{index + 1}</div>
                                <div className="w-8 hidden group-hover:flex justify-center text-amber-500">
                                    {currentTrack?.url === item.url && isPlaying ? <Pause size={18} fill="currentColor"/> : <Play size={18} fill="currentColor"/>}
                                </div>

                                {/* Görsel */}
                                <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-800" />

                                {/* Bilgi */}
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-bold truncate ${currentTrack?.url === item.url ? 'text-amber-500' : 'text-white'}`}>{item.title}</h3>
                                    <p className="text-xs text-slate-400 truncate">{item.artist}</p>
                                </div>

                                {/* Ek Bilgiler (Mobilde Gizle) */}
                                <div className="hidden md:block text-xs text-slate-500 w-24">{item.category === 'deyis' ? 'Deyiş' : item.type}</div>
                                <div className="hidden md:block text-xs text-slate-500 font-mono w-16 text-right">{item.duration}</div>
                                
                                {/* Aksiyonlar */}
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity px-2">
                                    <button className="p-1.5 hover:bg-white/10 rounded-full text-slate-400 hover:text-red-500"><Heart size={16} /></button>
                                    <button className="p-1.5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white"><MoreHorizontal size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* IZGARA GÖRÜNÜMÜ */}
                {viewMode === 'grid' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {filteredMedia.map((item) => (
                            <div 
                                key={item.id} 
                                onClick={(e) => handlePlay(e, item)} 
                                className="group bg-[#1e293b] rounded-xl overflow-hidden border border-white/5 hover:bg-[#283548] transition-all hover:-translate-y-1 cursor-pointer"
                            >
                                <div className="relative aspect-square overflow-hidden bg-slate-800">
                                    <img src={item.image} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    {/* IZGARA PLAY BUTONU */}
                                    <button 
                                        onClick={(e) => handlePlay(e, item)}
                                        className="absolute bottom-2 right-2 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg z-20 hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
                                    >
                                        {currentTrack?.url === item.url && isPlaying ? <Pause size={20} fill="#0f172a" /> : <Play size={20} fill="#0f172a" className="ml-1" />}
                                    </button>
                                </div>
                                <div className="p-3">
                                    <h3 className={`text-sm font-bold truncate ${currentTrack?.url === item.url ? 'text-amber-500' : 'text-white'}`}>{item.title}</h3>
                                    <p className="text-xs text-slate-400 truncate mt-1">{item.artist}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
}