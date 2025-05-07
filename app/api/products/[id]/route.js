import { NextResponse } from "next/server"

// This would connect to a real database in a production app
const getProductById = (id) => {
  // Featured products with real images
  if (id === "1") {
    return {
      id: "1",
      name: "SFSU Hoodie",
      description:
        "Comfortable SFSU branded hoodie, perfect for those foggy San Francisco days. This premium quality hoodie features the SFSU logo in gold with purple outline. Made from 80% cotton and 20% polyester, it's both warm and durable. Available in sizes S through XXL.",
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
    }
  }

  if (id === "2") {
    return {
      id: "2",
      name: "SFSU T-Shirt",
      description:
        "Classic SFSU logo t-shirt in gray with navy blue print. This comfortable t-shirt is perfect for showing your school spirit. Made from 100% cotton, it's soft and breathable. Features the San Francisco State University Alumni text with the Gators logo.",
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
    }
  }

  if (id === "3") {
    return {
      id: "3",
      name: "SFSU Cap",
      description:
        "Adjustable SFSU cap with embroidered Gators logo. This stylish cap features the SF State Gators logo embroidered on the front. Made from durable denim-like material with an adjustable strap in the back for a perfect fit.",
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
    }
  }

  if (id === "4") {
    return {
      id: "4",
      name: "Calculus Textbook",
      description:
        "Essential calculus textbook for MATH 226. This textbook covers all the topics you'll need for your calculus course, including limits, derivatives, and integrals. It's in excellent condition with no highlighting or notes.",
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
    }
  }

  if (id === "5") {
    return {
      id: "5",
      name: "Wireless Headphones",
      description:
        "Noise-cancelling wireless headphones, perfect for studying. These high-quality headphones provide excellent sound isolation, making them ideal for studying in noisy environments like the library or student union. Battery life is approximately 20 hours on a single charge.",
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
    }
  }

  if (id === "6") {
    return {
      id: "6",
      name: "Dorm Room Furniture Set",
      description:
        "Complete furniture set for your dorm room. This set includes a comfortable sofa, coffee table, and side table - everything you need to make your dorm room feel like home. All pieces are in good condition with minimal wear.",
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
    }
  }

  // For other IDs, generate a random product
  const categories = ["Men", "Women", "Kids", "All Genders", "Accessories"]
  const conditions = ["New", "Like New", "Good", "Fair", "Poor"]
  const category = categories[Math.floor(Math.random() * categories.length)]

  // Choose appropriate image based on category
  let image = "/placeholder.svg?height=500&width=500"
  if (category === "Men" || category === "Women" || category === "Kids") {
    image = "/images/clothing.png"
  } else if (category === "Accessories") {
    image = "/images/sfsu-cap.png"
  } else if (category === "All Genders") {
    const randomClothing = Math.random() > 0.5 ? "/images/sfsu-hoodie.png" : "/images/sfsu-tshirt.png"
    image = randomClothing
  }

  return {
    id,
    name: `SFSU ${category} Item ${id}`,
    description: `This is a detailed description for this ${category.toLowerCase()} item. It's perfect for SFSU students looking for quality items at affordable prices. This product is in excellent condition and has been well maintained by its previous owner.`,
    price: Math.floor(Math.random() * 100) + 5,
    image,
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

export async function GET(request, { params }) {
  const id = params.id

  // Simulate database fetch
  const product = getProductById(id)

  return NextResponse.json(product)
}
