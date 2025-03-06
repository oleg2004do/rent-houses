import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Визначаємо підтримувані локалі
const locales = ["en", "uk", "es"]

export default function middleware(request: NextRequest) {
  // Пропускаємо запити до статичних файлів та API
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next()
  }

  // Перевіряємо, чи URL вже містить локаль
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // Якщо URL вже містить локаль, пропускаємо запит
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Якщо URL не містить локаль і це кореневий шлях, пропускаємо запит
  if (pathname === "/") {
    return NextResponse.next()
  }

  // Для інших шляхів додаємо локаль
  return NextResponse.redirect(new URL(`/en${pathname}`, request.url))
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
}

