import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["localhost"], // karena API jalan di http://localhost:3400
  },
};

export default nextConfig;
