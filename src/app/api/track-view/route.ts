// src/app/api/track-view/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { documentId, currentViews } = await request.json();
    
    // NAMA VARIABEL SUDAH SINKRON DENGAN VERCEL & FALLBACK PAKAI IP VPS
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://103.82.92.95';
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN; 

    // Kirim request UPDATE (PUT) ke Strapi
    const response = await fetch(`${STRAPI_URL}/api/beritas/${documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`, // Tembus keamanan Strapi
      },
      body: JSON.stringify({
        data: {
          view_count: currentViews + 1
        }
      })
    });

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}