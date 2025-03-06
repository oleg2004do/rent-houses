import { getRequestConfig } from "next-intl/server"
import { setRequestLocale } from "next-intl/server"

export default getRequestConfig(async ({ locale }) => {
  // Встановлюємо локаль для запиту
  setRequestLocale(locale)

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})

