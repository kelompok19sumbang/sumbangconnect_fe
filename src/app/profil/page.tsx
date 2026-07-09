// src/app/profil/page.tsx
import { getProfilDesa } from '@/lib/api';
import ImageSlider from '@/components/ImageSlider';

export default async function ProfilDesa() {
  const data = await getProfilDesa();

  if (!data) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-forest font-bold tracking-wide">Data Profil Desa belum tersedia.</p>
      </div>
    );
  }

  // Fungsi merender teks panjang agar lebih rapi (Editorial Style)
  const renderEditorialBlocks = (blocks: any, isDropCap: boolean = false) => {
    if (!blocks || !Array.isArray(blocks)) return null;
    return blocks.map((block, index) => {
      if (block.type === 'paragraph') {
        const text = block.children?.map((child: any) => child.text).join('');
        // Tambahkan efek Drop Cap (Huruf besar di awal) untuk paragraf pertama Sejarah
        if (isDropCap && index === 0 && text.length > 0) {
          const firstLetter = text.charAt(0);
          const restText = text.slice(1);
          return (
            <p key={index} className="mb-6 text-dark/80 leading-loose text-lg">
              <span className="float-left text-6xl font-serif text-terracotta font-bold leading-none pr-3 pt-2">{firstLetter}</span>
              {restText}
            </p>
          );
        }
        return (
          <p key={index} className="mb-6 text-dark/80 leading-loose text-lg">
            {text}
          </p>
        );
      }
      return null;
    });
  };

  const strukturImages = data.foto_struktur_organisasi ? [data.foto_struktur_organisasi] : [];

  return (
    <main className="min-h-screen bg-[#FDFCF8] font-sans pb-32">
      
      {/* Hero Section - Lebih luas & Immersive */}
      <div className="w-full bg-forest relative overflow-hidden py-32 rounded-b-[4rem]">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-terracotta/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center px-6 relative z-10 animate-fade-up">
          <span className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white mb-6 border border-white/20 backdrop-blur-sm">
            Mengenal Lebih Dekat
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-cream tracking-tight mb-8">
            Profil Kelurahan <span className="font-serif italic text-terracotta font-normal">Sumbang</span>
          </h1>
          
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
            <div className="w-10 h-10 bg-terracotta rounded-full flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div className="text-left">
              <p className="text-cream/70 text-xs uppercase tracking-widest">Kepala Kelurahan</p>
              <p className="font-bold text-white text-lg leading-tight">{data.nama_kepala_desa || 'Belum diisi'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 relative z-20">
        
        {/* Storytelling Section: Visi Misi & Sejarah dibuat berurutan, tidak di dalam kotak sempit */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Kolom Kiri: Visi Misi (Span 4) */}
          <div className="lg:col-span-5 sticky top-32 space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-terracotta rounded-full"></div>
                <h2 className="text-3xl font-serif font-bold text-forest">Visi & Misi</h2>
              </div>
              <div className="prose prose-lg text-dark/80 prose-strong:text-forest prose-strong:font-bold prose-ul:list-disc prose-ul:pl-5">
                {data.visi_misi && data.visi_misi.length > 0 ? (
                  renderEditorialBlocks(data.visi_misi, false)
                ) : (
                  <p className="italic opacity-50">Belum ada data visi & misi.</p>
                )}
              </div>
            </div>

            {/* Aksen visual tambahan untuk mengisi ruang */}
            <div className="hidden lg:block w-full h-48 bg-forest/5 rounded-3xl border border-forest/10 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-60"></div>
          </div>

          {/* Kolom Kanan: Sejarah Desa (Span 7) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-4xl font-serif font-bold text-forest">Jejak Langkah</h2>
              <div className="flex-1 h-px bg-forest/10"></div>
            </div>
            
            <div className="prose prose-xl max-w-none">
              {data.sejarah_desa && data.sejarah_desa.length > 0 ? (
                renderEditorialBlocks(data.sejarah_desa, true) // isDropCap = true
              ) : (
                <p className="italic text-dark/40">Data Sejarah belum ditambahkan.</p>
              )}
            </div>
          </div>
        </div>
      </div>

        {/* Bagian Peta Lokasi & Demografi (Baru) */}
      <div className="max-w-7xl mx-auto px-6 mt-32 relative z-20">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-4xl font-serif font-bold text-forest">Peta Lokasi Desa</h2>
          <div className="flex-1 h-px bg-forest/10"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Kartu Informasi Demografi */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-forest/5 border border-forest/10 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-terracotta uppercase tracking-widest mb-6">Batas Wilayah</h3>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-dark/80 mb-8">
              <div>
                <span className="block text-sm font-bold text-forest mb-1">Utara</span>
                <span className="font-medium">{data.batas_utara || '-'}</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-forest mb-1">Timur</span>
                <span className="font-medium">{data.batas_timur || '-'}</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-forest mb-1">Selatan</span>
                <span className="font-medium">{data.batas_selatan || '-'}</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-forest mb-1">Barat</span>
                <span className="font-medium">{data.batas_barat || '-'}</span>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-forest/10">
              <div className="flex justify-between items-center">
                <span className="font-bold text-forest text-lg">Luas Desa</span>
                <span className="text-dark/80 font-medium text-lg">{data.luas_desa || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-forest text-lg">Jumlah Penduduk</span>
                <span className="text-dark/80 font-medium text-lg">{data.jumlah_penduduk || '-'}</span>
              </div>
            </div>
          </div>

          {/* Kartu Embed Google Maps */}
          <div className="bg-forest/5 rounded-[2.5rem] overflow-hidden border border-forest/10 h-[350px] lg:h-auto relative shadow-inner">
            {data.link_peta ? (
              <iframe 
                src={data.link_peta} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-forest/40">
                <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <p className="font-medium tracking-wide">Link Peta belum ditambahkan di Strapi</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bagian Struktur Organisasi - Diperlebar dan lebih bersih */}
      <div className="max-w-6xl mx-auto px-6 mt-32">
        <div className="text-center mb-12">
          <span className="text-terracotta font-bold uppercase tracking-widest text-sm mb-3 block">Perangkat Desa</span>
          <h2 className="text-4xl font-serif font-bold text-forest">Struktur Organisasi</h2>
        </div>
        
        <div className="bg-white p-4 rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-forest/5 border border-forest/10">
          <div className="w-full h-[60vh] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-forest/5 cursor-zoom-in">
            {strukturImages.length > 0 ? (
              <ImageSlider images={strukturImages} altPrefix="Struktur Organisasi" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-forest/40 font-medium">
                Gambar Struktur Organisasi belum diunggah.
              </div>
            )}
          </div>
        </div>
      </div>

    </main>
  );
}