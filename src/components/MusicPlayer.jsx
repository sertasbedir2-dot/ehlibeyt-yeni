import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, X, List, Repeat, Shuffle } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInvite, setShowInvite] = useState(true);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef(null);

  // --- ARCHIVE.ORG BAĞLANTILI MÜZİK LİSTESİ ---
  // Ana depo adresimiz: a-hazreti-shah
  const BASE_URL = "https://archive.org/download/a-hazreti-shah/";

  const tracks = [
    { title: "Adı Güzel Kendi Güzel", author: "Deyiş", url: `${BASE_URL}adi_guzel_kendi_guzel.mp3` },
    { title: "Ağlama Gözlerim", author: "Deyiş", url: `${BASE_URL}aglama_gozlerim.mp3` },
    { title: "Alemlerin Serverisin", author: "Deyiş", url: `${BASE_URL}alemlerin_serverisin.mp3` },
    { title: "Alınmış Abdestim", author: "Deyiş", url: `${BASE_URL}Alinmis_Abdestim.mp3` },
    { title: "Ali'ye de Selman", author: "Deyiş", url: `${BASE_URL}Aliye_de_Selman.mp3` },
    { title: "Allah Allah Diyelim", author: "Deyiş", url: `${BASE_URL}Allah_Allah_diyelim.mp3` },
    { title: "Arayı Arayı", author: "Deyiş", url: `${BASE_URL}arayi-arayi.mp3` },
    { title: "Arayıp Gezerken", author: "Deyiş", url: `${BASE_URL}Arayip_Gezerken.mp3` },
    { title: "Arayı Arayı (V2)", author: "Deyiş", url: `${BASE_URL}Arayi_Arayi.mp3` },
    { title: "Arif İsen", author: "Deyiş", url: `${BASE_URL}Arif_isen.mp3` },
    { title: "A Hazreti Shah", author: "Deyiş", url: `${BASE_URL}A_Hazreti_Shah.mp3` },
    { title: "Babasına Anne", author: "Deyiş", url: `${BASE_URL}Babasina_Anne.mp3` },
    { title: "Bana Medet", author: "Deyiş", url: `${BASE_URL}bana_medet.mp3` },
    { title: "Bana Medet (V2)", author: "Deyiş", url: `${BASE_URL}bana_medet2.mp3` },
    { title: "Bana Medet (Cover)", author: "Deyiş", url: `${BASE_URL}bana_medet__06102025[1]%20(Cover).mp3` },
    { title: "Beklerim Yolların", author: "Deyiş", url: `${BASE_URL}Beklerim_Yolların.mp3` },
    { title: "Ben de Bu Dünyaya", author: "Deyiş", url: `${BASE_URL}ben_de_bu_dunyaya.mp3` },
    { title: "Be Yarenler", author: "Deyiş", url: `${BASE_URL}be_yarenler.mp3` },
    { title: "Bir Gerçeğe", author: "Deyiş", url: `${BASE_URL}Bir_gercege.mp3` },
    { title: "Bir Ulu Kervandır", author: "Deyiş", url: `${BASE_URL}Bir_ulu_kervandir.mp3` },
    { title: "Biz Muhammed Ali", author: "Deyiş", url: `${BASE_URL}Biz_Muhammed_Ali.mp3` },
    { title: "Biz Muhammed Ali Diyenlerdeniz", author: "Deyiş", url: `${BASE_URL}biz_muhammed_ali_diyenlerdeniz.mp3` },
    { title: "Bu Ne Acı", author: "Deyiş", url: `${BASE_URL}Bu_ne_aci.mp3` },
    { title: "Derdim Çoktur", author: "Deyiş", url: `${BASE_URL}Derdim_coktur.mp3` },
    { title: "Dönen Dönsün", author: "Deyiş", url: `${BASE_URL}donen_donsun.mp3` },
    { title: "Dostum Muhammeddir", author: "Deyiş", url: `${BASE_URL}Dostum_Muhammeddir.mp3` },
    { title: "Dünya Benim Diye", author: "Deyiş", url: `${BASE_URL}Dunya_benim_diye.mp3` },
    { title: "Fetva Vermiş", author: "Deyiş", url: `${BASE_URL}fetva_vermis.mp3` },
    { title: "Gafil Gezme", author: "Deyiş", url: `${BASE_URL}Gafil_gezme.mp3` },
    { title: "Gelin Canlar", author: "Deyiş", url: `${BASE_URL}Gelin_canlar.mp3` },
    { title: "Gel Gönül Sabreyle", author: "Deyiş", url: `${BASE_URL}Gel_gonul_sabreyle.mp3` },
    { title: "Gezdim Seyrettim", author: "Deyiş", url: `${BASE_URL}Gezdim_seyrettim.mp3` },
    { title: "Gidi Yezid", author: "Deyiş", url: `${BASE_URL}Gidi_Yezid.mp3` },
    { title: "Gönül Kalk", author: "Deyiş", url: `${BASE_URL}Gonul_kalk.mp3` },
    { title: "Gönül Kalk Gidelim", author: "Deyiş", url: `${BASE_URL}gonul_kalk_gidelim.mp3` },
    { title: "Gördüm Düşümde", author: "Deyiş", url: `${BASE_URL}gordum_dusumde.mp3` },
    { title: "Gün Tutuşur", author: "Deyiş", url: `${BASE_URL}Gun_Tutusur.mp3` },
    { title: "Gurbet Gezip", author: "Deyiş", url: `${BASE_URL}Gurbet_gezip.mp3` },
    { title: "Haktan Didar", author: "Deyiş", url: `${BASE_URL}HaktanDidar.mp3` },
    { title: "Haktan Didar (V2)", author: "Deyiş", url: `${BASE_URL}Haktan_didar.mp3` },
    { title: "Hak Aşkına", author: "Deyiş", url: `${BASE_URL}Hak_Ashkina.mp3` },
    { title: "Hak İçin", author: "Deyiş", url: `${BASE_URL}Hak_icin.mp3` },
    { title: "Hak Muhammed Ali", author: "Deyiş", url: `${BASE_URL}Hak_Muhammed_Ali.mp3` },
    { title: "Hatalar Eyledim", author: "Deyiş", url: `${BASE_URL}Hatalar_eyledim.mp3` },
    { title: "Hazreti Ali'nin", author: "Deyiş", url: `${BASE_URL}Hazreti_Alinin.mp3` },
    { title: "Hazreti Şahın", author: "Deyiş", url: `${BASE_URL}Hazreti_Shahin.mp3` },
    { title: "Her Sabah", author: "Deyiş", url: `${BASE_URL}Her_Sabah.mp3` },
    { title: "Hızır Paşa Gibi", author: "Deyiş", url: `${BASE_URL}Hızır_pasha_gibi.mp3` },
    { title: "Kabenin Yapısı", author: "Deyiş", url: `${BASE_URL}Kabenin_Yapisi.mp3` },
    { title: "Kaç Pir Gördün", author: "Deyiş", url: `${BASE_URL}Kac_Pir_gordun.mp3` },
    { title: "Kahpe Felek", author: "Deyiş", url: `${BASE_URL}Kahpe_Felek.mp3` },
    { title: "Kalsın Benim Davam", author: "Deyiş", url: `${BASE_URL}Kalsin_benim_davam.mp3` },
    { title: "Medet Senden Medet", author: "Deyiş", url: `${BASE_URL}Medet_Senden_Medet.mp3` },
    { title: "Medet Senden Sultanım", author: "Deyiş", url: `${BASE_URL}Medet_Senden_Sultanım.mp3` },
    { title: "Mey 1", author: "Deyiş", url: `${BASE_URL}Mey1.mp3` },
    { title: "Mey 2", author: "Deyiş", url: `${BASE_URL}Mey2.mp3` },
    { title: "Muhammed Ali'nin", author: "Deyiş", url: `${BASE_URL}Muhammed_Alinin.mp3` },
    { title: "Muhammed Ali'nin Eli", author: "Deyiş", url: `${BASE_URL}Muhammed_Alinin_Eli_.mp3` },
    { title: "Muhammed Ali'nin Eli Değil mi", author: "Deyiş", url: `${BASE_URL}muhammed_alinin_eli_degilmi.mp3` },
    { title: "Muhammed Ali'nin Güzel", author: "Deyiş", url: `${BASE_URL}Muhammed_Alinin_guzel.mp3` },
    { title: "Muhammed Ali'yi Candan", author: "Deyiş", url: `${BASE_URL}Muhammed_Aliyi_Candan.mp3` },
    { title: "Necedir Ağlarsın", author: "Deyiş", url: `${BASE_URL}Necedir_Aglarsin.mp3` },
    { title: "Nefse Uyan", author: "Deyiş", url: `${BASE_URL}Nefse_Uyan.mp3` },
    { title: "Nesini Söyleyim", author: "Deyiş", url: `${BASE_URL}Nesini_Soyleyim.mp3` },
    { title: "Ne Kadar Bilirsen", author: "Deyiş", url: `${BASE_URL}Ne_Kadar_Bilirsen.mp3` },
    { title: "Padişah Katlime", author: "Deyiş", url: `${BASE_URL}Padishah_Katlime.mp3` },
    { title: "Pir Sultan Olurum", author: "Deyiş", url: `${BASE_URL}Pir_Sultan_Olurum.mp3` },
    { title: "Şah Hüseyin", author: "Deyiş", url: `${BASE_URL}Sah_Huseyin.mp3` },
    { title: "Sana Geldim", author: "Deyiş", url: `${BASE_URL}Sana_Geldim.mp3` },
    { title: "Seher Vakti", author: "Deyiş", url: `${BASE_URL}Seher_Vakti.mp3` },
    { title: "Seversen Ali'yi", author: "Deyiş", url: `${BASE_URL}Seversen_Aliyi.mp3` },
    { title: "Şaha Doğru", author: "Deyiş", url: `${BASE_URL}Shaha_Dogru.mp3` },
    { title: "Şaha Giderim", author: "Deyiş", url: `${BASE_URL}Shaha_Giderim.mp3` },
    { title: "Söylersen Muhammed", author: "Deyiş", url: `${BASE_URL}soylersen_muhammed.mp3` },
    { title: "Şu Aleme Nur", author: "Deyiş", url: `${BASE_URL}Su_Aleme_nur.mp3` },
    { title: "Şu Kanlı Zalim", author: "Deyiş", url: `${BASE_URL}Su_Kanli_Zalim.mp3` },
    { title: "Takattan Kesildim", author: "Deyiş", url: `${BASE_URL}Takattan_Kesildim.mp3` },
    { title: "Tez Gel", author: "Deyiş", url: `${BASE_URL}Tez_Gel.mp3` },
    { title: "Vurdu Kara Fırtına", author: "Deyiş", url: `${BASE_URL}Vurdu_Kara_Firtina.mp3` },
    { title: "Vurdu Kara Melodi", author: "Deyiş", url: `${BASE_URL}Vurdu_Kara_melodi.mp3` },
    { title: "Yol Muhammed Alinindir", author: "Deyiş", url: `${BASE_URL}Yol_Muhammed_Alinindir.mp3` }
  ];

  useEffect(() => {
    if (isPlaying) setShowInvite(false);
  }, [isPlaying]);

  const handleTrackEnded = () => {
    if (isRepeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      playNext();
    }
  };

  const togglePlay = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } else {
      nextIndex = (currentTrackIndex + 1) % tracks.length;
    }
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
    setTimeout(() => {
      if(audioRef.current) audioRef.current.play();
    }, 100);
  };

  const playPrev = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
    setTimeout(() => {
      if(audioRef.current) audioRef.current.play();
    }, 100);
  };

  const selectTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setTimeout(() => {
      if(audioRef.current) audioRef.current.play();
    }, 100);
    setIsExpanded(false);
  };

  return (
    <div className="flex flex-col items-end animate-fade-in relative">
      
      {/* DAVET BALONU */}
      {showInvite && !isExpanded && (
        <div className="absolute bottom-full mb-4 right-0 bg-white text-[#0F2C45] p-3 rounded-xl shadow-2xl animate-bounce w-48 text-center border-2 border-[#C5A059] z-50">
            <div className="text-xs font-bold mb-1">🎧 Gönül Pasını Sil</div>
            <div className="text-sm font-serif text-[#C5A059] font-bold">Deyişler Dinleyin</div>
            <button onClick={() => setShowInvite(false)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 w-5 h-5 flex items-center justify-center text-xs">X</button>
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-b-2 border-r-2 border-[#C5A059] transform rotate-45"></div>
        </div>
      )}

      {/* LİSTE */}
      {isExpanded && (
        <div className="bg-[#162e45] border border-[#C5A059]/30 rounded-t-2xl p-4 w-80 mb-2 shadow-2xl max-h-80 overflow-y-auto custom-scrollbar z-50">
            <div className="flex justify-between items-center mb-2 border-b border-[#C5A059]/20 pb-2">
                <h4 className="text-[#C5A059] font-bold text-sm">Eser Listesi ({tracks.length})</h4>
                <button onClick={() => setIsExpanded(false)}><X size={16} className="text-gray-400 hover:text-white"/></button>
            </div>
            <ul className="space-y-1">
                {tracks.map((track, i) => (
                    <li key={i} onClick={() => selectTrack(i)} className={`text-xs p-2 rounded cursor-pointer flex flex-col transition border-b border-white/5 ${i === currentTrackIndex ? 'bg-[#C5A059]/20 text-[#C5A059] font-bold border-l-4 border-l-[#C5A059]' : 'text-gray-300 hover:bg-[#0F2C45]'}`}>
                        <span className="flex items-center gap-2">{i === currentTrackIndex && <Music size={10} className="animate-bounce"/>} {track.title}</span>
                    </li>
                ))}
            </ul>
        </div>
      )}

      {/* PLAYER */}
      <div className="bg-[#162e45]/95 backdrop-blur-md border border-[#C5A059]/30 p-3 rounded-2xl shadow-2xl flex items-center gap-4 pr-6 min-w-[340px] max-w-sm">
        <audio ref={audioRef} src={tracks[currentTrackIndex]?.url || ""} onEnded={handleTrackEnded} onError={(e) => console.log("Hata", e)}/>
        
        <div className="w-12 h-12 bg-[#0F2C45] rounded-xl flex items-center justify-center text-[#C5A059] border border-[#C5A059]/20 relative group cursor-pointer shrink-0" onClick={() => setIsExpanded(!isExpanded)}>
           <Music size={24} className={isPlaying ? "animate-spin-slow" : ""} />
        </div>

        <div className="flex-1 overflow-hidden">
           <div className="flex justify-between items-start">
               <div className="overflow-hidden">
                  <h3 className="text-[#F4EFE0] font-bold text-sm leading-tight truncate pr-2 uppercase">{tracks[currentTrackIndex]?.title}</h3>
                  <p className="text-[#C5A059] text-[10px] font-bold tracking-widest mt-0.5">DEYİŞ</p>
               </div>
               <button onClick={() => setIsExpanded(!isExpanded)} className="text-[#C5A059] hover:text-white shrink-0"><List size={18}/></button>
           </div>

           <div className="flex items-center gap-4 mt-2 justify-center">
              <button 
                onClick={() => setIsShuffle(!isShuffle)} 
                className={`transition-colors ${isShuffle ? 'text-[#C5A059]' : 'text-gray-500 hover:text-gray-300'}`}
                title="Karışık Çal"
              >
                <Shuffle size={16} />
              </button>

              <button onClick={playPrev} className="text-gray-400 hover:text-[#C5A059] transition-colors"><SkipBack size={20} fill="currentColor" /></button>
              
              <button onClick={togglePlay} className="w-9 h-9 bg-[#C5A059] text-[#0F2C45] rounded-full flex items-center justify-center hover:bg-white shadow-lg transition hover:scale-110">
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
              </button>
              
              <button onClick={playNext} className="text-gray-400 hover:text-[#C5A059] transition-colors"><SkipForward size={20} fill="currentColor" /></button>

              <button 
                onClick={() => setIsRepeat(!isRepeat)} 
                className={`transition-colors ${isRepeat ? 'text-[#C5A059]' : 'text-gray-500 hover:text-gray-300'}`}
                title="Tekrarla"
              >
                <Repeat size={16} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}