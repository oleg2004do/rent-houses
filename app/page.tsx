export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Journey UA</h1>
      <p className="mt-4 text-xl">Сайт працює!</p>
      <div className="mt-8 flex gap-4">
        <a href="/en" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors">
          English
        </a>
        <a href="/uk" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors">
          Українська
        </a>
        <a href="/es" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors">
          Español
        </a>
      </div>
    </div>
  )
}

