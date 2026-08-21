import type { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blogs";
import { getAllArchivePosts } from "@/lib/project-archive";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const blogs = getAllBlogs();
  const archivePosts = getAllArchivePosts();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/project-archive`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...blogs.map((blog) => ({
      url: `${siteUrl}/blogs/${blog.slug}`,
      lastModified: blog.date ? new Date(blog.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...archivePosts.map((post) => ({
      url: `${siteUrl}/project-archive/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
