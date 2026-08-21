import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The archive moved from /newsletters to /project-archive.
      {
        source: "/newsletters",
        destination: "/project-archive",
        permanent: true,
      },
      // Legacy slug from before posts were renamed to Project-Archive-00N.
      {
        source: "/newsletters/newsletter-001",
        destination: "/project-archive/Project-Archive-001",
        permanent: true,
      },
      {
        source: "/newsletters/:slug",
        destination: "/project-archive/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
