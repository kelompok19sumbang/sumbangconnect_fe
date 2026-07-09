'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';

// Fungsi untuk membuat Custom Pin berdasarkan Kategori
const getCustomIcon = (kategori: string) => {
  let emoji = '📍';
  let bgColor = 'bg-forest';

  switch (kategori) {
    case 'Sekolah':
      emoji = '🎓'; bgColor = 'bg-blue-600'; break;
    case 'Posyandu':
      emoji = '🏥'; bgColor = 'bg-red-500'; break;
    case 'Tempat_Ibadah':
      emoji = '🕌'; bgColor = 'bg-emerald-500'; break;
    case 'Bank_Sampah':
      emoji = '♻️'; bgColor = 'bg-green-600'; break;
    case 'Sarana_Olahraga':
      emoji = '⚽'; bgColor = 'bg-orange-500'; break;
    case 'Kantor_Kelurahan':
      emoji = '🏢'; bgColor = 'bg-indigo-600'; break;
    default:
      emoji = '📍'; bgColor = 'bg-terracotta'; break;
  }

  return L.divIcon({
    className: 'custom-pin',
    html: `<div class="${bgColor} text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg border-2 border-white text-xl">${emoji}</div>`,
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

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return <div className="h-[600px] w-full bg-gray-100 animate-pulse rounded-2xl"></div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-white p-4 rounded-3xl shadow-xl border border-forest/10 overflow-hidden">
      
      {/* SIDEBAR FILTER */}
      <div className="lg:w-1/4 bg-[#1F2937] text-white p-6 rounded-2xl flex flex-col h-[600px] overflow-y-auto">
        <h3 className="font-bold text-lg mb-6 border-b border-white/20 pb-4">Filter Fasilitas</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={activeCategories.length === categories.length && categories.length > 0}
              onChange={() => setActiveCategories(activeCategories.length === categories.length ? [] : categories as string[])}
              className="w-5 h-5 rounded bg-white/10 border-white/30 text-terracotta focus:ring-terracotta cursor-pointer"
            />
            <span className="group-hover:text-terracotta transition-colors font-medium">Semua Sektor</span>
          </label>
          <div className="h-px bg-white/10 my-2"></div>
          {categories.map((kategori: any) => (
            <label key={kategori} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={activeCategories.includes(kategori)}
                onChange={() => toggleCategory(kategori)}
                className="w-5 h-5 rounded bg-white/10 border-white/30 text-terracotta focus:ring-terracotta cursor-pointer"
              />
              <span className="group-hover:text-terracotta transition-colors text-sm">
                {kategori.replace(/_/g, ' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* AREA PETA */}
      <div className="lg:w-3/4 h-[600px] rounded-2xl overflow-hidden z-0 relative">
        <MapContainer center={centerPos} zoom={14} scrollWheelZoom={true} className="w-full h-full">
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredData.map((item) => {
            if (!item.latitude || !item.longitude) return null;
            
            const fotoUrl = item.foto_fasilitas?.[0]?.url 
              ? `http://127.0.0.1:1337${item.foto_fasilitas[0].url}`
              : 'https://via.placeholder.com/300x150?text=No+Image';

            return (
              <Marker 
                key={item.documentId || item.id} 
                position={[item.latitude, item.longitude]}
                icon={getCustomIcon(item.kategori)}
              >
                <Popup className="custom-popup">
                  <div className="w-[250px] flex flex-col">
                    <img src={fotoUrl} alt={item.nama_fasilitas} className="w-full h-32 object-cover rounded-t-xl m-0" />
                    <div className="p-4 bg-white rounded-b-xl">
                      <h4 className="font-bold text-dark text-base mb-1 m-0 leading-tight">{item.nama_fasilitas}</h4>
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mb-3">
                        {item.kategori ? item.kategori.replace(/_/g, ' ') : 'Umum'}
                      </span>
                      {/* Tombol Diarahkan ke Halaman Detail */}
                      <Link 
                        href={`/fasilitas/${item.documentId}`} 
                        className="block w-full bg-[#1A56DB] hover:bg-blue-700 text-white text-center py-2 rounded-lg font-medium text-sm transition-colors no-underline"
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