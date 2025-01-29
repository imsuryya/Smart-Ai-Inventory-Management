import { useState } from "react"
import { Input } from "../components/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/components/ui/card"
import { Button } from "../components/components/ui/button"

// Mock product data
const products = [
  {
    id: 1,
    name: "Smartphone",
    price: 599,
    image: "/placeholder.svg?height=200&width=200",
    description: "Latest model with advanced features",
  },
  {
    id: 2,
    name: "Laptop",
    price: 999,
    image: "/placeholder.svg?height=200&width=200",
    description: "Powerful and lightweight laptop",
  },
  {
    id: 3,
    name: "Headphones",
    price: 199,
    image: "/placeholder.svg?height=200&width=200",
    description: "Noise-cancelling wireless headphones",
  },
  {
    id: 4,
    name: "Smartwatch",
    price: 299,
    image: "/placeholder.svg?height=200&width=200",
    description: "Fitness tracker and smartwatch",
  },
]

const ProductList = ({ onProductClick }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-sm mx-auto"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="cursor-pointer" onClick={() => onProductClick(product)}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>${product.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover mb-2"
              />
              <p>{product.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProductList

