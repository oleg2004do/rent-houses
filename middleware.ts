import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["en", "uk", "es"]

// Створюємо middleware для інтернаціоналізації
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
})

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Додаємо обробку помилок
  try {
    // Отримуємо поточну локаль з URL
    const locale = pathname.split("/")[1]

    // Якщо локаль не вказана або невірна, перенаправляємо на англійську
    if (!locale || !locales.includes(locale)) {
      const defaultLocale = "en"
      const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url)
      return NextResponse.redirect(newUrl)
    }

    // Застосовуємо middleware для інтернаціоналізації
    return intlMiddleware(request)
  } catch (error) {
    console.error("Middleware error:", error)

    // У випадку помилки перенаправляємо на домашню сторінку англійською
    const newUrl = new URL("/en", request.url)
    return NextResponse.redirect(newUrl)
  }
}

export const config = {
  // Налаштовуємо matcher для всіх маршрутів, крім API та статичних файлів
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}

