import React, { useState, useEffect } from 'react';
import { Moon, Calendar, Clock, Info, MapPin } from 'lucide-react';

export default function PrayerTimesWidget() {
  const [prayers, setPrayers] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");
  const [statusColor, setStatusColor] = useState("text-[#E5C17C]"); 
  const [statusBg, setStatusBg] = useState("bg-midnight");
  const [pulse, setPulse] = useState(false);
  
  // Hicri Takvim Sapması (Ayın görülmesine göre ayarlanabilir)
  const HIJRI_OFFSET = 0; 

  const CITY = "Istanbul";
  const COUNTRY = "Turkey";

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  useEffect(() => {
    if (prayers) {
      const timer = setInterval(calculateCountdown, 1000);
      return () => clearInterval(timer);
    }
  }, [prayers]);

  const fetchPrayerTimes = async () => {
    try {
      // Method 0: Shia Ithna-Ashari (Leva Research Institute, Qum)
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${CITY}&country=${COUNTRY}&method=0&adjustment=${HIJRI_OFFSET}`
      );
      const data = await response.json();
      
      if (data.code === 200) {
        setPrayers(data.data.timings);
        
        // Miladi Tarih
        const gDate = new Date();
        setGregorianDate(gDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }));
        
        // Hicri Tarih İşleme
        updateHijriDisplay(data.data);
      }
    } catch (error) {
      console.error("Namaz vakitleri alınamadı:", error);
    }
  };

  const updateHijriDisplay = (data) => {
    const hData = data.date.hijri;
    const timings = data.timings;
    
    // Fıkhi Mantık: Akşam ezanı okunduğunda Hicri gün bir sonraki güne geçer.
    const now = new Date();
    const [mHours, mMinutes] = timings.Maghrib.split(':').map(Number);
    const maghribTime = new Date();
    maghribTime.setHours(mHours, mMinutes, 0);

    let day = parseInt(hData.day);
    let month = hData.month.tr || hData.month.en;
    let year = hData.year;

    if (now >= maghribTime) {
      // Akşam geçtiyse günü 1 artır (Basit yaklaşım, API sonraki gün verisiyle desteklenebilir)
      day += 1;
      // Not: Ay sonu geçişleri için API'nin "tomorrow" verisi daha sağlıklıdır.
    }

    const monthNamesTr = {
      "Muharram": "Muharrem", "Safar": "Safer", "Rabi' al-awwal": "Rebiülevvel",
      "Rabi' ath-thani": "Rebiülahir", "Jumada al-ula": "Cemaziyelevvel",
      "Jumada al-akhira": "Cemaziyelahir", "Rajab": "Recep", "Sha'ban": "Şaban",
      "Ramadan": "Ramazan", "Shawwal": "Şevval", "Dhu al-Qi'dah": "Zilkade", "Dhu al-Hijjah": "Zilhicce"
    };

    setHijriDate(`${day} ${monthNamesTr[hData.month.en] || hData.month.en} ${year}`);
  };

  const calculateCountdown = () => {
    if (!prayers) return;

    const now = new Date();
    const times = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const trNames = {
      'Fajr': 'Sabah', 'Sunrise': 'Güneş', 'Dhuhr': 'Öğle', 
      'Asr': 'İkindi', 'Maghrib': 'Akşam', 'Isha': 'Yatsı'
    };

    let upcoming = null;
    let minDiff = Infinity;

    for (let timeName of times) {
      const timeStr = prayers[timeName];
      const [hours, minutes] = timeStr.split(':').map(Number);
      const prayerTime = new Date();
      prayerTime.setHours(hours, minutes, 0);

      let diff = prayerTime - now;
      if (diff < 0) diff += 24 * 60 * 60 * 1000; 

      if (diff < minDiff) {
        minDiff = diff;
        upcoming = { name: trNames[timeName], diff };
      }
    }

    const h = Math.floor(minDiff / (1000 * 60 * 60));
    const m = Math.floor((minDiff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((minDiff % (1000 * 60)) / 1000);

    setNextPrayer(upcoming.name);
    setCountdown(`${h > 0 ? h + 's ' : ''}${m}d ${s}s`);

    // GÖRSEL DURUM YÖNETİMİ
    const totalMin = (minDiff / 1000) / 60;
    if (totalMin <= 5) {
      setStatusColor("text-white");
      setStatusBg("bg-red-900"); 
      setPulse(true);
    } else if (totalMin <= 15) {
      setStatusColor("text-midnight");
      setStatusBg("bg-amber-500");
      setPulse(false);
    } else {
      setStatusColor("text-[#E5C17C]");
      setStatusBg("bg-turquoise-dark/90");
      setPulse(false);
    }
  };

  if (!prayers) return null;

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-gold/30 shadow-2xl transition-all duration-700 ${statusBg} ${pulse ? 'animate-pulse' : ''}`}>
      
      {/* İlim ve Fıkıh Bilgi Notu */}
      <div className="absolute top-2 right-2 z-20 group/info">
        <Info size={14} className="text-gold/50 cursor-help hover:text-gold transition-colors" />
        <div className="absolute right-0 top-6 w-56 bg-midnight/95 border border-gold/20 text-[10px] text-slate-300 p-3 rounded-lg opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl backdrop-blur-md">
          <p className="font-bold text-gold mb-1 underline">Caferi Fıkhı (Leva Enstitüsü)</p>
          Akşam vakti için "Doğu Kızıllığının Kaybolması" (Müşrik-i İstiva) esas alınmıştır. Bu vakit Sünni takviminden yaklaşık 15-20 dk sonradır.
        </div>
      </div>

      <div className="p-5 flex flex-col items-center gap-2">
        
        {/* Tarih Şeridi */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 text-[10px] font-bold text-sand/80 uppercase tracking-tighter">
            <Calendar size={12} className="text-gold" />
            <span>{gregorianDate}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-gold tracking-[0.1em] uppercase">
            <Moon size={12} />
            <span>{hijriDate}</span>
          </div>
        </div>

        {/* Sayaç Alanı */}
        <div className="py-2 w-full bg-black/20 rounded-xl border border-white/5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
             {nextPrayer} Vaktine
          </p>
          <div className={`text-3xl font-sans font-black tabular-nums ${statusColor}`}>
            {countdown}
          </div>
        </div>

        {/* Konum */}
        <div className="flex items-center gap-1 text-[9px] text-slate-400 font-medium italic">
          <MapPin size={10} className="text-gold/50" />
          <span>{CITY}, {COUNTRY}</span>
        </div>

      </div>
    </div>
  );
}