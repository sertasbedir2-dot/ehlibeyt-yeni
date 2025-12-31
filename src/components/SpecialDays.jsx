import React, { useState, useEffect } from 'react';
import { Calendar, Bell, Star, Heart, Info } from 'lucide-react';
import { ozelGunler } from '../data/gunler'; // <-- VERİYİ BURADAN ÇEKİYORUZ

export default function SpecialDays() {
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    const checkDates = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let foundEvent = null;

      // Import ettiğimiz ozelGunler listesini kullanıyoruz
      for (const event of ozelGunler) {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);

        const timeDiff = eventDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysDiff === 0) {
          foundEvent = { ...event, status: 'today', daysLeft: 0 };
          break;
        }
        
        if (daysDiff > 0 && daysDiff <= 7) {
          if (!foundEvent || daysDiff < foundEvent.daysLeft) {
            foundEvent = { ...event, status: 'upcoming', daysLeft: daysDiff };
          }
        }
      }

      setActiveEvent(foundEvent);
    };

    checkDates();
  }, []);

  if (!activeEvent) return null;

  return (
    <div className={`
      relative overflow-hidden rounded-2xl p-6 border shadow-2xl animate-fade-in my-6
      ${activeEvent.status === 'today' 
        ? (activeEvent.isMatem ? 'bg-black border-red-900 text-gray-300' : 'bg-gradient-to-r from-[#C5A059] to-[#b08d45] border-[#F4EFE0] text-[#0F2C45]') 
        : 'bg-[#162e45] border-[#C5A059]/50 text-[#F4EFE0]'}
    `}>
      
      {/* Tasarım öğeleri (Yıldız ikonu) */}
      <div className="absolute right-0 top-0 opacity-10 -mr-10 -mt-10">
        <Star size={150} />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className={`p-4 rounded-full shadow-lg shrink-0 ${activeEvent.status === 'today' ? 'bg-white/20 text-white' : 'bg-[#C5A059]/10 text-[#C5A059]'}`}>
          {activeEvent.status === 'today' ? <Heart size={32} fill="currentColor" /> : <Bell size={32} className="animate-bounce" />}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded 
              ${activeEvent.status === 'today' ? 'bg-white text-[#0F2C45]' : 'bg-[#C5A059] text-[#0F2C45]'}
            `}>
              {activeEvent.status === 'today' ? 'BUGÜN' : `YAKLAŞIYOR (${activeEvent.daysLeft} GÜN KALDI)`}
            </span>
            <span className="flex items-center gap-1 text-xs opacity-80 font-mono">
               <Calendar size={12} /> {activeEvent.date}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
            {activeEvent.title}
          </h2>
          
          <p className={`text-sm md:text-base leading-relaxed max-w-2xl ${activeEvent.status === 'today' ? 'font-medium opacity-90' : 'text-gray-400'}`}>
            <Info size={16} className="inline mr-1 -mt-1" />
            {activeEvent.desc}
          </p>
        </div>
      </div>
    </div>
  );
}