
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from '@/components/pagination'
import apiClient from '@/lib/apiClient'
import BanButton from "./BanButton"

export default async({searchParams,params})=> {
  const productsPerPage = 15;
  const {search=""} = await searchParams;
  const {page="1"} = await params;
  const currentPage = Number(page);
  // const [searchTerm, setSearchTerm] = useState('')
  // const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 3;

  const res = await apiClient.get("/admin/user/list", {page:currentPage,size:usersPerPage})
  const {total_count,users} = res.data;
  const totalPage = Math.ceil(total_count / usersPerPage);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">用户管理</h2>
      {/* <Input
        placeholder="搜索用户..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm mb-4"
      /> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>邮箱</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.user_id}>
              <TableCell>{user.user_id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <BanButton status={user.status}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination hrefPrefix={`/admin/users`} currentPage={currentPage} pageSize={usersPerPage} totalPage={totalPage}/>
    </div>
  )
}