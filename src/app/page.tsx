// src/app/page.tsx
import Link from 'next/link';
import { getBeranda, getUmkm, getProfilDesa, getInfografis } from '@/lib/api'; 
import BlurText from '@/components/BlurText';
import CurvedLoop from '@/components/CurvedLoop';
import ScrollReveal from '@/components/ScrollReveal';

// 🔥 IMPORT KOMPONEN BARU KITA
import ExpandableHistory from '@/components/ExpandableHistory';
import OrgChart from '@/components/OrgChart';

// Fungsi Fetcher Khusus untuk Perangkat Desa
async function getPerangkatDesa() {
  try {
    // Kalau di local otomatis pakai localhost:1337, kalau di Vercel otomatis pakai VPS 103.82.92.95
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://103.82.92.95:1337';
    
    // Perhatikan kita pakai perangkat-desas (huruf s) dan populate=*
    const res = await fetch(`${baseUrl}/api/perangkat-desas?populate=*&pagination[limit]=100`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Gagal mengambil data perangkat desa:", error);
    return [];
  }
}

export default async function Home() {
  const beranda = await getBeranda();
  const umkmData = await getUmkm();
  const profilData = await getProfilDesa();
  const infografisData = await getInfografis(); 
  
  // Ambil Data Perangkat Desa
  const rawPerangkatDesa = await getPerangkatDesa();
  // 🔥 PASANG CCTV PERANGKAT DESA
  console.log("=== DATA PERANGKAT DESA ===", JSON.stringify(rawPerangkatDesa, null, 2));

  const totalUmkm = umkmData ? umkmData.length : 0;
  
  const fotoLurahUrl = beranda?.foto_lurah?.url 
    ? beranda.foto_lurah.url
    : 'https://via.placeholder.com/600x800?text=Foto+Lurah';

  const fotoHeroUrl = beranda?.foto_hero?.url 
    ? beranda.foto_hero.url
    : beranda?.foto_hero?.data?.attributes?.url
      ? beranda.foto_hero.data.attributes.url
      : 'https://images.pexels.com/photos/209266/pexels-photo-209266.jpeg?auto=compress&cs=tinysrgb&w=1200';

  // 🔥 Fungsi Pembersih URL (Biar Vercel yang ngambilin gambarnya lewat proxy next.config.ts)
  const getCleanPath = (url: string) => {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      return parsed.pathname; 
    } catch {
      return url.startsWith('/') ? url : `/${url}`; 
    }
  };

  // 🔥 Format Data Perangkat Desa agar sesuai dengan Props di OrgChart.tsx
  const dataPerangkatDesa = rawPerangkatDesa.map((item: any) => {
    // 1. Ambil path foto
    let fotoUrl = '';
    if (item.foto?.url) {
      fotoUrl = item.foto.url;
    } else if (item.foto?.data?.attributes?.url) {
      fotoUrl = item.foto.data.attributes.url;
    }

    // 2. Parser Biografi (Karena formatnya Rich text / Blocks array)
    let parsedBiografi = '';
    if (Array.isArray(item.biografi)) {
      parsedBiografi = item.biografi.map((block: any) => {
        return block.children?.map((child: any) => child.text).join('') || '';
      }).join('\n\n');
    } else if (typeof item.biografi === 'string') {
      parsedBiografi = item.biografi;
    }

    return {
      id: item.documentId || item.id,
      nama: item.nama || 'Tanpa Nama',
      jabatan: item.jabatan || 'Staf',
      biografi: parsedBiografi,
      foto_url: fotoUrl ? getCleanPath(fotoUrl) : 'https://via.placeholder.com/400x400?text=Foto',
      level: item.level || 3
    };
  });

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
      <section className="relative w-full min-h-[90vh] flex flex-col justify-between overflow-hidden z-30">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 bg-navy">
          <img
            src={getCleanPath(fotoHeroUrl) || fotoHeroUrl}
            alt="Pemandangan Kelurahan Sumbang"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/70 to-blue-primary/90 mix-blend-multiply"></div>
        </div>

        {/* Konten Teks Utama */}
        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-8 pt-32 pb-12 animate-fade-up">
          
          <p className="text-white/90 text-sm md:text-base font-medium mb-3 md:mb-5 tracking-wide">
            Pemerintah Kelurahan - Kecamatan Bojonegoro, Kab. Bojonegoro
          </p>
          
          <BlurText 
            text={beranda?.judul_hero || 'Kelurahan \nSumbang'}
            delay={50} 
            animateBy="words" 
            direction="top" 
            className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-md whitespace-pre-line"
          />
          
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mt-2 mb-8 drop-shadow-sm leading-relaxed">
            {beranda?.subjudul_hero || 'Informasi resmi kelurahan — berita, potensi ekonomi, dan pelayanan publik untuk warga.'}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/fasilitas" 
              className="bg-accent text-navy font-bold py-3 px-8 rounded-lg w-fit flex items-center gap-3 hover:bg-yellow-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-accent/20"
            >
              Potensi Kelurahan
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ================= BARIS STATISTIK ================= */}
        <div className="relative z-10 bg-navy/80 backdrop-blur-md border-b-4 border-accent w-full py-6 md:py-8 mt-auto shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-white text-left items-center">
              
              <div className="border-l-2 border-white/20 pl-4">
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                  {infografisData?.populasi_total?.toLocaleString('id-ID') || '5.036'}
                </h3>
                <p className="text-xs md:text-sm text-white/80 mt-1 font-medium">jiwa terdaftar</p>
              </div>
              
              <div className="border-l-2 border-white/20 pl-4">
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                  {infografisData?.luas_total || '192'}
                </h3>
                <p className="text-xs md:text-sm text-white/80 mt-1 font-medium">Ha luas wilayah</p>
              </div>
              
              <div className="border-l-2 border-white/20 pl-4">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight flex items-baseline gap-1.5 flex-wrap">
                  <span>{infografisData?.rt || '29'}</span>
                  <span className="text-sm md:text-base font-normal text-white/70">RT</span>
                  <span className="text-white/30 px-1">/</span>
                  <span>{infografisData?.rw || '7'}</span>
                  <span className="text-sm md:text-base font-normal text-white/70">RW</span>
                </h3>
                <p className="text-xs md:text-sm text-white/80 mt-1 font-medium">lingkungan warga</p>
              </div>
              
              <div className="border-l-2 border-accent pl-4">
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-accent">
                  {totalUmkm}
                </h3>
                <p className="text-xs md:text-sm text-accent/80 mt-1 font-medium">UMKM terdaftar</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= CURVED LOOP DIVIDER ================= */}
      <div className="w-full bg-cream text-blue-primary overflow-hidden relative py-6 z-20 shadow-sm border-b border-navy/5">
        <CurvedLoop marqueeText="Sumbang digdaya! Mengabdi dengan aksi, Berkarya dengan hati :D" speed={0.5} curveAmount={150} direction="left" />
      </div>

      {/* ================= SECTION: SAMBUTAN LURAH ================= */}
      <section className="py-24 px-6 lg:px-8 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-t-[150px] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
              <img 
                src={getCleanPath(fotoLurahUrl) || fotoLurahUrl} 
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

      {/* ================= SECTION: PROFIL DESA ================= */}
      <section id="profil-desa" className="py-32 px-6 lg:px-8 bg-cream">
        <div className="max-w-4xl mx-auto space-y-32">
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-4 mb-10 w-full">
              <div className="flex-1 h-px bg-navy/10 hidden sm:block"></div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy px-4">Jejak Langkah</h2>
              <div className="flex-1 h-px bg-navy/10 hidden sm:block"></div>
            </div>
            <div className="text-left">
              {/* 🔥 KONTEN SEJARAH DIBUNGKUS EXPANDABLE HISTORY */}
              <ExpandableHistory>
                {renderScrollRevealContent(
                  profilData?.sejarah_desa, 
                  "Data Sejarah belum ditambahkan di sistem.", 
                  2 
                )}
              </ExpandableHistory>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-4 mb-10 w-full">
              <div className="flex-1 h-px bg-navy/10 hidden sm:block"></div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy px-4">Kondisi Geografis</h2>
              <div className="flex-1 h-px bg-navy/10 hidden sm:block"></div>
            </div>
            <div className="text-left">
              {renderScrollRevealContent(
                profilData?.geografi, 
                "Secara topografi, Kelurahan Sumbang terletak di dataran rendah yang strategis.", 
                -2 
              )}
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-4 mb-10 w-full">
              <div className="flex-1 h-px bg-navy/10 hidden sm:block"></div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy px-4">Demografi Warga</h2>
              <div className="flex-1 h-px bg-navy/10 hidden sm:block"></div>
            </div>
            <div className="text-left">
              {renderScrollRevealContent(
                profilData?.demografi, 
                "Masyarakat Kelurahan Sumbang menjunjung tinggi nilai gotong royong.", 
                2 
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION: STRUKTUR ORGANISASI ================= */}
      <section className="py-24 px-6 lg:px-8 bg-cream border-t border-navy/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-primary font-bold uppercase tracking-widest text-sm mb-3 block">Perangkat Desa</span>
            <h2 className="text-4xl font-serif font-bold text-navy">Struktur Organisasi</h2>
            <p className="text-navy/60 mt-4 max-w-2xl mx-auto">Klik pada foto perangkat kelurahan untuk melihat profil dan biografi singkat.</p>
          </div>
          
          <div className="w-full bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-navy/5 border border-navy/10 p-6">
            {/* 🔥 PANGGIL KOMPONEN ORG CHART DENGAN DATA DARI STRAPI */}
            {dataPerangkatDesa.length > 0 ? (
              <OrgChart data={dataPerangkatDesa} />
            ) : (
              <div className="w-full h-[40vh] flex items-center justify-center text-navy/40 font-medium">
                Data Perangkat Kelurahan belum ditambahkan.
              </div>
            )}
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

    </main>
  );
}