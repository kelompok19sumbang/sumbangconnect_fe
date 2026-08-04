// src/app/layanan/page.tsx
import { getLayanan, getPengaturanGlobal } from '@/lib/api';

export default async function LayananPage() {
  const layananData = await getLayanan();
  // 🔥 Ambil data dari Pengaturan Global (karena field header_layanan ada di sini)
  const globalData = await getPengaturanGlobal();

  const colorGradients = [
    "from-blue-primary to-blue-cyan",
    "from-navy to-blue-primary",
    "from-accent to-yellow-500",
    "from-blue-light to-blue-primary"
  ];

  const renderBlocks = (blocks: any) => {
    if (!blocks || !Array.isArray(blocks)) return null;
    return blocks.map((block, index) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="mb-2 text-navy/80">
            {block.children?.map((child: any, i: number) => {
              let className = "";
              if (child.bold) className += "font-bold ";
              if (child.italic) className += "italic ";
              return <span key={i} className={className}>{child.text}</span>;
            })}
          </p>
        );
      }
      if (block.type === 'list') {
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={index} className={`mb-4 pl-5 text-navy/80 ${block.format === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
            {block.children.map((listItem: any, idx: number) => (
              <li key={idx} className="mb-1">
                {listItem.children?.map((child: any) => child.text).join('')}
              </li>
            ))}
          </ListTag>
        );
      }
      return null;
    });
  };

 // 🔥 FIX ANTI BADAI: Membaca struktur Strapi Flat maupun Nested
  const bgImage = 
    globalData?.header_layanan?.url || // Jika format data Flat
    globalData?.attributes?.header_layanan?.data?.attributes?.url || // Jika format Strapi v4 standard
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=2070&auto=format&fit=crop";

  return (
    <main className="min-h-screen bg-cream font-sans pb-24">
      
      {/* ================= HEADER (DENGAN BACKGROUND FOTO DARI STRAPI) ================= */}
      <div className="w-full relative overflow-hidden pt-32 pb-24 rounded-b-[4rem] shadow-xl mb-16 bg-navy">
        
        {/* Foto Background Absolute */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        
        {/* Overlay Gradasi agar teks tetap terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent z-0"></div>

        {/* Motif Supergrafis */}
        <svg className="absolute inset-0 w-full h-full text-white/10 pointer-events-none z-0" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,200 C300,50 500,400 1000,200 C1300,100 1500,300 1600,350" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M-50,230 C320,90 480,430 1020,230" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        </svg>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 animate-fade-up mt-8">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-accent text-navy mb-6 shadow-sm border border-accent/20">
            Administrasi Kelurahan
          </div>
          {/* Teks dimatikan manual karena field-nya kita jadikan satu di Pengaturan Global */}
          <h1 className="text-4xl md:text-6xl font-bold text-white font-serif tracking-tight mb-6 drop-shadow-md">
            Layanan Publik
          </h1>
          <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto font-light drop-shadow-md">
            Pusat informasi persyaratan administrasi kependudukan. Pilih layanan yang Anda butuhkan dan isi formulir pendaftaran secara online.
          </p>
        </div>
      </div>

      {/* ACCORDION DAFTAR LAYANAN */}
      <div className="max-w-4xl mx-auto px-6">
        {layananData.length > 0 ? (
          <div className="space-y-6">
            {layananData.map((item: any, index: number) => {
              const gradientClass = colorGradients[index % colorGradients.length];
              const iconColorClass = gradientClass.includes("accent") ? "text-navy" : "text-white";

              return (
                <details 
                  key={item.documentId || item.id} 
                  className="group bg-white rounded-[2rem] shadow-sm hover:shadow-xl border border-navy/5 overflow-hidden transition-all duration-500"
                >
                  <summary className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-6 md:p-8 cursor-pointer hover:bg-gray-50 transition-colors select-none">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${gradientClass} ${iconColorClass} shadow-lg transform group-hover:scale-105 transition-transform duration-300`}>
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>

                    <div className="flex-grow flex items-center justify-between w-full">
                      <h3 className="font-serif font-bold text-xl md:text-2xl text-navy group-hover:text-blue-primary transition-colors">
                        {item.nama_layanan}
                      </h3>
                      
                      <span className="transition-transform duration-500 group-open:rotate-180 bg-navy/5 p-3 rounded-full text-navy ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </summary>

                  <div className="px-6 pb-8 pt-0 md:px-8 md:pl-[6.5rem] bg-white">
                    <div className="h-px w-full bg-navy/5 mb-6"></div>

                    <div className="bg-cream p-6 rounded-2xl mb-8 border border-navy/5">
                      <h4 className="text-xs font-bold text-blue-primary uppercase tracking-wider mb-3">Deskripsi Layanan</h4>
                      <p className="text-navy/75 leading-relaxed">{item.deskripsi}</p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
                        Syarat Dokumen
                      </h4>
                      <div className="prose prose-navy max-w-none text-navy/80">
                        {renderBlocks(item.persyaratan)}
                      </div>
                    </div>

                    {item.link_gform ? (
                      <a 
                        href={item.link_gform} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 w-full md:w-auto bg-gradient-to-r ${gradientClass} ${iconColorClass} font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all shadow-md`}
                      >
                        Mulai Isi Formulir
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </a>
                    ) : (
                      <div className="inline-flex items-center justify-center gap-3 w-full md:w-auto bg-navy/5 text-navy/80 font-medium py-4 px-8 rounded-xl border border-navy/10">
                        <svg className="w-5 h-5 text-blue-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Silakan datang langsung ke Kantor Kelurahan
                      </div>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-navy/50 bg-white rounded-3xl border border-navy/10">
            <p>Belum ada layanan administrasi yang ditambahkan.</p>
          </div>
        )}
      </div>

    </main>
  );
}