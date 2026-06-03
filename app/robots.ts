import type { MetadataRoute } from "next";

const SITE = "https://portfolio-site-psi-ruddy.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
