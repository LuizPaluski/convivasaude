import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/sobre", "/unidades", "/faq", "/blog", "/privacidade", "/termos"],
        disallow: ["/brandguide", "/styleguide", "/criativos", "/planosmidia", "/contratar"],
      },
    ],
    sitemap: "https://convivasaude.vercel.app/sitemap.xml",
  }
}
