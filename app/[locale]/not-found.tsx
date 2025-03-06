"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

export default function NotFound() {
  const params = useParams()
  const locale = params.locale || "en"

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-6">Сторінку не знайдено</h2>
        <p className="text-gray-500 mb-8">Вибачте, сторінка, яку ви шукаєте, не існує або була переміщена.</p>
        <Link
          href={`/${locale}`}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Повернутися на головну
        </Link>
      </div>
    </div>
  )
}

