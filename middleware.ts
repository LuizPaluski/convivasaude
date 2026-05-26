import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ROTAS_INTERNAS = [
  "/styleguide",
  "/brandguide",
  "/criativos",
  "/planosmidia",
]

export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next()

  const path = req.nextUrl.pathname
  if (ROTAS_INTERNAS.some((p) => path === p || path.startsWith(p + "/"))) {
    return new NextResponse("Not Found", { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/styleguide/:path*",
    "/brandguide/:path*",
    "/criativos/:path*",
    "/planosmidia/:path*",
  ],
}
