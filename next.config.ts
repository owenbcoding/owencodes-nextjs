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
  async headers() {
    return [
      {
        // Allow the Sanity Dashboard (sanity.io) to embed the studio in an iframe.
        source: "/studio/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://*.sanity.io",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/archive",
        destination: "/skills",
        permanent: true,
      },
      {
        source: "/archive/:slug",
        destination: "/skills",
        permanent: true,
      },
      {
        source: "/project-archive",
        destination: "/skills",
        permanent: true,
      },
      {
        source: "/project-archive/:slug",
        destination: "/skills",
        permanent: true,
      },
      {
        source: "/newsletters",
        destination: "/skills",
        permanent: true,
      },
      {
        source: "/newsletters/newsletter-001",
        destination: "/skills",
        permanent: true,
      },
      {
        source: "/newsletters/:slug",
        destination: "/skills",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
