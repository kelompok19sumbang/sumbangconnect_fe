// src/app/umkm/[id]/page.tsx
import { getUmkmById } from '@/lib/api';
import Link from 'next/link';
import ImageSlider from '@/components/ImageSlider';

export default async function UmkmDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const item = await getUmkmById(resolvedParams.id);

  const fotoUrl = item.foto_produk?.url 
    ? `http://103.82.92.95${item.foto_produk.url}` 
    : 'https://via.placeholder.com/1200x600?text=No+Image';

  const renderBlocks = (blocks: any) => {
    if (!blocks || !Array.isArray(blocks)) return null;
    return blocks.map((block, index) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="mb-4 text-dark/75 leading-relaxed text-lg">
            {block.children?.map((child: any) => child.text).join('')}
          </p>
        );
      }
      return null;
    });
  };

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);
  };

  // Fungsi Pembersih URL yang lebih pintar
  const cleanUsername = (handle: string) => handle.replace(/^@/, '').trim();
  const ensureHttp = (url: string) => url.startsWith('http') ? url : `https://${url.trim()}`;
  
  // Fungsi pembuat link marketplace cerdas (bisa nangkep username atau url utuh)
  const getMarketplaceUrl = (input: string, platformUrl: string) => {
    if (input.includes('http') || input.includes('.com') || input.includes('.co.id')) {
      return ensureHttp(input);
    }
    // Jika input hanya nama toko, encode untuk format URL pencarian atau path
    return `${platformUrl}${encodeURIComponent(input.trim())}`;
  };

  const formatWaNumber = (nomor: string) => {
    if (!nomor) return '';
    let cleaned = nomor.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '62' + cleaned.slice(1);
    }
    return cleaned;
  };

  return (
    <main className="min-h-screen bg-[#FDFCF8] font-sans pb-24 relative">
      
      <div className="absolute top-28 left-4 md:top-32 md:left-12 z-40">
        <Link href="/umkm" className="inline-flex items-center justify-center w-12 h-12 bg-white/40 backdrop-blur-md rounded-full shadow-sm border border-white/50 text-forest hover:bg-white hover:scale-105 transition-all duration-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </Link>
      </div>

      <div className="w-full h-[50vh] relative bg-forest">
        <img 
          src={fotoUrl} 
          alt={item.nama_toko} 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-b from-forest/30 via-transparent to-[#FDFCF8]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-8 space-y-10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-terracotta/10 text-terracotta mb-4 border border-terracotta/20">
                Direktori UMKM
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-forest tracking-tight mb-6 leading-tight">
                {item.nama_toko}
              </h1>
              <p className="text-xl text-dark/80 leading-relaxed font-medium">
                {item.deskripsi}
              </p>
            </div>

            {item.sejarah_umkm && item.sejarah_umkm.length > 0 && (
              <div className="pt-8 border-t border-forest/10">
                <div className="border-l-4 border-terracotta pl-6 py-2">
                  <h2 className="text-2xl font-serif font-bold text-forest mb-4">Latar Belakang & Sejarah</h2>
                  <div className="prose prose-lg max-w-none">
                    {renderBlocks(item.sejarah_umkm)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* KOLOM KONTAK & MEDSOS */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-4xl shadow-xl shadow-forest/5 border border-forest/10 sticky top-28">
              <div className="w-12 h-12 bg-forest/5 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              
              <h3 className="text-xl font-bold text-forest mb-2">Tertarik dengan produk ini?</h3>
              <p className="text-dark/60 text-sm mb-8">Hubungi pemilik UMKM atau kunjungi platform belanja mereka untuk info lebih lanjut.</p>
              
              <div className="space-y-3">
                
                {/* WHATSAPP */}
                {item.kontak_wa && (
                  <a 
                    href={`https://wa.me/${formatWaNumber(item.kontak_wa)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center gap-3 bg-[#25D366] text-white py-3.5 px-6 rounded-xl font-bold hover:bg-[#128C7E] transition-colors duration-300 shadow-md"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    Hubungi WhatsApp
                  </a>
                )}

                {/* EMAIL */}
                {item.email && (
                  <a 
                    href={`mailto:${item.email}`}
                    className="w-full flex justify-center items-center gap-3 bg-transparent border-2 border-gray-400/50 text-gray-700 py-3.5 px-6 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Email UMKM
                  </a>
                )}

                {/* TOKOPEDIA */}
                {item.tokopedia && (
                  <a 
                    href={getMarketplaceUrl(item.tokopedia, 'https://www.tokopedia.com/search?q=')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center gap-3 bg-transparent border-2 border-[#03AC0E]/30 text-[#03AC0E] py-3.5 px-6 rounded-xl font-bold hover:bg-[#03AC0E] hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    Cek Tokopedia
                  </a>
                )}

                {/* SHOPEE */}
                {item.shopee && (
                  <a 
                    href={getMarketplaceUrl(item.shopee, 'https://shopee.co.id/search?keyword=')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center gap-3 bg-transparent border-2 border-[#EE4D2D]/30 text-[#EE4D2D] py-3.5 px-6 rounded-xl font-bold hover:bg-[#EE4D2D] hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    Belanja di Shopee
                  </a>
                )}

                {/* BUKALAPAK */}
                {item.bukalapak && (
                  <a 
                    href={getMarketplaceUrl(item.bukalapak, 'https://www.bukalapak.com/products?search%5Bkeywords%5D=')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center gap-3 bg-transparent border-2 border-[#E31E52]/30 text-[#E31E52] py-3.5 px-6 rounded-xl font-bold hover:bg-[#E31E52] hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                    Cek Bukalapak
                  </a>
                )}

                {/* INSTAGRAM */}
                {item.instagram && (
                  <a 
                    href={`https://instagram.com/${cleanUsername(item.instagram)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center gap-3 bg-transparent border-2 border-[#E1306C]/30 text-[#E1306C] py-3.5 px-6 rounded-xl font-bold hover:bg-[#E1306C] hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    Kunjungi Instagram
                  </a>
                )}

                {/* WEBSITE & MAPS LAINNYA */}
                {item.website && (
                  <a 
                    href={ensureHttp(item.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center gap-3 bg-transparent border-2 border-forest/30 text-forest py-3.5 px-6 rounded-xl font-bold hover:bg-forest hover:text-cream transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                    Kunjungi Website
                  </a>
                )}
                {item.link_maps && (
                  <a 
                    href={item.link_maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center gap-3 bg-transparent border-2 border-terracotta/30 text-terracotta py-3.5 px-6 rounded-xl font-bold hover:bg-terracotta hover:text-white transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Buka di Google Maps
                  </a>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bagian Katalog Produk - DENGAN LOGIKA RANGE HARGA */}
      {item.katalog_produk && item.katalog_produk.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-forest/10 pb-6 gap-4">
            <div>
              <span className="text-terracotta font-bold uppercase tracking-widest text-sm mb-2 block">Etalase</span>
              <h2 className="text-4xl font-serif font-bold text-forest">Katalog Produk</h2>
            </div>
            <p className="text-dark/60 font-medium">Menampilkan {item.katalog_produk.length} produk unggulan</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {item.katalog_produk.map((produk: any) => (
              <div key={produk.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-forest/10 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                
                <div className="relative w-full h-72 bg-forest/5">
                  <ImageSlider 
                    images={produk.foto_produk || []} 
                    altPrefix={produk.nama_produk} 
                  />
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-serif font-bold text-forest mb-2 line-clamp-2 leading-tight">
                    {produk.nama_produk}
                  </h3>
                  
                  {/* LOGIKA RANGE HARGA DITERAPKAN DI SINI */}
                  <p className="text-terracotta font-bold text-xl">
                    {produk.harga_max && produk.harga_max > produk.harga
                      ? `${formatRupiah(produk.harga)} - ${formatRupiah(produk.harga_max)}`
                      : formatRupiah(produk.harga)
                    }
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </main>
  );
}