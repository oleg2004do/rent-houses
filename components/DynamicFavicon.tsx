"use client"

import { useEffect } from "react"

export default function DynamicFavicon() {
  useEffect(() => {
    // Функція для встановлення favicon
    const setFavicon = () => {
      try {
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
          let link = document.querySelector(`link[rel="${iconType.rel}"]`) as HTMLLinkElement

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
      } catch (error) {
        console.error("Error setting favicon:", error)
      }
    }

    // Встановлюємо іконку при завантаженні
    setFavicon()

    // Встановлюємо іконку при фокусі на вікні
    window.addEventListener("focus", setFavicon)

    return () => {
      window.removeEventListener("focus", setFavicon)
    }
  }, [])

  return null
}

