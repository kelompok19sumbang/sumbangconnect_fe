// src/components/MapWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

// Import komponen peta ke dalam Client Component ini dengan ssr: false
const MapInteraktif = dynamic(() => import('./MapInteraktif'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-forest/10 animate-pulse rounded-[2rem] flex items-center justify-center font-bold text-forest">
      Memuat Peta Interaktif...
    </div>
  )
});

export default function MapWrapper({ dataFasilitas }: { dataFasilitas: any[] }) {
  return <MapInteraktif dataFasilitas={dataFasilitas} />;
}