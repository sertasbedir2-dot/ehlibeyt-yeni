// src/components/digital-hawza/GeometricSanctuary.jsx
'use client';

import React, { useEffect, useRef } from 'react';

export default function GeometricSanctuary() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Next.js SSR ile uyumlu olması için dinamik import
    const initP5 = async () => {
      const p5 = (await import('p5')).default;

      new p5((p) => {
        let t = 0;

        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight).parent(containerRef.current);
          p.noStroke();
        };

        p.draw = () => {
          // Sakin Teknoloji Paleti (Toprak Tonları)
          const bg = p.color('#F5F5F0'); // Kum
          const c1 = p.color('#C9A66B'); // Aşı Boyası
          const c2 = p.color('#8DA399'); // Adaçayı Yeşili

          p.background(bg);
          
          // Sinüs Dalgası ile "Nefes Alma" Simülasyonu
          t += 0.005; 
          const breath = (p.sin(t) + 1) / 2; // 0-1 arası normalizasyon
          
          const gridSize = 80;
          
          for (let x = 0; x < p.width; x += gridSize) {
            for (let y = 0; y < p.height; y += gridSize) {
              p.push();
              p.translate(x + gridSize / 2, y + gridSize / 2);
              
              // Nefes hızına göre dönme ve ölçekleme
              p.rotate(p.TWO_PI * breath * 0.05);
              const scaleFactor = p.map(breath, 0, 1, 0.8, 1.2);
              p.scale(scaleFactor);

              // Prosedürel 8 Köşeli Yıldız (Basitleştirilmiş Girih)
              p.fill(p.lerpColor(c1, c2, (x + y) / 1000));
              p.globalAlpha = 0.15 + (breath * 0.1); // Opaklık değişimi
              
              drawStar(p, 0, 0, 20, 40, 8);
              p.pop();
            }
          }
        };

        // Yıldız Çizim Fonksiyonu
        function drawStar(p, x, y, radius1, radius2, npoints) {
          let angle = p.TWO_PI / npoints;
          let halfAngle = angle / 2.0;
          p.beginShape();
          for (let a = 0; a < p.TWO_PI; a += angle) {
            let sx = x + p.cos(a) * radius2;
            let sy = y + p.sin(a) * radius2;
            p.vertex(sx, sy);
            sx = x + p.cos(a + halfAngle) * radius1;
            sy = y + p.sin(a + halfAngle) * radius1;
            p.vertex(sx, sy);
          }
          p.endShape(p.CLOSE);
        }

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
      });
    };

    initP5();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 opacity-60 pointer-events-none"
      aria-hidden="true" 
    />
  );
}