import { useState } from "react"
import { Button } from "../components/components/ui/button"
import { User } from "lucide-react"
import Sidebar from "../Ecommerce/Sidebar"
import ProductList from "../Ecommerce/ProductList"
import ProductDetails from "../Ecommerce/ProductDetails"
import Cart from "../Ecommerce/Cart"
import AddressManager from "../Ecommerce/AddressManager"
import { Avatar, AvatarFallback, AvatarImage } from "../components/components/ui/avatar"

const Ecommerce = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showAddressManager, setShowAddressManager] = useState(false)
  const [address, setAddress] = useState("123 Default St, City, Country")

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product])
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId))
  }

  const handleBuyNow = (product) => {
    alert(`Buying ${product.name} for $${product.price}`)
  }

  const handleBuyAll = () => {
    alert(`Buying all items for $${cartItems.reduce((sum, item) => sum + item.price, 0)}`)
    setCartItems([])
    setShowCart(false)
  }

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress)
    setShowAddressManager(false)
    alert("Address updated successfully!")
  }

  const handleCallToOrder = () => {
    alert("Calling to order: +1 (800) 123-4567")
  }

  const handleBackToMain = () => {
    setSelectedProduct(null)
    setShowCart(false)
    setShowAddressManager(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">E-commerce Store</h1>
          <Button variant="ghost" onClick={() => setIsSidebarOpen(true)}>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showAddressManager ? (
          <AddressManager currentAddress={address} onAddressChange={handleAddressChange} onBack={handleBackToMain} />
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
        onCallToOrder={handleCallToOrder}
      />
    </div>
  )
}

export default Ecommerce 

