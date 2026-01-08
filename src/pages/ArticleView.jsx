import React, { useState } from 'react';
import { ArrowLeft, Type, Moon, Sun, BookOpen, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ArticleView() {
  const [fontSize, setFontSize] = useState(18); // Yazı boyutu
  const [theme, setTheme] = useState('dark');   // Tema: 'dark' veya 'sepia'

  // Örnek İçerik (Normalde veritabanından gelir)
  const article = {
    title: "Gadir-i Hum ve Hakikat",
    category: "Tarih ve Siyer",
    date: "27 Aralık 2025",
    readTime: "8 dk okuma",
    content: `
      <p>Tarihin en önemli kırılma noktalarından biri olan Veda Haccı dönüşü, İslam tarihinin seyrini değiştiren olaylara sahne olmuştur. Güneşin en tepede olduğu, kumların kavrulduğu o gün, ilahi bir emirle kafile durduruldu.</p>
      
      <h3>Veda Hutbesi ve Sonrası</h3>
      <p>On binlerce sahabe, nefeslerini tutmuş bekliyordu. Hz. Peygamber, deve semerlerinden yapılan o yüksekçe yere çıktı ve tarihe geçen o sözleri söyledi. Bu sadece bir veda değil, aynı zamanda bir emanet teslimiydi.</p>
      
      <p>O gün orada bulunanlar, "Ben kimin mevlası isem, Ali de onun mevlasıdır" sözünü işittiler. Bu söz, sadece bir sevgi beyanı mıydı, yoksa ilahi bir görevlendirme miydi? Yüzyıllardır tartışılan, üzerine kütüphaneler dolusu kitap yazılan bu hadise, aslında hakikatin ta kendisiydi.</p>
      
      <h3>Tarih Bize Ne Söyler?</h3>
      <p>Tarih, sadece geçmişte yaşanan olayların kronolojik sıralaması değildir. Tarih, bugünü inşa eden tuğlalardır. O tuğlalardan birini çektiğinizde, bugünkü binanın neden sallandığını daha iyi anlarsınız.</p>
      
      <blockquote>
        "Haksızlık karşısında susan dilsiz şeytandır." düsturu, işte bu tarihsel bilincin bir yansımasıdır. Hakikati arayanlar, tarihin tozlu sayfalarında değil, o sayfaların arasındaki nurlu satırlarda gezinmelidir.
      </blockquote>
      
      <p>Sonuç olarak; ilim şehrinin kapısından girmeden, şehrin hazinelerine ulaşmak mümkün değildir. O kapı, tevazudur, edeptir ve sadakattir.</p>
    `
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'sepia' ? 'bg-[#f4ecd8] text-[#433422]' : 'text-[#F4EFE0]'}`}>
      
      {/* ÜST KONTROL BAR */}
      <div className={`sticky top-0 z-30 px-6 py-4 flex justify-between items-center border-b backdrop-blur-md ${theme === 'sepia' ? 'bg-[#f4ecd8]/90 border-[#433422]/10' : 'bg-[#0F2C45]/90 border-[#C5A059]/20'}`}>
        <Link to="/tarih" className="flex items-center gap-2 opacity-70 hover:opacity-100 transition">
          <ArrowLeft size={20} /> <span className="hidden sm:inline">Geri Dön</span>
        </Link>

        <div className="flex items-center gap-4 bg-black/10 p-2 rounded-full backdrop-blur-sm">
           {/* Font Ayarları */}
           <button onClick={() => setFontSize(Math.max(14, fontSize - 2))} className="p-2 hover:bg-black/10 rounded-full"><Type size={14}/></button>
           <span className="text-xs font-mono w-6 text-center">{fontSize}</span>
           <button onClick={() => setFontSize(Math.min(32, fontSize + 2))} className="p-2 hover:bg-black/10 rounded-full"><Type size={22}/></button>
           
           <div className="w-px h-6 bg-current opacity-20 mx-1"></div>

           {/* Tema Ayarı */}
           <button onClick={() => setTheme(theme === 'dark' ? 'sepia' : 'dark')} className="p-2 hover:bg-black/10 rounded-full transition-transform hover:rotate-180">
             {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
           </button>
        </div>
      </div>

      {/* İÇERİK ALANI */}
      <article className="max-w-3xl mx-auto px-6 py-12 animate-fade-in-up">
        {/* Başlık Bölümü */}
        <div className="mb-10 text-center space-y-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${theme === 'sepia' ? 'bg-[#433422] text-[#f4ecd8]' : 'bg-[#C5A059] text-[#0F2C45]'}`}>
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight">{article.title}</h1>
          <div className="flex items-center justify-center gap-4 text-sm opacity-60">
            <span>{article.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><BookOpen size={14}/> {article.readTime}</span>
          </div>
        </div>

        {/* Metin */}
        <div 
          className="prose prose-lg max-w-none leading-relaxed"
          style={{ fontSize: `${fontSize}px` }}
        >
          {/* HTML içeriği güvenli şekilde basıyoruz */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Alt Paylaşım */}
        <div className={`mt-16 pt-8 border-t flex justify-between items-center ${theme === 'sepia' ? 'border-[#433422]/10' : 'border-[#C5A059]/20'}`}>
          <p className="opacity-60 italic">"İlim paylaştıkça çoğalır."</p>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C5A059] text-[#0F2C45] font-bold hover:scale-105 transition">
            <Share2 size={18} /> Paylaş
          </button>
        </div>

      </article>
    </div>
  );
}