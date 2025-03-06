import Link from "next/link"

const messages = {
  uk: {
    title: "Journey UA - Українська",
    description: "Сайт працює українською!",
    home: "На головну",
  },
  en: {
    title: "Journey UA - English",
    description: "The site works in English!",
    home: "Home",
  },
  es: {
    title: "Journey UA - Español",
    description: "¡El sitio funciona en español!",
    home: "Inicio",
  },
}

export default function LocalePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as keyof typeof messages
  const msg = messages[locale] || messages.en

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">{msg.title}</h1>
      <p className="text-xl mb-8">{msg.description}</p>
      <div className="flex gap-4">
        <Link href="/" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors">
          {msg.home}
        </Link>
        {Object.keys(messages).map((l) => (
          <Link
            key={l}
            href={`/${l}`}
            className={`rounded px-4 py-2 text-white transition-colors ${
              l === locale ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {l === "uk" ? "Українська" : l === "es" ? "Español" : "English"}
          </Link>
        ))}
      </div>
    </div>
  )
}

