import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HouseList from "@/components/HouseList"
import enMessages from "@/messages/en.json"
import ukMessages from "@/messages/uk.json"
import esMessages from "@/messages/es.json"

export const dynamic = "force-static"

export default function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale

  // Вбудована функція для отримання перекладів
  const getTranslations = () => {
    if (locale === "uk") return ukMessages.home
    if (locale === "es") return esMessages.home
    return enMessages.home
  }

  const t = getTranslations()

  return (
    <main>
      <Navbar locale={locale} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
        <p className="mb-6">{t.description}</p>

        <h2 className="text-2xl font-bold mb-3">{t.housingTitle}</h2>
        <p className="mb-6">{t.housingDescription}</p>

        <h3 className="text-xl font-bold mb-3">{t.offerTitle}</h3>
        <ul className="mb-6 space-y-2">
          {t.offerList.map((item: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">{item.substring(0, 2)}</span>
              <span>{item.substring(2)}</span>
            </li>
          ))}
        </ul>

        <p className="mb-8">{t.contactInfo}</p>

        <HouseList locale={locale} />
      </div>
      <Footer locale={locale} />
    </main>
  )
}

