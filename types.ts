export interface House {
  id: number
  name: string
  price: string
  address: string
  mapLink?: string //
 
  description: {
    en: string
    uk: string
    es: string
  }
  images: string[]
  additionalInfo: {
    en: string
    uk: string
    es: string
  }
}

