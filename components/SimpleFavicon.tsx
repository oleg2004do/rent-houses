"use client"

import { useEffect } from "react"

export default function SimpleFavicon() {
  useEffect(() => {
    // Додаємо emoji прапора України як резервну іконку
    const link = document.createElement("link")
    link.rel = "icon"
    link.href =
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 fontSize=%2290%22>🇺🇦</text></svg>"
    document.head.appendChild(link)

    // Спроба завантажити основну іконку
    const img = new Image()
    img.onload = () => {
      link.href = "/JOURNEY-UA.png?" + Date.now()
    }
    img.src = "/JOURNEY-UA.png"
  }, [])

  return null
}

