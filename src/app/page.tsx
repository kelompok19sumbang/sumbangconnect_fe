// src/app/page.tsx
import Link from 'next/link';
import { getBeranda } from '@/lib/api';

export default async function Home() {
  // Ambil data dari Strapi
  const beranda = await getBeranda();

  // Siapkan URL Foto Lurah (dengan fallback gambar kosong jika belum di-upload)
  const fotoLurahUrl = beranda?.foto_lurah?.url 
    ? `http://127.0.0.1:1337${beranda.foto_lurah.url}`
    : 'https://via.placeholder.com/600x800?text=Foto+Lurah';

  return (
    <main className="min-h-screen bg-cream font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <div className="bg-forest text-cream rounded-b-[3rem] md:rounded-b-[5rem] pt-12 pb-32 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-terracotta/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10 mt-4">
          <div className="text-center lg:text-left animate-fade-up">
            
            {/* Mengambil Judul Hero dari Strapi */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.15] whitespace-pre-line">
              {beranda?.judul_hero || 'Membangun Desa dengan pendekatan baru'}
            </h1>
            
            {/* Mengambil Subjudul Hero dari Strapi */}
            <p className="text-lg md:text-xl text-cream/80 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light whitespace-pre-line">
              {beranda?.subjudul_hero || 'Pusat informasi layanan masyarakat, fasilitas kesehatan, dan direktori UMKM lokal yang dirancang untuk masa depan.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/umkm" className="bg-terracotta text-forest px-8 py-4 rounded-full font-bold hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto text-center">
                Jelajahi UMKM
              </Link>
              <Link href="/profil" className="text-cream px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                Profil Desa <span>→</span>
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-95 h-130 rounded-t-[10rem] rounded-b-[4rem] overflow-hidden border-8 border-forest/80 shadow-2xl shadow-black/40">
              <img 
                src="https://images.pexels.com/photos/209266/pexels-photo-209266.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Kelurahan Sumbang" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            
            <div className="absolute -left-16 bottom-16 bg-white/95 backdrop-blur-md text-dark p-6 rounded-3xl shadow-2xl flex items-center gap-5 animate-float border border-white/50">
              <div className="w-14 h-14 bg-terracotta rounded-full flex items-center justify-center text-white font-bold text-xl shadow-inner">+99</div>
              <div>
                <p className="font-extrabold text-xl tracking-tight">UMKM Aktif</p>
                <p className="text-sm text-dark/60 font-medium">Terdaftar di sistem</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION: SAMBUTAN LURAH ================= */}
      <section className="py-24 px-6 lg:px-8 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative h-[500px] w-full rounded-t-[150px] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white">
              
              {/* Mengambil Foto Lurah dari Strapi */}
              <img 
                src={fotoLurahUrl} 
                alt={beranda?.nama_lurah || 'Foto Lurah'} 
                className="w-full h-full object-cover"
              />
              
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-terracotta rounded-full -z-10 blur-2xl opacity-60"></div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-block bg-terracotta/10 text-terracotta px-4 py-1.5 rounded-full text-sm font-bold w-max mb-4">
              Sambutan Kepala Kelurahan
            </div>
            <h2 className="text-4xl font-serif font-bold text-dark mb-6">
              Selamat Datang di Portal Digital <span className="text-forest">SumbangConnect</span>
            </h2>
            
            {/* Mengambil Sambutan dari Strapi */}
            <p className="text-dark/70 text-lg leading-relaxed mb-6 whitespace-pre-line italic">
              "{beranda?.sambutan_lurah || 'Isi sambutan belum tersedia.'}"
            </p>
            
            <div>
              {/* Mengambil Nama Lurah dari Strapi */}
              <p className="font-bold text-xl text-dark">
                {beranda?.nama_lurah || 'Nama Belum Diatur'}
              </p>
              <p className="text-terracotta text-sm font-semibold">Kepala Kelurahan Sumbang</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: VISI & MISI ================= */}
      <section className="py-24 px-6 lg:px-8 bg-forest/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-dark">Visi & Misi</h2>
            <p className="text-dark/60 mt-4 max-w-2xl mx-auto">Landasan utama pergerakan Kelurahan Sumbang dalam mewujudkan lingkungan yang asri, aman, dan berdaya saing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-forest/10 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-forest text-cream flex items-center justify-center rounded-2xl mb-6 shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Visi</h3>
              
              {/* Mengambil Visi dari Strapi */}
              <p className="text-dark/70 leading-relaxed text-lg italic whitespace-pre-line">
                "{beranda?.visi || 'Teks visi belum tersedia.'}"
              </p>
              
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-forest/10 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-terracotta text-white flex items-center justify-center rounded-2xl mb-6 shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Misi</h3>
              
              {/* Mengambil Misi dari Strapi */}
              {/* Menggunakan whitespace-pre-line agar enter/baris baru di Strapi otomatis turun ke bawah */}
              <p className="text-dark/70 leading-relaxed whitespace-pre-line">
                {beranda?.misi || 'Teks misi belum tersedia.'}
              </p>
              
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}