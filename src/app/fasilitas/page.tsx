// src/app/fasilitas/page.tsx
import { getFasilitas } from '@/lib/api';
import MapWrapper from '@/components/MapWrapper'; // <-- Import pembungkusnya
import ImageSlider from '@/components/ImageSlider';
import Link from 'next/link';

export default async function FasilitasPage() {
  const fasilitasData = await getFasilitas();

  return (
    <main className="min-h-screen bg-cream font-sans pt-32 pb-24">
      
      {/* HEADER HALAMAN */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
        <p className="text-terracotta font-bold uppercase tracking-widest text-sm mb-3">
          Peta & Infrastruktur
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-dark font-serif mb-6">
          Potensi Kelurahan Sumbang
        </h1>
        <p className="text-dark/70 max-w-2xl mx-auto text-lg leading-relaxed">
          Eksplorasi persebaran fasilitas umum, sarana kesehatan, dan pusat kegiatan masyarakat yang ada di wilayah Kelurahan Sumbang.
        </p>
      </div>

      {/* SECTION: PETA DIGITAL INTERAKTIF */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        {/* Panggil pembungkusnya di sini */}
        <MapWrapper dataFasilitas={fasilitasData} />
      </div>

      {/* SECTION: DAFTAR FASILITAS */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl font-serif font-bold text-dark">Daftar Fasilitas & Sarana</h2>
          <div className="h-px bg-forest/20 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fasilitasData.length > 0 ? (
            fasilitasData.map((item: any) => (
              <div key={item.documentId || item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-forest/10 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                
                <div className="relative w-full h-64 bg-forest/5">
                  <ImageSlider images={item.foto_fasilitas || []} altPrefix={item.nama_fasilitas} />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-forest px-3 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider border border-forest/10">
                    {item.kategori ? item.kategori.replace(/_/g, ' ') : 'Fasilitas'}
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-serif font-bold text-dark mb-3 line-clamp-2">
                    {item.nama_fasilitas}
                  </h3>
                  <p className="text-dark/60 text-sm leading-relaxed mb-6 line-clamp-3">
                    {item.deskripsi}
                  </p>
                  
                 <div className="mt-auto pt-4 border-t border-forest/5">
  <Link 
    href={`/fasilitas/${item.documentId || item.id}`}
    className="inline-flex items-center justify-center gap-2 w-full bg-forest text-cream hover:bg-terracotta transition-colors duration-300 py-3 rounded-xl text-sm font-bold shadow-sm"
  >
    Lihat Detail Fasilitas
  </Link>
</div>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-dark/50">
              <p>Belum ada data fasilitas yang ditambahkan.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}