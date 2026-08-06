// src/app/hubungi-kami/page.tsx
import Link from 'next/link';
import BlurText from '@/components/BlurText';
import { getProfilDesa } from '@/lib/api';

// Fungsi untuk mengambil data kontak dari Strapi
async function getSumbangConnectData() {
  try {
    const res = await fetch('http://103.82.92.95/api/pengaturan-global', { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data?.attributes || json.data || null;  
  } catch (error) {
    return null;
  }
}

export default async function HubungiKamiPage() {
  const [contactData, profilData] = await Promise.all([
    getSumbangConnectData(),
    getProfilDesa()
  ]);

  // Siapkan data fallback jika Strapi kosong
  const alamat = contactData?.alamat || "Jl. Teuku Umar No. 15, Kelurahan Sumbang, Kec. Bojonegoro, Jawa Timur 62115";
  const telepon = contactData?.telepon || "0812-3456-7890";
  const email = contactData?.email || "layanan@sumbang.desa.id";
  
  let linkIg = contactData?.link_instagram || "#";
  if (linkIg.startsWith('[') && linkIg.endsWith(']')) {
    linkIg = linkIg.slice(1, -1);
  }

  // Tambahan Link Facebook dari Strapi
  let linkFb = contactData?.link_facebook || "#";
  if (linkFb.startsWith('[') && linkFb.endsWith(']')) {
    linkFb = linkFb.slice(1, -1);
  }

  // Format nomor telepon untuk link WhatsApp
  const waNumber = telepon.replace(/\D/g, '').replace(/^0/, '62');

  return (
    <main className="min-h-screen bg-cream font-sans pb-32">
      
      {/* ================= HERO SECTION ================= */}
      <div className="bg-gradient-to-br from-navy via-blue-primary to-blue-cyan relative overflow-hidden py-24 lg:py-32 rounded-b-[4rem] shadow-xl z-10">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none z-0"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[100%] bg-blue-light/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="max-w-4xl mx-auto text-center px-6 relative z-10 animate-fade-up mt-8">
          <span className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-accent text-navy mb-6 shadow-sm border border-accent/20">
            Layanan Informasi
          </span>
          <div className="flex justify-center mb-6">
            <BlurText 
              text="Hubungi Kami" 
              delay={50} 
              animateBy="words" 
              direction="bottom" 
              className="text-5xl md:text-7xl font-bold text-white font-serif tracking-tight" 
            />
          </div>
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Kami siap mendengarkan saran, masukan, dan melayani kebutuhan informasi warga Kelurahan Sumbang. Jangan ragu untuk menghubungi kami melalui saluran di bawah ini.
          </p>
        </div>
      </div>

      {/* ================= KONTEN UTAMA ================= */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Kartu 1: Alamat Saja (Link Kecamatan dipindah) */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-navy/5 border border-navy/10 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-navy/5 text-navy rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-navy mb-4 font-serif">Alamat Kantor</h3>
            <p className="text-navy/70 leading-relaxed font-medium mb-6 flex-grow">
              {alamat}
            </p>
            {/* Supaya tinggi kartunya seimbang dengan kartu lain */}
            <div className="h-[48px]"></div> 
          </div>

          {/* Kartu 2: Kontak WA */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-navy/5 border border-navy/10 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-navy/5 text-navy rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-navy mb-4 font-serif">Telepon & WA</h3>
            <p className="text-navy/70 leading-relaxed font-medium mb-6 flex-grow">
              {telepon}
            </p>
            <a 
              href={`https://wa.me/${waNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-auto bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#128C7E] transition-colors w-full justify-center h-[48px]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Chat WhatsApp
            </a>
          </div>

          {/* Kartu 3: Email & Semua Link Sosmed */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-navy/5 border border-navy/10 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-navy/5 text-navy rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-navy mb-4 font-serif">Email & Tautan</h3>
            <p className="text-navy/70 leading-relaxed font-medium mb-6 flex-grow">
              {email}
            </p>
            
            {/* Kontainer Tombol-tombol: Disusun 2 Baris agar muat dan rapi */}
            <div className="mt-auto w-full flex flex-col gap-2">
              
              {/* Baris 1: Tombol Web Kecamatan Full Width */}
              <a 
                href="https://sidakbojokecbojonegoro.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-primary/10 text-blue-primary px-4 py-2.5 rounded-xl font-bold hover:bg-blue-primary hover:text-white transition-colors flex items-center justify-center gap-2 text-sm w-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Web Kecamatan
              </a>

              {/* Baris 2: Tombol Email, IG, FB */}
              <div className="flex gap-2 w-full">
                <a 
                  href={`mailto:${email}`}
                  className="flex-[2] bg-navy/5 text-navy px-2 py-2.5 rounded-xl font-bold hover:bg-navy hover:text-white transition-colors flex items-center justify-center text-xs lg:text-sm"
                >
                  Email
                </a>
                <a 
                  href={linkIg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#E1306C]/10 text-[#E1306C] px-2 py-2.5 rounded-xl font-bold hover:bg-[#E1306C] hover:text-white transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a 
                  href={linkFb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#1877F2]/10 text-[#1877F2] px-2 py-2.5 rounded-xl font-bold hover:bg-[#1877F2] hover:text-white transition-colors flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* ================= PETA LOKASI KANTOR ================= */}
      {profilData?.link_peta && (
        <div className="max-w-7xl mx-auto px-6 mt-20">
          <div className="bg-white p-4 rounded-[2.5rem] shadow-xl shadow-navy/5 border border-navy/10">
            <div className="w-full h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden bg-navy/5 relative">
              <iframe 
                src={profilData.link_peta} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}