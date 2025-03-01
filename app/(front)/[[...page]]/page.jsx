import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SearchInput from '@/components/productSearchInput';
import Pagination from '@/components/pagination';
import AgentSearch from '@/components/agentSearch';
import apiClient from '@/lib/apiClient';


export default async ({searchParams,params})=> {
  const productsPerPage = 8;
  const {search=""} = await searchParams;
  const {page="1"} = await params;
  const currentPage = Number(page);
  const res = await apiClient.get(`/product/search`,{page:page,size:productsPerPage,query:search});
  
  const data  = res.data;
  const products = data.products;
  const totalPage = Math.ceil(data.total_count / productsPerPage);
  return (
    <>
      <div>
        <div className='flex gap-2 mb-2'>
          <SearchInput currentPage={currentPage} initialSearch={search}/>
          <AgentSearch/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link href={`/product/${product.id}`}  key={product.id}>
              <Card>
                <CardContent className="p-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={""}
                    className="w-full h-48 object-cover"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                  <p className="text-sm font-medium mt-1">￥{product.price}</p>
                  <p className="text-sm font-medium mt-1">剩余: {product.stock} 件</p>
                  {/* <Button className="mt-2 w-full">+购物车</Button> */}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <Pagination pageSize={productsPerPage} currentPage={currentPage} totalPage={totalPage} hrefPrefix={``} hrefParam={{search:search}}/>
      </div>
    </>
  )
}

