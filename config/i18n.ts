import { createSharedPathnamesNavigation } from "next-intl/navigation"
import { getRequestConfig } from "next-intl/server"

// Визначаємо підтримувані локалі
export const locales = ["en", "uk", "es"]
export const defaultLocale = "en"

// Створюємо функції для навігації
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales })

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    // Вимикаємо використання заголовків для визначення локалі
    now: new Date(),
  }
})

