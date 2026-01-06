import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Calendar, Crown, X, Star } from 'lucide-react';

// --- 1. VERİ KATMANI (Sizin eski verilerinizle harmanlandı) ---
const MASUM_NODES = [
  {
    id: 1,
    properties: {
      name_ar: "مُحَمَّد",
      name_tr: "Hz. Muhammed (s.a.a)",
      title: "Hâtemü'l-Enbiyâ",
      role: "Peygamber",
      dates: "571 - 632",
      burial: "Medine-i Münevvere",
      desc: "Alemlere rahmet olarak gönderilen, İslam dininin tebliğcisi ve Ehlibeyt'in atası. Yaratılmışların en şereflisidir."
    }
  },
  {
    id: 2,
    properties: {
      name_ar: "عَلِيّ",
      name_tr: "Hz. Ali (a.s)",
      title: "Emîrü'l-Mü'minîn",
      role: "1. İmam",
      dates: "600 - 661",
      burial: "Necef-i Eşref",
      desc: "İlim şehrinin kapısı, Allah'ın aslanı ve Peygamber'in vasisi. Adalet ve velayetin tartışmasız simgesi."
    }
  },
  {
    id: 3,
    properties: {
      name_ar: "فَاطِمَة",
      name_tr: "Hz. Fatıma (s.a)",
      title: "Seyyidetü'n-Nisâ",
      role: "Peygamber Kızı",
      dates: "605 - 632",
      burial: "Medine (Gizli)",
      desc: "Peygamber'in 'Babasının Annesi' dediği, İmamet nurunun kaynağı ve Kevser suresinin tecellisi."
    }
  },
  {
    id: 4,
    properties: {
      name_ar: "الْحَسَن",
      name_tr: "İmam Hasan (a.s)",
      title: "Mücteba",
      role: "2. İmam",
      dates: "625 - 670",
      burial: "Medine (Baki)",
      desc: "Cennet gençlerinin efendisi, kerem ve sabır abidesi. Müslüman kanı dökülmemesi için yaptığı barışla tanınır."
    }
  },
  {
    id: 5,
    properties: {
      name_ar: "الْحُسَيْن",
      name_tr: "İmam Hüseyin (a.s)",
      title: "Seyyidü'ş-Şüheda",
      role: "3. İmam",
      dates: "626 - 680",
      burial: "Kerbela",
      desc: "Aşura günü yaptığı kıyamla İslam'ı yeniden dirilten, zulme boyun eğmemenin evrensel sembolü."
    }
  },
  {
    id: 6,
    properties: {
      name_ar: "عَلِيّ ٱبْن ٱلْحُسَيْن",
      name_tr: "İmam Zeynel Abidin (a.s)",
      title: "Seccad",
      role: "4. İmam",
      dates: "659 - 713",
      burial: "Medine (Baki)",
      desc: "Kerbela sonrası İslam'ın maneviyatını dualarla (Sahife-i Seccadiye) koruyan ibadet önderi."
    }
  },
  {
    id: 7,
    properties: {
      name_ar: "مُحَمَّد ٱلْبَاقِر",
      name_tr: "İmam Muhammed Bakır (a.s)",
      title: "Bakır",
      role: "5. İmam",
      dates: "677 - 733",
      burial: "Medine (Baki)",
      desc: "İslami ilimlerin kurucusu, hadis ve fıkıh hazinesinin kapılarını açan büyük bilgi önderi."
    }
  },
  {
    id: 8,
    properties: {
      name_ar: "جَعْفَر ٱلصَّادِق",
      name_tr: "İmam Cafer-i Sadık (a.s)",
      title: "Sadık",
      role: "6. İmam",
      dates: "702 - 765",
      burial: "Medine (Baki)",
      desc: "Caferi fıkhının kurucusu. Yetiştirdiği binlerce öğrenciyle İslam medeniyetinin altın çağını hazırlamıştır."
    }
  },
  {
    id: 9,
    properties: {
      name_ar: "مُوسَىٰ ٱلْكَاظِم",
      name_tr: "İmam Musa Kazım (a.s)",
      title: "Kazım",
      role: "7. İmam",
      dates: "745 - 799",
      burial: "Kazımiye",
      desc: "Zindanlarda geçen ömrüne rağmen sabrı ve mucizeleriyle tanınan 'Bab-ül Hvaeic' (İstekler Kapısı)."
    }
  },
  {
    id: 10,
    properties: {
      name_ar: "عَلِيّ ٱلرِّضَا",
      name_tr: "İmam Ali Rıza (a.s)",
      title: "Rıza",
      role: "8. İmam",
      dates: "765 - 818",
      burial: "Meşhed",
      desc: "Horasan'ın güneşi. İlim meclislerinde diğer din alimlerine karşı İslam'ı savunan büyük alim."
    }
  },
  {
    id: 11,
    properties: {
      name_ar: "مُحَمَّد ٱلْجَوَاد",
      name_tr: "İmam Muhammed Taki (a.s)",
      title: "Cevad",
      role: "9. İmam",
      dates: "811 - 835",
      burial: "Kazımiye",
      desc: "Çocuk yaşta imamete erişerek ilahi ilmin yaşla değil, Allah vergisi olduğunu kanıtlayan mucize."
    }
  },
  {
    id: 12,
    properties: {
      name_ar: "عَلِيّ ٱلْهَادِي",
      name_tr: "İmam Ali Naki (a.s)",
      title: "Hadi",
      role: "10. İmam",
      dates: "829 - 868",
      burial: "Samarra",
      desc: "Ağır baskı altında olmasına rağmen 'Ziyaret-i Camia' gibi derin duaları miras bırakan rehber."
    }
  },
  {
    id: 13,
    properties: {
      name_ar: "الْحَسَن ٱلْعَسْكَرِيّ",
      name_tr: "İmam Hasan Askeri (a.s)",
      title: "Askeri",
      role: "11. İmam",
      dates: "846 - 874",
      burial: "Samarra",
      desc: "İmam Mehdi'nin babası. Gaybet dönemine hazırlık sürecini yöneten ve tefsir ilmine ışık tutan imam."
    }
  },
  {
    id: 14,
    properties: {
      name_ar: "ٱلْمَهْدِيّ",
      name_tr: "İmam Mehdi (a.f)",
      title: "Kaim",
      role: "12. İmam",
      dates: "869 - ...",
      burial: "Gaybette",
      desc: "Allah'ın yeryüzündeki son hücceti. Zulümle dolan dünyayı adaletle doldurmak üzere zuhur edecek kurtarıcı."
    }
  }
];

