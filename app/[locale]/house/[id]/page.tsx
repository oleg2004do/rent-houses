import { houses } from "@/data/houses"
import HouseDetailsClient from "./house-details-client"

export const dynamic = "force-static"

export function generateStaticParams() {
  return houses.map((house) => ({
    id: house.id.toString(),
  }))
}

export default function HouseDetails({ params }: { params: { locale: string; id: string } }) {
  const house = houses.find((h) => h.id === Number.parseInt(params.id))

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HouseDetailsClient house={house || null} params={params} />
      </main>
    </div>
  )
}

