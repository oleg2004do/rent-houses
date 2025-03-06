import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Journey UA",
  description: "Find your dream home with Journey UA",
  icons: {
    icon: [
      { url: "/JOURNEY-UA.png", sizes: "32x32", type: "image/png" },
      { url: "/JOURNEY-UA.png", sizes: "192x192", type: "image/png" },
      { url: "/JOURNEY-UA.png", sizes: "512x512", type: "image/png" },
      { url: "/JOURNEY-UA.png", sizes: "1024x1024", type: "image/png" },
    ],
    shortcut: [{ url: "/JOURNEY-UA.png" }],
    apple: [
      { url: "/JOURNEY-UA.png", sizes: "180x180", type: "image/png" },
      { url: "/JOURNEY-UA.png", sizes: "1024x1024", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/JOURNEY-UA.png" sizes="any" />
        <link rel="apple-touch-icon" href="/JOURNEY-UA.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

