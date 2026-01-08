// src/lib/graph-data.js

/**
 * Neo4j Entegrasyonu için Çizge (Graph) Yapısı
 * Düğümler: Kişi, Dönem, Mekan
 * İlişkiler: SOYUNDAN_GELİR, EĞİTİM_VERDİ, YAŞADI
 */

export const MASUM_NODES = [
  {
    id: "node_1",
    labels: ["Kişi", "Masum", "Peygamber"],
    properties: {
      name_en: "Muhammad (s.a.w)",
      name_ar: "مُحَمَّد",
      title: "Hâtemü'l-Enbiyâ",
      era: "Vahiy Dönemi",
      color_theme: "#1F2937", // Koyu İndigo
    },
    // İsnad ve Neo4j ilişkileri için hazırlık
    relationships: {
        outbound: [],
        inbound: []
    }
  },
  {
    id: "node_2",
    labels: ["Kişi", "Masum", "İmam"],
    properties: {
      name_en: "Ali ibn Abi Talib (a.s)",
      name_ar: "عَلِيّ",
      title: "Emîrü'l-Mü'minîn",
      era: "Hilafet",
      color_theme: "#C9A66B", // Toprak Sarısı (Ochre)
    },
    relationships: {
        outbound: [{ type: "SOYUNDAN_GELİR", target: "node_1" }] 
    }
  },
  // ... Diğer 14 Masum buraya eklenecek
];