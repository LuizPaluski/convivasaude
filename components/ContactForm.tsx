"use client"

import { useState } from "react"
import { Shield, ArrowRight, CheckCircle, Loader2, MailIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const CONVENIOS = ["Unimed BH", "Unimed Nacional", "Desban", "Fundaffemg", "Particular", "Outros"] as const
type Convenio = (typeof CONVENIOS)[number]

interface ContactFormData {
  nome: string
  telefone: string
  dataNascimento: string
  email: string
  convenio: Convenio | ""
  numeroCarteira: string
  qualConvenio: string
}

interface ContactFormProps {
  title?: string
  subtitle?: string
  showCard?: boolean
  onSubmit?: (data: ContactFormData) => void | Promise<void>
}

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11)
  if (!d) return ""
  if (d.length <= 2) return `(${d}`
  const ddd = d.slice(0, 2)
  const num = d.slice(2)
  if (num.length <= 1) return `(${ddd}) ${num}`
  if (num.length <= 5) return `(${ddd}) ${num.slice(0, 1)} ${num.slice(1)}`
  return `(${ddd}) ${num.slice(0, 1)} ${num.slice(1, 5)}-${num.slice(5)}`
}

export default function ContactForm({
  title = "Fale com nossa equipe",
  subtitle = "Respondemos em até 2 horas úteis",
  showCard = true,
  onSubmit,
}: ContactFormProps) {
  const [nome, setNome] = useState("")
  const [telefone, setTelefone] = useState("")
  const [dataNascimento, setDataNascimento] = useState("")
  const [email, setEmail] = useState("")
  const [convenio, setConvenio] = useState<Convenio | "">("")
  const [numeroCarteira, setNumeroCarteira] = useState("")
  const [qualConvenio, setQualConvenio] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const showCarteira =
    convenio === "Unimed BH" ||
    convenio === "Unimed Nacional" ||
    convenio === "Desban" ||
    convenio === "Fundaffemg"
  const showQualConvenio = convenio === "Outros"
  const canSubmit = nome.trim() !== "" && telefone.replace(/\D/g, "").length >= 10 && convenio !== ""

  async function handleSubmit() {
    if (!canSubmit || loading) return
    setLoading(true)
    try {
      await onSubmit?.({ nome, telefone, dataNascimento, email, convenio, numeroCarteira, qualConvenio })
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  const inputCls =
    "w-full rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground/60"

  const successContent = (
    <div className={`flex flex-col items-center justify-center gap-4 py-8 text-center${showCard ? " px-6" : ""}`}>
      <div
        className="size-16 rounded-full flex items-center justify-center"
        style={{ background: "color-mix(in oklch, var(--success, #22c55e) 15%, var(--background))" }}
      >
        <CheckCircle className="size-8" style={{ color: "var(--success, #22c55e)" }} />
      </div>
      <div>
        <p className="text-base font-semibold mb-1">Mensagem enviada!</p>
        <p className="text-sm text-muted-foreground max-w-xs">
          Nossa equipe entrará em contato em breve pelo telefone informado.
        </p>
      </div>
      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Shield className="size-3 shrink-0" />
        Seus dados estão seguros. Não compartilhamos com terceiros.
      </p>
    </div>
  )

  const formContent = (
    <div className={`flex flex-col gap-4${showCard ? " px-6 py-5" : ""}`}>
      {/* 1. Nome */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foreground/70">
          Nome <span className="text-destructive">*</span>
        </label>
        <input
          type="text"
          placeholder="Nome de quem vai contratar"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={inputCls}
        />
      </div>

      {/* 2. Telefone de contato */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foreground/70">
          Telefone de contato <span className="text-destructive">*</span>
        </label>
        <input
          type="tel"
          placeholder="(31) 9 0000-0000"
          value={telefone}
          onChange={(e) => setTelefone(formatPhone(e.target.value))}
          className={inputCls}
        />
      </div>

      {/* 3. Data de nascimento */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foreground/70">
          Data de nascimento{" "}
          <span className="text-muted-foreground font-normal">(opcional)</span>
        </label>
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          className={inputCls}
        />
      </div>

      {/* 4. E-mail */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-foreground/70">
          E-mail <span className="text-muted-foreground font-normal">(opcional)</span>
        </label>
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
        />
      </div>

      {/* 5. Possui convênio? — botões radio */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-foreground/70">
          Possui convênio de saúde? <span className="text-destructive">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {CONVENIOS.map((op) => {
            const selected = convenio === op
            return (
              <button
                key={op}
                type="button"
                onClick={() => {
                  setConvenio(op)
                  setNumeroCarteira("")
                  setQualConvenio("")
                }}
                className="rounded-xl py-2.5 px-3 text-xs font-medium text-left transition-all duration-150 active:scale-[0.97]"
                style={{
                  border: `1.5px solid ${selected ? "var(--primary)" : "var(--border)"}`,
                  background: selected
                    ? "color-mix(in oklch, var(--primary) 10%, var(--background))"
                    : "var(--background)",
                  color: selected ? "var(--primary)" : undefined,
                }}
              >
                {op}
              </button>
            )
          })}
        </div>
      </div>

      {/* 6. Número da carteira (condicional) */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: showCarteira ? "72px" : "0",
          opacity: showCarteira ? 1 : 0,
          transition: "max-height 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foreground/70">Número da carteira</label>
          <input
            type="text"
            placeholder="Número da carteira do convênio"
            value={numeroCarteira}
            onChange={(e) => setNumeroCarteira(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* 7. Qual convênio? (condicional) */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: showQualConvenio ? "72px" : "0",
          opacity: showQualConvenio ? 1 : 0,
          transition: "max-height 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-foreground/70">Qual convênio?</label>
          <input
            type="text"
            placeholder="Nome do convênio"
            value={qualConvenio}
            onChange={(e) => setQualConvenio(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* Botão enviar */}
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        loading={loading}
        className="w-full mt-1"
      >
        {loading ? "Enviando..." : (
          <>
            Enviar mensagem
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>

      {/* Rodapé de segurança */}
      <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
        <Shield className="size-3 shrink-0" />
        Seus dados estão seguros. Não compartilhamos com terceiros.
      </p>
    </div>
  )

  const content = submitted ? successContent : formContent

  if (!showCard) return content

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, color-mix(in oklch, var(--primary) 8%, var(--card)), color-mix(in oklch, var(--accent) 30%, var(--card)))",
        border: "1px solid color-mix(in oklch, var(--primary) 20%, var(--border))",
        boxShadow: "0 4px 32px color-mix(in oklch, var(--primary) 10%, transparent)",
      }}
    >
      <div className="px-6 pt-6 pb-5 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <MailIcon className="size-5 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-base font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>
      {content}
    </div>
  )
}
