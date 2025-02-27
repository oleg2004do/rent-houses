import createMiddleware from "next-intl/middleware"
import type { NextRequest } from "next/server"

const nextIntlMiddleware = createMiddleware({
  locales: ["en", "uk", "es"],
  defaultLocale: "en",
  localePrefix: "always",
})

export default function middleware(req: NextRequest) {
  return nextIntlMiddleware(req)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}

