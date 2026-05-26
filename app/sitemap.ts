import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"
import { getPublishedPosts } from "@/lib/blog-db"

export const dynamic = "force-dynamic"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [
    { url: SITE_URL,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1   },
    { url: `${SITE_URL}/sobre`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/unidades`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/faq`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${SITE_URL}/privacidade`,   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/termos`,        lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    ...posts,
  ]
}
