import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vwqnghzeuvlvgbztdhmk.supabase.co',
        pathname: '/storage/v1/object/public/logos/**', // Логотипы
      },
      {
        protocol: 'https',
        hostname: 'vwqnghzeuvlvgbztdhmk.supabase.co', // 👈 твой реальный хост
        pathname: '/storage/v1/object/public/menu-images/**',
      },
    ],
    domains: ['upload.wikimedia.org', 'your-supabase-bucket-url.com'],
  },
};

export default nextConfig;
