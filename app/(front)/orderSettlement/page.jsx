"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
// 模拟的商品数据（保持不变）
const cartItems = [
  { id: 1, name: "商品 A", price: 100, quantity: 2 },
  { id: 2, name: "商品 B", price: 150, quantity: 1 },
]

export default function OrderSubmission() {
  const [addresses, setAddresses] = useState([
    { id: 1, address: "北京市朝阳区xxx街道xxx号" },
    { id: 2, address: "上海市浦东新区xxx路xxx弄" },
  ])
  const [selectedAddress, setSelectedAddress] = useState("")
  const [newAddress, setNewAddress] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
const router = useRouter()
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmitOrder = () => {
    if (!selectedAddress) {
      alert("请选择收货地址")
      return
    }
    // 这里可以添加提交订单的逻辑
    console.log("订单提交成功", { items: cartItems, address: selectedAddress, totalPrice })
    router.push("/orders/1")
  }

  const handleAddAddress = () => {
    if (newAddress.trim()) {
      const newId = addresses.length + 1
      setAddresses([...addresses, { id: newId, address: newAddress.trim() }])
      setSelectedAddress(newAddress.trim())
      setNewAddress("")
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>订单提交</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">商品列表</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>商品名称</TableHead>
                    <TableHead>单价</TableHead>
                    <TableHead>数量</TableHead>
                    <TableHead>小计</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>¥{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>¥{item.price * item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">收货地址</h3>
              <div className="flex space-x-2">
                <Select value={selectedAddress} onValueChange={setSelectedAddress}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="选择收货地址" />
                  </SelectTrigger>
                  <SelectContent>
                    {addresses.map((addr) => (
                      <SelectItem key={addr.id} value={addr.address}>
                        {addr.address}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">添加新地址</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>添加新地址</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-address" className="text-right">
                          地址
                        </Label>
                        <Input
                          id="new-address"
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <Button onClick={handleAddAddress}>添加</Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">订单总计</h3>
              <p className="text-2xl font-bold">¥{totalPrice}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmitOrder} className="w-full">
            提交订单
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}