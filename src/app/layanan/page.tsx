// src/app/layanan/page.tsx
import { getLayanan } from '@/lib/api';

export default async function LayananPage() {
  const layananData = await getLayanan();

  // Kumpulan gradasi warna cerah untuk ikon (Otomatis berputar sesuai urutan data)
  const colorGradients = [
    "from-terracotta to-orange-400",
    "from-forest to-emerald-500",
    "from-[#1A56DB] to-blue-400",
    "from-purple-600 to-purple-400"
  ];

  const renderBlocks = (blocks: any) => {
    if (!blocks || !Array.isArray(blocks)) return null;
    return blocks.map((block, index) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="mb-2 text-dark/80">
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
          <ListTag key={index} className={`mb-4 pl-5 text-dark/80 ${block.format === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
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

  return (
    <main className="min-h-screen bg-cream font-sans pt-32 pb-24">
      
      {/* HEADER HALAMAN */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16 relative z-10">
        <div className="inline-block bg-terracotta/10 text-terracotta px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-xs mb-4">
          Administrasi Kelurahan
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-dark font-serif mb-6">
          Layanan Publik
        </h1>
        <p className="text-dark/60 text-lg leading-relaxed max-w-2xl mx-auto">
          Pusat informasi persyaratan administrasi kependudukan. Pilih layanan yang Anda butuhkan dan isi formulir pendaftaran secara online.
        </p>
      </div>

      {/* ACCORDION DAFTAR LAYANAN (DESAIN BARU!) */}
      <div className="max-w-4xl mx-auto px-6">
        {layananData.length > 0 ? (
          <div className="space-y-6">
            {layananData.map((item: any, index: number) => {
              // Menentukan warna kotak ikon berdasarkan urutan
              const gradientClass = colorGradients[index % colorGradients.length];

              return (
                <details 
                  key={item.documentId || item.id} 
                  className="group bg-white rounded-[2rem] shadow-sm hover:shadow-xl border border-forest/5 overflow-hidden transition-all duration-500"
                >
                  {/* HEADER ACCORDION */}
                  <summary className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-6 md:p-8 cursor-pointer hover:bg-gray-50 transition-colors select-none">
                    
                    {/* Kotak Ikon Berwarna Cerah (Pengganti Gambar) */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${gradientClass} text-white shadow-lg transform group-hover:scale-105 transition-transform duration-300`}>
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>

                    {/* Judul & Ikon Panah */}
                    <div className="flex-grow flex items-center justify-between w-full">
                      <h3 className="font-serif font-bold text-xl md:text-2xl text-dark group-hover:text-forest transition-colors">
                        {item.nama_layanan}
                      </h3>
                      
                      <span className="transition-transform duration-500 group-open:rotate-180 bg-forest/5 p-3 rounded-full text-forest ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </summary>

                  {/* ISI ACCORDION (Dilengkapi animasi pembuka) */}
                  <div className="px-6 pb-8 pt-0 md:px-8 md:pl-[6.5rem] bg-white">
                    <div className="h-px w-full bg-forest/5 mb-6"></div>

                    <div className="bg-[#FDFCF8] p-6 rounded-2xl mb-8 border border-forest/5">
                      <h4 className="text-xs font-bold text-terracotta uppercase tracking-wider mb-3">Deskripsi Layanan</h4>
                      <p className="text-dark/75 leading-relaxed">{item.deskripsi}</p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-sm font-bold text-forest uppercase tracking-wider mb-4 flex items-center gap-2">
                        Syarat Dokumen
                      </h4>
                      <div className="prose prose-forest max-w-none text-dark/80">
                        {renderBlocks(item.persyaratan)}
                      </div>
                    </div>

                    {/* Tombol Aksi */}
                    {item.link_gform ? (
                      <a 
                        href={item.link_gform} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 w-full md:w-auto bg-gradient-to-r ${gradientClass} text-white font-bold py-4 px-8 rounded-xl hover:opacity-90 transition-opacity shadow-md`}
                      >
                        Mulai Isi Formulir
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </a>
                    ) : (
                      <div className="inline-block bg-gray-100 text-dark/40 font-medium py-3 px-6 rounded-xl cursor-not-allowed">
                        Formulir Online Belum Tersedia
                      </div>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-dark/50 bg-white rounded-3xl border border-forest/10">
            <p>Belum ada layanan administrasi yang ditambahkan.</p>
          </div>
        )}
      </div>

    </main>
  );
}