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
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  // Перевіряємо, чи URL вже містить локаль
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Якщо це кореневий шлях, пропускаємо запит
  if (pathname === "/") {
    return NextResponse.next()
  }

  // Отримуємо локаль з кукі або заголовків
  let locale = defaultLocale
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale
  } else {
    const acceptLanguage = request.headers.get("accept-language")
    if (acceptLanguage) {
      const preferredLocale = acceptLanguage.split(",")[0].split("-")[0].toLowerCase()
      if (locales.includes(preferredLocale)) {
        locale = preferredLocale
      }
    }
  }

  // Перенаправляємо на URL з локаллю
  return NextResponse.redirect(new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url))
}

export const config = {
  matcher: [
    // Виключаємо всі внутрішні шляхи Next.js
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

