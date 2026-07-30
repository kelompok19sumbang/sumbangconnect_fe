// src/components/ViewTracker.tsx
'use client';
import { useEffect } from 'react';

export default function ViewTracker({ documentId, currentViews }: { documentId: string, currentViews: number }) {
  useEffect(() => {
    // Tembak API Strapi pakai method PUT untuk update view_count
    fetch(`http://127.0.0.1:1337/api/data-berita/${documentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: { view_count: (currentViews || 0) + 1 }
      })
    }).catch(console.error); // Error dibiarkan silent agar web tidak crash
  }, [documentId, currentViews]);

  return null; // Komponen ini invisible (tidak merender apa-apa di layar)
}