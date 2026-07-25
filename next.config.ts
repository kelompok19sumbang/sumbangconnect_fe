import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... (biarkan settingan lain yang sudah ada)

  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://103.82.92.95/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;