import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL:
      process.env.NEXT_VITE_REACT_APP_BACKEND_URL,
    NEXT_HOST: process.env.NEXT_HOST,
  },
  images: {
    // domains: ["https://www.static-cms-aline86.fr"],
    domains: [
      process.env.NEXT_VITE_REACT_APP_BACKEND_URL !== undefined
        ? process.env.NEXT_VITE_REACT_APP_BACKEND_URL
        : "localhost",
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
