"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const router = useRouter()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Client error:", event.error)
      setHasError(true)

      // Спроба відновлення через 2 секунди
      setTimeout(() => {
        setHasError(false)
        router.refresh()
      }, 2000)
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [router])

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Щось пішло не так</h2>
          <p className="text-gray-600 mb-4">Ми намагаємося виправити проблему. Будь ласка, зачекайте...</p>
          <button
            onClick={() => {
              setHasError(false)
              router.refresh()
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Спробувати знову
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

