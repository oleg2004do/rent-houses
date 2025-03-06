export default function LocalePage({ params }: { params: { locale: string } }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Journey UA - {params.locale.toUpperCase()}</h1>
      <p className="mt-4 text-xl">
        {params.locale === "uk"
          ? "Сайт працює українською!"
          : params.locale === "es"
            ? "¡El sitio funciona en español!"
            : "The site works in English!"}
      </p>
      <div className="mt-8 flex gap-4">
        <a href="/" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Home
        </a>
        <a href="/en" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          English
        </a>
        <a href="/uk" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Українська
        </a>
        <a href="/es" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Español
        </a>
      </div>
    </div>
  )
}

