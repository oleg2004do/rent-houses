"use client"

import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Navbar = () => {
  const t = useTranslations("navbar")
  const pathname = usePathname()
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useState("en")

  useEffect(() => {
    const savedLocale = localStorage.getItem("userLocale") || "en"
    setCurrentLocale(savedLocale)
  }, [])

  const switchLanguage = (locale: string) => {
    localStorage.setItem("userLocale", locale)
    setCurrentLocale(locale)
    router.push(pathname.replace(/^\/[a-z]{2}/, `/${locale}`))
  }

  const languages = [
    { code: "en", flag: "/flags/usa.png", label: "English" },
    { code: "uk", flag: "/flags/ukraine.png", label: "Українська" },
    { code: "es", flag: "/flags/spain.png", label: "Español" },
  ]

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/" className="flex items-center py-4 px-2">
              <Image src="/rent.png" alt="Rent Icon" width={32} height={32} className="mr-2" />
              <span className="font-semibold text-gray-500 text-lg">{t("home")}</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`p-2 rounded-full transition duration-300 ${
                  currentLocale === lang.code ? "ring-2 ring-blue-500" : "hover:bg-gray-100"
                }`}
                aria-label={`Switch language to ${lang.label}`}
              >
                <Image
                  src={lang.flag || "/placeholder.svg"}
                  alt={lang.label}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

