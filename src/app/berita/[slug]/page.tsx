// src/app/berita/[slug]/page.tsx
import { getBeritaBySlug } from '@/lib/api';
import Link from 'next/link';
import ImageSlider from '@/components/ImageSlider'; 
import ViewTracker from '@/components/ViewTracker'; 
import { redirect } from 'next/navigation'; 

export default async function BeritaDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const artikel = await getBeritaBySlug(resolvedParams.slug);

  if (!artikel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream font-sans">
        <h1 className="text-3xl font-bold text-navy mb-4">Berita tidak ditemukan</h1>
        <Link href="/berita" className="text-blue-primary hover:underline">Kembali ke daftar berita</Link>
      </div>
    );
  }

  // PROTEKSI: Jika ini adalah berita External, langsung redirect ke link aslinya!
  if (artikel.link_external) {
     redirect(artikel.link_external);
  }

  const thumbnailUrl = artikel.thumbnail?.url 
    ? `http://127.0.0.1:1337${artikel.thumbnail.url}` 
    : 'https://via.placeholder.com/1200x600?text=SumbangConnect';
    
  const thumbnailCaption = artikel.thumbnail?.caption || artikel.thumbnail?.alternativeText || `Dokumentasi Liputan: ${artikel.judul}`;

  const formatTanggal = (tanggal: string) => {
    if (!tanggal) return '';
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(tanggal));
  };

  const renderBlocks = (blocks: any) => {
    if (!blocks || !Array.isArray(blocks)) return null;
    return blocks.map((block, index) => {
      
      // 1. Render Teks/Paragraf
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="mb-6 text-navy/80 leading-loose text-lg">
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
      
      // 2. Render Heading
      if (block.type === 'heading') {
        const Tag = `h${block.level}` as any; 
        return (
          <Tag key={index} className="font-serif font-bold text-navy mt-10 mb-4 text-2xl">
            {block.children?.map((child: any) => child.text).join('')}
          </Tag>
        );
      }
      
      // 3. Render List (Bullet / Number)
      if (block.type === 'list') {
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={index} className={`mb-6 pl-6 text-navy/80 text-lg leading-relaxed ${block.format === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
            {block.children.map((listItem: any, idx: number) => (
              <li key={idx} className="mb-2">
                {listItem.children?.map((child: any) => child.text).join('')}
              </li>
            ))}
          </ListTag>
        );
      }

      // ✅ 4. Render GAMBAR SISIPAN DI TENGAH TEKS
      if (block.type === 'image') {
        const imgUrl = block.image?.url 
          ? `http://127.0.0.1:1337${block.image.url}` 
          : '';
        const imgAlt = block.image?.alternativeText || `Ilustrasi ${artikel.judul}`;
        const imgCaption = block.image?.caption;

        if (!imgUrl) return null;

        return (
          <figure key={index} className="my-10 relative group w-full">
            <div className="w-full rounded-2xl overflow-hidden shadow-lg border-2 border-navy/5 bg-navy/5">
              <img 
                src={imgUrl} 
                alt={imgAlt} 
                className="w-full h-auto max-h-[60vh] object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            {imgCaption && (
              <figcaption className="mt-4 text-sm text-navy/60 italic flex justify-center gap-2 font-medium px-4 text-center">
                <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {imgCaption}
              </figcaption>
            )}
          </figure>
        );
      }

      return null;
    });
  };

  return (
    <main className="min-h-screen bg-cream font-sans pb-24 pt-32 relative">
      
      <ViewTracker documentId={artikel.documentId} currentViews={artikel.view_count} />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-6 mb-8 relative z-10">
        <Link href="/berita" className="inline-flex items-center gap-2 text-navy/60 font-bold hover:text-blue-primary transition-colors bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm border border-navy/5 w-fit mb-8 shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          Kembali ke Indeks Berita
        </Link>

        {/* HEADER ARTIKEL */}
        <div className="mb-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-accent text-navy mb-6 shadow-sm border border-accent/20">
            {artikel.kategori ? artikel.kategori.replace(/_/g, ' ') : 'Berita'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy tracking-tight mb-8 leading-tight">
            {artikel.judul}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-4 text-navy/70 font-medium bg-white/60 p-4 rounded-2xl border border-navy/5 w-fit mx-auto shadow-sm">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {formatTanggal(artikel.tanggal_publikasi)}
            </span>
            <span className="hidden md:block text-navy/30">•</span>
            <span className="flex items-center gap-2">
               <svg className="w-5 h-5 text-blue-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
               {artikel.author || 'Admin Kelurahan'}
            </span>
            <span className="hidden md:block text-navy/30">•</span>
            <span className="flex items-center gap-2">
               <svg className="w-5 h-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
               {artikel.view_count || 0} Dibaca
            </span>
          </div>
        </div>
      </div>

      {/* FOTO COVER UTAMA (THUMBNAIL) & CAPTION */}
      <div className="max-w-5xl mx-auto px-6 mb-12 relative z-10">
        <figure className="flex flex-col items-center group cursor-default">
          <div className="w-full h-[40vh] md:h-[60vh] rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] md:border-8 border-white bg-navy/5 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <img 
              src={thumbnailUrl} 
              alt={thumbnailCaption} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <figcaption className="mt-5 text-sm md:text-base text-navy/60 italic px-6 text-center max-w-3xl flex items-start md:items-center justify-center gap-2.5 font-medium">
            <svg className="w-5 h-5 text-accent shrink-0 mt-0.5 md:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="leading-relaxed">{thumbnailCaption}</span>
          </figcaption>
        </figure>
      </div>

      {/* ISI ARTIKEL & GAMBAR SISIPAN */}
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-navy/5 border border-navy/10">
          
          {/* Ini area dimana teks dan gambar sisipan akan di-render */}
          <article className="prose prose-lg prose-navy max-w-none">
            {renderBlocks(artikel.konten)}
          </article>

          {/* GALERI TAMBAHAN (Tetap dipertahankan jika admin masih mau numpuk foto di bawah) */}
          {artikel.galeri_foto && artikel.galeri_foto.length > 0 && (
            <div className="mt-16 pt-10 border-t border-navy/10">
              <h3 className="text-2xl font-serif font-bold text-navy mb-6">
                Galeri Liputan Tambahan
              </h3>
              <div className="w-full aspect-video rounded-[2rem] overflow-hidden shadow-lg border border-navy/5 bg-navy/5">
                <ImageSlider images={artikel.galeri_foto} altPrefix={`Galeri ${artikel.judul}`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}