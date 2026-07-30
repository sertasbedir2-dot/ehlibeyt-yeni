// src/pages/IrfanAgi.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Youtube, Globe, Twitter, Instagram, ExternalLink, Search } from 'lucide-react';
import { creatorData } from '../data/creatorData';

export default function IrfanAgi() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCreators = creatorData.filter(creator => 
    creator.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    creator.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creator.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="animate-fade-in pb-10">
      <Helmet>
        <title>İrfan Ağı | OnikiKapı</title>
        <meta name="description" content="Ehl-i Beyt muhibbi içerik üreticileri, kanallar ve yazarların buluşma noktası." />
      </Helmet>

      {/* Başlık ve Kanca */}
      <div className="text-center mb-10 mt-6 relative z-10">
        <div className="inline-flex items-center justify-center p-3 bg-[#C5A059]/10 rounded-full mb-4 border border-[#C5A059]/20 shadow-[0_0_15px_rgba(197,160,89,0.2)]">
          <Users size={32} className="text-[#C5A059]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#FDF6E3] font-serif tracking-tight mb-4 drop-shadow-md">
          İrfan Ağı <span className="text-[#C5A059]">&</span> Dijital Meclis
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
          Hakikatin sesini dijital çağda duyuran modern raviler, kanallar ve kalemler. İlim ağımıza katılın ve bu meclisi büyütün.
        </p>
      </div>

      {/* Arama Çubuğu */}
      <div className="max-w-xl mx-auto mb-10 relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-[#C5A059]/50 group-focus-within:text-[#C5A059] transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Kanal, yazar veya konu (Örn: Nehcü'l Belağa) ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#09303a]/50 border border-[#C5A059]/30 rounded-xl py-4 pl-12 pr-4 text-[#FDF6E3] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 focus:border-[#C5A059] transition-all backdrop-blur-sm shadow-inner font-sans"
        />
      </div>

      {/* Bento Grid Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredCreators.length > 0 ? (
          filteredCreators.map((creator) => (
            <div key={creator.id} className="bg-[#0b1b24] border border-[#C5A059]/20 rounded-2xl p-6 hover:-translate-y-1 hover:border-[#C5A059]/60 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(197,160,89,0.15)] flex flex-col h-full group">
              <div className="flex items-start gap-4 mb-4">
                <img src={creator.avatar} alt={creator.name} className="w-16 h-16 rounded-full border-2 border-[#09303a] group-hover:border-[#C5A059] transition-colors shadow-md object-cover" />
                <div>
                  <h3 className="text-xl font-bold text-[#FDF6E3] group-hover:text-[#C5A059] transition-colors line-clamp-1">{creator.name}</h3>
                  <span className="text-xs font-bold text-[#93c5fd] uppercase tracking-wider bg-[#93c5fd]/10 px-2 py-1 rounded-md inline-block mt-1">{creator.category}</span>
                </div>
              </div>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                {creator.description}
              </p>

              {/* Etiketler */}
              <div className="flex flex-wrap gap-2 mb-6">
                {creator.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-mono text-slate-400 border border-slate-700 px-2 py-1 rounded-full">#{tag}</span>
                ))}
              </div>

              {/* Platform Butonları */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                {creator.platforms.youtube && (
                  <a href={creator.platforms.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors" title="YouTube">
                    <Youtube size={18} />
                  </a>
                )}
                {creator.platforms.website && (
                  <a href={creator.platforms.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#C5A059]/10 text-[#C5A059] rounded-lg hover:bg-[#C5A059] hover:text-[#04151a] transition-colors" title="Web Sitesi">
                    <Globe size={18} />
                  </a>
                )}
                {creator.platforms.twitter && (
                  <a href={creator.platforms.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-colors" title="Twitter / X">
                    <Twitter size={18} />
                  </a>
                )}
                {creator.platforms.instagram && (
                  <a href={creator.platforms.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-pink-500/10 text-pink-400 rounded-lg hover:bg-pink-500 hover:text-white transition-colors" title="Instagram">
                    <Instagram size={18} />
                  </a>
                )}
                <div className="ml-auto text-slate-500 group-hover:text-[#C5A059] transition-colors">
                   <ExternalLink size={16} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-slate-400 italic">
            Bu kriterlere uygun bir üretici bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
}