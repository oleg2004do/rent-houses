import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Визначаємо підтримувані локалі
const locales = ["en", "uk", "es"]
const defaultLocale = "en"

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Пропускаємо запити до статичних файлів та API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname === "/manifest.json"
  ) {
    return NextResponse.next()
  }

  // Перевіряємо, чи URL вже містить локаль
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // Якщо URL вже містить локаль, пропускаємо запит
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Якщо URL не містить локаль, перенаправляємо на URL з локаллю
  // Для кореневого шляху використовуємо defaultLocale
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }

  // Для інших шляхів додаємо локаль
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
}

export const config = {
  // Налаштовуємо matcher для всіх маршрутів, крім статичних файлів
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|images|flags|phonot_2.jpg|phonot_3.jpg|JOURNEY-UA.png|logo.png).*)",
  ],
}

