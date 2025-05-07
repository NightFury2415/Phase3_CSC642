"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

export default function MarketplacePage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(null)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [condition, setCondition] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
        // Fallback data
        const fallbackData = generateFallbackProducts()
        setProducts(fallbackData)
        setFilteredProducts(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    if (activeCategory) {
      filtered = filtered.filter((product) => product.category === activeCategory)
    }

    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    if (condition) {
      filtered = filtered.filter((product) => product.condition === condition)
    }

    setFilteredProducts(filtered)
  }, [activeCategory, priceRange, condition, products])

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  const handlePriceRangeChange = (range) => {
    setPriceRange(range)
  }

  const handleConditionChange = (selectedCondition) => {
    setCondition(selectedCondition)
  }

  const generateFallbackProducts = () => {
    const categories = ["Men", "Women", "Kids", "All Genders", "Accessories"]
    const conditions = ["New", "Like New", "Good", "Fair", "Poor"]
    const products = []

    for (let i = 1; i <= 20; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)]
      const condition = conditions[Math.floor(Math.random() * conditions.length)]
      const price = Math.floor(Math.random() * 100) + 5

      products.push({
        id: i.toString(),
        name: `SFSU ${category} Item ${i}`,
        description: `This is a sample ${category.toLowerCase()} item for SFSU students.`,
        price,
        image: `/placeholder.svg?height=300&width=300`,
        category,
        condition,
        seller: {
          id: "1",
          name: "Sample Seller",
          email: "seller@sfsu.edu",
        },
        createdAt: new Date().toISOString(),
      })
    }

    return products
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-sfsu-navy text-white p-4">
          <div className="container mx-auto flex items-center">
            <h1 className="text-xl font-bold">Marketplace</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Filter</h2>
            <ProductFilters
              onCategoryChange={handleCategoryChange}
              onPriceRangeChange={handlePriceRangeChange}
              onConditionChange={handleConditionChange}
              activeCategory={activeCategory}
              priceRange={priceRange}
              condition={condition}
            />
          </div>

          <ProductGrid products={filteredProducts} loading={loading} />
        </div>
      </main>
    </div>
  )
}
