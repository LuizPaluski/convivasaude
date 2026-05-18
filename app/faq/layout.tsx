import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dúvidas Frequentes | Conviva Saúde",
  description: "Tire suas dúvidas sobre o pacote Conviva Saúde: o que inclui, quanto custa, como contratar, carência, fidelidade e muito mais.",
  alternates: { canonical: "https://convivasaude.vercel.app/faq" },
  openGraph: {
    title: "Dúvidas Frequentes | Conviva Saúde",
    description: "Tire suas dúvidas sobre o pacote Conviva Saúde: o que inclui, quanto custa, como contratar, carência, fidelidade e muito mais.",
    url: "https://convivasaude.vercel.app/faq",
    siteName: "Conviva Saúde",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dúvidas Frequentes | Conviva Saúde",
    description: "Tire suas dúvidas sobre o pacote Conviva Saúde: o que inclui, quanto custa, como contratar, carência, fidelidade e muito mais.",
  },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
