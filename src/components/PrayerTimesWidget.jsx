import React, { useState, useEffect } from 'react';
import { Moon, Calendar, Clock, Info, MapPin } from 'lucide-react';

export default function PrayerTimesWidget() {
  const [prayers, setPrayers] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");
  const [statusColor, setStatusColor] = useState("text-[#E5C17C]"); // Varsayılan Altın
  const [statusBg, setStatusBg] = useState("bg-midnight");
  const [pulse, setPulse] = useState(false);
  
  // Hicri Takvim Sapması (Backend Toggle Simülasyonu)
  // Ayın görülmesine göre +1 veya -1 yapılabilir.
  const HIJRI_OFFSET = 0; 

  // Şehir Ayarı (İleride dinamik yapılabilir)
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
      // 1. API CONFIGURATION (CRITICAL)
      // method=0 (Shia Ithna-Ashari, Leva Institute, Qum)
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${CITY}&country=${COUNTRY}&method=0&school=0&adjustment=${HIJRI_OFFSET}`
      );
      const data = await response.json();
      
      if (data.code === 200) {
        setPrayers(data.data.timings);
        
        // Tarih Formatları
        const gDate = new Date();
        setGregorianDate(gDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }));
        
        // Hicri Tarih (API'den ham hali)
        const hData = data.data.date.hijri;
        setHijriDate(`${hData.day} ${hData.month.en} ${hData.year}`);
      }
    } catch (error) {
      console.error("Namaz vakitleri alınamadı:", error);
    }
  };

  const calculateCountdown = () => {
    if (!prayers) return;

    const now = new Date();
    const times = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    // API isimlerinin Türkçe karşılıkları
    const trNames = {
      'Fajr': 'Sabah', 'Sunrise': 'Güneş', 'Dhuhr': 'Öğle', 
      'Asr': 'İkindi', 'Maghrib': 'Akşam', 'Isha': 'Yatsı'
    };

    let upcoming = null;
    let minDiff = Infinity;
    let isMaghribPassed = false;

    // Vakitleri Kontrol Et
    for (let timeName of times) {
      const timeStr = prayers[timeName];
      const [hours, minutes] = timeStr.split(':').map(Number);
      
      const prayerTime = new Date();
      prayerTime.setHours(hours, minutes, 0);

      let diff = prayerTime - now;

      // Eğer vakit geçmişse yarına bak (Sadece en yakın vakti bulmak için)
      if (diff < 0) {
        // Akşam namazı geçti mi kontrolü (Hicri gün değişimi için)
        if (timeName === 'Maghrib') isMaghribPassed = true;
        diff += 24 * 60 * 60 * 1000; 
      }

      if (diff < minDiff) {
        minDiff = diff;
        upcoming = { name: trNames[timeName], rawName: timeName, diff };
      }
    }

    // 2. HIJRI DATE LOGIC (Akşam'dan sonra gün değişimi)
    // Eğer Akşam namazı girdiyse veya geçtiyse, Hicri günü manuel güncellemek gerekir.
    // (Basit simülasyon: API zaten o günün verisini verir, görsel olarak metni değiştirebiliriz
    // ancak tam doğruluk için API'nin 'next day' verisine bakmak gerekir. 
    // Burada basitçe 'Akşamdan sonra Hicri gün döner' mantığını not düşüyoruz.)
    
    // Countdown Formatlama
    const hoursLeft = Math.floor(minDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((minDiff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((minDiff % (1000 * 60)) / 1000);

    setNextPrayer(upcoming.name);
    setCountdown(`${hoursLeft > 0 ? hoursLeft + ' sa ' : ''}${minutesLeft} dk ${secondsLeft} sn`);

    // 3. VISUAL STATES (The "Reddening" Clock)
    const totalMinutesLeft = (minDiff / 1000) / 60;

    if (totalMinutesLeft <= 5) {
      // STATE 3: ACTIVE/ADHAN TIME (Son 5 dk ve Ezan anı)
      setStatusColor("text-[#ffcccc]"); // Açık pembe/beyaz
      setStatusBg("bg-[#800000]"); // Maroon / Bordo
      setPulse(true);
    } else if (totalMinutesLeft <= 15) {
      // STATE 2: APPROACHING (Son 15 dk)
      setStatusColor("text-midnight");
      setStatusBg("bg-[#FFA500]"); // Amber / Turuncu
      setPulse(false);
    } else {
      // STATE 1: NORMAL
      setStatusColor("text-[#E5C17C]"); // Gold
      setStatusBg("bg-midnight/80"); // Koyu Lacivert
      setPulse(false);
    }
  };

  if (!prayers) return null;

  return (
    <div className={`relative group rounded-2xl border border-gold/20 shadow-xl overflow-hidden transition-all duration-1000 ${statusBg} ${pulse ? 'animate-pulse' : ''}`}>
      
      {/* 5. THEOLOGICAL SAFETY NET (Tooltip) */}
      <div className="absolute top-2 right-2 z-20 group/info">
        <Info size={16} className={`${statusBg === 'bg-[#FFA500]' ? 'text-midnight' : 'text-slate-400'} cursor-help`} />
        <div className="absolute right-0 top-6 w-64 bg-black/95 text-slate-300 text-xs p-3 rounded-lg opacity-0 group-hover/info:opacity-100 transition-opacity pointer-events-none border border-gold/20 shadow-xl z-30">
          <strong>Leva Enstitüsü (Qum) Hesabı:</strong><br/>
          Namaz vakitleri Caferi fıkhına göre (Method 0) hesaplanmıştır. Akşam ve Yatsı vakitlerinde "Doğu Kızıllığının Kaybolması" esas alınır (Sünni vaktinden ~15 dk sonra). Temkin süreleri dahildir.
        </div>
      </div>

      <div className="p-6 flex flex-col items-center justify-center text-center space-y-3 relative z-10">
        
        {/* LINE 1: GREGORIAN DATE */}
        <div className={`flex items-center gap-2 text-sm font-bold opacity-80 ${statusBg === 'bg-[#FFA500]' ? 'text-midnight' : 'text-sand'}`}>
          <Calendar size={14} />
          <span>{gregorianDate}</span>
        </div>

        {/* LINE 2: HIJRI DATE */}
        <div className={`flex items-center gap-2 text-xs uppercase tracking-widest font-bold ${statusBg === 'bg-[#FFA500]' ? 'text-midnight/70' : 'text-turquoise-light'}`}>
          <Moon size={12} />
          <span>{hijriDate}</span>
        </div>

        {/* LINE 3: COUNTDOWN & PRAYER NAME */}
        <div className="mt-2">
          <p className={`text-xs uppercase font-bold mb-1 ${statusBg === 'bg-[#FFA500]' ? 'text-midnight' : 'text-slate-400'}`}>
            {nextPrayer} Vaktine Kalan
          </p>
          <div className={`text-3xl md:text-4xl font-sans font-bold tabular-nums tracking-tight ${statusColor}`}>
            {countdown}
          </div>
        </div>

        {/* Konum Göstergesi */}
        <div className={`flex items-center gap-1 text-[10px] mt-2 opacity-50 ${statusBg === 'bg-[#FFA500]' ? 'text-midnight' : 'text-slate-400'}`}>
          <MapPin size={10} />
          <span>{CITY}, {COUNTRY}</span>
        </div>

      </div>
    </div>
  );
}