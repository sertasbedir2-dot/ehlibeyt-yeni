import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, MapPin, Calendar, Star, BookOpen, Crown } from 'lucide-react';

export default function OnDortMasum() {
  const [searchTerm, setSearchTerm] = useState("");

  // --- ANSİKLOPEDİK VERİ TABANI ---
  const masumlar = [
    {
      id: 1,
      name: "Hz. Muhammed (s.a.a)",
      title: "Hatemü'l Enbiya (Peygamberlerin Sonuncusu)",
      role: "Peygamber",
      dates: "571 - 632",
      burial: "Medine-i Münevvere",
      desc: "Alemlere rahmet olarak gönderilen, İslam dininin tebliğcisi ve Ehlibeyt'in atası. Yaratılmışların en şereflisidir."
    },
    {
      id: 2,
      name: "Hz. Ali (a.s)",
      title: "Emirü'l Müminin (Müminlerin Emiri)",
      role: "1. İmam",
      dates: "600 - 661",
      burial: "Necef-i Eşref",
      desc: "İlim şehrinin kapısı, Allah'ın aslanı ve Peygamber'in vasisi. Adalet ve velayetin tartışmasız simgesi."
    },
    {
      id: 3,
      name: "Hz. Fatımatu'z Zehra (s.a)",
      title: "Seyyidetü'n Nisa (Kadınların Efendisi)",
      role: "Peygamber Kızı / Masume",
      dates: "605 - 632",
      burial: "Medine (Kabri Gizlidir)",
      desc: "Peygamber'in 'Babasının Annesi' dediği, İmamet nurunun kaynağı ve Kevser suresinin tecellisi."
    },
    {
      id: 4,
      name: "İmam Hasan (a.s)",
      title: "Mücteba (Seçilmiş)",
      role: "2. İmam",
      dates: "625 - 670",
      burial: "Medine (Baki Mezarlığı)",
      desc: "Cennet gençlerinin efendisi, kerem ve sabır abidesi. Müslüman kanı dökülmemesi için yaptığı barışla tanınır."
    },
    {
      id: 5,
      name: "İmam Hüseyin (a.s)",
      title: "Seyyidü'ş Şüheda (Şehitlerin Efendisi)",
      role: "3. İmam",
      dates: "626 - 680",
      burial: "Kerbela",
      desc: "Aşura günü yaptığı kıyamla İslam'ı yeniden dirilten, zulme boyun eğmemenin evrensel sembolü."
    },
    {
      id: 6,
      name: "İmam Zeynel Abidin (a.s)",
      title: "Seccad (Çok Secde Eden)",
      role: "4. İmam",
      dates: "659 - 713",
      burial: "Medine (Baki Mezarlığı)",
      desc: "Kerbela sonrası İslam'ın maneviyatını dualarla (Sahife-i Seccadiye) koruyan ibadet önderi."
    },
    {
      id: 7,
      name: "İmam Muhammed Bakır (a.s)",
      title: "Bakır (İlmi Yaran)",
      role: "5. İmam",
      dates: "677 - 733",
      burial: "Medine (Baki Mezarlığı)",
      desc: "İslami ilimlerin kurucusu, hadis ve fıkıh hazinesinin kapılarını açan büyük bilgi önderi."
    },
    {
      id: 8,
      name: "İmam Cafer-i Sadık (a.s)",
      title: "Sadık (Doğru Söyleyen)",
      role: "6. İmam",
      dates: "702 - 765",
      burial: "Medine (Baki Mezarlığı)",
      desc: "Caferi fıkhının kurucusu. Yetiştirdiği binlerce öğrenciyle İslam medeniyetinin altın çağını hazırlamıştır."
    },
    {
      id: 9,
      name: "İmam Musa Kazım (a.s)",
      title: "Kazım (Öfkesini Yenen)",
      role: "7. İmam",
      dates: "745 - 799",
      burial: "Kazımiye (Bağdat)",
      desc: "Zindanlarda geçen ömrüne rağmen sabrı, ibadeti ve mucizeleriyle tanınan 'Bab-ül Hvaeic' (İstekler Kapısı)."
    },
    {
      id: 10,
      name: "İmam Ali Rıza (a.s)",
      title: "Rıza (Razı Olunan)",
      role: "8. İmam",
      dates: "765 - 818",
      burial: "Meşhed (Tus)",
      desc: "Horasan'ın güneşi. İlim meclislerinde diğer din alimlerine karşı İslam'ı savunan 'Alim-i Al-i Muhammed'."
    },
    {
      id: 11,
      name: "İmam Muhammed Taki (a.s)",
      title: "Cevad (Cömert)",
      role: "9. İmam",
      dates: "811 - 835",
      burial: "Kazımiye (Bağdat)",
      desc: "Çocuk yaşta imamete erişerek ilahi ilmin yaşla değil, Allah vergisi olduğunu kanıtlayan mucizevi imam."
    },
    {
      id: 12,
      name: "İmam Ali Naki (a.s)",
      title: "Hadi (Hidayet Eden)",
      role: "10. İmam",
      dates: "829 - 868",
      burial: "Samarra",
      desc: "Ağır baskı altında olmasına rağmen 'Ziyaret-i Camia' gibi derin duaları bizlere miras bırakan hidayet rehberi."
    },
    {
      id: 13,
      name: "İmam Hasan Askeri (a.s)",
      title: "Askeri (Askeri Bölgede Yaşayan)",
      role: "11. İmam",
      dates: "846 - 874",
      burial: "Samarra",
      desc: "İmam Mehdi'nin babası. Gaybet dönemine hazırlık sürecini yöneten ve tefsir ilmine ışık tutan imam."
    },
    {
      id: 14,
      name: "İmam Mehdi (a.f)",
      title: "Mehdi / Kaim (Kıyam Eden)",
      role: "12. İmam",
      dates: "869 - ...",
      burial: "Gaybette (Hayatta)",
      desc: "Allah'ın yeryüzündeki son hücceti. Zulümle dolan dünyayı adaletle doldurmak üzere zuhur edeceği vaat edilen kurtarıcı."
    }
  ];

  // Arama filtresi
  const filteredMasumlar = masumlar.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.burial.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <Helmet>
        <title>14 Masum | Ehlibeyt Yolu</title>
        <meta name="description" content="Hz. Muhammed (s.a.a), Hz. Fatıma (s.a) ve 12 İmam'ın hayatı, lakapları ve hikmetleri." />
      </Helmet>

      {/* --- HERO BÖLÜMÜ --- */}
      <div className="text-center space-y-4 py-8 bg-gradient-to-b from-midnight to-primary rounded-b-3xl border-b border-gold/10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 mb-2">
          <Crown size={16} /> <span className="text-xs font-bold tracking-widest uppercase">Nübüvvet ve Velayet Hattı</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand">
          14 Masum-u Pak
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto font-serif text-lg leading-relaxed">
          Arınmışlıkları Kur'an ile sabit olan (Ahzab, 33), hidayet önderleri ve karanlıkların aydınlatıcı kandilleri.
        </p>
        
        {/* Arama Çubuğu */}
        <div className="max-w-md mx-auto relative mt-6">
          <input 
            type="text" 
            placeholder="İsim, lakap veya şehir ara..." 
            className="w-full bg-primary-light border border-gold/20 rounded-xl py-3 px-12 text-sand placeholder-slate-500 focus:outline-none focus:border-gold/50 transition shadow-lg"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-gold" size={20} />
        </div>
      </div>

      {/* --- KARTLAR GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredMasumlar.map((masum) => (
          <div key={masum.id} className="group relative bg-primary-light rounded-2xl overflow-hidden border border-white/5 hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 shadow-xl">
            
            {/* Kart Üst Süsü (Altın Çizgi) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="p-6 space-y-4">
              {/* Başlık ve Rol */}
              <div className="flex justify-between items-start">
                <div>
                   <span className="text-xs font-bold text-spiritual-light tracking-widest uppercase">{masum.role}</span>
                   <h2 className="text-2xl font-sans font-bold text-sand mt-1 group-hover:text-gold transition-colors">{masum.name}</h2>
                </div>
                <div className="w-10 h-10 rounded-full bg-midnight border border-gold/20 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                   <Star size={18} fill="currentColor" className="text-gold/20" />
                </div>
              </div>

              {/* Lakap */}
              <div className="bg-midnight/50 p-3 rounded-lg border-l-2 border-gold/50">
                <p className="text-sm text-gold italic font-serif">"{masum.title}"</p>
              </div>

              {/* Bilgiler (Tarih ve Yer) */}
              <div className="flex items-center gap-4 text-xs text-slate-400 font-sans border-t border-white/5 pt-4">
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-spiritual" />
                  <span>{masum.dates}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-spiritual" />
                  <span>{masum.burial}</span>
                </div>
              </div>

              {/* Açıklama */}
              <p className="text-sm text-slate-300 leading-relaxed font-serif border-t border-white/5 pt-4 opacity-80 group-hover:opacity-100 transition-opacity">
                {masum.desc}
              </p>
            </div>
            
            {/* Arka Plan Numarası (Estetik Detay) */}
            <div className="absolute -bottom-6 -right-4 text-[120px] font-bold text-white/5 pointer-events-none select-none font-sans">
              {masum.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}