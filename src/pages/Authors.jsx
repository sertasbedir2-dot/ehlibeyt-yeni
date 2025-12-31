import React from 'react';
import { Users, Mail, Youtube, ExternalLink } from 'lucide-react';

export default function Authors() {
  const authors = [
    { 
      name: "Ali Yılmaz", 
      role: "Editör & Tarihçi", 
      bio: "Osmanlı tarihi ve tasavvuf üzerine araştırmalar yapıyor. YouTube kanalında 'Tarihin Arka Odası' serisini hazırlıyor.", 
      color: "bg-blue-500",
      email: "ali@darihakikat.com",
      youtube: "https://youtube.com"
    },
    { 
      name: "Zeynep Demir", 
      role: "Edebiyatçı", 
      bio: "Divan edebiyatı ve modern şiir üzerine denemeler yazıyor. Şiir tahlilleri videoları çekiyor.", 
      color: "bg-pink-500",
      email: "zeynep@darihakikat.com",
      youtube: "https://youtube.com"
    },
    { 
      name: "Mehmet Can", 
      role: "Teknoloji & Bilim", 
      bio: "Bilim ve İslam düşüncesi arasındaki ilişkiyi inceliyor. Teknoloji ve etik üzerine yayınlar yapıyor.", 
      color: "bg-emerald-500",
      email: "mehmet@darihakikat.com",
      youtube: "https://youtube.com"
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-[#F4EFE0]">
       {/* Başlık */}
       <div className="flex flex-col items-center text-center mb-12 bg-[#162e45] p-8 rounded-3xl border border-[#C5A059]/20 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
            <div className="bg-[#0F2C45] p-3 rounded-full mb-4 text-[#C5A059] border border-[#C5A059]/30">
                <Users size={32} />
            </div>
            <h1 className="text-3xl font-bold text-[#C5A059] mb-2 font-serif">Yazarlarımız</h1>
            <p className="text-gray-400 max-w-lg">Bu irfan sofrasına katkıda bulunan, gönül dünyamızı aydınlatan kalem sahipleri.</p>
       </div>

       {/* Yazar Kartları */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author, index) => (
              <div key={index} className="bg-[#162e45] p-6 rounded-2xl border border-[#4A5D75]/30 flex flex-col items-center text-center hover:border-[#C5A059] hover:-translate-y-1 transition duration-300 group shadow-lg">
                  
                  {/* Profil Resmi (Baş Harf) */}
                  <div className={`w-28 h-28 ${author.color} rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-xl border-4 border-[#0F2C45] group-hover:scale-105 transition-transform`}>
                      {author.name.charAt(0)}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1 text-white group-hover:text-[#C5A059] transition-colors">{author.name}</h3>
                  <span className="text-xs text-[#C5A059] uppercase tracking-wider mb-4 bg-[#0F2C45] px-3 py-1 rounded-full border border-[#C5A059]/20">{author.role}</span>
                  
                  <p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed px-2">
                      {author.bio}
                  </p>
                  
                  {/* İletişim Butonları */}
                  <div className="grid grid-cols-2 gap-3 w-full mt-auto pt-4 border-t border-[#4A5D75]/30">
                      <a 
                        href={`mailto:${author.email}`} 
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-[#0F2C45] rounded-xl text-gray-400 hover:text-white hover:bg-[#C5A059] transition text-xs font-bold group/btn"
                      >
                          <Mail size={16}/> <span className="group-hover/btn:text-[#0F2C45]">E-posta</span>
                      </a>
                      <a 
                        href={author.youtube} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-[#0F2C45] rounded-xl text-gray-400 hover:text-white hover:bg-[#FF0000] transition text-xs font-bold"
                      >
                          <Youtube size={16}/> <span>Kanal</span>
                      </a>
                  </div>
              </div>
          ))}
       </div>
    </div>
  );
}