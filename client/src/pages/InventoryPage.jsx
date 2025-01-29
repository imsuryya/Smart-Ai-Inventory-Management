import { useState } from "react"
import InventoryManagement from "../Inventory/InventoryManagement"
import TaskMessages from "../Inventory/TaskMessages"
import { Button } from "../components/components/ui/button"
import { LayoutDashboard, MessageSquare, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../components/components/ui/avatar"

const Inventory = () => {
  const [activeTab, setActiveTab] = useState("inventory")

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm fixed h-full flex flex-col">
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold">Inventory System</h1>
        </div>
        <nav className="flex-1 px-4 py-4">
          <div className="space-y-2">
            <Button
              variant={activeTab === "inventory" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("inventory")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "tasks" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("tasks")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Tasks
            </Button>
          </div>
        </nav>
        {/* User Profile */}
        <div className="border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Inventory User</span>
                    <span className="text-xs text-gray-500">Inventory@example.com</span>
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
        <main className="p-6">
          {activeTab === "inventory" && <InventoryManagement />}
          {activeTab === "tasks" && <TaskMessages />}
        </main>
      </div>
    </div>
  )
}

export default Inventory

