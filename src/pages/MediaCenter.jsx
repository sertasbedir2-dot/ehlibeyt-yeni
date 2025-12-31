import React, { useState } from 'react';
import { Play, Mic, Video, Music, Share2, Heart, Radio, Youtube, Instagram, Twitter, Facebook, Cast, Calendar, Download, FileText, Clock, MapPin, Headphones, Mic2 } from 'lucide-react';

export default function MediaCenter() {
  const [activeMedia, setActiveMedia] = useState(null);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);

  // Radyo Fonksiyonu
  const toggleRadio = () => {
    setIsRadioPlaying(!isRadioPlaying);
    if (!isRadioPlaying) alert("Dar-ı Hakikat Radyosu Yayına Bağlanıyor...");
  };

  // --- VERİ HAVUZU (Yeni Eklenenler) ---
  
  // 1. Etkinlik Takvimi Verileri
  const events = [
    { day: "28", month: "ARA", title: "Mesnevi Okumaları", time: "21:00", instructor: "Prof. Dr. M. Öztürk" },
    { day: "02", month: "OCA", title: "Regajib Kandili Özel", time: "20:30", instructor: "Canlı Mevlit" },
    { day: "05", month: "OCA", title: "Gençlik ve İnanç", time: "14:00", instructor: "Soru & Cevap" },
  ];

  // 2. Podcast Serisi Verileri
  const podcasts = [
    { id: 1, title: "Bölüm 1: Tasavvuf Nedir?", duration: "12:40", played: false },
    { id: 2, title: "Bölüm 2: İnsan-ı Kamil", duration: "15:20", played: false },
    { id: 3, title: "Bölüm 3: Sabır ve Şükür", duration: "10:05", played: true },
  ];

  // 3. İndirilebilir Dokümanlar
  const documents = [
    { title: "Hacı Bektaş Veli - Makalat (PDF)", size: "2.4 MB", type: "PDF" },
    { title: "Divan Edebiyatı Antolojisi", size: "5.1 MB", type: "E-Kitap" },
    { title: "Tezhip ve Hat Sanatı Motifleri", size: "12 MB", type: "ZIP" },
  ];

  // Mevcut Video Arşivi
  const mediaItems = [
    { id: 1, title: "Ney Taksimi - Saba", type: "Ses", duration: "04:20", author: "Anonim", icon: <Music /> },
    { id: 2, title: "Mevlana Belgeseli", type: "Video", duration: "45:00", author: "TRT Arşiv", icon: <Video /> },
    { id: 3, title: "Yunus Emre Şiirleri", type: "Ses", duration: "08:15", author: "Müşfik Kenter", icon: <Mic /> },
    { id: 4, title: "İslam Sanatları", type: "Video", duration: "22:10", author: "Sanat Enst.", icon: <Video /> },
  ];

  return (
    <div className="space-y-12 animate-fade-in text-[#F4EFE0]">
       
       {/* --- BÖLÜM 1: CANLI YAYIN (TV EKRANI) --- */}
       <div className="w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-[#C5A059]/30 relative group">
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
             <div className="w-2 h-2 bg-white rounded-full"></div> CANLI YAYIN
          </div>
          <div className="aspect-video w-full relative">
             <iframe className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=0&mute=1" title="Canlı Yayın" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
             <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent p-6 pt-20">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Dar-ı Hakikat Sohbetleri</h1>
                <p className="text-gray-300 text-sm md:text-base">Prof. Dr. Hayrettin Karaman ile "Günümüz Meseleleri" üzerine hasbihal.</p>
             </div>
          </div>
       </div>

       {/* --- BÖLÜM 2: KONTROL PANELİ (Radyo & Sosyal Medya) --- */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-[#C5A059] to-[#b08d45] rounded-2xl p-6 text-[#0F2C45] flex items-center justify-between shadow-lg relative overflow-hidden group">
             <div className="absolute right-0 top-0 opacity-10"><Radio size={100}/></div>
             <div>
                <h3 className="font-bold text-xl">Dar-ı Hakikat FM</h3>
                <p className="text-sm opacity-80">Gönül frekansınız.</p>
             </div>
             <button onClick={toggleRadio} className="w-12 h-12 bg-[#0F2C45] text-[#C5A059] rounded-full flex items-center justify-center hover:scale-110 transition shadow-xl z-10">
                {isRadioPlaying ? <div className="animate-pulse w-4 h-4 bg-red-500 rounded-sm"></div> : <Play fill="currentColor" />}
             </button>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { icon: <Instagram size={24}/>, name: "Instagram", color: "hover:bg-[#E1306C]" },
               { icon: <Youtube size={24}/>, name: "Youtube", color: "hover:bg-[#FF0000]" },
               { icon: <Twitter size={24}/>, name: "Twitter", color: "hover:bg-[#1DA1F2]" },
               { icon: <Facebook size={24}/>, name: "Facebook", color: "hover:bg-[#1877F2]" }
             ].map((social, i) => (
                <a key={i} href="#" className={`bg-[#162e45] border border-[#4A5D75]/30 p-3 rounded-2xl flex flex-col items-center justify-center gap-2 ${social.color} hover:text-white hover:border-transparent transition group text-center`}>
                    <div className="text-[#C5A059] group-hover:text-white">{social.icon}</div>
                    <span className="font-bold text-sm">{social.name}</span>
                </a>
             ))}
          </div>
       </div>

       {/* --- BÖLÜM 3: YENİ EKLENENLER (Takvim & Podcast) --- */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* A. Etkinlik Takvimi */}
          <div className="bg-[#162e45] rounded-3xl border border-[#4A5D75]/30 p-6">
             <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2"><Calendar/> Etkinlik Takvimi</h2>
             <div className="space-y-4">
                {events.map((event, i) => (
                   <div key={i} className="flex gap-4 items-center bg-[#0F2C45] p-3 rounded-xl border border-[#4A5D75]/20 hover:border-[#C5A059]/50 transition cursor-pointer">
                      <div className="bg-[#162e45] text-center p-2 rounded-lg min-w-[60px] border border-[#C5A059]/20">
                         <div className="text-xl font-bold text-white">{event.day}</div>
                         <div className="text-xs text-[#C5A059] font-bold uppercase">{event.month}</div>
                      </div>
                      <div>
                         <h4 className="font-bold text-lg">{event.title}</h4>
                         <div className="flex gap-3 text-xs text-gray-400 mt-1">
                            <span className="flex items-center gap-1"><Clock size={12}/> {event.time}</span>
                            <span className="flex items-center gap-1"><Mic2 size={12}/> {event.instructor}</span>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* B. Podcast Serisi */}
          <div className="bg-[#162e45] rounded-3xl border border-[#4A5D75]/30 p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-5"><Headphones size={150}/></div>
             <h2 className="text-xl font-bold text-[#C5A059] mb-6 flex items-center gap-2"><Headphones/> Gönül Sohbetleri (Podcast)</h2>
             <div className="space-y-4 relative z-10">
                {podcasts.map((pod) => (
                   <div key={pod.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#C5A059]/10 transition group border-b border-[#4A5D75]/20 last:border-0">
                      <div className="flex items-center gap-3">
                         <button className="w-10 h-10 rounded-full bg-[#0F2C45] flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#0F2C45] transition">
                            <Play size={16} fill="currentColor"/>
                         </button>
                         <div>
                            <h4 className="font-medium text-white">{pod.title}</h4>
                            <span className="text-xs text-gray-500">{pod.duration} • Dinle</span>
                         </div>
                      </div>
                      {pod.played && <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">Dinlendi</span>}
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* --- BÖLÜM 4: DOKÜMAN KÖŞESİ --- */}
       <div className="bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-3xl p-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
             <div>
                <h2 className="text-2xl font-bold text-[#C5A059] mb-2 flex items-center justify-center md:justify-start gap-2"><FileText/> İlim Hazinesi</h2>
                <p className="text-gray-400">Ders notları, e-kitaplar ve özel dökümanları buradan indirebilirsiniz.</p>
             </div>
             <div className="flex flex-wrap justify-center gap-4">
                {documents.map((doc, i) => (
                   <div key={i} className="bg-[#162e45] p-4 rounded-xl border border-[#4A5D75]/30 flex items-center gap-3 hover:-translate-y-1 transition shadow-lg">
                      <div className="bg-[#C5A059]/10 p-2 rounded text-[#C5A059]"><Download size={20}/></div>
                      <div className="text-left">
                         <div className="font-bold text-sm text-white">{doc.title}</div>
                         <div className="text-xs text-gray-500">{doc.type} • {doc.size}</div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* --- BÖLÜM 5: VİDEO ARŞİVİ --- */}
       <div>
         <h2 className="text-2xl font-bold text-[#C5A059] mb-6 flex items-center gap-2 border-b border-[#4A5D75]/30 pb-4">
            <Cast size={24}/> Arşiv Kayıtları
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaItems.map((item) => (
                  <div key={item.id} className={`relative bg-[#162e45] p-4 rounded-2xl border transition-all cursor-pointer group ${activeMedia === item.id ? 'border-[#C5A059] shadow-lg' : 'border-[#4A5D75]/30 hover:border-[#C5A059]/50'}`} onClick={() => setActiveMedia(item.id)}>
                      <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-colors ${activeMedia === item.id ? 'bg-[#C5A059] text-[#0F2C45]' : 'bg-[#0F2C45] text-[#C5A059]'}`}>
                              {activeMedia === item.id ? <Play className="fill-current" size={18}/> : item.icon}
                          </div>
                          <div className="flex-1">
                              <h3 className={`font-bold mb-1 ${activeMedia === item.id ? 'text-[#C5A059]' : 'text-white'}`}>{item.title}</h3>
                              <p className="text-xs text-gray-400 mb-2">{item.author}</p>
                              <div className="text-xs font-mono text-gray-500 bg-[#0F2C45]/50 px-2 py-1 rounded inline-block">{item.type} • {item.duration}</div>
                          </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-[#4A5D75]/30 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button><Download size={16} className="text-gray-400 hover:text-white"/></button>
                           <button><Share2 size={16} className="text-gray-400 hover:text-white"/></button>
                           <button><Heart size={16} className="text-gray-400 hover:text-red-500"/></button>
                      </div>
                  </div>
              ))}
         </div>
       </div>
    </div>
  );
}