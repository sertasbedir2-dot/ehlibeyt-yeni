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
    if (score <= 4) return { title: "Sıradan Asker", desc: "Stratejiden çok duyguyla hareket ediyorsun." };
    if (score <= 7) return { title: "Taktiksel Direnişçi", desc: "Sahayı okuyabiliyorsun ama büyük resmi kaçırıyorsun." };
    return { title: "Kurucu İrade / Vizyoner", desc: "%1'lik elit dilimdesin. Krizleri fırsata çeviren asimetrik zekaya sahipsin." };
  };

  const universalShare = async () => {
    const text = `OnikiKapı Vizyon Testi'ni çözdüm. Çıkan Arketipim: [${getResult().title}]. Sen de kendini test et:`;
    const url = "https://www.onikikapi.com";
    
    // NATIVE MOBIL PAYLASIM (X, WhatsApp vb. yüklü uygulamayı zorla açar)
    if (navigator.share) {
      try {
        await navigator.share({ title: 'OnikiKapı Strateji Testi', text: text, url: url });
      } catch (err) { console.log('Paylaşım iptal'); }
    } else {
      // PC İÇİN YEDEK (X/Twitter Web Fallback)
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    }
  };

  return (
    <div style={{ backgroundColor: '#0b3d2c', border: '1px solid #d4af37', borderRadius: '12px', padding: '30px', maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif', color: '#e2e8f0', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
      
      <style>
        {`
          .quiz-btn { background-color: transparent; border: 1px solid #f7d547; color: #f7d547; padding: 14px; border-radius: 8px; cursor: pointer; transition: 0.2s; font-size: 15px; text-align: left; width: 100%; }
          .quiz-btn:active { background-color: #f7d547; color: #0b3d2c; }
          .btn-universal { background-color: #f7d547; color: #0b3d2c; border: none; padding: 15px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 16px; width: 100%; margin-top: 10px; }
          .btn-hq { display: block; background: transparent; color: #f7d547; border: 2px solid #f7d547; padding: 15px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; margin-top: 15px; }
        `}
      </style>

      {!showResult ? (
        <>
          <h2 style={{ color: '#f7d547', fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>STRATEJİK ZEKÂ TESTİ</h2>
          <h3 style={{ fontSize: '17px', marginBottom: '25px', lineHeight: '1.5' }}>{questions[currentQuestion].question}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button key={`opt-${index}`} onClick={() => handleAnswer(option.points)} className="quiz-btn">
                {option.text}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 style={{ color: '#f7d547', fontSize: '24px', fontWeight: 'bold' }}>ANALİZ RAPORU</h2>
          
          {/* SPOTIFY WRAPPED MODELİ (GÖRSEL KİMLİK KARTI) */}
          <div style={{ backgroundColor: '#052218', padding: '25px 20px', borderRadius: '10px', border: '2px solid #f7d547', margin: '20px 0', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#f7d547', color: '#0b3d2c', padding: '2px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold' }}>VİZYON KODUN</div>
             <h3 style={{ color: '#fff', fontSize: '24px', margin: '15px 0' }}>{getResult().title}</h3>
             <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#cbd5e1', fontStyle: 'italic' }}>"{getResult().desc}"</p>
             <div style={{ marginTop: '20px', color: '#8fa39b', fontSize: '11px', letterSpacing: '1px' }}>WWW.ONIKIKAPI.COM</div>
          </div>
          
          {/* VİRAL EMİR KİPİ */}
          <div style={{ backgroundColor: 'rgba(247,213,71,0.1)', padding: '10px', borderRadius: '8px', marginBottom: '15px', border: '1px dashed #f7d547' }}>
            <p style={{ margin: 0, fontSize: '13px', color: '#f7d547', fontWeight: 'bold' }}>📸 YUKARIDAKİ KARTIN EKRAN GÖRÜNTÜSÜNÜ AL (SCREENSHOT) VE INSTAGRAM/TIKTOK HİKAYENDE PAYLAŞ!</p>
          </div>

          <button onClick={universalShare} className="btn-universal">📲 Linki X (Twitter) veya WhatsApp'ta Paylaş</button>

          <a href="https://t.me/+U6M8Sl6jHbViZjQ8" target="_blank" rel="noreferrer" className="btn-hq">
            🛡️ DETAYLI PDF RAPORU İÇİN KARARGAHA KATIL
          </a>
        </>
      )}
    </div>
  );
}
