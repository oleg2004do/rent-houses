import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["en", "uk", "es"]
const publicPages = ["/", "/uk", "/en", "/es"]

// Створюємо middleware для інтернаціоналізації
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
})

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Перевіряємо, чи це публічна сторінка
  if (publicPages.includes(pathname)) {
    return intlMiddleware(request)
  }

  // Для всіх інших маршрутів
  try {
    return await intlMiddleware(request)
  } catch (error) {
    console.error("Middleware error:", error)
    // У випадку помилки перенаправляємо на домашню сторінку
    return NextResponse.redirect(new URL("/", request.url))
  }
}

export const config = {
  // Налаштовуємо matcher для всіх маршрутів, крім API та статичних файлів
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}

