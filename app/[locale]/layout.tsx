import type React from "react"
import "../globals.css"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

// Встановлюємо динамічний режим
export const dynamic = "force-dynamic"

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Спрощений підхід до завантаження повідомлень
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error)
    // Використовуємо англійську як запасний варіант
    messages = (await import(`../../messages/en.json`)).default
  }

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 fontSize=%2290%22>🇺🇦</text></svg>"
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

