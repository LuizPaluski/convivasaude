"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

const CATEGORIES = [
  "Saúde Preventiva",
  "Nutrição",
  "Saúde Mental",
  "Medicamentos",
  "Família",
  "Exercícios",
]

export interface EditorInitial {
  id?: number
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  image: string
  imageAlt: string
  contentMd: string
  published: boolean
  publishedAt: string
}

const EMPTY: EditorInitial = {
  slug: "", title: "", excerpt: "", category: CATEGORIES[0],
  readTime: "", image: "", imageAlt: "", contentMd: "",
  published: false, publishedAt: "",
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"

export default function PostEditor({ initial }: { initial?: EditorInitial }) {
  const router = useRouter()
  const isEdit = !!initial?.id
  const [form, setForm] = useState<EditorInitial>(initial ?? EMPTY)
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)

  function set<K extends keyof EditorInitial>(key: K, val: EditorInitial[K]) {
    setForm((f) => ({ ...f, [key]: val }))
  }

  async function save(publishNow?: boolean) {
    if (loading) return
    setLoading(true)
    setErro("")
    const payload = {
      ...form,
      published: publishNow !== undefined ? publishNow : form.published,
    }
    try {
      const url = isEdit ? `/api/admin/posts/${initial!.id}` : "/api/admin/posts"
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        setErro(traduzErro(data?.error))
      }
    } catch {
      setErro("Erro de conexão.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--muted)" }}>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="size-4" /> Voltar
        </Link>

        <div className="rounded-2xl p-6 md:p-8 flex flex-col gap-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h1 className="text-xl font-bold">{isEdit ? "Editar artigo" : "Novo artigo"}</h1>

          <Field label="Título *">
            <input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} />
          </Field>

          <Field label="Slug (URL)" hint="Deixe vazio para gerar do título. Ex: como-prevenir-quedas">
            <input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="gerado-do-titulo" />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Categoria">
              <select className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Tempo de leitura" hint="Ex: 5 min">
              <input className={inputCls} value={form.readTime} onChange={(e) => set("readTime", e.target.value)} placeholder="5 min" />
            </Field>
          </div>

          <Field label="Resumo (excerpt)">
            <textarea className={inputCls} rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="URL da imagem de capa" hint="Link https de uma imagem">
              <input className={inputCls} value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://..." />
            </Field>
            <Field label="Descrição da imagem (alt)">
              <input className={inputCls} value={form.imageAlt} onChange={(e) => set("imageAlt", e.target.value)} />
            </Field>
          </div>

          <Field label="Data de publicação" hint="Texto livre. Ex: 26 de maio de 2026">
            <input className={inputCls} value={form.publishedAt} onChange={(e) => set("publishedAt", e.target.value)} />
          </Field>

          <Field label="Conteúdo" hint="Markdown: ## título, ### subtítulo, > citação, - item de lista, [cta] insere botão de contato. Linha em branco separa parágrafos.">
            <textarea
              className={`${inputCls} font-mono text-xs leading-relaxed`}
              rows={18}
              value={form.contentMd}
              onChange={(e) => set("contentMd", e.target.value)}
              placeholder={"## Introdução\n\nTexto do parágrafo.\n\n### Subtópico\n\n- item um\n- item dois\n\n[cta]"}
            />
          </Field>

          {erro && <p className="text-sm text-destructive">{erro}</p>}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="button" onClick={() => save(false)} disabled={loading} variant="outline" className="flex-1">
              Salvar rascunho
            </Button>
            <Button type="button" onClick={() => save(true)} disabled={loading} loading={loading} className="flex-1">
              {isEdit ? "Salvar e publicar" : "Publicar"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Status atual: {form.published ? "publicado" : "rascunho"}. &quot;Salvar rascunho&quot; mantém oculto do público.
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-foreground/70">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground leading-snug">{hint}</p>}
    </div>
  )
}

function traduzErro(code?: string): string {
  switch (code) {
    case "titulo_obrigatorio": return "Título é obrigatório."
    case "slug_invalido": return "Slug inválido."
    case "slug_em_uso": return "Já existe um artigo com esse slug. Escolha outro."
    case "nao_autorizado": return "Sessão expirada. Entre novamente."
    default: return "Erro ao salvar. Verifique os campos."
  }
}
