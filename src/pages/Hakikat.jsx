import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Share2, BookOpen, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// STATİK VERİTABANI: Yeni makaleleri bu diziye ekleyebilirsiniz.
const articles = [
  {
    id: 'devri-daim-asimilasyonu',
    title: 'Aleviler Neden "Devri Daim Olsun" Derler?',
    category: 'Çıplak Gerçeklik',
    date: 'Ağustos 2026',
    content: (
      <div className="space-y-4 text-slate-300 font-sans leading-relaxed text-sm md:text-base">
        <p>
          Öne sürülen bu açıklama; kulağa mistik, romantik ve masumane gelse de, Kuran ve Ehlibeyt inancının içini boşaltmak amacıyla kurgulanmış <strong className="text-[#C5A059]">"seküler-pagan"</strong> bir asimilasyon projesinin tipik bir yansımasıdır.
        </p>
        <p>
          "Ölüm bir yok oluş değildir" tespiti İslam'da mutlak bir doğru olsa da, bunun ardına gizlenen <strong className="text-white">"don değiştirme"</strong> ve <strong className="text-white">"varoluş döngüsü (devir)"</strong> kavramları, Aleviliği Hz. Muhammed'den ve 12 İmam'ın devrimci fıkhından koparmak için kullanılan manipülasyon araçlarıdır.
        </p>
        <p className="font-bold text-[#FDF6E3] mt-6 border-b border-[#C5A059]/20 pb-2">Bu iddiayı çökerten temel analitik veriler şunlardır:</p>
        
        <ul className="space-y-4 mt-4">
          <li className="bg-black/20 p-4 rounded-xl border-l-2 border-[#C5A059]">
            <strong className="text-[#FDF6E3] block mb-1">1. Kuran ve Ehlibeyt İnancına Zıtlık (Müminun 99-100):</strong>
            İslam ve İmam Cafer-i Sadık fıkhında ölüm, sonsuz bir "döngü" değil, ebediyete intikaldir (ahiret). Kuran, reenkarnasyon (tenasüh) inancını kesin reddeder: <em>"Hayır! Onların önlerinde, diriltilecekleri güne kadar bir berzah vardır."</em> Ruh dünyaya dönmez; berzah aleminde hesap gününü bekler.
          </li>
          <li className="bg-black/20 p-4 rounded-xl border-l-2 border-slate-500">
            <strong className="text-[#FDF6E3] block mb-1">2. Gerçek Menşei: Antik Yunan Paganizmi:</strong>
            Bu kavramların kökeni, Platonik ruh göçü (metampsikoz) ve Hinduizm'deki kast sistemini meşrulaştıran "Samsara" döngüsüne dayanır. Bu paganist inanç, Aleviliği Kuran'dan uzaklaştırmak için "sır" ambalajıyla sisteme enjekte edilmiştir.
          </li>
          <li className="bg-black/20 p-4 rounded-xl border-l-2 border-[#C5A059]">
            <strong className="text-[#FDF6E3] block mb-1">3. İlahi Adalet ve Rasyonalitenin Çöküşü:</strong>
            12 İmam felsefesinin temeli "İlahi Adalet"tir. Önceki yaşamını hatırlamayan bir ruhun cezalandırılması adaletle bağdaşmaz. Özüne dönmek, çarka girmek değil, Yaradan'a hesap vermek üzere tekâmülünü tamamlamaktır.
          </li>
          <li className="bg-black/20 p-4 rounded-xl border-l-2 border-red-900/50">
            <strong className="text-[#FDF6E3] block mb-1">4. Sosyolojik Afyon ve Sınıfsal Sömürü:</strong>
            Bu inanç, toplumu "kaderine razı olmaya" ve hesap sorma bilincinden (Hüseyni duruştan) uzaklaştırıp pasifleştirmeye yarayan bir kitle manipülasyon aracıdır. Toplumsal hafızayı silmeyi hedefleyen teolojik bir operasyondur.
          </li>
        </ul>
      </div>
    )
  }
];

export default function Hakikat() {
  
  // NATIVE PAYLAŞIM (WEB SHARE API) - Mobil cihazlarda Whatsapp/Telegram vb. native menüyü açar
  const handleShare = async (article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: `OnikiKapı'da okudum: ${article.title}. Ölüm bir yok oluş mudur, yoksa paganist bir döngü mü? Çıplak gerçekleri oku.`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Paylaşım iptal edildi veya desteklenmiyor', error);
      }
    } else {
      // Masaüstü Fallback (Panoya Kopyala)
      navigator.clipboard.writeText(window.location.href);
      alert("Link kopyalandı! İstediğiniz gruba yapıştırabilirsiniz.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in relative z-10">
      <Helmet>
        <title>Çıplak Gerçeklik | OnikiKapı</title>
        <meta name="description" content="Toplumsal manipülasyonları deşifre eden, Kuran ve Ehlibeyt eksenli kavramsal tashihat akışı." />
        <meta property="og:title" content="Aleviler Neden 'Devri Daim Olsun' Derler?" />
        <meta property="og:description" content="Ölüm bir yok oluş mudur, yoksa paganist bir döngü mü? Don değiştirme inancının ardındaki asimilasyon projesi..." />
      </Helmet>

      {/* SAYFA BAŞLIĞI */}
      <div className="flex items-center gap-3 border-b border-[#C5A059]/30 pb-4">
        <ShieldAlert className="text-[#C5A059]" size={32} />
        <div>
          <h1 className="text-2xl font-black text-[#FDF6E3] tracking-wider uppercase">Çıplak Gerçeklik</h1>
          <p className="text-xs text-slate-400 font-sans mt-1">Kavramsal Tashihat ve Teolojik Analizler</p>
        </div>
      </div>

      {/* MAKALE AKIŞI (FEED) */}
      <div className="space-y-8">
        {articles.map((article) => (
          <article key={article.id} className="bg-[#0b1b24]/90 backdrop-blur-xl border border-[#C5A059]/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-[#C5A059]/50">
            
            {/* Kart Üst Bilgisi */}
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-black/20">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold px-2 py-1 bg-[#C5A059]/10 rounded-md">
                {article.category}
              </span>
              <span className="text-xs text-slate-500 font-sans">{article.date}</span>
            </div>

            {/* İçerik */}
            <div className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#FDF6E3] mb-6 leading-snug">{article.title}</h2>
              {article.content}
            </div>

            {/* Aksiyon Çubuğu ve Monetizasyon / CTA */}
            <div className="px-6 py-4 bg-[#09303a]/50 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              
              <button 
                onClick={() => handleShare(article)}
                className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition-all font-sans text-sm font-bold"
              >
                <Share2 size={16} /> Haberdar Et (Paylaş)
              </button>
              
              {/* ROI - Trafiği Topluluğa veya Ürüne Yönlendirme */}
              <Link to="/irfan-agi" className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2 bg-[#C5A059] hover:bg-[#FDF6E3] text-[#04151a] rounded-xl transition-all font-sans text-sm font-black shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                İrfan Ağı'na Katıl <ArrowRight size={16} />
              </Link>

            </div>
          </article>
        ))}
      </div>
    </div>
  );
}