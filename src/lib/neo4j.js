import neo4j from 'neo4j-driver';

// .env dosyasındaki bilgileri alıyoruz
const uri = import.meta.env.VITE_NEO4J_URI;
const user = import.meta.env.VITE_NEO4J_USER;
const password = import.meta.env.VITE_NEO4J_PASSWORD;

// Sürücüyü (Driver) oluşturuyoruz
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

// Veritabanından veri çeken fonksiyon
export const fetchMasumlar = async () => {
  const session = driver.session();
  try {
    // Cypher sorgusu ile 14 Masum'u çek
    const result = await session.run(`
      MATCH (m:Masum) 
      RETURN m ORDER BY m.id ASC
    `);

    // Gelen karmaşık veriyi temiz JSON'a çevir
    return result.records.map(record => {
      const node = record.get('m').properties;
      
      // Sayısal değerleri (Integer) JavaScript sayısına çevir
      // Neo4j sayıları özel bir formatta tutar, çevirmek gerekir.
      if (node.id && node.id.toNumber) {
        node.id = node.id.toNumber();
      }

      // Veri yapısını bizim ön yüzün (Frontend) beklediği formata uydur
      return {
        id: node.id,
        identity: {
          name_ar: node.name_ar,
          name_tr: node.name_tr,
          title: node.title,
          role: node.role,
          dates: node.dates,
          burial: node.burial,
          desc: "Allah'ın yeryüzündeki hücceti." // Veritabanında yoksa varsayılan
        },
        ontology: {
          noor: node.noor,
          quran: "Kuran ayeti yükleniyor...", // İleride eklenecek
          cosmic: "Yaratılış nuru."
        },
        network: { legacy: "İlim mirası", companions: [] },
        politics: { strategy: node.strategy, events: [] },
        liturgy: { duas: [], ziyarat: "" },
        contemporary: node.contemporary
      };
    });
  } catch (error) {
    console.error("Neo4j Hatası:", error);
    return [];
  } finally {
    await session.close();
  }
};