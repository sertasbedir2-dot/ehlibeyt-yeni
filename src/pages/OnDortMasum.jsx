import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// --- 1. VERİ KATMANI (Artık dosya içinde) ---
const MASUM_NODES = [
  {
    id: "node_1",
    labels: ["Kişi", "Masum", "Peygamber"],
    properties: {
      name_en: "Hz. Muhammed (s.a.a)",
      name_ar: "مُحَمَّد",
      title: "Hâtemü'l-Enbiyâ",
      era: "Vahiy Dönemi",
      color_theme: "#1F2937",
    }
  },
  {
    id: "node_2",
    labels: ["Kişi", "Masum", "İmam"],
    properties: {
      name_en: "Hz. Ali (a.s)",
      name_ar: "عَلِيّ",
      title: "Emîrü'l-Mü'minîn",
      era: "Hilafet",
      color_theme: "#C9A66B",
    }
  },
  {
    id: "node_3",
    labels: ["Kişi", "Masum", "Lady"],
    properties: {
      name_en: "Hz. Fatıma (s.a)",
      name_ar: "فَاطِمَة",
      title: "Seyyidetü'n-Nisâ",
      era: "Hüzün",
      color_theme: "#8DA399",
    }
  },
  {
    id: "node_4",
    labels: ["Kişi", "Masum", "İmam"],
    properties: {
      name_en: "İmam Hasan (a.s)",
      name_ar: "الْحَسَن",
      title: "Mücteba",
      era: "Sulh",
      color_theme: "#C9A66B",
    }
  },
  {
    id: "node_5",
    labels: ["Kişi", "Masum", "İmam"],
    properties: {
      name_en: "İmam Hüseyin (a.s)",
      name_ar: "الْحُسَيْن",
      title: "Seyyidü'ş-Şüheda",
      era: "Kıyam",
      color_theme: "#991b1b",
    }
  },
  {
    id: "node_6",
    labels: ["Kişi", "Masum", "İmam"],
    properties: {
      name_en: "İmam Zeynel Abidin (a.s)",
      name_ar: "عَلِيّ ٱبْن ٱلْحُسَيْن",
      title: "Seccad",
      era: "Dua ve Gözyaşı",
      color_theme: "#C9A66B",
    }
  },
  {
    id: "node_7",
    labels: ["Kişi", "Masum", "İmam"],
    properties: {
      name_en: "İmam Muhammed Bakır (a.s)",
      name_ar: "مُحَمَّد ٱلْبَاقِر",
      title: "Bakırul Ulum",
      era: "İlim",
      color_theme: "#C9A66B",
    }
  },
  {
    id: "node_8",
    labels: ["Kişi", "Masum", "İmam"],
    properties: {
      name_en: "İmam Cafer-i Sadık (a.s)",
      name_ar: "جَعْفَر ٱلصَّادِق",
      title: "Sadık",
      era: "Mektep",
      color_theme: "#C9A66B",
    }
  },
  {
    id: "node_9",
    labels: ["Kişi", "Masum", "İmam"],
    properties: {
      name_en: "İmam Musa Kazım (a.s)",
      name_ar: "مُوسَىٰ ٱلْكَاظِم",
      title: "Kazım",
      era: "Sabır",
      color_theme: "#C9A66B",
    }
  },
  {
    id: "node_10",
    labels: ["Kişi", "Masum", "İmam"],
    properties: {
      name_en: "İmam Ali Rıza (a.s)",
      name_ar: "عَلِيّ ٱلرِّضَا",
      title: "Rıza",
      era: "Gurbet",
      color_theme: "#C9A66B",
    }
  },
  {
    id: "node_11",
    labels: ["Kişi", "Masum", "İmam"],
    properties: {
      name_en: "İmam Muhammed Taki (a.s)",
      name_ar: "مُحَمَّد ٱلْجَوَاد",
      title: "Cevad",
      era: "Cömertlik",
      color_theme: "#C9A66B",
    }
  },
  {
    id: "node_12",
    labels: ["Kişi", "Masum", "İmam"],
    properties: {
      name_en: "İmam Ali Naki (a.s)",
      name_ar: "عَلِيّ ٱلْهَادِي",
      title: "Hadi",
      era: "Hidayet",
      color_theme: "#C9A66B",
    }
  },
  {
    id: "node_13",
    labels: ["Kişi", "Masum", "İmam"],
    properties: {
      name_en: "İmam Hasan Askeri (a.s)",
      name_ar: "الْحَسَن ٱلْعَسْكَرِيّ",
      title: "Askeri",
      era: "Hazırlık",
      color_theme: "#C9A66B",
    }
  },
  {
    id: "node_14",
    labels: ["Kişi", "Masum", "İmam"],
    properties: {
      name_en: "İmam Mehdi (a.f)",
      name_ar: "ٱلْمَهْدِيّ",
      title: "Kaim",
      era: "Zuhur",
      color_theme: "#C9A66B",
    }
  }
];

