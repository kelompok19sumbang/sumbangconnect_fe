// src/app/galeri/page.tsx
import { getGaleri, getPenghargaan } from '@/lib/api';
import DomeGalleryWrapper from '@/components/DomeGalleryWrapper';
import Link from 'next/link'; 

export default async function GaleriPage() {
  const galeriData = await getGaleri();
  // 🔥 Fetch data penghargaan dari Strapi
  const dataPenghargaan = await getPenghargaan();

  // BATASI DATA: Ambil maksimal 30 foto saja untuk memutar kubah
  const latestPhotos = galeriData.slice(0, 30);

  const mappedImages = latestPhotos.map((item: any) => ({
    src: item.foto?.url 
      ? item.foto.url 
      : 'https://via.placeholder.com/400',
    alt: item.judul_foto || 'Dokumentasi Kelurahan Sumbang'
  }));

  const displayImages = mappedImages.length > 0 ? mappedImages : [
    { src: 'https://picsum.photos/seed/sumbang1/600/600', alt: 'Placeholder 1' },
    { src: 'https://picsum.photos/seed/sumbang2/600/600', alt: 'Placeholder 2' },
    { src: 'https://picsum.photos/seed/sumbang3/600/600', alt: 'Placeholder 3' },
  ];

  // 🔥 Fungsi untuk mengekstrak teks dari format "Rich text (Blocks)" Strapi
  const extractTextFromBlocks = (blocks: any) => {
    if (!blocks || !Array.isArray(blocks)) return "Deskripsi tidak tersedia.";
    return blocks.map((block: any) => {
      if (block.type === 'paragraph' && block.children) {
        return block.children.map((child: any) => child.text).join('');
      }
      return '';
    }).join('\n');
  };

  // 🔥 Fungsi untuk merapikan format tanggal ke format Indonesia
  const formatTanggal = (tanggalString: string) => {
    if (!tanggalString) return '';
    const date = new Date(tanggalString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <main className="min-h-screen relative font-sans pt-32 pb-12 overflow-hidden bg-navy">
      
      {/* Efek Tekstur & Ambient Glow */}
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
            overlayBlurColor="#0a1128" 
            fit={0.65}         
            minRadius={750}    
          />
        </div>

        {/* TOMBOL LIHAT ARSIP */}
        <div className="max-w-7xl mx-auto px-6 text-center mt-8 pb-16 relative z-20">
          <p className="text-white/50 text-sm mb-5 font-light">Ingin melihat koleksi foto kegiatan lainnya?</p>
          <Link 
            href="/galeri/arsip" 
            className="inline-flex items-center gap-3 bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-navy px-8 py-3.5 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-accent/30 hover:-translate-y-1"
          >
            Lihat Semua Arsip Foto
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>

        {/* ================= SECTION PENGHARGAAN DESA ================= */}
        <div className="w-full relative z-20 pt-16 pb-10 border-t border-white/10 mt-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-accent/5 blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center mb-16">
              <p className="text-accent font-bold uppercase tracking-widest text-sm mb-3">Prestasi & Pencapaian</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Penghargaan Kelurahan</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-accent to-yellow-500 mx-auto rounded-full"></div>
            </div>

            {/* Grid Bagan Penghargaan dari Strapi */}
            {dataPenghargaan && dataPenghargaan.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {dataPenghargaan.map((item: any) => {
                  // 🔥 FIX ANTI BADAI 1: Ambil teks baik dari struktur Flat maupun Nested (Strapi v4/v5)
                  const judul = item.judul || item.attributes?.judul || "Tanpa Judul";
                  const tanggalRaw = item.tanggal || item.attributes?.tanggal;
                  const deskripsiRaw = item.deskripsi || item.attributes?.deskripsi;

                  // 🔥 FIX ANTI BADAI 2: Ambil Foto Multiple Media
                  const fotoUrl = 
                    (item.foto && item.foto.length > 0 && item.foto[0].url) ? item.foto[0].url :
                    (item.attributes?.foto?.data && item.attributes.foto.data.length > 0) ? item.attributes.foto.data[0].attributes.url :
                    'https://via.placeholder.com/600x400?text=Tanpa+Foto';
                  
                  return (
                    <div key={item.documentId || item.id} className="group bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-xl backdrop-blur-sm flex flex-col h-full">
                      
                      <div className="w-full h-48 md:h-52 bg-navy/50 rounded-2xl mb-6 overflow-hidden relative border border-white/5 shrink-0">
                        <img 
                          src={fotoUrl} 
                          alt={judul} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                        />
                        {/* 🔥 Pakai tanggalRaw yang sudah dicek */}
                        {tanggalRaw && (
                          <div className="absolute top-4 right-4 bg-navy/80 backdrop-blur-md border border-white/10 text-accent text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            {formatTanggal(tanggalRaw)}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors leading-tight">
                          {judul}
                        </h3>
                        {/* 🔥 Pakai deskripsiRaw yang sudah dicek */}
                        <p className="text-white/60 text-sm leading-relaxed flex-grow line-clamp-4">
                          {extractTextFromBlocks(deskripsiRaw)}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-white/50 py-10 bg-white/5 rounded-3xl border border-white/10">
                Belum ada data penghargaan.
              </div>
            )}

          </div>
        </div>

      </div>
    </main>
  );
}