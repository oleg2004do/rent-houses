import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">404 - Сторінку не знайдено</h2>
      <p className="text-gray-600 mb-8">Вибачте, сторінка, яку ви шукаєте, не існує або була переміщена.</p>
      <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        На головну
      </Link>
    </div>
  )
}

