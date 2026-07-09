// src/components/Catalog.tsx
'use client';

import { useState } from 'react';
import { UmkmItem } from '@/types';
import UmkmCard from './UmkmCard';

const TABS = ['Semua', 'Ronce Melati', 'Kuliner', 'Jasa & Lainnya'];

export default function Catalog({ items }: { items: UmkmItem[] }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Semua');

  const filteredItems = items.filter((item) => {
    const matchSearch = item.nama_toko.toLowerCase().includes(search.toLowerCase()) ||
                        item.deskripsi.toLowerCase().includes(search.toLowerCase());
    
    let matchTab = true;
    if (activeTab === 'Ronce Melati') {
      matchTab = item.nama_toko.toLowerCase().includes('ronce') || item.deskripsi.toLowerCase().includes('melati');
    } else if (activeTab === 'Kuliner') {
      matchTab = item.deskripsi.toLowerCase().includes('kuliner') || item.nama_toko.toLowerCase().includes('ayam') || item.nama_toko.toLowerCase().includes('warung');
    } else if (activeTab === 'Jasa & Lainnya') {
      matchTab = item.deskripsi.toLowerCase().includes('jasa') || item.nama_toko.toLowerCase().includes('servis');
    }

    return matchSearch && matchTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Search Bar - Tema Natural */}
      <div className="max-w-xl mx-auto mb-8 relative z-20">
        <div className="relative group">
          <svg className="absolute left-5 top-4 h-5 w-5 text-forest/40 group-focus-within:text-terracotta transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari nama UMKM atau produk ronce..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-forest/10 rounded-full focus:outline-none focus:ring-4 focus:ring-terracotta/20 focus:border-terracotta transition-all shadow-sm text-forest placeholder:text-forest/40 text-base font-medium"
          />
        </div>
      </div>

      {/* Tabs Kategori - Tema Forest & Terracotta */}
      <div className="flex justify-center flex-wrap gap-3 mb-14">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSearch('');
            }}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-forest text-cream shadow-lg shadow-forest/20 scale-105' 
                : 'bg-white text-forest border border-forest/20 hover:border-terracotta hover:text-terracotta'
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
        <div className="text-center py-20 bg-forest/5 rounded-[3rem] border border-forest/10">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-terracotta">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-forest font-bold text-lg">Maaf, data tidak ditemukan.</p>
        </div>
      )}
    </div>
  );
}