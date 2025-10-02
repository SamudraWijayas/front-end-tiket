import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "back-end-tiket-two.vercel.app",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3400",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
