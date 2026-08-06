// src/components/MapInteraktif.tsx
'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Control from 'react-leaflet-custom-control';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';
import screenfull from 'screenfull';

// Fungsi Custom Pin (Emotikon tetap dipertahankan HANYA untuk di dalam peta)
const getCustomIcon = (kategori: string) => {
  let emoji = '📍';
  let bgColor = 'bg-navy'; 
  
  const safeKategori = kategori ? kategori.replace(/\s+/g, '_') : '';

  switch (safeKategori) {
    case 'Posyandu': emoji = '🏥'; bgColor = 'bg-red-500'; break;
    case 'Sekolah': emoji = '🎓'; bgColor = 'bg-blue-600'; break;
    case 'Tempat_Ibadah': emoji = '🕌'; bgColor = 'bg-emerald-500'; break;
    case 'Pemerintahan': emoji = '🏛️'; bgColor = 'bg-slate-600'; break;
    case 'Perpustakaan': emoji = '📚'; bgColor = 'bg-purple-600'; break;
    case 'Kantor_Kelurahan': emoji = '🏢'; bgColor = 'bg-blue-primary'; break;
    case 'Sarana_Olahraga': emoji = '⚽'; bgColor = 'bg-orange-500'; break;
    case 'Makam': emoji = '🕊️'; bgColor = 'bg-stone-500'; break;
    case 'UMKM': emoji = '🏪'; bgColor = 'bg-yellow-500'; break;
    // Kategori unggulan baru dengan emotikon yang benar
    case 'Unggulan_Gayatri': emoji = '🐔'; bgColor = 'bg-[#84cc16] text-navy'; break; 
    case 'Unggulan_Domba_Kesejahteraan': emoji = '🐑'; bgColor = 'bg-teal-500 text-white'; break;
    case 'Lainnya': emoji = '📍'; bgColor = 'bg-gray-500'; break;
    default: emoji = '📍'; bgColor = 'bg-navy'; break;
  }

  return L.divIcon({
    className: 'bg-transparent border-none outline-none', 
    html: `
      <div class="${bgColor} w-10 h-10 rounded-full shadow-2xl shadow-black/50 border-[3px] border-white hover:scale-110 transition-transform duration-200" 
           style="display: flex; align-items: center; justify-content: center; font-size: 20px; line-height: 1; padding-bottom: 2px;">
        ${emoji}
      </div>
      <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-white absolute -bottom-1.5 left-1/2 -translate-x-1/2 drop-shadow-md"></div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 48],
    popupAnchor: [0, -48]
  });
};

// Komponen Tombol Fullscreen kustom dengan Cleanup Memory Leak
const FullscreenButton = () => {
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleFullscreenChange = () => {
      if (screenfull.isEnabled) {
        setIsFullscreen(screenfull.isFullscreen);
        
        timeoutId = setTimeout(() => {
          if (map && map.getContainer()) {
            map.invalidateSize();
          }
        }, 100);
      }
    };

    if (screenfull.isEnabled) {
      screenfull.on('change', handleFullscreenChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleFullscreenChange);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [map]);

  const toggleFullscreen = () => {
    const mapContainer = map.getContainer();
    if (screenfull.isEnabled) {
      screenfull.toggle(mapContainer.parentElement || mapContainer);
    }
  };

  return (
    <Control position="topright">
      <button 
        onClick={toggleFullscreen}
        className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-navy/20 text-navy hover:bg-accent transition-colors font-bold flex items-center gap-2 mt-2 mr-2"
        title="Perbesar Peta"
      >
        {!isFullscreen ? (
          <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg> Perbesar</>
        ) : (
          <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> Keluar</>
        )}
      </button>
    </Control>
  );
};

export default function MapInteraktif({ dataFasilitas }: { dataFasilitas: any[] }) {
  const centerPos: [number, number] = [-7.1448, 111.8711]; 
  
  // 🔥 NORMALISASI DATA: Otomatis mengubah data "Gayatri" lama jadi "Unggulan_Gayatri"
  const normalizedData = dataFasilitas.map(item => ({
    ...item,
    kategori: item.kategori === 'Gayatri' ? 'Unggulan_Gayatri' : item.kategori
  }));

  const rawCategories = normalizedData.map(item => item.kategori).filter(Boolean);
  const categories = [...new Set([...rawCategories, 'Unggulan_Gayatri', 'Unggulan_Domba_Kesejahteraan'])];
  
  const [activeCategories, setActiveCategories] = useState<string[]>(categories as string[]);

  const toggleCategory = (kategori: string) => {
    setActiveCategories(prev => 
      prev.includes(kategori) ? prev.filter(c => c !== kategori) : [...prev, kategori]
    );
  };

  const filteredData = normalizedData.filter(item => 
    item.kategori && activeCategories.includes(item.kategori)
  );

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 bg-white p-4 rounded-3xl shadow-xl border border-navy/10 overflow-hidden">
      
      {/* SIDEBAR FILTER */}
      <div className="lg:w-1/4 bg-navy text-white p-6 rounded-2xl flex flex-col h-auto lg:h-[75vh] max-h-125 lg:max-h-none overflow-y-auto custom-scrollbar shadow-inner shrink-0">
        <h3 className="font-bold text-lg mb-6 border-b border-white/20 pb-4">Filter Peta</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={activeCategories.length === categories.length}
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
              {/* Teks tanpa emotikon, underscore diganti spasi */}
              <span className="group-hover:text-accent transition-colors text-sm font-medium">
                {kategori.replace(/_/g, ' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* AREA PETA SATELIT */}
      <div className="lg:w-3/4 h-[60vh] lg:h-[75vh] min-h-125 rounded-2xl overflow-hidden relative border-4 border-navy shadow-inner z-0">
        
        <MapContainer 
          center={centerPos} 
          zoom={16} 
          scrollWheelZoom={true} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://maps.google.com">Google Maps</a>'
            url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
            maxZoom={20}
          />

          <FullscreenButton />
          
          {filteredData.map((item) => {
            const lat = Number(item.latitude);
            const lng = Number(item.longitude);
            
            if (!lat || !lng || isNaN(lat) || isNaN(lng)) return null;
            
            const fotoUrl = item.foto_fasilitas?.[0]?.url 
              ? item.foto_fasilitas[0].url
              : 'https://via.placeholder.com/300x150?text=No+Image';

            return (
              <Marker 
                key={item.documentId || item.id} 
                position={[lat, lng]}
                icon={getCustomIcon(item.kategori)} // Emotikon hanya dipanggil di fungsi ini
              >
                <Popup className="custom-popup">
                  <div className="w-62.5 flex flex-col">
                    <img src={fotoUrl} alt={item.nama_fasilitas} className="w-full h-32 object-cover rounded-t-xl m-0" />
                    <div className="p-4 bg-white rounded-b-xl">
                      <h4 className="font-bold text-navy text-base mb-1 m-0 leading-tight">{item.nama_fasilitas}</h4>
                      
                      {/* Badge Kategori akan menampilkan teks yang bersih */}
                      <span className="inline-block bg-blue-100 text-blue-primary text-[10px] uppercase tracking-wider px-2 py-1 rounded-full mb-3 font-bold mt-2 border border-blue-primary/20">
                        {item.kategori ? item.kategori.replace(/_/g, ' ') : 'Umum'}
                      </span>
                      
                      <Link 
                        href={`/fasilitas/${item.documentId || item.id}`} 
                        className="block w-full bg-navy hover:bg-accent hover:text-navy! text-white! text-center py-2.5 rounded-lg font-bold text-sm transition-colors no-underline shadow-md border border-transparent hover:border-navy/20"
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