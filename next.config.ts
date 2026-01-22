import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for static hosting on Render
  output: "export",

  // Disable Turbopack explicitly (fixes lightningcss error)
  experimental: {
    turbo: false,
  },

  // Required for next export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
