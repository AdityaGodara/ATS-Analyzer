import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for pdfjs-dist to work with webpack
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // pdfjs-dist worker needs to be loaded from CDN, not bundled
      config.resolve.alias = {
        ...config.resolve.alias,
      };
    }
    return config;
  },

  // Allow pdfjs-dist worker from CDN
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
