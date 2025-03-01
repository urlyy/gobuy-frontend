import Image from "next/image"
import { notFound } from "next/navigation"
import apiClient from '@/lib/apiClient';
import AddButton from "./addButton";

export default async function ProductPage({ params }) {
  const { id } = await params
  const res = await apiClient.get(`/product/${id}`)
  const product  = res.data.product;

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold mb-4">￥{product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-4">库存: {product.stock} 件</p>
            <div className="prose max-w-none mb-6">
              <p>{product.description}</p>
            </div>
          </div>
          <AddButton productID={product.id}/>
        </div>
      </div>
    </div>
  )
}

