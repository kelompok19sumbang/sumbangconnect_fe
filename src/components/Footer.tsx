import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-forest text-cream border-t border-white/10 relative overflow-hidden">
      
      {/* Motif Background Halus */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Kolom 1: Deskripsi */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">SumbangConnect</h3>
            <p className="text-cream/70 text-sm leading-relaxed md:pr-4">
              Pusat informasi layanan masyarakat, fasilitas kesehatan, dan direktori UMKM lokal Kelurahan Sumbang yang dirancang untuk masa depan.
            </p>
          </div>

          {/* Kolom 2: Kontak */}
          <div className="space-y-4">
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 text-terracotta mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="leading-relaxed">Jl. Teuku Umar No. 15, Kelurahan Sumbang, Kec. Bojonegoro, Jawa Timur 62115</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>0812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>layanan@sumbang.desa.id</span>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Sosial Media */}
          <div className="space-y-4">
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Sosial Media</h4>
            <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm w-fit">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Instagram
            </a>
          </div>

          {/* Kolom 4: Logo KKN (Baru) */}
          <div className="flex flex-col items-start lg:items-end justify-center lg:pl-8">
            {/* Box putih halus agar tulisan navy di logo terbaca. Kalau tidak suka, hapus class 'bg-white p-4 rounded-3xl' */}
            <div className="bg-white p-5 rounded-3xl shadow-xl border-4 border-white/10 hover:-translate-y-2 transition-transform duration-300">
              <Image 
                src="/logo-sumbang.png" 
                alt="Logo KKN Sumbang Digdaya" 
                width={200} 
                height={200}
                className="w-32 md:w-40 h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-cream/50">
          &copy; 2026 KKN Sumbang Digdaya &bull; Kelurahan Sumbang. All rights reserved.
        </div>
      </div>
    </footer>
  );
}