import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SearchInput from '@/components/SearchInput';
import { Header } from '@/components/header'


const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Classic Hoodie',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    imageAlt: "Front of men's Classic Hoodie in grey.",
    price: '$55',
    color: 'Grey',
  },
  {
    id: 3,
    name: 'Slim Fit Jeans',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
    imageAlt: "Front of men's Slim Fit Jeans in denim.",
    price: '$40',
    color: 'Denim',
  },
  {
    id: 4,
    name: 'Casual Sneakers',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
    imageAlt: "Front of men's Casual Sneakers in white.",
    price: '$60',
    color: 'White',
  },
  {
    id: 5,
    name: 'Lightweight Jacket',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-05.jpg',
    imageAlt: "Front of men's Lightweight Jacket in navy.",
    price: '$75',
    color: 'Navy',
  }
];


export default function Home() {
  return (
    <>
      <div>
        <div className='flex gap-2 mb-2'>
          {/* <h1 className="text-3xl font-bold mb-6">Products</h1> */}
          <SearchInput />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-0">
                <img
                  src={product.imageSrc || "/placeholder.svg"}
                  alt={product.imageAlt}
                  className="w-full h-48 object-cover"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.color}</p>
                <p className="font-medium mt-1">{product.price}</p>
                <Button className="mt-2 w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