// --- 2. GÖRSEL KATMAN (p5.js - KOYU TEMA) ---
const GeometricSanctuary = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let myP5;
    const initP5 = async () => {
      try {
        const p5 = (await import('p5')).default;
        
        const sketch = (p) => {
          let t = 0;

          p.setup = () => {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent(containerRef.current);
            p.noStroke();
            canvas.style('position', 'fixed');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '0'); // Layout background ile karışması için
            canvas.style('pointer-events', 'none');
          };

          p.draw = () => {
            p.clear(); // Arka planı CSS'e bırakıyoruz (Koyu Yeşil)
            
            t += 0.005; 
            const breath = (p.sin(t) + 1) / 2; 
            
            const gridSize = 150; 
            
            for (let x = 0; x < p.width; x += gridSize) {
              for (let y = 0; y < p.height; y += gridSize) {
                p.push();
                p.translate(x + gridSize / 2, y + gridSize / 2);
                p.rotate(p.TWO_PI * breath * 0.02); // Yavaş dönüş
                const scaleFactor = p.map(breath, 0, 1, 0.9, 1.1);
                p.scale(scaleFactor);

                // RENK AYARI: Altın Sarısı (Düşük Opaklık)
                p.fill(255, 215, 0, 15); // RGB(255,215,0) = Gold, 15 = Çok silik
                p.stroke(255, 215, 0, 30);
                p.strokeWeight(1);
                
                // Geometrik Şekil (Sekizgen Yıldız İskeleti)
                let angle = p.TWO_PI / 8;
                let halfAngle = angle / 2.0;
                p.beginShape();
                for (let a = 0; a < p.TWO_PI; a += angle) {
                  let sx = 0 + p.cos(a) * 50;
                  let sy = 0 + p.sin(a) * 50;
                  p.vertex(sx, sy);
                  sx = 0 + p.cos(a + halfAngle) * 25;
                  sy = 0 + p.sin(a + halfAngle) * 25;
                  p.vertex(sx, sy);
                }
                p.endShape(p.CLOSE);
                p.pop();
              }
            }
          };

          p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
          };
        };

        myP5 = new p5(sketch);
      } catch (error) {
        console.error("p5 hatası:", error);
      }
    };

    initP5();

    return () => {
      if (myP5) myP5.remove();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />;
};

