"use client"

import { useEffect } from "react"

export default function DynamicFavicon() {
  useEffect(() => {
    // Функція для встановлення favicon
    const setFavicon = () => {
      // Додаємо timestamp для запобігання кешуванню
      const timestamp = Date.now()
      const iconUrl = `/JOURNEY-UA.png?v=${timestamp}`

      // Типи іконок, які ми хочемо додати
      const iconTypes = [
        { rel: "icon", type: "image/png" },
        { rel: "shortcut icon", type: "image/png" },
        { rel: "apple-touch-icon", type: "image/png" },
      ]

      // Для кожного типу іконки
      iconTypes.forEach((iconType) => {
        // Шукаємо існуючий елемент з таким rel
        let link = document.querySelector(`link[rel="${iconType.rel}"]`)

        // Якщо елемент не знайдено, створюємо новий
        if (!link) {
          link = document.createElement("link")
          link.rel = iconType.rel
          link.type = iconType.type
          document.head.appendChild(link)
        }

        // Оновлюємо URL іконки
        link.href = iconUrl
      })
    }

    // Встановлюємо іконку негайно
    setFavicon()

    // Встановлюємо іконку при фокусі на вікні
    window.addEventListener("focus", setFavicon)

    // Встановлюємо іконку при завантаженні сторінки
    window.addEventListener("load", setFavicon)

    // Встановлюємо іконку при зміні маршруту
    const handleRouteChange = () => {
      setTimeout(setFavicon, 100)
    }

    // Додаємо обробник для Next.js навігації, якщо він доступний
    if (typeof window !== "undefined" && window.next) {
      window.next.router.events.on("routeChangeComplete", handleRouteChange)
    }

    return () => {
      window.removeEventListener("focus", setFavicon)
      window.removeEventListener("load", setFavicon)

      if (typeof window !== "undefined" && window.next) {
        window.next.router.events.off("routeChangeComplete", handleRouteChange)
      }
    }
  }, [])

  return null
}

