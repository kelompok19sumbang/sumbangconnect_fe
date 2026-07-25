// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... settingan lain ...

  async rewrites() {
    return [
      {
        // KITA UBAH NAMA SUMBERNYA JADI /api-images
        source: '/api-images/:path*',
        destination: 'http://103.82.92.95/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;