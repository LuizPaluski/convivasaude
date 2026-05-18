import type { Metadata } from "next"
import { BLOG_POSTS } from "@/lib/blog-data"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) {
    return { title: "Artigo não encontrado | Blog Conviva Saúde" }
  }
  return {
    title: `${post.title} | Blog Conviva Saúde`,
    description: post.excerpt,
    alternates: { canonical: `https://convivasaude.vercel.app/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Blog Conviva Saúde`,
      description: post.excerpt,
      url: `https://convivasaude.vercel.app/blog/${slug}`,
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
