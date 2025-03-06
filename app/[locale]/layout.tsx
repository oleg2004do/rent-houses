import type React from "react"
import "../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import HeadFavicon from "@/components/HeadFavicon"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Journey UA",
  description: "Find your dream home with Journey UA",
  icons: {
    icon: [
      { url: "/JOURNEY-UA.png", sizes: "16x16", type: "image/png" },
      { url: "/JOURNEY-UA.png", sizes: "32x32", type: "image/png" },
      { url: "/JOURNEY-UA.png", sizes: "48x48", type: "image/png" },
      { url: "/JOURNEY-UA.png", sizes: "192x192", type: "image/png" },
      { url: "/JOURNEY-UA.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/JOURNEY-UA.png" }],
    apple: [{ url: "/JOURNEY-UA.png", sizes: "1024x1024", type: "image/png" }],
  },
}

// Визначаємо підтримувані локалі
const locales = ["en", "uk", "es"]

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Перевіряємо, чи локаль підтримується
  if (!locales.includes(locale)) {
    return null
  }

  return (
    <html lang={locale}>
      <head>
        <HeadFavicon />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

// Генеруємо статичні параметри для всіх підтримуваних локалей
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "uk" }, { locale: "es" }]
}

export const dynamic = "force-static"

