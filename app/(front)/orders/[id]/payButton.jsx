"use client"
import { Button } from "@/components/ui/button"
import apiClient from "@/lib/apiClient"
import { redirect } from "next/navigation"

export default ({orderID})=>{
    const handlePay = async()=>{
        const res = await apiClient.get(`/payment/${orderID}`,{order_id:orderID})
        redirect(res.data.url);
    }
    return (
        <Button onClick={handlePay}>支付</Button>
    )
}