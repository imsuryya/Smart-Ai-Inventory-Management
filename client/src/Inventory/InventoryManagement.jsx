"use client"

import { useState, useEffect, useRef } from "react"
import { Html5Qrcode } from "html5-qrcode"
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
import axios from "axios"
import { toast } from "react-hot-toast"

const InventoryManagement = () => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [scannedResult, setScannedResult] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState("")
  const qrRef = useRef(null)
  const [showStoreDialog, setShowStoreDialog] = useState(false)
  const [storeLocation, setStoreLocation] = useState("Inventory")
  const [isLoading, setIsLoading] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    quantity: 1,
    price: 0,
    description: "",
  })
  const scannerRef = useRef(null)

  useEffect(() => {
    fetchProducts()
    const scannerInstance = scannerRef.current;
    return () => {
      if (scannerInstance) {
        scannerInstance.clear();
      }
    }
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to fetch products')
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleScan = async (decodedText) => {
    try {
      setIsLoading(true)
      // Assuming the QR code contains a JSON string with product data
      const qrData = JSON.parse(decodedText)
      setNewProduct({
        ...qrData,
        quantity: 1 // Default quantity
      })
      setScannedResult(decodedText)
      setShowStoreDialog(true)
    } catch (error) {
      console.error('Error processing QR code:', error)
      toast.error('Invalid QR code format')
    } finally {
      setIsLoading(false)
      setIsScanning(false)
      if (scannerRef.current) {
        scannerRef.current.clear()
      }
    }
  }

  const startScanning = async () => {
    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        const html5QrCode = new Html5Qrcode("qr-reader");
        qrRef.current = html5QrCode;
        
        await html5QrCode.start(
          devices[0].id,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          handleScan,
          (errorMessage) => {
            if (!errorMessage.includes("QR code parse error")) {
              setError(`QR Error: ${errorMessage}`);
            }
          }
        );
        
        setIsScanning(true);
      } else {
        setError("No camera found");
      }
    } catch (err) {
      console.error("Error starting scanner:", err);
      setError(`Failed to start scanner: ${err.message}`);
      setIsScanning(false);
    }
  };

  const stopScanning = async () => {
    try {
      if (qrRef.current) {
        await qrRef.current.stop();
        qrRef.current = null;
      }
    } catch (err) {
      console.error("Error stopping scanner:", err);
    }
    setIsScanning(false);
  };

  const handleStoreProduct = async () => {
    try {
      setIsLoading(true)
      const productData = {
        ...newProduct,
        location: storeLocation,
        qrCode: scannedResult,
      }

      await axios.post('http://localhost:5000/api/products', productData)
      await fetchProducts()
      toast.success('Product added successfully')
      setShowStoreDialog(false)
      setScannedResult("")
      setNewProduct({
        name: "",
        category: "",
        quantity: 1,
        price: 0,
        description: "",
      })
    } catch (error) {
      console.error('Error storing product:', error)
      toast.error('Failed to store product')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
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
      <h1 className="text-3xl font-bold">Inventory Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>QR Scanner</CardTitle>
          <CardDescription>Scan a product QR code to view details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div id="qr-reader" className="w-full max-w-sm mx-auto"></div>
            {error && <p className="text-red-500">{error}</p>}
            {isScanning ? (
              <Button onClick={stopScanning} variant="destructive">
                Stop Scanning
              </Button>
            ) : (
              <Button onClick={startScanning} disabled={isLoading}>
                {isLoading ? "Processing..." : "Start Scanning"}
              </Button>
            )}
            {scannedResult && (
              <p className="mt-4 p-2 bg-gray-100 rounded">
                Last scanned: {scannedResult}
              </p>
            )}
          </div>
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
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </TableCell>
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
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
              <TabsContent key={category} value={category}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryProducts.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </TableCell>
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
            <DialogDescription>Enter product details and choose storage location:</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={newProduct.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label>Storage Location</Label>
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
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleStoreProduct} disabled={isLoading}>
              {isLoading ? "Storing..." : "Store Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default InventoryManagement