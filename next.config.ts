import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // beforeFiles memaksa Vercel memprioritaskan proxy VPS
      // mengabaikan jika ada folder public/uploads di laptop/github kamu
      beforeFiles: [
        {
          source: '/uploads/:path*',
          destination: 'http://103.82.92.95/uploads/:path*',
        },
      ],
    };
  },
};

export default nextConfig;