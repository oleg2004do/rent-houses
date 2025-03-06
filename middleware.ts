import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["en", "uk", "es"]
const defaultLocale = "en"

// Створюємо middleware для інтернаціоналізації
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
})

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
    // Застосовуємо middleware для інтернаціоналізації
    return intlMiddleware(request)
  } catch (error) {
    console.error("Middleware error:", error)

    // У випадку помилки перенаправляємо на домашню сторінку
    return NextResponse.redirect(new URL("/", request.url))
  }
}

export const config = {
  // Налаштовуємо matcher для всіх маршрутів, крім статичних файлів
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|flags|phonot_2.jpg|phonot_3.jpg|JOURNEY-UA.png|logo.png).*)",
  ],
}

