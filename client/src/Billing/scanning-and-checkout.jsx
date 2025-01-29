"use client"

import { useState, useEffect, useRef } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { Button } from "../components/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/components/ui/card"
import { ScrollArea } from "../components/components/ui/scroll-area"

// Mock data for products (you might want to move this to a separate file or fetch from an API)
const mockProducts = [
  { id: "1", name: "Laptop", category: "Electronics", price: 999.99 },
  { id: "2", name: "Desk Chair", category: "Furniture", price: 199.99 },
  { id: "3", name: "Wireless Mouse", category: "Electronics", price: 29.99 },
  { id: "4", name: "Bookshelf", category: "Furniture", price: 149.99 },
  { id: "5", name: "Coffee Maker", category: "Appliances", price: 79.99 },
]

const ScanningAndCheckout = () => {
  const [scannedItems, setScannedItems] = useState([])
  const [isScanning, setIsScanning] = useState(false)
  const scannerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
      }
    }
  }, [])

  const handleScan = (decodedText) => {
    const scannedProduct = mockProducts.find((product) => product.id === decodedText)
    if (scannedProduct) {
      setScannedItems([...scannedItems, scannedProduct])
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

  const handleCheckout = () => {
    alert(
      `Checked out ${scannedItems.length} items for a total of $${scannedItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`,
    )
    setScannedItems([])
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Scanning and Checkout</h1>
      <Card>
        <CardHeader>
          <CardTitle>QR Scanner</CardTitle>
          <CardDescription>Scan product QR codes to add to the invoice</CardDescription>
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
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Scanned Items:</h3>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              {scannedItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </ScrollArea>
            {scannedItems.length > 0 && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">
                    ${scannedItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                  </span>
                </div>
                <Button onClick={handleCheckout} className="w-full">
                  Checkout
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ScanningAndCheckout

