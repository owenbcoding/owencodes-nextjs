import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      // Keep the previous archive URL working.
      {
        source: "/project-archive",
        destination: "/archive",
        permanent: true,
      },
      {
        source: "/project-archive/:slug",
        destination: "/archive/:slug",
        permanent: true,
      },
      // Legacy newsletter URLs redirect to the archive.
      {
        source: "/newsletters",
        destination: "/archive",
        permanent: true,
      },
      // Legacy slug from before posts were renamed to Project-Archive-00N.
      {
        source: "/newsletters/newsletter-001",
        destination: "/archive/Project-Archive-001",
        permanent: true,
      },
      {
        source: "/newsletters/:slug",
        destination: "/archive/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
