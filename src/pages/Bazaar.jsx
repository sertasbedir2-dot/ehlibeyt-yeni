import React from 'react';
import { Helmet } from 'react-helmet-async';
// HATA ÇÖZÜMÜ: 'Store' ikonu import edildi.
import { Heart, ShoppingBag, Sparkles, ShieldCheck, Gem, Store } from 'lucide-react';

export default function Bazaar() {
  // Şimdilik demo veriler. Bunları kendi Shopier veya WhatsApp satış linklerinle değiştireceksin.
  const products = [
    {
      id: 1,
      name: "Necef Taşı Gümüş Yüzük",
      desc: "İmam Ali'nin (a.s) tavsiye ettiği, Necef-ül Eşref'ten getirtilmiş %100 orijinal taş ve el işçiliği 925 ayar gümüş.",
      price: "1.450 ₺",
      image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop",
      badge: "Sınırlı Stok",
      link: "https://shopier.com/ornek-link-1"
    },
    {
      id: 2,
      name: "Mescid-i Nebevi Esansı",
      desc: "Peygamber Efendimiz'in ravzasında duyulan o huzur verici koku. Alkolsüz, saf esans yağı (Niş üretim).",
      price: "450 ₺",
      image: "https://images.unsplash.com/photo-1594035919831-25cb58a58436?q=80&w=800&auto=format&fit=crop",
      badge: "En Çok Tercih Edilen",
      link: "https://shopier.com/ornek-link-2"
    },
    {
      id: 3,
      name: "Nehcü'l Belağa Özel Baskı",
      desc: "Hakiki deri cilt, altın varak baskı ve kalın şamua kağıt. Kütüphanenizin baş köşesi için.",
      price: "850 ₺",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
      badge: null,
      link: "https://shopier.com/ornek-link-3"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-0 animate-fade-in space-y-12">
      <Helmet>
        <title>Dergâh Çarşısı & Lokma Bırak | OnikiKapı</title>
        <meta name="description" content="OnikiKapı dergâhına lokma bırakın veya özenle seçilmiş Ehl-i Beyt kültürüne ait premium ürünleri inceleyin." />
        <meta property="og:title" content="Dergâh Çarşısı | OnikiKapı" />
        <meta property="og:description" content="OnikiKapı dergâhına lokma bırakın veya özenle seçilmiş Ehl-i Beyt kültürüne ait premium ürünleri inceleyin." />
      </Helmet>

      {/* HERO / LOKMA BIRAK SECTION */}
      <div className="relative bg-gradient-to-r from-[#09303a] to-[#04151a] border border-[#C5A059]/40 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-8">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex-1 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 text-rose-400 font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full border border-rose-500/20 mb-4">
            <Heart size={16} className="animate-pulse" /> Sürdürülebilirlik
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#FDF6E3] font-sans mb-4">Dergâha Lokma Bırak</h1>
          <p className="text-slate-300 font-serif leading-relaxed text-sm md:text-base max-w-xl">
            OnikiKapı, reklam almayan ve ticarileşmeyen bir ilim meclisidir. Bu dijital dergâhın sunucu masraflarına ve içerik üretimine destek olmak isterseniz, bir lokma (bağış) bırakarak çırağ uyandırabilirsiniz.
          </p>
        </div>

        <div className="w-full md:w-auto relative z-10">
          {/* Buradaki linki kendi BuyMeACoffee, Patreon, Shopier "Bağış" veya IBAN sayfana yönlendireceksin */}
          <a href="https://shopier.com/" target="_blank" rel="noopener noreferrer" 
             className="group flex flex-col items-center justify-center bg-[#C5A059] text-[#04151a] p-6 rounded-2xl hover:bg-[#FDF6E3] hover:scale-105 transition-all shadow-[0_0_30px_rgba(197,160,89,0.3)] w-full md:w-64">
            <Heart size={40} className="mb-3 group-hover:text-rose-600 transition-colors" />
            <span className="font-bold text-xl font-sans">Niyazda Bulun</span>
            <span className="text-xs font-bold uppercase tracking-wider mt-1 opacity-80">(Güvenli Ödeme)</span>
          </a>
        </div>
      </div>

      {/* DERGÂH ÇARŞISI VİTRİNİ */}
      <div className="space-y-6 relative z-10">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Store size={28} className="text-[#C5A059]" />
          <div>
            <h2 className="text-2xl font-bold text-[#FDF6E3] font-sans">Dergâh Çarşısı</h2>
            <p className="text-slate-400 text-sm font-serif">Özenle seçilmiş, yüksek kalite niş ürünler.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-[#0b1b24]/90 backdrop-blur-md border border-[#C5A059]/20 rounded-3xl overflow-hidden group hover:border-[#C5A059]/60 hover:shadow-[0_0_20px_rgba(197,160,89,0.15)] transition-all duration-500 flex flex-col">
              
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                {product.badge && (
                  <span className="absolute top-4 left-4 z-20 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    {product.badge}
                  </span>
                )}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Product Details */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-[#FDF6E3] font-sans mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-slate-400 text-sm font-serif leading-relaxed mb-6 flex-1 line-clamp-3">
                  {product.desc}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-[#C5A059]">{product.price}</span>
                  <a href={product.link} target="_blank" rel="noopener noreferrer" 
                     className="flex items-center gap-2 bg-white/5 hover:bg-[#C5A059] text-white hover:text-[#04151a] px-4 py-2 rounded-xl transition-all font-bold text-sm">
                    <ShoppingBag size={16} /> İncele
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GÜVENLİK VE KARGO BİLGİSİ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-8 mt-12 pb-8">
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
          <ShieldCheck size={32} className="text-[#C5A059]" />
          <div>
            <h4 className="text-[#FDF6E3] font-bold text-sm">Güvenli Alışveriş</h4>
            <p className="text-slate-400 text-xs">256-bit SSL ve Shopier altyapısı.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
          <Gem size={32} className="text-[#C5A059]" />
          <div>
            <h4 className="text-[#FDF6E3] font-bold text-sm">Premium Kalite</h4>
            <p className="text-slate-400 text-xs">Özenle seçilmiş orijinal ürünler.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
          <Sparkles size={32} className="text-[#C5A059]" />
          <div>
            <h4 className="text-[#FDF6E3] font-bold text-sm">Sorunsuz Teslimat</h4>
            <p className="text-slate-400 text-xs">Aynı gün kargolama avantajı.</p>
          </div>
        </div>
      </div>

    </div>
  );
}