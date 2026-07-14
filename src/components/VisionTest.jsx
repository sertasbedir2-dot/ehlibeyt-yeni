// Dosya: src/components/VisionTest.jsx
import React, { useState, useRef } from 'react';

export default function VisionTest({ onComplete }) {
  const [gatePassed, setGatePassed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Eşik Bekçisi Mantığı
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setGatePassed(true);
      setErrorMsg("");
    } else {
      setErrorMsg("SİSTEM KÖLESİ TESPİT EDİLDİ. ZİHNİN İŞGAL ALTINDA. TEKRAR DENE.");
      // 3 saniye sonra hata mesajını sil
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  // Ses Brifingi Kontrolü
  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // --- 1. EKRAN: GÜVENLİK DUVARI (SORU) ---
  if (!gatePassed) {
    return (
      <div style={{ backgroundColor: '#0b3d2c', border: '1px solid #d4af37', borderRadius: '12px', padding: '30px', maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif', color: '#e2e8f0', textAlign: 'center', boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)' }}>
        <h2 style={{ color: '#f7d547', fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '2px' }}>⚠️ GÜVENLİK DUVARI</h2>
        <h3 style={{ fontSize: '18px', marginBottom: '25px', lineHeight: '1.5', color: '#fff' }}>Küresel sistemin kitleleri uyutmak için kullandığı en büyük illüzyon nedir?</h3>
        
        {errorMsg && (
          <div style={{ backgroundColor: '#8b0000', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontWeight: 'bold', animation: 'pulse 1s infinite' }}>
            {errorMsg}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button onClick={() => handleAnswer(false)} className="quiz-btn" style={btnStyle}>A) Para ve Finansal Güç</button>
          <button onClick={() => handleAnswer(true)} className="quiz-btn" style={btnStyle}>B) Seçme Özgürlüğü</button>
          <button onClick={() => handleAnswer(false)} className="quiz-btn" style={btnStyle}>C) Savaşlar ve Krizler</button>
        </div>
      </div>
    );
  }

  // --- 2. EKRAN: KARARGAH İÇİ (BRİFİNG VE PANOLAR) ---
  return (
    <div style={{ backgroundColor: '#0b3d2c', border: '1px solid #d4af37', borderRadius: '12px', padding: '30px', maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif', color: '#e2e8f0', textAlign: 'center' }}>
      <h2 style={{ color: '#f7d547', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>🛡️ KARARGAHA HOŞ GELDİN</h2>
      <p style={{ color: '#cbd5e1', marginBottom: '20px', fontSize: '14px' }}>Seviye 1 Kilidi Açıldı. Artık sıradan bir asker değilsin.</p>

      {/* SESLİ BRİFİNG MODÜLÜ */}
      <div style={{ backgroundColor: '#052218', padding: '20px', borderRadius: '10px', border: '1px dashed #f7d547', marginBottom: '25px' }}>
        <h3 style={{ color: '#f7d547', margin: '0 0 15px 0', fontSize: '16px' }}>🎙️ KOMUTANIN SESLİ BRİFİNGİ</h3>
        
        {/* PUBLIC KLASÖRÜNDEKİ MP3 DOSYASINI ÇEKER */}
        <audio ref={audioRef} src="/brifing.mp3" onEnded={() => setIsPlaying(false)} />
        
        <button onClick={toggleAudio} style={{ backgroundColor: isPlaying ? '#8b0000' : '#f7d547', color: isPlaying ? 'white' : '#0b3d2c', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', width: '100%', fontSize: '16px', transition: '0.3s' }}>
          {isPlaying ? '⏸️ Brifingi Durdur' : '▶️ Gizli Ses Kaydını Dinle'}
        </button>
      </div>

      {/* SOSYAL MEDYA WIDGET MODÜLÜ */}
      <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '10px', marginBottom: '25px' }}>
        <h3 style={{ color: '#fff', margin: '0 0 10px 0', fontSize: '15px', textAlign: 'left' }}>📡 CANLI İSTİHBARAT AKIŞI</h3>
        <div style={{ minHeight: '300px', border: '1px solid #333', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', overflow: 'hidden' }}>
          
          {/* ELFSIGHT INSTAGRAM WIDGET KODU BURAYA GELECEK */}
          <div className="elfsight-app-BURAYA-SENIN-KODUN-GELECEK" style={{ width: '100%' }}>
             <span style={{ color: '#888', fontSize: '12px' }}>[Widget Yükleniyor...]</span>
          </div>

        </div>
      </div>

      {/* TELEGRAM KİLİDİ */}
      <a href="https://t.me/+U6M8Sl6jHbViZjQ8" target="_blank" rel="noreferrer" style={hqBtnStyle}>
        🚨 2. SEVİYE İÇİN TELEGRAM'A GEÇ
      </a>

      {/* ANA SİTEYE GEÇİŞ */}
      {onComplete && (
        <button onClick={onComplete} style={{ background: 'transparent', color: '#8fa39b', border: 'none', textDecoration: 'underline', marginTop: '20px', cursor: 'pointer' }}>
          Külliyeye (Ana Siteye) Sız
        </button>
      )}
    </div>
  );
}

// Stil Tanımlamaları
const btnStyle = { background: 'transparent', border: '1px solid #f7d547', color: '#f7d547', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', textAlign: 'left', width: '100%', transition: '0.2s', marginBottom: '10px' };
const hqBtnStyle = { display: 'block', backgroundColor: '#8b0000', color: '#fff', padding: '15px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', width: '100%', border: '1px solid #ff4444' };
