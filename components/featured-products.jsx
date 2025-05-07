"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function FeaturedProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products/featured")
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching featured products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-lg"></div>
        ))}
      </div>
    )
  }

  // Fallback for empty products or while waiting for API
  const displayProducts =
    products.length > 0
      ? products
      : [
          { id: "1", name: "SFSU Hoodie", price: 39.99, image: "/images/sfsu-hoodie.png" },
          { id: "2", name: "SFSU T-Shirt", price: 19.99, image: "/images/sfsu-tshirt.png" },
          { id: "3", name: "SFSU Cap", price: 24.99, image: "/images/sfsu-cap.png" },
        ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {displayProducts.map((product) => (
        <div key={product.id} className="flex flex-col items-center">
          <div className="bg-white w-full h-64 mb-4 rounded-lg overflow-hidden border shadow-sm">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-full object-contain p-4"
            />
          </div>
          <h3 className="font-medium text-lg mb-2">{product.name}</h3>
          <p className="text-gray-700 mb-4">${product.price.toFixed(2)}</p>
          <Link href={`/product/${product.id}`}>
            <Button className="bg-sfsu-orange hover:bg-orange-600 text-white">Shop now</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
