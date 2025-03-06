"use client"

import { useEffect, useState } from "react"
import HouseList from "@/components/HouseList"
import { useTranslations } from "next-intl"

// Вбудований компонент LoadingSpinner, щоб уникнути проблем з імпортом
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

export default function Home() {
  const t = useTranslations("home")
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Визначаємо, чи це мобільний пристрій
    setIsMobile(window.innerWidth <= 768)

    // Імітуємо завантаження для плавного переходу
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {t("error.title", { defaultMessage: "Щось пішло не так" })}
          </h2>
          <p className="text-gray-600 mb-4">
            {t("error.message", { defaultMessage: "Ми намагаємося виправити проблему. Будь ласка, зачекайте..." })}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {t("error.retry", { defaultMessage: "Спробувати знову" })}
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className={`container mx-auto ${isMobile ? "px-4" : "px-8"} py-8`}>
        <h1 className={`text-${isMobile ? "2xl" : "3xl"} font-bold mb-4`}>{t("title")}</h1>
        <p className="mb-8">{t("description")}</p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className={`text-${isMobile ? "xl" : "2xl"} font-semibold mb-3`}>{t("housingTitle")}</h2>
          <p className="mb-4">{t("housingDescription")}</p>

          <h3 className={`text-${isMobile ? "lg" : "xl"} font-semibold mb-3`}>{t("offerTitle")}</h3>
          <ul className="space-y-2 mb-4">
            {Array.isArray(t.raw("offerList")) &&
              t.raw("offerList").map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span>{item}</span>
                </li>
              ))}
          </ul>
          <p className="font-medium">{t("contactInfo")}</p>
        </div>

        <HouseList />
      </div>
    </main>
  )
}

