import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Pagination from '@/components/pagination'
import apiClient from "@/lib/apiClient"
import NewButton from "./newButton"
import DeleteButton from "./deleteButton"
import UpdateButton from "./updateButton"


export default async({searchParams,params})=> {
  // const [products, setProducts] = useState(mockProducts)
  // const [editingProduct, setEditingProduct] = useState(null)
  // const [isDialogOpen, setIsDialogOpen] = useState(false)
  // const [searchTerm, setSearchTerm] = useState("")
  const productsPerPage = 5
  const {page="1"} = await params;
  const currentPage = Number(page);
  // const [searchTerm, setSearchTerm] = useState('')
  // const [currentPage, setCurrentPage] = useState(1)

  const res = await apiClient.get("/admin/product/list",{page:currentPage,size:productsPerPage} );
  const {products,total_count} = res.data;
  console.log(total_count)
  const totalPage = Math.ceil(total_count / productsPerPage);
  

  // 处理商品更新
  const handleUpdateProduct = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const updatedProduct = {
      ...editingProduct,
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      description: formData.get('description'),
    }
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
    setEditingProduct(null)
  }

  // 处理商品删除
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">商品管理</h2>
      <div className='flex gap-2'>
        {/* <Input
          placeholder="搜索商品..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mb-4"
        /> */}
        <NewButton/>
        </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>图片</TableHead>
            <TableHead>价格</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <img src={product.image} className="h-10 w-10"/>
              </TableCell>
              <TableCell>￥{product.price.toFixed(2)}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <UpdateButton>编辑</UpdateButton>
                <DeleteButton variant="destructive">删除</DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* {editingProduct && (
        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>编辑商品</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div>
                <Label htmlFor="edit-name">名称</Label>
                <Input id="edit-name" name="name" defaultValue={editingProduct.name} required />
              </div>
              <div>
                <Label htmlFor="edit-price">价格</Label>
                <Input id="edit-price" name="price" type="number" step="0.01" defaultValue={editingProduct.price} required />
              </div>
              <div>
                <Label htmlFor="edit-description">描述</Label>
                <Input id="edit-description" name="description" defaultValue={editingProduct.description} required />
              </div>
              <Button type="submit">更新商品</Button>
            </form>
          </DialogContent>
        </Dialog>
      )} */}
       <Pagination hrefPrefix={`/admin/products`} currentPage={currentPage} pageSize={productsPerPage} totalPage={totalPage}/>
    </div>
  )
}
