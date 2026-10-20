import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/eventos/trinexus-001",
        destination: "/eventos/evernear-001",
        permanent: true,
      },
      {
        source: "/trinexus.html",
        destination: "/evernear.html",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
