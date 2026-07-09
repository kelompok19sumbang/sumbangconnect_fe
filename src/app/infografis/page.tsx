// src/app/infografis/page.tsx
import { getInfografis } from '@/lib/api';
import { PendidikanChart } from '@/components/DataCharts';

export default async function Infografis() {
  // Mengambil data dinamis dari Strapi
  const data = await getInfografis();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8]">
        <p className="text-[#093720] font-bold tracking-wide">Data Infografis belum tersedia.</p>
      </div>
    );
  }

  // Kalkulasi persentase untuk visualisasi Bar Gender & Lahan
  const persenPria = Math.round((data.pria / data.populasi_total) * 100) || 0;
  const persenWanita = Math.round((data.wanita / data.populasi_total) * 100) || 0;
  const persenSawah = Math.round((data.luas_sawah / data.luas_total) * 100) || 0;
  const persenKering = Math.round((data.luas_kering / data.luas_total) * 100) || 0;

  // Format ulang data usia dari Strapi menjadi Array
  const demografiUsia = [
    { range: '0 - 4 thn', jumlah: data.usia_0_4 || 0 },
    { range: '5 - 9 thn', jumlah: data.usia_5_9 || 0 },
    { range: '10 - 14 thn', jumlah: data.usia_10_14 || 0 },
    { range: '15 - 19 thn', jumlah: data.usia_15_19 || 0 },
    { range: '20 - 24 thn', jumlah: data.usia_20_24 || 0 },
    { range: '25 - 29 thn', jumlah: data.usia_25_29 || 0 },
    { range: '30 - 34 thn', jumlah: data.usia_30_34 || 0 },
    { range: '35 - 39 thn', jumlah: data.usia_35_39 || 0 },
    { range: '40 - 44 thn', jumlah: data.usia_40_44 || 0 },
    { range: '45 - 49 thn', jumlah: data.usia_45_49 || 0 },
    { range: '50+ thn', jumlah: data.usia_50_plus || 0 },
  ];

  // Mencari angka tertinggi untuk patokan lebar bar chart usia (minimal 1)
  const maxUsia = Math.max(...demografiUsia.map(u => u.jumlah), 1); 

  // Data Dummy untuk Pendidikan (Bisa dibuatkan kolom di Strapi nanti)
  const dataPendidikan = [
    { name: 'Tidak/Belum Sekolah', jumlah: 176 },
    { name: 'Belum Tamat SD', jumlah: 204 },
    { name: 'Tamat SD', jumlah: 288 },
    { name: 'SLTP/Sederajat', jumlah: 140 },
    { name: 'SLTA/Sederajat', helper: '', jumlah: 285 },
    { name: 'Diploma I/II', jumlah: 21 },
    { name: 'Sarjana/D4', jumlah: 25 },
  ];

  // Data Dummy untuk Pekerjaan
  const dataPekerjaan = [
    { name: 'Pelajar/Mahasiswa', jumlah: 325 },
    { name: 'Belum/Tidak Bekerja', jumlah: 273 },
    { name: 'Mengurus Rumah Tangga', jumlah: 271 },
    { name: 'Karyawan Swasta', jumlah: 116 },
    { name: 'Nelayan/Perikanan', jumlah: 49 },
    { name: 'Petani/Pekebun', jumlah: 39 },
  ];

  return (
    <main className="min-h-screen bg-[#FDFCF8] font-sans pb-32">
      
      {/* HEADER: Menggunakan Gradasi */}
      <div className="bg-gradient-to-br from-[#093720] via-[#0c4a2a] to-[#072515] text-[#F8F5EE] pt-20 pb-32 px-6 lg:px-8 relative overflow-hidden rounded-b-[4rem] shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#F27C53]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-up">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest bg-[#F27C53] text-[#093720] mb-6 shadow-sm">
            BPS Bojonegoro 2025
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6">
            Infografis <span className="text-[#F27C53] italic font-light">Desa</span>
          </h1>
          <p className="text-xl text-[#F8F5EE]/80 max-w-2xl mx-auto font-light">
            Transparansi data kependudukan, pemetaan wilayah, dan statistik Kelurahan Sumbang secara aktual.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        
        {/* 4 Highlight Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-[#093720]/5 border border-[#093720]/10 text-center flex flex-col justify-center animate-fade-up" style={{animationDelay: '0.1s'}}>
            <span className="text-[#1A2721]/50 text-sm font-bold uppercase tracking-wider mb-2">Total Penduduk</span>
            <span className="text-4xl font-serif font-bold text-[#093720]">{data.populasi_total?.toLocaleString('id-ID') || 0}</span>
            <span className="text-[#F27C53] text-xs font-bold mt-1">Jiwa</span>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-[#093720]/5 border border-[#093720]/10 text-center flex flex-col justify-center animate-fade-up" style={{animationDelay: '0.2s'}}>
            <span className="text-[#1A2721]/50 text-sm font-bold uppercase tracking-wider mb-2">Luas Wilayah</span>
            <span className="text-4xl font-serif font-bold text-[#093720]">{data.luas_total || 0}</span>
            <span className="text-[#F27C53] text-xs font-bold mt-1">Hektar (Ha)</span>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-[#093720]/5 border border-[#093720]/10 text-center flex flex-col justify-center animate-fade-up" style={{animationDelay: '0.3s'}}>
            <span className="text-[#1A2721]/50 text-sm font-bold uppercase tracking-wider mb-2">Kepadatan</span>
            <span className="text-4xl font-serif font-bold text-[#093720]">{data.kepadatan || 0}</span>
            <span className="text-[#F27C53] text-xs font-bold mt-1">Jiwa / Ha</span>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-[#093720]/5 border border-[#093720]/10 text-center flex flex-col justify-center animate-fade-up" style={{animationDelay: '0.4s'}}>
            <span className="text-[#1A2721]/50 text-sm font-bold uppercase tracking-wider mb-2">Administratif</span>
            <div className="text-3xl font-serif font-bold text-[#093720] flex justify-center gap-4">
              <div>{data.rw || 0} <span className="text-[#F27C53] text-xs block">RW</span></div>
              <div className="text-[#093720]/20">/</div>
              <div>{data.rt || 0} <span className="text-[#F27C53] text-xs block">RT</span></div>
            </div>
          </div>
        </div>

        {/* 2 Kolom Komposisi (Gender & Lahan) */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#F8F5EE]/50 p-8 rounded-[2.5rem] border border-[#093720]/10">
            <h3 className="text-2xl font-serif font-bold text-[#093720] mb-8">Komposisi Penduduk</h3>
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-sm font-bold text-[#1A2721]/50 uppercase tracking-widest">Laki-laki</p>
                <p className="text-3xl font-bold text-[#093720]">{data.pria || 0}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#1A2721]/50 uppercase tracking-widest">Perempuan</p>
                <p className="text-3xl font-bold text-[#F27C53]">{data.wanita || 0}</p>
              </div>
            </div>
            <div className="w-full h-6 rounded-full overflow-hidden flex bg-white border border-[#093720]/10 shadow-inner">
              <div className="h-full bg-[#093720] relative flex items-center px-3" style={{ width: `${persenPria}%` }}>
                <span className="text-[10px] font-bold text-white/80">{persenPria}%</span>
              </div>
              <div className="h-full bg-[#F27C53] relative flex justify-end items-center px-3" style={{ width: `${persenWanita}%` }}>
                <span className="text-[10px] font-bold text-white/80">{persenWanita}%</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F8F5EE]/50 p-8 rounded-[2.5rem] border border-[#093720]/10">
            <h3 className="text-2xl font-serif font-bold text-[#093720] mb-8">Penggunaan Lahan</h3>
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-sm font-bold text-[#1A2721]/50 uppercase tracking-widest">Sawah</p>
                <p className="text-3xl font-bold text-[#093720]">{data.luas_sawah || 0} <span className="text-sm">Ha</span></p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-[#1A2721]/50 uppercase tracking-widest">Kering/Darat</p>
                <p className="text-3xl font-bold text-[#F27C53]">{data.luas_kering || 0} <span className="text-sm">Ha</span></p>
              </div>
            </div>
            <div className="w-full h-6 rounded-full overflow-hidden flex bg-white border border-[#093720]/10 shadow-inner">
              <div className="h-full bg-[#093720] relative flex items-center px-3" style={{ width: `${persenSawah}%` }}>
                <span className="text-[10px] font-bold text-white/80">{persenSawah}%</span>
              </div>
              <div className="h-full bg-[#F27C53] relative flex justify-end items-center px-3" style={{ width: `${persenKering}%` }}>
                <span className="text-[10px] font-bold text-white/80">{persenKering}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demografi Usia (Sudah dibersihkan dari warning CSS) */}
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-[#093720]/5 border border-[#093720]/10 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-[#093720]/10 pb-6">
            <div>
              <span className="text-[#F27C53] font-bold uppercase tracking-widest text-sm mb-2 block">Statistik Lanjutan</span>
              <h2 className="text-3xl font-serif font-bold text-[#093720]">Distribusi Kelompok Usia</h2>
            </div>
            <p className="text-[#1A2721]/50 font-medium text-sm text-right">Data diukur dalam satuan Jiwa</p>
          </div>

          <div className="space-y-4">
            {demografiUsia.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-24 text-right text-sm font-bold text-[#1A2721]/60 group-hover:text-[#093720] transition-colors">
                  {item.range}
                </div>
                {/* Menggunakan bg-gradient-to-r standar standar Tailwind untuk mencegah warning */}
                <div className="flex-1 h-8 bg-[#093720]/5 rounded-r-xl overflow-hidden relative border border-[#093720]/10 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-[#093720] to-[#0c4a2a] rounded-r-xl transition-all duration-1000 ease-out flex items-center justify-end px-3 min-w-[24px]"
                    style={{ width: `${(item.jumlah / maxUsia) * 100}%` }}
                  >
                    <span className="text-xs font-bold text-white drop-shadow-md">{item.jumlah}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BAGIAN PENDIDIKAN (Recharts) */}
        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-[#093720]/5 border border-[#093720]/10 mb-16">
          <h2 className="text-3xl font-serif font-bold text-[#093720] mb-8">Berdasarkan Pendidikan</h2>
          <PendidikanChart data={dataPendidikan} />
        </div>

        {/* BAGIAN PEKERJAAN (Grid Cards) */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-[#093720] mb-8">Berdasarkan Pekerjaan</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {dataPekerjaan.map((job, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#093720]/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#093720]/20 group-hover:bg-[#F27C53] transition-colors"></div>
                <h3 className="text-sm font-bold text-[#1A2721]/60 mb-4">{job.name}</h3>
                <p className="text-4xl font-serif font-bold text-[#093720] group-hover:text-[#F27C53] transition-colors">{job.jumlah}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}