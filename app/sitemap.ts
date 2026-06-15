import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site-config"
import { getPublishedPosts } from "@/lib/blog-db"

export const dynamic = "force-dynamic"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.publishedAt || undefined,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }))

  return [
    { url: SITE_URL,                    changeFrequency: "weekly",  priority: 1   },
    { url: `${SITE_URL}/sobre`,         changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/como-funciona`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/unidades`,      changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/faq`,           changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`,          changeFrequency: "weekly",  priority: 0.6 },
    { url: `${SITE_URL}/privacidade`,   changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/termos`,        changeFrequency: "yearly",  priority: 0.3 },
    ...posts,
  ]
}
