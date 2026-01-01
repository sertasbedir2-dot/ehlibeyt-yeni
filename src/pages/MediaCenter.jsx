import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async'; // Bu paket yüklü olmalı
import { Play, Mic, Film, Music, X, Share2, Heart } from 'lucide-react';

// --- YARDIMCI BİLEŞEN (En Üste Aldık) ---
const TabButton = ({ id, label, icon, active, onClick }) => (
  <button 
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
      active === id 
      ? "bg-gold text-midnight shadow-[0_0_15px_rgba(197,160,89,0.3)]" 
      : "bg-[#162e45] text-slate-400 hover:bg-white/10 hover:text-white"
    }`}
  >
    {icon} {label}
  </button>
);

// --- ANA BİLEŞEN ---
export default function MediaCenter() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);

  // --- MEDYA VERİTABANI ---
  const mediaList = [
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

  // Filtreleme
  const filteredMedia = activeTab === "all" 
    ? mediaList 
    : mediaList.filter(item => item.category === activeTab);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <Helmet>
        <title>Medya Merkezi | Ehlibeyt Yolu</title>
        <meta name="description" content="Ehlibeyt mektebine dair sohbetler, mersiyeler ve belgeseller." />
      </Helmet>

      {/* HERO SECTION */}
      <div className="relative h-[400px] md:h-[500px] rounded-b-3xl overflow-hidden group">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1596483756214-77ae312d8376?q=80&w=2000&auto=format&fit=crop')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-8 w-full md:w-2/3 space-y-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Yeni</span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-white leading-tight">Aşura'nın Mesajı</h1>
          <p className="text-slate-300 text-lg font-serif line-clamp-2">İmam Hüseyin'in (a.s) kıyamının evrensel mesajı üzerine belgesel.</p>
          <button className="bg-gold text-midnight px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-colors">
            <Play fill="currentColor" size={20} /> Hemen İzle
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-4 px-4 sticky top-24 z-30 py-4 bg-midnight/90 backdrop-blur-sm border-y border-white/5">
        <TabButton id="all" label="Tümü" icon={<Film size={18} />} active={activeTab} onClick={setActiveTab} />
        <TabButton id="sohbet" label="Sohbetler" icon={<Mic size={18} />} active={activeTab} onClick={setActiveTab} />
        <TabButton id="mersiye" label="Mersiye" icon={<Music size={18} />} active={activeTab} onClick={setActiveTab} />
        <TabButton id="belgesel" label="Belgeseller" icon={<Film size={18} />} active={activeTab} onClick={setActiveTab} />
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredMedia.map((media) => (
          <div key={media.id} className="group bg-[#162e45] rounded-xl overflow-hidden border border-white/5 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 shadow-xl">
            <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(media)}>
              <img src={media.thumbnail} alt={media.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center">
                 <div className="w-12 h-12 bg-gold/90 rounded-full flex items-center justify-center text-midnight opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                    <Play fill="currentColor" className="ml-1" size={20} />
                 </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-mono">{media.duration}</span>
            </div>
            <div className="p-4 space-y-2">
               <div className="flex justify-between items-start">
                 <span className="text-xs font-bold text-spiritual-light uppercase">{media.type}</span>
                 <button className="text-slate-400 hover:text-red-500 transition"><Heart size={16} /></button>
               </div>
               <h3 className="text-lg font-bold text-sand font-sans group-hover:text-gold line-clamp-1">{media.title}</h3>
               <p className="text-sm text-slate-400 flex items-center gap-2"><Mic size={14} /> {media.author}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-5xl bg-[#162e45] rounded-2xl overflow-hidden border border-gold/20 shadow-2xl flex flex-col">
            <div className="p-4 flex justify-between items-center border-b border-white/10">
               <h3 className="text-xl font-bold text-gold">{selectedVideo.title}</h3>
               <button onClick={() => setSelectedVideo(null)} className="text-slate-400 hover:text-white transition"><X size={28} /></button>
            </div>
            <div className="relative pt-[56.25%] bg-black">
               <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`} title={selectedVideo.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="p-6 flex justify-between items-center bg-midnight">
               <div><p className="text-white font-bold">{selectedVideo.author}</p><p className="text-xs text-slate-400">{selectedVideo.type}</p></div>
               <button className="flex items-center gap-2 text-sand hover:text-gold transition text-sm font-bold bg-white/5 px-4 py-2 rounded-lg"><Share2 size={16} /> Paylaş</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}