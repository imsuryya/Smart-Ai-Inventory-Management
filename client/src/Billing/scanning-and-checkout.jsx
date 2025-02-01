"use client"

import { useState, useEffect, useRef } from "react"
import { Html5Qrcode } from "html5-qrcode"
import { Button } from "../components/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/components/ui/card"
import { ScrollArea } from "../components/components/ui/scroll-area"
import axios from "axios"
import { toast } from "react-hot-toast"

const ScanningAndCheckout = () => {
  const [scannedItems, setScannedItems] = useState([])
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [, setScannedResult] = useState("")
  const qrRef = useRef(null)

  useEffect(() => {
    return () => {
      if (qrRef.current) {
        qrRef.current.stop()
      }
    }
  }, [])

  const handleScan = async (decodedText) => {
    try {
      setIsLoading(true)
      
      // Parse the QR code JSON data
      const qrData = JSON.parse(decodedText)
      
      // Verify the product exists in database and remove it
      const response = await axios.post('http://localhost:5000/api/products/verify-and-remove', qrData)
      const removedProduct = response.data
      
      // Add to scanned items
      setScannedItems(prev => [...prev, {
        ...qrData,
        _id: removedProduct._id,
        quantity: removedProduct.quantity
      }])
      
      setScannedResult(decodedText)
      toast.success(`Added ${qrData.name} to cart`)
      
      // Stop scanning after successful scan
      await stopScanning()
      
    } catch (error) {
      console.error('Error processing scan:', error)
      if (error.message.includes('JSON')) {
        toast.error('Invalid QR code format')
      } else if (error.response?.status === 404) {
        toast.error('Product not found in inventory')
      } else if (error.response?.status === 400) {
        toast.error('Product out of stock')
      } else {
        toast.error('Error processing scan')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const startScanning = async () => {
    try {
      const devices = await Html5Qrcode.getCameras()
      if (devices && devices.length) {
        const html5QrCode = new Html5Qrcode("qr-reader")
        qrRef.current = html5QrCode
        
        await html5QrCode.start(
          devices[0].id,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          handleScan,
          (errorMessage) => {
            if (!errorMessage.includes("QR code parse error")) {
              setError(`QR Error: ${errorMessage}`)
            }
          }
        )
        
        setIsScanning(true)
      } else {
        setError("No camera found")
      }
    } catch (err) {
      console.error("Error starting scanner:", err)
      setError(`Failed to start scanner: ${err.message}`)
      setIsScanning(false)
    }
  }

  const stopScanning = async () => {
    try {
      if (qrRef.current) {
        await qrRef.current.stop()
        qrRef.current = null
      }
    } catch (err) {
      console.error("Error stopping scanner:", err)
    }
    setIsScanning(false)
  }

  const handleCheckout = () => {
    const total = scannedItems.reduce((sum, item) => sum + item.price, 0)
    toast.success(
      `Checked out ${scannedItems.length} items for a total of $${total.toFixed(2)}`
    )
    setScannedItems([])
    setScannedResult("")
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
          <div className="space-y-4">
            <div id="qr-reader" className="w-full max-w-sm mx-auto"></div>
            {error && <p className="text-red-500">{error}</p>}
            {isScanning ? (
              <Button 
                onClick={stopScanning} 
                variant="destructive"
                disabled={isLoading}
              >
                Stop Scanning
              </Button>
            ) : (
              <Button 
                onClick={startScanning}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Start Scanning"}
              </Button>
            )}
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Scanned Items:</h3>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              {scannedItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img 
                      src={item.image || "/placeholder.svg"} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded mr-3"
                    />
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({item.category})</span>
                    </div>
                  </div>
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
                <Button 
                  onClick={handleCheckout} 
                  className="w-full"
                  disabled={isLoading}
                >
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