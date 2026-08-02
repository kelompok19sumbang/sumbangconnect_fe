// src/app/umkm/page.tsx
import { getUmkm, getPengaturanGlobal } from '@/lib/api';
import Catalog from '@/components/Catalog';
import GradualBlur from '@/components/GradualBlur';
import BlurText from '@/components/BlurText';

export default async function UmkmPage() {
  const data = await getUmkm();
  const globalSetting = await getPengaturanGlobal(); // Ambil data global dari Strapi

  // Fungsi pembersih path agar lolos dari blokir HTTPS Vercel
  const getCleanPath = (url: string) => {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      return parsed.pathname;
    } catch {
      return url.startsWith('/') ? url : `/${url}`; 
    }
  };

  // Ambil gambar header UMKM dari Strapi (jika belum di-upload, pakai fallback Pexels)
  let headerPath = '';
  if (globalSetting?.header_umkm?.url) {
    headerPath = globalSetting.header_umkm.url;
  } else if (globalSetting?.header_umkm?.data?.attributes?.url) {
    headerPath = globalSetting.header_umkm.data.attributes.url;
  }

  const headerUmkmUrl = headerPath 
    ? getCleanPath(headerPath) 
    : 'https://images.pexels.com/photos/5408929/pexels-photo-5408929.jpeg?auto=compress&cs=tinysrgb&w=1200';

  return (
    <main className="min-h-screen bg-cream font-sans pb-40 relative">
      
      {/* ================= HEADER HALAMAN UMKM ================= */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-center overflow-hidden z-30 mb-16 rounded-b-[3rem] shadow-2xl">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 bg-navy">
          <img
            src={headerUmkmUrl} 
            alt="Katalog UMKM Kelurahan Sumbang"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/80 to-blue-primary/95 mix-blend-multiply"></div>
        </div>

        {/* Konten Teks Utama */}
        <div className="relative z-10 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-8 pt-32 pb-16 animate-fade-up text-left">
          
          <p className="text-accent text-sm md:text-base font-bold mb-3 md:mb-4 tracking-widest uppercase flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            Potensi Ekonomi Warga
          </p>
          
          <BlurText 
            text="Katalog UMKM\nSumbang"
            delay={50} 
            animateBy="words" 
            direction="top" 
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-md whitespace-pre-line"
          />
          
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mt-2 drop-shadow-sm leading-relaxed">
            Jelajahi berbagai produk unggulan, kuliner lezat, dan jasa dari warga Kelurahan Sumbang. Dukung ekonomi lokal untuk Sumbang yang lebih digdaya!
          </p>
          
        </div>
      </section>

      {/* ================= KOMPONEN KATALOG ================= */}
      <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <Catalog items={data} />
      </div>

      {/* ================= PERFECT GRADUAL BLUR ================= */}
      <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
        <GradualBlur
          target="parent"
          position="bottom"
          height="3rem"
          strength={1.5}
          divCount={6}
          curve="bezier"
          exponential
          opacity={0.55}
        />
      </div>
      
    </main>
  );
}