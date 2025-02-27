export interface House {
    id: number
    name: string
    price: string
    address: string
    description:
      | {
          en: string
          uk: string
          es: string
        }
      | string
    images: string[]
  }
  
  