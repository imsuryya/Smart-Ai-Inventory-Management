import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/components/ui/card"
import { Button } from "../components/components/ui/button"
import { ScrollArea } from "../components/components/ui//scroll-area"

const Cart = ({ cartItems, onRemoveFromCart, onBuyAll, onBack }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Your Cart</CardTitle>
            <CardDescription>You have {cartItems.length} items in your cart</CardDescription>
          </div>
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2 p-2 border-b">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => onRemoveFromCart(item.id)}>
                Remove
              </Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-lg font-semibold">Total: ${total}</div>
        <Button onClick={onBuyAll} disabled={cartItems.length === 0}>
          Buy All
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Cart

