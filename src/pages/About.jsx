import React from 'react';
import { Mail, Heart, Globe, Github } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-8 animate-fade-in text-[#F4EFE0]">
      {/* Üst Başlık */}
      <div className="text-center py-12 bg-[#162e45] rounded-3xl border border-[#C5A059]/20 shadow-xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
         <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C5A059] mb-4">Hakkımızda</h1>
         <p className="text-lg text-gray-400 max-w-2xl mx-auto px-4">
           Bu proje, kadim irfan geleneğimizi modern teknolojinin imkanlarıyla buluşturmak gayesiyle hazırlanmıştır.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Vizyonumuz */}
         <div className="bg-[#162e45] p-8 rounded-2xl border border-[#4A5D75]/30">
            <h2 className="text-2xl font-bold mb-4 text-[#C5A059] flex items-center gap-2">
                <Globe size={24} /> Gayemiz
            </h2>
            <p className="text-gray-300 leading-relaxed space-y-4">
               Gürültülü dijital çağda, bir nefeslik sükunet alanı oluşturmak istedik. 
               <br/><br/>
               İlimden sanata, tarihten tasavvufa uzanan bu yolculukta; gençlerimize köklerini hatırlatmak, 
               hakikat arayışında olanlara mütevazı bir fener tutmak en büyük amacımızdır.
            </p>
         </div>

         {/* İletişim */}
         <div className="bg-[#162e45] p-8 rounded-2xl border border-[#4A5D75]/30">
            <h2 className="text-2xl font-bold mb-4 text-[#C5A059] flex items-center gap-2">
                <Heart size={24} /> İletişim
            </h2>
            <p className="text-gray-300 mb-6">
               Öneri, katkı ve görüşleriniz bizim için çok kıymetli.
            </p>
            
            <div className="space-y-4">
                <a href="#" className="flex items-center gap-3 p-4 bg-[#0F2C45] rounded-xl hover:bg-[#C5A059] hover:text-[#0F2C45] transition group">
                    <Mail /> <span>info@darihakikat.com</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-4 bg-[#0F2C45] rounded-xl hover:bg-[#C5A059] hover:text-[#0F2C45] transition group">
                    <Github /> <span>Proje Kaynak Kodları</span>
                </a>
            </div>
         </div>
      </div>

      {/* Alt Not */}
      <div className="text-center text-gray-500 text-sm mt-8">
         <p>© 2024 Dar-ı Hakikat. İlim ve irfan yolunda hizmete adanmıştır.</p>
      </div>
    </div>
  );
}