// src/app/page.tsx
import Link from 'next/link';
import { getBeranda, getUmkm, getProfilDesa } from '@/lib/api'; 
import BlurText from '@/components/BlurText';
import CurvedLoop from '@/components/CurvedLoop';
import ScrollReveal from '@/components/ScrollReveal';
import ImageSlider from '@/components/ImageSlider';

export default async function Home() {
  // Fetch semua data secara paralel agar loading lebih cepat
  const [beranda, umkmData, profilData] = await Promise.all([
    getBeranda(),
    getUmkm(),
    getProfilDesa()
  ]);

  const totalUmkm = umkmData ? umkmData.length : 0;
  const fotoLurahUrl = beranda?.foto_lurah?.url 
    ? beranda.foto_lurah.url
    : 'https://via.placeholder.com/600x800?text=Foto+Lurah';

  const strukturImages = profilData?.foto_struktur_organisasi ? [profilData.foto_struktur_organisasi] : [];

  // Fungsi khusus merender teks panjang dengan animasi ScrollReveal dari halaman profil
  const renderScrollRevealContent = (content: any, fallbackText: string, rotation: number) => {
    if (Array.isArray(content) && content.length > 0) {
      return content.map((block, index) => {
        if (block.type === 'paragraph') {
          const text = block.children?.map((child: any) => child.text).join('');
          return (
            <div key={index} className="mb-8">
              <ScrollReveal 
                baseOpacity={0} 
                enableBlur={true} 
                baseRotation={rotation} 
                blurStrength={15} 
                wordAnimationEnd="bottom 70%" 
                textClassName="text-navy/80 text-lg md:text-xl leading-loose font-serif"
              >
                {text}
              </ScrollReveal>
            </div>
          );
        }
        return null;
      });
    } else {
      const textToRender = (typeof content === 'string' && content.trim() !== '') ? content : fallbackText;
      return (
        <ScrollReveal 
          baseOpacity={0} 
          enableBlur={true} 
          baseRotation={rotation} 
          blurStrength={15} 
          wordAnimationEnd="bottom 70%" 
          textClassName="text-navy/80 text-lg md:text-xl leading-loose font-serif"
        >
          {textToRender}
        </ScrollReveal>
      );
    }
  };

  return (
    <main className="min-h-screen bg-cream font-sans pb-24">
      
      {/* ================= HERO SECTION ================= */}
      <div className="bg-gradient-to-br from-navy via-blue-primary to-blue-cyan text-white rounded-b-[3rem] md:rounded-b-[5rem] pt-12 pb-32 px-6 lg:px-8 relative overflow-hidden shadow-2xl z-30">
        
        {/* Tekstur Halus Cubes & Glow */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none z-0"></div>
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-light/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none z-0"></div>
        
        {/* Supergrafis Aesthetic */}
        <svg className="absolute inset-0 w-full h-full text-white/15 pointer-events-none z-0" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,300 C300,100 500,600 1000,300 C1300,150 1500,400 1600,450" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M-50,330 C320,140 480,630 1020,330" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <circle cx="1150" cy="200" r="6" fill="currentColor" />
          <circle cx="1175" cy="180" r="3.5" fill="currentColor" opacity="0.7" />
          <circle cx="1195" cy="210" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="1220" cy="190" r="1.5" fill="currentColor" opacity="0.3" />
        </svg>

        <svg className="absolute bottom-[-10%] left-[-5%] w-[30rem] h-[30rem] text-white/20 pointer-events-none z-0" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,400 C100,250 250,150 400,200" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <circle cx="350" cy="150" r="5" fill="currentColor" />
        </svg>

        <svg className="absolute top-10 right-0 w-[40rem] h-[40rem] text-white/10 pointer-events-none z-0 rotate-12" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M450,-50 C250,100 150,400 500,500" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M480,-20 C290,120 190,400 520,480" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

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
              <Link href="#profil-desa" className="text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                Profil Desa <span className="animate-bounce">↓</span>
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
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
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-t-[150px] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
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

      {/* ================= SECTION: PROFIL DESA (SEJARAH, GEOGRAFI, DEMOGRAFI) ================= */}
      <section id="profil-desa" className="py-32 px-6 lg:px-8 bg-cream">
        <div className="max-w-4xl mx-auto space-y-32">
          
          {/* SEJARAH */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-4 mb-10 w-full">
              <div className="flex-1 h-px bg-navy/10 hidden sm:block"></div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy px-4">Jejak Langkah</h2>
              <div className="flex-1 h-px bg-navy/10 hidden sm:block"></div>
            </div>
            <div className="text-left">
              {renderScrollRevealContent(
                profilData?.sejarah_desa, 
                "Data Sejarah belum ditambahkan di sistem.", 
                2 
              )}
            </div>
          </div>

          {/* GEOGRAFI */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-4 mb-10 w-full">
              <div className="flex-1 h-px bg-navy/10 hidden sm:block"></div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy px-4">Kondisi Geografis</h2>
              <div className="flex-1 h-px bg-navy/10 hidden sm:block"></div>
            </div>
            <div className="text-left">
              {renderScrollRevealContent(
                profilData?.geografi, 
                "Secara topografi, Kelurahan Sumbang terletak di dataran rendah yang strategis, menjadikannya salah satu urat nadi aktivitas masyarakat perkotaan. Wilayah ini berbatasan langsung dengan area pusat perbelanjaan, fasilitas kesehatan tingkat daerah, dan dilewati oleh jalur penghubung antar kecamatan. Iklim tropis dengan curah hujan menengah membuat lahan di sekitar kelurahan ini tetap asri dan mendukung program penghijauan lorong kota yang digagas oleh warga.", 
                -2 
              )}
            </div>
          </div>

          {/* DEMOGRAFI */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-4 mb-10 w-full">
              <div className="flex-1 h-px bg-navy/10 hidden sm:block"></div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy px-4">Demografi Warga</h2>
              <div className="flex-1 h-px bg-navy/10 hidden sm:block"></div>
            </div>
            <div className="text-left">
              {renderScrollRevealContent(
                profilData?.demografi, 
                "Masyarakat Kelurahan Sumbang adalah representasi dari dinamika sosial masyarakat urban yang majemuk namun tetap menjunjung tinggi nilai gotong royong. Didominasi oleh usia produktif, warga aktif dalam berbagai sektor ekonomi, mulai dari perdagangan, jasa, hingga UMKM kreatif. Keberagaman latar belakang pendidikan dan budaya justru menjadi kekuatan utama dalam menciptakan lingkungan yang inklusif, aman, dan berdaya saing tinggi.", 
                2 
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION: PETA & WILAYAH ================= */}
      <section className="py-16 px-6 lg:px-8 bg-cream border-t border-navy/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-serif font-bold text-navy">Peta & Wilayah</h2>
            <div className="flex-1 h-px bg-navy/10"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Kartu Informasi Wilayah */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-navy/5 border border-navy/10 flex flex-col justify-center">
              <h3 className="text-lg font-bold text-blue-primary uppercase tracking-widest mb-6">Batas Wilayah</h3>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-navy/80 mb-8">
                <div>
                  <span className="block text-sm font-bold text-navy mb-1">Utara</span>
                  <span className="font-medium">{profilData?.batas_utara || '-'}</span>
                </div>
                <div>
                  <span className="block text-sm font-bold text-navy mb-1">Timur</span>
                  <span className="font-medium">{profilData?.batas_timur || '-'}</span>
                </div>
                <div>
                  <span className="block text-sm font-bold text-navy mb-1">Selatan</span>
                  <span className="font-medium">{profilData?.batas_selatan || '-'}</span>
                </div>
                <div>
                  <span className="block text-sm font-bold text-navy mb-1">Barat</span>
                  <span className="font-medium">{profilData?.batas_barat || '-'}</span>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-navy/10">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-navy text-lg">Luas Desa</span>
                  <span className="text-navy/80 font-medium text-lg">{profilData?.luas_desa || '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-navy text-lg">Jumlah Penduduk</span>
                  <span className="text-navy/80 font-medium text-lg">{profilData?.jumlah_penduduk || '-'}</span>
                </div>
              </div>
            </div>

            {/* Kartu Embed Google Maps */}
            <div className="bg-navy/5 rounded-[2.5rem] overflow-hidden border border-navy/10 h-[350px] lg:h-auto relative shadow-inner">
              {profilData?.link_peta ? (
                <iframe 
                  src={profilData.link_peta} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-navy/40">
                  <p className="font-medium tracking-wide">Link Peta belum ditambahkan</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: STRUKTUR ORGANISASI ================= */}
      <section className="py-24 px-6 lg:px-8 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-primary font-bold uppercase tracking-widest text-sm mb-3 block">Perangkat Desa</span>
            <h2 className="text-4xl font-serif font-bold text-navy">Struktur Organisasi</h2>
          </div>
          
          <div className="bg-white p-4 rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-navy/5 border border-navy/10">
            <div className="w-full h-[60vh] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-navy/5 cursor-zoom-in">
              {strukturImages.length > 0 ? (
                <ImageSlider images={strukturImages} altPrefix="Struktur Organisasi" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-navy/40 font-medium">
                  Gambar Struktur Organisasi belum diunggah.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}