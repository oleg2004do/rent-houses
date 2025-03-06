"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Логуємо помилку
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Щось пішло не так</h2>
      <p className="text-gray-600 mb-4">Виникла помилка при завантаженні сторінки</p>
      <div className="flex gap-4">
        <button onClick={() => reset()} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Спробувати знову
        </button>
        <a href="/" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          На головну
        </a>
      </div>
    </div>
  )
}

