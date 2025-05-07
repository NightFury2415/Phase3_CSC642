"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ProductDetails } from "@/components/product-details"
import { ProductReviews } from "@/components/product-reviews"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error)
        // Fallback data
        setProduct(generateFallbackProduct(params.id))
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const generateFallbackProduct = (id) => {
    const categories = ["Men", "Women", "Kids", "All Genders", "Accessories"]
    const conditions = ["New", "Like New", "Good", "Fair", "Poor"]
    const category = categories[Math.floor(Math.random() * categories.length)]

    return {
      id,
      name: `SFSU ${category} Item ${id}`,
      description: `This is a detailed description for this ${category.toLowerCase()} item. It's perfect for SFSU students looking for quality items at affordable prices. This product is in excellent condition and has been well maintained by its previous owner.`,
      price: Math.floor(Math.random() * 100) + 5,
      image: `/placeholder.svg?height=500&width=500`,
      category,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      seller: {
        id: "1",
        name: "Sample Seller",
        email: "seller@sfsu.edu",
      },
      createdAt: new Date().toISOString(),
    }
  }

  if (loading) {
    return (
      <div className="flex-1">
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-24 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex-1">
        <main className="container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-sfsu-navy text-white p-4">
            <div className="container mx-auto flex items-center">
              <h1 className="text-xl font-bold">Product Details</h1>
            </div>
          </div>

          <div className="p-6">
            <ProductDetails product={product} />

            <div className="mt-12">
              <Tabs defaultValue="description">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="condition">Condition</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="p-4 border rounded-b-lg mt-2">
                  <h3 className="text-lg font-medium mb-2">Description:</h3>
                  <p>{product.description}</p>
                </TabsContent>
                <TabsContent value="condition" className="p-4 border rounded-b-lg mt-2">
                  <h3 className="text-lg font-medium mb-2">Condition:</h3>
                  <p className="font-medium">{product.condition}</p>
                  <p className="mt-2">
                    {product.condition === "New" && "Brand new, unused item with original packaging and tags."}
                    {product.condition === "Like New" &&
                      "Used only once or twice, in perfect condition with original packaging."}
                    {product.condition === "Good" && "Gently used with minor signs of wear but fully functional."}
                    {product.condition === "Fair" && "Shows signs of regular use with possible cosmetic imperfections."}
                    {product.condition === "Poor" &&
                      "Heavily used with significant wear, but still functional for its intended purpose."}
                  </p>
                </TabsContent>
                <TabsContent value="reviews" className="p-4 border rounded-b-lg mt-2">
                  <ProductReviews productId={product.id} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
