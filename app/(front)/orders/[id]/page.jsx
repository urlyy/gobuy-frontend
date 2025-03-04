import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import apiClient from '@/lib/apiClient'
import { computeStatus } from '@/lib/orderStatus'
import Link from 'next/link'
import PayButton from './payButton'
import CountdownTimer from './countdown'

export default  async({ params })=> {
  const { id } = await params
  const res = await apiClient.get(`/order/${id}`);
  const order = res.data.order;
  

  if (!order) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Link href="/orders">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          查看所有订单
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">订单详情</CardTitle>
          {order.status === 0 && <CountdownTimer targetTime={order.created_at}/>}
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">订单信息</h3>
              <div>订单号: {order.number}</div>
              <div>创建日期: {order.created_at}</div>
              <div>总价: ￥{order.total_price.toFixed(2)}</div>
              <div>状态: <Badge variant={
                   order.status === 0 ? 'secondary' : order.status === 1 ? 'success' : 'destructive'
                }>{computeStatus(order.status)}</Badge></div>
              {order.status === 2 && <div>支付方式: 支付宝</div>}
            </div>
            {<div>
              <h3 className="font-semibold mb-2">快递信息</h3>
              <div>地址: TODO</div>
              <div>姓名: TODO</div>
              <div>电话: TODO</div>
            </div>}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">订单项</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>商品名</TableHead>
                  <TableHead>图片</TableHead>
                  <TableHead>单价</TableHead>
                  <TableHead>数量</TableHead>
                  <TableHead>总价</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item,idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell>
                      <img className='h-10 w-10' src={item.product_image}></img>
                    </TableCell>
                    <TableCell>￥{item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>￥{(item.quantity * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {order.status === 0 && <div className='flex justify-center'>
            <PayButton orderID={order.id}>支付</PayButton>
          </div>}
        </CardContent>
      </Card>
    </div>
  )
}

