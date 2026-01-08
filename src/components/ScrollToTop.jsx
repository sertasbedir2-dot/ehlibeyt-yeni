import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Sayfa değiştiğinde (pathname değiştiğinde)
    // "behavior: instant" parametresi, CSS'deki smooth-scroll ayarını ezerek
    // sayfanın ANINDA en tepeye ışınlanmasını sağlar. Gecikme olmaz.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", 
    });
    
  }, [pathname]);

  return null; // Bu görünmez bir hizmetkardır (Görsel UI yoktur).
}