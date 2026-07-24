// src/app/fasilitas/[id]/page.tsx
import { getFasilitasById } from '@/lib/api';
import Link from 'next/link';
import ImageSlider from '@/components/ImageSlider';

export default async function FasilitasDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = await getFasilitasById(resolvedParams.id);

  if (!item) return <div className="min-h-screen flex items-center justify-center text-navy font-bold">Data tidak ditemukan</div>;

  return (
    <main className="min-h-screen bg-cream font-sans pb-24 pt-32 relative">
      
      {/* Ornamen Latar Belakang Halus */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none z-0"></div>
      
      {/* Tombol Kembali */}
      <div className="max-w-7xl mx-auto px-6 mb-8 relative z-10">
        <Link href="/fasilitas" className="inline-flex items-center gap-2 text-navy/60 font-bold hover:text-blue-primary transition-colors bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm border border-navy/5 w-fit">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          Kembali ke Peta
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Kolom Kiri: Slider Foto & Deskripsi */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Foto Galeri (Diubah menggunakan aspect-video agar proporsional dan FULL tanpa ruang kosong) */}
            <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-xl border border-navy/10 relative group bg-navy/5">
              <ImageSlider images={item.foto_fasilitas || []} altPrefix={item.nama_fasilitas} />
            </div>

            <div className="animate-fade-up">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-accent text-navy mb-4 shadow-sm border border-accent/20">
                {item.kategori ? item.kategori.replace(/_/g, ' ') : 'Fasilitas Umum'}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy tracking-tight mb-6">
                {item.nama_fasilitas}
              </h1>
              <div className="text-lg text-navy/80 leading-relaxed bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-navy/5">
                {item.deskripsi}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Info & Kontak */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-navy/5 border border-navy/10 sticky top-28 space-y-6">
              <h3 className="text-xl font-bold text-navy mb-4 border-b border-navy/10 pb-4">Informasi Layanan</h3>
              
              {item.kontak && (
                <div>
                  <p className="text-sm text-navy/50 mb-1 uppercase tracking-wider font-bold">Nomor Kontak</p>
                  <p className="font-bold text-lg text-navy flex items-center gap-2">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {item.kontak}
                  </p>
                </div>
              )}

              {item.link_gmaps ? (
                <div className="pt-4">
                  <a 
                    href={item.link_gmaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center gap-3 bg-navy text-white py-4 px-6 rounded-2xl font-bold hover:bg-accent hover:text-navy transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Buka Rute di Google Maps
                  </a>
                </div>
              ) : (
                <div className="pt-4">
                   <div className="w-full flex justify-center items-center gap-3 bg-navy/5 text-navy/40 py-4 px-6 rounded-2xl font-bold border border-navy/10 cursor-not-allowed">
                     Link Maps Belum Tersedia
                   </div>
                </div>
              )}
            </div>
          </div>
          
        </div>  
      </div>
    </main>
  );
}