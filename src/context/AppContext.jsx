import React, { createContext, useContext, useState, useEffect } from 'react';
import { musicList } from '../data/musicData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // --- 1. FAVORITES (BACKEND SCHEMA SIMULATION) ---
  const [favorites, setFavorites] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Read from LocalStorage on load
  useEffect(() => {
    const savedData = localStorage.getItem('user_library');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFavorites(parsed.favorites || []);
    }
  }, []);

  // Write to LocalStorage
  const saveToDb = (newFavorites) => {
    setFavorites(newFavorites);
    const userSchema = {
      user_id: "guest_user",
      favorites: newFavorites,
      custom_playlists: []
    };
    localStorage.setItem('user_library', JSON.stringify(userSchema));
  };

  const toggleFavorite = (mediaItem) => {
    // Check if item exists in favorites based on ID (or generate a unique ID if missing)
    // Using mediaItem.id for check.
    const exists = favorites.find(item => item.media_id === mediaItem.id);
    
    if (exists) {
      // Remove
      const newFavs = favorites.filter(item => item.media_id !== mediaItem.id);
      saveToDb(newFavs);
      showToast("Manevi heybenizden çıkarıldı.");
    } else {
      // Add (Schema compliant)
      const newItem = {
        media_id: mediaItem.id,
        title: mediaItem.title, 
        author: mediaItem.author,
        thumbnail: mediaItem.thumbnail,
        audioUrl: mediaItem.audioUrl || null,
        youtubeId: mediaItem.youtubeId || null,
        type: mediaItem.category,
        added_at: new Date().toISOString()
      };
      saveToDb([...favorites, newItem]);
      showToast("Manevi heybenize eklendi.");
    }
  };

  const isFavorite = (id) => {
    return favorites.some(item => item.media_id === id);
  };

  // --- 2. PLAYER LOGIC (GLOBAL) ---
  const [currentQueue, setCurrentQueue] = useState(musicList); // Default playlist
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAllFavorites = () => {
    // Filter only items with audioUrl
    const audioFavs = favorites.filter(item => item.audioUrl);
    
    if (audioFavs.length > 0) {
      // Format for MusicPlayer
      const formattedQueue = audioFavs.map(item => ({
        title: item.title,
        artist: item.author,
        url: item.audioUrl,
        cover: item.thumbnail
      }));
      
      setCurrentQueue(formattedQueue);
      setCurrentTrackIndex(0);
      setIsPlaying(true);
      showToast("Heybenizdeki tüm eserler çalınıyor...");
    } else {
      showToast("Heybenizde çalınacak ses dosyası yok.");
    }
  };

  // --- 3. TOAST NOTIFICATION ---
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <AppContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      toastMessage,
      currentQueue,
      currentTrackIndex,
      setCurrentTrackIndex,
      isPlaying,
      setIsPlaying,
      playAllFavorites
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);