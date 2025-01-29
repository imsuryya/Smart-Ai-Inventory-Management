"use client"

import  { useState } from "react"
import { Input } from "../components/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/components/ui/tabs"

// Mock data for products (you might want to move this to a separate file or fetch from an API)
const mockProducts = [
  { id: "1", name: "Laptop", category: "Electronics", price: 999.99 },
  { id: "2", name: "Desk Chair", category: "Furniture", price: 199.99 },
  { id: "3", name: "Wireless Mouse", category: "Electronics", price: 29.99 },
  { id: "4", name: "Bookshelf", category: "Furniture", price: 149.99 },
  { id: "5", name: "Coffee Maker", category: "Appliances", price: 79.99 },
]

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Product List</h1>
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>Search and view available products</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              {Object.keys(groupedProducts).map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            {Object.entries(groupedProducts).map(([category, products]) => (
              <TabsContent key={category} value={category}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductList

