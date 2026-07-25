// src/components/ImageSlider.tsx
'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; 

export default function ImageSlider({ images, altPrefix }: { images: any[], altPrefix: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mencegah error Hydration di Next.js dengan memastikan portal jalan di sisi Client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-navy/40 font-medium bg-navy/5">
        Gambar belum tersedia
      </div>
    );
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      {/* Container utama di-set h-full w-full agar mengisi penuh bapaknya */}
      <div className="flex flex-col gap-3 h-full w-full p-2 md:p-4">
        
        {/* 1. GAMBAR UTAMA (Pakai flex-1 dan absolute inset-0 agar FULL) */}
        <div 
          className="w-full flex-1 bg-navy/5 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative group cursor-zoom-in border border-navy/10"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={`http://103.82.92.95${images[activeIdx].url}`}
            alt={`${altPrefix} - Utama`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-navy p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg pointer-events-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </div>

        {/* 2. THUMBNAIL BAWAH (Jika gambar lebih dari 1) */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 px-1 flex-shrink-0 h-16 md:h-20">
            {images.map((foto, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIdx(idx);
                }}
                className={`relative w-16 md:w-20 h-full rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 focus:outline-none ${
                  activeIdx === idx 
                    ? 'border-2 border-accent shadow-md scale-100 opacity-100' 
                    : 'border-2 border-transparent opacity-50 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img
                  src={`http://103.82.92.95${foto.url}`}
                  alt={`Thumbnail ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3. PORTAL POP-UP */}
      {mounted && isModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-4 sm:p-8"
          onClick={() => setIsModalOpen(false)} 
        >
          {/* Tombol Close */}
          <button 
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/30 text-white rounded-full transition-colors z-[10000]"
            onClick={() => setIsModalOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {images.length > 1 && (
            <button 
              onClick={prevImage}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/30 text-white rounded-full transition-colors z-[10000]"
            >
              <svg className="w-6 h-6 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}

          <img 
            src={`http://103.82.92.95${images[activeIdx].url}`}
            alt={`${altPrefix} - Enlarge`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg cursor-default"
            onClick={(e) => e.stopPropagation()} 
          />

          {images.length > 1 && (
            <button 
              onClick={nextImage}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/30 text-white rounded-full transition-colors z-[10000]"
            >
              <svg className="w-6 h-6 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-medium tracking-widest text-sm bg-black/60 px-5 py-2 rounded-full border border-white/10">
              {activeIdx + 1} / {images.length}
            </div>
          )}
        </div>,
        document.body 
      )}
    </>
  );
}