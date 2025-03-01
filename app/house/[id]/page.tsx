"use client"

import { houses } from "@/data/houses"
import Link from "next/link"
import { useTranslations } from "next-intl"
import Navbar from "@/components/Navbar"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { House } from "@/types"

export default function HouseDetails({ params }: { params: { id: string; locale: string } }) {
  const t = useTranslations("house")
  const house = houses.find((h) => h.id === Number.parseInt(params.id))
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!house) {
    return <div>{t("notFound")}</div>
  }

  const images = house.images.length > 0 ? house.images : ["/placeholder.svg"]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const getDescription = (house: House, locale: string): string => {
    if (typeof house.description === "string") {
      return house.description
    }
    return house.description[locale as keyof typeof house.description] || house.description.en
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{house.name}</h1>

        <div className="relative mb-4">
          <img
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={`${house.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-96 object-cover rounded-lg"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex space-x-2 mb-4 overflow-x-auto">
            {images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${house.name} - Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                  index === currentImageIndex ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}

        <p className="text-xl mb-2">
          {t("price")}: {house.price}
        </p>
        <p className="text-lg mb-2">
          {t("address")}: {house.address}
        </p>
        <p className="mb-4">{getDescription(house, params.locale)}</p>
        <Link
          href={`/${params.locale}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          {t("backToHome")}
        </Link>
      </div>
    </div>
  )
}

