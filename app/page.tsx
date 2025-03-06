export const dynamic = "force-static"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Welcome to Journey UA</h1>
      <p className="mb-8">Please select your language:</p>
      <div className="flex gap-4">
        <a href="/en" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          English
        </a>
        <a href="/uk" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Українська
        </a>
        <a href="/es" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Español
        </a>
      </div>
    </div>
  )
}

