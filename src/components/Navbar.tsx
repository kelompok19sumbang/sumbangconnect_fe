// src/components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // <-- Tambahan import Image
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Berita', href: '/berita' },
    { name: 'Katalog UMKM', href: '/umkm' },
    { name: 'Profil Desa', href: '/profil' },
    { name: 'Infografis', href: '/infografis' },
    { name: 'Fasilitas & Kesehatan', href: '/fasilitas' },
    { name: 'Layanan Publik', href: '/layanan' },
  ];

  return (
    <nav className="bg-forest text-cream sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Brand - Tanpa background putih */}
<Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity">
  <Image 
    src="/logo-sumbang.png" 
    alt="Logo Sumbang Digdaya" 
    width={140} 
    height={50}
    className="h-10 w-auto object-contain"
    priority
  />
</Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center gap-3 xl:gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[13px] xl:text-sm font-medium transition-all whitespace-nowrap ${
                  pathname === link.href
                    ? 'text-terracotta border-b-2 border-terracotta pb-1'
                    : 'text-cream/70 hover:text-cream'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/" className="bg-terracotta text-forest px-5 py-2.5 ml-2 rounded-full text-[13px] xl:text-sm font-bold hover:bg-white hover:text-forest transition-colors whitespace-nowrap shadow-sm">
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-cream p-2">
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
        <div className="lg:hidden bg-forest border-t border-white/10 pb-4 shadow-xl">
          <div className="px-4 pt-2 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-xl text-base font-medium text-cream hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}