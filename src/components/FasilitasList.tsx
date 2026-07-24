// src/components/FasilitasList.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import ImageSlider from '@/components/ImageSlider';

export default function FasilitasList({ dataFasilitas }: { dataFasilitas: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6); // Tampilkan 6 kotak pertama

  // Logika Filter (Search)
  const filteredData = dataFasilitas.filter((item) => {
    const keyword = searchTerm.toLowerCase();
    const nama = item.nama_fasilitas?.toLowerCase() || '';
    const kategori = item.kategori?.toLowerCase() || '';
    return nama.includes(keyword) || kategori.includes(keyword);
  });

  // Logika Load More (Batasi data yang tampil)
  const displayedData = filteredData.slice(0, visibleCount);
  const hasMore = visibleCount < filteredData.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6); // Tambah 6 data lagi kalau diklik
  };

  return (
    <div className="w-full">
      
      {/* ================= SEARCH BAR ================= */}
      <div className="mb-10 max-w-md relative">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-navy/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Cari fasilitas atau kategori..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(6); // Reset jumlah tampilan ke 6 saat ngetik pencarian
          }}
          className="w-full pl-14 pr-6 py-4 rounded-2xl border border-navy/10 focus:border-blue-primary focus:ring-2 focus:ring-blue-primary/20 bg-white shadow-sm transition-all outline-none text-navy font-bold placeholder:font-medium placeholder:text-navy/40"
        />
      </div>

      {/* ================= GRID KARTU FASILITAS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedData.length > 0 ? (
          displayedData.map((item: any) => (
            <div key={item.documentId || item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-navy/10 group hover:shadow-2xl hover:shadow-navy/10 hover:-translate-y-1 transition-all duration-300 flex flex-col">
              
              <div className="relative w-full h-64 bg-navy/5">
                <ImageSlider images={item.foto_fasilitas || []} altPrefix={item.nama_fasilitas} />
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-navy px-3 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider border border-navy/10">
                  {item.kategori ? item.kategori.replace(/_/g, ' ') : 'Fasilitas'}
                </div>
              </div>

              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-serif font-bold text-navy mb-3 line-clamp-2">
                  {item.nama_fasilitas}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed mb-6 line-clamp-3">
                  {item.deskripsi}
                </p>
                
                <div className="mt-auto pt-4 border-t border-navy/5">
                  <Link 
                    href={`/fasilitas/${item.documentId || item.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full bg-navy text-white hover:bg-accent hover:text-navy transition-colors duration-300 py-3 rounded-xl text-sm font-bold shadow-sm"
                  >
                    Lihat Detail Fasilitas
                  </Link>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-navy/10">
            <p className="text-navy/50 font-bold text-lg">Waduh, fasilitas yang dicari tidak ditemukan.</p>
          </div>
        )}
      </div>

      {/* ================= BUTTON LIHAT LEBIH BANYAK ================= */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="group flex items-center gap-3 bg-white text-navy border-2 border-navy/10 px-8 py-4 rounded-full font-bold hover:border-accent hover:bg-accent transition-all duration-300 shadow-sm hover:shadow-lg"
          >
            Lihat Lebih Banyak
            <svg className="w-5 h-5 text-navy/50 group-hover:text-navy transition-colors animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      )}

    </div>
  );
}