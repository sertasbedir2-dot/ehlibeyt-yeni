import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Play, Pause, AlertCircle } from 'lucide-react';
import { musicList } from '../data/musicData'; 
import { useAppContext } from '../context/AppContext'; 

export default function MediaCenter() {
  const { currentTrack, isPlaying, setCurrentTrack, setIsPlaying } = useAppContext();
  
  // TEŞHİS: Gelen veriyi kontrol et
  const firstItem = musicList && musicList.length > 0 ? musicList[0] : null;

  const handlePlay = (item) => {
    // URL BULMA MANTIĞI (En yaygın ihtimaller)
    const audioUrl = item.url || item.src || item.audio || item.link || item.mp3;

    if (!audioUrl) {
      alert(`HATA: Bu eserin linki bulunamadı!\nBaktığım yerler: url, src, audio, link, mp3.\n\nEser Verisi: ${JSON.stringify(item)}`);
      return;
    }

    // Oynatıcıya gönderilecek veri (Player ne bekliyorsa onu verelim)
    const trackData = {
        ...item, // Eski veriyi koru
        url: audioUrl, // Linki garantiye al
        title: item.title || item.name || "Bilinmeyen Eser",
        cover: item.image || item.cover || "https://placehold.co/100"
    };

    console.log("Oynatıcıya Giden Veri:", trackData);

    if (currentTrack?.url === audioUrl) {
        setIsPlaying(!isPlaying);
    } else {
        setCurrentTrack(trackData);
        setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10 font-sans">
      <Helmet><title>Medya Test | OnikiKapı</title></Helmet>

      <h1 className="text-3xl font-bold mb-6 text-amber-500">🛠️ MEDYA ARIZA TESPİT EKRANI</h1>

      {/* --- TANI RAPORU --- */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8 font-mono text-sm">
        <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <AlertCircle /> SİSTEM RAPORU
        </h3>
        {firstItem ? (
            <div className="space-y-2">
                <p>✅ <span className="text-green-400">musicList bulundu.</span> ({musicList.length} eser)</p>
                <p>🔍 <strong>İlk Eserin Yapısı:</strong></p>
                <pre className="bg-black p-4 rounded text-xs text-green-500 overflow-auto">
                    {JSON.stringify(firstItem, null, 2)}
                </pre>
                <p className="text-slate-400 mt-2">
                    Yukarıdaki kutuda "url", "src" veya "http..." ile başlayan bir satır görüyor musun?
                </p>
            </div>
        ) : (
            <p className="text-red-500 font-bold">❌ HATA: musicList boş veya okunamadı!</p>
        )}
      </div>

      {/* --- BASİT OYNATMA TESTİ --- */}
      <div className="grid gap-4">
        {musicList && musicList.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-slate-800 p-4 rounded-lg border border-slate-700">
                <span>{index + 1}. {item.title || item.name || "İsimsiz"}</span>
                <button 
                    onClick={() => handlePlay(item)}
                    className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-bold flex items-center gap-2"
                >
                    <Play size={16} /> TEST ET (OYNAT)
                </button>
            </div>
        ))}
      </div>
    </div>
  );
}