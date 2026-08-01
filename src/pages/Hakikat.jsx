import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Share2, BookOpen, ShieldAlert, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// STATİK VERİTABANI: Yeni makaleler en üste eklendi.
const articles = [
  {
    id: 'tasavvuf-asimilasyonu',
    title: 'Alevilikte Tasavvuf Asimilasyonu: Ehlibeyt\'ten Kopuşun Anatomisi',
    category: 'Çıplak Gerçeklik',
    date: 'Ağustos 2026',
    content: (
      <div className="space-y-4 text-slate-300 font-sans leading-relaxed text-sm md:text-base">
        <p>
          <strong className="text-[#FDF6E3] block mb-1">1. Yönetici Özeti</strong>
          Günümüz Anadolu Alevi toplumu, On İki İmam'ın asli fıkhından ve akidesinden sistematik olarak koparılmış, Sünni kökenli tasavvufi felsefelerin ve bâtıni sapmaların (Ghulât) içerisinde asimile edilmiştir. Şeriatı ortadan kaldıran sahte bir "bâtın" felsefesi ve masum İmam'ın yerine ikame edilen <strong className="text-[#C5A059]">"mürşid/pir"</strong> hiyerarşisi, Ehlibeyt mektebinin tevhidi temellerini bütünüyle tahrip etmektedir.
        </p>

        <h3 className="font-bold text-[#FDF6E3] mt-8 border-b border-[#C5A059]/20 pb-2">2. Caferi/İsna Aşeri Kaynak Analizi</h3>
        <ul className="space-y-4 mt-4">
          <li className="bg-black/20 p-4 rounded-xl border-l-2 border-[#C5A059]">
            <strong className="text-[#FDF6E3] block mb-1">Masum İmam Dışında Mutlak Mürşid ve Tarikat Reddi:</strong>
            <span className="text-xs text-slate-400 block mb-2 font-mono bg-black/40 p-1 rounded">Kaynak: Şeyh Kuleyni, Usul-u Kâfi, Kitab-ul Huccet, Bab 83, Hadis 1.</span>
            İmam Cafer es-Sadık (a.s) açıkça, Allah'ın atadığı Masum İmam dışında kendisine mutlak itaat edilecek bir rehber, pir veya otorite iddia edenin küfürde olduğunu belirtir. Günümüz tasavvufundaki "Mürşid-i Kâmil" inancı ve tarikat silsileleri, tevhidi bozarak doğrudan İmamet kurumunu gasp etmektir. Şii akidesinde yegâne mutlak rehber İmam'dır (a.s).
          </li>
          <li className="bg-black/20 p-4 rounded-xl border-l-2 border-red-900/50">
            <strong className="text-[#FDF6E3] block mb-1">Tasavvuf ve Sufilerin Ehlibeyt Tarafından Lanetlenmesi:</strong>
            <span className="text-xs text-slate-400 block mb-2 font-mono bg-black/40 p-1 rounded">Kaynak: Şeyh Hürrül Amili, El-İsna Aşeriyye fi'r-Redd 'ale's-Sufiyye, Böl. 2, Hadis 3</span>
            İmam Ali en-Naki (a.s) açıkça, <em>"Bütün sufiler bizim düşmanımızdır ve onların yolları bizim yolumuza aykırıdır"</em> buyurur. İmam Sadık'ın (a.s) Hasan el-Basri ve Sufyan es-Sevri ile olan teolojik çatışmaları, tasavvufun Sünni/Emevi tabanlı bir felsefi sapma olduğunu mutlak olarak kanıtlar.
          </li>
          <li className="bg-black/20 p-4 rounded-xl border-l-2 border-[#C5A059]">
            <strong className="text-[#FDF6E3] block mb-1">Zahir (Şeriat) Olmadan Bâtın İddiasının Geçersizliği:</strong>
            <span className="text-xs text-slate-400 block mb-2 font-mono bg-black/40 p-1 rounded">Kaynak: Şeyh Saduk, Men La Yahduruhu'l-Fakih; Şeyh Tusi, Tehzibu'l-Ahkam.</span>
            Caferi fıkhında şeriatın zahiri kuralları, bâtıni hakikatin bizatihi koruyucusudur. İmamlar (a.s), <em>"biz hakikate ulaştık, kalbimiz temiz"</em> diyerek dini yükümlülükleri terk edenleri dinden çıkmış saymıştır. Kur'an'ın zahiriyle çelişen hiçbir bâtın, meşru değildir.
          </li>
        </ul>

        <h3 className="font-bold text-[#FDF6E3] mt-8 border-b border-[#C5A059]/20 pb-2">3. Tarihsel Çelişkiler ve Sufi Sızması</h3>
        <p>
          Anadolu Aleviliğindeki mutlak Pir/Talip hiyerarşisi, Semah pratiği ve Caferi fıkhının terk edilmesi inancı; Mevlevilik, Kadirilik ve Bektaşi tarikatları gibi Sünni/Sufi akımlardan tarihsel bir benimsemedir. Özellikle Muhyiddin İbn Arabi'nin panteist <strong className="text-white">"Vahdet-i Vücud"</strong> felsefesi (yaratan ile yaratılanı birleştiren Yunan kökenli doktrin), Ehlibeyt'in mutlak "Tevhid" akidesini dejenere etmiş, Şii inancını sadece yüzeysel bir ambalajla Sünni tasavvufuna entegre etmiştir.
        </p>

        <h3 className="font-bold text-[#FDF6E3] mt-8 border-b border-[#C5A059]/20 pb-2">4. Zahir/Bâtın Hükmü (Sonuç)</h3>
        <p>
          Tarihsel süreçte "bâtın", Sünni tasavvufu ve Gulât fırkalar tarafından İslami şeriatı yok etmek için stratejik bir silaha dönüştürülmüştür. İmamiyye teolojisinde Zahir ve Bâtın, beden ve ruh gibidir; zahir (Şeriat) olmadan bâtın (Hakikat) hayatta kalamaz. Günümüz Alevi toplumunda bâtın maskesi altında İslami hukukun ilga edilmesi, İmamların öğretisi değil, Helenistik felsefelerin kitleleri dini yükümlülüklerden koparma operasyonudur.
        </p>
      </div>
    )
  },
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
  
  // NATIVE PAYLAŞIM (WEB SHARE API)
  const handleShare = async (article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: `OnikiKapı'da okudum: ${article.title}. Çıplak gerçekleri oku.`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Paylaşım iptal edildi veya desteklenmiyor', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link kopyalandı! İstediğiniz gruba yapıştırabilirsiniz.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in relative z-10">
      <Helmet>
        <title>Çıplak Gerçeklik | OnikiKapı</title>
        <meta name="description" content="Toplumsal manipülasyonları deşifre eden, Kuran ve Ehlibeyt eksenli kavramsal tashihat akışı." />
        <meta property="og:title" content="Hakikat Akışı | OnikiKapı" />
        <meta property="og:description" content="Toplumsal manipülasyonları deşifre eden kavramsal tashihat akışı." />
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