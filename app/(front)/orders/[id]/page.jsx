'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// 模拟订单详情数据
const mockOrderDetails = {
  id: 'ORD-1001',
  customer: 'John Doe',
  email: 'john@example.com',
  date: '2023-01-01',
  total: 299.99,
  status: 'Processing',
  items: [
    { id: 1, name: 'Product 1', quantity: 2, price: 99.99 },
    { id: 2, name: 'Product 2', quantity: 1, price: 100.01 },
  ],
  shippingAddress: '123 Main St, City, Country, 12345',
  paymentMethod: 'Credit Card'
}

export default function OrderDetails() {
  const router = useRouter()
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    // 在实际应用中，这里应该从API获取订单详情
    setOrder({ ...mockOrderDetails, id })
  }, [id])

  if (!order) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>订单详情 - {order.id}</CardTitle>
          <CardDescription>View and manage order information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Customer Information</h3>
              <p>Name: {order.customer}</p>
              <p>Email: {order.email}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Order Information</h3>
              <p>Date: {order.date}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Status: <Badge>{order.status}</Badge></p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Order Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p>{order.shippingAddress}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Method</h3>
              <p>{order.paymentMethod}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

