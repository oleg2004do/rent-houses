"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"
import type { House } from "@/types"
import enMessages from "@/messages/en.json"
import ukMessages from "@/messages/uk.json"
import esMessages from "@/messages/es.json"

interface HouseDetailsClientProps {
  house: House | null
  params: { locale: string; id: string }
}

export default function HouseDetailsClient({ house, params }: HouseDetailsClientProps) {
  const locale = params.locale

  // Вбудована функція для отримання перекладів
  const getTranslations = () => {
    if (locale === "uk") return ukMessages.house
    if (locale === "es") return esMessages.house
    return enMessages.house
  }

  const t = getTranslations()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([])
  const [preloadedImages, setPreloadedImages] = useState<boolean[]>([])

  if (!house) {
    return <div>{t.notFound}</div>
  }

  const images = house.images && house.images.length > 0 ? house.images : ["/placeholder.svg"]

  // Прелоад всіх зображень будинку
  useEffect(() => {
    const newPreloadedImages = Array(images.length).fill(false)

    images.forEach((src, index) => {
      const img = new (window.Image as any)()
      img.src = src
      img.onload = () => {
        setPreloadedImages((prev) => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }
    })

    setImagesLoaded(Array(images.length).fill(false))
    setPreloadedImages(newPreloadedImages)
  }, [images])

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const openModal = () => {
    setIsModalOpen(true)
    setZoomLevel(1) // Скидаємо рівень зуму при відкритті модального вікна
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3))
  }

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
  }

  const resetZoom = () => {
    setZoomLevel(1)
  }

  const getDescription = (house: House, locale: string): string => {
    return house.description[locale as keyof typeof house.description] || house.description.en
  }

  const getAdditionalInfo = (house: House, locale: string): string => {
    return house.additionalInfo[locale as keyof typeof house.additionalInfo] || house.additionalInfo.en
  }

  const renderAdditionalInfo = (info: string) => {
    return info.split("\n").map((line, index) => {
      if (line.startsWith("✅")) {
        return (
          <li key={index} className="flex items-start mb-2">
            <span className="text-green-500 mr-2">✅</span>
            {line.substring(2)}
          </li>
        )
      } else if (line.startsWith("🛏") || line.startsWith("🚿") || line.startsWith("💰")) {
        return (
          <li key={index} className="flex items-start mb-2">
            <span className="mr-2">{line.charAt(0)}</span>
            {line.substring(2)}
          </li>
        )
      } else if (line.startsWith("✔️")) {
        return (
          <li key={index} className="flex items-start ml-4 mb-1">
            <span className="text-green-500 mr-2">✔️</span>
            {line.substring(3)}
          </li>
        )
      } else if (line.startsWith("🚫")) {
        return (
          <li key={index} className="flex items-start mb-1">
            <span className="text-red-500 mr-2">🚫</span>
            {line.substring(2)}
          </li>
        )
      } else if (line.startsWith("📆")) {
        return (
          <li key={index} className="flex items-start mb-1">
            <span className="mr-2">📆</span>
            {line.substring(2)}
          </li>
        )
      } else if (line.trim() === "") {
        return <br key={index} />
      } else if (line.endsWith(":")) {
        return (
          <h3 key={index} className="font-bold text-lg mt-4 mb-2">
            {line}
          </h3>
        )
      } else {
        return (
          <p key={index} className="mb-2">
            {line}
          </p>
        )
      }
    })
  }

  // Прелоад наступного і попереднього зображення
  useEffect(() => {
    if (images.length <= 1) return

    const nextIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1

    const preloadNext = new (window.Image as any)()
    preloadNext.src = images[nextIndex]

    const preloadPrev = new (window.Image as any)()
    preloadPrev.src = images[prevIndex]
  }, [currentImageIndex, images])

  // Блокування прокрутки при відкритому модальному вікні
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isModalOpen])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{house.name}</h1>

      <div className="relative mb-4">
        {/* Плейсхолдер для зображення */}
        <div
          className={`w-full h-96 bg-gray-200 animate-pulse rounded-lg ${imagesLoaded[currentImageIndex] ? "hidden" : "block"}`}
        />

        <Image
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={`${house.name} - Image ${currentImageIndex + 1}`}
          width={800}
          height={600}
          className={`w-full h-96 object-cover rounded-lg cursor-pointer ${imagesLoaded[currentImageIndex] ? "block" : "hidden"}`}
          onClick={openModal}
          priority={true}
          onLoad={() => {
            const newImagesLoaded = [...imagesLoaded]
            newImagesLoaded[currentImageIndex] = true
            setImagesLoaded(newImagesLoaded)
          }}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 p-2 rounded-full z-20"
              aria-label={t.previousImage}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 p-2 rounded-full z-20"
              aria-label={t.nextImage}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </>
        )}
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-75 px-2 py-1 rounded text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      <p className="text-xl mb-2">
        {t.price}: {house.price}
      </p>
      <p className="text-lg mb-2">
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
      <p className="mb-4">{getDescription(house, locale)}</p>

      {house.additionalInfo && getAdditionalInfo(house, locale) && (
        <div className="mb-4">
          <button
            onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {showAdditionalInfo ? t.hideAdditionalInfo : t.showAdditionalInfo}
          </button>
          {showAdditionalInfo && (
            <div className="mt-4 p-6 bg-gray-100 rounded-lg">
              {renderAdditionalInfo(getAdditionalInfo(house, locale))}
            </div>
          )}
        </div>
      )}

      <Link
        href={`/${params.locale}`}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        {t.backToHome}
      </Link>

      {/* Модальне вікно для перегляду зображень */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-3 z-20 bg-black bg-opacity-70 rounded-full"
              aria-label={t.closeGallery}
            >
              <X className="h-8 w-8 text-white" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 z-20 bg-black bg-opacity-70 rounded-full"
                  aria-label={t.previousImage}
                >
                  <ChevronLeft className="h-10 w-10 text-white" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 z-20 bg-black bg-opacity-70 rounded-full"
                  aria-label={t.nextImage}
                >
                  <ChevronRight className="h-10 w-10 text-white" />
                </button>
              </>
            )}

            <div className="overflow-auto w-full h-full flex items-center justify-center">
              <div style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.2s" }}>
                <Image
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${house.name} - Full size image ${currentImageIndex + 1}`}
                  width={1200}
                  height={900}
                  className="max-w-full max-h-full object-contain"
                  priority={true}
                />
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <button onClick={zoomIn} className="bg-black bg-opacity-70 p-2 rounded-full text-white">
                <ZoomIn className="h-6 w-6" />
              </button>
              <button onClick={zoomOut} className="bg-black bg-opacity-70 p-2 rounded-full text-white">
                <ZoomOut className="h-6 w-6" />
              </button>
              <button onClick={resetZoom} className="bg-black bg-opacity-70 p-2 rounded-full text-white text-sm">
                Reset
              </button>
            </div>

            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

