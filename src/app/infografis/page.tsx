// src/app/infografis/page.tsx
import { getInfografis } from '@/lib/api';
import { PendidikanChart } from '@/components/DataCharts';
import CountUp from '@/components/CountUp';
import AnimatedBar from '@/components/AnimatedBar';
import BlurText from '@/components/BlurText';

export default async function Infografis() {
  const data = await getInfografis();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-navy font-bold tracking-wide">Data Infografis belum tersedia.</p>
      </div>
    );
  }

  const persenPria = Math.round((data.pria / data.populasi_total) * 100) || 0;
  const persenWanita = Math.round((data.wanita / data.populasi_total) * 100) || 0;
  const persenSawah = Math.round((data.luas_sawah / data.luas_total) * 100) || 0;
  const persenKering = Math.round((data.luas_kering / data.luas_total) * 100) || 0;

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

  const maxUsia = Math.max(...demografiUsia.map(u => u.jumlah), 1); 

  const dataPendidikan = [
    { name: 'Tidak/Belum Sekolah', jumlah: 176 },
    { name: 'Belum Tamat SD', jumlah: 204 },
    { name: 'Tamat SD', jumlah: 288 },
    { name: 'SLTP/Sederajat', jumlah: 140 },
    { name: 'SLTA/Sederajat', helper: '', jumlah: 285 },
    { name: 'Diploma I/II', jumlah: 21 },
    { name: 'Sarjana/D4', jumlah: 25 },
  ];

  const dataPekerjaan = [
    { name: 'Pelajar/Mahasiswa', jumlah: 325 },
    { name: 'Belum/Tidak Bekerja', jumlah: 273 },
    { name: 'Mengurus Rumah Tangga', jumlah: 271 },
    { name: 'Karyawan Swasta', jumlah: 116 },
    { name: 'Nelayan/Perikanan', jumlah: 49 },
    { name: 'Petani/Pekebun', jumlah: 39 },
  ];

  // ✅ DATA KESEHATAN
  const dataKesehatan = [
    { name: 'TBC', jumlah: data.penyakit_tbc || 0, isAlert: false },
    { name: 'Demam Berdarah (DBD)', jumlah: data.penyakit_dbd || 0, isAlert: false },
    { name: 'Kasus Stunting', jumlah: data.stunting || 0, isAlert: false },
    { name: 'Diabetes Melitus', jumlah: data.penyakit_diabetes || 0, isAlert: false },
    { name: 'Serangan Jantung', jumlah: data.penyakit_jantung || 0, isAlert: true },
    { name: 'Stroke', jumlah: data.penyakit_stroke || 0, isAlert: true },
    { name: 'HIV / AIDS', jumlah: data.penyakit_hiv || 0, isAlert: true },
    { name: 'Leptospirosis', jumlah: data.penyakit_leptospirosis || 0, isAlert: true },
    { name: 'Difteri', jumlah: data.penyakit_difteri || 0, isAlert: true },
  ];

  // 🔥 DATA PENDUDUK PER RT (Contoh 10 RT, tambahkan jika RT lebih banyak)
  // Tarik dari Strapi (data.penduduk_rt_01 dll). Kalau kosong, pakai angka cadangan.
