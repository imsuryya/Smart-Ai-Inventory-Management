import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/components/ui/card"
import { Button } from "../components/components/ui/button"

const ProductDetails = ({ product, onAddToCart, onBuyNow, onBack }) => {
  if (!product) return null

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>${product.price}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-64 object-cover mb-4" />
        <p className="text-lg mb-4">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button variant="outline" onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
        <Button onClick={() => onBuyNow(product)}>Buy Now</Button>
      </CardFooter>
    </Card>
  )
}

export default ProductDetails

