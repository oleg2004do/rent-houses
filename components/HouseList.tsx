"use client"

import Link from "next/link"
import Image from "next/image"
import { houses } from "@/data/houses"
import { useState, useEffect } from "react"
import type { House } from "@/types"
import enMessages from "@/messages/en.json"
import ukMessages from "@/messages/uk.json"
import esMessages from "@/messages/es.json"

const HouseList = ({ locale }: { locale: string }) => {
  // Вбудована функція для отримання перекладів
  const getTranslations = () => {
    if (locale === "uk") return ukMessages.house
    if (locale === "es") return esMessages.house
    return enMessages.house
  }

  const t = getTranslations()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className={`grid grid-cols-1 ${isMobile ? "" : "md:grid-cols-2 lg:grid-cols-3"} gap-4`}>
      {houses.map((house: House) => (
        <div key={house.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative w-full h-48">
            <Image
              src={house.images && house.images.length > 0 ? house.images[0] : "/placeholder.svg"}
              alt={house.name}
              fill
              style={{ objectFit: "cover" }}
              loading="lazy"
              sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{house.name}</h2>
            <p className="text-gray-600 mb-2">
              {t.price}: {house.price}
            </p>
            <p className="text-gray-600 mb-2">
              {t.address}: {house.address}
            </p>
            <p className="text-gray-600 mb-4">
              {typeof house.description === "string"
                ? house.description
                : house.description[locale as keyof typeof house.description] || house.description.en}
            </p>
            <Link
              href={`/${locale}/house/${house.id}`}
              className="inline-block w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              {t.viewDetails}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HouseList

