"use client"

import { useState } from "react"
import { Button } from "../components/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/components/ui/table"
import { Badge } from "../components/components/ui/badge"
import { Check } from "lucide-react"

// Mock data for orders (you might want to move this to a separate file or fetch from an API)
const initialMockOrders = [
  {
    id: "1",
    products: ["Laptop", "Wireless Mouse"],
    total: 1029.98,
    address: "123 Main St, City, Country",
    checkedOut: false,
  },
  {
    id: "2",
    products: ["Desk Chair", "Bookshelf"],
    total: 349.98,
    address: "456 Elm St, Town, Country",
    checkedOut: false,
  },
  { id: "3", products: ["Coffee Maker"], total: 79.99, address: "789 Oak St, Village, Country", checkedOut: false },
]

const EcommerceOrders = () => {
  const [orders, setOrders] = useState(initialMockOrders)

  const handleOrderCheckout = (orderId) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, checkedOut: true } : order)))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">E-commerce Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>E-commerce Orders</CardTitle>
          <CardDescription>View online orders with products and addresses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.products.join(", ")}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>
                    {order.checkedOut ? (
                      <Badge variant="success" className="bg-green-500">
                        <Check className="mr-1 h-3 w-3" /> Checked Out
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleOrderCheckout(order.id)} disabled={order.checkedOut}>
                      {order.checkedOut ? "Completed" : "Checkout"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default EcommerceOrders

