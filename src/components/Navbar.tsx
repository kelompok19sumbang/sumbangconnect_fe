// src/components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Berita', href: '/berita' },
    { name: 'Katalog UMKM', href: '/umkm' },
    { name: 'Infografis', href: '/infografis' },
    { name: 'Fasilitas & Peta Potensi', href: '/fasilitas' }, 
    { name: 'Layanan Publik', href: '/layanan' },
    { name: 'Galeri Kelurahan', href: '/galeri' },
  ];

  return (
    <nav className="bg-navy text-cream sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* ================= BAGIAN LOGO NAVBAR ================= */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group">
            
            {/* 1. Logo Pemkab Bojonegoro (Transparan) */}
            <img 
              src="/logo-pemkabbjn.png" 
              alt="Logo Pemkab Bojonegoro" 
              className="h-9 sm:h-11 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />

            {/* Garis Pemisah Estetik */}
            <div className="h-7 w-px bg-white/30 hidden sm:block mx-0.5"></div>

            {/* 2. Logo Sumbang Digdaya (Transparan) */}
            <img  
              src="/logo-sumbang.png" 
              alt="Logo Sumbang Digdaya" 
              // 🔥 FIX: h-9 sm:h-11 dinaikkan jadi h-10 sm:h-14 biar lebih besar dan seimbang
              className="h-10 sm:h-14 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />

            {/* 3. Teks Brand */}
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white hidden md:block ml-1 group-hover:opacity-90 transition-opacity">
              Sumbang<span className="text-accent font-sans">Connect.</span>
            </span>
            
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center gap-3 xl:gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[13px] xl:text-sm font-medium transition-all whitespace-nowrap ${
                  pathname === link.href  
                    ? 'text-accent border-b-2 border-accent pb-1'
                    : 'text-cream/70 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/hubungi-kami" className="bg-accent text-navy px-5 py-2.5 ml-2 rounded-full text-[13px] xl:text-sm font-bold hover:bg-white hover:text-navy transition-colors whitespace-nowrap shadow-sm">
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-cream p-2 focus:outline-none">
              {!isOpen ? (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              ) : (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-navy border-t border-white/10 pb-6 shadow-xl">
          <div className="px-4 pt-2 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-xl text-base font-medium ${
                  pathname === link.href ? 'bg-white/10 text-accent' : 'text-cream hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* TAMBAHAN: Tombol Hubungi Kami Khusus Mobile */}
            <div className="pt-4 mt-2 border-t border-white/10">
              <Link
                href="/hubungi-kami"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-accent text-navy px-4 py-3.5 rounded-xl text-base font-bold hover:bg-white transition-colors shadow-sm"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}