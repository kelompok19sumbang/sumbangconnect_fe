// src/app/galeri/page.tsx
import { getGaleri } from '@/lib/api';
import DomeGalleryWrapper from '@/components/DomeGalleryWrapper';
import Link from 'next/link'; 

export default async function GaleriPage() {
  const galeriData = await getGaleri();

  // 1. BATASI DATA: Ambil maksimal 30 foto saja untuk memutar kubah
  const latestPhotos = galeriData.slice(0, 30);

  const mappedImages = latestPhotos.map((item: any) => ({
    src: item.foto?.url 
      ? `http://http://103.82.92.95${item.foto.url}` 
      : 'https://via.placeholder.com/400',
    alt: item.judul_foto || 'Dokumentasi Kelurahan Sumbang'
  }));

  const displayImages = mappedImages.length > 0 ? mappedImages : [
    { src: 'https://picsum.photos/seed/sumbang1/600/600', alt: 'Placeholder 1' },
    { src: 'https://picsum.photos/seed/sumbang2/600/600', alt: 'Placeholder 2' },
    { src: 'https://picsum.photos/seed/sumbang3/600/600', alt: 'Placeholder 3' },
    { src: 'https://picsum.photos/seed/sumbang4/600/600', alt: 'Placeholder 4' },
    { src: 'https://picsum.photos/seed/sumbang5/600/600', alt: 'Placeholder 5' },
    { src: 'https://picsum.photos/seed/sumbang6/600/600', alt: 'Placeholder 6' },
  ];

  return (
    <main className="min-h-screen relative font-sans pt-32 pb-12 overflow-hidden bg-navy">
      
      {/* Efek Tekstur & Ambient Glow (Diubah ke palet baru) */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-primary/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* HEADER HALAMAN */}
        <div className="max-w-7xl mx-auto px-6 text-center mb-10 relative">
          <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3 drop-shadow-md">
            Potret Desa
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-serif mb-6 drop-shadow-lg">
            Galeri Sumbang
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Eksplorasi visual keindahan, kegiatan, dan keseharian warga Kelurahan Sumbang dalam format 3D interaktif. Geser untuk memutar.
          </p>
        </div>

        
        {/* RENDER DOME GALLERY DENGAN MASKING HALUS */}
        <div 
          className="w-full h-[65vh] md:h-[85vh] relative mt-4" 
          style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
        >
          <DomeGalleryWrapper 
            images={displayImages} 
            grayscale={false} 
            overlayBlurColor="#0a1128" // Diselaraskan dengan warna gelap Navy
            fit={0.65}         
            minRadius={750}    
          />
        </div>

        {/* TOMBOL LIHAT ARSIP (Diperbaiki ke Accent/Kuning) */}
        <div className="max-w-7xl mx-auto px-6 text-center mt-8 pb-12 relative z-20">
          <p className="text-white/50 text-sm mb-5 font-light">Ingin melihat koleksi foto kegiatan lainnya?</p>
          <Link 
            href="/galeri/arsip" 
            className="inline-flex items-center gap-3 bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-navy px-8 py-3.5 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-accent/30 hover:-translate-y-1"
          >
            Lihat Semua Arsip Foto
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>

      </div>
    </main>
  );
}