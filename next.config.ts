import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/mrizkyp-blog",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
