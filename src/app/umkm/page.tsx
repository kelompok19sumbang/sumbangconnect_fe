// src/app/umkm/page.tsx
import { getUmkm } from '@/lib/api';
import Catalog from '@/components/Catalog';
import TextType from '@/components/TextType';
import GradualBlur from '@/components/GradualBlur';
import BlurText from '@/components/BlurText';

export default async function UmkmPage() {
  const data = await getUmkm();

  return (
    // Background tetap menggunakan cream (yang sudah kita set ke warna putih bersih di globals.css)
    <main className="min-h-screen bg-cream font-sans pt-32 pb-40 relative">
      
      {/* ================= HEADER HALAMAN ================= */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-12 relative z-10 animate-fade-up">
        {/* Ubah text-terracotta menjadi text-blue-primary agar terbaca jelas dan senada */}
        <p className="text-blue-primary font-bold uppercase tracking-widest text-sm mb-3">
          Direktori Lokal Kelurahan
        </p>
        
        {/* Judul UMKM dengan Efek BlurText */}
        <div className="mb-6 flex justify-center">
          <BlurText 
            text="Katalog UMKM Sumbang" 
            delay={50} 
            animateBy="words" 
            direction="bottom" 
            // Ubah text-dark menjadi text-navy
            className="text-4xl md:text-5xl font-bold text-navy font-serif" 
          />
        </div>
        
        {/* Efek Mesin Tik */}
        {/* Ubah text-dark/70 menjadi text-navy/70 */}
        <div className="text-navy/70 max-w-2xl mx-auto min-h-[4rem]">
          <TextType 
            text="Dukung pertumbuhan ekonomi lokal dengan menjelajahi dan berbelanja di berbagai usaha mikro, kecil, dan menengah milik warga Kelurahan Sumbang."
            typingSpeed={30}
            loop={false}
            showCursor={true}
            cursorCharacter="_"
            initialDelay={500}
          />
        </div>
      </div>

      {/* ================= KOMPONEN KATALOG ================= */}
      <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <Catalog items={data} />
      </div>

      {/* ================= PERFECT GRADUAL BLUR ================= */}
      {/* Diletakkan DI LUAR efek animasi agar posisinya benar-benar fixed di layar */}
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