"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Щось пішло не так</h2>
          <p className="text-gray-600 mb-4">Виникла критична помилка</p>
          <div className="flex gap-4">
            <button onClick={() => reset()} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Спробувати знову
            </button>
            <a href="/" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              На головну
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}

