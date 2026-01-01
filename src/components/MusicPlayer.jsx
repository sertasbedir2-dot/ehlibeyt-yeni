import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Minimize2, Music, List } from 'lucide-react';
import { musicList } from '../data/musicData';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true); // Varsayılan: Kapalı
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  
  const audioRef = useRef(null);
  
  // Güvenlik kontrolü: Liste boşsa hata vermesin
  const currentTrack = musicList && musicList.length > 0 
    ? musicList[currentTrackIndex] 
    : { title: "Liste Yükleniyor...", artist: "", url: "", cover: "" };

  useEffect(() => {
    // KRİTİK DÜZELTME: audioRef.current var mı diye kontrol et (? işareti)
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.log("Otomatik oynatma engellendi:", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const playNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * musicList.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % musicList.length);
    }
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + musicList.length) % musicList.length);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if(audioRef.current) {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* 1. SES MOTORU (GİZLİ AMA HEP VAR) */}
      {/* Bu element artık koşullu render edilmiyor, hep sayfada kalıyor */}
      <audio 
        ref={audioRef} 
        src={currentTrack.url}
        onEnded={playNext}
        className="hidden" // Görünmez yapıldı
      />

      {/* 2. GÖRÜNÜM KATMANI (DURUMA GÖRE DEĞİŞİR) */}
      <div className="fixed bottom-6 right-6 z-[100] animate-fade-in">
        
        {isMinimized ? (
          // DURUM A: KÜÇÜLTÜLMÜŞ (Sadece Buton)
          <button 
            onClick={() => setIsMinimized(false)}
            className="bg-turquoise-dark border border-gold/50 text-gold p-3 rounded-full shadow-[0_0_15px_rgba(197,160,89,0.3)] hover:scale-110 transition-transform relative group"
            title="Müzik Çalar"
          >
            {/* Çalıyorsa ikon dönsün */}
            <Music size={24} className={isPlaying ? "animate-spin-slow" : ""} />
            
            {/* Çalıyorsa etrafa ses dalgası efekti */}
            {isPlaying && (
                <span className="absolute -inset-1 rounded-full border border-gold/30 animate-ping"></span>
            )}
          </button>
        ) : (
          // DURUM B: AÇIK PANEL
          <div className="bg-turquoise-dark/95 backdrop-blur-md border border-gold/30 rounded-2xl p-4 w-72 shadow-2xl relative">
            
            {/* Kapatma Butonu */}
            <button 
              onClick={() => setIsMinimized(true)} 
              className="absolute top-2 right-2 text-slate-400 hover:text-white"
            >
              <Minimize2 size={16} />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-gold/20 shadow-md flex-shrink-0">
                <img src={currentTrack.cover} alt="Cover" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden min-w-0">
                {/* Kayan yazı efekti için container */}
                <h4 className="text-sand font-bold text-sm truncate">{currentTrack.title}</h4>
                <p className="text-turquoise-light text-xs truncate">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Kontroller */}
            <div className="flex items-center justify-between text-gold">
              <button onClick={toggleMute} className="hover:text-white transition">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              
              <div className="flex items-center gap-2">
                <button onClick={playPrev} className="hover:text-white transition"><SkipBack size={20} /></button>
                <button 
                  onClick={togglePlay} 
                  className="w-10 h-10 bg-gold text-turquoise-dark rounded-full flex items-center justify-center hover:bg-white transition shadow-lg"
                >
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
                <button onClick={playNext} className="hover:text-white transition"><SkipForward size={20} /></button>
              </div>
              
              <button 
                onClick={() => setIsShuffle(!isShuffle)} 
                className={`hover:text-white transition ${isShuffle ? 'text-white' : 'text-gold/50'}`} 
                title="Karıştır"
              >
                <List size={18} />
              </button>
            </div>

            {/* Sayaç */}
            <div className="text-center mt-2 text-[10px] text-slate-500">
              {currentTrackIndex + 1} / {musicList.length}
            </div>
          </div>
        )}
      </div>
    </>
  );
}