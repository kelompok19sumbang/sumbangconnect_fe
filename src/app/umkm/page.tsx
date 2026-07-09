// src/app/umkm/page.tsx
import { getUmkm } from '@/lib/api';
import Catalog from '@/components/Catalog';

export default async function UmkmPage() {
  const data = await getUmkm();

  return (
    <main className="min-h-screen bg-cream font-sans pt-32 pb-20">
      
      {/* Header Halaman UMKM */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-12 relative z-10">
        <p className="text-terracotta font-bold uppercase tracking-widest text-sm mb-3">
          Direktori Lokal Kelurahan
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-dark font-serif mb-6">
          Katalog UMKM Sumbang
        </h1>
        <p className="text-dark/70 max-w-2xl mx-auto">
          Dukung pertumbuhan ekonomi lokal dengan menjelajahi dan berbelanja di berbagai usaha mikro, kecil, dan menengah milik warga Kelurahan Sumbang.
        </p>
      </div>

      {/* Komponen Katalog */}
      <Catalog items={data} />
      
    </main>
  );
}