// src/components/ExpandableHistory.tsx
"use client";

import { useState, useRef, useEffect } from 'react';

export default function ExpandableHistory({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mengecek apakah konten melebihi batas 250px
    if (contentRef.current && contentRef.current.scrollHeight > 250) {
      setNeedsExpansion(true);
    }
  }, [children]);

  return (
    <div className="relative w-full">
      <div
        ref={contentRef}
        // 🔥 FIX: max-height dinaikkan ke 10000px dan dikasih padding bawah (pb-12) biar nggak kepotong
        className={`transition-all duration-[1500ms] ease-in-out relative overflow-hidden ${
          isExpanded ? 'max-h-[10000px] pb-12' : 'max-h-[250px]'
        }`}
      >
        {children}
        
        {/* Efek gradasi putih memudar di bawah teks saat belum di-expand */}
        {!isExpanded && needsExpansion && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent pointer-events-none"></div>
        )}
      </div>

      {needsExpansion && (
        <div className="mt-6 text-center relative z-20">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3 rounded-full font-bold tracking-wide hover:bg-blue-primary transition-all duration-300 shadow-lg hover:-translate-y-1"
          >
            {isExpanded ? (
              <>
                Tutup Sejarah
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
              </>
            ) : (
              <>
                Baca Selengkapnya
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}