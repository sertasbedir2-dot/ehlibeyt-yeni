import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Microscope, Hourglass, Feather, BookOpen, Play, Star, GraduationCap, Award, Users, ArrowRight, Sparkles, Clock, Mic2, Calendar, Music, Instagram, Youtube, Facebook, Music2, Download, Bell } from 'lucide-react';
import SpecialDays from '../components/SpecialDays';

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Hayırlı Sabahlar");
    else if (hour >= 12 && hour < 17) setGreeting("Hayırlı Günler");
    else if (hour >= 17 && hour < 22) setGreeting("Hayırlı Akşamlar");
    else setGreeting("Hayırlı Geceler");
    return () => clearInterval(timer);
  }, []);

  const socialLinks = {
    instagram: "https://www.instagram.com/dunya_ehlibeyt_platformu?igsh=NTYwM2Znamd0ZHQ=",
    youtube:   "https://www.youtube.com/@dunyaehlibeytplatformu",
    facebook:  "https://www.facebook.com/share/1AbRRtKdDb/",
    tiktok:    "https://www.tiktok.com/@dnya.ehlibeyt.pla"
  };

  const sections = [
    { title: "İlim ve Eğitim", items: [{ title: "Akademi & Kurslar", icon: <GraduationCap size={32} />, path: "/kurslar", color: "bg-blue-600", desc: "Dil kursları ve canlı dersler." }, { title: "İlim ve Bilim", icon: <Microscope size={32} />, path: "/ilim", color: "bg-cyan-600", desc: "Kainat kitabını okumak." }, { title: "Kütüphane", icon: <BookOpen size={32} />, path: "/kutuphane", color: "bg-emerald-600", desc: "Binlerce yıllık kaynaklar." }] },
    { title: "Kültür ve Sanat", items: [{ title: "Tarih ve Siyer", icon: <Hourglass size={32} />, path: "/tarih", color: "bg-amber-600", desc: "Geçmişin aynası." }, { title: "Sanat ve Edebiyat", icon: <Feather size={32} />, path: "/sanat", color: "bg-purple-600", desc: "Gönül dili." }, { title: "Yazarlarımız", icon: <Users size={32} />, path: "/yazarlar", color: "bg-pink-600", desc: "Kalem erbabı." }] },
    { title: "Maneviyat ve Etkileşim", items: [{ title: "Cemhane", icon: <Star size={32} />, path: "/zikir", color: "bg-indigo-600", desc: "Zikirmatik ve Esma çarkı." }, { title: "Medya Kürsüsü", icon: <Play size={32} />, path: "/medya", color: "bg-red-600", desc: "TV, Radyo ve Podcast." }, { title: "Kendini Sına", icon: <Award size={32} />, path: "/sinav", color: "bg-orange-600", desc: "Bilgi yarışması." }] }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-[#F4EFE0] pb-12">
      
      {/* 1. HERO ALANI */}
      <div className="bg-gradient-to-br from-[#162e45] to-[#0F2C45] p-8 md:p-12 rounded-3xl border border-[#C5A059]/20 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-[#C5A059] group-hover:scale-110 transition duration-700"><Sparkles size={200} /></div>
          <div className="relative z-10">
             <div className="inline-flex items-center gap-3 bg-[#0F2C45]/80 backdrop-blur-md border border-[#C5A059] px-4 py-2 rounded-full mb-6 shadow-lg">
                <Clock size={20} className="text-[#C5A059] animate-pulse" />
                <span className="text-[#C5A059] font-bold font-mono text-lg">{time.toLocaleTimeString('tr-TR')}</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">{greeting}, <br/><span className="text-[#C5A059]">Gönül Dostu.</span></h1>
             <p className="text-lg text-gray-300 max-w-2xl leading-relaxed mb-8">"İki günü eşit olan ziyandadır." düsturuyla, bugünü dünden daha hayırlı kılmak için ilim ve irfan kapısını araladınız.</p>
             <div className="flex flex-wrap gap-4">
                 <Link to="/kurslar" className="px-6 py-3 bg-[#C5A059] text-[#0F2C45] font-bold rounded-xl hover:bg-white transition flex items-center gap-2 shadow-lg hover:scale-105">Hemen Başla <ArrowRight size={18}/></Link>
                 <button onClick={() => alert("Sağ alttaki müzik çalardan (🎵) dilediğiniz eseri seçebilirsiniz.")} className="px-6 py-3 bg-transparent border-2 border-[#C5A059] text-[#C5A059] font-bold rounded-xl hover:bg-[#C5A059] hover:text-[#0F2C45] transition flex items-center gap-2"><Music size={18}/> Deyiş Dinle</button>
             </div>
          </div>
      </div>

      {/* 2. SOSYAL MEDYA VİTRİNİ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="bg-[#FF0000]/10 border border-[#FF0000]/30 hover:bg-[#FF0000] hover:text-white group p-4 rounded-2xl flex flex-col items-center gap-2 transition duration-300"><Youtube size={32} className="text-[#FF0000] group-hover:text-white"/><span className="font-bold">Abone Ol</span></a>
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="bg-[#E1306C]/10 border border-[#E1306C]/30 hover:bg-[#E1306C] hover:text-white group p-4 rounded-2xl flex flex-col items-center gap-2 transition duration-300"><Instagram size={32} className="text-[#E1306C] group-hover:text-white"/><span className="font-bold">Takip Et</span></a>
          <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="bg-[#1877F2]/10 border border-[#1877F2]/30 hover:bg-[#1877F2] hover:text-white group p-4 rounded-2xl flex flex-col items-center gap-2 transition duration-300"><Facebook size={32} className="text-[#1877F2] group-hover:text-white"/><span className="font-bold">Beğen</span></a>
          <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" className="bg-[#00f2ea]/10 border border-[#00f2ea]/30 hover:bg-black hover:text-[#00f2ea] hover:border-[#00f2ea] group p-4 rounded-2xl flex flex-col items-center gap-2 transition duration-300"><Music2 size={32} className="text-[#00f2ea] group-hover:text-[#00f2ea]"/><span className="font-bold text-gray-300 group-hover:text-white">Takip Et</span></a>
      </div>

      {/* --- KİTAP DUYURU ALANI (SİZİN İSTEĞİNİZ ÜZERİNE) --- */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
          {/* Efektler */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute -right-10 -bottom-10 opacity-20 rotate-12"><BookOpen size={150} color="white"/></div>
          
          <div className="relative z-10 flex items-start gap-4">
              <div className="hidden md:flex w-16 h-16 bg-white/20 rounded-xl items-center justify-center text-white backdrop-blur-md shrink-0">
                  <Bell size={32} className="animate-bounce"/>
              </div>
              <div>
                  <div className="inline-block bg-white text-orange-800 text-xs font-bold px-3 py-1 rounded-full mb-2 animate-pulse shadow-lg">
                      YENİ ESER
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">"Kevser'in Sırrı: Yok Oluşa Karşı" Yayında!</h3>
                  <p className="text-orange-100 max-w-xl text-sm leading-relaxed">
                      "Yok Oluşa Karşı" bir direniş ve hakikat yolculuğu... Bu özel eseri şimdi Kütüphane bölümünden ücretsiz okuyabilir ve indirebilirsiniz.
                  </p>
              </div>
          </div>

          {/* BU BUTON SİZİ KÜTÜPHANE SAYFASINA GÖTÜRÜR */}
          <Link to="/kutuphane" className="relative z-10 px-8 py-4 bg-white text-orange-800 font-bold rounded-xl hover:scale-105 transition shadow-xl flex items-center gap-2 whitespace-nowrap">
              <Download size={20}/> İncele ve İndir
          </Link>
      </div>
      {/* --- DUYURU SONU --- */}

      {/* DİĞER BÖLÜMLER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-[#162e45] rounded-3xl border border-[#C5A059]/20 shadow-lg overflow-hidden h-full"><SpecialDays /></div>
         <div className="bg-[#162e45] p-6 rounded-3xl border border-[#C5A059]/20 shadow-lg flex flex-col justify-between relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-5"><Mic2 size={150} className="text-[#C5A059]"/></div>
             <div>
                <div className="flex items-center gap-2 text-[#C5A059] font-bold mb-4 border-b border-[#C5A059]/20 pb-2"><Mic2 size={20}/> HAFTANIN SOHBETİ</div>
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">"Modern Çağda Sabır ve Şükür Dengesi"</h3>
                <p className="text-gray-400 text-sm mb-4">Prof. Dr. Hayrettin Karaman ile bu haftaki canlı sohbetimizde...</p>
             </div>
             <Link to="/medya" className="w-full bg-[#0F2C45] border border-[#C5A059]/50 text-[#C5A059] py-3 rounded-xl font-bold hover:bg-[#C5A059] hover:text-[#0F2C45] transition flex items-center justify-center gap-2"><Play size={18} fill="currentColor"/> Sohbeti Dinle</Link>
         </div>
      </div>

      <div className="space-y-10">
        {sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold text-[#C5A059] mb-6 flex items-center gap-2 pl-2 border-l-4 border-[#C5A059]">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((card, i) => (
                <Link to={card.path} key={i} className="group relative bg-[#162e45] rounded-2xl p-6 border border-[#4A5D75]/30 hover:border-[#C5A059] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden flex flex-col">
                  <div className={`absolute -right-6 -top-6 w-24 h-24 ${card.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity rounded-full`}></div>
                  <div className="flex items-start justify-between mb-4"><div className={`w-14 h-14 rounded-xl ${card.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>{card.icon}</div><ArrowRight className="text-[#4A5D75] group-hover:text-[#C5A059] transition-colors" size={20}/></div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#C5A059] transition-colors">{card.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{card.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}