'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const initialCartItems = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    price: 35,
    color: 'Black',
    quantity: 1,
  },
  // More items...
]

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-20"
                />
              </TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-semibold">总价: ${total.toFixed(2)}</p>
        <Link href="/orderSettlement">
          <Button>提交订单</Button>
        </Link>
      </div>
    </div>
  )
}

