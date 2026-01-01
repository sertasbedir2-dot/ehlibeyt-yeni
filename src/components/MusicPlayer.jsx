import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Minimize2, Music, List } from 'lucide-react';
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
  
  const audioRef = useRef(null);
  
  const currentTrack = currentQueue && currentQueue.length > 0 
    ? currentQueue[currentTrackIndex] 
    : { title: "Liste Bekleniyor...", artist: "", url: "", cover: "" };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.log("Otomatik oynatma engellendi:", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex, currentQueue]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const playNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * currentQueue.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % currentQueue.length);
    }
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + currentQueue.length) % currentQueue.length);
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
      <audio 
        ref={audioRef} 
        src={currentTrack.url}
        onEnded={playNext}
        className="hidden" 
      />

      <div className="fixed bottom-6 right-6 z-[100] animate-fade-in">
        
        {isMinimized ? (
          <button 
            onClick={() => setIsMinimized(false)}
            className="bg-turquoise-dark border border-gold/50 text-gold p-3 rounded-full shadow-[0_0_15px_rgba(197,160,89,0.3)] hover:scale-110 transition-transform relative group"
            title="Müzik Çalar"
          >
            <Music size={24} className={isPlaying ? "animate-spin-slow" : ""} />
            {isPlaying && (
                <span className="absolute -inset-1 rounded-full border border-gold/30 animate-ping"></span>
            )}
          </button>
        ) : (
          <div className="bg-turquoise-dark/95 backdrop-blur-md border border-gold/30 rounded-2xl p-4 w-72 shadow-2xl relative">
            <button onClick={() => setIsMinimized(true)} className="absolute top-2 right-2 text-slate-400 hover:text-white">
              <Minimize2 size={16} />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-gold/20 shadow-md flex-shrink-0">
                <img src={currentTrack.cover} alt="Cover" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden min-w-0">
                <h4 className="text-sand font-bold text-sm truncate">{currentTrack.title}</h4>
                <p className="text-turquoise-light text-xs truncate">{currentTrack.artist}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-gold">
              <button onClick={toggleMute} className="hover:text-white transition">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              
              <div className="flex items-center gap-2">
                <button onClick={playPrev} className="hover:text-white transition"><SkipBack size={20} /></button>
                <button onClick={togglePlay} className="w-10 h-10 bg-gold text-turquoise-dark rounded-full flex items-center justify-center hover:bg-white transition shadow-lg">
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
                <button onClick={playNext} className="hover:text-white transition"><SkipForward size={20} /></button>
              </div>
              
              <button onClick={() => setIsShuffle(!isShuffle)} className={`hover:text-white transition ${isShuffle ? 'text-white' : 'text-gold/50'}`} title="Karıştır">
                <List size={18} />
              </button>
            </div>

            <div className="text-center mt-2 text-[10px] text-slate-500">
              {currentTrackIndex + 1} / {currentQueue.length}
            </div>
          </div>
        )}
      </div>
    </>
  );
}