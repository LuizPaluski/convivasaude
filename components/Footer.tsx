import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center mb-3">
              <img src="/logo.svg" alt="Conviva Saúde" className="h-14 w-auto" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Programa de cuidado contínuo para idosos, com médico de referência, equipe multidisciplinar e Pronto Cuidar, o pronto atendimento para o idoso.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[
                { href: "https://instagram.com", label: "Instagram", icon: <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg> },
                { href: "https://youtube.com", label: "YouTube", icon: <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg> },
                { href: "https://linkedin.com", label: "LinkedIn", icon: <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                {
                  href: "https://tiktok.com", label: "TikTok", icon: (
                    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.79a4.85 4.85 0 01-1.03-.1z" />
                    </svg>
                  )
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="size-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Empresa</p>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Sobre nós", href: "/sobre" },
                // { label: "Como funciona", href: "/como-funciona" },
                { label: "Nossas unidades", href: "/unidades" },
                { label: "Blog de saúde", href: "/blog" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Suporte</p>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Central de ajuda", href: "/faq" },
                { label: "Política de privacidade", href: "/privacidade" },
                { label: "Termos de uso", href: "/termos" },
                { label: "Contato", href: "#contato" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © 2026 Conviva Saúde. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-[10px] gap-1">
              <Shield className="size-3" /> Dados protegidos · LGPD
            </Badge>
            <Link href="/styleguide" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Sistema de Design →
            </Link>
            <Link href="/brandguide" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Brand Guide →
            </Link>
            <Link href="/criativos" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Criativos →
            </Link>
            <Link href="/planosmidia" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Plano de Mídia →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
