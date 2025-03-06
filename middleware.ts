import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["en", "uk", "es"]
const defaultLocale = "en"

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Пропускаємо запити до статичних файлів та API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  try {
    // Перевіряємо, чи URL вже містить локаль
    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

    // Якщо URL вже містить локаль, пропускаємо запит
    if (pathnameHasLocale) {
      return NextResponse.next()
    }

    // Якщо це кореневий шлях, пропускаємо запит
    if (pathname === "/") {
      return NextResponse.next()
    }

    // Для інших шляхів додаємо локаль
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
  } catch (error) {
    console.error("Middleware error:", error)
    // У випадку помилки перенаправляємо на головну
    return NextResponse.redirect(new URL("/", request.url))
  }
}

export const config = {
  // Налаштовуємо matcher для всіх маршрутів, крім статичних файлів
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

