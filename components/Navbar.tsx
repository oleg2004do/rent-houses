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
  const [isChangingLanguage, setIsChangingLanguage] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLocale = localStorage.getItem("userLocale") || "en"
    setCurrentLocale(savedLocale)
  }, [])

  const switchLanguage = async (locale: string) => {
    if (!mounted || isChangingLanguage) return

    try {
      setIsChangingLanguage(true)

      // Зберігаємо нову локаль
      localStorage.setItem("userLocale", locale)
      setCurrentLocale(locale)

      // Отримуємо новий шлях
      const currentPath = pathname || "/"
      const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${locale}`)

      // М'яка навігація
      await router.push(newPath, { scroll: false })

      // Перезавантажуємо сторінку після короткої затримки
      setTimeout(() => {
        window.location.href = newPath
      }, 100)
    } catch (error) {
      console.error("Error changing language:", error)
      // Повертаємо попередню локаль
      setCurrentLocale(localStorage.getItem("userLocale") || "en")
    } finally {
      setIsChangingLanguage(false)
    }
  }

  const languages = [
    { code: "en", flag: "/flags/usa.png", label: "English" },
    { code: "uk", flag: "/flags/ukraine.png", label: "Українська" },
    { code: "es", flag: "/flags/spain.png", label: "Español" },
  ]

  // Не рендеримо нічого до монтування компонента
  if (!mounted) return null

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <Link
              href={`/${currentLocale}`}
              className="flex items-center py-4 px-2"
              onClick={(e) => {
                e.preventDefault()
                router.push(`/${currentLocale}`)
              }}
            >
              <Image src="/rent.png" alt="Rent Icon" width={32} height={32} className="mr-2" priority />
              <span className="font-semibold text-gray-500 text-lg">{t("home")}</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                disabled={isChangingLanguage}
                className={`p-2 rounded-full transition duration-300 ${
                  currentLocale === lang.code ? "ring-2 ring-blue-500" : "hover:bg-gray-100"
                } ${isChangingLanguage ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-label={`Switch language to ${lang.label}`}
              >
                <Image
                  src={lang.flag || "/placeholder.svg"}
                  alt={lang.label}
                  width={24}
                  height={24}
                  className="rounded-full"
                  priority
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

