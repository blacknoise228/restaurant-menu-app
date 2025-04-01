import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vwqnghzeuvlvgbztdhmk.supabase.co', // 👈 твой реальный хост
        pathname: '/storage/v1/object/public/menu-images/**',
      },
    ],
  },
};

export default nextConfig;
