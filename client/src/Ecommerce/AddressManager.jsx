import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/components/ui/card"
import { Input } from "../components/components/ui/input"
import { Button } from "../components/components/ui/button"

const AddressManager = ({ currentAddress, onAddressChange, onBack }) => {
  const [newAddress, setNewAddress] = useState(currentAddress)

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddressChange(newAddress)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Manage Address</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter your address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            required
          />
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit">Save Address</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddressManager

