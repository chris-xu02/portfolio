import type { MetadataRoute } from "next";
import { hasPublicUrl, siteUrl } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(hasPublicUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
