import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Minimize2, Music, List, Shuffle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function MusicPlayer() {
  const { 
    currentQueue, 
    currentTrackIndex, 
    setCurrentTrackIndex, 
    isPlaying, 
    setIsPlaying 
  } = useAppContext();

  const [isMinimized, setIsMinimized] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef(null);
  
  const currentTrack = currentQueue && currentQueue.length > 0 
    ? currentQueue[currentTrackIndex] 
    : { title: "Liste Bekleniyor...", artist: "", url: "", cover: "" };

  useEffect(() => {
    const audio = audioRef.current; 
    if (!audio) return;

    const handlePlay = async () => {
      try {
        if (isPlaying) {
          // Tarayıcıya hazır olması için ufak bir zaman tanı
          await audio.play();
        } else {
          audio.pause();
        }
      } catch (error) {
        // Genelde kullanıcı etkileşimi olmadan çalmaya çalışınca buraya düşer
        console.warn("Müzik çalma başlatılamadı: Kullanıcı etkileşimi bekleniyor.");
        setIsPlaying(false);
      }
    };

    handlePlay();
  }, [isPlaying, currentTrackIndex, currentTrack.url]);

  // İlerleme çubuğunu güncelle
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress || 0);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const playNext = () => {
    if (!currentQueue?.length) return;
    if (isShuffle) {
      const nextIndex = Math.floor(Math.random() * currentQueue.length);
      setCurrentTrackIndex(nextIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % currentQueue.length);
    }
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (!currentQueue?.length) return;
    setCurrentTrackIndex((prev) => (prev - 1 + currentQueue.length) % currentQueue.length);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!currentQueue?.length) return null;

  return (
    <>
      <audio 
        ref={audioRef} 
        src={currentTrack.url}
        onEnded={playNext}
        onTimeUpdate={handleTimeUpdate}
        className="hidden" 
      />

      <div className="fixed bottom-6 right-6 z-[100] animate-fade-in-up">
        {isMinimized ? (
          <button 
            onClick={() => setIsMinimized(false)}
            className="bg-turquoise-dark border border-gold/40 text-gold p-4 rounded-full shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:scale-110 active:scale-95 transition-all relative group"
          >
            <Music size={24} className={isPlaying ? "animate-spin-slow" : ""} />
            {isPlaying && (
              <span className="absolute -inset-2 rounded-full border border-gold/20 animate-ping"></span>
            )}
            {/* Küçük Bilgi Balonu */}
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap border border-gold/20">
              Şu an çalıyor: {currentTrack.title}
            </div>
          </button>
        ) : (
          <div className="bg-turquoise-dark/95 backdrop-blur-xl border border-gold/20 rounded-3xl p-5 w-80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            
            {/* Arka Plan Süsü */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl"></div>

            <button onClick={() => setIsMinimized(true)} className="absolute top-3 right-3 text-slate-400 hover:text-gold transition-colors">
              <Minimize2 size={18} />
            </button>

            <div className="flex items-center gap-4 mb-5 relative z-10">
              <div className={`w-16 h-16 rounded-2xl overflow-hidden border-2 border-gold/20 shadow-lg flex-shrink-0 transition-transform duration-1000 ${isPlaying ? 'rotate-6' : 'rotate-0'}`}>
                <img 
                  src={currentTrack.cover || "https://images.unsplash.com/photo-1507838598365-e8c104bc338e?q=80&w=100&auto=format&fit=crop"} 
                  alt="Kapak" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="overflow-hidden min-w-0 flex-1">
                <h4 className="text-sand font-bold text-sm truncate leading-tight">{currentTrack.title}</h4>
                <p className="text-turquoise-light text-xs truncate mt-1 opacity-80">{currentTrack.artist}</p>
              </div>
            </div>

            {/* İlerleme Çubuğu */}
            <div className="w-full h-1 bg-white/10 rounded-full mb-5 overflow-hidden">
              <div 
                className="h-full bg-gold transition-all duration-300 ease-linear shadow-[0_0_8px_rgba(197,160,89,0.8)]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-gold relative z-10">
              <button 
                onClick={toggleMute} 
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <div className="flex items-center gap-4">
                <button onClick={playPrev} className="hover:text-white transition-colors"><SkipBack size={20} fill="currentColor" /></button>
                <button 
                  onClick={togglePlay} 
                  className="w-12 h-12 bg-gold text-turquoise-dark rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(197,160,89,0.4)]"
                >
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </button>
                <button onClick={playNext} className="hover:text-white transition-colors"><SkipForward size={20} fill="currentColor" /></button>
              </div>

              <button 
                onClick={() => setIsShuffle(!isShuffle)} 
                className={`p-2 rounded-full transition-colors ${isShuffle ? 'bg-gold/10 text-white' : 'text-gold/40 hover:text-gold'}`}
              >
                {isShuffle ? <Shuffle size={18} /> : <List size={18} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}