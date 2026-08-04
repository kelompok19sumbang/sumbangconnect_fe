// src/components/OrgChart.tsx
"use client";

import { useState } from 'react';

type Perangkat = {
  id: number | string;
  nama: string;
  jabatan: string;
  biografi: string;
  foto_url: string;
  level: number; 
};

export default function OrgChart({ data }: { data: Perangkat[] }) {
  const [selectedPerson, setSelectedPerson] = useState<Perangkat | null>(null);

  // Filter Data
  const lurah = data.find(p => p.level === 1);
  const sekdes = data.find(p => p.level === 2);
  const stafSekdes = data.filter(p => p.level === 21);
  
  const kasiPem = data.find(p => p.level === 31);
  const stafPem = data.filter(p => p.level === 311);
  
  const kasiKesra = data.find(p => p.level === 32);
  const stafKesra = data.filter(p => p.level === 321);

  const CardPerson = ({ person }: { person?: Perangkat }) => {
    if (!person) return (
      <div className="w-28 sm:w-36 border-2 border-dashed border-navy/20 rounded-xl p-4 text-center text-xs text-navy/40 font-medium">
        Data Belum Diisi
      </div>
    );

    return (
      <div 
        onClick={() => setSelectedPerson(person)}
        className="flex flex-col items-center group cursor-pointer w-28 sm:w-40 z-10 mx-1 sm:mx-2"
      >
        <div className="w-20 sm:w-28 aspect-[4/5] rounded-t-full rounded-b-2xl overflow-hidden border-[3px] border-white shadow-lg shadow-navy/10 mb-3 relative group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-300 bg-navy/5 shrink-0">
          <img 
            src={person.foto_url} 
            alt={person.nama} 
            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <h4 className="font-bold text-navy text-center text-xs sm:text-sm leading-tight group-hover:text-blue-primary transition-colors">{person.nama}</h4>
        <p className="text-[10px] sm:text-xs text-accent font-semibold bg-navy px-2 sm:px-3 py-1 rounded-full mt-1.5 text-center line-clamp-2 leading-tight shadow-sm">
          {person.jabatan}
        </p>
      </div>
    );
  };

  // 🔥 FIX: Komponen StaffGroup dengan garis pencabangan otomatis presisi
  const StaffGroup = ({ staffs }: { staffs: Perangkat[] }) => {
    if (!staffs || staffs.length === 0) return null;
    return (
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center">
          {staffs.map((p, i) => (
            <div key={p.id} className="flex-1 flex flex-col items-center relative">
              {/* Garis Horizontal Cabang */}
              {staffs.length > 1 && (
                <div className={`absolute top-0 border-t-4 border-navy/30 ${
                  i === 0 ? 'right-0 w-1/2' : i === staffs.length - 1 ? 'left-0 w-1/2' : 'w-full'
                }`}></div>
              )}
              {/* Garis Vertikal Turun ke Foto */}
              <div className="w-1 h-6 sm:h-8 bg-navy/30"></div>
              <CardPerson person={p} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full py-10 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing">
      <div className="min-w-[900px] flex flex-col items-center relative pb-10">
        
        {/* ================= LEVEL 1: LURAH ================= */}
        <CardPerson person={lurah} />
        {/* Tiang Utama dari Lurah */}
        <div className="w-1 h-8 sm:h-12 bg-navy/30"></div>

        {/* ================= LEVEL 2: SEKRETARIS ================= */}
        <div className="flex w-full max-w-4xl justify-center items-stretch">
          
          {/* SISI KIRI: Sekdes */}
          <div className="flex-1 flex flex-col items-center relative">
            {/* Garis dari tengah menyambung ke kiri */}
            <div className="absolute top-0 right-0 w-1/2 border-t-4 border-navy/30"></div>
            {/* Garis turun ke foto Sekdes */}
            <div className="w-1 h-6 sm:h-8 bg-navy/30"></div>
            
            <CardPerson person={sekdes} />
            <StaffGroup staffs={stafSekdes} />
          </div>

          {/* SISI TENGAH: Tiang Utama Lanjut Ke Bawah */}
          <div className="w-1 bg-navy/30"></div>

          {/* SISI KANAN: Kosong (Buat Penyeimbang agar tiang utama tetap di tengah) */}
          <div className="flex-1"></div>
        </div>

        {/* ================= LEVEL 3: KASI ================= */}
        <div className="flex w-full max-w-4xl justify-center items-stretch">
           
           {/* SISI KIRI: Kasi Pem */}
           <div className="flex-1 flex flex-col items-center relative">
             <div className="absolute top-0 right-0 w-1/2 border-t-4 border-navy/30"></div>
             <div className="w-1 h-6 sm:h-8 bg-navy/30"></div>
             
             <CardPerson person={kasiPem} />
             <StaffGroup staffs={stafPem} />
           </div>

           {/* SISI KANAN: Kasi Kesra */}
           <div className="flex-1 flex flex-col items-center relative">
             <div className="absolute top-0 left-0 w-1/2 border-t-4 border-navy/30"></div>
             <div className="w-1 h-6 sm:h-8 bg-navy/30"></div>
             
             <CardPerson person={kasiKesra} />
             <StaffGroup staffs={stafKesra} />
           </div>
           
        </div>
      </div>

      {/* ================= POPUP MODAL BIOGRAFI ================= */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-sm" onClick={() => setSelectedPerson(null)}></div>
          <div className="bg-white rounded-[2rem] w-full max-w-md p-6 sm:p-8 relative z-10 animate-fade-up shadow-2xl border border-navy/10">
            <button 
              onClick={() => setSelectedPerson(null)}
              className="absolute top-4 right-4 bg-navy/5 hover:bg-red-500 hover:text-white text-navy p-2 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="flex flex-col items-center mt-2">
              <div className="w-28 sm:w-32 aspect-[4/5] rounded-t-full rounded-b-3xl overflow-hidden border-4 border-accent shadow-lg mb-5 bg-navy/5">
                <img src={selectedPerson.foto_url} alt={selectedPerson.nama} className="w-full h-full object-cover object-top" />
              </div>
              
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-navy text-center">{selectedPerson.nama}</h3>
              <p className="text-blue-primary font-bold uppercase tracking-widest text-[10px] sm:text-xs mt-2 mb-6 bg-blue-primary/10 px-4 py-1.5 rounded-full text-center">
                {selectedPerson.jabatan}
              </p>
              
              <div className="w-full bg-cream p-5 rounded-2xl border border-navy/5 text-navy/80 text-sm leading-relaxed max-h-[40vh] overflow-y-auto">
                {selectedPerson.biografi ? selectedPerson.biografi : 'Biografi belum ditambahkan.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}