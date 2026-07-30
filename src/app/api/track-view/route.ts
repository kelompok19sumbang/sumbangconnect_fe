import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { documentId, currentViews } = await request.json();
    
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://103.82.92.95';
    const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN; 

    const response = await fetch(`${STRAPI_URL}/api/beritas/${documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`, 
      },
      body: JSON.stringify({
        data: {
          view_count: currentViews + 1
        }
      })
    });

    // CCTV 1: JIKA STRAPI MENOLAK (Misal 403 Forbidden atau 404 Not Found)
    if (!response.ok) {
        const errorText = await response.text();
        console.error("STRAPI NGAMBEK - Status:", response.status, "Pesan:", errorText);
        return NextResponse.json({ success: false, pesan_strapi: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    // CCTV 2: JIKA KONEKSI PUTUS / CRASH SISTEM
    console.error("SISTEM CRASH:", error.message);
    return NextResponse.json({ success: false, pesan_sistem: error.message }, { status: 500 });
  }
}