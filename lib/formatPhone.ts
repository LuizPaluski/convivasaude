/** Aplica máscara (XX) XXXXX-XXXX a uma string de dígitos limpos. */
export function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, "").slice(0, 11)
  if (!d) return ""
  if (d.length <= 2) return `(${d}`
  const ddd = d.slice(0, 2)
  const num = d.slice(2)
  if (num.length <= 5) return `(${ddd}) ${num}`
  return `(${ddd}) ${num.slice(0, 5)}-${num.slice(5)}`
}

/** Retorna apenas os dígitos, limitado a 11 caracteres. */
export function cleanPhone(value: string): string {
  return value.replace(/\D/g, "").slice(0, 11)
}

/** Válido se tiver exatamente 11 dígitos (DDD + 9 dígitos). */
export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length === 11
}
