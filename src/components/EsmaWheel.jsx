import React, { useState } from 'react';
import { Sparkles, RefreshCcw } from 'lucide-react';

export default function EsmaWheel() {
  const [selectedEsma, setSelectedEsma] = useState(null);
  const [loading, setLoading] = useState(false);

  // Esma Listesi (Örnek olarak en bilinenleri ekledim, isterseniz çoğaltabilirsiniz)
  const esmalar = [
    { name: "Er-Rahman", meaning: "Dünyadaki her yaratılana merhamet eden.", zikir: 298 },
    { name: "El-Melik", meaning: "Mülkün gerçek sahibi, mutlak hükümdar.", zikir: 90 },
    { name: "El-Kuddüs", meaning: "Her türlü eksiklikten münezzeh olan.", zikir: 170 },
    { name: "El-Selam", meaning: "Kullarını selamete çıkaran, cennetteki bahtiyar kullarına selam veren.", zikir: 131 },
    { name: "El-Mümin", meaning: "Güven veren, emin kılan, koruyan.", zikir: 137 },
    { name: "El-Müheymin", meaning: "Gözetip koruyan, kainatın bütün işlerini idare eden.", zikir: 145 },
    { name: "El-Aziz", meaning: "İzzet sahibi, her şeye galip gelen.", zikir: 94 },
    { name: "El-Cebbar", meaning: "Azamet ve kudret sahibi, dilediğini yapan.", zikir: 206 },
    { name: "El-Mütekebbir", meaning: "Büyüklükte eşi, benzeri olmayan.", zikir: 662 },
    { name: "El-Halık", meaning: "Yaratan, yoktan var eden.", zikir: 731 },
    { name: "El-Fettah", meaning: "Her türlü müşkülleri açan ve kolaylaştıran.", zikir: 489 },
    { name: "El-Vedud", meaning: "Kullarını en çok seven, sevilmeye en layık olan.", zikir: 20 },
    { name: "El-Hak", meaning: "Varlığı hiç değişmeden duran. Var olan, hakkı ortaya çıkaran.", zikir: 108 },
    { name: "El-Hayy", meaning: "Ezeli ve ebedi bir hayat ile diri olan.", zikir: 18 },
    { name: "El-Kayyum", meaning: "Gökleri, yeri ve her şeyi tutan.", zikir: 156 },
  ];

  const handleSpin = () => {
    setLoading(true);
    setSelectedEsma(null);
    
    // Çark dönme efekti (kısa bir gecikme)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * esmalar.length);
      setSelectedEsma(esmalar[randomIndex]);
      setLoading(false);
    }, 1500); // 1.5 saniye bekler
  };

  return (
    <div className="w-full bg-gradient-to-br from-[#162e45] to-[#0F2C45] p-6 rounded-3xl border border-[#C5A059]/30 shadow-xl text-center relative overflow-hidden group">
      
      {/* Süsleme Arka Plan */}
      <div className="absolute top-0 right-0 p-4 opacity-5 text-[#C5A059]">
        <Sparkles size={150} />
      </div>

      <h2 className="text-2xl font-serif font-bold text-[#C5A059] mb-4 flex items-center justify-center gap-2">
        <Sparkles size={24}/> Günün Nasibi
      </h2>
      <p className="text-gray-400 mb-6 text-sm">Niyet et ve butona bas, bakalım gönlüne hangi Esma düşecek?</p>

      {/* Sonuç Alanı */}
      <div className="min-h-[160px] flex items-center justify-center mb-6">
        {loading ? (
          <div className="animate-spin text-[#C5A059]">
            <RefreshCcw size={48} />
          </div>
        ) : selectedEsma ? (
          <div className="animate-fade-in space-y-3">
             <h3 className="text-4xl font-bold text-white tracking-wider drop-shadow-md">{selectedEsma.name}</h3>
             <div className="w-16 h-1 bg-[#C5A059] mx-auto rounded-full"></div>
             <p className="text-gray-300 italic">"{selectedEsma.meaning}"</p>
             <div className="inline-block px-4 py-1 bg-[#C5A059]/20 border border-[#C5A059] rounded-full text-[#C5A059] text-sm font-bold mt-2">
                Ebced Değeri: {selectedEsma.zikir}
             </div>
          </div>
        ) : (
          <div className="text-gray-600 text-6xl opacity-20">?</div>
        )}
      </div>

      {/* Buton */}
      <button 
        onClick={handleSpin} 
        disabled={loading}
        className="w-full bg-[#C5A059] hover:bg-white text-[#0F2C45] font-bold py-4 rounded-xl transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Niyet Ediliyor..." : "Niyet Et ve Çek"}
      </button>
    </div>
  );
}