// src/app/galeri/arsip/page.tsx
import { getGaleri } from '@/lib/api';
import Link from 'next/link';

export default async function ArsipGaleriPage() {
  // Tarik SEMUA data galeri dari Strapi (tanpa di-slice)
  const galeriData = await getGaleri();

  return (
    <main className="min-h-screen bg-cream font-sans pt-32 pb-24">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Arsip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-forest/10 pb-8">
          <div>
            <Link href="/galeri" className="text-terracotta hover:text-forest text-sm font-bold flex items-center gap-2 mb-4 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
              Kembali ke Kubah 3D
            </Link>
            <h1 className="text-4xl font-serif font-bold text-dark">Arsip Foto Desa</h1>
            <p className="text-dark/60 mt-2">Menampilkan seluruh dokumentasi ({galeriData?.length || 0} foto) Kelurahan Sumbang.</p>
          </div>
        </div>

        {/* Grid Layout (Gaya Masonry/Kotak) */}
        {galeriData && galeriData.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galeriData.map((item: any, index: number) => {
              
              // ✅ IP VPS DIHAPUS
              const imgUrl = item.foto?.url 
                ? item.foto.url 
                : 'https://via.placeholder.com/600';
                
              return (
                <div key={item.id || index} className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm bg-white/50 border border-forest/5">
                  <img 
                    src={imgUrl} 
                    alt={item.judul_foto || `Foto ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                  />
                  {/* Efek Hover Judul */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-medium text-sm line-clamp-2">
                      {item.judul_foto || 'Dokumentasi Kegiatan'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Jika kosong
          <div className="text-center py-20 bg-white rounded-3xl border border-forest/10 shadow-sm">
            <div className="w-16 h-16 bg-forest/5 text-forest mx-auto rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-dark">Belum Ada Foto</h3>
            <p className="text-dark/50 mt-2">Arsip dokumentasi desa masih kosong.</p>
          </div>
        )}
        
      </div>
    </main>
  );
}