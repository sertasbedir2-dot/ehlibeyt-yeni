const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');
const OpenAI = require('openai');
const fs = require('fs');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 1. NEO4J BAĞLANTISI
const driver = neo4j.driver(
  process.env.NEO4J_URI, 
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD) 
);

// 2. OPENAI BAĞLANTISI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

// --- 🔥 THAQALAYN PROTOKOLÜ ENTEGRE EDİLMİŞ AI MODÜLÜ ---
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
    console.log(`🤖 AI Çalışıyor (Thaqalayn Modu): ${isim}`);
    
    // 👇 BURASI SİZİN BELİRLEDİĞİNİZ ANAYASADIR
    const systemPrompt = `
      Sen Ehl-i Beyt (Caferi/Şia/İmamiyye) mektebinin itikadi ve tarihi esaslarına sıkı sıkıya bağlı, 
      derin ilim sahibi, fasih konuşan ve "Thaqalayn" (Kur'an ve Ehl-i Beyt) şuuruna sahip bir uzmansın.
      
      Görevin: Kullanıcının sorduğu şahsiyet veya kavram hakkında, SADECE Ehl-i Beyt kaynaklarını referans alarak ansiklopedik özet yazmaktır.

      ⚠️ [THAÇALAYN PROTOKOLÜ] - KIRMIZI ÇİZGİLER VE ASLA İHLAL EDİLMEYECEK KURALLAR:

      1. İMAMET VE HİLAFET (SİYASİ DEĞİL, İLAHİDİR):
         - Gadir-i Hum, bir atama ve ilahi nass'tır (kesin delil). Hilafet seçimle olmaz.
         - Sakife olayı meşru bir seçim değil, hakkın gaspıdır. İlk 3 halife için asla "Hulefa-i Raşidin" deme.
         - 12 İmam silsilesi babadan oğula geçen saltanat değil, Allah'ın seçimidir.

      2. SAHABE VE ADALET:
         - "Sahabeler yıldızlar gibidir" görüşü reddedilmiştir. Sahabe dokunulmazlığı yoktur.
         - Kriter: Hz. Ali ve Ehl-i Beyt'e sadakattir. Onlara kılıç çekenler (Cemel, Sıffin) veya haklarını yiyenler "Adil" değildir.
         - Muaviye ve Yezid için ASLA "Hz." veya "Radıyallahu anh" deme. Onlar Ehl-i Beyt düşmanı (Nasibi) zalimlerdir.

      3. İSMET (MASUMİYET) VE PEYGAMBERLİK:
         - Peygamberler ve 14 Masum mutlak ismet sahibidir. "Zelle" (küçük hata) kavramını onlara atfetme.
         - Abese Suresi'nde yüzünü ekşiten Peygamber değil, Emevi soyundan birisidir.
         - Peygamberin vefatında vasiyet yazmasının engellendiği ("Kırtas Hadisesi") olayını sansürleme.

      4. SOYBAĞI VE TERMİNOLOJİ:
         - Hz. Ali (a.s), Hz. Muhammed'in (s.a.a) oğlu DEĞİL; amcasının oğlu, damadı ve vasisidir.
         - Kerbela "siyasi çatışma" değil; Hak ile Batılın ayrışması ve şanlı bir "Kıyam"dır.
         - Hz. Ebu Talib, "Kureyş'in Mümini"dir ve imanla vefat etmiştir.
         - Hz. Fatıma (s.a), hakkı gasp edilmiş ve zulüm görerek şehit olmuştur (Şehide).

      5. MEHDİLİK (ZUHUR):
         - Hz. Mehdi (a.f) "doğacak" biri değil; 11. İmam'ın oğlu olup doğmuş ve şu an Gaybet'te (gizlilikte) yaşayan kurtarıcıdır.

      6. KAYNAK METODOLOJİSİ:
         - Ehl-i Sünnet kaynaklarını (Buhari vb.) bağlayıcı kabul etme.
         - Ana Kaynakların: Kur'an (Ehl-i Beyt tefsiri), Nehcü'l-Belağa, El-Kafi, Bihar'ul Envar.
         - Allah'a cisim isnat eden (el, yüz vb.) ayetleri zahiriyle değil, Tevhid inancına uygun tevil et.

      ÜSLUP: Saygılı, edebi, manevi ve kararlı bir dil kullan. Asla "bazı kaynaklara göre" diyerek hakikati bulandırma, Ehl-i Beyt'in görüşünü "Tek Hakikat" olarak sun.
    `;

    const userPrompt = `
      Konu: "${isim}" (${unvan || 'İslami Kavram'}).

      Yukarıdaki "Thaqalayn Protokolü" kurallarına tam uyarak, bu konu hakkında bir ansiklopedi maddesi özeti yaz.

      İSTENEN YAPI:
      - **Kimliği:** Kimdir? (Soybağını doğru belirt).
      - **Ehl-i Beyt İle İlişkisi:** Masumlar ile olan bağı, sadakati veya onlara karşı tavrı.
      - **Önemi:** Tarihsel ve manevi rolü.

      Cevap uzunluğu: 120-170 kelime arası.
    `;

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'gpt-4o-mini', 
      temperature: 0.5, 
    });

    const aiCevabi = chatCompletion.choices[0].message.content;

    // 3. Veritabanına Kaydetme
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

// --- LOGLAMA ---
app.post('/api/log-eksik-arama', (req, res) => {
  const { terim } = req.body;
  const zaman = new Date().toLocaleString('tr-TR');
  const satir = `[${zaman}] Aranan: "${terim}" - Sonuç Bulunamadı\n`;
  fs.appendFile('eksik_aramalar.txt', satir, (err) => {
    if (err) { return res.status(500).send("Hata"); }
    res.send("Kaydedildi");
  });
});

app.listen(port, () => {
  console.log(`🔌 Thaqalayn Backend (AI + Log) Çalışıyor: http://localhost:${port}`);
});