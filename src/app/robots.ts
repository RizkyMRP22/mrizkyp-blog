import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const baseUrl = appUrl.startsWith("http://") || appUrl.startsWith("https://")
    ? appUrl
    : `https://${appUrl}`;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/coming-soon"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
