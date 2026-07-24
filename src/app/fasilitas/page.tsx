// src/app/fasilitas/page.tsx
import { getFasilitas } from '@/lib/api';
import MapWrapper from '@/components/MapWrapper'; 
import BlurText from '@/components/BlurText'; 
import FasilitasList from '@/components/FasilitasList';
import CurvedLoop from '@/components/CurvedLoop'; // <-- Import CurvedLoop ditambahkan!

export default async function FasilitasPage() {
  const fasilitasData = await getFasilitas();

  return (
    <main className="min-h-screen bg-cream font-sans pb-24">
      
      {/* ================= HEADER ================= */}
      {/* CLASS DIPERBARUI: mb-16 dihapus, diganti z-30 agar berada di atas CurvedLoop */}
      <div className="w-full bg-gradient-to-br from-navy via-blue-primary to-blue-cyan relative overflow-hidden pt-32 pb-24 rounded-b-[4rem] shadow-xl z-30">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none z-0"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[100%] bg-blue-light/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <svg className="absolute inset-0 w-full h-full text-white/10 pointer-events-none z-0" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,200 C300,50 500,400 1000,200 C1300,100 1500,300 1600,350" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M-50,230 C320,90 480,430 1020,230" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <circle cx="1150" cy="150" r="6" fill="currentColor" />
          <circle cx="1175" cy="130" r="3.5" fill="currentColor" opacity="0.7" />
          <circle cx="1195" cy="160" r="2" fill="currentColor" opacity="0.5" />
        </svg>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 animate-fade-up mt-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-accent text-navy mb-6 shadow-sm border border-accent/20">
            Peta & Infrastruktur
          </span>
          <div className="flex justify-center mb-6">
            <BlurText 
              text="Potensi Kelurahan Sumbang" 
              delay={50} 
              animateBy="words" 
              direction="bottom" 
              className="text-4xl md:text-6xl font-bold text-white font-serif tracking-tight" 
            />
          </div>
          <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Eksplorasi persebaran fasilitas umum, sarana kesehatan, dan pusat kegiatan masyarakat yang ada di wilayah Kelurahan Sumbang.
          </p>
        </div>
      </div>

      {/* ================= CURVED LOOP DIVIDER ================= */}
      <div className="w-full bg-cream text-blue-primary overflow-hidden relative -mt-20 pt-24 pb-12 z-20">
        <CurvedLoop 
          marqueeText="Fasilitas lengkap, warga nyaman! Jelajahi potensi terbaik di Kelurahan Sumbang 📍" 
          speed={0.5} 
          curveAmount={150} 
          direction="left" 
        />
      </div>

      {/* ================= SECTION: PETA DIGITAL INTERAKTIF ================= */}
      {/* CLASS DIPERBARUI: Ditambah relative z-30 agar tidak tertimpa animasi */}
      <div className="max-w-7xl mx-auto px-6 mb-20 relative z-30">
        <MapWrapper dataFasilitas={fasilitasData} />
      </div>

      {/* ================= SECTION: DAFTAR FASILITAS (SEARCH & LOAD MORE) ================= */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-serif font-bold text-navy">Daftar Fasilitas & Sarana</h2>
          <div className="h-px bg-navy/20 flex-grow"></div>
        </div>

        {/* Render Komponen Client List di Sini */}
        <FasilitasList dataFasilitas={fasilitasData} />
      </div>

    </main>
  );
}