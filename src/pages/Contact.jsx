import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Gerçekte burada form verileri bir servise gönderilir.
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#F4EFE0]">
      
      {/* Başlık Alanı */}
      <div className="text-center bg-[#162e45] p-10 rounded-3xl border border-[#C5A059]/20 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent"></div>
         <h1 className="text-4xl font-serif font-bold text-[#C5A059] mb-4">Bize Ulaşın</h1>
         <p className="text-gray-400 max-w-2xl mx-auto">
            Önerileriniz, katkılarınız ve sorularınız bizim için kıymetlidir. Gönül kapımız daima açıktır.
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         {/* İletişim Bilgileri */}
         <div className="space-y-6">
            <div className="bg-[#162e45] p-8 rounded-3xl border border-[#4A5D75]/30 hover:border-[#C5A059] transition group h-full">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <MessageSquare className="text-[#C5A059]"/> İletişim Kanalları
                </h3>
                
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#0F2C45] rounded-xl flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#0F2C45] transition shadow-lg">
                            <Mail size={24}/>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">E-posta</h4>
                            <p className="text-gray-400 text-sm mb-1">Genel Sorularınız İçin</p>
                            <a href="mailto:iletisim@darihakikat.com" className="text-[#C5A059] hover:underline">iletisim@darihakikat.com</a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#0F2C45] rounded-xl flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#0F2C45] transition shadow-lg">
                            <MapPin size={24}/>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Konum</h4>
                            <p className="text-gray-400 text-sm">
                                Dar-ı Hakikat Kültür ve İlim Derneği <br/>
                                Üsküdar / İstanbul
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#0F2C45] rounded-xl flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#0F2C45] transition shadow-lg">
                            <Phone size={24}/>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">Telefon / WhatsApp</h4>
                            <p className="text-gray-400 text-sm">Hafta içi: 09:00 - 18:00</p>
                            <span className="text-white font-mono">+90 555 000 00 00</span>
                        </div>
                    </div>
                </div>
            </div>
         </div>

         {/* Mesaj Formu */}
         <div className="bg-[#162e45] p-8 rounded-3xl border border-[#4A5D75]/30 relative overflow-hidden">
             {submitted ? (
                 <div className="absolute inset-0 bg-[#162e45] z-10 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                     <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                         <Send size={40}/>
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-2">Mesajınız Alındı!</h3>
                     <p className="text-gray-400">En kısa sürede size dönüş yapacağız.</p>
                 </div>
             ) : null}

             <h3 className="text-2xl font-bold text-[#C5A059] mb-6">Bize Yazın</h3>
             <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                         <label className="text-sm text-gray-400 ml-1">Adınız Soyadınız</label>
                         <input required type="text" className="w-full bg-[#0F2C45] border border-[#4A5D75] rounded-xl p-3 focus:border-[#C5A059] focus:outline-none transition text-white" placeholder="Örn: Ahmet Yılmaz" />
                     </div>
                     <div className="space-y-2">
                         <label className="text-sm text-gray-400 ml-1">E-posta Adresiniz</label>
                         <input required type="email" className="w-full bg-[#0F2C45] border border-[#4A5D75] rounded-xl p-3 focus:border-[#C5A059] focus:outline-none transition text-white" placeholder="ornek@email.com" />
                     </div>
                 </div>
                 
                 <div className="space-y-2">
                     <label className="text-sm text-gray-400 ml-1">Konu</label>
                     <select className="w-full bg-[#0F2C45] border border-[#4A5D75] rounded-xl p-3 focus:border-[#C5A059] focus:outline-none transition text-white">
                         <option>Genel Soru</option>
                         <option>Kurs Kayıt Bilgisi</option>
                         <option>Teknik Sorun Bildirimi</option>
                         <option>Teşekkür / Öneri</option>
                     </select>
                 </div>

                 <div className="space-y-2">
                     <label className="text-sm text-gray-400 ml-1">Mesajınız</label>
                     <textarea required rows="4" className="w-full bg-[#0F2C45] border border-[#4A5D75] rounded-xl p-3 focus:border-[#C5A059] focus:outline-none transition text-white" placeholder="Mesajınızı buraya yazınız..."></textarea>
                 </div>

                 <button type="submit" className="w-full bg-[#C5A059] text-[#0F2C45] font-bold py-4 rounded-xl hover:bg-white transition flex items-center justify-center gap-2 mt-4">
                     <Send size={20}/> Gönder
                 </button>
             </form>
         </div>

      </div>
    </div>
  );
}