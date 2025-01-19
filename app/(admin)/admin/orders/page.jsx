'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 模拟订单数据
const mockOrders = Array(20).fill().map((_, i) => ({
  id: `ORD-${1000 + i}`,
  customer: `Customer ${i + 1}`,
  date: new Date(2023, 0, 1 + i).toLocaleDateString(),
  total: (Math.random() * 500 + 50).toFixed(2),
  status: ['Pending', 'Processing', 'Shipped', 'Delivered'][Math.floor(Math.random() * 4)]
}))

export default function OrderManagement() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredOrders = orders.filter(order => 
    (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === '' || order.status === statusFilter)
  )

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">订单管理</h2>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search orders..."
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>
                <Badge variant={
                  order.status === 'Delivered' ? 'default' :
                  order.status === 'Shipped' ? 'secondary' :
                  order.status === 'Processing' ? 'primary' : 'destructive'
                }>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Link href={`/orders/${order.id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