// 🔥 DATA PENDUDUK 29 RT
  const dataRT = [
    { name: 'RT 01', jumlah: data.penduduk_rt_01 || 0 },
    { name: 'RT 02', jumlah: data.penduduk_rt_02 || 0 },
    { name: 'RT 03', jumlah: data.penduduk_rt_03 || 0 },
    { name: 'RT 04', jumlah: data.penduduk_rt_04 || 0 },
    { name: 'RT 05', jumlah: data.penduduk_rt_05 || 0 },
    { name: 'RT 06', jumlah: data.penduduk_rt_06 || 0 },
    { name: 'RT 07', jumlah: data.penduduk_rt_07 || 0 },
    { name: 'RT 08', jumlah: data.penduduk_rt_08 || 0 },
    { name: 'RT 09', jumlah: data.penduduk_rt_09 || 0 },
    { name: 'RT 10', jumlah: data.penduduk_rt_10 || 0 },
    { name: 'RT 11', jumlah: data.penduduk_rt_11 || 0 },
    { name: 'RT 12', jumlah: data.penduduk_rt_12 || 0 },
    { name: 'RT 13', jumlah: data.penduduk_rt_13 || 0 },
    { name: 'RT 14', jumlah: data.penduduk_rt_14 || 0 },
    { name: 'RT 15', jumlah: data.penduduk_rt_15 || 0 },
    { name: 'RT 16', jumlah: data.penduduk_rt_16 || 0 },
    { name: 'RT 17', jumlah: data.penduduk_rt_17 || 0 },
    { name: 'RT 18', jumlah: data.penduduk_rt_18 || 0 },
    { name: 'RT 19', jumlah: data.penduduk_rt_19 || 0 },
    { name: 'RT 20', jumlah: data.penduduk_rt_20 || 0 },
    { name: 'RT 21', jumlah: data.penduduk_rt_21 || 0 },
    { name: 'RT 22', jumlah: data.penduduk_rt_22 || 0 },
    { name: 'RT 23', jumlah: data.penduduk_rt_23 || 0 },
    { name: 'RT 24', jumlah: data.penduduk_rt_24 || 0 },
    { name: 'RT 25', jumlah: data.penduduk_rt_25 || 0 },
    { name: 'RT 26', jumlah: data.penduduk_rt_26 || 0 },
    { name: 'RT 27', jumlah: data.penduduk_rt_27 || 0 },
    { name: 'RT 28', jumlah: data.penduduk_rt_28 || 0 },
    { name: 'RT 29', jumlah: data.penduduk_rt_29 || 0 },
  ];
  const maxPendudukRT = Math.max(...dataRT.map(r => r.jumlah), 1);

  return (
    <main className="min-h-screen bg-cream font-sans pb-32">
      
      {/* ================= HEADER (GRADASI BIRU + SUPERGRAFIS + BLURTEXT) ================= */}
      <div className="bg-gradient-to-br from-navy via-blue-primary to-blue-cyan text-white pt-20 pb-32 px-6 lg:px-8 relative overflow-hidden rounded-b-[4rem] shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-light/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        {/* ================= MOTIF SUPERGRAFIS AESTHETIC ================= */}
        <svg className="absolute inset-0 w-full h-full text-white/10 pointer-events-none z-0" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,300 C300,100 500,600 1000,300 C1300,150 1500,400 1600,450" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M-50,330 C320,140 480,630 1020,330" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <circle cx="1150" cy="200" r="6" fill="currentColor" />
          <circle cx="1175" cy="180" r="3.5" fill="currentColor" opacity="0.7" />
          <circle cx="1195" cy="210" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="1220" cy="190" r="1.5" fill="currentColor" opacity="0.3" />
        </svg>

        <svg className="absolute top-0 right-0 w-[40rem] h-[40rem] text-white/10 pointer-events-none z-0 rotate-12" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M450,-50 C250,100 150,400 500,500" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M480,-20 C290,120 190,400 520,480" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {/* ================================================================= */}

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-up">
        
          <div className="flex flex-wrap justify-center items-center gap-x-3 mb-6">
            <BlurText 
              text="Infografis" 
              delay={50} 
              animateBy="words" 
              direction="bottom" 
              className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-white" 
            />
            <BlurText 
              text="Kelurahan" 
              delay={200} 
              animateBy="words" 
              direction="bottom" 
              className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-accent italic font-light" 
            />
          </div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
            Transparansi data kependudukan, pemetaan wilayah, dan statistik Kelurahan Sumbang secara aktual.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        
        {/* 4 Highlight Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-navy/5 border border-navy/10 text-center flex flex-col justify-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-navy/15 transition-all duration-300 animate-fade-up group" style={{animationDelay: '0.1s'}}>
            <span className="text-navy/50 text-sm font-bold uppercase tracking-wider mb-2">Total Penduduk</span>
            <span className="text-4xl font-serif font-bold bg-gradient-to-br from-navy to-blue-primary bg-clip-text text-transparent group-hover:from-blue-primary group-hover:to-blue-cyan transition-colors duration-300">
              <CountUp from={0} to={data.populasi_total || 0} separator="." duration={1.5} delay={0.1} />
            </span>
            <span className="text-blue-primary text-xs font-bold mt-1">Jiwa</span>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-navy/5 border border-navy/10 text-center flex flex-col justify-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-navy/15 transition-all duration-300 animate-fade-up group" style={{animationDelay: '0.2s'}}>
            <span className="text-navy/50 text-sm font-bold uppercase tracking-wider mb-2">Luas Wilayah</span>
            <span className="text-4xl font-serif font-bold bg-gradient-to-br from-navy to-blue-primary bg-clip-text text-transparent group-hover:from-blue-primary group-hover:to-blue-cyan transition-colors duration-300">
              <CountUp from={0} to={data.luas_total || 0} separator="." duration={1.5} delay={0.2} />
            </span>
            <span className="text-blue-primary text-xs font-bold mt-1">Hektar (Ha)</span>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-navy/5 border border-navy/10 text-center flex flex-col justify-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-navy/15 transition-all duration-300 animate-fade-up group" style={{animationDelay: '0.3s'}}>
            <span className="text-navy/50 text-sm font-bold uppercase tracking-wider mb-2">Kepadatan</span>
            <span className="text-4xl font-serif font-bold bg-gradient-to-br from-navy to-blue-primary bg-clip-text text-transparent group-hover:from-blue-primary group-hover:to-blue-cyan transition-colors duration-300">
              <CountUp from={0} to={data.kepadatan || 0} separator="." duration={1.5} delay={0.3} />
            </span>
            <span className="text-blue-primary text-xs font-bold mt-1">Jiwa / Ha</span>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-navy/5 border border-navy/10 text-center flex flex-col justify-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-navy/15 transition-all duration-300 animate-fade-up group" style={{animationDelay: '0.4s'}}>
            <span className="text-navy/50 text-sm font-bold uppercase tracking-wider mb-2">Administratif</span>
            <div className="text-3xl font-serif font-bold bg-gradient-to-br from-navy to-blue-primary bg-clip-text text-transparent group-hover:from-blue-primary group-hover:to-blue-cyan transition-colors duration-300 flex justify-center gap-4">
              <div>
                <CountUp from={0} to={data.rw || 0} duration={1.5} delay={0.4} /> 
                <span className="text-blue-primary text-xs block">RW</span>
              </div>
              <div className="text-navy/20">/</div>
              <div>
                <CountUp from={0} to={data.rt || 0} duration={1.5} delay={0.5} /> 
                <span className="text-blue-primary text-xs block">RT</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Kolom Komposisi (Gender & Lahan) */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-navy/5 p-8 rounded-[2.5rem] border border-navy/10 hover:shadow-xl hover:shadow-navy/5 transition-all duration-300">
            <h3 className="text-2xl font-serif font-bold text-navy mb-8">Komposisi Penduduk</h3>
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-sm font-bold text-navy/50 uppercase tracking-widest">Laki-laki</p>
                <p className="text-3xl font-bold text-navy">
                  <CountUp from={0} to={data.pria || 0} separator="." duration={1.5} delay={0.6} />
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-navy/50 uppercase tracking-widest">Perempuan</p>
                <p className="text-3xl font-bold text-blue-primary">
                  <CountUp from={0} to={data.wanita || 0} separator="." duration={1.5} delay={0.7} />
                </p>
              </div>
            </div>
            <div className="w-full h-6 rounded-full overflow-hidden flex bg-white border border-navy/10 shadow-inner group">
              <div className="h-full bg-navy relative flex items-center px-3 transition-all duration-1000 ease-out" style={{ width: `${persenPria}%` }}>
                <span className="text-[10px] font-bold text-white/80">{persenPria}%</span>
              </div>
              <div className="h-full bg-blue-primary relative flex justify-end items-center px-3 transition-all duration-1000 ease-out" style={{ width: `${persenWanita}%` }}>
                <span className="text-[10px] font-bold text-white/90">{persenWanita}%</span>
              </div>
            </div>
          </div>

          <div className="bg-navy/5 p-8 rounded-[2.5rem] border border-navy/10 hover:shadow-xl hover:shadow-navy/5 transition-all duration-300">
            <h3 className="text-2xl font-serif font-bold text-navy mb-8">Penggunaan Lahan</h3>
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-sm font-bold text-navy/50 uppercase tracking-widest">Sawah</p>
                <p className="text-3xl font-bold text-navy">
                  <CountUp from={0} to={data.luas_sawah || 0} separator="." duration={1.5} delay={0.8} /> <span className="text-sm">Ha</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-navy/50 uppercase tracking-widest">Kering/Darat</p>
                <p className="text-3xl font-bold text-blue-primary">
                  <CountUp from={0} to={data.luas_kering || 0} separator="." duration={1.5} delay={0.9} /> <span className="text-sm">Ha</span>
                </p>
              </div>
            </div>
            <div className="w-full h-6 rounded-full overflow-hidden flex bg-white border border-navy/10 shadow-inner">
              <div className="h-full bg-navy relative flex items-center px-3 transition-all duration-1000 ease-out" style={{ width: `${persenSawah}%` }}>
                <span className="text-[10px] font-bold text-white/80">{persenSawah}%</span>
              </div>
              <div className="h-full bg-blue-primary relative flex justify-end items-center px-3 transition-all duration-1000 ease-out" style={{ width: `${persenKering}%` }}>
                <span className="text-[10px] font-bold text-white/90">{persenKering}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 TAMBAHAN BARU: SEBARAN PENDUDUK PER RT 🔥 */}
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-navy/5 border border-navy/10 mb-16 hover:shadow-navy/10 transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-navy/10 pb-6">
            <div>
              <span className="text-blue-primary font-bold uppercase tracking-widest text-sm mb-2 block">Pemetaan Wilayah</span>
              <h2 className="text-3xl font-serif font-bold text-navy">Sebaran Penduduk per RT</h2>
            </div>
            <p className="text-navy/50 font-medium text-sm text-right">Data diukur dalam satuan Jiwa</p>
          </div>

          {/* Menggunakan format 2 Kolom (Grid) agar menghemat tempat */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-5">
            {dataRT.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-16 text-right text-sm font-bold text-navy/60 group-hover:text-navy transition-colors">
                  {item.name}
                </div>
                <div className="flex-1 h-8 bg-navy/5 rounded-r-xl overflow-hidden relative border border-navy/10 shadow-inner">
                  <AnimatedBar 
                    widthPercent={(item.jumlah / maxPendudukRT) * 100} 
                    value={item.jumlah} 
                    delay={0.1 + (idx * 0.05)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demografi Usia */}
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-navy/5 border border-navy/10 mb-16 hover:shadow-navy/10 transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-navy/10 pb-6">
            <div>
              <span className="text-blue-primary font-bold uppercase tracking-widest text-sm mb-2 block">Statistik Lanjutan</span>
              <h2 className="text-3xl font-serif font-bold text-navy">Distribusi Kelompok Usia</h2>
            </div>
            <p className="text-navy/50 font-medium text-sm text-right">Data diukur dalam satuan Jiwa</p>
          </div>

          <div className="space-y-4">
            {demografiUsia.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-24 text-right text-sm font-bold text-navy/60 group-hover:text-navy transition-colors">
                  {item.range}
                </div>
                <div className="flex-1 h-8 bg-navy/5 rounded-r-xl overflow-hidden relative border border-navy/10 shadow-inner">
                  <AnimatedBar 
                    widthPercent={(item.jumlah / maxUsia) * 100} 
                    value={item.jumlah} 
                    delay={0.2 + (idx * 0.05)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BAGIAN PENDIDIKAN */}
        <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-navy/5 border border-navy/10 mb-16">
          <h2 className="text-3xl font-serif font-bold text-navy mb-8">Berdasarkan Pendidikan</h2>
          <PendidikanChart data={dataPendidikan} />
        </div>

        {/* BAGIAN PEKERJAAN */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-navy mb-8">Berdasarkan Pekerjaan</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {dataPekerjaan.map((job, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-navy/10 shadow-sm hover:shadow-xl hover:shadow-navy/15 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group cursor-default">
                <div className="absolute top-0 left-0 w-1 h-full bg-navy/20 group-hover:bg-blue-primary transition-colors"></div>
                <h3 className="text-sm font-bold text-navy/60 mb-4">{job.name}</h3>
                <p className="text-4xl font-serif font-bold bg-gradient-to-br from-navy to-blue-primary bg-clip-text text-transparent group-hover:from-blue-primary group-hover:to-blue-cyan transition-colors duration-300">
                  <CountUp from={0} to={job.jumlah} separator="." duration={1.5} delay={0.2 + (idx * 0.1)} />
                </p>
                <span className="text-xs text-navy/40 font-medium mt-2 block">Jiwa</span>
              </div>
            ))}
          </div>
        </div>

       {/* ✅ BAGIAN KESEHATAN */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-navy mb-8">Data Kesehatan & Peringatan Dini</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {dataKesehatan.map((penyakit, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-navy/10 shadow-sm hover:shadow-xl hover:shadow-navy/15 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group cursor-default">
                
                <div className={`absolute top-0 left-0 w-1 h-full transition-colors ${
                  penyakit.isAlert ? 'bg-red-500/50 group-hover:bg-red-500' : 'bg-accent/50 group-hover:bg-accent'
                }`}></div>
                
                <h3 className="text-sm font-bold text-navy/60 mb-4 flex items-center justify-between">
                  {penyakit.name}
                  {penyakit.isAlert && (
                    <span className="flex h-2.5 w-2.5 relative" title="Risiko Tinggi / Perlu Kewaspadaan">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                  )}
                </h3>
                
                <p className="text-4xl font-serif font-bold bg-gradient-to-br from-navy to-blue-primary bg-clip-text text-transparent group-hover:from-blue-primary group-hover:to-blue-cyan transition-colors duration-300">
                  <CountUp from={0} to={penyakit.jumlah} separator="." duration={1.5} delay={0.2 + (idx * 0.1)} />
                </p>
                <span className="text-xs text-navy/40 font-medium mt-2 block">Kasus tercatat</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main> 
  );
}