// src/app/api/chat/route.ts
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { getProfilDesa, getLayanan, getBerita, getUmkm, getFasilitas, getInfografis } from '@/lib/api'; 

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API Key hilang' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const { message, history } = await req.json();

    // 2. TARIK SEMUA DATA DARI STRAPI
    let profil, layanan, berita, umkm, fasilitas, infografis;
    try {
      profil = await getProfilDesa();
      layanan = await getLayanan();
      berita = await getBerita(); 
      umkm = await getUmkm(); 
      fasilitas = await getFasilitas();
      infografis = await getInfografis(); 
    } catch (strapiError) {
      console.error("❌ ERROR STRAPI:", strapiError);
      return NextResponse.json({ error: 'Gagal mengambil data dari database' }, { status: 500 });
    }

    // 3. FORMAT DATA AGAR MUDAH DIBACA OLEH AI (Dengan tambahan URL/Slug)
    const listLayanan = layanan?.map((l: any) => `- ${l.nama_layanan}: ${l.deskripsi}`).join('\n') || 'Belum ada data layanan';
    
    // Format Berita (Menyisipkan URL)
    const listBerita = berita?.slice(0, 5).map((b: any) => `- Judul: ${b.judul} | URL: /berita/${b.slug}`).join('\n') || 'Belum ada berita';
    
    // Format UMKM
    const listUmkm = umkm?.map((u: any) => {
      const namaToko = u.nama_toko || u.nama_umkm || u.nama_usaha || u.nama || u.judul || 'Nama Toko Tidak Diketahui';
      const deskripsi = u.deskripsi || u.kategori || 'Tidak ada deskripsi rinci';
      return `- Nama: ${namaToko} | Info: ${deskripsi}`;
    }).join('\n') || 'Belum ada data UMKM';
    const totalUmkm = umkm?.length || 0;

    // Format Fasilitas
    const listFasilitas = fasilitas?.map((f: any) => {
      const nama = f.nama_fasilitas || f.nama || 'Fasilitas';
      const kategori = f.kategori ? f.kategori.replace(/_/g, ' ') : 'Umum';
      return `- ${nama} (Kategori: ${kategori})`;
    }).join('\n') || 'Belum ada data fasilitas';
    const totalFasilitas = fasilitas?.length || 0;

    const dataStatistik = infografis ? JSON.stringify(infografis) : 'Data infografis belum tersedia';

    // 4. SUSUN OTAK AI DENGAN ATURAN TOMBOL MARKDOWN & KONTAK
    const systemInstruction = `
      Kamu adalah "Sumbang AI", asisten virtual cerdas dan resmi milik Kelurahan Sumbang, Bojonegoro.
      Tugas utamamu adalah membantu warga menjawab pertanyaan seputar kelurahan berdasarkan data website berikut.
      
      [1. BERANDA / PROFIL]
      Kepala Kelurahan: ${profil?.nama_kepala_desa || 'Belum tersedia'}
      Deskripsi Singkat: ${profil?.sejarah_desa || 'Belum tersedia'}
      
      [2. BERITA TERBARU (TOP 5)]
      ${listBerita}

      [3. KATALOG UMKM]
      Total UMKM terdaftar: ${totalUmkm}
      Daftar UMKM:
      ${listUmkm}

      [4. INFOGRAFIS / STATISTIK KELURAHAN]
      Berikut adalah data statistik mentah (JSON). Ekstrak dan bacakan informasi pentingnya jika warga bertanya soal data/statistik/penduduk:
      ${dataStatistik}

      [5. FASILITAS & PETA POTENSI]
      Total titik fasilitas: ${totalFasilitas}
      Daftar Fasilitas di Kelurahan Sumbang:
      ${listFasilitas}

      [6. LAYANAN PUBLIK]
      ${listLayanan}

      [7. KONTAK & ALAMAT KANTOR]
      Alamat: Jl. Teuku Umar No. 15, Kelurahan Sumbang, Kec. Bojonegoro, Kabupaten Bojonegoro, Jawa Timur 62115
      Telepon & WA: 1823891230
      Email: sumbangconnect@gmail.com

      ATURAN PENTING & WAJIB:
      1. Jawab HANYA berdasarkan data 1 sampai 7 di atas. Jangan pernah mengarang data.
      2. FORMAT TOMBOL BERITA: Jika kamu merekomendasikan berita, berikan tombol link format markdown di bawah judulnya: [Baca Selengkapnya](URL Berita).
      3. FORMAT TOMBOL UMKM/FASILITAS: Berikan tombol ajakan di akhir jawaban: [Lihat Katalog UMKM](/katalog-umkm) atau [Lihat Peta Potensi](/fasilitas).
      4. KONTAK: Jika warga bertanya cara menghubungi atau alamat kelurahan, berikan data dari poin 7 dan arahkan ke halaman: [Hubungi Kami](/hubungi-kami).
      5. Gunakan bahasa Indonesia yang santai, sopan, bersahabat, dan ringkas.
    `;

    // 5. EKSEKUSI GEMINI
    let formattedHistory = history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.shift(); 
    }

    const contents = [
      ...formattedHistory,
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    
    return NextResponse.json({ text: response.text });

  } catch (error) {
    console.error("❌ ERROR GEMINI API:", error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memproses AI.' }, 
      { status: 500 }
    );
  }
}