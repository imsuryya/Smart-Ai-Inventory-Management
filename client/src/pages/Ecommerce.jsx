import { useState } from "react"
import { Button } from "../components/components/ui/button"
import Sidebar from "../Ecommerce/Sidebar"
import ProductList from "../Ecommerce/ProductList"
import ProductDetails from "../Ecommerce/ProductDetails"
import Cart from "../Ecommerce/Cart"
import AddressManager from "../Ecommerce/AddressManager"
import axios from 'axios'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/components/ui/dialog"
import { Input } from "../components/components/ui/input"
import { Label } from "../components/components/ui/label"

const Ecommerce = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showAddressManager, setShowAddressManager] = useState(false)
  const [address, setAddress] = useState("")
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [orderSuccess, setOrderSuccess] = useState(false)

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id)
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item._id !== productId))
  }

  const handleBuyNow = (product) => {
    setCartItems([{ ...product, quantity: 1 }])
    setShowCheckout(true)
  }

  const handleBuyAll = () => {
    if (!address || !customerName) {
      alert("Please provide your name and address before checkout")
      return
    }
    setShowCheckout(true)
  }

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        customerName,
        address,
        products: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
      }

      await axios.post('http://localhost:5000/api/orders', orderData)
      setOrderSuccess(true)
      setCartItems([])
      setShowCheckout(false)
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    }
  }

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress)
    setShowAddressManager(false)
  }

  const handleBackToMain = () => {
    setSelectedProduct(null)
    setShowCart(false)
    setShowAddressManager(false)
    setShowCheckout(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">E-commerce Store</h1>
          <div className="flex items-center space-x-4">
            <span>Cart Items: {cartItems.length}</span>
            <Button variant="ghost" onClick={() => setIsSidebarOpen(true)}>
              Menu
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showAddressManager ? (
          <AddressManager
            currentAddress={address}
            onAddressChange={handleAddressChange}
            onBack={handleBackToMain}
          />
        ) : showCart ? (
          <Cart
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onBuyAll={handleBuyAll}
            onBack={handleBackToMain}
          />
        ) : selectedProduct ? (
          <ProductDetails
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onBack={handleBackToMain}
          />
        ) : (
          <ProductList onProductClick={setSelectedProduct} />
        )}
      </main>

      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Please provide your details to complete the order
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="address">Delivery Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter delivery address"
              />
            </div>
            <div>
              <h3 className="font-semibold">Order Summary</h3>
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="font-bold mt-2">
                Total: ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCheckout(false)}>Cancel</Button>
            <Button onClick={handlePlaceOrder}>Place Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={orderSuccess} onOpenChange={setOrderSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Successful!</DialogTitle>
            <DialogDescription>
              Thank you for your order. We will process it shortly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => {
              setOrderSuccess(false)
              handleBackToMain()
            }}>Continue Shopping</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onAddressChange={() => {
          setShowAddressManager(true)
          setIsSidebarOpen(false)
        }}
        onViewCart={() => {
          setShowCart(true)
          setIsSidebarOpen(false)
        }}
      />
    </div>
  )
}

export default Ecommerce