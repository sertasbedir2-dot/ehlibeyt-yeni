import React, { createContext, useState, useContext } from 'react';

// 1. Context Oluştur
const AppContext = createContext();

// 2. Sağlayıcı (Provider) Oluştur
export const AppProvider = ({ children }) => {
  // --- MÜZİK ÇALAR STATE'LERİ ---
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // --- FAVORİLER VE TOAST MESAJLARI ---
  const [favorites, setFavorites] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleFavorite = (item) => {
    if (favorites.find(f => f.id === item.id)) {
      setFavorites(favorites.filter(f => f.id !== item.id));
      showToast("Favorilerden çıkarıldı");
    } else {
      setFavorites([...favorites, item]);
      showToast("Favorilere eklendi");
    }
  };

  const isFavorite = (id) => favorites.some(f => f.id === id);

  // 3. DIŞARI AKTARILACAK DEĞERLER (SORUN BURADAYDI)
  const value = {
    currentTrack,
    setCurrentTrack, // <--- BU EKSİKTİ, ARTIK VAR
    isPlaying,
    setIsPlaying,    // <--- BU EKSİKTİ, ARTIK VAR
    favorites,
    toggleFavorite,
    isFavorite,
    toastMessage,
    showToast
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// 4. Kanca (Hook)
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};