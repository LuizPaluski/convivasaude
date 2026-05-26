import type { Metadata } from "next"
import { getPostBySlugDb } from "@/lib/blog-db"
import { SITE_URL } from "@/lib/site-config"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlugDb(slug)
  if (!post) {
    return { title: "Artigo não encontrado | Blog Conviva Saúde" }
  }
  const url = `${SITE_URL}/blog/${slug}`
  return {
    title: `${post.title} | Blog Conviva Saúde`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} | Blog Conviva Saúde`,
      description: post.excerpt,
      url,
      siteName: "Conviva Saúde",
      locale: "pt_BR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Blog Conviva Saúde`,
      description: post.excerpt,
    },
  }
}

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
