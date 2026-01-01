import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Shield, Sun, CloudRain, Moon, X, Sparkles, BookOpen } from 'lucide-react';

export default function ManeviReceteler() {
  const [selectedRecete, setSelectedRecete] = useState(null);

  // --- MANEVİ ECZANE VERİTABANI ---
  const receteler = [
    {
      id: 1,
      title: "Ruhsal Daralma ve Sıkıntı",
      source: "Hz. Fatıma (s.a) Tesbihatı",
      desc: "Kalbiniz daraldığında ve dünya üzerinize geldiğinde okunacak reçete.",
      icon: <CloudRain size={32} className="text-spiritual-light" />,
      content: {
        arapca: "Allahu Ekber (34), Elhamdulillah (33), Subhanallah (33)",
        meal: "Allah en büyüktür. Hamd Allah'a mahsustur. Allah noksan sıfatlardan münezzehtir.",
        not: "Her namazdan sonra ve uyumadan önce okunması, kalbi hüzünden arındırır ve manevi bir zırh oluşturur."
      }
    },
    {
      id: 2,
      title: "Rızık ve Bereket",
      source: "Vakıa Suresi",
      desc: "Maddi zorluklar ve geçim sıkıntısı çekenler için Ehlibeyt tavsiyesi.",
      icon: <Sun size={32} className="text-gold" />,
      content: {
        arapca: "Sûretu'l-Vâkıa",
        meal: "Vakıa Suresi'nin okunması.",
        not: "İmam Cafer-i Sadık (a.s) buyurmuştur: 'Kim her gece Vakıa suresini okursa, asla fakirlik yüzü görmez ve Allah'ın dostlarından olur.'"
      }
    },
    {
      id: 3,
      title: "Korku ve Endişe",
      source: "Ayet-el Kürsi",
      desc: "Gelecek kaygısı ve ani korkulara karşı manevi sığınak.",
      icon: <Shield size={32} className="text-clay" />,
      content: {
        arapca: "Allâhu lâ ilâhe illâ huve'l-hayyu'l-kayyûm...",
        meal: "Allah, kendisinden başka ilah olmayandır; Hayy'dır, Kayyum'dur...",
        not: "Evden çıkarken, uyurken ve korku anında okunması insanı her türlü beladan muhafaza eder."
      }
    },
    {
      id: 4,
      title: "Hastalık ve Şifa",
      source: "Sahife-i Seccadiye (15. Dua)",
      desc: "İmam Zeynel Abidin'in (a.s) hastalandığında okuduğu dua.",
      icon: <Heart size={32} className="text-rose-400" />,
      content: {
        arapca: "Allahumme leke'l hamdu ala ma lem ezel atasarrafu fihi min selameti bedeni...",
        meal: "Allah'ım! Bedenimin sağlığı içinde yaşayıp gittiğim günler için sana hamdolsun.",
        not: "Hastalık anında sadece ilaca değil, Şafi olan Allah'a sığınmak iyileşmeyi hızlandırır."
      }
    },
    {
      id: 5,
      title: "Günahların Affı",
      source: "Kumeyl Duası",
      desc: "Perşembe geceleri okunan, Hz. Ali'nin (a.s) öğrettiği büyük bağışlanma duası.",
      icon: <Moon size={32} className="text-spiritual" />,
      content: {
        arapca: "Allahumme inni es'eluke bi rahmetike'lleti vesiat kulle şey...",
        meal: "Allah'ım! Her şeyi kuşatan rahmetin hakkına senden istiyorum...",
        not: "Bu dua, rızkın artmasına, düşmanların şerrinden korunmaya ve günahların affına vesiledir."
      }
    },
    {
      id: 6,
      title: "İlahi Aşk ve Marifet",
      source: "Münacat-ı Şabaniye",
      desc: "Ehlibeyt İmamlarının tamamının okuduğu rivayet edilen özel münacat.",
      icon: <Sparkles size={32} className="text-gold" />,
      content: {
        arapca: "İlahi heb li kemale'l-inkitai ileyk...",
        meal: "Allah'ım! Sana tam anlamıyla yönelme kemalini bana bağışla...",
        not: "Kalbin dünya kirlerinden arınıp sadece Allah'a bağlanması için okunur."
      }
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12 relative">
      <Helmet>
        <title>Manevi Reçeteler | Ehlibeyt Yolu</title>
        <meta name="description" content="Ruhsal sıkıntılar, rızık ve şifa için Ehlibeyt kaynaklı manevi reçeteler ve dualar." />
      </Helmet>

      {/* --- HERO BÖLÜMÜ --- */}
      <div className="text-center space-y-4 py-8 bg-gradient-to-b from-midnight to-[#162e45] rounded-b-3xl border-b border-gold/10">
        <h1 className="text-3xl md:text-5xl font-sans font-bold text-gold flex justify-center items-center gap-3">
           <Sparkles className="animate-pulse" /> Manevi Eczane
        </h1>
        <p className="text-slate-300 max-w-2xl mx-auto font-serif text-lg leading-relaxed">
          "Dua müminin silahı, dinin direği ve göklerin nurudur." <br/> <span className="text-sm text-gold">— Hz. Muhammed (s.a.a)</span>
        </p>
      </div>

      {/* --- REÇETE KARTLARI --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {receteler.map((recete) => (
          <button 
            key={recete.id} 
            onClick={() => setSelectedRecete(recete)}
            className="group text-left bg-[#162e45] p-6 rounded-2xl border border-white/5 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 hover:-translate-y-1 shadow-lg relative overflow-hidden"
          >
            {/* Arka Plan Deseni */}
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <BookOpen size={80} />
            </div>

            <div className="flex justify-between items-start mb-4 relative z-10">
               <div className="p-3 bg-midnight rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                 {recete.icon}
               </div>
               <span className="text-[10px] font-bold text-slate-400 border border-slate-600 px-2 py-1 rounded-full uppercase tracking-wider">
                 Şifa
               </span>
            </div>
            
            <h3 className="text-xl font-bold text-sand mb-1 font-sans group-hover:text-gold transition-colors relative z-10">
              {recete.title}
            </h3>
            <p className="text-xs text-spiritual-light mb-3 font-bold uppercase tracking-wide relative z-10">
              Kaynak: {recete.source}
            </p>
            <p className="text-slate-400 text-sm font-serif line-clamp-2 relative z-10">
              {recete.desc}
            </p>
            
            <div className="mt-4 text-gold text-xs font-bold flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity relative z-10">
               Reçeteyi Görüntüle <Sparkles size={12} />
            </div>
          </button>
        ))}
      </div>

      {/* --- MODAL (POPUP) PENCERE --- */}
      {selectedRecete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#162e45] border border-gold/30 rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-midnight p-6 border-b border-gold/10 flex justify-between items-center sticky top-0 z-10">
               <div>
                  <h2 className="text-2xl font-bold text-gold font-sans">{selectedRecete.title}</h2>
                  <p className="text-spiritual-light text-sm font-bold uppercase">{selectedRecete.source}</p>
               </div>
               <button 
                 onClick={() => setSelectedRecete(null)}
                 className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-red-500/20 transition"
               >
                 <X size={24} />
               </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
               
               {/* Arapça / Dua Metni */}
               <div className="bg-midnight/50 p-6 rounded-2xl border border-white/5 text-center">
                  <p className="text-2xl md:text-3xl font-serif text-sand leading-loose" style={{ direction: 'rtl' }}>
                     {selectedRecete.content.arapca}
                  </p>
               </div>

               {/* Meal */}
               <div className="text-center space-y-2">
                  <h4 className="text-gold font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                    <span className="w-8 h-[1px] bg-gold/30"></span> Anlamı <span className="w-8 h-[1px] bg-gold/30"></span>
                  </h4>
                  <p className="text-slate-200 text-lg font-serif italic leading-relaxed">
                    "{selectedRecete.content.meal}"
                  </p>
               </div>

               {/* Not / Uygulama */}
               <div className="bg-spiritual-dim/10 border-l-4 border-spiritual p-4 rounded-r-xl">
                  <h5 className="text-spiritual font-bold text-sm mb-1">Uygulama Notu:</h5>
                  <p className="text-slate-400 text-sm">
                    {selectedRecete.content.not}
                  </p>
               </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-midnight p-4 border-t border-gold/10 text-center text-xs text-slate-500">
               Ehlibeyt Yolu • Manevi Şifa Kaynağı
            </div>

          </div>
        </div>
      )}

    </div>
  );
}