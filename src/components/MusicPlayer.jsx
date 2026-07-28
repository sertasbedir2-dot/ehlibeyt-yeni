import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, X, Maximize2, Minimize2, Loader2, SkipBack, SkipForward, Shuffle } from 'lucide-react'; 
import { useAppContext } from '../context/AppContext';
import { musicList } from '../data/musicData'; 

export default function MusicPlayer() {
  const context = useAppContext();
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const currentTrack = context?.currentTrack;
  const isPlaying = context?.isPlaying || false;
  const setIsPlaying = context?.setIsPlaying;
  const setCurrentTrack = context?.setCurrentTrack;

  const audioSrc = currentTrack?.url || currentTrack?.file || currentTrack?.src || "";
  const coverImage = currentTrack?.image || currentTrack?.cover || currentTrack?.thumbnail || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200";
  const title = currentTrack?.title || "Bilinmeyen Eser";
  const artist = currentTrack?.artist || "OnikiKapı";

  const getCurrentPlaylist = () => {
    if (!currentTrack || !Array.isArray(musicList) || musicList.length === 0) return [];
    let targetCategory = currentTrack.category;

    if (!targetCategory) {
        const found = musicList.find(t => t.title === currentTrack.title);
        if (found) targetCategory = found.category;
    }
    if (!targetCategory) return musicList;

    const filteredList = musicList.filter(track => track.category === targetCategory);
    return filteredList.length > 0 ? filteredList : musicList;
  };

  const handleNext = () => {
    const playlist = getCurrentPlaylist();
    if (playlist.length === 0) return;

    let nextTrack;
    if (isShuffle) {
      const otherTracks = playlist.length > 1 ? playlist.filter(t => t.title !== currentTrack.title) : playlist;
      nextTrack = otherTracks[Math.floor(Math.random() * otherTracks.length)];
    } else {
      const currentIndex = playlist.findIndex(t => t.title === currentTrack.title);
      nextTrack = playlist[currentIndex === -1 ? 0 : (currentIndex + 1) % playlist.length];
    }
    if (nextTrack) { setCurrentTrack(nextTrack); setIsPlaying(true); }
  };

  const handlePrev = () => {
    const playlist = getCurrentPlaylist();
    if (playlist.length === 0) return;
    const currentIndex = playlist.findIndex(t => t.title === currentTrack.title);
    setCurrentTrack(playlist[currentIndex === -1 ? 0 : (currentIndex - 1 + playlist.length) % playlist.length]);
    setIsPlaying(true);
  };

  useEffect(() => {
    if ('mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: artist,
        album: currentTrack.category || 'Ehlibeyt Külliyatı',
        artwork: [{ src: coverImage, sizes: '512x512', type: 'image/jpeg' }]
      });
      navigator.mediaSession.setActionHandler('play', () => setIsPlaying(true));
      navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
      navigator.mediaSession.setActionHandler('nexttrack', handleNext);
      navigator.mediaSession.setActionHandler('previoustrack', handlePrev);
    }
  }, [currentTrack, isPlaying, isShuffle]);

  useEffect(() => {
    if (!currentTrack || !audioSrc) return;
    setError(false); setIsLoading(true); setProgress(0);
    if (audioRef.current) { audioRef.current.src = audioSrc; audioRef.current.load(); }
  }, [currentTrack, audioSrc]);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) playPromise.catch(() => console.warn("Otomatik oynatma tarayıcı tarafından engellendi."));
    } else { audioRef.current.pause(); }
  }, [isPlaying, currentTrack]);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!context || !currentTrack) return null;
  const displayCategory = currentTrack.category || (Array.isArray(musicList) ? musicList.find(t => t.title === title)?.category : null) || "Genel";

  return (
    <div className={`fixed bottom-4 right-4 z-[9999] transition-all duration-300 ease-in-out bg-[#0f172a] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden ${isExpanded ? 'w-[90vw] md:w-[400px]' : 'w-auto rounded-full'}`}>
      <audio ref={audioRef} onTimeUpdate={() => audioRef.current && setProgress(audioRef.current.currentTime)} onLoadedData={() => { setIsLoading(false); if (audioRef.current) setDuration(audioRef.current.duration); if (isPlaying && audioRef.current) audioRef.current.play().catch(()=>{}); }} onEnded={handleNext} onError={() => { setError(true); setIsLoading(false); }} />
      <div className={`flex items-center gap-4 ${isExpanded ? 'p-4' : 'p-2'}`}>
        <div className={`relative rounded-full overflow-hidden border-2 border-amber-500/50 flex-shrink-0 transition-all ${isExpanded ? 'w-16 h-16' : 'w-12 h-12'}`}>
          <img src={coverImage} alt="Cover" className={`w-full h-full object-cover ${isPlaying && !isLoading ? 'animate-spin-slow' : ''}`} />
          {isLoading && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><Loader2 className="animate-spin text-white" size={20} /></div>}
        </div>
        <div className={`flex-1 min-w-0 ${!isExpanded ? 'hidden' : 'block'}`}>
          <h4 className="text-white font-bold truncate text-sm md:text-base">{title}</h4>
          <div className="flex items-center gap-2">
            <span className="text-amber-500 text-[10px] border border-amber-500/30 px-1 rounded uppercase tracking-wider">{displayCategory}</span>
            <p className="text-slate-400 text-xs truncate">{artist}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isExpanded && <button onClick={() => setIsShuffle(!isShuffle)} className={`p-1 transition-colors ${isShuffle ? 'text-amber-500' : 'text-slate-500 hover:text-white'}`}><Shuffle size={16} /></button>}
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-400 hover:text-white p-1 md:block hidden">{isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}</button>
          {isExpanded && <button onClick={handlePrev} className="text-slate-300 hover:text-amber-500 transition-colors"><SkipBack size={20} fill="currentColor" /></button>}
          <button onClick={() => setIsPlaying && setIsPlaying(!isPlaying)} disabled={error || isLoading} className={`w-10 h-10 rounded-full flex items-center justify-center text-slate-900 shadow-lg transition-transform active:scale-95 ${error ? 'bg-gray-600' : 'bg-amber-500 hover:bg-amber-400'}`}>
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>
          {isExpanded && <button onClick={handleNext} className="text-slate-300 hover:text-amber-500 transition-colors"><SkipForward size={20} fill="currentColor" /></button>}
          <button onClick={() => { if (setIsPlaying) setIsPlaying(false); if (setCurrentTrack) setCurrentTrack(null); }} className="text-slate-400 hover:text-red-500 transition-colors p-1"><X size={20} /></button>
        </div>
      </div>
      {isExpanded && !error && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1"><span>{formatTime(progress)}</span><span>{formatTime(duration)}</span></div>
          <input type="range" min="0" max={duration || 0} value={progress} onChange={(e) => { const newTime = parseFloat(e.target.value); if (audioRef.current) { audioRef.current.currentTime = newTime; setProgress(newTime); } }} disabled={isLoading} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:h-1.5 transition-all" />
        </div>
      )}
    </div>
  );
}
