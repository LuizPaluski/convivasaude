import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contratar | Conviva Saúde, R$ 329/mês",
  description: "Contrate o pacote Conviva Saúde em poucos minutos. Sem carência, sem fidelidade. Médico de referência e cuidado contínuo para o seu familiar.",
  alternates: { canonical: "https://convivasaude.vercel.app/contratar" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Contratar | Conviva Saúde, R$ 329/mês",
    description: "Contrate o pacote Conviva Saúde em poucos minutos. Sem carência, sem fidelidade. Médico de referência e cuidado contínuo para o seu familiar.",
    url: "https://convivasaude.vercel.app/contratar",
    siteName: "Conviva Saúde",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contratar | Conviva Saúde, R$ 329/mês",
    description: "Contrate o pacote Conviva Saúde em poucos minutos. Sem carência, sem fidelidade. Médico de referência e cuidado contínuo para o seu familiar.",
  },
}

export default function ContratarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
