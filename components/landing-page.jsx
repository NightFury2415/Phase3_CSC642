import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FeaturedProducts } from "@/components/featured-products"

export function LandingPage() {
  return (
    <div className="flex-1">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="text-4xl font-bold text-sfsu-navy mb-6 text-center">SFSU MARKET PLACE</h1>

          <div className="w-full max-w-4xl mb-8 rounded-lg overflow-hidden shadow-lg">
            <div className="grid grid-cols-4 gap-1">
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src="/images/textbooks.png"
                  alt="Textbooks"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-sfsu-navy bg-opacity-80 text-white p-2 text-center">
                  Textbooks
                </div>
              </div>
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src="/images/electronics.png"
                  alt="Electronics"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-sfsu-navy bg-opacity-80 text-white p-2 text-center">
                  Electronics
                </div>
              </div>
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src="/images/clothing.png"
                  alt="Clothing"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-sfsu-navy bg-opacity-80 text-white p-2 text-center">
                  Clothing
                </div>
              </div>
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src="/images/furniture.png"
                  alt="Furniture"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-sfsu-navy bg-opacity-80 text-white p-2 text-center">
                  Furniture
                </div>
              </div>
            </div>
          </div>

          <Link href="/marketplace">
            <Button className="bg-sfsu-orange hover:bg-orange-600 text-white font-bold px-8 py-2 rounded-md text-lg">
              Browse All
            </Button>
          </Link>
        </div>

        <FeaturedProducts />
      </main>
    </div>
  )
}
