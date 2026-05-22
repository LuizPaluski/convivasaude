import type { Metadata } from "next";
import { Urbanist, Plus_Jakarta_Sans, Nunito, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SITE_URL } from "@/lib/site-config";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Conviva Saúde | Pacote de cuidado para idosos em BH, R$ 329/mês",
  description: "A Conviva Saúde é um pacote de cuidado contínuo para idosos 60+ em Belo Horizonte. Médico de referência, equipe multidisciplinar e Pronto Cuidar. R$ 329/mês, sem carência.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Conviva Saúde | Pacote de cuidado para idosos em BH, R$ 329/mês",
    description: "A Conviva Saúde é um pacote de cuidado contínuo para idosos 60+ em Belo Horizonte. Médico de referência, equipe multidisciplinar e Pronto Cuidar. R$ 329/mês, sem carência.",
    url: SITE_URL,
    siteName: "Conviva Saúde",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conviva Saúde | Pacote de cuidado para idosos em BH, R$ 329/mês",
    description: "A Conviva Saúde é um pacote de cuidado contínuo para idosos 60+ em Belo Horizonte. Médico de referência, equipe multidisciplinar e Pronto Cuidar. R$ 329/mês, sem carência.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${urbanist.variable} ${plusJakartaSans.variable} ${nunito.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
