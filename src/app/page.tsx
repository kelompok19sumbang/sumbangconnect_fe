// src/app/page.tsx
import Link from 'next/link';
import { getBeranda, getUmkm } from '@/lib/api'; 
import BlurText from '@/components/BlurText';
import CurvedLoop from '@/components/CurvedLoop';

export default async function Home() {
  const beranda = await getBeranda();
  const umkmData = await getUmkm(); 

  const totalUmkm = umkmData ? umkmData.length : 0;

  const fotoLurahUrl = beranda?.foto_lurah?.url 
    ? `http://127.0.0.1:1337${beranda.foto_lurah.url}`
    : 'https://via.placeholder.com/600x800?text=Foto+Lurah';

  return (
    <main className="min-h-screen bg-cream font-sans">
      
      {/* ================= HERO SECTION (AESTHETIC SUPERGRAFIS) ================= */}
      <div className="bg-gradient-to-br from-navy via-blue-primary to-blue-cyan text-white rounded-b-[3rem] md:rounded-b-[5rem] pt-12 pb-32 px-6 lg:px-8 relative overflow-hidden shadow-2xl z-30">
        
        {/* Tekstur Halus Cubes & Glow */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none z-0"></div>
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-light/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none z-0"></div>
        
        {/* ================= MOTIF SUPERGRAFIS AESTHETIC (PURE WHITE) ================= */}
        {/* Garis Flowing Lebar (Mengalir dari Kiri ke Kanan) */}
        <svg className="absolute inset-0 w-full h-full text-white/15 pointer-events-none z-0" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,300 C300,100 500,600 1000,300 C1300,150 1500,400 1600,450" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M-50,330 C320,140 480,630 1020,330" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          
          {/* Ornamen Titik Estetik (Kanan Tengah) */}
          <circle cx="1150" cy="200" r="6" fill="currentColor" />
          <circle cx="1175" cy="180" r="3.5" fill="currentColor" opacity="0.7" />
          <circle cx="1195" cy="210" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="1220" cy="190" r="1.5" fill="currentColor" opacity="0.3" />
        </svg>

        {/* Motif Abstrak Kiri Bawah (Di belakang tombol) */}
        <svg className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] text-white/20 pointer-events-none z-0" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,400 C100,250 250,150 400,200" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <circle cx="350" cy="150" r="5" fill="currentColor" />
        </svg>

        {/* Motif Melingkar Kanan Atas (Di Belakang Gambar) */}
        <svg className="absolute top-10 right-0 w-[40rem] h-[40rem] text-white/10 pointer-events-none z-0 rotate-12" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M450,-50 C250,100 150,400 500,500" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M480,-20 C290,120 190,400 520,480" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {/* ============================================================================== */}

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10 mt-4">
          <div className="text-center lg:text-left animate-fade-up">
            <BlurText 
              text={beranda?.judul_hero || 'Selamat Datang di Portal Digital SumbangConnect'}
              delay={50} 
              animateBy="words" 
              direction="top" 
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.15] whitespace-pre-line text-white"
            />
            
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light whitespace-pre-line relative z-10">
              {beranda?.subjudul_hero || 'Pusat informasi layanan masyarakat, fasilitas kesehatan, dan direktori UMKM lokal yang dirancang untuk masa depan.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start relative z-10">
              <Link href="/umkm" className="bg-accent text-navy px-8 py-4 rounded-full font-bold hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto text-center">
                Jelajahi UMKM
              </Link>
              <Link href="/profil" className="text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                Profil Desa <span>→</span>
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {/* Bingkai Hero disesuaikan jadi aspect ratio responsif */}
            <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-t-[10rem] rounded-b-[4rem] overflow-hidden border-8 border-white/10 shadow-2xl shadow-navy/50">
              <img 
                src="https://images.pexels.com/photos/209266/pexels-photo-209266.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Kelurahan Sumbang" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            
            <div className="absolute -left-12 bottom-20 bg-white/95 backdrop-blur-md text-navy p-6 rounded-3xl shadow-2xl flex items-center gap-5 animate-float border border-white/50">
              <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center text-navy font-bold text-xl shadow-inner">
                {totalUmkm}
              </div>
              <div>
                <p className="font-extrabold text-xl tracking-tight">UMKM Aktif</p>
                <p className="text-sm text-navy/60 font-medium">Terdaftar di sistem</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CURVED LOOP DIVIDER ================= */}
      <div className="w-full bg-cream text-blue-primary overflow-hidden relative -mt-20 pt-20 pb-4 z-20">
        <CurvedLoop marqueeText="Sumbang digdaya! Mengabdi dengan aksi, Bekarya dengan hati :D" speed={0.5} curveAmount={150} direction="left" />
      </div>

      {/* ================= SECTION: SAMBUTAN LURAH ================= */}
      <section className="py-24 px-6 lg:px-8 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Bingkai foto Lurah diubah menggunakan aspect-[4/5] dan max-width agar tidak melebar */}
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-t-[150px] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
              {/* Tambahkan object-top di sini agar foto berfokus ke bagian kepala/wajah */}
              <img 
                src={fotoLurahUrl} 
                alt={beranda?.nama_lurah || 'Foto Lurah'} 
                className="w-full h-full object-cover object-top" 
              />
            </div>
            <div className="absolute -bottom-6 right-0 lg:-right-6 w-32 h-32 bg-blue-primary rounded-full -z-10 blur-2xl opacity-40"></div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <div className="inline-block bg-blue-primary/10 text-blue-primary px-4 py-1.5 rounded-full text-sm font-bold w-max mx-auto lg:mx-0 mb-4">
              Sambutan Kepala Kelurahan
            </div>
            <h2 className="text-4xl font-serif font-bold text-navy mb-6">
              Selamat Datang di Portal Digital <span className="text-blue-primary">SumbangConnect</span>
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed mb-6 whitespace-pre-line italic">
              "{beranda?.sambutan_lurah || 'Isi sambutan belum tersedia.'}"
            </p>
            <div>
              <p className="font-bold text-xl text-navy">{beranda?.nama_lurah || 'Nama Belum Diatur'}</p>
              <p className="text-accent font-semibold bg-navy inline-block px-3 py-1 rounded-md mt-2 text-sm">Kepala Kelurahan Sumbang</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: VISI & MISI ================= */}
      <section className="py-24 px-6 lg:px-8 bg-navy/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-navy">Visi & Misi</h2>
            <p className="text-navy/60 mt-4 max-w-2xl mx-auto">Landasan utama pergerakan Kelurahan Sumbang dalam mewujudkan lingkungan yang asri, aman, dan berdaya saing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-navy/10 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-navy text-white flex items-center justify-center rounded-2xl mb-6 shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Visi</h3>
              <p className="text-navy/70 leading-relaxed text-lg italic whitespace-pre-line">"{beranda?.visi || 'Teks visi belum tersedia.'}"</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-navy/10 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-primary text-white flex items-center justify-center rounded-2xl mb-6 shadow-md">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Misi</h3>
              <p className="text-navy/70 leading-relaxed whitespace-pre-line">{beranda?.misi || 'Teks misi belum tersedia.'}</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}