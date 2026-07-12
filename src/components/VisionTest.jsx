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
    if (score <= 4) return { title: "Sıradan Asker", desc: "Sığ sularda yüzüyorsun. Stratejiden çok duyguyla hareket ediyorsun. Vizyonunu geliştirmek için arşivimizi okumalısın." };
    if (score <= 7) return { title: "Taktiksel Direnişçi", desc: "Sahayı okuyabiliyorsun ama büyük resmi kaçırıyorsun. Doğru yoldasın, stratejini Karargahta keskinleştir." };
    return { title: "Kurucu İrade / Vizyoner", desc: "%1'lik dilimdesin. Krizleri fırsata çeviren asimetrik zekaya sahipsin. Senin yerin Özel Karargahımız." };
  };

  const shareToTwitter = () => {
    const result = getResult();
    const text = `OnikiKapı Strateji Testi'ni çözdüm. Sonucum: [${result.title}]. Senin vizyon seviyen ne? Kendini test et:`;
    const url = "https://www.onikikapi.com";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
  };

  return (
    <div style={{ backgroundColor: '#0b3d2c', border: '1px solid #d4af37', borderRadius: '12px', padding: '30px', maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif', color: '#e2e8f0', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
      {!showResult ? (
        <>
          <h2 style={{ color: '#f7d547', fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>STRATEJİK ZEKÂ TESTİ: VİZYON KODUN NE?</h2>
          <p style={{ fontSize: '14px', marginBottom: '20px', color: '#8fa39b' }}>Soru {currentQuestion + 1} / {questions.length}</p>
          <h3 style={{ fontSize: '18px', marginBottom: '25px', lineHeight: '1.5' }}>{questions[currentQuestion].question}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleAnswer(option.points)}
                style={{ backgroundColor: 'transparent', border: '1px solid #f7d547', color: '#f7d547', padding: '15px', borderRadius: '8px', cursor: 'pointer', transition: '0.3s', fontSize: '16px', textAlign: 'left' }}
                onMouseOver={(e) => { e.target.style.backgroundColor = '#f7d547'; e.target.style.color = '#0b3d2c'; }}
                onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#f7d547'; }}
              >
                {option.text}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 style={{ color: '#f7d547', fontSize: '26px', fontWeight: 'bold', marginBottom: '10px' }}>SONUÇ ANALİZİ</h2>
          <h3 style={{ color: '#fff', fontSize: '22px', margin: '15px 0' }}>Arketipin: <span style={{ color: '#f7d547' }}>{getResult().title}</span></h3>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>{getResult().desc}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button 
              onClick={shareToTwitter}
              style={{ backgroundColor: '#1DA1F2', color: '#fff', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
            >
              🐦 SONUCUNU X'TE (TWITTER) PAYLAŞ
            </button>
            <a 
              href="https://t.me/+U6M8Sl6jHbViZjQ8" 
              target="_blank" 
              rel="noreferrer"
              style={{ display: 'inline-block', backgroundColor: 'transparent', color: '#f7d547', border: '2px solid #f7d547', padding: '15px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', transition: '0.3s' }}
              onMouseOver={(e) => { e.target.style.backgroundColor = '#f7d547'; e.target.style.color = '#0b3d2c'; }}
              onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#f7d547'; }}
            >
              🛡️ KARARGAHA KATIL VE PDF'İ İNDİR
            </a>
          </div>
        </>
      )}
    </div>
  );
}
