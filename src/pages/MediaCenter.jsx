import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, Mic, Film, Music, X, Share2, Heart } from 'lucide-react';

export default function MediaCenter() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);

  // --- MEDYA VERİTABANI (Youtube Embed ID'leri ile) ---
  const mediaList = [
    {
      id: 1,
      title: "Kerbela'nın Hakikati",
      category: "sohbet",
      type: "Sohbet",
      author: "Şeyh Ahmed Vaezi",
      thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1000&auto=format&fit=crop", // Temsili Görsel
      youtubeId: "dQw4w9WgXcQ", // Örnek ID (Kendi video ID'lerinizi buraya koyacaksınız)
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
      title: "12 İmam Belgeseli - 1. Bölüm",
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

  // Filtreleme Fonksiyonu
  const filteredMedia = activeTab === "all" 
    ? mediaList 
    : mediaList.filter(item => item.category === activeTab);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <Helmet>
        <title>Medya Merkezi | Ehlibeyt Yolu</title>
        <meta name="description" content="Ehlibeyt mektebine dair sohbetler, mersiyeler, belgeseller ve görsel içerikler." />
      </Helmet>

      {/* --- HERO (ÖNE ÇIKAN VİDEO) --- */}
      <div className="relative h-[400px] md:h-[500px] rounded-b-3xl overflow-hidden group">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1596483756214-77ae312d8376?q=80&w=2000&auto=format&fit=crop')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-8 w-full md:w-2/3 space-y-4">
          <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Yeni Eklendi</span>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-white leading-tight">
            Aşura'nın Mesajı
          </h1>
          <p className="text-slate-300 text-lg font-serif line-clamp-2">
            İmam Hüseyin'in (a.s) kıyamının evrensel mesajı ve günümüze yansımaları üzerine derinlemesine bir belgesel çalışma.
          </p>
          <button className="bg-gold text-midnight px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-colors">
            <Play fill="currentColor" size={20} /> Hemen İzle
          </button>
        </div>
      </div>

      {/* --- KATEGORİ TABLARI --- */}
      <div className="flex flex-wrap justify-center gap-4 px-4 sticky top-24 z-30 py-4 bg-midnight/90 backdrop-blur-sm border-y border-white/5">
        <TabButton id="all" label="Tümü" icon={<Film size={18} />} active={activeTab} onClick={setActiveTab} />
        <TabButton id="sohbet" label="Sohbetler" icon={<Mic size={18} />} active={activeTab} onClick={setActiveTab} />
        <TabButton id="mersiye" label="Mersiye & Ağıt" icon={<Music size={18} />} active={activeTab} onClick={setActiveTab} />
        <TabButton id="belgesel" label="Belgeseller" icon={<Film size={18} />} active={activeTab} onClick={setActiveTab} />
      </div>

      {/* --- VİDEO LİSTESİ --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredMedia.map((media) => (
          <div key={media.id} className="group bg-[#162e45] rounded-xl overflow-hidden border border-white/5 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 shadow-xl">
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(media)}>
              <img src={media.thumbnail} alt={media.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                 <div className="w-12 h-12 bg-gold/90 rounded-full flex items-center justify-center text-midnight opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Play fill="currentColor" className="ml-1" size={20} />
                 </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-mono">
                {media.duration}
              </span>
            </div>

            {/* İçerik Bilgisi */}
            <div className="p-4 space-y-2">
               <div className="flex justify-between items-start">
                 <span className="text-xs font-bold text-spiritual-light uppercase tracking-wider">{media.type}</span>
                 <button className="text-slate-400 hover:text-red-500 transition"><Heart size={16} /></button>
               </div>
               <h3 className="text-lg font-bold text-sand font-sans group-hover:text-gold transition-colors line-clamp-1">
                 {media.title}
               </h3>
               <p className="text-sm text-slate-400 flex items-center gap-2">
                 <Mic size={14} /> {media.author}
               </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- VİDEO OYNATICI MODAL --- */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-5xl bg-[#162e45] rounded-2xl overflow-hidden border border-gold/20 shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 flex justify-between items-center border-b border-white/10">
               <h3 className="text-xl font-bold text-gold">{selectedVideo.title}</h3>
               <button onClick={() => setSelectedVideo(null)} className="text-slate-4