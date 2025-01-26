import { useState } from "react"
import Dashboard from "../Admin/dashboard"
import AssignRoles from "../Admin/AssignRole"
import Ecommerce from "../Admin/ecommerce"
import { Package2, LayoutDashboard, Users, ShoppingCart, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../components/components/ui/avatar"
import { Button } from "../components/components/ui/button"
import { Separator } from "../components/components/ui/ui/separator"

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm fixed h-full">
        {/* Company Logo and Title */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <Package2 className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-sm text-gray-500">Inventory Management</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-4">
          <div className="space-y-2">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "assignRoles" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("assignRoles")}
            >
              <Users className="mr-2 h-4 w-4" />
              Assign Roles
            </Button>
            <Button
              variant={activeTab === "ecommerce" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("ecommerce")}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              E-commerce
            </Button>
          </div>
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Admin User</span>
                    <span className="text-xs text-gray-500">admin@example.com</span>
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
      <div className="ml-64 flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold">
              {activeTab === "dashboard" ? "Dashboard" : activeTab === "assignRoles" ? "Assign Roles" : "E-commerce"}
            </h2>
          </div>
        </header>

        <main className="p-6">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "assignRoles" && <AssignRoles />}
          {activeTab === "ecommerce" && <Ecommerce />}
        </main>
      </div>
    </div>
  )
}

export default Admin

