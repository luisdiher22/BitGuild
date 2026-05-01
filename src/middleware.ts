import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, raw: true })
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/guild/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/quest-board/:path*",
    "/admin/:path*",
    "/onboarding/skill-tree/:path*",
  ],
}
