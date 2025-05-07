import { NextResponse } from "next/server"

// This would connect to a real database in a production app
const generateProducts = () => {
  const categories = ["Men", "Women", "Kids", "All Genders", "Accessories"]
  const conditions = ["New", "Like New", "Good", "Fair", "Poor"]
  const products = []

  // Add our featured products first
  products.push({
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
  })

  products.push({
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
  })

  products.push({
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
  })

  // Add category-specific products
  products.push({
    id: "4",
    name: "Calculus Textbook",
    description: "Essential calculus textbook for MATH 226.",
    price: 85.99,
    image: "/images/textbooks.png",
    category: "Textbooks",
    condition: "Like New",
    seller: {
      id: "2",
      name: "Math Student",
      email: "mathstudent@sfsu.edu",
    },
    createdAt: new Date().toISOString(),
  })

  products.push({
    id: "5",
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones, perfect for studying.",
    price: 79.99,
    image: "/images/electronics.png",
    category: "Electronics",
    condition: "Good",
    seller: {
      id: "3",
      name: "Tech Enthusiast",
      email: "tech@sfsu.edu",
    },
    createdAt: new Date().toISOString(),
  })

  products.push({
    id: "6",
    name: "Dorm Room Furniture Set",
    description: "Complete furniture set for your dorm room.",
    price: 199.99,
    image: "/images/furniture.png",
    category: "Furniture",
    condition: "Good",
    seller: {
      id: "4",
      name: "Graduating Senior",
      email: "senior@sfsu.edu",
    },
    createdAt: new Date().toISOString(),
  })

  // Generate additional random products
  for (let i = 7; i <= 20; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    const price = Math.floor(Math.random() * 100) + 5

    let image = "/placeholder.svg?height=300&width=300"

    // Assign appropriate image based on category
    if (category === "Men" || category === "Women" || category === "Kids") {
      image = "/images/clothing.png"
    } else if (category === "Accessories") {
      image = "/images/sfsu-cap.png"
    } else if (category === "All Genders") {
      const randomClothing = Math.random() > 0.5 ? "/images/sfsu-hoodie.png" : "/images/sfsu-tshirt.png"
      image = randomClothing
    }

    products.push({
      id: i.toString(),
      name: `SFSU ${category} Item ${i}`,
      description: `This is a sample ${category.toLowerCase()} item for SFSU students.`,
      price,
      image,
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

export async function GET() {
  // Simulate database fetch
  const products = generateProducts()

  return NextResponse.json(products)
}
