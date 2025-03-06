"use client"

import { useEffect } from "react"

export default function DynamicEmojiFavicon() {
  useEffect(() => {
    // Додаємо emoji прапора України як іконку
    const link = document.createElement("link")
    link.rel = "icon"
    link.href =
      "/JOURNEY-UA.png"

    // Видаляємо існуючі іконки
    const existingIcons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
    existingIcons.forEach((icon) => icon.parentNode?.removeChild(icon))

    // Додаємо нову іконку
    document.head.appendChild(link)
  }, [])

  return null
}