// --- 3. ANA SAYFA ---
export default function OnDortMasum() {
  const [selectedId, setSelectedId] = useState(null);

  const handleCardClick = (node) => {
    setSelectedId(node.id);
  };

  const resetSelection = () => {
    setSelectedId(null);
  };

  return (
    // DÜZELTME: Arka plan sitenin ana rengi (Koyu Yeşil) yapıldı
    <div className="relative min-h-screen font-sans overflow-hidden bg-[#0f3d3e] text-sand-light pb-20">
      <Helmet>
        <title>14 Masum | Ehlibeyt Yolu</title>
      </Helmet>
      
      {/* Arka Plan Deseni */}
      <GeometricSanctuary />

      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Başlık */}
        <div className="text-center mb-12 space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/10 text-gold border border-gold/20 backdrop-blur-sm">
             <Crown size={16} /> <span className="text-xs font-bold tracking-widest uppercase">Nübüvvet ve Velayet</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-sand via-gold to-sand drop-shadow-sm">
             On Dört Masum-u Pak
           </h1>
           <p className="text-slate-300 italic max-w-xl mx-auto">
             "Allah sadece siz Ehlibeyt'ten kiri gidermek ve sizi tertemiz yapmak ister." (Ahzab, 33)
           </p>
        </div>

        <motion.div 
            layout 
            className={`grid gap-6 transition-all duration-500 ${selectedId ? 'grid-cols-1 md:grid-cols-[1fr_2fr]' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}
        >
          <AnimatePresence>
            {MASUM_NODES.map((node) => {
              const isSelected = selectedId === node.id;
              const isHidden = selectedId && !isSelected;

              if (isHidden) return null;

              return (
                <motion.div
                  layoutId={`card-${node.id}`}
                  key={node.id}
                  onClick={() => !isSelected && handleCardClick(node)}
                  className={`
                    group relative backdrop-blur-md rounded-2xl overflow-hidden
                    border border-gold/10 hover:border-gold/40
                    cursor-pointer transition-all duration-500
                    ${isSelected 
                        ? 'bg-[#0a2728]/95 h-auto cursor-default ring-1 ring-gold/30 shadow-2xl' 
                        : 'bg-[#164e50]/40 hover:bg-[#1a5c5e]/60 h-72 flex flex-col justify-center items-center text-center hover:-translate-y-2 hover:shadow-xl'
                    }
                  `}
                >
                  {/* Kart Süsü (Gradient) */}
                  <div className={`absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isSelected ? 'opacity-20' : ''}`} />

                  <div className="p-6 w-full h-full flex flex-col justify-between relative z-10">
                    
                    {/* İkon / Rol */}
                    <div className={`flex justify-center ${isSelected ? 'justify-start mb-4' : 'mb-2'}`}>
                       <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                          <Star size={18} fill="currentColor" className="opacity-80" />
                       </div>
                    </div>

                    {/* İsimler */}
                    <div className={`${isSelected ? 'text-left' : 'text-center'}`}>
                        <h2 className="text-4xl mb-1 text-gold/90 font-serif font-medium leading-tight drop-shadow-md">
                        {node.properties.name_ar}
                        </h2>
                        <h3 className="text-lg font-bold text-white tracking-wide">
                        {node.properties.name_tr}
                        </h3>
                        <p className="text-xs uppercase tracking-widest text-slate-400 mt-1 font-medium">
                        {node.properties.role}
                        </p>
                    </div>

                    {/* Genişletilmiş İçerik (Sadece Tıklanınca Görünür) */}
                    {isSelected && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: 0.2 }}
                            className="mt-8 text-left border-t border-white/10 pt-6"
                        >
                            {/* Kapat Butonu */}
                            <button 
                                onClick={(e) => { e.stopPropagation(); resetSelection(); }}
                                className="absolute top-4 right-4 text-slate-400 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-white/5"
                            >
                                <X size={24} />
                            </button>

                            {/* Detay Bilgileri */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-1">
                                    <span className="text-xs text-gold/70 uppercase tracking-wider block">Lakap</span>
                                    <span className="text-lg text-white font-serif">"{node.properties.title}"</span>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-gold/70 uppercase tracking-wider block">Kabri Şerif</span>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <MapPin size={16} className="text-gold" />
                                        <span>{node.properties.burial}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-gold/70 uppercase tracking-wider block">Tarihler</span>
                                    <div className="flex items-center gap-2 text-slate-200">
                                        <Calendar size={16} className="text-gold" />
                                        <span>{node.properties.dates}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#0f3d3e] p-5 rounded-xl border border-white/5 shadow-inner">
                                <p className="text-slate-300 leading-relaxed font-serif text-lg">
                                    {node.properties.desc}
                                </p>
                            </div>
                        </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}