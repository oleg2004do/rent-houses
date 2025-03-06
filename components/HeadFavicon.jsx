"use client"

import { useEffect } from "react"

export default function HeadFavicon() {
  useEffect(() => {
    // Функція для встановлення favicon
    const setFavicon = () => {
      // Додаємо timestamp для запобігання кешуванню
      const timestamp = Date.now()
      const iconUrl = `/JOURNEY-UA.png?v=${timestamp}`

      // Типи іконок, які ми хочемо додати
      const iconTypes = [
        { rel: "icon", type: "image/png", sizes: "512x512" },
        { rel: "shortcut icon", type: "image/png", sizes: "512x512" },
        { rel: "apple-touch-icon", type: "image/png", sizes: "512x512" },
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
          link.sizes = iconType.sizes
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

    return () => {
      window.removeEventListener("focus", setFavicon)
    }
  }, [])

  return null
}

