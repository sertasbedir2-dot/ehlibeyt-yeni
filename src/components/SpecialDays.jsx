import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Star, Heart, Info, AlertCircle } from 'lucide-react';
import { ozelGunler } from '../data/gunler';

export default function SpecialDays() {
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    const checkDates = () => {
      // Yerel saati baz alarak bugünü bul
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

      let foundEvent = null;

      for (const event of ozelGunler) {
        // event.date 'YYYY-MM-DD' formatında olmalı
        const [year, month, day] = event.date.split('-').map(Number);
        const eventTime = new Date(year, month - 1, day).getTime();

        const timeDiff = eventTime - today;
        const daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));

        // Tam BUGÜN ise (0 gün fark)
        if (daysDiff === 0) {
          foundEvent = { ...event, status: 'today', daysLeft: 0 };
          break; // Bugün varsa diğerlerine bakmaya gerek yok
        }
        
        // Gelecek 7 gün içindeyse
        if (daysDiff > 0 && daysDiff <= 7) {
          if (!foundEvent || daysDiff < foundEvent.daysLeft) {
            foundEvent = { ...event, status: 'upcoming', daysLeft: daysDiff };
          }
        }
      }

      setActiveEvent(foundEvent);
    };

    checkDates();
    // Her saat başı kontrol et (Gün dönümü için)
    const interval = setInterval(checkDates, 3600000);
    return () => clearInterval(interval);
  }, []);

  if (!activeEvent) return null;

  // Tasarım Mantığı: Matem mi, Bayram mı, Normal mi?
  const isToday = activeEvent.status === 'today';
  const isMatem = activeEvent.isMatem;

  const containerStyles = isToday
    ? (isMatem 
        ? 'bg-gradient-to-br from-black to-[#1a0000] border-red-900 text-gray-200' // Şahadet/Yas
        : 'bg-gradient-to-r from-gold to-[#b08d45] border-white/30 text-midnight shadow-[0_0_30px_rgba(197,160,89,0.3)]' // Veladet/Bayram
      )
    : 'bg-turquoise-dark/90 backdrop-blur-md border-gold/30 text-sand shadow-xl'; // Yaklaşan Gün

  return (
    <div className={`relative overflow-hidden rounded-[2rem] p-6 md:p-8 border-2 transition-all duration-500 animate-fade-in-up my-8 ${containerStyles}`}>
      
      {/* Estetik Arka Plan Süsü */}
      <div className="absolute right-0 top-0 opacity-10 -mr-8 -mt-8 pointer-events-none">
        {isMatem ? <AlertCircle size={180} /> : <Star size={180} />}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
        
        {/* İkon Alanı */}
        <div className={`
          p-5 rounded-2xl shadow-inner shrink-0 transition-transform duration-700
          ${isToday ? 'bg-white/10 scale-110' : 'bg-gold/10 text-gold'}
          ${isToday && !isMatem ? 'animate-bounce-slow' : ''}
        `}>
          {isToday 
            ? (isMatem ? <AlertCircle size={40} className="text-red-500" /> : <Heart size={40} fill="currentColor" className="text-white" />) 
            : <Bell size={40} className="animate-pulse" />
          }
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
            <span className={`
              text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border
              ${isToday 
                ? 'bg-white text-midnight border-transparent' 
                : 'bg-gold/20 text-gold border-gold/30'}
            `}>
              {isToday ? 'AZİZ HATIRA / BUGÜN' : `YAKLAŞAN GÜN (${activeEvent.daysLeft} GÜN KALDI)`}
            </span>
            <span className="flex items-center gap-1 text-[11px] opacity-70 font-mono font-bold">
               <Calendar size={14} /> {activeEvent.date}
            </span>
          </div>

          <h2 className={`text-2xl md:text-4xl font-serif font-bold mb-3 tracking-tight ${isToday && isMatem ? 'text-red-100' : ''}`}>
            {activeEvent.title}
          </h2>
          
          <div className={`
            text-sm md:text-lg leading-relaxed max-w-3xl border-l-2 pl-4 py-1
            ${isToday ? 'border-white/20' : 'border-gold/20'}
          `}>
            <p className={isToday ? 'opacity-100 font-medium' : 'opacity-70 italic'}>
              {activeEvent.desc}
            </p>
          </div>
        </div>
      </div>

      {/* İlerleme Çubuğu (Sadece yaklaşan günler için) */}
      {!isToday && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
          <div 
            className="h-full bg-gold shadow-[0_0_10px_rgba(197,160,89,1)] transition-all duration-1000"
            style={{ width: `${(7 - activeEvent.daysLeft) * 14.28}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}