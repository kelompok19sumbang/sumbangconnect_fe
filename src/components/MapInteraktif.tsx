// src/components/MapInteraktif.tsx
'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';

// Fungsi untuk membuat Custom Pin berdasarkan Kategori
const getCustomIcon = (kategori: string) => {
  let emoji = '📍';
  let bgColor = 'bg-navy'; // Warna default

  switch (kategori) {
    case 'Posyandu':
      emoji = '🏥'; bgColor = 'bg-red-500'; break;
    case 'Sekolah':
      emoji = '🎓'; bgColor = 'bg-blue-600'; break;
    case 'Tempat_Ibadah':
      emoji = '🕌'; bgColor = 'bg-emerald-500'; break;
    case 'Pemerintahan':
      emoji = '🏛️'; bgColor = 'bg-slate-600'; break;
    case 'Perpustakaan':
      emoji = '📚'; bgColor = 'bg-purple-600'; break;
    case 'Kantor_Kelurahan':
      emoji = '🏢'; bgColor = 'bg-blue-primary'; break;
    case 'Sarana_Olahraga':
      emoji = '⚽'; bgColor = 'bg-orange-500'; break;
    case 'Makam':
      emoji = '🕊️'; bgColor = 'bg-stone-500'; break;
    case 'UMKM':
      emoji = '🏪'; bgColor = 'bg-yellow-500'; break;
    case 'Lainnya':
      emoji = '📍'; bgColor = 'bg-gray-500'; break;
    default:
      emoji = '📍'; bgColor = 'bg-navy'; break;
  }

  return L.divIcon({
    className: 'bg-transparent border-none outline-none', 
    html: `
      <div class="${bgColor} w-10 h-10 rounded-full shadow-xl border-2 border-white" 
           style="display: flex; align-items: center; justify-content: center; font-size: 20px; line-height: 1; padding-bottom: 2px;">
        ${emoji}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

export default function MapInteraktif({ dataFasilitas }: { dataFasilitas: any[] }) {
  const centerPos: [number, number] = [-7.1448, 111.8711]; 
  
  const categories = [...new Set(dataFasilitas.map(item => item.kategori).filter(Boolean))];
  const [activeCategories, setActiveCategories] = useState<string[]>(categories as string[]);

  const toggleCategory = (kategori: string) => {
    setActiveCategories(prev => 
      prev.includes(kategori) ? prev.filter(c => c !== kategori) : [...prev, kategori]
    );
  };

  const filteredData = dataFasilitas.filter(item => 
    item.kategori && activeCategories.includes(item.kategori)
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-white p-4 rounded-3xl shadow-xl border border-navy/10 overflow-hidden">
      
      {/* SIDEBAR FILTER */}
      <div className="lg:w-1/4 bg-navy text-white p-6 rounded-2xl flex flex-col h-[600px] overflow-y-auto custom-scrollbar">
        <h3 className="font-bold text-lg mb-6 border-b border-white/20 pb-4">Filter Fasilitas</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={activeCategories.length === categories.length && categories.length > 0}
              onChange={() => setActiveCategories(activeCategories.length === categories.length ? [] : categories as string[])}
              className="w-5 h-5 rounded bg-white/10 border-white/30 text-accent focus:ring-accent cursor-pointer"
            />
            <span className="group-hover:text-accent transition-colors font-medium">Semua Sektor</span>
          </label>
          <div className="h-px bg-white/10 my-2"></div>
          
          {categories.map((kategori: any) => (
            <label key={kategori} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={activeCategories.includes(kategori)}
                onChange={() => toggleCategory(kategori)}
                className="w-5 h-5 rounded bg-white/10 border-white/30 text-accent focus:ring-accent cursor-pointer"
              />
              <span className="group-hover:text-accent transition-colors text-sm">
                {kategori.replace(/_/g, ' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* AREA PETA (Ditambah bg-gray-100 sebagai pengaman visual saat loading) */}
      <div className="lg:w-3/4 h-[600px] rounded-2xl overflow-hidden relative border border-navy/10 bg-gray-100 z-0">
        
        {/* KUNCI FIX: Gunakan inline style wajib untuk menimpa aturan default */}
        <MapContainer 
          center={centerPos} 
          zoom={14} 
          scrollWheelZoom={true} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredData.map((item) => {
            const lat = Number(item.latitude);
            const lng = Number(item.longitude);
            
            // Pengaman ekstra jika ada input huruf yang berubah jadi NaN (Not a Number)
            if (!lat || !lng || isNaN(lat) || isNaN(lng)) return null;
            
            // ✅ IP VPS DIHAPUS, CUKUP PATH RELATIF
            const fotoUrl = item.foto_fasilitas?.[0]?.url 
              ? item.foto_fasilitas[0].url
              : 'https://via.placeholder.com/300x150?text=No+Image';

            return (
              <Marker 
                key={item.documentId || item.id} 
                position={[lat, lng]}
                icon={getCustomIcon(item.kategori)}
              >
                <Popup className="custom-popup">
                  <div className="w-[250px] flex flex-col">
                    <img src={fotoUrl} alt={item.nama_fasilitas} className="w-full h-32 object-cover rounded-t-xl m-0" />
                    <div className="p-4 bg-white rounded-b-xl">
                      <h4 className="font-bold text-navy text-base mb-1 m-0 leading-tight">{item.nama_fasilitas}</h4>
                      <span className="inline-block bg-blue-100 text-blue-primary text-xs px-2 py-1 rounded-full mb-3 font-bold mt-2">
                        {item.kategori ? item.kategori.replace(/_/g, ' ') : 'Umum'}
                      </span>
                      
                      <Link 
                        href={`/fasilitas/${item.documentId || item.id}`} 
                        className="block w-full bg-navy hover:bg-accent hover:!text-navy !text-white text-center py-2.5 rounded-lg font-bold text-sm transition-colors no-underline shadow-md"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}