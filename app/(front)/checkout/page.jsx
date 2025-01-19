'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Checkout() {
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the order data to your backend
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order Placed Successfully</CardTitle>
          <CardDescription>Thank you for your order. We'll send you a confirmation email shortly.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>Please enter your payment details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name on Card</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="number">Card Number</Label>
                <Input id="number" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
            <CardFooter className="mt-6">
              <Button type="submit" className="w-full">Place Order</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

