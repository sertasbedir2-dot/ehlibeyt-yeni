import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, Maximize2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function MusicPlayer() {
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useAppContext();
  const audioRef = useRef(null);
  
  // State Tanımları
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true); // Mobilde küçültüp büyütmek için

  // EĞER ŞARKI YOKSA GİZLE
  if (!currentTrack) return null;

  // --- YARDIMCI FONKSİYON: SÜRE FORMATLAMA ---
  // (Kod içinde kullanılıyor ancak tanımı eksikti, eklendi)
  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // --- MOTOR: ŞARKI DEĞİŞİNCE VEYA PLAY/PAUSE BASILINCA ---
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Tarayıcı bazen otomatik oynatmayı engeller, bunu yakalayalım
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Otomatik oynatma hatası:", error);
            setIsPlaying(false); // Hata varsa butonu pause yap
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying, setIsPlaying]);

  // --- ŞARKI BİTİNCE ---
  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  // --- SÜRE TAKİBİ ---
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  // --- İLERLETME ÇUBUĞU ---
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  // --- URL ÇÖZÜCÜ ---
  // Gelen verinin içinde hangisi varsa onu kullan (url, file, src)
  const audioSrc = currentTrack.url || currentTrack.file || currentTrack.src;

  return (
    <div className={`fixed bottom-4 right-4 z-[1000] transition-all duration-300 ease-in-out bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden ${isExpanded ? 'w-[90vw] md:w-[400px]' : 'w-auto rounded-full'}`}>
      
      {/* GİZLİ SES MOTORU (HTML5 AUDIO) */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
        onError={(e) => console.error("Ses dosyası yüklenemedi:", e)}
      />

      {/* PLAYER ARAYÜZÜ */}
      
      {/* ÜST KISIM (KAPAK VE BİLGİ) */}
      <div className={`flex items-center gap-4 ${isExpanded ? 'p-4' : 'p-2'}`}>
        
        {/* Kapak Resmi (Dönme Efekti) */}
        <div className={`relative rounded-full overflow-hidden border-2 border-amber-500/50 flex-shrink-0 transition-all ${isExpanded ? 'w-16 h-16' : 'w-12 h-12'}`}>
          <img 
            src={currentTrack.image || currentTrack.cover || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200"} 
            alt="Cover" 
            className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`} 
          />
          {/* Ortadaki delik (Plak görünümü) */}
          <div className="absolute inset-0 m-auto w-3 h-3 bg-[#0f172a] rounded-full border border-amber-500/30"></div>
        </div>

        {/* Şarkı Bilgileri */}
        <div className={`flex-1 min-w-0 ${!isExpanded ? 'hidden' : 'block'}`}>
          <h4 className="text-white font-bold truncate text-sm md:text-base">{currentTrack.title || "Bilinmeyen Eser"}</h4>
          <p className="text-slate-400 text-xs truncate">{currentTrack.artist || "Sanatçı"}</p>
        </div>

        {/* KONTROLLER */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Genişlet/Küçült (Mobilde yer kaplamasın diye) */}
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-400 hover:text-white p-1">
              <Maximize2 size={16} />
          </button>

          {/* Play/Pause */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 bg-amber-500 hover:bg-amber-400 rounded-full flex items-center justify-center text-slate-900 shadow-lg transition-transform active:scale-95"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>

          {/* Kapat */}
          <button onClick={() => { setIsPlaying(false); setCurrentTrack(null); }} className="text-slate-400 hover:text-red-500 transition-colors p-1">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* ALT KISIM (PROGRESS BAR - Sadece Geniş Modda) */}
      {isExpanded && (
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