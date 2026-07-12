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

  const shareResult = async () => {
    const result = getResult();
    const text = `OnikiKapı Strateji Testi'ni çözdüm. Sonucum: [${result.title}]. Senin vizyon seviyen ne? Kendini test et:`;
    const url = "https://www.onikikapi.com";

    // Mobil cihazlar için evrensel paylaşım menüsü (WhatsApp, Insta, Telegram vs.)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'OnikiKapı Vizyon Testi',
          text: text,
          url: url
        });
      } catch (error) {
        console.log('Paylaşım iptal edildi.');
      }
    } else {
      // Bilgisayardan girenler için yedek WhatsApp yönlendirmesi
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    }
  };

  return (
    <div style={{ backgroundColor: '#0b3d2c', border: '1px solid #d4af37', borderRadius: '12px', padding: '30px', maxWidth: '600px', margin: '40px auto', fontFamily: 'Arial, sans-serif', color: '#e2e8f0', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
      
      {/* SİSTEM MİMARİSİ: MOBİL UYUMLU CSS STİLLERİ */}
      <style>
        {`
          .quiz-btn {
            background-color: transparent;
            border: 1px solid #f7d547;
            color: #f7d547;
            padding: 15px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 16px;
            text-align: left;
            width: 100%;
          }
          @media (hover: hover) {
            .quiz-btn:hover {
              background-color: #f7d547;
              color: #0b3d2c;
            }
          }
          .quiz-btn:active {
            background-color: #f7d547;
            color: #0b3d2c;
          }
          .share-btn {
            background: linear-gradient(45deg, #f7d547, #d4af37);
            color: #0b3d2c;
            border: none;
            padding: 15px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
            width: 100%;
            transition: 0.3s;
          }
          .telegram-btn {
            display: block;
            background-color: transparent;
            color: #f7d547;
            border: 2px solid #f7d547;
            padding: 15px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            transition: 0.3s;
          }
          .telegram-btn:hover {
            background-color: #f7d547;
            color: #0b3d2c;
          }
        `}
      </style>

      {!showResult ? (
        <>
          <h2 style={{ color: '#f7d547', fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>STRATEJİK ZEKÂ TESTİ: VİZYON KODUN NE?</h2>
          <p style={{ fontSize: '14px', marginBottom: '20px', color: '#8fa39b' }}>Soru {currentQuestion + 1} / {questions.length}</p>
          <h3 style={{ fontSize: '18px', marginBottom: '25px', lineHeight: '1.5' }}>{questions[currentQuestion].question}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {questions[currentQuestion].options.map((option, index) => (
              <button 
                key={`q-${currentQuestion}-opt-${index}`} // HATA ÇÖZÜMÜ: React'in butonları sıfırlaması için benzersiz anahtar.
                onClick={() => handleAnswer(option.points)}
                className="quiz-btn"
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
              onClick={shareResult}
              className="share-btn"
            >
              📲 SONUCUNU PAYLAŞ (WhatsApp, Telegram vb.)
            </button>
            <a 
              href="https://t.me/+U6M8Sl6jHbViZjQ8" 
              target="_blank" 
              rel="noreferrer"
              className="telegram-btn"
            >
              🛡️ KARARGAHA KATIL VE PDF'İ İNDİR
            </a>
          </div>
        </>
      )}
    </div>
  );
}
