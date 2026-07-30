// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot"; // <-- 1. IMPORT CHATBOT DI SINI
import { Inter, Playfair_Display } from "next/font/google";

// Menggunakan font Inter agar terlihat modern dan rapi
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = { 
  title: "SumbangConnect - Portal Kelurahan",
  description: "Pusat informasi layanan masyarakat dan direktori UMKM lokal Kelurahan Sumbang.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {/* Navbar dipasang di sini agar membungkus semua halaman */}
        <Navbar />
        
        {children}
        
        <Footer /> 
        
        {/* 2. PASANG WIDGET CHATBOT MELAYANG DI SINI */}
        <Chatbot />
      </body>
    </html>
  );
}