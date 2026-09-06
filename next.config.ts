import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Clean URLs without trailing slashes
  trailingSlash: false,
};

export default nextConfig;
