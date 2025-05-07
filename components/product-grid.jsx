import Link from "next/link"
import Image from "next/image"

export function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-gray-200 animate-pulse h-64 rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No products found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters or check back later</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`} className="group">
          <div className="border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="aspect-square relative bg-white">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg truncate">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-sfsu-navy">${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">{product.condition}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
