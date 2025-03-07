"use client"

import Link from "next/link"
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
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Прелоад зображень з обмеженням
    const loadImages = async () => {
      // Завантажуємо зображення по черзі з затримкою
      for (let i = 0; i < houses.length; i++) {
        const house = houses[i]
        if (house.images && house.images.length > 0) {
          const img = new (window.Image as any)()
          img.src = house.images[0]
          img.onload = () => {
            setImagesLoaded((prev) => ({ ...prev, [house.id]: true }))
          }
          // Затримка між завантаженнями зображень
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      }
    }

    loadImages()

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className={`grid grid-cols-1 ${isMobile ? "" : "md:grid-cols-2 lg:grid-cols-3"} gap-4`}>
      {houses.map((house: House) => (
        <div key={house.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative w-full h-48">
            {/* Плейсхолдер, який показується до завантаження зображення */}
            <div
              className={`absolute inset-0 bg-gray-200 animate-pulse ${imagesLoaded[house.id] ? "opacity-0" : "opacity-100"}`}
              style={{ transition: "opacity 0.3s ease-in-out" }}
            />

            {imagesLoaded[house.id] && (
              <img
                src={house.images && house.images.length > 0 ? house.images[0] : "/placeholder.svg"}
                alt={house.name}
                className="w-full h-full object-cover"
                style={{
                  opacity: imagesLoaded[house.id] ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />
            )}
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{house.name}</h2>
            <p className="text-gray-600 mb-2">
              {t.price}: {house.price}
            </p>
            <p className="text-gray-600 mb-2">
              {t.address}:
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(house.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-1"
              >
                {house.address}
              </a>
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

