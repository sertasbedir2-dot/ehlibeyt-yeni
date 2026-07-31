import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Map, HeartHandshake, Tent, Droplets, ArrowRight, ShieldCheck, PlayCircle } from 'lucide-react';

export default function Kerbela() {
  return (
    // Matem günlerine özel koyulaştırılmış, hafif kırmızı (rose/ruby) tonlu tema
    <div className="max-w-6xl mx-auto px-4 md:px-0 animate-fade-in space-y-12">
      <Helmet>
        <title>Kerbela & Erbain Rehberi | OnikiKapı</title>
        <meta name="description" content="Aşura matem dersleri, Erbain yürüyüş rotaları, mevkib haritası ve Askıda Ziyaret (Ziyaret Kardeşliği) platformu." />
        <meta property="og:title" content="OnikiKapı - Kerbela ve Erbain Özel" />
        <meta property="og:description" content="Erbain'e gidemeyen kalmasın. Ziyaret kardeşliği ile bir canı İmam Hüseyin'e (a.s) ulaştırın." />
      </Helmet>

      {/* HERO BÖLÜMÜ - MATEM VE KIYAM */}
      <div className="relative bg-[#050505] border border-rose-900/50 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-8 group">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-rose-700/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-rose-600/20 transition-all duration-1000"></div>
        
        <div className="flex-1 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 bg-rose-950/50 text-rose-400 font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full border border-rose-900/50 mb-4">
            <Droplets size={16} className="animate-pulse" /> Matem & Kıyam
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#FDF6E3] font-sans mb-4 tracking-tight">
            Her Yer <span className="text-rose-500">Kerbela</span>
          </h1>
          <p className="text-slate-300 font-serif leading-relaxed text-sm md:text-base max-w-xl">
            Aşura bir gün değil, bir duruştur. Matem dersleri, mersiyeler ve her yıl milyonların aktığı Erbain yürüyüşünün dijital rehberi.
          </p>
        </div>

        {/* Canlı Yayın veya Matem Medyası Tuşu */}
        <div className="w-full md:w-auto relative z-10">
          <button className="flex items-center justify-center gap-3 bg-rose-900 text-[#FDF6E3] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-rose-800 transition-all shadow-[0_0_30px_rgba(159,18,57,0.3)] w-full md:w-auto">
            <PlayCircle size={24} />
            Canlı Harem Yayını
          </button>
        </div>
      </div>

      {/* ANA ÖZELLİK: ZİYARET KARDEŞLİĞİ (ASKIDA ZİYARET) */}
      <div className="relative bg-gradient-to-br from-[#09303a] to-[#04151a] border border-[#C5A059]/40 rounded-3xl p-8 md:p-10 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <HeartHandshake size={180} />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <HeartHandshake size={32} className="text-[#C5A059]" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#FDF6E3] font-sans">Ziyaret Kardeşliği (Erbain Sponsorluğu)</h2>
          </div>
          <p className="text-slate-300 font-serif leading-relaxed mb-8">
            <span className="italic">"Kim İmam Hüseyin'in (a.s) ziyaretçisini donatırsa, onun sevabının aynısını alır."</span> - İmam Cafer-i Sadık (a.s)<br/><br/>
            Erbain'e kalbi uçup da imkânsızlıktan gidemeyen gençlerimizle; "Benim yerime bir genç gitsin" diyen hayırsever canları buluşturuyoruz. Bu havuzda para değil, doğrudan <b>bilet ve vize eşleştirmesi</b> yapılır.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/905553137021?text=Selam%C3%BCn%20Aleyk%C3%BCm.%20Ziyaret%20Karde%C5%9Fli%C4%9Fi%20(Erbain)%20i%C3%A7in%20SPONSOR%20olmak%20istiyorum." 
               target="_blank" rel="noopener noreferrer"
               className="flex-1 bg-[#C5A059] text-[#04151a] p-4 rounded-xl font-bold text-center hover:bg-[#FDF6E3] transition-colors flex items-center justify-center gap-2">
              <ShieldCheck size={20} /> Sponsor Ol (Bir Can Gönder)
            </a>
            <a href="https://wa.me/905553137021?text=Selam%C3%BCn%20Aleyk%C3%BCm.%20Ziyaret%20Karde%C5%9Fli%C4%9Fi%20(Erbain)%20havuzuna%20YOLCU%20ADAYI%20olarak%20yaz%C4%B1lmak%20istiyorum." 
               target="_blank" rel="noopener noreferrer"
               className="flex-1 bg-white/5 border border-white/20 text-white p-4 rounded-xl font-bold text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Map size={20} /> Ziyaretçi Adayı Ol
            </a>
          </div>
        </div>
      </div>

      {/* ERBAİN REHBERİ VE MATEM DERSLERİ GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Erbain Yol Rehberi */}
        <div className="bg-[#0b1b24]/90 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-[#C5A059]/40 transition-colors group">
          <Map size={36} className="text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold text-[#FDF6E3] font-sans mb-3">Erbain Yol Rehberi</h3>
          <p className="text-slate-400 font-serif mb-6 leading-relaxed">
            Sınır kapılarındaki güncel durum, Necef-Kerbela arası yürüyüş direkleri (mevkib) haritası ve sırt çantanızda mutlaka bulunması gereken hayati eşyalar.
          </p>
          <ul className="space-y-3 mb-8 text-sm text-slate-300 font-sans">
            <li className="flex items-center gap-2"><ArrowRight size={14} className="text-[#C5A059]" /> İnteraktif Mevkib Haritası</li>
            <li className="flex items-center gap-2"><ArrowRight size={14} className="text-[#C5A059]" /> Sınır Kapısı / Vize Prosedürleri</li>
            <li className="flex items-center gap-2"><ArrowRight size={14} className="text-[#C5A059]" /> Çanta Hazırlık Listesi</li>
          </ul>
          <button className="text-[#C5A059] font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:text-white transition-colors">
            Rehbere Göz At <ArrowRight size={16} />
          </button>
        </div>

        {/* Matem Dersleri & Ziyaretler */}
        <div className="bg-[#0b1b24]/90 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-rose-500/40 transition-colors group">
          <Tent size={36} className="text-rose-400 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold text-[#FDF6E3] font-sans mb-3">Matem Seminerleri & Dualar</h3>
          <p className="text-slate-400 font-serif mb-6 leading-relaxed">
            Muharrem ve Sefer aylarına özel felsefi Aşura analizleri. Ziyaret-i Aşura, Erbain Ziyaretnamesi ve mersiye külliyatı.
          </p>
          <ul className="space-y-3 mb-8 text-sm text-slate-300 font-sans">
            <li className="flex items-center gap-2"><ArrowRight size={14} className="text-rose-400" /> Aşura'nın Sosyolojik Analizi</li>
            <li className="flex items-center gap-2"><ArrowRight size={14} className="text-rose-400" /> Sesli Ziyaret-i Aşura</li>
            <li className="flex items-center gap-2"><ArrowRight size={14} className="text-rose-400" /> Erbain Ziyaretnamesi (Arapça/Türkçe)</li>
          </ul>
          <button className="text-rose-400 font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:text-white transition-colors">
            Derslere Başla <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}