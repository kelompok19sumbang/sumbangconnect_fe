// src/components/MapWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const MapInteraktif = dynamic(() => import('./MapInteraktif'), {
  ssr: false,
  loading: () => (
    // Tailwind warning fixed: rounded-[2rem] -> rounded-4xl
    <div className="h-[75vh] w-full bg-forest/10 animate-pulse rounded-4xl flex items-center justify-center font-bold text-forest shadow-inner">
      Memuat Peta Satelit Interaktif...
    </div>
  )
});

export default function MapWrapper({ dataFasilitas }: { dataFasilitas: any[] }) {
  return <MapInteraktif dataFasilitas={dataFasilitas} />;
}