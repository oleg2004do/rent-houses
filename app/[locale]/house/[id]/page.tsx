import { houses } from "@/data/houses"
import HouseDetailsClient from "./house-details-client"

// Вказуємо, що цей компонент повинен рендеритися динамічно
export const dynamic = "force-dynamic"

// Функція generateStaticParams для статичного експорту
export function generateStaticParams() {
  const locales = ["en", "uk", "es"]
  const params = []

  // Генеруємо всі можливі комбінації локалей та ID будинків
  for (const locale of locales) {
    for (const house of houses) {
      params.push({
        locale,
        id: house.id.toString(),
      })
    }
  }

  return params
}

// Серверний компонент, який передає дані клієнтському компоненту
export default function HouseDetailsPage({ params }: { params: { locale: string; id: string } }) {
  const house = houses.find((h) => h.id === Number(params.id))

  // Якщо будинок не знайдено, повертаємо помилку (це буде оброблено на клієнті)
  if (!house) {
    return <HouseDetailsClient house={null} params={params} />
  }

  return <HouseDetailsClient house={house} params={params} />
}

