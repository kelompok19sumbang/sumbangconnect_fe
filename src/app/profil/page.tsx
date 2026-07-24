// src/app/profil/page.tsx
import { getProfilDesa } from '@/lib/api';
import ImageSlider from '@/components/ImageSlider';
import ScrollReveal from '@/components/ScrollReveal';
import BlurText from '@/components/BlurText';

export default async function ProfilDesa() {
  const data = await getProfilDesa();

  if (!data) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-navy font-bold tracking-wide">Data Profil Desa belum tersedia.</p>
      </div>
    );
  }

  // Fungsi khusus merender Visi Misi (Teks Biasa / List)
  const renderEditorialBlocks = (blocks: any) => {
    if (!blocks || !Array.isArray(blocks)) return null;
    return blocks.map((block, index) => {
      if (block.type === 'paragraph') {
        const text = block.children?.map((child: any) => child.text).join('');
        return (
          <p key={index} className="mb-6 text-navy/80 leading-loose text-lg">
            {text}
          </p>
        );
      }
      return null;
    });
  };

  // Fungsi KHUSUS merender teks panjang dengan animasi ScrollReveal
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
                textClassName="text-navy/80 text-lg leading-loose font-serif"
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
          textClassName="text-navy/80 text-lg leading-loose font-serif"
        >
          {textToRender}
        </ScrollReveal>
      );
    }
  };
  
  const strukturImages = data.foto_struktur_organisasi ? [data.foto_struktur_organisasi] : [];

  return (
    <main className="min-h-screen bg-cream font-sans pb-32">
      
      {/* ================= HERO SECTION (GRADASI BIRU + SUPERGRAFIS + BLURTEXT) ================= */}
      <div className="w-full bg-gradient-to-br from-navy via-blue-primary to-blue-cyan relative overflow-hidden py-32 rounded-b-[4rem] shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none z-0"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-blue-light/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

        {/* ================= MOTIF SUPERGRAFIS AESTHETIC ================= */}
        {/* Garis Flowing Lebar */}
        <svg className="absolute inset-0 w-full h-full text-white/10 pointer-events-none z-0" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,300 C300,100 500,600 1000,300 C1300,150 1500,400 1600,450" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M-50,330 C320,140 480,630 1020,330" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          
          {/* Ornamen Titik Estetik */}
          <circle cx="1150" cy="200" r="6" fill="currentColor" />
          <circle cx="1175" cy="180" r="3.5" fill="currentColor" opacity="0.7" />
          <circle cx="1195" cy="210" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="1220" cy="190" r="1.5" fill="currentColor" opacity="0.3" />
        </svg>

        {/* Motif Melingkar Kanan Atas */}
        <svg className="absolute top-0 right-0 w-[40rem] h-[40rem] text-white/10 pointer-events-none z-0 rotate-12" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M450,-50 C250,100 150,400 500,500" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M480,-20 C290,120 190,400 520,480" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {/* ================================================================= */}

        <div className="max-w-4xl mx-auto text-center px-6 relative z-10 animate-fade-up">
          <span className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-accent text-navy mb-6 shadow-sm border border-accent/20">
            Mengenal Lebih Dekat
          </span>
          
          {/* Implementasi BlurText untuk Header */}
          <div className="mb-8 flex justify-center flex-wrap gap-x-3 items-center">
            <BlurText
              text="Profil Kelurahan"
              delay={50}
              animateBy="words"
              direction="bottom"
              className="text-5xl md:text-7xl font-bold text-white tracking-tight"
            />
            <BlurText
              text="Sumbang"
              delay={200}
              animateBy="words"
              direction="bottom"
              className="text-5xl md:text-7xl font-serif italic text-accent font-normal tracking-tight"
            />
          </div>
          
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-lg">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-navy shadow-inner">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div className="text-left">
              <p className="text-white/80 text-xs uppercase tracking-widest">Kepala Kelurahan</p>
              <p className="font-bold text-white text-lg leading-tight">{data.nama_kepala_desa || 'Belum diisi'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 relative z-20">
        
        {/* Storytelling Section: Visi Misi Sticky Kiri, Cerita Animasi di Kanan */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Kolom Kiri: Visi Misi (Span 4) */}
          <div className="lg:col-span-5 sticky top-32 space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-accent rounded-full"></div>
                <h2 className="text-3xl font-serif font-bold text-navy">Visi & Misi</h2>
              </div>
              <div className="prose prose-lg text-navy/80 prose-strong:text-navy prose-strong:font-bold prose-ul:list-disc prose-ul:pl-5">
                {data.visi_misi && data.visi_misi.length > 0 ? (
                  renderEditorialBlocks(data.visi_misi)
                ) : (
                  <p className="italic opacity-50">Belum ada data visi & misi.</p>
                )}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Sejarah, Geografi, Demografi dengan ScrollReveal */}
          <div className="lg:col-span-7 space-y-24">
            
            {/* 1. SEJARAH */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-4xl font-serif font-bold text-navy">Jejak Langkah</h2>
                <div className="flex-1 h-px bg-navy/10"></div>
              </div>
              <div className="max-w-none">
                {renderScrollRevealContent(
                  data.sejarah_desa, 
                  "Data Sejarah belum ditambahkan di sistem.", 
                  2 
                )}
              </div>
            </div>

            {/* 2. GEOGRAFI */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-4xl font-serif font-bold text-navy">Kondisi Geografis</h2>
                <div className="flex-1 h-px bg-navy/10"></div>
              </div>
              <div className="max-w-none">
                {renderScrollRevealContent(
                  data.geografi, 
                  "Secara topografi, Kelurahan Sumbang terletak di dataran rendah yang strategis, menjadikannya salah satu urat nadi aktivitas masyarakat perkotaan. Wilayah ini berbatasan langsung dengan area pusat perbelanjaan, fasilitas kesehatan tingkat daerah, dan dilewati oleh jalur penghubung antar kecamatan. Iklim tropis dengan curah hujan menengah membuat lahan di sekitar kelurahan ini tetap asri dan mendukung program penghijauan lorong kota yang digagas oleh warga.", 
                  -2 
                )}
              </div>
            </div>

            {/* 3. DEMOGRAFI */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-4xl font-serif font-bold text-navy">Demografi Warga</h2>
                <div className="flex-1 h-px bg-navy/10"></div>
              </div>
              <div className="max-w-none">
                {renderScrollRevealContent(
                  data.demografi, 
                  "Masyarakat Kelurahan Sumbang adalah representasi dari dinamika sosial masyarakat urban yang majemuk namun tetap menjunjung tinggi nilai gotong royong. Didominasi oleh usia produktif, warga desa aktif dalam berbagai sektor ekonomi, mulai dari perdagangan, jasa, hingga UMKM kreatif. Keberagaman latar belakang pendidikan dan budaya justru menjadi kekuatan utama dalam menciptakan lingkungan yang inklusif, aman, dan berdaya saing tinggi.", 
                  2 
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bagian Peta Lokasi & Statistik Demografi (Kotak) */}
      <div className="max-w-7xl mx-auto px-6 mt-32 relative z-20">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-4xl font-serif font-bold text-navy">Peta & Wilayah</h2>
          <div className="flex-1 h-px bg-navy/10"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Kartu Informasi */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-navy/5 border border-navy/10 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-blue-primary uppercase tracking-widest mb-6">Batas Wilayah</h3>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-navy/80 mb-8">
              <div>
                <span className="block text-sm font-bold text-navy mb-1">Utara</span>
                <span className="font-medium">{data.batas_utara || '-'}</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-navy mb-1">Timur</span>
                <span className="font-medium">{data.batas_timur || '-'}</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-navy mb-1">Selatan</span>
                <span className="font-medium">{data.batas_selatan || '-'}</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-navy mb-1">Barat</span>
                <span className="font-medium">{data.batas_barat || '-'}</span>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-navy/10">
              <div className="flex justify-between items-center">
                <span className="font-bold text-navy text-lg">Luas Desa</span>
                <span className="text-navy/80 font-medium text-lg">{data.luas_desa || '-'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-navy text-lg">Jumlah Penduduk</span>
                <span className="text-navy/80 font-medium text-lg">{data.jumlah_penduduk || '-'}</span>
              </div>
            </div>
          </div>

          {/* Kartu Embed Google Maps */}
          <div className="bg-navy/5 rounded-[2.5rem] overflow-hidden border border-navy/10 h-[350px] lg:h-auto relative shadow-inner">
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
              <div className="w-full h-full flex flex-col items-center justify-center text-navy/40">
                <p className="font-medium tracking-wide">Link Peta belum ditambahkan</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bagian Struktur Organisasi */}
      <div className="max-w-6xl mx-auto px-6 mt-32">
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

    </main>
  );
}