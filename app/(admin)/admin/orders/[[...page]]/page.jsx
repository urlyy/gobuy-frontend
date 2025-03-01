import Link from 'next/link'
import { Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Pagination from '@/components/pagination'
import apiClient from '@/lib/apiClient'
import { computeStatus } from '@/lib/orderStatus'


export default async({searchParams,params})=> {
  // const [searchTerm, setSearchTerm] = useState('')
  // const [statusFilter, setStatusFilter] = useState('')
  // const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10;
  const {page="1"} = await params;
  const currentPage = Number(page);

  const res = await apiClient.get("/admin/order/list",{page:currentPage,size:ordersPerPage} );
  const {orders,total_count} = res.data;
  console.log(total_count)
  const totalPage = Math.ceil(total_count / ordersPerPage);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">订单管理</h2>
      <div className="flex gap-4 mb-4">
        {/* <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        /> */}
        {/* <Select value={statusFilter} onValueChange={setStatusFilter}>
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
        </Select> */}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>订单号</TableHead>
            <TableHead>客户名</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead>总价</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.number}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.created_at}</TableCell>
              <TableCell>￥{order.total_price}</TableCell>
              <TableCell>
                <Badge variant={
                  order.status === 'Delivered' ? 'default' :
                  order.status === 'Shipped' ? 'secondary' :
                  order.status === 1 ? 'success' : 'destructive'
                }>
                  {computeStatus(order.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <Link href={`/orders/${order.id}`} target="_blank">
                  <Button variant="ghost" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    查看详情
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination hrefPrefix={'/admin/orders'} currentPage={currentPage} pageSize={ordersPerPage} totalPage={totalPage}/>
    </div>
  )
}

