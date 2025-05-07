import { NextResponse } from "next/server"

// This would connect to a real database in a production app
const getFeaturedProducts = () => {
  const products = [
    {
      id: "1",
      name: "SFSU Hoodie",
      description: "Comfortable SFSU branded hoodie, perfect for those foggy San Francisco days.",
      price: 39.99,
      image: "/images/sfsu-hoodie.png",
      category: "All Genders",
      condition: "New",
      seller: {
        id: "1",
        name: "Campus Store",
        email: "store@sfsu.edu",
      },
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "SFSU T-Shirt",
      description: "Classic SFSU logo t-shirt in gray with navy blue print.",
      price: 19.99,
      image: "/images/sfsu-tshirt.png",
      category: "All Genders",
      condition: "New",
      seller: {
        id: "1",
        name: "Campus Store",
        email: "store@sfsu.edu",
      },
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "SFSU Cap",
      description: "Adjustable SFSU cap with embroidered Gators logo.",
      price: 24.99,
      image: "/images/sfsu-cap.png",
      category: "Accessories",
      condition: "New",
      seller: {
        id: "1",
        name: "Campus Store",
        email: "store@sfsu.edu",
      },
      createdAt: new Date().toISOString(),
    },
  ]

  return products
}

export async function GET() {
  // Simulate database fetch
  const products = getFeaturedProducts()

  return NextResponse.json(products)
}
