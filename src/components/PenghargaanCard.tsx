'use client';

import { useState } from 'react';

export default function PenghargaanCard({ judul, tanggal, deskripsi, fotoUrl }: any) {
  const [isOpen, setIsOpen] = useState(false);

  // Kunci scroll background saat modal terbuka
  if (typeof document !== 'undefined') {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }

  return (
    <>
      {/* CARD UTAMA */}
      <div className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-xl backdrop-blur-sm flex flex-col h-full">
        <div className="w-full h-48 md:h-52 bg-navy/50 rounded-2xl mb-6 overflow-hidden relative border border-white/5 shrink-0">
          <img 
            src={fotoUrl} 
            alt={judul} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
          />
          {tanggal && (
            <div className="absolute top-4 right-4 bg-navy/80 backdrop-blur-md border border-white/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {tanggal}
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors leading-tight">
            {judul}
          </h3>
          {/* Teks dipotong 3 baris aja di depan */}
          <p className="text-white/60 text-sm leading-relaxed line-clamp-3 mb-6">
            {deskripsi}
          </p>
          
          {/* Tombol Buka Pop-Up */}
          <button 
            onClick={() => setIsOpen(true)}
            className="mt-auto w-full bg-accent text-navy hover:bg-yellow-500 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-accent/20 hover:-translate-y-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Baca Selengkapnya
          </button>
        </div>
      </div>

      {/* POP-UP MODAL (Akan muncul kalau tombol diklik) */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity"
          onClick={() => setIsOpen(false)} // Klik di luar box bakal nutup modal
        >
          <div 
            className="bg-navy border border-white/10 rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative animate-fade-up"
            onClick={(e) => e.stopPropagation()} // Supaya klik di dalem box nggak ikut nutup
          >
            {/* Header Modal */}
            <div className="flex justify-between items-start p-6 md:p-8 border-b border-white/5 bg-white/5">
              <div>
                <div className="inline-block bg-accent/20 text-accent border border-accent/20 text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {tanggal}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-serif leading-tight">
                  {judul}
                </h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/50 hover:text-white bg-white/5 hover:bg-white/20 p-2 rounded-full transition-all shrink-0 ml-4"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            {/* Body Modal (Area teks & gambar full) */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow bg-navy">
              <img 
                src={fotoUrl} 
                alt={judul} 
                className="w-full h-auto max-h-[400px] object-cover rounded-2xl mb-8 border border-white/10 shadow-lg" 
              />
              <p className="text-white/80 leading-relaxed whitespace-pre-line text-[15px] md:text-base">
                {deskripsi}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}