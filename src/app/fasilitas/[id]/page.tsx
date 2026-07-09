// src/app/fasilitas/[id]/page.tsx
import { getFasilitasById } from '@/lib/api';
import Link from 'next/link';
import ImageSlider from '@/components/ImageSlider';

export default async function FasilitasDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = await getFasilitasById(resolvedParams.id);

  if (!item) return <div className="min-h-screen flex items-center justify-center">Data tidak ditemukan</div>;

  return (
    <main className="min-h-screen bg-[#FDFCF8] font-sans pb-24 pt-32">
      
      {/* Tombol Kembali */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Link href="/fasilitas" className="inline-flex items-center gap-2 text-forest font-bold hover:text-terracotta transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          Kembali ke Peta
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Kolom Kiri: Slider Foto & Deskripsi */}
          <div className="lg:col-span-8 space-y-8">
            {/* Foto Galeri (Menggunakan ImageSlider) */}
            <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-forest/5 shadow-lg border border-forest/10">
              <ImageSlider images={item.foto_fasilitas || []} altPrefix={item.nama_fasilitas} />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-forest text-cream mb-4">
                {item.kategori ? item.kategori.replace(/_/g, ' ') : 'Fasilitas Umum'}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark tracking-tight mb-6">
                {item.nama_fasilitas}
              </h1>
              <p className="text-lg text-dark/75 leading-relaxed bg-white p-6 rounded-2xl shadow-sm border border-forest/5">
                {item.deskripsi}
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Info & Kontak */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-forest/10 sticky top-28 space-y-6">
              <h3 className="text-xl font-bold text-forest mb-4 border-b border-forest/10 pb-4">Informasi Layanan</h3>
              
              {item.kontak && (
                <div>
                  <p className="text-sm text-dark/50 mb-1">Nomor Kontak</p>
                  <p className="font-bold text-lg text-dark flex items-center gap-2">
                    <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {item.kontak}
                  </p>
                </div>
              )}

              {item.link_gmaps && (
                <div className="pt-4">
                  <a 
                    href={item.link_gmaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center gap-3 bg-forest text-cream py-4 px-6 rounded-2xl font-bold hover:bg-terracotta transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Buka Rute di Google Maps
                  </a>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}