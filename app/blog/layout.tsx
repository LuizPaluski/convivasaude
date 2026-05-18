import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Saúde do Idoso — Conviva Saúde",
  description: "Dicas, orientações e conteúdo sobre saúde do idoso, geriatria e bem-estar para quem tem 60+. Blog da Conviva Saúde.",
  alternates: { canonical: "https://convivasaude.vercel.app/blog" },
  openGraph: {
    title: "Blog | Saúde do Idoso — Conviva Saúde",
    description: "Dicas, orientações e conteúdo sobre saúde do idoso, geriatria e bem-estar para quem tem 60+. Blog da Conviva Saúde.",
    url: "https://convivasaude.vercel.app/blog",
    siteName: "Conviva Saúde",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Saúde do Idoso — Conviva Saúde",
    description: "Dicas, orientações e conteúdo sobre saúde do idoso, geriatria e bem-estar para quem tem 60+. Blog da Conviva Saúde.",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
