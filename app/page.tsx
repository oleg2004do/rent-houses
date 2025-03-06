import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Journey UA</h1>
      <p className="text-xl mb-8">Сайт працює!</p>
      <div className="flex gap-4">
        <Link href="/en" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors">
          English
        </Link>
        <Link href="/uk" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors">
          Українська
        </Link>
        <Link href="/es" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors">
          Español
        </Link>
      </div>
    </div>
  )
}

