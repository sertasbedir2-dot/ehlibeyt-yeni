import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../context/AppContext';
import { Play, Heart, Trash2, Headphones, Film } from 'lucide-react';

export default function Favorites() {
  const { favorites, toggleFavorite, playAllFavorites } = useAppContext();

  return (
    <div className="space-y-8 animate-fade-in pb-12 min-h-[70vh]">
      <Helmet>
        <title>Heybem | OnikiKapı</title>
      </Helmet>

      {/* HERO */}
      <div className="text-center space-y-4 py-12 bg-gradient-to-b from-turquoise-dark to-[#162e45] rounded-b-3xl border-b border-gold/10">
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand">
          Manevi Heybem
        </h1>
        <p className="text-slate-300 font-serif text-lg">
          Kalbinize dokunan ve biriktirdiğiniz eserler.
        </p>
        
        {favorites.length > 0 && (
          <button 
            onClick={playAllFavorites}
            className="mt-4 bg-gold text-midnight px-8 py-3 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
          >
            <Play fill="currentColor" size={20} /> Tümünü Çal
          </button>
        )}
      </div>

      {/* LİSTE */}
      <div className="max-w-6xl mx-auto px-4">
        {favorites.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <Heart size={60} className="mx-auto mb-4 text-slate-600" />
            <p className="text-xl font-serif">Heybeniz henüz boş.</p>
            <p className="text-sm">Medya merkezinden sevdiğiniz eserleri ekleyebilirsiniz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div key={item.media_id} className="bg-[#162e45] rounded-xl p-4 border border-white/5 flex gap-4 items-center group hover:border-gold/30 transition-all">
                {/* Görsel */}
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    {item.audioUrl ? <Headphones size={16} className="text-white" /> : <Film size={16} className="text-white" />}
                  </div>
                </div>
                
                {/* Bilgi */}
                <div className="flex-grow min-w-0">
                  <h4 className="text-sand font-bold text-sm truncate">{item.title}</h4>
                  <p className="text-slate-400 text-xs truncate">{item.author}</p>
                  <span className="text-[10px] text-turquoise-light uppercase tracking-wider">{item.type}</span>
                </div>

                {/* Sil Butonu */}
                <button 
                  onClick={() => toggleFavorite({ id: item.media_id })}
                  className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-500/10 rounded-full transition"
                  title="Heybeden Çıkar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}