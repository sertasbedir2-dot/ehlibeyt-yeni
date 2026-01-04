import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { musicList } from '../data/musicData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // --- 1. STATE TANIMLAMALARI ---
  const [favorites, setFavorites] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [currentQueue, setCurrentQueue] = useState(musicList);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // --- 2. VERİ YÜKLEME (LOAD) ---
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('onikikapi_user_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.favorites) setFavorites(parsed.favorites);
      }
    } catch (error) {
      console.error("Veri yükleme hatası:", error);
    }
  }, []);

  // --- 3. VERİ SAKLAMA (SAVE) ---
  const saveToDb = useCallback((newFavorites) => {
    setFavorites(newFavorites);
    const userSchema = {
      updated_at: new Date().toISOString(),
      user_type: "guest",
      favorites: newFavorites
    };
    // Veriyi asenkron bir mikro-task olarak kaydet (Performans için)
    setTimeout(() => {
      localStorage.setItem('onikikapi_user_data', JSON.stringify(userSchema));
    }, 0);
  }, []);

  // --- 4. FAVORİ YÖNETİMİ (HEYBE) ---
  const toggleFavorite = (mediaItem) => {
    const exists = favorites.find(item => item.media_id === mediaItem.id);
    
    if (exists) {
      const newFavs = favorites.filter(item => item.media_id !== mediaItem.id);
      saveToDb(newFavs);
      showToast("Manevi heybenizden çıkarıldı.");
    } else {
      const newItem = {
        media_id: mediaItem.id,
        title: mediaItem.title || "İsimsiz Eser", 
        author: mediaItem.author || mediaItem.artist || "Bilinmiyor",
        thumbnail: mediaItem.thumbnail || mediaItem.cover || "/default-cover.png",
        audioUrl: mediaItem.audioUrl || mediaItem.url || null,
        youtubeId: mediaItem.youtubeId || null,
        category: mediaItem.category || "Genel",
        added_at: new Date().toISOString()
      };
      saveToDb([...favorites, newItem]);
      showToast("Manevi heybenize eklendi.");
    }
  };

  const isFavorite = (id) => favorites.some(item => item.media_id === id);

  // --- 5. OYNATMA MANTIĞI (PLAYER) ---
  const playAllFavorites = () => {
    // Sadece ses dosyası olanları filtrele
    const audioFavs = favorites.filter(item => item.audioUrl);
    
    if (audioFavs.length > 0) {
      const formattedQueue = audioFavs.map(item => ({
        title: item.title,
        artist: item.author,
        url: item.audioUrl,
        cover: item.thumbnail
      }));
      
      setCurrentQueue(formattedQueue);
      setCurrentTrackIndex(0);
      setIsPlaying(true);
      showToast(`${audioFavs.length} eser sıraya eklendi.`);
    } else {
      showToast("Heybenizde ses dosyası bulunamadı.");
    }
  };

  // --- 6. BİLDİRİM (TOAST) ---
  const showToast = (msg) => {
    setToastMessage(msg);
    // Varsa önceki zamanlayıcıyı temizle (opsiyonel geliştirme yapılabilir)
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
      playAllFavorites,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);