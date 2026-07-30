import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, Users, Shield, MessageCircle, Info } from 'lucide-react';

export default function CanliMeclis() {
  // Gelecekte Firebase Auth yerine kullanılacak geçici kullanıcı sistemi
  const [username, setUsername] = useState(localStorage.getItem('meclis_username') || '');
  const [isJoined, setIsJoined] = useState(!!localStorage.getItem('meclis_username'));
  const [inputUsername, setInputUsername] = useState('');
  
  const [messages, setMessages] = useState([
    { id: 1, text: "Selamün Aleyküm canlar. Hoş geldiniz.", sender: "Admin_Zülfikar", time: "10:00", isSystem: false },
    { id: 2, text: "Sisteme giriş yaptınız. Kurallara riayet edelim.", sender: "Sistem", time: "10:01", isSystem: true }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Otomatik aşağı kaydırma
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Firebase geldiğinde burası "db.collection.add" olacak
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsgObj = {
      id: Date.now(),
      text: newMessage,
      sender: username,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      isSystem: false
    };

    setMessages(prev => [...prev, newMsgObj]);
    setNewMessage('');
    
    // Geçici Simülasyon: Rastgele bot cevabı
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Ve Aleyküm Selam. Allah'ın rahmeti üzerine olsun can.",
        sender: "Ehli_Can_" + Math.floor(Math.random() * 99),
        time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        isSystem: false
      }]);
    }, 2000);
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (!inputUsername.trim() || inputUsername.length < 3) return;
    
    localStorage.setItem('meclis_username', inputUsername);
    setUsername(inputUsername);
    setIsJoined(true);
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: `${inputUsername} meclise katıldı.`,
      sender: "Sistem",
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      isSystem: true
    }]);
  };

  // KULLANICI GİRİŞ YAPMAMIŞSA (ONBOARDING)
  if (!isJoined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 animate-fade-in">
        <Helmet>
          <title>Canlı Meclis'e Katıl | OnikiKapı</title>
        </Helmet>
        
        <div className="bg-[#0b1b24] border border-[#C5A059]/30 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-2xl"></div>
          
          <div className="w-16 h-16 bg-[#09303a] border border-[#C5A059] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
            <Users size={32} className="text-[#C5A059]" />
          </div>
          
          <h1 className="text-2xl font-bold text-[#FDF6E3] font-sans mb-2 relative z-10">Meclise Adım At</h1>
          <p className="text-slate-400 text-sm mb-8 relative z-10">Ehl-i Beyt muhipleriyle canlı, anonim ve seviyeli sohbet meclisine katılmak için bir rumuz belirle.</p>
          
          <form onSubmit={handleJoin} className="relative z-10 space-y-4">
            <input
              type="text"
              placeholder="Rumuzunuz (Örn: Talip_Ali)"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              className="w-full bg-[#04151a] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-[#C5A059] transition-colors"
              maxLength={15}
            />
            <button 
              type="submit"
              className="w-full bg-[#C5A059] text-[#04151a] font-bold py-3 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> Sohbete Başla
            </button>
          </form>

          <div className="mt-6 flex items-start gap-2 text-left bg-white/5 p-3 rounded-lg border border-white/5">
            <Shield size={16} className="text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-400">Meclisimiz Ehl-i Beyt ahlakına uygun yönetilmektedir. Kötü söz ve iftira sistemden kalıcı olarak uzaklaştırılmanıza sebep olur.</p>
          </div>
        </div>
      </div>
    );
  }

  // KULLANICI GİRİŞ YAPMIŞSA (CHAT ARAYÜZÜ)
  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col bg-[#0b1b24] border border-[#C5A059]/20 rounded-3xl overflow-hidden shadow-2xl relative animate-fade-in">
      <Helmet>
        <title>Canlı İlim Meclisi | OnikiKapı</title>
        <meta name="description" content="🔴 Canlı Meclis: Şu an içeride Ehl-i Beyt muhibbi canlar sohbet ediyor. Sen de katıl." />
        <meta property="og:title" content="Canlı İlim Meclisi | OnikiKapı" />
        <meta property="og:description" content="🔴 Canlı Meclis: Şu an içeride Ehl-i Beyt muhibbi canlar sohbet ediyor. Sen de katıl." />
      </Helmet>

      {/* CHAT HEADER */}
      <div className="bg-[#09303a] border-b border-[#C5A059]/30 px-6 py-4 flex items-center justify-between shrink-0 relative z-20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Users size={24} className="text-[#C5A059]" />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border border-[#09303a] animate-pulse"></span>
          </div>
          <div>
            <h1 className="text-[#FDF6E3] font-bold font-sans leading-none">Canlı İlim Meclisi</h1>
            <span className="text-[#C5A059] text-[10px] font-bold tracking-wider">AKTİF SOHBET</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-[#04151a] px-3 py-1.5 rounded-full border border-white/10">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          <span className="text-slate-300 text-xs font-bold">{username}</span>
        </div>
      </div>

      {/* CHAT BODY (MESAJLAR) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-gradient-to-b from-[#04151a] to-[#0b1b24]">
        <div className="text-center mb-8">
          <span className="bg-white/5 text-slate-400 text-xs px-3 py-1 rounded-full border border-white/10">Bugün</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.isSystem ? 'items-center' : msg.sender === username ? 'items-end' : 'items-start'}`}>
            
            {/* SİSTEM MESAJI */}
            {msg.isSystem ? (
              <div className="flex items-center gap-2 bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] text-[10px] px-3 py-1 rounded-full my-2">
                <Info size={12} /> {msg.text}
              </div>
            ) : (
              /* KULLANICI MESAJI */
              <div className={`max-w-[85%] sm:max-w-[70%] ${msg.sender === username ? 'items-end' : 'items-start'} flex flex-col`}>
                
                {msg.sender !== username && (
                  <span className="text-slate-400 text-[10px] ml-1 mb-1 font-bold">{msg.sender}</span>
                )}
                
                <div className={`px-4 py-2.5 rounded-2xl relative ${
                  msg.sender === username 
                    ? 'bg-[#09303a] text-[#FDF6E3] border border-[#C5A059]/30 rounded-tr-none' 
                    : 'bg-white/10 text-slate-200 border border-white/5 rounded-tl-none backdrop-blur-sm'
                }`}>
                  <p className="text-sm font-sans whitespace-pre-wrap">{msg.text}</p>
                  <span className={`text-[9px] mt-1 block text-right opacity-50`}>{msg.time}</span>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* CHAT INPUT FORM */}
      <div className="bg-[#04151a] border-t border-white/10 p-4 shrink-0 pb-safe relative z-20">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-4xl mx-auto relative">
          <input
            type="text"
            placeholder="Meclise bir şeyler yaz..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 text-white rounded-full px-5 py-3.5 focus:outline-none focus:bg-white/10 focus:border-[#C5A059]/50 transition-all font-sans text-sm pr-12"
          />
          <button 
            type="submit"
            disabled={!newMessage.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#C5A059] text-[#09303a] rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#C5A059]"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}