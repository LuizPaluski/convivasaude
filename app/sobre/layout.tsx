import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre a Conviva Saúde | Quem somos e nossa história",
  description: "Conheça a Conviva Saúde, pacote particular de benefícios e cuidado contínuo para idosos criado em parceria com a Mais60 Saúde, referência em geriatria em BH.",
  alternates: { canonical: "https://convivasaude.vercel.app/sobre" },
  openGraph: {
    title: "Sobre a Conviva Saúde | Quem somos e nossa história",
    description: "Conheça a Conviva Saúde, pacote particular de benefícios e cuidado contínuo para idosos criado em parceria com a Mais60 Saúde, referência em geriatria em BH.",
    url: "https://convivasaude.vercel.app/sobre",
    siteName: "Conviva Saúde",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre a Conviva Saúde | Quem somos e nossa história",
    description: "Conheça a Conviva Saúde, pacote particular de benefícios e cuidado contínuo para idosos criado em parceria com a Mais60 Saúde, referência em geriatria em BH.",
  },
}

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
