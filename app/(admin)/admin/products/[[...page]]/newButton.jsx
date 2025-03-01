"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import apiClient from "@/lib/apiClient"
import ImageUploader from "@/components/imageUploader"
import { redirect } from 'next/navigation'


export default ({})=>{
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [name,setName] = useState("")
    const [price,setPrice] = useState(0.00)
    const [stock,setStock] = useState(0)
    const [description,setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(null)

    // 处理商品创建
    const handleCreate = async() => {
        const res = await apiClient.post("/admin/product",{
            name,
            price:parseFloat(price),
            stock:parseInt(stock),
            description,
            image:imageUrl
        })
        window.location.reload();
    }

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="mb-4">新建商品</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>新建商品</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">名称</Label>
                            <Input onChange={(e)=>{setName(e.target.value)}} value={name}  id="name" name="name" required />
                        </div>
                        <div>
                            <Label htmlFor="image">上传图片</Label>
                            <ImageUploader setImageUrl={setImageUrl}/>
                            {imageUrl!==null && (
                                <img src={imageUrl} className="w-20 h-20"/>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="price">价格</Label>
                            <Input id="price" onChange={(e)=>{setPrice(e.target.value)}} value={price}  name="price" type="number" step="0.01" required />
                        </div>
                        <div>
                            <Label htmlFor="description">描述</Label>
                            <Input id="description" onChange={(e)=>{setDescription(e.target.value)}} value={description}  name="description" required />
                        </div>
                        <div>
                            <Label htmlFor="stock">库存</Label>
                            <Input id="stock" onChange={(e)=>{setStock(e.target.value)}} value={stock}  name="stock" type="number" step="1" required />
                        </div>
                        <Button type="button" onClick={handleCreate}>新建</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
       
    )
}