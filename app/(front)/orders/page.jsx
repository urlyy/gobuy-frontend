'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 模拟订单数据
const mockOrders = Array(10).fill().map((_, i) => ({
  id: `ORD-${1000 + i}`,
  date: new Date(2023, 0, 1 + i).toLocaleDateString(),
  total: (Math.random() * 500 + 50).toFixed(2),
  status: ['Pending', 'Processing', 'Shipped', 'Delivered'][Math.floor(Math.random() * 4)],
  items: [
    {
      id: 1,
      name: 'Product A',
      image: '/placeholder.svg',
      quantity: Math.floor(Math.random() * 3) + 1,
      price: (Math.random() * 100 + 10).toFixed(2)
    },
    {
      id: 2,
      name: 'Product B',
      image: '/placeholder.svg',
      quantity: Math.floor(Math.random() * 3) + 1,
      price: (Math.random() * 100 + 10).toFixed(2)
    }
  ]
}))

export default function UserOrders() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === '' || order.status === statusFilter)
  )

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">我的订单</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="查询订单..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="flex flex-col">
            <CardContent className="flex-grow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">{order.id}</h3>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <Badge variant={
                  order.status === 'Delivered' ? 'default' :
                  order.status === 'Shipped' ? 'secondary' :
                  order.status === 'Processing' ? 'primary' : 'destructive'
                }>
                  {order.status}
                </Badge>
              </div>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} x ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-6">
              <p className="font-semibold">Total: ${order.total}</p>
              <Link href={`/orders/${order.id}`}>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

