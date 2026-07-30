'use client';

import { useEffect } from 'react';

export default function ViewTracker({ documentId, currentViews }: { documentId: string, currentViews: number }) {
  useEffect(() => {
    // Cek apakah user sudah membaca artikel ini di sesi browser ini
    const isTracked = sessionStorage.getItem(`viewed_${documentId}`);
    
    if (!isTracked) {
      // Tembak ke API Route internal Next.js kita
      fetch('/api/track-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId, currentViews: currentViews || 0 })
      });
      
      // Tandai sudah dibaca biar ga spam hit
      sessionStorage.setItem(`viewed_${documentId}`, 'true');
    }
  }, [documentId, currentViews]);

  return null; // Komponen ini siluman (tidak nampak di UI)
}