const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');
const OpenAI = require('openai');
const fs = require('fs');
require('dotenv').config(); // 👈 Bu satır .env dosyasını okur

const app = express();
// Sunucuda otomatik port, lokalde 3001 kullan
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 1. NEO4J BAĞLANTISI (Artık şifreler gizli dosyadan geliyor)
const driver = neo4j.driver(
  process.env.NEO4J_URI, 
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD) 
);

// 2. OPENAI BAĞLANTISI (Artık anahtar gizli dosyadan geliyor)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 👈 GÜVENLİ HALE GELDİ
});

// --- KİŞİLERİ GETİRME ---
app.get('/api/kisiler', async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run(`
      MATCH (n)
      OPTIONAL MATCH (n)-[r]-(m)
      RETURN n, r, m
      LIMIT 1500
    `);

    const nodesMap = new Map();
    const links = [];

    result.records.forEach(record => {
      const nObj = record.get('n');
      if (!nObj) return;

      const nProps = nObj.properties;
      const nLabels = nObj.labels; 
      const sourceId = String(nObj.elementId || nObj.identity || Math.random());
      const sourceName = nProps.name_tr || nProps.name || nProps.title || "İsimsiz";

      if (!nodesMap.has(sourceId)) {
        nodesMap.set(sourceId, { 
          id: sourceId, 
          isim: sourceName, 
          unvan: nProps.unvan || nLabels[0] || "Genel",
          color: nLabels.includes('Masum') ? '#FFD700' : (nProps.color || '#607D8B'),
          val: nLabels.includes('Masum') ? 30 : 10,
          isMasum: nLabels.includes('Masum'),
          properties: nProps 
        });
      }

      const rObj = record.get('r');
      const mObj = record.get('m');
      
      if (rObj && mObj) {
        const mProps = mObj.properties;
        const mLabels = mObj.labels;
        const targetId = String(mObj.elementId || mObj.identity || Math.random());

        if (!nodesMap.has(targetId)) {
           const targetName = mProps.name_tr || mProps.name || mProps.title || "İsimsiz";
           nodesMap.set(targetId, {
             id: targetId,
             isim: targetName,
             unvan: mProps.unvan || mLabels[0] || "Genel",
             color: mLabels.includes('Masum') ? '#FFD700' : (mProps.color || '#90CAF9'),
             val: mLabels.includes('Masum') ? 30 : 5,
             isMasum: mLabels.includes('Masum'),
             properties: mProps
           });
        }
        links.push({ source: sourceId, target: targetId, label: rObj.properties.olay || rObj.type });
      }
    });
    res.json({ nodes: Array.from(nodesMap.values()), links: links });
  } catch (error) {
    console.error("Veri Hatası:", error);
    res.status(500).send(error.message);
  } finally {
    await session.close();
  }
});

// --- 🔥 PROFESYONEL EHL-İ BEYT PROMPTU İLE AI ANALİZİ ---
app.post('/api/ai-analiz', async (req, res) => {
  const { isim, unvan } = req.body;
  const session = driver.session();

  try {
    // 1. Veritabanı Kontrolü
    const checkQuery = await session.run(
      `MATCH (n) 
       WHERE (n.name_tr = $isim OR n.name = $isim OR n.title = $isim) AND n.ai_ozet IS NOT NULL 
       RETURN n.ai_ozet AS ozet LIMIT 1`,
      { isim }
    );

    if (checkQuery.records.length > 0) {
      return res.json({ reply: checkQuery.records[0].get('ozet') });
    }

    // 2. Yapay Zeka Üretimi
    console.log(`🤖 AI Çalışıyor: ${isim} (Profesyonel Mod)`);
    
    const systemPrompt = `
      Sen Ehl-i Beyt (Caferi/Şia) mektebinin kaynaklarına (Kur'an, Nehcü'l Belaga, El-Kafi, Bihar'ul Envar, İrşad-ı Müfid vb.) tam hakim, 
      uzman bir İslam tarihçisi ve kelamcısısın. Amacın, kullanıcıya Ehl-i Beyt perspektifinden en doğru, en edebi ve en manevi bilgiyi vermektir.
    `;

    const userPrompt = `
      Konu: "${isim}" (${unvan || 'İslami Kavram/Şahsiyet'}).

      Lütfen bu konu hakkında aşağıdaki kurallara sıkı sıkıya uyarak bir ansiklopedi maddesi özeti yaz:

      1. **KAYNAK HASSASİYETİ:** Sadece Ehl-i Beyt mektebinin muteber kabul ettiği rivayetleri ve tarihsel analizleri esas al. Ehl-i Beyt'e muhalif kaynakların (Emevi/Abbasi saray tarihçilerinin) uydurmalarını dikkate alma veya reddederek doğrusunu belirt.
      
      2. **ÜSLUP VE SAYGI:** - Peygamber Efendimizden bahsederken mutlaka "(s.a.a)" ifadesini kullan.
         - 14 Masum ve diğer yüce şahsiyetler (Hz. Zeyneb, Hz. Abbas vb.) için "(a.s)" ifadesini kullan.
         - Dilin fasih, akıcı, edebi ve manevi bir ağırlığı olsun.

      3. **İÇERİK YAPISI:**
         - **Kimliği/Tanımı:** Kısaca kimdir veya nedir?
         - **Ehl-i Beyt İle İlişkisi:** Masumlar ile olan bağı veya onlara karşı tavrı nasıldı?
         - **Önemi:** Tarihsel veya manevi açıdan neden önemlidir?

      4. **TARTIŞMALI KONULAR:** Eğer konu tarihsel olarak tartışmalıysa, hakikati Ehl-i Beyt imamlarının beyanları ışığında, cesurca ama hakaret etmeden, ilmi bir dille ortaya koy.

      5. **UZUNLUK:** Yaklaşık 120-180 kelime arası, tek veya iki paragraf.

      Bu kurallar çerçevesinde "${isim}" hakkında bilgi ver.
    `;

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'gpt-4o-mini', 
      temperature: 0.7, 
    });

    const aiCevabi = chatCompletion.choices[0].message.content;

    // 3. Kaydetme
    await session.run(
      `MATCH (n) 
       WHERE (n.name_tr = $isim OR n.name = $isim OR n.title = $isim) 
       SET n.ai_ozet = $cevap`,
      { isim, cevap: aiCevabi }
    );

    res.json({ reply: aiCevabi });

  } catch (error) {
    console.error("🔥 AI Hatası:", error);
    res.status(500).json({ reply: "Bağlantı hatası oluştu." });
  } finally {
    await session.close();
  }
});

// --- 📝 EKSİK ARAMALARI KAYDETME ---
app.post('/api/log-eksik-arama', (req, res) => {
  const { terim } = req.body;
  const zaman = new Date().toLocaleString('tr-TR');

  // Dosyaya ekleme yap (eksik_aramalar.txt)
  const satir = `[${zaman}] Aranan: "${terim}" - Sonuç Bulunamadı\n`;

  fs.appendFile('eksik_aramalar.txt', satir, (err) => {
    if (err) {
      console.error("Log hatası:", err);
      return res.status(500).send("Hata");
    }
    console.log(`📝 Eksik Arama Kaydedildi: ${terim}`);
    res.send("Kaydedildi");
  });
});

app.listen(port, () => {
  console.log(`🔌 Thaqalayn Backend (AI + Log) Çalışıyor: http://localhost:${port}`);
});