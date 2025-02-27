import type { House } from "../types"

export const houses: House[] = [
  {
    id: 1,
    name: "Cozy Cottage",
    price: "$250,000",
    address: "123 Main St, Anytown, USA",
    description: {
      en: "A charming cottage with a beautiful garden.",
      uk: "Чарівний котедж з прекрасним садом.",
      es: "Una encantadora cabaña con un hermoso jardín.",
    },
    images: ["/phonot_2"],
  },
  {
    id: 2,
    name: "Modern Apartment",
    price: "$350,000",
    address: "456 Oak Ave, Metropolis, USA",
    description: {
      en: "A sleek apartment in the heart of the city.",
      uk: "Стильна квартира в самому серці міста.",
      es: "Un elegante apartamento en el corazón de la ciudad.",
    },
    images: ["/placeholder.svg?height=300&width=400"],
  },
  {
    id: 3,
    name: "Luxury Villa",
    price: "$1,500,000",
    address: "789 Beach Rd, Paradise, USA",
    description: {
      en: "An exquisite villa with ocean views.",
      uk: "Вишукана вілла з видом на океан.",
      es: "Una exquisita villa con vistas al océano.",
    },
    images: ["/placeholder.svg?height=300&width=400"],
  },
]

