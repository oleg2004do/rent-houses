import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Journey UA",
  description: "Find your dream home with Journey UA",
  icons: {
    icon: [{ url: "/JOURNEY-UA.png" }],
    shortcut: [{ url: "/JOURNEY-UA.png" }],
    apple: [{ url: "/JOURNEY-UA.png" }],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/JOURNEY-UA.png" />
        <link rel="shortcut icon" href="/JOURNEY-UA.png" />
        <link rel="apple-touch-icon" href="/JOURNEY-UA.png" />
        <link rel="preload" href="/JOURNEY-UA.png" as="image" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

