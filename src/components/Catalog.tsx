// src/components/Catalog.tsx
'use client';

import { useState } from 'react';
import { UmkmItem } from '@/types';
import UmkmCard from './UmkmCard';
import GradualBlur from './GradualBlur';

const TABS = [
  'Semua', 
  'Ronce Melati', 
  'Kuliner', 
  'Kebutuhan Sehari-hari', 
  'Jasa', 
  'Lainnya'
];

export default function Catalog({ items }: { items: UmkmItem[] }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Semua');

  const filteredItems = items.filter((item) => {
    const matchSearch = item.nama_toko.toLowerCase().includes(search.toLowerCase()) ||
                        item.deskripsi.toLowerCase().includes(search.toLowerCase());
    
    let matchTab = true;
    if (activeTab !== 'Semua') {
      const kategoriDariStrapi = item.kategori ? item.kategori.toLowerCase().trim() : '';
      const kategoriDariTab = activeTab.toLowerCase().trim();
      matchTab = kategoriDariStrapi === kategoriDariTab; 
    }
    return matchSearch && matchTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 relative">
      
      {/* Search Bar - Tema Modern Tech */}
      <div className="max-w-xl mx-auto mb-8 relative z-20">
        <div className="relative group">
          <svg className="absolute left-5 top-4 h-5 w-5 text-navy/40 group-focus-within:text-blue-primary transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari nama UMKM atau produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-navy/10 rounded-full focus:outline-none focus:ring-4 focus:ring-blue-cyan/20 focus:border-blue-primary transition-all shadow-sm text-navy placeholder:text-navy/40 text-base font-medium"
          />
        </div>
      </div>

      {/* Tabs Kategori - Tema Navy & Accent */}
      <div className="flex justify-center flex-wrap gap-3 mb-14 relative z-20">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSearch('');
            }}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-navy text-white shadow-lg shadow-navy/20 scale-105' 
                : 'bg-white text-navy border border-navy/20 hover:border-accent hover:text-accent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid UMKM */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredItems.map((item) => (
            <UmkmCard key={item.documentId} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-navy/5 rounded-[3rem] border border-navy/10 relative z-20">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-navy font-bold text-lg">Maaf, data tidak ditemukan.</p>
        </div>
      )}

      {/* Gradual Blur Tetap Ada */}
      <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
        <GradualBlur 
          target="parent" 
          position="bottom" 
          height="8rem" 
          strength={3} 
          divCount={8} 
          curve="ease-out"
        />
      </div>
    </div>
  );
}