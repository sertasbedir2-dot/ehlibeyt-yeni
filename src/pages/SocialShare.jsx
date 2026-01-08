import React, { useState } from 'react';
import { Image as ImageIcon, Copy, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import QRCode from "react-qr-code";

export default function SocialShare() {
  // Site adreslerini tek bir yerden yöneterek hata payını düşürüyoruz
  const siteUrl = "https://dar-ihakikat.com";
  const siteDisplay = "dar-ihakikat.com";

  const quotes = [
    {
      id: 1,
      text: "İki günü eşit olan ziyandadır.",
      source: "Hz. Muhammed (s.a.a)",
      bg: "bg-gradient-to-br from-[#162e45] to-[#0a1825]"
    },
    {
      id: 2,
      text: "İlim, maldan hayırlıdır. İlim seni korur, malı ise sen korursun.",
      source: "Hz. Ali (a.s)",
      bg: "bg-gradient-to-br from-[#2c3e50] to-[#000000]"
    },
    {
      id: 3,
      text: "Eline, beline, diline sahip ol.",
      source: "Hacı Bektaş Veli",
      bg: "bg-gradient-to-br from-[#4a1010] to-[#1a0505]"
    },
    {
      id: 4,
      text: "Dün akıllıydım, dünyayı değiştirmek istedim. Bugün bilgeyim, kendimi değiştiriyorum.",
      source: "Mevlana",
      bg: "bg-gradient-to-br from-[#1e3a8a] to-[#172554]"
    }
  ];

  const handleShareImage = async (elementId, quoteText) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      // Yüksek kalite ve tam kapsama için optimize edilmiş canvas ayarları
      const canvas = await html2canvas(element, {
        scale: 3, // Daha net görüntü için kalite artırıldı
        backgroundColor: null,
        useCORS: true,
        logging: false,
        allowTaint: true,
        scrollX: 0,
        scrollY: -window.scrollY, // Kaydırma kaynaklı kesilmeleri önler
      });

      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'dar-ihakikat-teblig.png', { type: 'image/png' });

        const shareData = {
          files: [file],
          title: 'Dar-ı Hakikat',
          text: `"${quoteText}" \n\nDaha fazlası için: ${siteUrl}`
        };

        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share(shareData);
          } catch (error) {
            console.log("Paylaşım iptal edildi.");
          }
        } else {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'teblig-karti.png';
          link.click();
          alert("Görsel oluşturuldu ve indirildi.");
        }
      }, 'image/png', 1.0);
    } catch (err) {
      console.error("Hata:", err);
      alert("Görsel oluşturulurken bir teknik sorun oluştu.");
    }
  };

  const [copiedId, setCopiedId] = useState(null);
  const copyText = (text, id) => {
    navigator.clipboard.writeText(`${text} - ${siteUrl}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#F4EFE0] pb-20">
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif font-bold text-[#C5A059]">Tebliğ Panosu</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Hakikat damlalarını görsel kart olarak paylaşarak dostlarınızı sitemize davet edebilirsiniz. 
          QR Kod ile doğrudan erişim sağlayabilirler.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {quotes.map((quote) => (
          <div key={quote.id} className="flex flex-col gap-4">
            
            {/* --- GELİŞMİŞ GÖRSEL KART (HİKAYE BOYUTUNA UYGUN) --- */}
            <div 
              id={`card-${quote.id}`} 
              className={`aspect-[4/5] relative flex flex-col justify-between text-center shadow-2xl rounded-none overflow-hidden pb-[2px] ${quote.bg}`}
            >
                {/* İçerik Alanı */}
                <div className="flex-1 p-6 flex flex-col items-center justify-center relative">
                    {/* Dekoratif Çerçeve */}
                    <div className="absolute inset-4 border border-[#C5A059]/30 pointer-events-none"></div>
                    
                    {/* Üst Logo */}
                    <div className="absolute top-6 text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase opacity-70">
                        Dar-ı Hakikat
                    </div>

                    {/* Söz Bölümü */}
                    <div className="relative z-10 my-auto mt-10">
                        <span className="text-5xl md:text-6xl text-[#C5A059]/20 font-serif absolute -top-8 -left-4">“</span>
                        <p className="text-xl md:text-2xl lg:text-3xl font-serif font-medium leading-relaxed text-[#F4EFE0] px-4">
                            {quote.text}
                        </p>
                        <span className="text-5xl md:text-6xl text-[#C5A059]/20 font-serif absolute -bottom-10 -right-4">”</span>
                    </div>

                    {/* Kaynak */}
                    <div className="mt-8 mb-4">
                        <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mb-2 opacity-60"></div>
                        <p className="text-[#C5A059] font-bold text-sm uppercase tracking-wider">{quote.source}</p>
                    </div>
                </div>

                {/* --- ALT BİLGİ VE QR KOD ALANI --- */}
                <div className="bg-[#050c14] p-5 flex items-center justify-between border-t border-[#C5A059]/30 z-20 relative">
                    <div className="text-left pl-2">
                        <p className="text-gray-400 text-[10px] uppercase tracking-wide mb-1">İlim ve Hikmet Kapısı</p>
                        <p className="text-[#C5A059] font-bold text-lg tracking-wide font-serif leading-none">{siteDisplay}</p>
                    </div>
                    
                    {/* QR Kod - Boyut 64 olarak büyütüldü */}
                    <div className="bg-white p-2 rounded-lg shadow-xl shrink-0">
                        <QRCode 
                            value={siteUrl} 
                            size={64} 
                            fgColor="#000000" 
                            bgColor="#ffffff"
                            level="M" 
                        />
                    </div>
                </div>
            </div>

            {/* --- BUTONLAR --- */}
            <div className="flex gap-2">
                <button 
                    onClick={() => handleShareImage(`card-${quote.id}`, quote.text)}
                    className="flex-1 bg-[#C5A059] text-[#0F2C45] py-3 rounded-xl font-bold hover:bg-white transition flex items-center justify-center gap-2 shadow-lg group active:scale-95"
                >
                    <ImageIcon size={18} className="group-hover:scale-110 transition"/> Görsel Olarak Paylaş
                </button>
                
                <button 
                    onClick={() => copyText(quote.text, quote.id)}
                    className="w-12 bg-[#162e45] border border-[#C5A059]/30 text-[#C5A059] rounded-xl flex items-center justify-center hover:bg-[#C5A059] hover:text-[#0F2C45] transition active:scale-90"
                    title="Bağlantılı Metni Kopyala"
                >
                    {copiedId === quote.id ? <Check size={18}/> : <Copy size={18}/>}
                </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}