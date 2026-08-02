// src/app/berita/page.tsx
import { getBerita, getPengaturanGlobal } from '@/lib/api';
import Link from 'next/link';
import BlurText from '@/components/BlurText';

export default async function BeritaPage() {
  const beritaData = await getBerita();
  const globalSetting = await getPengaturanGlobal(); // Ambil data global dari Strapi

  const formatTanggal = (tanggal: string) => {
    if (!tanggal) return '';
    const date = new Date(tanggal);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // 🔥 Fungsi Pembersih URL (Biar Vercel yang ngambilin gambarnya lewat proxy next.config.ts)
  const getCleanPath = (url: string) => {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      return parsed.pathname; // Mengambil '/uploads/gambar.jpg' saja
    } catch {
      return url.startsWith('/') ? url : `/${url}`; 
    }
  };

  // Ambil gambar header berita dari Strapi (jika belum di-upload, pakai fallback Pexels)
  let headerPath = '';
  if (globalSetting?.header_berita?.url) {
    headerPath = globalSetting.header_berita.url;
  } else if (globalSetting?.header_berita?.data?.attributes?.url) {
    headerPath = globalSetting.header_berita.data.attributes.url;
  }

  const headerBeritaUrl = headerPath 
    ? getCleanPath(headerPath) 
    : 'https://images.pexels.com/photos/3944454/pexels-photo-3944454.jpeg?auto=compress&cs=tinysrgb&w=1200';

  return (
    <main className="min-h-screen bg-cream font-sans pb-24">
      
      {/* ================= HEADER HALAMAN BERITA ================= */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-center overflow-hidden z-30 mb-16 rounded-b-[3rem] shadow-2xl">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 bg-navy">
          <img
            src={headerBeritaUrl} 
            alt="Berita Kelurahan Sumbang"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/80 to-blue-primary/95 mix-blend-multiply"></div>
        </div>

        {/* Konten Teks Utama */}
        <div className="relative z-10 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-8 pt-32 pb-16 animate-fade-up text-left">
          
          <p className="text-accent text-sm md:text-base font-bold mb-3 md:mb-4 tracking-widest uppercase flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            Kabar Terbaru
          </p>
          
          <BlurText 
            text="Berita Kelurahan Sumbang"
            delay={50} 
            animateBy="words" 
            direction="top" 
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-md whitespace-pre-line"
          />
          
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mt-2 drop-shadow-sm leading-relaxed">
            Ikuti perkembangan terkini, pengumuman resmi, dan berbagai kegiatan kemasyarakatan di lingkungan Kelurahan Sumbang.
          </p>
          
        </div>
      </section>

      {/* GRID KARTU BERITA */}
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beritaData.length > 0 ? (
            beritaData.map((item: any) => {
              
              // 1. Ambil path gambar anti-badai
              let thumbPath = '';
              if (item.thumbnail?.data?.attributes?.url) {
                thumbPath = item.thumbnail.data.attributes.url;
              } else if (item.thumbnail?.url) {
                thumbPath = item.thumbnail.url;
              }

              // 2. Bersihkan URL (Hapus IP HTTP biar lolos di Vercel)
              const thumbnailUrl = thumbPath 
                ? getCleanPath(thumbPath) 
                : 'https://via.placeholder.com/600x400?text=SumbangConnect';

              // LOGIKA EXTERNAL LINK
              const isExternal = !!item.link_external;
              const targetUrl = isExternal ? item.link_external : `/berita/${item.slug}`;

              return (
                <Link 
                  href={targetUrl} 
                  key={item.documentId || item.id}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-navy/10 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col relative"
                >
                  {/* Indikator External Link */}
                  {isExternal && (
                    <div className="absolute top-4 right-4 z-30 bg-navy text-white p-2 rounded-full shadow-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </div>
                  )}
                  
                  {/* Foto Thumbnail */}
                  <div className="relative w-full h-56 bg-navy/5 overflow-hidden border-b border-navy/5">
                    <img 
                      src={thumbnailUrl} 
                      alt={item.judul} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-navy px-3 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
                      {item.kategori ? item.kategori.replace(/_/g, ' ') : 'Berita'}
                    </div>
                  </div>

                  {/* Konten Teks */}
                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-blue-primary text-sm font-bold flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {formatTanggal(item.tanggal_publikasi)}
                        </p>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-navy mb-4 line-clamp-3 leading-snug group-hover:text-blue-primary transition-colors">
                        {item.judul}
                      </h3>
                    </div>
                    
                    {/* Metadata Footer (Author & View) */}
                    <div className="mt-4 pt-4 border-t border-navy/10 flex items-center justify-between text-navy/60 text-xs font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                         <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                         {item.author || 'Admin Kelurahan'}
                      </div>
                      <div className="flex items-center gap-1.5">
                         <svg className="w-4 h-4 text-blue-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                         {item.view_count || 0}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 text-navy/50">
              <p>Belum ada berita yang diterbitkan.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}