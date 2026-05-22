import { NextResponse } from "next/server"
import { isDataNascimentoValida } from "@/lib/validators"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MAX_FIELD_LEN = 500
const MAX_PAYLOAD_BYTES = 8 * 1024

const RATE_WINDOW_MS = 60_000
const RATE_LIMIT = 5
const hits = new Map<string, { count: number; resetAt: number }>()

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0]!.trim()
  return req.headers.get("x-real-ip") ?? "unknown"
}

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count += 1
  return true
}

function sanitize(v: unknown): string {
  if (typeof v !== "string") return ""
  return v.replace(/[\x00-\x1f\x7f]/g, "").trim().slice(0, MAX_FIELD_LEN)
}


interface ContactPayload {
  nome: string
  telefone: string
  email: string
  dataNascimento: string
  convenio: string
  numeroCarteira: string
  qualConvenio: string
  faixaEtaria: string
  tipo: string
  origem: string
  consentLGPD: boolean
}

export async function POST(req: Request) {
  const ip = getClientIp(req)
  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 })
  }

  const contentLength = Number(req.headers.get("content-length") ?? "0")
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 })
  }

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 })
  }

  const body = raw as Record<string, unknown>
  const data: ContactPayload = {
    nome: sanitize(body.nome),
    telefone: sanitize(body.telefone),
    email: sanitize(body.email),
    dataNascimento: sanitize(body.dataNascimento),
    convenio: sanitize(body.convenio),
    numeroCarteira: sanitize(body.numeroCarteira),
    qualConvenio: sanitize(body.qualConvenio),
    faixaEtaria: sanitize(body.faixaEtaria),
    tipo: sanitize(body.tipo),
    origem: sanitize(body.origem),
    consentLGPD: body.consentLGPD === true,
  }

  if (!data.nome || data.nome.length < 2) {
    return NextResponse.json({ ok: false, error: "nome_required" }, { status: 400 })
  }
  const telefoneDigits = data.telefone.replace(/\D/g, "")
  if (telefoneDigits.length < 10 || telefoneDigits.length > 13) {
    return NextResponse.json({ ok: false, error: "telefone_invalido" }, { status: 400 })
  }
  if (!data.consentLGPD) {
    return NextResponse.json({ ok: false, error: "consent_required" }, { status: 400 })
  }
  if (!isDataNascimentoValida(data.dataNascimento)) {
    return NextResponse.json({ ok: false, error: "data_nascimento_invalida" }, { status: 400 })
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: "email_invalido" }, { status: 400 })
  }

  const record = {
    receivedAt: new Date().toISOString(),
    ip,
    userAgent: req.headers.get("user-agent") ?? "",
    ...data,
  }

  console.log("[contact] novo lead:", JSON.stringify(record))

  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(5000),
      })
      if (!res.ok) {
        console.error("[contact] webhook respondeu", res.status)
      }
    } catch (err) {
      console.error("[contact] webhook falhou:", err)
    }
  }

  return NextResponse.json({ ok: true })
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 })
}
