// src/app/berita/page.tsx
import { getBerita } from '@/lib/api';
import Link from 'next/link';
import BlurText from '@/components/BlurText';

export default async function BeritaPage() {
  const beritaData = await getBerita();

  // Fungsi untuk memformat tanggal menjadi gaya Indonesia (misal: 9 Juli 2026)
  const formatTanggal = (tanggal: string) => {
    if (!tanggal) return '';
    const date = new Date(tanggal);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <main className="min-h-screen bg-cream font-sans pt-32 pb-24">
      
      {/* HEADER HALAMAN */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
        <p className="text-terracotta font-bold uppercase tracking-widest text-sm mb-3">
          Kabar Terbaru
        </p>
        <div className="mb-6 flex justify-center">
          <BlurText 
            text="Berita Kelurahan Sumbang" 
            delay={100} 
            animateBy="words" 
            direction="bottom" 
            className="text-4xl md:text-5xl font-bold text-dark font-serif" 
          />
        </div>
        <p className="text-dark/70 max-w-2xl mx-auto text-lg leading-relaxed">
          Ikuti perkembangan terkini, pengumuman resmi, dan berbagai kegiatan kemasyarakatan di lingkungan Kelurahan Sumbang.
        </p>
      </div>

      {/* GRID KARTU BERITA */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beritaData.length > 0 ? (
            beritaData.map((item: any) => {
              // Siapkan URL gambar
              const thumbnailUrl = item.thumbnail?.url 
                ? `http://http://103.82.92.95${item.thumbnail.url}`
                : 'https://via.placeholder.com/600x400?text=SumbangConnect';

              return (
                <Link 
                  href={`/berita/${item.slug}`} 
                  key={item.documentId || item.id}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-forest/10 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                >
                  
                  {/* Foto Thumbnail */}
                  <div className="relative w-full h-56 bg-forest/5 overflow-hidden">
                    <img 
                      src={thumbnailUrl} 
                      alt={item.judul} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge Kategori */}
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-forest px-3 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
                      {item.kategori ? item.kategori.replace(/_/g, ' ') : 'Berita'}
                    </div>
                  </div>

                  {/* Konten Teks */}
                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="text-terracotta text-sm font-bold mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {formatTanggal(item.tanggal_publikasi)}
                      </p>
                      <h3 className="text-2xl font-serif font-bold text-dark mb-4 line-clamp-3 leading-snug group-hover:text-forest transition-colors">
                        {item.judul}
                      </h3>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-forest/5 flex items-center text-forest font-bold text-sm gap-2 group-hover:gap-3 transition-all">
                      Baca Selengkapnya <span>→</span>
                    </div>
                  </div>

                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 text-dark/50">
              <p>Belum ada berita yang diterbitkan.</p>
            </div>
          )}
        </div>
      </div>

    </main>
  );
}