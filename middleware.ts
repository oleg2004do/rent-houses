import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["en", "uk", "es"]

// Спрощуємо middleware для усунення можливих помилок
export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Якщо шлях починається з /_next, /api, або має розширення файлу, пропускаємо
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next()
  }

  // Перевіряємо, чи URL вже містить локаль
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return NextResponse.next()

  // Перенаправляємо на URL з локаллю
  const locale = "en" // Використовуємо англійську як стандартну
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}

export const config = {
  // Налаштовуємо matcher для всіх маршрутів, крім API та статичних файлів
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}

