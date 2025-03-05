"use client"

import { useEffect } from "react"

export default function DynamicFavicon() {
  useEffect(() => {
    // Функція для динамічної зміни favicon
    const updateFavicon = () => {
      // Додаємо timestamp для обходу кешування
      const timestamp = Date.now()

      // Знаходимо і��нуючий link елемент або створюємо новий
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement
      if (!link) {
        link = document.createElement("link")
        link.rel = "icon"
        document.head.appendChild(link)
      }

      // Оновлюємо атрибути
      link.href = `/JOURNEY-UA.png?v=${timestamp}`
      link.type = "image/png"
    }

    // Викликаємо функцію при завантаженні компонента
    updateFavicon()

    // Також оновлюємо іконку при фокусі на вікні
    window.addEventListener("focus", updateFavicon)

    return () => {
      window.removeEventListener("focus", updateFavicon)
    }
  }, [])

  return null
}

