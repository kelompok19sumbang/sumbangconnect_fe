// src/app/berita/[slug]/page.tsx
import { getBeritaBySlug } from '@/lib/api';
import Link from 'next/link';
import ImageSlider from '@/components/ImageSlider'; // <-- Import ImageSlider andalanmu!

export default async function BeritaDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const artikel = await getBeritaBySlug(resolvedParams.slug);

  if (!artikel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream font-sans">
        <h1 className="text-3xl font-bold text-dark mb-4">Berita tidak ditemukan</h1>
        <Link href="/berita" className="text-terracotta hover:underline">Kembali ke daftar berita</Link>
      </div>
    );
  }

  const thumbnailUrl = artikel.thumbnail?.url 
    ? `http://127.0.0.1:1337${artikel.thumbnail.url}`
    : 'https://via.placeholder.com/1200x600?text=SumbangConnect';

  const formatTanggal = (tanggal: string) => {
    if (!tanggal) return '';
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(tanggal));
  };

  const renderBlocks = (blocks: any) => {
    if (!blocks || !Array.isArray(blocks)) return null;
    return blocks.map((block, index) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="mb-6 text-dark/80 leading-loose text-lg">
            {block.children?.map((child: any, i: number) => {
              let className = "";
              if (child.bold) className += "font-bold ";
              if (child.italic) className += "italic ";
              if (child.underline) className += "underline ";
              return <span key={i} className={className}>{child.text}</span>;
            })}
          </p>
        );
      }
      if (block.type === 'heading') {
        const Tag = `h${block.level}` as any; 
        return (
          <Tag key={index} className="font-serif font-bold text-dark mt-8 mb-4 text-2xl">
            {block.children?.map((child: any) => child.text).join('')}
          </Tag>
        );
      }
      if (block.type === 'list') {
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={index} className={`mb-6 pl-6 text-dark/80 text-lg leading-relaxed ${block.format === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
            {block.children.map((listItem: any, idx: number) => (
              <li key={idx} className="mb-2">
                {listItem.children?.map((child: any) => child.text).join('')}
              </li>
            ))}
          </ListTag>
        );
      }
      return null;
    });
  };

  return (
    <main className="min-h-screen bg-[#FDFCF8] font-sans pb-24 pt-32">
      
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link href="/berita" className="inline-flex items-center gap-2 text-forest font-bold hover:text-terracotta transition-colors mb-8">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          Kembali ke Indeks Berita
        </Link>

        {/* HEADER ARTIKEL */}
        <div className="mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-forest text-cream mb-6 shadow-sm">
            {artikel.kategori ? artikel.kategori.replace(/_/g, ' ') : 'Berita'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-dark tracking-tight mb-6 leading-tight">
            {artikel.judul}
          </h1>
          <div className="flex items-center gap-4 text-dark/60 font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {formatTanggal(artikel.tanggal_publikasi)}
            </span>
            <span>•</span>
            <span>Redaksi Kelurahan Sumbang</span>
          </div>
        </div>
      </div>

      {/* FOTO COVER (THUMBNAIL) */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="w-full h-[40vh] md:h-[60vh] rounded-4xl overflow-hidden shadow-2xl border-4 border-white">
          <img 
            src={thumbnailUrl} 
            alt={artikel.judul} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ISI ARTIKEL & GALERI TAMBAHAN */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white p-8 md:p-12 rounded-4xl shadow-sm border border-forest/5">
          
          {/* Teks Berita */}
          <article className="prose prose-lg max-w-none">
            {renderBlocks(artikel.konten)}
          </article>

          {/* Galeri Tambahan (Muncul otomatis kalau ada isinya) */}
          {artikel.galeri_foto && artikel.galeri_foto.length > 0 && (
            <div className="mt-12 pt-10 border-t border-forest/10">
              <h3 className="text-2xl font-serif font-bold text-dark mb-6">
                Galeri Liputan
              </h3>
              <div className="w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg border border-forest/5 bg-forest/5">
                <ImageSlider images={artikel.galeri_foto} altPrefix={`Galeri ${artikel.judul}`} />
              </div>
            </div>
          )}

        </div>
      </div>

    </main>
  );
}