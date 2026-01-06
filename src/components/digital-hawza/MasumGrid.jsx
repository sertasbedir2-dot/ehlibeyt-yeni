'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// DÜZELTME: Dosya yolu '../../lib/graph-data' olarak güncellendi.
import { MASUM_NODES } from '../../lib/graph-data';
import GeometricSanctuary from './GeometricSanctuary';

export default function MasumGrid() {
  const [selectedId, setSelectedId] = useState(null);
  const [aiComponent, setAiComponent] = useState(null);

  // Etkileşim İşleyicisi
  const handleCardClick = async (node) => {
    setSelectedId(node.id);
    
    // Simüle edilmiş AI yanıtı (Animasyonlu geçiş)
    setTimeout(() => {
        setAiComponent(
            <div className="p-6 bg-white/50 backdrop-blur rounded-lg border border-amber-900/10 animate-fade-in">
                <h3 className="font-serif text-lg text-amber-900">Üretken İçgörü: {node.properties.title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                    İsnad ilişkileri ve tarihsel bağlam haritası yükleniyor...
                    <br/>
                    <span className="text-amber-700 font-medium">(Burada Hadis Ağı Grafiği görünecek)</span>
                </p>
            </div>
        );
    }, 800);
  };

  const resetSelection = () => {
    setSelectedId(null);
    setAiComponent(null);
  };

  return (
    <div className="relative min-h-screen font-sans text-gray-900 overflow-hidden bg-[#F5F5F0]">
      {/* 1. Canlı Arka Plan (p5.js) */}
      <GeometricSanctuary />

      <main className="relative z-10 container mx-auto px-4 py-20">
        <header className="mb-12 text-center">
            <h1 className="text-4xl font-serif text-amber-900 mb-2">On Dört Masum</h1>
            <p className="text-gray-600 italic">İlim dairesine girmek için bir rehber seçin.</p>
        </header>

        <motion.div 
            layout 
            className={`grid gap-6 transition-all duration-500 ${selectedId ? 'grid-cols-1 md:grid-cols-[1fr_2fr]' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}
        >
          <AnimatePresence>
            {MASUM_NODES.map((node) => {
              const isSelected = selectedId === node.id;
              const isHidden = selectedId && !isSelected;

              // Odaklanma (Hudur-ül Kalp) için seçilmeyenleri gizle
              if (isHidden) return null;

              return (
                <motion.div
                  layoutId={`card-${node.id}`}
                  key={node.id}
                  onClick={() => !isSelected && handleCardClick(node)}
                  className={`
                    group relative bg-white/80 backdrop-blur-sm 
                    border border-amber-900/5 rounded-xl overflow-hidden
                    cursor-pointer hover:shadow-xl hover:shadow-amber-900/5 
                    transition-all duration-300
                    ${isSelected ? 'h-auto cursor-default ring-2 ring-amber-500/20' : 'h-64 flex flex-col justify-center items-center text-center'}
                  `}
                >
                  <div className="p-6 w-full">
                    {/* 2. Tipografi ve Ontoloji */}
                    <h2 
                        className="text-3xl mb-2 text-amber-950 transition-all duration-400 ease-out font-serif"
                    >
                      {node.properties.name_ar}
                    </h2>
                    
                    <p className="text-sm uppercase tracking-widest text-gray-500 font-medium">
                      {node.properties.name_en}
                    </p>

                    {isSelected && (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="mt-8 text-left"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2 py-1 rounded">
                                    Graph ID: {node.id}
                                </span>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); resetSelection(); }}
                                    className="text-sm text-gray-500 hover:text-red-600 transition-colors bg-white px-3 py-1 rounded border border-gray-200"
                                >
                                    Kapat ✕
                                </button>
                            </div>
                            
                            {/* 3. Üretken Etkileşim Alanı */}
                            <div className="min-h-[300px] border-t border-dashed border-gray-300 pt-6">
                                {aiComponent ? (
                                    aiComponent
                                ) : (
                                    <div className="flex items-center gap-3 text-amber-800 animate-pulse p-4">
                                        <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" />
                                        <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce delay-75" />
                                        <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce delay-150" />
                                        <span className="text-sm font-medium ml-2">Bilgi Çizgesi Yükleniyor...</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}