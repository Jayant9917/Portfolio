import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { getMDXFiles } from "@/lib/mdx-utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://github.com/Jayant9917";

type SitemapPost = {
  slug: string;
  frontmatter: {
    date?: string;
  };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/about", "/projects", "/blog", "/contact"].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: project.date ? new Date(project.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const posts = (await getMDXFiles("src/content/posts")) as unknown as SitemapPost[];
  const postRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.frontmatter.date
      ? new Date(post.frontmatter.date)
      : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
