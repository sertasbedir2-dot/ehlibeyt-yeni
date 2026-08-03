import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Send, Star, ShieldCheck, Gem } from 'lucide-react';

// Sabit Satıcı Bilgileri (Canlıya alırken kendi numaran/kullanıcı adın ile değiştir)
const WHATSAPP_NUMBER = "905551234567"; // Başında + veya 0 OLMADAN (Örn: 905321234567)
const TELEGRAM_USERNAME = "onikikapi_destek"; // Başında @ OLMADAN

// Statik JSON Veritabanı (Sunucusuz, anında yükleme)
const bazaarItems = [
  {
    id: "item-1",
    title: "Saf Misk-i Amber Esansı",
    description: "Alkol içermeyen, kalıcılığı yüksek, Ehl-i Beyt meclislerinin geleneksel manevi kokusu. 3ml özel cam şişesinde.",
    price: "450 ₺",
    type: "Koku",
    icon: Gem,
    popular: true,
    gradient: "from-emerald-900/40 to-black",
    features: ["Alkolsüz", "48 Saat Kalıcı", "Özel Kutulu"]
  },
  {
    id: "item-2",
    title: "Orijinal Necef Taşı Tesbih",
    description: "Necef-ül Eşref bölgesinden getirilmiş hakiki Necef taşı. Gümüş püsküllü, 33'lü zikir tesbihi. Negatif enerjiyi nötralize eder.",
    price: "1.250 ₺",
    type: "Tesbih",
    icon: Star,
    popular: false,
    gradient: "from-yellow-900/20 to-black",
    features: ["Hakiki Taş", "Gümüş Püskül", "Sertifikalı"]
  },
  {
    id: "item-3",
    title: "Kevser Suyu Harmanı Buhur",
    description: "Tütsü niteliğinde, evin havasını değiştiren ve manevi dinginlik veren özel reçine harmanı. Kömürlü buhurdanlıklar içindir.",
    price: "280 ₺",
    type: "Buhur",
    icon: ShieldCheck,
    popular: false,
    gradient: "from-blue-900/20 to-black",
    features: ["Doğal Reçine", "İs Yapmaz", "100gr Paket"]
  }
];

export default function Bazaar() {
  const [activeFilter, setActiveFilter] = useState('Tümü');
  const filters = ['Tümü', 'Tesbih', 'Koku', 'Buhur'];

  // Dinamik Sipariş Linki Üreticileri
  const generateWhatsAppLink = (item) => {
    const message = `Selamun Aleyküm, onikikapi.com üzerinden ulaşıyorum. "${item.title}" (${item.price}) ürününüzden sipariş vermek istiyorum. Yardımcı olabilir misiniz?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const generateTelegramLink = (item) => {
    const message = `Selamun Aleyküm, onikikapi.com üzerinden "${item.title}" (${item.price}) siparişi vermek istiyorum.`;
    return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
  };

  const filteredItems = activeFilter === 'Tümü' 
    ? bazaarItems 
    : bazaarItems.filter(item => item.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#04151a] text-gray-200 p-4 pb-24 font-sans selection:bg-[#C5A059] selection:text-black">
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto pt-6 mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#C5A059] flex items-center justify-center gap-2 mb-2">
          <ShoppingBag className="w-8 h-8" />
          Dergâh Çarşısı
        </h1>
        <p className="text-emerald-500/80 text-sm max-w-md mx-auto">
          Destekleriniz dijital irfan ağının büyümesi için kullanılmaktadır. Hızlı sipariş, sıfır komisyon, doğrudan iletişim.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="max-w-4xl mx-auto flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              activeFilter === filter 
                ? 'bg-[#C5A059] text-black shadow-[0_0_15px_rgba(197,160,89,0.3)]' 
                : 'bg-[#0a0f12] text-gray-400 border border-[#1a2f35] hover:border-[#C5A059]/50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Bento Grid Layout */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id} 
              className={`relative overflow-hidden rounded-3xl p-5 border border-[#1a2f35] bg-[#0a0f12] backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:border-[#C5A059]/50 hover:shadow-[0_0_30px_rgba(4,21,26,0.8)] bg-gradient-to-br ${item.gradient} ${item.popular ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}`}
            >
              {/* Popular Badge */}
              {item.popular && (
                <div className="absolute top-0 right-0 bg-[#C5A059] text-black text-xs font-bold px-3 py-1 rounded-bl-xl z-10 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-black" /> Çok Tercih Edilen
                </div>
              )}

              <div className="z-10 relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-black/40 rounded-2xl border border-white/5">
                    <Icon className="w-6 h-6 text-[#C5A059]" />
                  </div>
                  <span className="text-xl font-bold text-white tracking-wide">{item.price}</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.features.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-black/50 text-emerald-400 border border-emerald-900/50 px-2 py-1 rounded-lg">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-auto z-10 relative">
                <a 
                  href={generateWhatsAppLink(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600/10 hover:bg-green-600/20 text-green-500 border border-green-500/30 py-2.5 rounded-xl font-medium text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a 
                  href={generateTelegramLink(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 py-2.5 rounded-xl font-medium text-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Telegram
                </a>
              </div>
              
              {/* Background Glow Effect */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-3xl"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}