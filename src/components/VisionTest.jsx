import React, { useState } from 'react';

const questions = [
  {
    question: "Düşman devasa bir medya ve bilgi tekeline sahip. Kitleleri uyandırmak için ilk hamlen ne olur?",
    options: [
      { text: "Gerçekleri meydanlarda yüksek sesle bağırmak.", points: 1 },
      { text: "Yeraltına inip gizli bir şekilde örgütlenmek.", points: 2 },
      { text: "Düşmanın krizini yaratıp, onun anlatısını ona karşı kullanmak.", points: 3 }
    ]
  },
  {
    question: "Kendisinden 100 kat büyük bir güce karşı duran azınlığın en ölümcül silahı nedir?",
    options: [
      { text: "Dış güçlerden alınacak lojistik ve silah desteği.", points: 1 },
      { text: "Sabırla beklemek ve düşmanın hata yapmasını ummak.", points: 2 },
      { text: "Sistemin 'meşruiyetini' çökertmek pahasına bedel ödemek.", points: 3 }
    ]
  },
  {
    question: "Kriz anında alınan kritik bir karar neye göre ölçülmelidir?",
    options: [
      { text: "O günkü hayatta kalma ve kurtulma ihtimaline göre.", points: 1 },
      { text: "Önümüzdeki 10 yıllık siyasi kazanımlara göre.", points: 2 },
      { text: "Yüzyıllar sonrasına bırakılacak ideolojik mirasa göre.", points: 3 }
    ]
  }
];

export default function VisionTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Instagram için Metni Kopyala 📋");

  const handleAnswer = (points) => {
    setScore(score + points);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    if (score <= 4) return { title: "Sıradan Asker", desc: "Sığ sularda yüzüyorsun. Stratejiden çok duyguyla hareket ediyorsun." };
    if (score <= 7) return { title: "Taktiksel Direnişçi", desc: "Sahayı okuyabiliyorsun ama yüzyıllık büyük resmi kaçırıyorsun." };
    return { title: "Kurucu İrade / Vizyoner", desc: "%1'lik elit dilimdesin. Krizleri fırsata çeviren asimetrik zekaya sahipsin." };
  };

  const shareText = `OnikiKapı Stratejik Zekâ Testi'ni çözdüm. Sonucum: [${getResult().title}]. Senin vizyon kodun ne? Kendini test et: https://www.onikikapi.com`;

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const copyForInstagram = () => {
    navigator.clipboard.writeText(`OnikiKapı test sonucum: [${getResult().title}]. Link profilimde, sen de vizyonunu test et! #OnikiKapı #Ehlibeyt`);
    setCopyStatus("Metin Kopyalandı! 🌟 (Hikayene Yapıştır)");
    setTimeout(() => setCopyStatus("Instagram için Metni Kopyala 📋"), 3000);
  };

  return (
    <div style={{ backgroundColor: '#0b3d2c', border: '1px solid #d4af37', borderRadius: '12px', padding: '30px', maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif', color: '#e2e8f0', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
      
      <style>
        {`
          .quiz-btn { background-color: transparent; border: 1px solid #f7d547; color: #f7d547; padding: 14px; border-radius: 8px; cursor: pointer; transition: 0.2s; font-size: 15px; text-align: left; width: 100%; }
          .quiz-btn:active { background-color: #f7d547; color: #0b3d2c; }
          .share-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
          .btn-wa { background-color: #25D366; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; }
          .btn-x { background-color: #000000; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; }
          .btn-insta { grid-column: span 2; background-color: #E1306C; color: white; border: none; padding: 12px; border-radius: 6px; font-weight: bold; cursor: pointer; }
          .btn-hq { display: block; background: linear-gradient(45deg, #f7d547, #d4af37); color: #0b3d2c; padding: 15px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; margin-top: 15px; box-shadow: 0 4px 15px rgba(247,213,71,0.3); }
          .reward-box { background-color: rgba(247,213,71,0.1); border: 1px dashed #f7d547; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left; }
        `}
      </style>

      {!showResult ? (
        <>
          <h2 style={{ color: '#f7d547', fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>STRATEJİK ZEKÂ TESTİ</h2>
          <p style={{ fontSize: '13px', marginBottom: '15px', color: '#8fa39b' }}>Soru {currentQuestion + 1} / {questions.length}</p>
          <h3 style={{ fontSize: '17px', marginBottom: '25px', lineHeight: '1.5' }}>{questions[currentQuestion].question}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button key={`opt-${currentQuestion}-${index}`} onClick={() => handleAnswer(option.points)} className="quiz-btn">
                {option.text}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 style={{ color: '#f7d547', fontSize: '24px', fontWeight: 'bold' }}>ANALİZ RAPORU</h2>
          <h3 style={{ color: '#fff', fontSize: '20px', margin: '10px 0' }}>Mevcut Kodun: <span style={{ color: '#f7d547' }}>{getResult().title}</span></h3>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#cbd5e1' }}>{getResult().desc}</p>
          
          {/* TEŞVİK VE VİRAL DÖNGÜ KİLİDİ (REWARD LOOP) */}
          <div className="reward-box">
            <div style={{ color: '#f7d547', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}>🔒 KİLİTLİ İÇERİK: DETAYLI RAPOR VE SANSÜRSÜZ PDF</div>
            <p style={{ fontSize: '12px', color: '#e2e8f0', margin: 0 }}>Arketipinize özel hazırlanmış 10 sayfalık <strong>"Ehlibeyt Küresel Direniş Doktrini"</strong> PDF dosyasının indirme şifresi Telegram Özel Karargahında sabitlenmiştir.</p>
          </div>

          <div className="share-grid">
            <button onClick={shareWhatsApp} className="btn-wa">🟢 WhatsApp'ta Paylaş</button>
            <button onClick={shareTwitter} className="btn-x">⚫ X / Twitter'da Paylaş</button>
            <button onClick={copyForInstagram} className="btn-insta">{copyStatus}</button>
          </div>

          <a href="https://t.me/+U6M8Sl6jHbViZjQ8" target="_blank" rel="noreferrer" className="btn-hq">
            🛡️ GİZLİ ŞİFREYİ ALMAK İÇİN KARARGAHA KATIL ➡️
          </a>
        </>
      )}
    </div>
  );
}
