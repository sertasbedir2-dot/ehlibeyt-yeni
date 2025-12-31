import React, { useState } from 'react';

// Veri Kaynağı: Nūr Engine Document - 5.2. Sentiment-Based Prescriptions
const prescriptions = [
  {
    id: 1,
    mood: "Daralmış / Kaygılı (Anxiety)",
    source: "İnşirah Suresi & Sahifa Sajjadiya",
    content: "Rabbin göğsünü genişletmedi mi? Belini büken yükünü üzerinden almadı mı? Muhakkak ki her zorlukla beraber bir kolaylık vardır.",
    action: "Şimdi 7 kez 'Ya Fettah' oku ve derin bir nefes al.",
    color: "bg-teal-600", // Turkuaz: Peace/Paradise
    textColor: "text-teal-800"
  },
  {
    id: 2,
    mood: "Sevinçli / Şükür Dolu (Joy)",
    source: "Hamd (Praise) & Sadaka Önerisi",
    content: "Hamd, bizi hidayete erdiren Allah'a mahsustur. Eğer O bize yol göstermeseydi, biz doğru yolu bulamazdık.",
    action: "Bu sevinci mühürlemek için bugün dijital veya fiziksel bir sadaka ver.",
    color: "bg-yellow-600", // Altın: Knowledge/Kaaba
    textColor: "text-yellow-800"
  },
  {
    id: 3,
    mood: "Pişman / Hüzünlü",
    source: "Tevbe Duası (Sahifa Sajjadiya)",
    content: "Allah’ım, pişmanlığımı kabul et. Çünkü Sen, tövbeleri kabul edensin ve Rahîm'sin.",
    action: "Geçmişi düşünme, şu an 'Estağfirullah' diyerek sayfayı temizle.",
    color: "bg-gray-800", // Siyah: Derinlik
    textColor: "text-gray-800"
  }
];

const ManeviReceteler = () => {
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans min-h-screen">
      {/* Header - Nūr Engine Minimalizmi */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Manevi Eczane</h1>
        <p className="text-gray-600 italic">"Ruh halini seç, ilacını al."</p>
      </header>

      {/* Mood Selector Grid (Interactive Decision Tree Logic) */}
      {!selectedPrescription ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prescriptions.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedPrescription(item)}
              className={`${item.color} text-white p-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center h-48 border-2 border-transparent hover:border-white/20`}
            >
              <span className="text-xl font-semibold text-center">{item.mood}</span>
              <span className="text-xs mt-3 uppercase tracking-widest opacity-80">Reçeteyi Gör</span>
            </button>
          ))}
        </div>
      ) : (
        /* Reçete Detay Kartı (Progressive Disclosure) */
        <div className="animate-fade-in bg-white border border-gray-100 rounded-2xl p-8 shadow-2xl relative max-w-2xl mx-auto">
          <button 
            onClick={() => setSelectedPrescription(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
          >
            ✕ Kapat
          </button>
          
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-6 ${selectedPrescription.color}`}>
            {selectedPrescription.source}
          </div>
          
          <h2 className="text-2xl font-serif text-gray-900 mb-8 leading-relaxed italic">
            "{selectedPrescription.content}"
          </h2>
          
          <div className={`bg-gray-50 p-6 rounded-lg border-l-4 ${selectedPrescription.textColor.replace('text', 'border')}`}>
            <h3 className={`font-bold ${selectedPrescription.textColor} mb-2 uppercase text-sm tracking-wide`}>Aksiyon Planı (Amel):</h3>
            <p className="text-gray-700">{selectedPrescription.action}</p>
          </div>

          <div className="mt-8 text-center text-xs text-gray-400 border-t pt-4">
            *Kaynak: Ehlibeyt Külliyatı & Risale veritabanı.
          </div>
        </div>
      )}
    </div>
  );
};

export default ManeviReceteler;