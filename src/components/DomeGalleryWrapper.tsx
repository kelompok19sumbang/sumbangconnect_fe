// src/components/DomeGalleryWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

// Dynamic import dipindahkan ke sini karena file ini resmi menjadi Client Component
const DomeGallery = dynamic(() => import('./DomeGallery'), { ssr: false });

export default DomeGallery;