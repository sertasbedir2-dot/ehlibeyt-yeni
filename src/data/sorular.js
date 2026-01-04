/**
 * ONİKİKAPI - SORU HAVUZU VE EĞİTİM MODÜLÜ
 * Bu veri seti Quiz.jsx bileşeni tarafından tüketilir.
 */

export const soruHavuzu = {
  fikih: [
    {
      id: "f-1",
      questionText: "Seferilikte (yolculukta) 4 rekatlık farz namazlar kaç rekat kılınır?",
      info: "Caferi fıkhına göre belirli şartlar oluştuğunda yolculukta 4 rekatlık namazları 2 rekat kılmak (Kasr) bir ruhsat değil, vaciptir.",
      options: [
        { answerText: "Aynen 4 rekat", isCorrect: false },
        { answerText: "Kısaltılarak 2 rekat", isCorrect: true },
        { answerText: "Kılınmaz, kazaya bırakılır", isCorrect: false },
        { answerText: "3 rekat kılınır", isCorrect: false },
      ],
    },
    {
      id: "f-2",
      questionText: "Aşağıdakilerden hangisi abdesti bozan hallerden biri değildir?",
      info: "Caferi fıkhında vücuttan çıkan kan veya namazda gülmek (namazı bozsa da) abdesti bozmaz. Güzel koku sürmek ise müstehaptır.",
      options: [
        { answerText: "Uyumak", isCorrect: false },
        { answerText: "Bayılmak", isCorrect: false },
        { answerText: "Kan gelmesi veya gülmek", isCorrect: true },
        { answerText: "İdrar veya yellenme", isCorrect: false },
      ],
    },
  ],
  tarih: [
    {
      id: "t-1",
      questionText: "Hendek Savaşı'nda hendek kazma fikrini kim vermiştir?",
      info: "Selman-ı Farisi (r.a), Peygamberimiz tarafından 'Selman bizden, Ehlibeyt'tendir' denilerek onurlandırılmış bir hakikat yolcusudur.",
      options: [
        { answerText: "Selman-ı Farisi (r.a)", isCorrect: true },
        { answerText: "Hz. Ali (k.v)", isCorrect: false },
        { answerText: "Hz. Hamza (r.a)", isCorrect: false },
        { answerText: "Ammar bin Yasir (r.a)", isCorrect: false },
      ],
    },
  ],
  ehlibeyt: [
    {
      id: "e-1",
      questionText: "Peygamber Efendimizin 'Ben ilmin şehriyim, o ise kapısıdır' dediği kişi kimdir?",
      info: "Bu hadis-i şerif, İmam Ali'nin (a.s) İslam ilimlerindeki mutlak otoritesini ve rehberliğini temsil eder.",
      options: [
        { answerText: "Hz. Ebubekir", isCorrect: false },
        { answerText: "Hz. Osman", isCorrect: false },
        { answerText: "Hz. Ali (a.s)", isCorrect: true },
        { answerText: "Hz. Ömer", isCorrect: false },
      ],
    },
    {
      id: "e-2",
      questionText: "Kerbela'da şehit edilen Peygamber torunu ve Şehitlerin Efendisi kimdir?",
      info: "İmam Hüseyin (a.s), 72 yareniyle birlikte insanlık onuru ve dinin bekası için Kerbela'da tarihin en büyük destanını yazmıştır.",
      options: [
        { answerText: "Hz. Hasan (a.s)", isCorrect: false },
        { answerText: "Hz. Hüseyin (a.s)", isCorrect: true },
        { answerText: "İmam Zeynel Abidin (a.s)", isCorrect: false },
        { answerText: "Hz. Abbas (a.s)", isCorrect: false },
      ],
    },
  ],
  masumlar: [
    {
      id: "m-1",
      questionText: "On Dört Masum (Çehardeh Masum) kime denir?",
      info: "Hz. Muhammed (s.a.a), kızı Hz. Fatıma (s.a) ve 12 İmam'ın (a.s) toplamına verilen isimdir. Onlar hatadan temizlenmiş rehberlerdir.",
      options: [
        { answerText: "Peygamber, Hz. Fatıma ve 12 İmam", isCorrect: true },
        { answerText: "Sadece 12 İmam", isCorrect: false },
        { answerText: "72 Kerbela Şehidi", isCorrect: false },
      ],
    },
  ]
};