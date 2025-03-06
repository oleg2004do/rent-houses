"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Щось пішло не так</h2>
        <p className="text-gray-600 mb-6">Виникла помилка при завантаженні сторінки</p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Спробувати знову
          </button>
          <Link
            href="/"
            className="flex-1 text-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            На головну
          </Link>
        </div>
      </div>
    </div>
  )
}

