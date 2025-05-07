export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  condition: string
  seller: {
    id: string
    name: string
    email: string
  }
  createdAt: string
}
