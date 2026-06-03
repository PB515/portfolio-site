import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Admin uploads go through Server Actions; default body cap is 1MB.
    // Raise to fit a 10MB résumé PDF + 5MB cover image (+ overhead).
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
};

export default nextConfig;
