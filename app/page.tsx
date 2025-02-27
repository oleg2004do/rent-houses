import Navbar from "@/components/Navbar"
import HouseList from "@/components/HouseList"
import { useTranslations } from "next-intl"

export default function Home() {
  const t = useTranslations("home")

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
        <p className="mb-8">{t("description")}</p>
        <HouseList />
      </div>
    </main>
  )
}

