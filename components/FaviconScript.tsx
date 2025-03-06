"use client"

import { useEffect } from "react"

export default function FaviconScript() {
  useEffect(() => {
    // Функція для примусового оновлення favicon
    const updateFavicon = () => {
      // Знаходимо існуючі елементи favicon
      const existingFavicons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')

      // Видаляємо їх
      existingFavicons.forEach((favicon) => favicon.remove())

      // Створюємо нові елементи з різними розмірами
      const sizes = [32, 192, 512, 1024]

      sizes.forEach((size) => {
        const link = document.createElement("link")
        link.rel = "icon"
        link.type = "image/png"
        // Використовуємо setAttribute замість прямого присвоєння
        link.setAttribute("sizes", `${size}x${size}`)

        // Додаємо timestamp для запобігання кешуванню
        link.href = `/JOURNEY-UA.png?v=${Date.now()}`

        document.head.appendChild(link)
      })

      // Додаємо shortcut icon
      const shortcutLink = document.createElement("link")
      shortcutLink.rel = "shortcut icon"
      shortcutLink.type = "image/png"
      shortcutLink.href = `/JOURNEY-UA.png?v=${Date.now()}`
      document.head.appendChild(shortcutLink)

      // Додаємо apple-touch-icon
      const appleLink = document.createElement("link")
      appleLink.rel = "apple-touch-icon"
      // Використовуємо setAttribute замість прямого присвоєння
      appleLink.setAttribute("sizes", "1024x1024")
      appleLink.href = `/JOURNEY-UA.png?v=${Date.now()}`
      document.head.appendChild(appleLink)
    }

    // Викликаємо функцію при завантаженні сторінки
    updateFavicon()

    // Також оновлюємо при фокусі на вікні
    window.addEventListener("focus", updateFavicon)

    return () => {
      window.removeEventListener("focus", updateFavicon)
    }
  }, [])

  return null
}

