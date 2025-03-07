"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
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
  const [zoomLevel, setZoomLevel] = useState(1)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([])
  const [thumbnailsLoaded, setThumbnailsLoaded] = useState<boolean[]>([])
  const [isChangingImage, setIsChangingImage] = useState(false)

  // Перевіряємо, чи є будинок
  if (!house) {
    return <div>{t.notFound}</div>
  }

  const images = useMemo(() => {
    return house.images && house.images.length > 0 ? house.images : ["/placeholder.svg"]
  }, [house.images])

  // Ініціалізація масивів стану при першому рендері
  useEffect(() => {
    setImagesLoaded(Array(images.length).fill(false))
    setThumbnailsLoaded(Array(images.length).fill(false))
  }, [images.length])

  // Оптимізована функція для зміни зображення з запобіганням частих змін
  const changeImage = useCallback(
    (index: number) => {
      if (isChangingImage) return

      setIsChangingImage(true)
      setCurrentImageIndex(index)

      // Дозволяємо наступну зміну зображення через невеликий проміжок часу
      setTimeout(() => {
        setIsChangingImage(false)
      }, 100)
    },
    [isChangingImage],
  )

  const nextImage = useCallback(() => {
    if (isChangingImage) return
    changeImage(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1)
  }, [changeImage, currentImageIndex, images.length, isChangingImage])

  const prevImage = useCallback(() => {
    if (isChangingImage) return
    changeImage(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1)
  }, [changeImage, currentImageIndex, images.length, isChangingImage])

  const openModal = useCallback(() => {
    setIsModalOpen(true)
    setZoomLevel(1) // Скидаємо рівень зуму при відкритті модального вікна
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const zoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3))
  }, [])

  const zoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
  }, [])

  const resetZoom = useCallback(() => {
    setZoomLevel(1)
  }, [])

  const getDescription = useCallback((house: House, locale: string): string => {
    return house.description[locale as keyof typeof house.description] || house.description.en
  }, [])

  const getAdditionalInfo = useCallback((house: House, locale: string): string => {
    return house.additionalInfo[locale as keyof typeof house.additionalInfo] || house.additionalInfo.en
  }, [])

  // Попереднє завантаження мініатюр з обмеженням одночасних завантажень
  useEffect(() => {
    if (!images.length) return

    // Максимальна кількість одночасних завантажень
    const MAX_CONCURRENT_LOADS = 2
    let activeLoads = 0
    const queue = [...Array(images.length).keys()]

    // Спочатку завантажуємо поточне зображення
    if (currentImageIndex >= 0 && currentImageIndex < images.length) {
      const currentImg = new (window.Image as any)()
      currentImg.src = images[currentImageIndex]
      currentImg.onload = () => {
        setImagesLoaded((prev) => {
          const newState = [...prev]
          newState[currentImageIndex] = true
          return newState
        })
      }
    }

    const loadNextThumbnail = () => {
      if (queue.length === 0 || activeLoads >= MAX_CONCURRENT_LOADS) return

      const index = queue.shift()
      if (index === undefined) return

      // Пропускаємо поточне зображення, воно вже завантажується
      if (index === currentImageIndex) {
        loadNextThumbnail()
        return
      }

      activeLoads++

      const img = new (window.Image as any)()
      img.src = images[index]

      img.onload = () => {
        setThumbnailsLoaded((prev) => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })

        activeLoads--
        // Затримка перед завантаженням наступного зображення
        setTimeout(loadNextThumbnail, 100)
      }

      img.onerror = () => {
        activeLoads--
        setTimeout(loadNextThumbnail, 100)
      }
    }

    // Запускаємо завантаження перших мініатюр з затримкою
    setTimeout(() => {
      for (let i = 0; i < MAX_CONCURRENT_LOADS; i++) {
        loadNextThumbnail()
      }
    }, 300)

    return () => {
      // Очищення, якщо компонент розмонтується
      activeLoads = 0
    }
  }, [images, currentImageIndex])

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

  // Мемоізуємо рендеринг додаткової інформації для покращення продуктивності
  const additionalInfoContent = useMemo(() => {
    if (!house.additionalInfo || !getAdditionalInfo(house, locale)) return null

    const info = getAdditionalInfo(house, locale)
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
  }, [house.additionalInfo, getAdditionalInfo, locale])

  // Мемоізуємо рендеринг мініатюр для покращення продуктивності
  const thumbnailsContent = useMemo(() => {
    if (images.length <= 1) return null

    return (
      <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative min-w-[120px] h-[90px] rounded-md overflow-hidden cursor-pointer border-2 ${
              index === currentImageIndex ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => !isChangingImage && changeImage(index)}
          >
            {/* Плейсхолдер для мініатюри */}
            <div
              className={`absolute inset-0 bg-gray-200 animate-pulse ${thumbnailsLoaded[index] ? "hidden" : "block"}`}
            />
            {thumbnailsLoaded[index] && (
              <img
                src={image || "/placeholder.svg"}
                alt={`${house.name} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>
        ))}
      </div>
    )
  }, [images, currentImageIndex, thumbnailsLoaded, house.name, isChangingImage, changeImage])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{house.name}</h1>

      <div className="relative mb-4">
        <div className="flex justify-center">
          <div
            className={`w-full max-h-[600px] bg-gray-200 animate-pulse rounded-lg ${imagesLoaded[currentImageIndex] ? "hidden" : "block"}`}
          />
          {imagesLoaded[currentImageIndex] && (
            <img
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`${house.name} - Image ${currentImageIndex + 1}`}
              className="max-h-[600px] w-auto object-contain rounded-lg cursor-pointer"
              onClick={openModal}
            />
          )}
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 p-2 rounded-full z-20"
              aria-label={t.previousImage}
              disabled={isChangingImage}
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
              disabled={isChangingImage}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </>
        )}
        <div className="absolute bottom-2 right-2 bg-white bg-opacity-75 px-2 py-1 rounded text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Мініатюри зображень */}
      {thumbnailsContent}

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

      {/* Додаткова інформація (тепер відображається одразу) */}
      {house.additionalInfo && getAdditionalInfo(house, locale) && (
        <div className="mt-4 p-6 bg-gray-100 rounded-lg mb-6">{additionalInfoContent}</div>
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
                  disabled={isChangingImage}
                >
                  <ChevronLeft className="h-10 w-10 text-white" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 z-20 bg-black bg-opacity-70 rounded-full"
                  aria-label={t.nextImage}
                  disabled={isChangingImage}
                >
                  <ChevronRight className="h-10 w-10 text-white" />
                </button>
              </>
            )}

            <div className="overflow-auto w-full h-full flex items-center justify-center">
              <div style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.2s" }}>
                <img
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${house.name} - Full size image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
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

