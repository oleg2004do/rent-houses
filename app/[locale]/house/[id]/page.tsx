"use client"

import { useState } from "react"
import { houses } from "@/data/houses"
import Link from "next/link"
import { useTranslations } from "next-intl"
import Navbar from "@/components/Navbar"
import { useParams } from "next/navigation"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { House } from "@/types"

export default function HouseDetails() {
  const t = useTranslations("house")
  const params = useParams()
  const house = houses.find((h) => h.id === Number(params.id))
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!house) {
    return <div>{t("notFound")}</div>
  }

  const images = house.images && house.images.length > 0 ? house.images : ["/placeholder.svg"]

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Get the current locale from the params
  const locale = (params.locale as string) || "en"

  // Helper function to get the correct description
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

        {/* Main image */}
        <div className="relative mb-4">
          <img
            src={images[0] || "/placeholder.svg"}
            alt={`${house.name} - Main Image`}
            className="w-full h-96 object-cover rounded-lg cursor-pointer"
            onClick={openModal}
          />
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-white bg-opacity-75 px-2 py-1 rounded">
              +{images.length - 1}
            </div>
          )}
        </div>

        <p className="text-xl mb-2">
          {t("price")}: {house.price}
        </p>
        <p className="text-lg mb-2">
          {t("address")}: {house.address}
        </p>
        <p className="mb-4">{getDescription(house, locale)}</p>
        <Link
          href={`/${params.locale}`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          {t("backToHome")}
        </Link>
      </div>

      {/* Modal for full-size image gallery */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center">
            <button onClick={closeModal} className="absolute top-4 right-4 text-white" aria-label={t("closeModal")}>
              <X size={24} />
            </button>
            <button onClick={prevImage} className="absolute left-4 text-white" aria-label={t("previousImage")}>
              <ChevronLeft size={24} />
            </button>
            <img
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`${house.name} - Full size image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            <button onClick={nextImage} className="absolute right-4 text-white" aria-label={t("nextImage")}>
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

