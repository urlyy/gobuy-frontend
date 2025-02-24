'use client'

import { Button } from "@/components/ui/button"
import apiClient from "@/lib/apiClient"


export default ({productID})=>{
    const handleAdd = async()=>{
        const res = await apiClient.post(`/cart/${productID}`);
        alert("添加成功");
    }
    return (
        <Button onClick={handleAdd} className="text-white py-2 px-4 rounded transition-colors" >
            添加到购物车
        </Button>
    )
}