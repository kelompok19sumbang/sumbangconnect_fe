// src/lib/api.ts
import { UmkmItem } from '@/types';

export async function getUmkm(): Promise<UmkmItem[]> {
  const res = await fetch('http://127.0.0.1:1337/api/umkms?populate=*', {
    cache: 'no-store'
  });
  
  if (!res.ok) throw new Error('Gagal mengambil data UMKM');
  
  const json = await res.json();
  return json.data;
}

// Tambahkan fungsi baru ini di bawah
export async function getUmkmById(documentId: string): Promise<UmkmItem> {
  // Kita ubah penulisan populate menggunakan "dot notation" (koma dan titik)
  // Cara ini jauh lebih aman dari error karakter URL
  const url = `http://127.0.0.1:1337/api/umkms/${documentId}?populate=foto_produk,katalog_produk.foto_produk`;
  
  const res = await fetch(url, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    // Tambahan: Agar kalau error lagi, kita tahu pesan aslinya dari Strapi apa
    const errorData = await res.text();
    console.error("DEBUG STRAPI ERROR:", errorData);
    throw new Error(`Gagal mengambil detail UMKM (Status: ${res.status})`);
  }
  
  const json = await res.json();
  return json.data;
}

export async function getProfilDesa() {
  const res = await fetch('http://127.0.0.1:1337/api/profil-desa?populate=*', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil Profil Desa:", await res.text());
    return null; // Mengembalikan null jika belum ada data agar web tidak crash
  }
  
  const json = await res.json();
  return json.data;
}

// src/lib/api.ts

export async function getInfografis() {
  // Arahkan ke endpoint statistik yang baru kita buat
  const res = await fetch('http://127.0.0.1:1337/api/statistik', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil data Statistik");
    return null;
  }
  
  const json = await res.json();
  return json.data;
}

// src/lib/api.ts

export async function getPengaturanGlobal() {
  const res = await fetch('http://127.0.0.1:1337/api/pengaturan-global', {
    cache: 'no-store' // Bisa diganti 'force-cache' nanti kalau web sudah rilis agar lebih cepat
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil data Pengaturan Global");
    return null;
  }
  
  const json = await res.json();
  return json.data;
}

// src/lib/api.ts

export async function getBeranda() {
  const res = await fetch('http://127.0.0.1:1337/api/beranda?populate=*', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil data Beranda");
    return null;
  }
  
  const json = await res.json();
  return json.data;
}

// src/lib/api.ts
export async function getFasilitas() {
  // Ubah 'fasilitas' menjadi 'data-fasilitas' di link ini:
  const res = await fetch('http://127.0.0.1:1337/api/data-fasilitas?populate=*', {
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
  const res = await fetch(`http://127.0.0.1:1337/api/data-fasilitas/${id}?populate=*`, {
    cache: 'no-store'
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

// src/lib/api.ts

export async function getBerita() {
  const res = await fetch('http://127.0.0.1:1337/api/data-berita?populate=*&sort=tanggal_publikasi:desc', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil data Berita");
    return [];
  }
  
  const json = await res.json();
  return json.data;
}

// Tarik 1 Berita spesifik berdasarkan Slug
export async function getBeritaBySlug(slug: string) {
  const res = await fetch(`http://127.0.0.1:1337/api/data-berita?filters[slug][$eq]=${slug}&populate=*`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil detail berita");
    return null;
  }
  
  const json = await res.json();
  // Karena fitur 'filters' mengembalikan data dalam bentuk Array, kita ambil index ke-[0]
  return json.data.length > 0 ? json.data[0] : null; 
}

// Tarik data Layanan Publik
export async function getLayanan() {
  const res = await fetch('http://127.0.0.1:1337/api/data-layanan?populate=*', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    console.error("Gagal mengambil data Layanan");
    return [];
  }
  
  const json = await res.json();
  return json.data;
}