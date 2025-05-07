"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "../hooks/use-auth"

export function ProductDetails({ product }) {
  const { toast } = useToast()
  const { user } = useAuth()
  const [wishlist, setWishlist] = useState(false)

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to your cart",
        variant: "destructive",
      })
      return
    }

    try {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      })
    }
  }

  const handleToggleWishlist = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to your wishlist",
        variant: "destructive",
      })
      return
    }

    try {

      setWishlist(!wishlist)
      toast({
        title: wishlist ? "Removed from wishlist" : "Added to wishlist",
        description: `${product.name} has been ${wishlist ? "removed from" : "added to"} your wishlist`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="aspect-square relative rounded-lg overflow-hidden border bg-white">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
      </div>

      <div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-sfsu-navy">{product.name}</h1>
          <p className="text-gray-500">{product.category}</p>
        </div>

        <div className="mb-6">
          <span className="text-3xl font-bold text-sfsu-navy">${product.price.toFixed(2)}</span>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Seller Information</h2>
          <p>{product.seller.name}</p>
          <p className="text-gray-500 text-sm">{product.seller.email}</p>
        </div>

        <div className="flex flex-col space-y-4">
          <Button onClick={handleAddToCart} className="bg-sfsu-orange hover:bg-orange-600 text-white">
            Add to cart
          </Button>

          <Button variant="outline" onClick={handleToggleWishlist} className={wishlist ? "bg-pink-50" : ""}>
            {wishlist ? "Added to wishlist" : "Add to wishlist"}
          </Button>
        </div>
      </div>
    </div>
  )
}
