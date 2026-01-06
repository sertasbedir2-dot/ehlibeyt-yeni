import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function MusicPlayer() {
  const context = useAppContext();
  
  // --- 1. TÜM HOOK'LAR EN ÜSTTE TANIMLANMALI (ALTIN KURAL) ---
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Verileri güvenli çekelim (Hata vermesin diye)
  const currentTrack = context?.currentTrack;
  const isPlaying = context?.isPlaying || false;
  const setIsPlaying = context?.setIsPlaying;
  const setCurrentTrack = context?.setCurrentTrack;

  const audioSrc = currentTrack?.url || currentTrack?.file || currentTrack?.src || "";
  const coverImage = currentTrack?.image || currentTrack?.cover || currentTrack?.thumbnail || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200";
  const title = currentTrack?.title || "Bilinmeyen Eser";
  const artist = currentTrack?.artist || "OnikiKapı";

  // --- 2. EFFECT'LER (RETURN'DEN ÖNCE OLMAK ZORUNDA) ---
  
  // Kaynak değişince yükle
  useEffect(() => {
    if (!currentTrack || !audioSrc) return;

    setError(false);
    setIsLoading(true);
    setProgress(0);
    
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();
    }
  }, [currentTrack, audioSrc]);

  // Oynatma kontrolü
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Çalıyor...
          })
          .catch(err => {
            console.log("Oynatma engellendi:", err);
            // Hata olursa butonu durdur ama çökme
            // if (setIsPlaying) setIsPlaying(false); 
          });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]); // currentTrack ekledik

  // --- YARDIMCI FONKSİYONLAR ---
  const handleLoadedData = () => {
    setIsLoading(false);
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      if (isPlaying) audioRef.current.play().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setProgress(audioRef.current.currentTime);
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

  // --- 3. EĞER ŞARKI YOKSA ŞİMDİ "NULL" DÖNEBİLİRİZ ---
  // (Çünkü tüm hook'lar yukarıda okundu, sıra bozulmadı)
  if (!context || !currentTrack) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-[9999] transition-all duration-300 ease-in-out bg-[#0f172a] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden ${isExpanded ? 'w-[90vw] md:w-[400px]' : 'w-auto rounded-full'}`}>
      
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        onEnded={() => setIsPlaying && setIsPlaying(false)}
        onError={(e) => {
            console.error("Audio Load Error", e);
            setError(true);
            setIsLoading(false);
            if (setIsPlaying) setIsPlaying(false);
        }}
      />

      {/* ARAYÜZ */}
      <div className={`flex items-center gap-4 ${isExpanded ? 'p-4' : 'p-2'}`}>
        
        {/* Kapak & Loading */}
        <div className={`relative rounded-full overflow-hidden border-2 border-amber-500/50 flex-shrink-0 transition-all ${isExpanded ? 'w-16 h-16' : 'w-12 h-12'}`}>
          <img 
            src={coverImage} 
            alt="Cover" 
            className={`w-full h-full object-cover ${isPlaying && !isLoading ? 'animate-spin-slow' : ''}`} 
          />
          {isLoading && (
             <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
               <Loader2 className="animate-spin text-white" size={20} />
             </div>
          )}
        </div>

        {/* Bilgiler */}
        <div className={`flex-1 min-w-0 ${!isExpanded ? 'hidden' : 'block'}`}>
          <h4 className="text-white font-bold truncate text-sm md:text-base">{title}</h4>
          <p className="text-slate-400 text-xs truncate">{artist}</p>
          {error && <p className="text-red-500 text-[10px]">Bağlantı Hatası</p>}
        </div>

        {/* Butonlar */}
        <div className="flex items-center gap-2">
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-400 hover:text-white p-1 md:block hidden">
              {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>

          <button 
            onClick={() => setIsPlaying && setIsPlaying(!isPlaying)}
            disabled={error || isLoading}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-slate-900 shadow-lg transition-transform active:scale-95 ${error ? 'bg-gray-600' : 'bg-amber-500 hover:bg-amber-400'}`}
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>

          <button 
              onClick={() => { 
                if (setIsPlaying) setIsPlaying(false); 
                if (setCurrentTrack) setCurrentTrack(null); 
              }} 
              className="text-slate-400 hover:text-red-500 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
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
            disabled={isLoading}
            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:h-1.5 transition-all"
          />
        </div>
      )}
    </div>
  );
}