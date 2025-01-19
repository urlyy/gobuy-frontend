'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

// 模拟商品数据
const mockProducts = [
  { id: 1, name: 'Product 1', price: 19.99, description: 'Description for Product 1' },
  { id: 2, name: 'Product 2', price: 29.99, description: 'Description for Product 2' },
  { id: 3, name: 'Product 3', price: 39.99, description: 'Description for Product 3' },
  { id: 4, name: 'Product 4', price: 49.99, description: 'Description for Product 4' },
  { id: 5, name: 'Product 5', price: 59.99, description: 'Description for Product 5' },
  // 这里可以继续添加更多商品...
]

export default function ProductManagement() {
  const [products, setProducts] = useState(mockProducts)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 5

  // 过滤商品
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 处理商品创建
  const handleCreateProduct = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const newProduct = {
      id: products.length + 1,
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      description: formData.get('description'),
    }
    setProducts([...products, newProduct])
    setIsDialogOpen(false)
  }

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

  // 分页逻辑
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">商品管理</h2>
      <div className='flex gap-2'>
        <Input
          placeholder="搜索商品..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mb-4"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-4">新建商品</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>新建商品</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <Label htmlFor="name">名称</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="price">价格</Label>
                <Input id="price" name="price" type="number" step="0.01" required />
              </div>
              <div>
                <Label htmlFor="description">描述</Label>
                <Input id="description" name="description" required />
              </div>
              <Button type="submit">新建</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名称</TableHead>
            <TableHead>价格</TableHead>
            <TableHead>描述</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <Button onClick={() => setEditingProduct(product)} className="mr-2">编辑</Button>
                <Button onClick={() => handleDeleteProduct(product.id)} variant="destructive">删除</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingProduct && (
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
      )}

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
          </PaginationItem>
          {Array(Math.ceil(filteredProducts.length / productsPerPage)).fill().map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i + 1}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredProducts.length / productsPerPage)))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
