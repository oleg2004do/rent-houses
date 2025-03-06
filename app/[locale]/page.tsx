import { notFound } from "next/navigation"

const locales = ["en", "uk", "es"]

export default function LocalePage({ params }: { params: { locale: string } }) {
  // Перевіряємо, чи локаль підтримується
  if (!locales.includes(params.locale)) {
    notFound()
  }

  const messages = {
    uk: "Сайт працює українською!",
    es: "¡El sitio funciona en español!",
    en: "The site works in English!",
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Journey UA - {params.locale.toUpperCase()}</h1>
      <p className="mt-4 text-xl">{messages[params.locale as keyof typeof messages]}</p>
      <div className="mt-8 flex gap-4">
        {locales.map((locale) => (
          <a
            key={locale}
            href={`/${locale}`}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors"
          >
            {locale === "uk" ? "Українська" : locale === "es" ? "Español" : "English"}
          </a>
        ))}
      </div>
    </div>
  )
}

// Генеруємо статичні параметри для всіх підтримуваних локалей
export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }))
}

