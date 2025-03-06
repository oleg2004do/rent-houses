"use client"

import { useEffect } from "react"

export default function FaviconScript() {
  useEffect(() => {
    // Створюємо скрипт, який буде виконано негайно
    const script = document.createElement("script")
    script.innerHTML = `
      (function() {
        var link = document.querySelector('link[rel="icon"]');
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          link.type = 'image/png';
          document.head.appendChild(link);
        }
        link.href = '/JOURNEY-UA.png?v=' + Date.now();
        
        var shortcutLink = document.querySelector('link[rel="shortcut icon"]');
        if (!shortcutLink) {
          shortcutLink = document.createElement('link');
          shortcutLink.rel = 'shortcut icon';
          shortcutLink.type = 'image/png';
          document.head.appendChild(shortcutLink);
        }
        shortcutLink.href = '/JOURNEY-UA.png?v=' + Date.now();
        
        var appleLink = document.querySelector('link[rel="apple-touch-icon"]');
        if (!appleLink) {
          appleLink = document.createElement('link');
          appleLink.rel = 'apple-touch-icon';
          appleLink.type = 'image/png';
          document.head.appendChild(appleLink);
        }
        appleLink.href = '/JOURNEY-UA.png?v=' + Date.now();
      })();
    `
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}

