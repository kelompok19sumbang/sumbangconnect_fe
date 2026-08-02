import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // beforeFiles memaksa Vercel memprioritaskan proxy VPS
      // mengabaikan jika ada folder public/uploads di laptop/github kamu
      beforeFiles: [
        {
          source: '/uploads/:path*',
          // 🔥 FIX: Tambahkan port :1337 di sini!
          destination: 'http://103.82.92.95:1337/uploads/:path*',
        },
      ],
    };
  },
};

export default nextConfig;