// --- 2. GÖRSEL KATMAN (p5.js Entegrasyonu) ---
const GeometricSanctuary = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let myP5;
    const initP5 = async () => {
      // p5 kütüphanesini dinamik olarak yüklüyoruz (SSR hatasını önler)
      try {
        const p5 = (await import('p5')).default;
        
        const sketch = (p) => {
          let t = 0;

          p.setup = () => {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent(containerRef.current);
            p.noStroke();
            // Kanvasın arkada kalmasını sağla
            canvas.style('position', 'fixed');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '-1');
            canvas.style('pointer-events', 'none');
          };

          p.draw = () => {
            const bg = p.color('#F5F5F0'); 
            const c1 = p.color('#C9A66B'); 
            const c2 = p.color('#8DA399'); 

            p.background(bg);
            
            t += 0.005; 
            const breath = (p.sin(t) + 1) / 2; 
            
            const gridSize = 120; // Performans için grid büyütüldü (daha az çizim)
            
            for (let x = 0; x < p.width; x += gridSize) {
              for (let y = 0; y < p.height; y += gridSize) {
                p.push();
                p.translate(x + gridSize / 2, y + gridSize / 2);
                p.rotate(p.TWO_PI * breath * 0.05);
                const scaleFactor = p.map(breath, 0, 1, 0.8, 1.2);
                p.scale(scaleFactor);

                p.fill(p.lerpColor(c1, c2, (x + y) / 1000));
                p.globalAlpha = 0.15 + (breath * 0.1); 
                
                // Basit Yıldız
                let angle = p.TWO_PI / 8;
                let halfAngle = angle / 2.0;
                p.beginShape();
                for (let a = 0; a < p.TWO_PI; a += angle) {
                  let sx = 0 + p.cos(a) * 40;
                  let sy = 0 + p.sin(a) * 40;
                  p.vertex(sx, sy);
                  sx = 0 + p.cos(a + halfAngle) * 20;
                  sy = 0 + p.sin(a + halfAngle) * 20;
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
        console.error("p5 yüklenemedi:", error);
      }
    };

    initP5();

    return () => {
      if (myP5) myP5.remove();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 opacity-60 pointer-events-none" />;
};

// --- 3. ANA SAYFA (Bileşenleri Birleştirme) ---
export default function OnDortMasum() {
  const [selectedId, setSelectedId] = useState(null);
  const [aiComponent, setAiComponent] = useState(null);

  const handleCardClick = (node) => {
    setSelectedId(node.id);
    setAiComponent(null);
    
    // Simüle edilmiş AI yanıtı
    setTimeout(() => {
      setAiComponent(
        <div className="p-6 bg-white/50 backdrop-blur rounded-lg border border-amber-900/10 animate-fade-in">
          <h3 className="font-serif text-lg text-amber-900">Üretken İçgörü: {node.properties.title}</h3>
          <p className="text-sm text-gray-600 mt-2">
            İsnad ilişkileri ve tarihsel bağlam haritası yükleniyor...
            <br/>
            <span className="text-amber-700 font-medium">(Burada Hadis Ağı Grafiği görünecek)</span>
          </p>
        </div>
      );
    }, 800);
  };

  const resetSelection = () => {
    setSelectedId(null);
    setAiComponent(null);
  };

  return (
    <div className="relative min-h-screen font-sans text-gray-900 overflow-hidden bg-[#F5F5F0]">
      <Helmet>
        <title>14 Masum | Ehlibeyt Yolu</title>
      </Helmet>
      
      {/* Arka Plan */}
      <GeometricSanctuary />

      <main className="relative z-10 container mx-auto px-4 py-20">
        <header className="mb-12 text-center">
            <h1 className="text-4xl font-serif text-amber-900 mb-2">On Dört Masum</h1>
            <p className="text-gray-600 italic">İlim dairesine girmek için bir rehber seçin.</p>
        </header>

        <motion.div 
            layout 
            className={`grid gap-6 transition-all duration-500 ${selectedId ? 'grid-cols-1 md:grid-cols-[1fr_2fr]' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}
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
                    group relative bg-white/80 backdrop-blur-sm 
                    border border-amber-900/5 rounded-xl overflow-hidden
                    cursor-pointer hover:shadow-xl hover:shadow-amber-900/5 
                    transition-all duration-300
                    ${isSelected ? 'h-auto cursor-default ring-2 ring-amber-500/20' : 'h-64 flex flex-col justify-center items-center text-center'}
                  `}
                >
                  <div className="p-6 w-full">
                    <h2 className="text-3xl mb-2 text-amber-950 transition-all duration-400 ease-out font-serif">
                      {node.properties.name_ar}
                    </h2>
                    
                    <p className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                      {node.properties.name_en}
                    </p>

                    {isSelected && (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="mt-8 text-left"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-1 rounded">
                                    Graph ID: {node.id}
                                </span>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); resetSelection(); }}
                                    className="text-sm text-gray-500 hover:text-red-600 transition-colors bg-white px-3 py-1 rounded border border-gray-200"
                                >
                                    Kapat ✕
                                </button>
                            </div>
                            
                            <div className="min-h-[300px] border-t border-dashed border-gray-300 pt-6">
                                {aiComponent ? (
                                    aiComponent
                                ) : (
                                    <div className="flex items-center gap-3 text-amber-800 animate-pulse p-4">
                                        <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" />
                                        <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce delay-75" />
                                        <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce delay-150" />
                                        <span className="text-sm font-medium ml-2">Bilgi Çizgesi Yükleniyor...</span>
                                    </div>
                                )}
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