import { houses } from "@/data/houses"
import Link from "next/link"

// Додаємо generateStaticParams для статичного експорту
export function generateStaticParams() {
  return houses.map((house) => ({
    id: house.id.toString(),
  }))
}

export default function HouseDetails({ params }: { params: { id: string } }) {
  const house = houses.find((h) => h.id === Number.parseInt(params.id))

  if (!house) {
    return <div>House not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{house.name}</h1>
      <img
        src={house.images && house.images.length > 0 ? house.images[0] : "/placeholder.svg"}
        alt={house.name}
        className="w-full h-64 object-cover mb-4 rounded-lg"
      />
      <p className="text-xl mb-2">Price: {house.price}</p>
      <p className="text-lg mb-2">Address: {house.address}</p>
      <p className="mb-4">{typeof house.description === "string" ? house.description : house.description.en}</p>
      <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
        Back to Home
      </Link>
    </div>
  )
}

