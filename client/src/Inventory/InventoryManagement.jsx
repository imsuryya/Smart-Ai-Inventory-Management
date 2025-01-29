"use client"

import { useState, useEffect, useRef } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { Input } from "../components/components/ui/input"
import { Button } from "../components/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/components/ui/dialog"
import { Label } from "../components/components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/components/ui/radio-group"

// Mock data for products
const mockProducts = [
  { id: "1", name: "Laptop", category: "Electronics", quantity: 50, price: 999.99, location: "Inventory" },
  { id: "2", name: "Desk Chair", category: "Furniture", quantity: 30, price: 199.99, location: "E-commerce" },
  { id: "3", name: "Wireless Mouse", category: "Electronics", quantity: 100, price: 29.99, location: "Both" },
  { id: "4", name: "Bookshelf", category: "Furniture", quantity: 20, price: 149.99, location: "Inventory" },
  { id: "5", name: "Coffee Maker", category: "Appliances", quantity: 40, price: 79.99, location: "E-commerce" },
]

const InventoryManagement = () => {
  const [products, setProducts] = useState(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [scannedResult, setScannedResult] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [showStoreDialog, setShowStoreDialog] = useState(false)
  const [storeLocation, setStoreLocation] = useState("Inventory")
  const scannerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
      }
    }
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleScan = (decodedText) => {
    setScannedResult(decodedText)
    setIsScanning(false)
    setShowStoreDialog(true)
    if (scannerRef.current) {
      scannerRef.current.clear()
    }
  }

  const startScanning = () => {
    setIsScanning(true)
    scannerRef.current = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 }, /* verbose= */ false)
    scannerRef.current.render(handleScan, (error) => {
      console.error("QR code scanning failed:", error)
    })
  }

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear()
    }
    setIsScanning(false)
  }

  const handleStoreProduct = () => {
    const newProduct = {
      id: (products.length + 1).toString(),
      name: `Scanned Item ${products.length + 1}`,
      category: "Scanned",
      quantity: 1,
      price: 0,
      location: storeLocation,
    }

    setProducts([...products, newProduct])
    setShowStoreDialog(false)
    setScannedResult("")
  }

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Inventory Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>QR Scanner</CardTitle>
          <CardDescription>Scan a product QR code to view details</CardDescription>
        </CardHeader>
        <CardContent>
          {isScanning ? (
            <div>
              <div id="qr-reader" style={{ width: "100%" }}></div>
              <Button onClick={stopScanning} className="mt-4">
                Stop Scanning
              </Button>
            </div>
          ) : (
            <Button onClick={startScanning}>Start Scanning</Button>
          )}
          {scannedResult && <p className="mt-4">Last scanned: {scannedResult}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>Search and view product inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
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
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.location}</TableCell>
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
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showStoreDialog} onOpenChange={setShowStoreDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Store Scanned Product</DialogTitle>
            <DialogDescription>Choose where to store the scanned product:</DialogDescription>
          </DialogHeader>
          <RadioGroup value={storeLocation} onValueChange={setStoreLocation}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Inventory" id="inventory" />
              <Label htmlFor="inventory">Inventory</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="E-commerce" id="ecommerce" />
              <Label htmlFor="ecommerce">E-commerce</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Both" id="both" />
              <Label htmlFor="both">Both</Label>
            </div>
          </RadioGroup>
          <DialogFooter>
            <Button onClick={handleStoreProduct}>Store Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default InventoryManagement

