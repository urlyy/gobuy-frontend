'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import apiClient from '@/lib/apiClient'
import { Checkbox } from "@/components/ui/checkbox"
import { useParams, useRouter } from 'next/navigation'
const SubmitButton = ({ selectedItems }) => {
  const router = useRouter()
  const handleSubmit = async () => {
    const ids = selectedItems.map(item => item.id);
    const res = await apiClient.post('/order', { itemIDs: ids });
    alert('提交成功');
    const order = res.data.order;
    router.push(`/orders/${order.id}`)
  }
  return (
    <Button disabled={selectedItems.length === 0 } onClick={handleSubmit}>提交订单</Button>
  )
}

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const init = async () => {
      const res = await apiClient.get(`/cart`);
      const items = res.data.items;
      setCartItems(items);
    }
    init();
  }, [])

  const removeItem = async (id) => {
    const res = await apiClient.delete(`/cart/${id}`);
    alert("删除成功");
    const newItems = cartItems.filter(item => item.id !== id)
    setCartItems(newItems);
    // 同时更新选中状态
    const newSelected = selectedItems.filter(item => item.id !== id);
    setSelectedItems(newSelected);
    let totalPrice = 0;
    for (const selectedItem of newSelected) {
      const newItem = newItems.find(item => item.id === selectedItem.id);
      if (newItem) {
          totalPrice += newItem.price * newItem.quantity;
      }
    }
    setTotal(totalPrice)
  }

  const updateQuantity = async (id, newQuantity) => {
    const res = apiClient.put(`/cart/${id}`, {}, { quantity: newQuantity });
    alert("设置购物车商品数量成功");
    const newItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(newItems);
    // 计算新价格
    let totalPrice = 0;
    for (const selectedItem of selectedItems) {
      const newItem = newItems.find(item => item.id === selectedItem.id);
      if (newItem) {
          totalPrice += newItem.price * newItem.quantity;
      }
    }
    setTotal(totalPrice)
  }

  const handleCheckboxChange = (id,checked) => {
    let selected;
    if (!checked) {
      selected = selectedItems.filter(item => item.id !== id);
      setSelectedItems(selected);
    } else {
      const item = cartItems.find(item => item.id === id);
      selected = [...selectedItems, item];
      setSelectedItems(selected);
    }
    let totalPrice = 0;
    for (const selectedItem of selected) {
      const newItem = cartItems.find(item => item.id === selectedItem.id);
      if (newItem) {
          totalPrice += newItem.price * newItem.quantity;
      }
    }
    setTotal(totalPrice)
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">购物车</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>选择</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>图片</TableHead>
            <TableHead>数量</TableHead>
            <TableHead>单价</TableHead>
            <TableHead>总价</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedItems.some(selectedItem => selectedItem.id === item.id)}
                  onCheckedChange={(checked) => handleCheckboxChange(item.id,checked)}
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="rounded-lg w-10 h-10"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-20"
                />
              </TableCell>
              <TableCell>￥{item.price.toFixed(2)}</TableCell>
              <TableCell>￥{(item.price * item.quantity).toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>
                  删除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-semibold">总价: ￥{total.toFixed(2)}</p>
          <SubmitButton selectedItems={selectedItems} />
      </div>
    </div>
  )
}