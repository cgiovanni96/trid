/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
    serverActionsBodySizeLimit: "4mb",
  },

  // FIX: remove this in prod
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },

      {
        protocol: "https",
        hostname: "imges.clerk.com",
      },

      {
        protocol: "https",
        hostname: "uploadthing.com",
      },

      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

module.exports = nextConfig;
