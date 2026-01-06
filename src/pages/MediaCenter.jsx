import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Play, Pause, Search, Filter, Headphones, Mic, Film, Heart, 
  LayoutGrid, List, BarChart3
} from 'lucide-react';
import { musicList } from '../data/musicData'; 
import { mediaContent } from '../data/mediaData'; 
import { useAppContext } from '../context/AppContext'; 

export default function MediaCenter() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState('list');

  // Context Bağlantısı
  const { currentTrack, isPlaying, setCurrentTrack, setIsPlaying } = useAppContext();

  // Veri Birleştirme
  const allMedia = useMemo(() => {
    // Eski müzik listesi
    const archiveDeys = musicList ? musicList.map((item, index) => ({
      ...item,
      id: item.id || `archive_${index}`, 
      title: item.title || "İsimsiz Eser",
      artist: item.artist || "Deyişler & Nefesler",
      type: "Deyiş & Nefes",
      category: "deyis", 
      duration: "Ses Dosyası",
      image: item.cover || "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop",
      url: item.url, 
      plays: Math.floor(Math.random() * 20000) + 500 
    })) : [];

    // Yeni medya içerikleri
    const visualContent = mediaContent.map(item => ({
        ...item,
        plays: Math.floor(Math.random() * 50000) + 1000
    }));

    return [...visualContent, ...archiveDeys];
  }, []);

  // En Popüler Eser
  const mostPopularItem = useMemo(() => {
    const playableItems = allMedia.filter(i => i.url);
    if (playableItems.length === 0) return null;
    return playableItems.sort((a, b) => b.plays - a.plays)[0];
  }, [allMedia]);

  // Filtreleme
  const filteredMedia = allMedia.filter(item => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch = (item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.artist || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Oynatma Fonksiyonu
  const handlePlay = (e, item) => {
    if(e && e.stopPropagation) e.stopPropagation(); 
    
    if (!item.url) {
        alert("Bu eserin ses dosyası (URL) bulunamadı.");
        return;
    }

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
      <Helmet><title>Medya Kütüphanesi | OnikiKapı</title></Helmet>

      {/* Hero Bölümü */}
      {mostPopularItem && (
          <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden group border-b border-white/5">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[5s] group-hover:scale-105 opacity-60"
                style={{ backgroundImage: `url(${mostPopularItem.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
            
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

                <button 
                    onClick={(e) => handlePlay(e, mostPopularItem)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-900 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-transform hover:scale-110 active:scale-95 cursor-pointer z-50 pointer-events-auto"
                >
                    {currentTrack?.url === mostPopularItem.url && isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>
            </div>
          </div>
      )}

      {/* Kontrol Paneli */}
      <div className="sticky top-0 z-30 bg-[#0f172a]/95 backdrop-blur-md border-b border-white/5 shadow-xl">
        <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                                activeTab === cat.id 
                                ? 'bg-amber-500 border-amber-500 text-slate-900' 
                                : 'bg-transparent border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
                            }`}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                        <input type="text" placeholder="Ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#1e293b] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-200 focus:outline-none focus:border-amber-500/50" />
                    </div>
                    <div className="flex bg-[#1e293b] rounded-lg p-1 border border-white/10">
                        <button onClick={() => setViewMode('list')} className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-slate-600 text-white shadow' : 'text-slate-500 hover:text-white'}`}><List size={18} /></button>
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-slate-600 text-white shadow' : 'text-slate-500 hover:text-white'}`}><LayoutGrid size={18} /></button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Liste */}
      <div className="container mx-auto px-4 mt-8">
        {filteredMedia.length === 0 ? (
            <div className="text-center py-12 text-slate-500 border border-dashed border-white/10 rounded-xl">Aradığınız kriterlere uygun eser bulunamadı.</div>
        ) : (
            <>
                {viewMode === 'list' && (
                    <div className="flex flex-col gap-1">
                        {filteredMedia.map((item, index) => (
                            <div 
                                key={item.id} 
                                onClick={(e) => handlePlay(e, item)}
                                className={`group flex items-center px-3 py-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer ${currentTrack?.url === item.url ? 'bg-white/5 border-amber-500/20' : ''}`}
                            >
                                <div className="w-8 md:w-12 text-center text-sm text-slate-500 group-hover:hidden">
                                    {currentTrack?.url === item.url && isPlaying ? <div className="w-3 h-3 bg-green-500 rounded-full mx-auto animate-pulse"></div> : index + 1}
                                </div>
                                <div className="w-8 md:w-12 text-center hidden group-hover:flex justify-center">
                                    <button onClick={() => handlePlay(item)} className="text-white">
                                        {currentTrack?.url === item.url && isPlaying ? <Pause size={16} className="text-amber-500" /> : <Play size={16} />}
                                    </button>
                                </div>
                                <div className="flex-1 flex items-center gap-3 min-w-0">
                                    <img src={item.image} alt="" className="w-10 h-10 rounded object-cover bg-slate-800 hidden sm:block" />
                                    <div className="min-w-0">
                                        <h3 className={`text-sm font-bold truncate ${currentTrack?.url === item.url ? 'text-amber-500' : 'text-slate-200'}`}>{item.title}</h3>
                                        <p className="text-xs text-slate-500 sm:hidden truncate">{item.artist}</p>
                                    </div>
                                </div>
                                <div className="w-48 text-sm text-slate-400 hidden sm:block truncate pr-4">{item.artist}</div>
                                <div className="w-10 flex justify-center">
                                    <button onClick={(e) => handlePlay(e, item)} className="text-white hover:text-amber-500 p-2 z-10">
                                        {currentTrack?.url === item.url && isPlaying ? <Pause size={18} className="text-amber-500" /> : <Play size={18} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

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
                                    <button 
                                        onClick={(e) => handlePlay(e, item)}
                                        className="absolute bottom-2 right-2 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg z-20 hover:scale-110 transition-transform"
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