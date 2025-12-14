import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Disable ESLint during build (handle separately)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript errors during build (handle separately)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Environment variables available at runtime
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  },
};

export default nextConfig;
