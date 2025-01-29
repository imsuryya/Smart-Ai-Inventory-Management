import  { useState } from "react"
import ScanningAndCheckout from "../Billing/scanning-and-checkout"
import ProductList from "../Billing/product-list"
import EcommerceOrders from "../Billing/e-commerce-orders"
import Tasks from "../Billing/TaskMessages"
import { Button } from "../components/components/ui/button"
import { QrCode, List, ShoppingCart, CheckSquare, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../components/components/ui/avatar"

const Billing = () => {
  const [activeTab, setActiveTab] = useState("scanning")

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...")
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Billing System</h1>
        </div>
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <Button
              variant={activeTab === "scanning" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("scanning")}
            >
              <QrCode className="mr-2 h-4 w-4" />
              Scanning and Checkout
            </Button>
            <Button
              variant={activeTab === "products" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("products")}
            >
              <List className="mr-2 h-4 w-4" />
              Product List
            </Button>
            <Button
              variant={activeTab === "orders" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              E-commerce Orders
            </Button>
            <Button
              variant={activeTab === "tasks" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("tasks")}
            >
              <CheckSquare className="mr-2 h-4 w-4" />
              Tasks
            </Button>
          </div>
        </nav>
        {/* User Profile */}
        <div className="p-4 border-t mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Billing User</span>
                    <span className="text-xs text-gray-500">billing@example.com</span>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {activeTab === "scanning" && <ScanningAndCheckout />}
          {activeTab === "products" && <ProductList />}
          {activeTab === "orders" && <EcommerceOrders />}
          {activeTab === "tasks" && <Tasks />}
        </main>
      </div>
    </div>
  )
}

export default Billing

