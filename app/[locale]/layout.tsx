import type React from "react"
import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { setRequestLocale } from "next-intl/server"
import ErrorBoundary from "@/components/ErrorBoundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Journey UA - Housing",
  description: "Find your dream home with Journey UA",
}

export const dynamic = "force-dynamic"
export const revalidate = 0

export function generateStaticParams() {
  return [{ locale: "uk" }, { locale: "en" }, { locale: "es" }]
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  setRequestLocale(locale)

  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ErrorBoundary>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

