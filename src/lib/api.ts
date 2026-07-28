// src/lib/api.ts
import { UmkmItem } from '@/types';

export async function getUmkm(): Promise<UmkmItem[]> {
  // Ditambahkan limit 1000 agar data UMKM tidak terpotong
  const res = await fetch('http://103.82.92.95/api/umkms?populate=*&pagination[limit]=1000', {
    cache: 'no-store'
  });
  
  if (!res.ok) throw new Error('Gagal mengambil data UMKM');
  
  const json = await res.json();
  return json.data;
}

export async function getUmkmById(documentId: string): Promise<UmkmItem> {
  const url = `http://103.82.92.95/api/umkms/${documentId}?populate=foto_produk,katalog_produk.foto_produk`;
  
  const res = await fetch(url, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    const errorData = await res.text();
    console.error("DEBUG STRAPI ERROR:", errorData);
    throw new Error(`Gagal mengambil detail UMKM (Status: ${res.status})`);
  }
  
  const json = await res.json();
  return json.data;
}

// Ganti fungsi getProfilDesa di api.ts menjadi seperti ini:

export async function getProfilDesa() {
  try {
    const res = await fetch('http://103.82.92.95/api/profil-desa?populate=*', {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.error("Gagal mengambil Profil Desa");
      return null; 
    }
    
    const json = await res.json();
    return json.data;
  } catch (error) {
    // Kalau server timeout/down, error akan ditangkap di sini dan TIDAK bikin web crash
    console.error("Koneksi Timeout saat mengambil Profil Desa:", error);
    return null;
  }
}

export async function getInfografis() {
  const res = await fetch('http://103.82.92.95/api/statistik', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil data Statistik");
    return null;
  }
  
  const json = await res.json();
  return json.data;
}

export async function getPengaturanGlobal() {
  const res = await fetch('http://103.82.92.95/api/pengaturan-global', {
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil data Pengaturan Global");
    return null;
  }
  
  const json = await res.json();
  return json.data;
}

export async function getBeranda() {
  const res = await fetch('http://103.82.92.95/api/beranda?populate=*', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil data Beranda");
    return null;
  }
  
  const json = await res.json();
  return json.data;
}

// INI YANG PALING PENTING UNTUK MAPS:
export async function getFasilitas() {
  // Ditambahkan limit 1000 agar semua pin fasilitas di peta muncul
  const res = await fetch('http://103.82.92.95/api/data-fasilitas?populate=*&pagination[limit]=1000', {
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil data Fasilitas");
    return [];
  }
  
  const json = await res.json();
  return json.data;
}

export async function getFasilitasById(id: string) {
  const res = await fetch(`http://103.82.92.95/api/data-fasilitas/${id}?populate=*`, {
    cache: 'no-store'
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export async function getBerita() {
  // Ditambahkan limit 1000 agar semua berita ketarik
  const res = await fetch('http://103.82.92.95/api/data-berita?populate=*&sort=tanggal_publikasi:desc&pagination[limit]=1000', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil data Berita");
    return [];
  }
  
  const json = await res.json();
  return json.data;
}

export async function getBeritaBySlug(slug: string) {
  const res = await fetch(`http://103.82.92.95/api/data-berita?filters[slug][$eq]=${slug}&populate=*`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil detail berita");
    return null;
  }
  
  const json = await res.json();
  return json.data.length > 0 ? json.data[0] : null; 
}

export async function getLayanan() {
  // Ditambahkan limit 1000 agar semua daftar layanan muncul di accordion
  const res = await fetch('http://103.82.92.95/api/data-layanan?populate=*&pagination[limit]=1000', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil data Layanan");
    return [];
  }
  
  const json = await res.json();
  return json.data;
}

export async function getGaleri() {
  // Ditambahkan limit 1000 agar arsip galeri tidak terpotong
  const res = await fetch('http://103.82.92.95/api/data-galeri?populate=*&pagination[limit]=1000', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil data Galeri");
    return [];
  }
  
  const json = await res.json();
  return json.data;
}