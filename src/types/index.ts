// src/types/index.ts

export interface UmkmItem {
  id: number;
  documentId: string;
  nama_toko: string;
  deskripsi: string;
  kontak_wa: string;
  link_maps?: string;
  foto_produk?: {
    url: string;
  };
  sejarah_umkm?: any; // Format Blocks dari Strapi
  katalog_produk?: ProdukItem[]; // Menyambungkan komponen produk
}

export interface ProfilDesaItem {
  id: number;
  documentId: string;
  nama_kepala_desa: string;
  sejarah_desa: any; // Format Blocks dari Strapi
  visi_misi: any;    // Format Blocks dari Strapi
  foto_struktur_organisasi?: {
    url: string;
  };
}

export interface ProdukItem {
  id: number;
  nama_produk: string;
  harga: number;
  foto_produk?: {
    url: string;
  }[]; // Karena Multiple Media, bentuknya jadi Array (kumpulan data)
}

