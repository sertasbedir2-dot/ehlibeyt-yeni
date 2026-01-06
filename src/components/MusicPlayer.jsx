import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, Maximize2, Minimize2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function MusicPlayer() {
  // Context bağlantısı güvenli mi kontrol et
  const context = useAppContext();
  if (!context) return null; // Context yoksa hiç render etme (Çökmesini önler)
  
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = context;
  const audioRef = useRef(null);
  
  // State Tanımları
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [error, setError] = useState(false);

  // EĞER ŞARKI SEÇİLMEMİŞSE HİÇ GÖSTERME
  if (!currentTrack) return null;

  // GÜVENLİ VERİ ÇIKARTMA (Çökme Önleyici)
  // Gelen verinin içinde url, file, src ne varsa onu yakala
  const audioSrc = currentTrack.url || currentTrack.file || currentTrack.src || "";
  
  // Resim yoksa varsayılan resim koy
  const coverImage = currentTrack.image || currentTrack.cover || currentTrack.thumbnail || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200";
  const title = currentTrack.title || "Bilinmeyen Eser";
  const artist = currentTrack.artist || "OnikiKapı";

  // --- MOTOR: ŞARKI DEĞİŞİNCE ÇAL ---
  useEffect(() => {
    // Şarkı değişince hatayı sıfırla
    setError(false);
    
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Oynatma başarılı
            })
            .catch(err => {
              console.error("Oynatma Hatası:", err);
              // Otomatik oynatma engellendiyse veya hata varsa durdur
              setIsPlaying(false);
            });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying, setIsPlaying]);

  // --- SÜRE TAKİBİ ---
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      // Sayı değilse (NaN) 0 yap ki çökmesin
      const curr = isNaN(audioRef.current.currentTime) ? 0 : audioRef.current.currentTime;
      const dur = isNaN(audioRef.current.duration) ? 0 : audioRef.current.duration;
      setProgress(curr);
      setDuration(dur);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`fixed bottom-4 right-4 z-[1000] transition-all duration-300 ease-in-out bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden ${isExpanded ? 'w-[90vw] md:w-[400px]' : 'w-auto rounded-full'}`}>
      {/* HTML5 AUDIO ELEMENTİ
          key={audioSrc} -> Bu çok önemli! URL değişince player'ı tamamen yeniler.
      */}
      <audio
        key={audioSrc}
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.error("Audio Load Error", e);
          setError(true);
          setIsPlaying(false);
        }}
      />

      {/* ÜST KISIM */}
      <div className={`flex items-center gap-4 ${isExpanded ? 'p-4' : 'p-2'}`}>
        {/* Kapak Resmi */}
        <div className={`relative rounded-full overflow-hidden border-2 border-amber-500/50 flex-shrink-0 transition-all ${isExpanded ? 'w-16 h-16' : 'w-12 h-12'}`}>
          <img 
            src={coverImage} 
            alt="Cover" 
            className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`} 
          />
          <div className="absolute inset-0 m-auto w-3 h-3 bg-[#0f172a] rounded-full border border-amber-500/30"></div>
        </div>

        {/* Bilgiler */}
        <div className={`flex-1 min-w-0 ${!isExpanded ? 'hidden' : 'block'}`}>
          <h4 className="text-white font-bold truncate text-sm md:text-base">{title}</h4>
          <p className="text-slate-400 text-xs truncate">{artist}</p>
          {error && <p className="text-red-500 text-[10px]">Dosya yüklenemedi!</p>}
        </div>

        {/* Kontroller */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Genişlet/Küçült */}
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-400 hover:text-white p-1">
              {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>

          {/* Play/Pause */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={error}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-slate-900 shadow-lg transition-transform active:scale-95 ${error ? 'bg-gray-600 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-400'}`}
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>

          {/* Kapat */}
          <button 
              onClick={() => { setIsPlaying(false); setCurrentTrack(null); }} 
              className="text-slate-400 hover:text-red-500 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* PROGRESS BAR (Sadece Geniş Modda ve Hata Yoksa) */}
      {isExpanded && !error && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:h-1.5 transition-all"
          />
        </div>
      )}
    </div>
  );
}