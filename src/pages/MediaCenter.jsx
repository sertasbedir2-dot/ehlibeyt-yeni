import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Play, Pause, Search, Filter, Headphones, Video, Mic, Film, Heart, Share2, 
  MoreHorizontal, LayoutGrid, List, BarChart3, AlertCircle
} from 'lucide-react';
import { musicList } from '../data/musicData'; 
import { mediaContent } from '../data/mediaData'; 
import { useAppContext } from '../context/AppContext'; 

export default function MediaCenter() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState('list');

  // CONTEXT BAĞLANTISI
  const context = useAppContext();
  // Eğer context null ise bağlantı hatası var demektir
  if (!context) {
      console.error("HATA: AppContext bulunamadı! App.jsx dosyasında <AppProvider> var mı?");
  }
  const { currentTrack, isPlaying, setCurrentTrack, setIsPlaying } = context || {};

  // --- VERİ HARMANLAMA ---
  const allMedia = useMemo(() => {
    const archiveDeys = musicList ? musicList.map((item, index) => ({
      ...item,
      id: item.id || `archive_${index}`, 
      title: item.title || "İsimsiz Eser",
      artist: item.artist || "Deyişler & Nefesler",
      type: "Deyiş & Nefes",
      category: "deyis", 
      duration: "Ses Dosyası",
      image: item.cover || "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop",
      url: item.url, // URL BURADA OLMALI
      plays: Math.floor(Math.random() * 20000) + 500 
    })) : [];

    const visualContent = mediaContent.map(item => ({
        ...item,
        plays: Math.floor(Math.random() * 50000) + 1000
    }));

    return [...visualContent, ...archiveDeys];
  }, []);

  const mostPopularItem = useMemo(() => {
    const playableItems = allMedia.filter(i => i.url);
    if (playableItems.length === 0) return null;
    return playableItems.sort((a, b) => b.plays - a.plays)[0];
  }, [allMedia]);

  const filteredMedia = allMedia.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = (item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.artist || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // --- OYNATMA TETİKLEYİCİSİ ---
  const handlePlay = (e, item) => {
    if(e && e.stopPropagation) e.stopPropagation(); // Tıklama çakışmasını önle
    
    console.log("🟡 MEDYA: Oynatma İsteği Gönderildi ->", item.title);
    
    if (!item.url) {
        alert("❌ HATA: Bu eserin bağlantısı (URL) yok!");
        return;
    }

    if (!setCurrentTrack) {
        alert("❌ KRİTİK HATA: Müzik çalar fonksiyonu (setCurrentTrack) bulunamadı. App.jsx dosyasını kontrol et!");
        return;
    }

    // Çaları Tetikle
    if (currentTrack?.url === item.url) {
        console.log("🟢 Durum Değiştiriliyor (Play/Pause)");
        setIsPlaying(!isPlaying);
    } else {
        console.log("🟢 Yeni Eser Yükleniyor...");
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
      <Helmet><title>Medya Kütüphanesi | OnikiKapı</title></Helmet>

      {/* --- HERO BÖLÜMÜ --- */}
      {mostPopularItem && (
          <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden group border-b border-white/5">
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${mostPopularItem.image})` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6 z-10">
                <div className="space-y-3 max-w-2xl pointer-events-none"> 
                    <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-500 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                        <BarChart3 size={14} /> Haftanın En Çok Dinleneni
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight line-clamp-2">{mostPopularItem.title}</h1>
                    <div className="flex items-center gap-4 text-slate-300 text-sm md:text-base">
                        <span className="font-bold text-white">{mostPopularItem.artist}</span>
                        <span>{mostPopularItem.type}</span>
                    </div>
                </div>
                {/* HERO PLAY BUTTON */}
                <button 
                    onClick={(e) => handlePlay(e, mostPopularItem)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-900 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer z-50 pointer-events-auto"
                >
                    {currentTrack?.url === mostPopularItem.url && isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>
            </div>
          </div>
      )}

      {/* --- KONTROL PANELİ --- */}
      <div className="sticky top-0 z-30 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/5 shadow-xl p-4">
         <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map((cat) => (
                    <button key={cat.id} onClick={() => setActiveTab(cat.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all border ${activeTab === cat.id ? 'bg-amber-500 border-amber-500 text-slate-900' : 'border-white/10 text-slate-400'}`}>{cat.icon} {cat.label}</button>
                ))}
            </div>
            <div className="flex gap-2 items-center">
                <div className="hidden md:block relative"><Search className="absolute left-3 top-2.5 text-slate-500" size={16} /><input type="text" placeholder="Ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-[#1e293b] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:border-amber-500 outline-none"/></div>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}><List size={20}/></button>
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}><LayoutGrid size={20}/></button>
            </div>
         </div>
      </div>

      {/* --- LİSTE --- */}
      <div className="container mx-auto px-4 mt-8">
        {filteredMedia.length === 0 ? <div className="text-center py-10 text-slate-500">İçerik bulunamadı.</div> : (
            <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4" : "flex flex-col gap-2"}>
                {filteredMedia.map((item, index) => (
                    <div 
                        key={item.id} 
                        onClick={(e) => handlePlay(e, item)}
                        className={`group cursor-pointer hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 ${viewMode === 'grid' ? 'bg-[#1e293b] rounded-xl p-3' : 'flex items-center p-3 rounded-lg bg-[#1e293b]/50'}`}
                    >
                        {/* RESİM */}
                        <div className={`relative overflow-hidden bg-slate-800 ${viewMode === 'grid' ? 'aspect-square rounded-lg mb-3' : 'w-12 h-12 rounded-md mr-4'}`}>
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                            {/* PLAY İKONU */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                {currentTrack?.url === item.url && isPlaying ? <Pause className="text-white" size={viewMode === 'grid' ? 32 : 20} /> : <Play className="text-white" size={viewMode === 'grid' ? 32 : 20} />}
                            </div>
                        </div>
                        
                        {/* BİLGİLER */}
                        <div className="flex-1 min-w-0">
                            <h3 className={`font-bold truncate ${currentTrack?.url === item.url ? 'text-amber-500' : 'text-white'} ${viewMode === 'grid' ? 'text-sm' : 'text-base'}`}>{item.title}</h3>
                            <p className="text-xs text-slate-400 truncate">{item.artist}</p>
                        </div>

                        {/* LİSTE MODUNDA SAĞ TARAF */}
                        {viewMode === 'list' && (
                            <div className="flex items-center gap-4 text-slate-500 text-sm">
                                <span className="hidden md:block">{item.type}</span>
                                <span className="font-mono text-xs">{item.duration}</span>
                                <button className="hover:text-white"><MoreHorizontal size={18}/></button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}