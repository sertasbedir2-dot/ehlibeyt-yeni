import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Play, Pause, Search, Filter, Headphones, Mic, Film, Heart, 
  LayoutGrid, List, BarChart3, ShieldCheck
} from 'lucide-react';
import { musicList } from '../data/musicData'; 
import { useAppContext } from '../context/AppContext'; 

export default function MediaCenter() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState('list');

  const { currentTrack, isPlaying, setCurrentTrack, setIsPlaying } = useAppContext();

  const allMedia = useMemo(() => {
    return musicList ? musicList.map((item, index) => ({
      ...item,
      id: item.id || `archive_${index}`, 
      title: item.title || "İsimsiz Eser",
      artist: item.artist || "Ehlibeyt Külliyatı",
      type: item.category || "Deyişler",
      category: item.category === "Deyişler" ? "deyis" : 
                item.category === "Mersiyeler" ? "mersiye" :
                item.category === "Sohbetler" ? "sohbet" :
                item.category === "Belgeseller" ? "belgesel" : "deyis", 
      duration: "Ses Dosyası",
      image: item.cover || "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=400&auto=format&fit=crop",
      url: item.url, 
      plays: Math.floor(Math.random() * 20000) + 500 
    })) : [];
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
    <div className="min-h-screen bg-[#04151a] text-[#FDF6E3] pb-24 animate-fade-in font-sans">
      <Helmet><title>Sadâ - Medya Kütüphanesi | OnikiKapı</title></Helmet>

      {/* Hero Bölümü */}
      {mostPopularItem && (
          <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden group border-b border-[#C5A059]/20">
            <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[5s] group-hover:scale-105 opacity-60 mix-blend-overlay"
                style={{ backgroundImage: `url(${mostPopularItem.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#04151a] via-[#04151a]/80 to-[#04151a]/40"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6 z-10">
                <div className="space-y-3 max-w-2xl pointer-events-none"> 
                    <span className="inline-flex items-center gap-2 bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                        <BarChart3 size={14} /> Haftanın En Çok Dinleneni
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight line-clamp-2 drop-shadow-md">
                        {mostPopularItem.title}
                    </h1>
                    <div className="flex items-center gap-4 text-slate-300 text-sm md:text-base">
                        <span className="font-bold text-[#C5A059]">{mostPopularItem.artist}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                        <span>{mostPopularItem.type}</span>
                    </div>
                </div>

                <button 
                    onClick={(e) => handlePlay(e, mostPopularItem)}
                    className="bg-[#C5A059] hover:bg-white text-[#04151a] w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.4)] transition-transform hover:scale-110 active:scale-95 cursor-pointer z-50 pointer-events-auto"
                >
                    {currentTrack?.url === mostPopularItem.url && isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>
            </div>
          </div>
      )}

      {/* Kontrol Paneli */}
      <div className="sticky top-[60px] md:top-20 z-30 bg-[#09303a]/95 backdrop-blur-md border-b border-[#C5A059]/20 shadow-xl">
        <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0 custom-scrollbar hide-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                                activeTab === cat.id 
                                ? 'bg-[#C5A059] border-[#C5A059] text-[#04151a] shadow-[0_0_10px_rgba(197,160,89,0.3)]' 
                                : 'bg-transparent border-white/10 text-slate-400 hover:border-[#C5A059]/50 hover:text-white'
                            }`}
                        >
                            {cat.icon}
                            {cat.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-2.5 text-[#C5A059]" size={16} />
                        <input type="text" placeholder="Eser veya sanatçı ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#0b1b24] border border-[#C5A059]/30 rounded-lg py-2 pl-9 pr-4 text-sm text-[#FDF6E3] focus:outline-none focus:border-[#C5A059] transition-colors" />
                    </div>
                    <div className="flex bg-[#0b1b24] rounded-lg p-1 border border-[#C5A059]/20">
                        <button onClick={() => setViewMode('list')} className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-[#C5A059]/20 text-[#C5A059] shadow' : 'text-slate-500 hover:text-white'}`}><List size={18} /></button>
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-[#C5A059]/20 text-[#C5A059] shadow' : 'text-slate-500 hover:text-white'}`}><LayoutGrid size={18} /></button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Gamification Info Banner */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-[#0b1b24] border border-[#C5A059]/30 rounded-xl p-4 flex items-center justify-center gap-3 text-sm text-slate-300 text-center md:text-left shadow-lg">
          <ShieldCheck className="text-[#C5A059]" size={20} />
          <span>Dinlediğiniz her eser ruhunuza şifa, hanenize <strong>+50 HP (Hikmet Puanı)</strong> kazandırır. Eseri sonuna kadar dinlemeniz yeterlidir.</span>
        </div>
      </div>

      {/* Liste */}
      <div className="container mx-auto px-4 mt-6">
        {filteredMedia.length === 0 ? (
            <div className="text-center py-12 text-slate-500 border border-dashed border-[#C5A059]/20 rounded-xl bg-[#09303a]/30">Aradığınız kriterlere uygun eser bulunamadı.</div>
        ) : (
            <>
                {viewMode === 'list' && (
                    <div className="flex flex-col gap-2">
                        {filteredMedia.map((item, index) => (
                            <div 
                                key={item.id} 
                                onClick={(e) => handlePlay(e, item)}
                                className={`group flex items-center px-4 py-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-[#C5A059]/20 cursor-pointer shadow-sm ${currentTrack?.url === item.url ? 'bg-[#09303a] border-[#C5A059]/40' : 'bg-[#0b1b24]'}`}
                            >
                                <div className="w-8 md:w-12 text-center text-sm text-[#C5A059] font-bold group-hover:hidden">
                                    {currentTrack?.url === item.url && isPlaying ? <div className="w-3 h-3 bg-[#C5A059] rounded-full mx-auto animate-pulse"></div> : index + 1}
                                </div>
                                <div className="w-8 md:w-12 text-center hidden group-hover:flex justify-center">
                                    <button onClick={() => handlePlay(item)} className="text-white">
                                        {currentTrack?.url === item.url && isPlaying ? <Pause size={16} className="text-[#C5A059]" /> : <Play size={16} className="text-[#C5A059]" />}
                                    </button>
                                </div>
                                <div className="flex-1 flex items-center gap-4 min-w-0">
                                    <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-white/10 hidden sm:block shadow-md" />
                                    <div className="min-w-0">
                                        <h3 className={`text-base font-bold truncate ${currentTrack?.url === item.url ? 'text-[#C5A059]' : 'text-[#FDF6E3]'}`}>{item.title}</h3>
                                        <p className="text-sm text-slate-400 sm:hidden truncate">{item.artist}</p>
                                    </div>
                                </div>
                                <div className="w-48 text-sm text-slate-400 hidden sm:block truncate pr-4">{item.artist}</div>
                                <div className="w-10 flex justify-center">
                                    <button onClick={(e) => handlePlay(e, item)} className="text-slate-400 hover:text-[#C5A059] p-2 z-10 transition-colors">
                                        {currentTrack?.url === item.url && isPlaying ? <Pause size={20} className="text-[#C5A059]" /> : <Play size={20} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {viewMode === 'grid' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {filteredMedia.map((item) => (
                            <div 
                                key={item.id} 
                                onClick={(e) => handlePlay(e, item)}
                                className={`group bg-[#0b1b24] rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 cursor-pointer shadow-lg ${currentTrack?.url === item.url ? 'border-[#C5A059]/50 shadow-[0_0_15px_rgba(197,160,89,0.2)]' : 'border-white/5 hover:border-[#C5A059]/30'}`}
                            >
                                <div className="relative aspect-square overflow-hidden bg-[#04151a]">
                                    <img src={item.image} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
                                    <button 
                                        onClick={(e) => handlePlay(e, item)}
                                        className="absolute bottom-3 right-3 w-12 h-12 bg-[#C5A059] rounded-full flex items-center justify-center shadow-xl z-20 hover:scale-110 active:scale-95 transition-transform"
                                    >
                                        {currentTrack?.url === item.url && isPlaying ? <Pause size={20} fill="#04151a" className="text-[#04151a]" /> : <Play size={20} fill="#04151a" className="text-[#04151a] ml-1" />}
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h3 className={`text-sm font-bold truncate ${currentTrack?.url === item.url ? 'text-[#C5A059]' : 'text-[#FDF6E3]'}`}>{item.title}</h3>
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