"use client"

import Link from "next/link"
import { Home } from "lucide-react"
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
    const newPathname = pathname.split("/").slice(2).join("/")
    router.push(`/${locale}/${newPathname}`)
  }

  const languages = [
    { code: "en", label: "EN" },
    { code: "uk", label: "UA" },
    { code: "es", label: "ES" },
  ]

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href={`/${currentLocale}`} className="flex items-center py-4 px-2">
                <Home className="h-8 w-8 mr-2 text-blue-400" />
                <span className="font-semibold text-gray-500 text-lg">{t("home")}</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`py-2 px-2 font-medium rounded transition duration-300 ${
                  currentLocale === lang.code
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

