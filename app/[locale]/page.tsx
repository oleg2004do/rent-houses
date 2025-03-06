"use client"

import { useTranslations } from "next-intl"
import HouseList from "@/components/HouseList"

export default function Home() {
  const t = useTranslations("home")

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
        <p className="mb-8">{t("description")}</p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-3">{t("housingTitle")}</h2>
          <p className="mb-4">{t("housingDescription")}</p>

          <h3 className="text-xl font-semibold mb-3">{t("offerTitle")}</h3>
          <ul className="space-y-2 mb-4">
            {Array.isArray(t.raw("offerList")) &&
              t.raw("offerList").map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span>{item}</span>
                </li>
              ))}
          </ul>
          <p className="font-medium">{t("contactInfo")}</p>
        </div>

        <HouseList />
      </div>
    </main>
  )
}

