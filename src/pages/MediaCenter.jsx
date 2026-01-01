import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, Mic, Film, Music, X, Share2, Heart, Headphones } from 'lucide-react';
import { musicList } from '../data/musicData';
import { useAppContext } from '../context/AppContext';

const TabButton = ({ id, label, icon, active, onClick }) => (
  <button 
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
      active === id 
      ? "bg-gold text-turquoise-dark shadow-[0_0_15px_rgba(197,160,89,0.3)]" 
      : "bg-[#162e45] text-slate-400 hover:bg-white/10 hover:text-white"
    }`}
  >
    {icon} {label}
  </button>
);

export default function MediaCenter() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // Context Hook
  const { toggleFavorite, isFavorite } = useAppContext();

  const musicMedia = musicList.map((track, index) => ({
    id: `music_${index}`,
    title: track.title,
    category: "deyis",
    type: "Deyiş & Nefes",
    author: "Arşiv Kayıtları",
    thumbnail: "https://images.unsplash.com/photo-1465847899078-b413929f7120?q=80&w=1000&auto=format&fit=crop", 
    audioUrl: track.url, 
    duration: "Ses Dosyası"
  }));

  const videoMedia = [
    {
      id: 1,
      title: "Kerbela'nın Hakikati",
      category: "sohbet",
      type: "Sohbet",
      author: "Şeyh Ahmed Vaezi",
      thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop", 
      youtubeId: "dQw4w9WgXcQ", 
      duration: "45:20"
    },
    {
      id: 2,
      title: "Ey Alemlerin Rabbi",
      category: "mersiye",
      type: "Mersiye/Ağıt",
      author: "Basim Karbalaei",
      thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop",
      youtubeId: "VIDEO_ID_HERE",
      duration: "08:15"
    },
    {
      id: 3,
      title: "12 İmam Belgeseli",
      category: "belgesel",
      type: "Belgesel",
      author: "Ehlibeyt Yolu Yapım",
      thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop",
      youtubeId: "VIDEO_ID_HERE",
      duration: "25:00"
    },
    {
      id: 4,
      title: "Nadi Ali Duası",
      category: "mersiye",
      type: "Dua & Zikir",
      author: "Grup Taha",
      thumbnail: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1000&auto=format&fit=crop",
      youtubeId: "VIDEO_ID_HERE",
      duration: "05:30"
    }
  ];

  const mediaList = [...musicMedia, ...videoMedia];

  const filteredMedia = activeTab === "all" 
    ? mediaList 
    : mediaList.filter(item => item.category === activeTab);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <Helmet>
        <title>Medya Merkezi | OnikiKapı</title>
        <meta name="description" content="Ehlibeyt mektebine dair sohbetler, mersiyeler, deyişler ve belgeseller." />
      </Helmet>

      {/* HERO SECTION */}
      <div className="relative h-[400px] md:h-[500px] rounded-b-3xl overflow-hidden group">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1596483756214-77ae312d8376?q=80&w=2000&auto=format&fit=crop')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-turquoise-dark via-turquoise-dark/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 w-full md:w-2/3 space-y-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Yeni</span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-white leading-tight">Aşura'nın Mesajı</h1>
          <p className="text-slate-200 text-lg font-serif line-clamp-2">İmam Hüseyin'in (a.s) kıyamının evrensel mesajı üzerine belgesel.</p>
          <button className="bg-gold text-turquoise-dark px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-colors">
            <Play fill="currentColor" size={20} /> Hemen İzle
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-4 px-4 sticky top-24 z-30 py-4 bg-turquoise-dark/95 backdrop-blur-sm border-y border-gold/20">
        <TabButton id="all" label="Tümü" icon={<Film size={18} />} active={activeTab} onClick={setActiveTab} />
        <TabButton id="deyis" label="Deyişler" icon={<Headphones size={18} />} active={activeTab} onClick={setActiveTab} />
        <TabButton id="sohbet" label="Sohbetler" icon={<Mic size={18} />} active={activeTab} onClick={setActiveTab} />
        <TabButton id="mersiye" label="Mersiye" icon={<Music size={18} />} active={activeTab} onClick={setActiveTab} />
        <TabButton id="belgesel" label="Belgeseller" icon={<Film size={18} />} active={activeTab} onClick={setActiveTab} />
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredMedia.map((media) => {
          const isFav = isFavorite(media.id);
          return (
            <div key={media.id} className="group bg-[#162e45] rounded-xl overflow-hidden border border-white/5 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 shadow-xl">
              <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(media)}>
                <img src={media.thumbnail} alt={media.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center">
                   <div className="w-12 h-12 bg-gold/90 rounded-full flex items-center justify-center text-midnight opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                      {media.audioUrl ? <Headphones size={20} /> : <Play fill="currentColor" className="ml-1" size={20} />}
                   </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-mono">{media.duration}</span>
              </div>
              <div className="p-4 space-y-2">
                 <div className="flex justify-between items-start">
                   <span className="text-xs font-bold text-turquoise-light uppercase">{media.type}</span>
                   <button onClick={() => toggleFavorite(media)} className={`transition transform active:scale-90 ${isFav ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`} title={isFav ? "Heybeden Çıkar" : "Heybeye Ekle"}>
                     <Heart size={20} fill={isFav ? "currentColor" : "none"} />
                   </button>
                 </div>
                 <h3 className="text-lg font-bold text-sand font-sans group-hover:text-gold line-clamp-1">{media.title}</h3>
                 <p className="text-sm text-slate-400 flex items-center gap-2"><Mic size={14} /> {media.author}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-5xl bg-[#162e45] rounded-2xl overflow-hidden border border-gold/20 shadow-2xl flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-white/10">
               <h3 className="text-xl font-bold text-gold truncate pr-4">{selectedVideo.title}</h3>
               <button onClick={() => setSelectedVideo(null)} className="text-slate-400 hover:text-white transition"><X size={28} /></button>
            </div>
            
            <div className="relative bg-black flex flex-col items-center justify-center">
               {selectedVideo.youtubeId ? (
                 <div className="w-full relative pt-[56.25%]">
                   <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`} title={selectedVideo.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                 </div>
               ) : (
                 <div className="w-full py-12 flex flex-col items-center gap-6 bg-gradient-to-b from-turquoise-dark to-midnight">
                    <div className="w-48 h-48 rounded-full border-4 border-gold/30 overflow-hidden shadow-[0_0_30px_rgba(197,160,89,0.3)] animate-spin-slow">
                      <img src={selectedVideo.thumbnail} className="w-full h-full object-cover" alt="Album Art" />
                    </div>
                    <div className="w-full max-w-md px-6">
                      <audio controls autoPlay className="w-full" src={selectedVideo.audioUrl}>Tarayıcınız sesi desteklemiyor.</audio>
                    </div>
                    <div className="text-center">
                        <p className="text-turquoise-light font-bold animate-pulse">Şu an çalıyor...</p>
                        <p className="text-sm text-slate-400">{selectedVideo.author}</p>
                    </div>
                 </div>
               )}
            </div>

            <div className="p-6 flex justify-between items-center bg-midnight">
               <div>
                   <p className="text-white font-bold">{selectedVideo.author}</p>
                   <p className="text-xs text-slate-400">{selectedVideo.type}</p>
               </div>
               <button className="flex items-center gap-2 text-sand hover:text-gold transition text-sm font-bold bg-white/5 px-4 py-2 rounded-lg"><Share2 size={16} /> Paylaş</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}