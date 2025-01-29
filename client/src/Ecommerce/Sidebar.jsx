import { Button } from "../components/components/ui/button"
import { ScrollArea } from "../components/components/ui/scroll-area"
import { ShoppingCart, MapPin, Phone, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../components/components/ui/avatar"

const Sidebar = ({ isOpen, onClose, onAddressChange, onViewCart, onCallToOrder }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <ScrollArea className="h-full">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" onClick={onClose} className="flex-grow justify-start">
              <User className="mr-2 h-4 w-4" /> Profile
            </Button>
          </div>
          <Button variant="ghost" onClick={onAddressChange} className="mb-4 w-full justify-start">
            <MapPin className="mr-2 h-4 w-4" /> Change Address
          </Button>
          <Button variant="ghost" onClick={onViewCart} className="mb-4 w-full justify-start">
            <ShoppingCart className="mr-2 h-4 w-4" /> View Cart
          </Button>
          <Button variant="ghost" onClick={onCallToOrder} className="mb-4 w-full justify-start">
            <Phone className="mr-2 h-4 w-4" /> Call to Order
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}

export default Sidebar

