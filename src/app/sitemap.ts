import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { hasPublicUrl, siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!hasPublicUrl) return [];

  const paths = ["", "/work", "/about", "/contact", ...projects.map((project) => `/work/${project.slug}`)];

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
